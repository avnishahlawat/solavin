"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var GameGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
const socket_io_1 = require("socket.io");
const shared_1 = require("@solavin/shared");
const rooms_service_1 = require("../rooms/rooms.service");
const games_service_1 = require("../games/games.service");
let GameGateway = GameGateway_1 = class GameGateway {
    constructor(roomsService, gamesService) {
        this.roomsService = roomsService;
        this.gamesService = gamesService;
        this.logger = new common_1.Logger(GameGateway_1.name);
        this.roomTimers = new Map();
    }
    handleConnection(client) {
        this.logger.log(`Client connected: ${client.id}`);
    }
    handleDisconnect(client) {
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
    clearTurnTimer(roomCode) {
        const existing = this.roomTimers.get(roomCode);
        if (existing) {
            clearTimeout(existing);
            this.roomTimers.delete(roomCode);
        }
    }
    scheduleTurnTimer(room) {
        this.clearTurnTimer(room.roomCode);
        if (room.phase !== 'PLAYING' || !room.turnPlayerId || room.turnTimerSeconds <= 0) {
            return;
        }
        const timer = setTimeout(() => {
            this.handleTurnTimeout(room.roomCode);
        }, room.turnTimerSeconds * 1000);
        this.roomTimers.set(room.roomCode, timer);
    }
    handleTurnTimeout(roomCode) {
        const room = this.roomsService.getRoom(roomCode);
        if (!room || room.phase !== 'PLAYING')
            return;
        const result = this.gamesService.autoPassForTimeout(room);
        if (!result)
            return;
        const { updatedRoom, pass, newWinners, playerName } = result;
        this.roomsService.setRoom(roomCode, updatedRoom);
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
            this.notifyNewWinners(updatedRoom, newWinners);
            if (updatedRoom.phase === 'GAME_COMPLETE') {
                this.clearTurnTimer(roomCode);
                this.server.to(`room:${roomCode}`).emit('game:complete', {
                    winners: updatedRoom.winners
                });
            }
            else {
                this.scheduleTurnTimer(updatedRoom);
            }
        }, 300);
    }
    notifyNewWinners(room, newWinners) {
        if (!newWinners || newWinners.length === 0)
            return;
        for (const winner of newWinners) {
            const rankLabel = winner.rank === 1
                ? '1st Place'
                : winner.rank === 2
                    ? '2nd Place'
                    : winner.rank === 3
                        ? '3rd Place'
                        : '4th Place';
            for (const player of room.players) {
                if (!player.socketId || !player.isConnected)
                    continue;
                if (player.id === winner.playerId) {
                    this.server.to(player.socketId).emit('game:player-finished', winner);
                }
                else {
                    this.server.to(player.socketId).emit('notification', {
                        type: 'success',
                        message: `🏆 ${winner.playerName} completed ${winner.itemName} and won ${rankLabel}!`
                    });
                }
            }
        }
    }
    broadcastRoomSync(room) {
        const publicState = (0, shared_1.getPublicGameState)(room);
        for (const player of room.players) {
            if (player.socketId && player.isConnected) {
                const privateState = (0, shared_1.getPrivatePlayerState)(room, player.id);
                const fullPayload = {
                    publicState,
                    privateState
                };
                this.server.to(player.socketId).emit('sync:state', fullPayload);
            }
        }
    }
    handleCreateRoom(client, data) {
        try {
            const { room, player } = this.roomsService.createRoom(data.playerName, client.id, data.themeId, data.customTheme, data.turnTimerSeconds);
            client.join(`room:${room.roomCode}`);
            this.broadcastRoomSync(room);
            return {
                success: true,
                roomCode: room.roomCode,
                playerId: player.id
            };
        }
        catch (err) {
            this.logger.error(`Error creating room: ${err.message}`);
            return { success: false, error: err.message };
        }
    }
    handleJoinRoom(client, data) {
        try {
            const { room, player, isReconnecting } = this.roomsService.joinRoom(data.roomCode, data.playerName, client.id, data.existingPlayerId);
            client.join(`room:${room.roomCode}`);
            this.broadcastRoomSync(room);
            if (!isReconnecting) {
                this.server.to(`room:${room.roomCode}`).emit('notification', {
                    type: 'info',
                    message: `${player.name} joined the room (${room.players.length}/4)`
                });
            }
            else {
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
        }
        catch (err) {
            this.logger.error(`Error joining room: ${err.message}`);
            return { success: false, error: err.message };
        }
    }
    handleUpdateSettings(client, data) {
        const context = this.roomsService.getPlayerContext(client.id);
        if (!context)
            return { success: false, error: 'Not in a room' };
        try {
            const updated = this.roomsService.updateSettings(context.roomCode, context.playerId, data.themeId, data.customTheme, data.turnTimerSeconds);
            this.broadcastRoomSync(updated);
            return { success: true };
        }
        catch (err) {
            return { success: false, error: err.message };
        }
    }
    handleStartGame(client) {
        const context = this.roomsService.getPlayerContext(client.id);
        if (!context)
            return { success: false, error: 'Not in a room' };
        const room = this.roomsService.getRoom(context.roomCode);
        if (!room)
            return { success: false, error: 'Room not found' };
        try {
            const dealtGame = this.gamesService.startGame(room, context.playerId);
            this.roomsService.setRoom(room.roomCode, dealtGame);
            this.broadcastRoomSync(dealtGame);
            const starter = dealtGame.players.find((p) => p.id === dealtGame.starterPlayerId);
            this.server.to(`room:${room.roomCode}`).emit('notification', {
                type: 'success',
                message: `Game started! 🎲 ${starter?.name} was randomly chosen to pass first!`
            });
            this.scheduleTurnTimer(dealtGame);
            return { success: true };
        }
        catch (err) {
            return { success: false, error: err.message };
        }
    }
    handlePassCard(client, data) {
        const context = this.roomsService.getPlayerContext(client.id);
        if (!context)
            return { success: false, error: 'Not in a room' };
        const room = this.roomsService.getRoom(context.roomCode);
        if (!room)
            return { success: false, error: 'Room not found' };
        this.clearTurnTimer(room.roomCode);
        try {
            const { updatedRoom, pass, newWinners } = this.gamesService.handlePassCard(room, context.playerId, data.cardId);
            this.roomsService.setRoom(room.roomCode, updatedRoom);
            this.server.to(`room:${room.roomCode}`).emit('game:passing', {
                pass,
                nextTurnPlayerId: updatedRoom.turnPlayerId
            });
            setTimeout(() => {
                this.broadcastRoomSync(updatedRoom);
                this.notifyNewWinners(updatedRoom, newWinners);
                if (updatedRoom.phase === 'GAME_COMPLETE') {
                    this.clearTurnTimer(room.roomCode);
                    this.server.to(`room:${room.roomCode}`).emit('game:complete', {
                        winners: updatedRoom.winners
                    });
                }
                else {
                    this.scheduleTurnTimer(updatedRoom);
                }
            }, 300);
            return { success: true };
        }
        catch (err) {
            this.scheduleTurnTimer(room);
            return { success: false, error: err.message };
        }
    }
    handleRestartGame(client, data) {
        const context = this.roomsService.getPlayerContext(client.id);
        if (!context)
            return { success: false, error: 'Not in a room' };
        const room = this.roomsService.getRoom(context.roomCode);
        if (!room)
            return { success: false, error: 'Room not found' };
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
        }
        catch (err) {
            return { success: false, error: err.message };
        }
    }
};
exports.GameGateway = GameGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], GameGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('room:create'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], GameGateway.prototype, "handleCreateRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('room:join'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], GameGateway.prototype, "handleJoinRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('room:update-settings'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], GameGateway.prototype, "handleUpdateSettings", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('game:start'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], GameGateway.prototype, "handleStartGame", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('game:pass-card'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], GameGateway.prototype, "handlePassCard", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('game:restart'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], GameGateway.prototype, "handleRestartGame", null);
exports.GameGateway = GameGateway = GameGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    }),
    __metadata("design:paramtypes", [rooms_service_1.RoomsService,
        games_service_1.GamesService])
], GameGateway);
//# sourceMappingURL=game.gateway.js.map