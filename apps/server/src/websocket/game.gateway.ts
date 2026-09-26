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

  /**
   * Broadcast tailored state to each player: public state + strictly their own private hand
   */
  broadcastRoomSync(room: InternalGameState): void {
    const publicState = getPublicGameState(room);
    const roomChannel = `room:${room.roomCode}`;

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
    }
  ) {
    try {
      const { room, player } = this.roomsService.createRoom(
        data.playerName,
        client.id,
        data.themeId,
        data.customTheme
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

  @SubscribeMessage('room:update-theme')
  handleUpdateTheme(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: {
      themeId?: string;
      customTheme?: { name: string; items: string[] };
    }
  ) {
    const context = this.roomsService.getPlayerContext(client.id);
    if (!context) return { success: false, error: 'Not in a room' };

    try {
      const updated = this.roomsService.updateTheme(
        context.roomCode,
        context.playerId,
        data.themeId,
        data.customTheme
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

      this.server.to(`room:${room.roomCode}`).emit('notification', {
        type: 'success',
        message: 'The game has started! 16 cards distributed.'
      });

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  }

  @SubscribeMessage('game:select-card')
  handleSelectCard(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { cardId: string }
  ) {
    const context = this.roomsService.getPlayerContext(client.id);
    if (!context) return { success: false, error: 'Not in a room' };

    const room = this.roomsService.getRoom(context.roomCode);
    if (!room) return { success: false, error: 'Room not found' };

    try {
      const { updatedRoom, isRoundComplete, passes } = this.gamesService.handleCardSelection(
        room,
        context.playerId,
        data.cardId
      );

      this.roomsService.setRoom(room.roomCode, updatedRoom);

      if (isRoundComplete && passes) {
        // Broadcast passing event for animation
        this.server.to(`room:${room.roomCode}`).emit('game:passing', {
          passes,
          nextRound: updatedRoom.round
        });

        // Delay sync slightly for smooth animation sync
        setTimeout(() => {
          this.broadcastRoomSync(updatedRoom);

          // Check if any winners finished
          if (updatedRoom.winners.length > 0) {
            const latestWinner = updatedRoom.winners[updatedRoom.winners.length - 1];
            this.server.to(`room:${room.roomCode}`).emit('game:player-finished', latestWinner);
          }

          if (updatedRoom.phase === 'GAME_COMPLETE') {
            this.server.to(`room:${room.roomCode}`).emit('game:complete', {
              winners: updatedRoom.winners
            });
          }
        }, 500);
      } else {
        // Just normal selection update
        this.broadcastRoomSync(updatedRoom);
      }

      return { success: true };
    } catch (err: any) {
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
    }
  ) {
    const context = this.roomsService.getPlayerContext(client.id);
    if (!context) return { success: false, error: 'Not in a room' };

    const room = this.roomsService.getRoom(context.roomCode);
    if (!room) return { success: false, error: 'Room not found' };

    try {
      const newGame = this.gamesService.restartGame(room, context.playerId, data);
      this.roomsService.setRoom(room.roomCode, newGame);
      this.broadcastRoomSync(newGame);

      this.server.to(`room:${room.roomCode}`).emit('notification', {
        type: 'info',
        message: 'New round started! Cards reshuffled and dealt.'
      });

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  }
}
