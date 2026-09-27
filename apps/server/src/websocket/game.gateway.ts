import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import {
  getPublicGameState,
  getPrivatePlayerState,
  InternalGameState,
  FullRoomState
} from '@solavin/shared';
import { RoomsService } from '../rooms/rooms.service';
import { GamesService } from '../games/games.service';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(GameGateway.name);
  private roomTimers: Map<string, NodeJS.Timeout> = new Map();

  constructor(
    private readonly roomsService: RoomsService,
    private readonly gamesService: GamesService
  ) {}

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    const { room, player } = this.roomsService.handleDisconnect(client.id);
    if (room) {
      this.broadcastRoomSync(room);
      if (player) {
        this.server.to(`room:${room.roomCode}`).emit('notification', {
          type: 'warning',
          message: `${player.name} disconnected. Reconnecting...`
        });
      }
    }
  }

  private clearTurnTimer(roomCode: string): void {
    const existing = this.roomTimers.get(roomCode);
    if (existing) {
      clearTimeout(existing);
      this.roomTimers.delete(roomCode);
    }
  }

  private scheduleTurnTimer(room: InternalGameState): void {
    this.clearTurnTimer(room.roomCode);

    if (room.phase !== 'PLAYING' || !room.turnPlayerId || room.turnTimerSeconds <= 0) {
      return;
    }

    const timer = setTimeout(() => {
      this.handleTurnTimeout(room.roomCode);
    }, room.turnTimerSeconds * 1000);

    this.roomTimers.set(room.roomCode, timer);
  }

  private handleTurnTimeout(roomCode: string): void {
    const room = this.roomsService.getRoom(roomCode);
    if (!room || room.phase !== 'PLAYING') return;

    const result = this.gamesService.autoPassForTimeout(room);
    if (!result) return;

    const { updatedRoom, pass, playerName } = result;
    this.roomsService.setRoom(roomCode, updatedRoom);

    // Notify room of timeout auto-pass
    this.server.to(`room:${roomCode}`).emit('notification', {
      type: 'warning',
      message: `⏱️ Time expired! ${playerName} auto-passed a card.`
    });

    this.server.to(`room:${roomCode}`).emit('game:passing', {
      pass,
      nextTurnPlayerId: updatedRoom.turnPlayerId
    });

    setTimeout(() => {
      this.broadcastRoomSync(updatedRoom);

      // Check for winners
      if (updatedRoom.winners.length > 0) {
        const latestWinner = updatedRoom.winners[updatedRoom.winners.length - 1];
        this.server.to(`room:${roomCode}`).emit('game:player-finished', latestWinner);
      }

      if (updatedRoom.phase === 'GAME_COMPLETE') {
        this.clearTurnTimer(roomCode);
        this.server.to(`room:${roomCode}`).emit('game:complete', {
          winners: updatedRoom.winners
        });
      } else {
        this.scheduleTurnTimer(updatedRoom);
      }
    }, 300);
  }

  /**
   * Broadcast tailored state to each player: public state + strictly their own private hand
   */
  broadcastRoomSync(room: InternalGameState): void {
    const publicState = getPublicGameState(room);

    for (const player of room.players) {
      if (player.socketId && player.isConnected) {
        const privateState = getPrivatePlayerState(room, player.id);
        const fullPayload: FullRoomState = {
          publicState,
          privateState
        };
        this.server.to(player.socketId).emit('sync:state', fullPayload);
      }
    }
  }

  @SubscribeMessage('room:create')
  handleCreateRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: {
      playerName: string;
      themeId?: string;
      customTheme?: { name: string; items: string[] };
      turnTimerSeconds?: number;
    }
  ) {
    try {
      const { room, player } = this.roomsService.createRoom(
        data.playerName,
        client.id,
        data.themeId,
        data.customTheme,
        data.turnTimerSeconds
      );

      client.join(`room:${room.roomCode}`);
      this.broadcastRoomSync(room);

      return {
        success: true,
        roomCode: room.roomCode,
        playerId: player.id
      };
    } catch (err: any) {
      this.logger.error(`Error creating room: ${err.message}`);
      return { success: false, error: err.message };
    }
  }

  @SubscribeMessage('room:join')
  handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: {
      roomCode: string;
      playerName: string;
      existingPlayerId?: string;
    }
  ) {
    try {
      const { room, player, isReconnecting } = this.roomsService.joinRoom(
        data.roomCode,
        data.playerName,
        client.id,
        data.existingPlayerId
      );

      client.join(`room:${room.roomCode}`);
      this.broadcastRoomSync(room);

      if (!isReconnecting) {
        this.server.to(`room:${room.roomCode}`).emit('notification', {
          type: 'info',
          message: `${player.name} joined the room (${room.players.length}/4)`
        });
      } else {
        this.server.to(`room:${room.roomCode}`).emit('notification', {
          type: 'success',
          message: `${player.name} reconnected to the game!`
        });
      }

      return {
        success: true,
        roomCode: room.roomCode,
        playerId: player.id
      };
    } catch (err: any) {
      this.logger.error(`Error joining room: ${err.message}`);
      return { success: false, error: err.message };
    }
  }

  @SubscribeMessage('room:update-settings')
  handleUpdateSettings(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: {
      themeId?: string;
      customTheme?: { name: string; items: string[] };
      turnTimerSeconds?: number;
    }
  ) {
    const context = this.roomsService.getPlayerContext(client.id);
    if (!context) return { success: false, error: 'Not in a room' };

    try {
      const updated = this.roomsService.updateSettings(
        context.roomCode,
        context.playerId,
        data.themeId,
        data.customTheme,
        data.turnTimerSeconds
      );
      this.broadcastRoomSync(updated);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  }

  @SubscribeMessage('game:start')
  handleStartGame(@ConnectedSocket() client: Socket) {
    const context = this.roomsService.getPlayerContext(client.id);
    if (!context) return { success: false, error: 'Not in a room' };

    const room = this.roomsService.getRoom(context.roomCode);
    if (!room) return { success: false, error: 'Room not found' };

    try {
      const dealtGame = this.gamesService.startGame(room, context.playerId);
      this.roomsService.setRoom(room.roomCode, dealtGame);
      this.broadcastRoomSync(dealtGame);

      const starter = dealtGame.players.find((p) => p.id === dealtGame.starterPlayerId);
      this.server.to(`room:${room.roomCode}`).emit('notification', {
        type: 'success',
        message: `Game started! 🎲 ${starter?.name} was randomly chosen to pass first!`
      });

      // Schedule turn timer
      this.scheduleTurnTimer(dealtGame);

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  }

  @SubscribeMessage('game:pass-card')
  handlePassCard(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { cardId: string }
  ) {
    const context = this.roomsService.getPlayerContext(client.id);
    if (!context) return { success: false, error: 'Not in a room' };

    const room = this.roomsService.getRoom(context.roomCode);
    if (!room) return { success: false, error: 'Room not found' };

    // Clear active turn timer
    this.clearTurnTimer(room.roomCode);

    try {
      const { updatedRoom, pass } = this.gamesService.handlePassCard(
        room,
        context.playerId,
        data.cardId
      );

      this.roomsService.setRoom(room.roomCode, updatedRoom);

      this.server.to(`room:${room.roomCode}`).emit('game:passing', {
        pass,
        nextTurnPlayerId: updatedRoom.turnPlayerId
      });

      setTimeout(() => {
        this.broadcastRoomSync(updatedRoom);

        // Check if any winners finished
        if (updatedRoom.winners.length > 0) {
          const latestWinner = updatedRoom.winners[updatedRoom.winners.length - 1];
          this.server.to(`room:${room.roomCode}`).emit('game:player-finished', latestWinner);
        }

        if (updatedRoom.phase === 'GAME_COMPLETE') {
          this.clearTurnTimer(room.roomCode);
          this.server.to(`room:${room.roomCode}`).emit('game:complete', {
            winners: updatedRoom.winners
          });
        } else {
          // Schedule next player's turn timer
          this.scheduleTurnTimer(updatedRoom);
        }
      }, 300);

      return { success: true };
    } catch (err: any) {
      this.scheduleTurnTimer(room);
      return { success: false, error: err.message };
    }
  }

  @SubscribeMessage('game:restart')
  handleRestartGame(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data?: {
      sameTheme?: boolean;
      themeId?: string;
      customTheme?: { name: string; items: string[] };
      turnTimerSeconds?: number;
    }
  ) {
    const context = this.roomsService.getPlayerContext(client.id);
    if (!context) return { success: false, error: 'Not in a room' };

    const room = this.roomsService.getRoom(context.roomCode);
    if (!room) return { success: false, error: 'Room not found' };

    this.clearTurnTimer(room.roomCode);

    try {
      const newGame = this.gamesService.restartGame(room, context.playerId, data);
      this.roomsService.setRoom(room.roomCode, newGame);
      this.broadcastRoomSync(newGame);

      const starter = newGame.players.find((p) => p.id === newGame.starterPlayerId);
      this.server.to(`room:${room.roomCode}`).emit('notification', {
        type: 'info',
        message: `New round started! 🎲 ${starter?.name} passes first!`
      });

      this.scheduleTurnTimer(newGame);

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  }
}
