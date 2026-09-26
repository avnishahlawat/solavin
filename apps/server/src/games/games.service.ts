import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import {
  InternalGameState,
  dealCards,
  selectCard,
  areAllActivePlayersReady,
  resolvePassingRound,
  PassRecord,
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
    this.logger.log(`Game started in room ${room.roomCode} with theme ${room.theme.name}`);
    return dealtGame;
  }

  handleCardSelection(
    room: InternalGameState,
    playerId: string,
    cardId: string
  ): {
    updatedRoom: InternalGameState;
    isRoundComplete: boolean;
    passes?: PassRecord[];
  } {
    const updatedRoom = selectCard(room, playerId, cardId);

    // Check if all active players are ready
    if (areAllActivePlayersReady(updatedRoom)) {
      this.logger.log(
        `All active players ready in room ${room.roomCode}. Resolving round ${updatedRoom.round}...`
      );
      const { nextState, passes } = resolvePassingRound(updatedRoom);

      // If game reached complete, persist if db available
      if (nextState.phase === 'GAME_COMPLETE') {
        this.persistGameRecord(nextState);
      }

      return {
        updatedRoom: nextState,
        isRoundComplete: true,
        passes
      };
    }

    return {
      updatedRoom,
      isRoundComplete: false
    };
  }

  restartGame(
    room: InternalGameState,
    hostPlayerId: string,
    options?: { sameTheme?: boolean; themeId?: string; customTheme?: { name: string; items: string[] } }
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

    // Reset player statuses
    const resetPlayers = room.players.map((p) => ({
      ...p,
      hand: [],
      selectedCardId: null,
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
      players: resetPlayers,
      winners: [],
      lastPass: undefined,
      updatedAt: Date.now()
    };

    // Immediately deal new round
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
