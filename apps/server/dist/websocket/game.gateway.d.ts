import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { InternalGameState } from '@solavin/shared';
import { RoomsService } from '../rooms/rooms.service';
import { GamesService } from '../games/games.service';
export declare class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly roomsService;
    private readonly gamesService;
    server: Server;
    private readonly logger;
    private roomTimers;
    constructor(roomsService: RoomsService, gamesService: GamesService);
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    private clearTurnTimer;
    private scheduleTurnTimer;
    private handleTurnTimeout;
    private notifyNewWinners;
    broadcastRoomSync(room: InternalGameState): void;
    handleCreateRoom(client: Socket, data: {
        playerName: string;
        themeId?: string;
        customTheme?: {
            name: string;
            items: string[];
        };
        turnTimerSeconds?: number;
    }): {
        success: boolean;
        roomCode: string;
        playerId: string;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        roomCode?: undefined;
        playerId?: undefined;
    };
    handleJoinRoom(client: Socket, data: {
        roomCode: string;
        playerName: string;
        existingPlayerId?: string;
    }): {
        success: boolean;
        roomCode: string;
        playerId: string;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        roomCode?: undefined;
        playerId?: undefined;
    };
    handleUpdateSettings(client: Socket, data: {
        themeId?: string;
        customTheme?: {
            name: string;
            items: string[];
        };
        turnTimerSeconds?: number;
    }): {
        success: boolean;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
    };
    handleStartGame(client: Socket): {
        success: boolean;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
    };
    handlePassCard(client: Socket, data: {
        cardId: string;
    }): {
        success: boolean;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
    };
    handleRestartGame(client: Socket, data?: {
        sameTheme?: boolean;
        themeId?: string;
        customTheme?: {
            name: string;
            items: string[];
        };
        turnTimerSeconds?: number;
    }): {
        success: boolean;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
    };
}
