import { Injectable, Logger, BadRequestException, NotFoundException } from '@nestjs/common';
import {
  InternalGameState,
  InternalPlayer,
  createGame,
  DEFAULT_THEME,
  PRESET_THEMES,
  createCustomTheme,
  Theme
} from '@solavin/shared';

const CODE_CHARS = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';

@Injectable()
export class RoomsService {
  private readonly logger = new Logger(RoomsService.name);
  private rooms: Map<string, InternalGameState> = new Map();
  private socketMap: Map<string, { roomCode: string; playerId: string }> = new Map();

  generateRoomCode(): string {
    let code = '';
    do {
      code = '';
      for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * CODE_CHARS.length);
        code += CODE_CHARS[randomIndex];
      }
    } while (this.rooms.has(code));
    return code;
  }

  createRoom(
    playerName: string,
    socketId: string,
    themeId?: string,
    customThemeData?: { name: string; items: string[] },
    turnTimerSeconds: number = 30,
    gameMode: import('@solavin/shared').GameMode = 'classic'
  ): { room: InternalGameState; player: InternalPlayer } {
    const trimmedName = playerName.trim();
    if (!trimmedName) {
      throw new BadRequestException('Player name is required');
    }

    const roomCode = this.generateRoomCode();
    const playerId = `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    let selectedTheme: Theme = DEFAULT_THEME;
    if (customThemeData && customThemeData.items?.length === 4) {
      selectedTheme = createCustomTheme(customThemeData.name, customThemeData.items);
    } else if (themeId) {
      const found = PRESET_THEMES.find((t) => t.id === themeId);
      if (found) selectedTheme = found;
    }

    const hostPlayer: InternalPlayer = {
      id: playerId,
      name: trimmedName,
      isHost: true,
      seatIndex: 0,
      status: 'active',
      hand: [],
      isConnected: true,
      socketId
    };

    const newGame = createGame(roomCode, playerId, selectedTheme, turnTimerSeconds, gameMode);
    newGame.players = [hostPlayer];

    this.rooms.set(roomCode, newGame);
    this.socketMap.set(socketId, { roomCode, playerId });

    this.logger.log(`Room created: ${roomCode} by ${trimmedName} (mode: ${gameMode}, timer: ${turnTimerSeconds}s)`);
    return { room: newGame, player: hostPlayer };
  }

  joinRoom(
    roomCodeInput: string,
    playerName: string,
    socketId: string,
    existingPlayerId?: string
  ): { room: InternalGameState; player: InternalPlayer; isReconnecting: boolean } {
    const roomCode = roomCodeInput.trim().toUpperCase();
    const room = this.rooms.get(roomCode);

    if (!room) {
      throw new NotFoundException(`Room with code "${roomCode}" not found`);
    }

    // Check if player is reconnecting with existing playerId
    if (existingPlayerId) {
      const existing = room.players.find((p) => p.id === existingPlayerId);
      if (existing) {
        existing.isConnected = true;
        existing.socketId = socketId;
        this.socketMap.set(socketId, { roomCode, playerId: existing.id });
        this.logger.log(`Player ${existing.name} (${existing.id}) reconnected to room ${roomCode}`);
        return { room, player: existing, isReconnecting: true };
      }
    }

    // Check if game already started
    if (room.phase !== 'LOBBY') {
      throw new BadRequestException('This game has already started and cannot accept new players');
    }

    // Enforce 4-player max
    if (room.players.length >= 4) {
      throw new BadRequestException('Room is already full (maximum 4 players)');
    }

    const trimmedName = playerName.trim();
    if (!trimmedName) {
      throw new BadRequestException('Player name is required');
    }

    // Enforce unique name in room
    const nameCollision = room.players.some(
      (p) => p.name.toLowerCase() === trimmedName.toLowerCase()
    );
    if (nameCollision) {
      throw new BadRequestException(`Name "${trimmedName}" is already taken in this room`);
    }

    // Assign next available seat 0, 1, 2, 3
    const takenSeats = new Set(room.players.map((p) => p.seatIndex));
    let seatIndex = 0;
    while (takenSeats.has(seatIndex) && seatIndex < 4) {
      seatIndex++;
    }

    const playerId = `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const newPlayer: InternalPlayer = {
      id: playerId,
      name: trimmedName,
      isHost: false,
      seatIndex,
      status: 'active',
      hand: [],
      isConnected: true,
      socketId
    };

    room.players.push(newPlayer);
    this.socketMap.set(socketId, { roomCode, playerId });

    this.logger.log(`Player ${trimmedName} (${playerId}) joined room ${roomCode} at seat ${seatIndex}`);
    return { room, player: newPlayer, isReconnecting: false };
  }

  updateSettings(
    roomCode: string,
    hostPlayerId: string,
    themeId?: string,
    customThemeData?: { name: string; items: string[] },
    turnTimerSeconds?: number,
    gameMode?: import('@solavin/shared').GameMode
  ): InternalGameState {
    const room = this.rooms.get(roomCode);
    if (!room) throw new NotFoundException('Room not found');

    if (room.hostId !== hostPlayerId) {
      throw new BadRequestException('Only the room host can change the settings');
    }

    if (room.phase !== 'LOBBY') {
      throw new BadRequestException('Cannot change settings while game is active');
    }

    if (customThemeData && customThemeData.items?.length === 4) {
      room.theme = createCustomTheme(customThemeData.name, customThemeData.items);
    } else if (themeId) {
      const found = PRESET_THEMES.find((t) => t.id === themeId);
      if (found) room.theme = found;
    }

    if (turnTimerSeconds !== undefined && turnTimerSeconds >= 0) {
      room.turnTimerSeconds = turnTimerSeconds;
    }

    if (gameMode) {
      room.gameMode = gameMode;
    }

    room.updatedAt = Date.now();
    return room;
  }

  handleDisconnect(socketId: string): { room?: InternalGameState; player?: InternalPlayer } {
    const record = this.socketMap.get(socketId);
    if (!record) return {};

    const { roomCode, playerId } = record;
    this.socketMap.delete(socketId);

    const room = this.rooms.get(roomCode);
    if (!room) return {};

    const player = room.players.find((p) => p.id === playerId);
    if (!player) return { room };

    player.isConnected = false;
    this.logger.log(`Player ${player.name} (${playerId}) disconnected from room ${roomCode}`);

    if (room.phase === 'LOBBY') {
      room.players = room.players.filter((p) => p.id !== playerId);
      if (room.players.length === 0) {
        this.rooms.delete(roomCode);
        this.logger.log(`Room ${roomCode} destroyed because all players left`);
        return {};
      }

      if (player.isHost) {
        room.players[0].isHost = true;
        room.hostId = room.players[0].id;
        this.logger.log(`Host migrated to ${room.players[0].name} in room ${roomCode}`);
      }
    } else {
      if (player.isHost) {
        const nextHost = room.players.find((p) => p.isConnected && p.id !== playerId);
        if (nextHost) {
          player.isHost = false;
          nextHost.isHost = true;
          room.hostId = nextHost.id;
          this.logger.log(`Active game host migrated to ${nextHost.name} in room ${roomCode}`);
        }
      }
    }

    room.updatedAt = Date.now();
    return { room, player };
  }

  getRoom(roomCode: string): InternalGameState | undefined {
    return this.rooms.get(roomCode.toUpperCase());
  }

  getPlayerContext(socketId: string): { roomCode: string; playerId: string } | undefined {
    return this.socketMap.get(socketId);
  }

  setRoom(roomCode: string, state: InternalGameState): void {
    this.rooms.set(roomCode, state);
  }
}
