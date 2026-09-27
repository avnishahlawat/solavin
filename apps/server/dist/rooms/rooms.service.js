"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RoomsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomsService = void 0;
const common_1 = require("@nestjs/common");
const shared_1 = require("@solavin/shared");
const CODE_CHARS = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
let RoomsService = RoomsService_1 = class RoomsService {
    constructor() {
        this.logger = new common_1.Logger(RoomsService_1.name);
        this.rooms = new Map();
        this.socketMap = new Map();
    }
    generateRoomCode() {
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
    createRoom(playerName, socketId, themeId, customThemeData, turnTimerSeconds = 30) {
        const trimmedName = playerName.trim();
        if (!trimmedName) {
            throw new common_1.BadRequestException('Player name is required');
        }
        const roomCode = this.generateRoomCode();
        const playerId = `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
        let selectedTheme = shared_1.DEFAULT_THEME;
        if (customThemeData && customThemeData.items?.length === 4) {
            selectedTheme = (0, shared_1.createCustomTheme)(customThemeData.name, customThemeData.items);
        }
        else if (themeId) {
            const found = shared_1.PRESET_THEMES.find((t) => t.id === themeId);
            if (found)
                selectedTheme = found;
        }
        const hostPlayer = {
            id: playerId,
            name: trimmedName,
            isHost: true,
            seatIndex: 0,
            status: 'active',
            hand: [],
            isConnected: true,
            socketId
        };
        const newGame = (0, shared_1.createGame)(roomCode, playerId, selectedTheme, turnTimerSeconds);
        newGame.players = [hostPlayer];
        this.rooms.set(roomCode, newGame);
        this.socketMap.set(socketId, { roomCode, playerId });
        this.logger.log(`Room created: ${roomCode} by ${trimmedName} (timer: ${turnTimerSeconds}s)`);
        return { room: newGame, player: hostPlayer };
    }
    joinRoom(roomCodeInput, playerName, socketId, existingPlayerId) {
        const roomCode = roomCodeInput.trim().toUpperCase();
        const room = this.rooms.get(roomCode);
        if (!room) {
            throw new common_1.NotFoundException(`Room with code "${roomCode}" not found`);
        }
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
        if (room.phase !== 'LOBBY') {
            throw new common_1.BadRequestException('This game has already started and cannot accept new players');
        }
        if (room.players.length >= 4) {
            throw new common_1.BadRequestException('Room is already full (maximum 4 players)');
        }
        const trimmedName = playerName.trim();
        if (!trimmedName) {
            throw new common_1.BadRequestException('Player name is required');
        }
        const nameCollision = room.players.some((p) => p.name.toLowerCase() === trimmedName.toLowerCase());
        if (nameCollision) {
            throw new common_1.BadRequestException(`Name "${trimmedName}" is already taken in this room`);
        }
        const takenSeats = new Set(room.players.map((p) => p.seatIndex));
        let seatIndex = 0;
        while (takenSeats.has(seatIndex) && seatIndex < 4) {
            seatIndex++;
        }
        const playerId = `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
        const newPlayer = {
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
    updateSettings(roomCode, hostPlayerId, themeId, customThemeData, turnTimerSeconds) {
        const room = this.rooms.get(roomCode);
        if (!room)
            throw new common_1.NotFoundException('Room not found');
        if (room.hostId !== hostPlayerId) {
            throw new common_1.BadRequestException('Only the room host can change the settings');
        }
        if (room.phase !== 'LOBBY') {
            throw new common_1.BadRequestException('Cannot change settings while game is active');
        }
        if (customThemeData && customThemeData.items?.length === 4) {
            room.theme = (0, shared_1.createCustomTheme)(customThemeData.name, customThemeData.items);
        }
        else if (themeId) {
            const found = shared_1.PRESET_THEMES.find((t) => t.id === themeId);
            if (found)
                room.theme = found;
        }
        if (turnTimerSeconds !== undefined && turnTimerSeconds >= 0) {
            room.turnTimerSeconds = turnTimerSeconds;
        }
        room.updatedAt = Date.now();
        return room;
    }
    handleDisconnect(socketId) {
        const record = this.socketMap.get(socketId);
        if (!record)
            return {};
        const { roomCode, playerId } = record;
        this.socketMap.delete(socketId);
        const room = this.rooms.get(roomCode);
        if (!room)
            return {};
        const player = room.players.find((p) => p.id === playerId);
        if (!player)
            return { room };
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
        }
        else {
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
    getRoom(roomCode) {
        return this.rooms.get(roomCode.toUpperCase());
    }
    getPlayerContext(socketId) {
        return this.socketMap.get(socketId);
    }
    setRoom(roomCode, state) {
        this.rooms.set(roomCode, state);
    }
};
exports.RoomsService = RoomsService;
exports.RoomsService = RoomsService = RoomsService_1 = __decorate([
    (0, common_1.Injectable)()
], RoomsService);
//# sourceMappingURL=rooms.service.js.map