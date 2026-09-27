import { InternalGameState, InternalPlayer } from '@solavin/shared';
export declare class RoomsService {
    private readonly logger;
    private rooms;
    private socketMap;
    generateRoomCode(): string;
    createRoom(playerName: string, socketId: string, themeId?: string, customThemeData?: {
        name: string;
        items: string[];
    }, turnTimerSeconds?: number): {
        room: InternalGameState;
        player: InternalPlayer;
    };
    joinRoom(roomCodeInput: string, playerName: string, socketId: string, existingPlayerId?: string): {
        room: InternalGameState;
        player: InternalPlayer;
        isReconnecting: boolean;
    };
    updateSettings(roomCode: string, hostPlayerId: string, themeId?: string, customThemeData?: {
        name: string;
        items: string[];
    }, turnTimerSeconds?: number): InternalGameState;
    handleDisconnect(socketId: string): {
        room?: InternalGameState;
        player?: InternalPlayer;
    };
    getRoom(roomCode: string): InternalGameState | undefined;
    getPlayerContext(socketId: string): {
        roomCode: string;
        playerId: string;
    } | undefined;
    setRoom(roomCode: string, state: InternalGameState): void;
}
