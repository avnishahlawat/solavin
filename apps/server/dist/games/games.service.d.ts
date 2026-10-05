import { InternalGameState, PassRecord, WinnerResult } from '@solavin/shared';
import { PrismaService } from '../prisma/prisma.service';
export declare class GamesService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    startGame(room: InternalGameState, hostPlayerId: string): InternalGameState;
    handlePassCard(room: InternalGameState, playerId: string, cardId: string): {
        updatedRoom: InternalGameState;
        pass: PassRecord;
        newWinners: WinnerResult[];
    };
    autoPassForTimeout(room: InternalGameState): {
        updatedRoom: InternalGameState;
        pass: PassRecord;
        newWinners: WinnerResult[];
        playerName: string;
    } | null;
    restartGame(room: InternalGameState, hostPlayerId: string, options?: {
        sameTheme?: boolean;
        themeId?: string;
        customTheme?: {
            name: string;
            items: string[];
        };
        turnTimerSeconds?: number;
        gameMode?: import('@solavin/shared').GameMode;
    }): InternalGameState;
    private persistGameRecord;
}
