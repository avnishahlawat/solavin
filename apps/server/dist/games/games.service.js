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
var GamesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamesService = void 0;
const common_1 = require("@nestjs/common");
const shared_1 = require("@solavin/shared");
const prisma_service_1 = require("../prisma/prisma.service");
let GamesService = GamesService_1 = class GamesService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(GamesService_1.name);
    }
    startGame(room, hostPlayerId) {
        if (room.hostId !== hostPlayerId) {
            throw new common_1.BadRequestException('Only the host can start the game');
        }
        if (room.players.length !== 4) {
            throw new common_1.BadRequestException('Exactly 4 players are required to start SOLAVIN');
        }
        if (room.phase !== 'LOBBY' && room.phase !== 'GAME_COMPLETE') {
            throw new common_1.BadRequestException('Game is already underway');
        }
        const dealtGame = (0, shared_1.dealCards)(room);
        this.logger.log(`Game started in room ${room.roomCode}. Starter: ${dealtGame.starterPlayerId}, Timer: ${dealtGame.turnTimerSeconds}s`);
        return dealtGame;
    }
    handlePassCard(room, playerId, cardId) {
        const { nextState, pass, newWinners } = (0, shared_1.passCard)(room, playerId, cardId);
        if (nextState.phase === 'GAME_COMPLETE') {
            this.persistGameRecord(nextState);
        }
        return {
            updatedRoom: nextState,
            pass,
            newWinners
        };
    }
    autoPassForTimeout(room) {
        if (room.phase !== 'PLAYING' || !room.turnPlayerId)
            return null;
        const player = room.players.find((p) => p.id === room.turnPlayerId);
        if (!player || player.hand.length === 0)
            return null;
        let eligibleCards = player.hand;
        if (room.gameMode === 'pro' &&
            player.hand.length > 4 &&
            room.lastPass &&
            room.lastPass.toPlayerId === player.id &&
            room.lastPass.cardId) {
            const filtered = player.hand.filter((c) => c.id !== room.lastPass?.cardId);
            if (filtered.length > 0) {
                eligibleCards = filtered;
            }
        }
        const counts = new Map();
        for (const card of player.hand) {
            counts.set(card.itemId, (counts.get(card.itemId) || 0) + 1);
        }
        let minCard = eligibleCards[0];
        let minCount = 999;
        for (const card of eligibleCards) {
            const count = counts.get(card.itemId) || 0;
            if (count < minCount) {
                minCount = count;
                minCard = card;
            }
        }
        this.logger.log(`Auto-passing card ${minCard.itemName} for ${player.name} in room ${room.roomCode} due to timeout`);
        const { updatedRoom, pass, newWinners } = this.handlePassCard(room, player.id, minCard.id);
        return {
            updatedRoom,
            pass,
            newWinners,
            playerName: player.name
        };
    }
    restartGame(room, hostPlayerId, options) {
        if (room.hostId !== hostPlayerId) {
            throw new common_1.BadRequestException('Only the host can restart the game');
        }
        if (room.players.length !== 4) {
            throw new common_1.BadRequestException('Exactly 4 players are required');
        }
        let theme = room.theme;
        if (options?.customTheme && options.customTheme.items?.length === 4) {
            theme = (0, shared_1.createCustomTheme)(options.customTheme.name, options.customTheme.items);
        }
        else if (options?.themeId) {
            const found = shared_1.PRESET_THEMES.find((t) => t.id === options.themeId);
            if (found)
                theme = found;
        }
        const turnTimer = options?.turnTimerSeconds !== undefined ? options.turnTimerSeconds : room.turnTimerSeconds;
        const gameMode = options?.gameMode !== undefined ? options.gameMode : room.gameMode;
        const resetPlayers = room.players.map((p) => ({
            ...p,
            hand: [],
            status: 'active',
            rank: undefined,
            completedItem: undefined,
            completedIcon: undefined
        }));
        const resetRoom = {
            ...room,
            theme,
            phase: 'LOBBY',
            round: 0,
            gameMode,
            turnTimerSeconds: turnTimer,
            turnPlayerId: null,
            starterPlayerId: null,
            turnDeadline: null,
            players: resetPlayers,
            winners: [],
            lastPass: undefined,
            updatedAt: Date.now()
        };
        return (0, shared_1.dealCards)(resetRoom);
    }
    async persistGameRecord(state) {
        if (!this.prisma.isConnected)
            return;
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
        }
        catch (err) {
            this.logger.warn(`Could not persist game record: ${err.message}`);
        }
    }
};
exports.GamesService = GamesService;
exports.GamesService = GamesService = GamesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GamesService);
//# sourceMappingURL=games.service.js.map