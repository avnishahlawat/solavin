import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import {
  InternalGameState,
  dealCards,
  passCard,
  PassRecord,
  WinnerResult,
  Theme,
  PRESET_THEMES,
  createCustomTheme
} from '@solavin/shared';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GamesService {
  private readonly logger = new Logger(GamesService.name);

  constructor(private readonly prisma: PrismaService) {}

  startGame(room: InternalGameState, hostPlayerId: string): InternalGameState {
    if (room.hostId !== hostPlayerId) {
      throw new BadRequestException('Only the host can start the game');
    }

    if (room.players.length !== 4) {
      throw new BadRequestException('Exactly 4 players are required to start SOLAVIN');
    }

    if (room.phase !== 'LOBBY' && room.phase !== 'GAME_COMPLETE') {
      throw new BadRequestException('Game is already underway');
    }

    const dealtGame = dealCards(room);
    this.logger.log(
      `Game started in room ${room.roomCode}. Starter: ${dealtGame.starterPlayerId}, Timer: ${dealtGame.turnTimerSeconds}s`
    );
    return dealtGame;
  }

  handlePassCard(
    room: InternalGameState,
    playerId: string,
    cardId: string
  ): {
    updatedRoom: InternalGameState;
    pass: PassRecord;
    newWinners: WinnerResult[];
  } {
    const { nextState, pass, newWinners } = passCard(room, playerId, cardId);

    // If game reached completion, persist if db available
    if (nextState.phase === 'GAME_COMPLETE') {
      this.persistGameRecord(nextState);
    }

    return {
      updatedRoom: nextState,
      pass,
      newWinners
    };
  }

  /**
   * Auto-pass when a player's turn timer expires
   */
  autoPassForTimeout(room: InternalGameState): {
    updatedRoom: InternalGameState;
    pass: PassRecord;
    newWinners: WinnerResult[];
    playerName: string;
  } | null {
    if (room.phase !== 'PLAYING' || !room.turnPlayerId) return null;

    const player = room.players.find((p) => p.id === room.turnPlayerId);
    if (!player || player.hand.length === 0) return null;

    // Pick card to pass: count occurrences, discard least frequent card (avoid breaking pairs)
    const counts = new Map<string, number>();
    for (const card of player.hand) {
      counts.set(card.itemId, (counts.get(card.itemId) || 0) + 1);
    }

    let minCard = player.hand[0];
    let minCount = 999;
    for (const card of player.hand) {
      const count = counts.get(card.itemId) || 0;
      if (count < minCount) {
        minCount = count;
        minCard = card;
      }
    }

    this.logger.log(
      `Auto-passing card ${minCard.itemName} for ${player.name} in room ${room.roomCode} due to timeout`
    );
    const { updatedRoom, pass, newWinners } = this.handlePassCard(room, player.id, minCard.id);

    return {
      updatedRoom,
      pass,
      newWinners,
      playerName: player.name
    };
  }

  restartGame(
    room: InternalGameState,
    hostPlayerId: string,
    options?: {
      sameTheme?: boolean;
      themeId?: string;
      customTheme?: { name: string; items: string[] };
      turnTimerSeconds?: number;
    }
  ): InternalGameState {
    if (room.hostId !== hostPlayerId) {
      throw new BadRequestException('Only the host can restart the game');
    }

    if (room.players.length !== 4) {
      throw new BadRequestException('Exactly 4 players are required');
    }

    let theme: Theme = room.theme;
    if (options?.customTheme && options.customTheme.items?.length === 4) {
      theme = createCustomTheme(options.customTheme.name, options.customTheme.items);
    } else if (options?.themeId) {
      const found = PRESET_THEMES.find((t) => t.id === options.themeId);
      if (found) theme = found;
    }

    const turnTimer =
      options?.turnTimerSeconds !== undefined ? options.turnTimerSeconds : room.turnTimerSeconds;

    // Reset player statuses
    const resetPlayers = room.players.map((p) => ({
      ...p,
      hand: [],
      status: 'active' as const,
      rank: undefined,
      completedItem: undefined,
      completedIcon: undefined
    }));

    const resetRoom: InternalGameState = {
      ...room,
      theme,
      phase: 'LOBBY',
      round: 0,
      turnTimerSeconds: turnTimer,
      turnPlayerId: null,
      starterPlayerId: null,
      turnDeadline: null,
      players: resetPlayers,
      winners: [],
      lastPass: undefined,
      updatedAt: Date.now()
    };

    return dealCards(resetRoom);
  }

  private async persistGameRecord(state: InternalGameState): Promise<void> {
    if (!this.prisma.isConnected) return;
    try {
      await this.prisma.gameRecord.create({
        data: {
          roomCode: state.roomCode,
          themeId: state.theme.id,
          themeName: state.theme.name,
          totalRounds: state.round,
          finishedAt: new Date(),
          participants: {
            create: state.winners.map((w) => ({
              playerId: w.playerId,
              playerName: w.playerName,
              finalRank: w.rank,
              completedItem: w.itemName
            }))
          }
        }
      });
      this.logger.log(`Persisted game result for room ${state.roomCode} in PostgreSQL`);
    } catch (err) {
      this.logger.warn(`Could not persist game record: ${(err as Error).message}`);
    }
  }
}
