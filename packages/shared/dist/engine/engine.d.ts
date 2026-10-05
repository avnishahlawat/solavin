import { Card, GameMode, GamePhase, PassRecord, PrivatePlayerState, PublicGameState, Theme, WinnerResult } from '../types';
export interface InternalPlayer {
    id: string;
    name: string;
    isHost: boolean;
    seatIndex: number;
    status: 'active' | 'finished' | 'disconnected' | 'spectating';
    rank?: 1 | 2 | 3 | 4;
    completedItem?: string;
    completedIcon?: string;
    hand: Card[];
    isConnected: boolean;
    socketId?: string;
}
export interface InternalGameState {
    roomCode: string;
    phase: GamePhase;
    round: number;
    gameMode: GameMode;
    theme: Theme;
    hostId: string;
    turnPlayerId: string | null;
    starterPlayerId: string | null;
    turnDeadline: number | null;
    turnTimerSeconds: number;
    players: InternalPlayer[];
    winners: WinnerResult[];
    lastPass?: PassRecord;
    updatedAt: number;
}
/**
 * Generate official 16 cards from theme (4 items x 4 copies each)
 */
export declare function generateDeck(theme: Theme): Card[];
/**
 * Authoritative Fisher-Yates shuffle
 */
export declare function shuffleDeck(deck: Card[], randomFn?: () => number): Card[];
/**
 * Check if hand forms a complete matching set of 4 cards
 */
export declare function isWinningHand(hand: Card[]): boolean;
/**
 * Get active players in seat order
 */
export declare function getActivePlayers(state: InternalGameState): InternalPlayer[];
/**
 * Get anticlockwise passing order for active players.
 * For seats [0, 1, 2, 3], anticlockwise direction is:
 * Seat 0 -> Seat 3 -> Seat 2 -> Seat 1 -> Seat 0
 */
export declare function getAnticlockwisePassingOrder(activePlayers: InternalPlayer[]): InternalPlayer[];
/**
 * Determine who player passes to and receives from in anticlockwise order.
 */
export declare function getPassingNeighbor(playerId: string, activePlayers: InternalPlayer[]): {
    target?: InternalPlayer;
    source?: InternalPlayer;
};
/**
 * Create a new Game state for a room
 */
export declare function createGame(roomCode: string, hostId: string, theme?: Theme, turnTimerSeconds?: number, gameMode?: GameMode): InternalGameState;
/**
 * Deal 16 cards to 4 players and randomly select starter
 */
export declare function dealCards(state: InternalGameState, randomFn?: () => number): InternalGameState;
/**
 * Turn player passes 1 card anticlockwise to the next player.
 *
 * Win Condition Rules:
 * 1. A win is ONLY considered when a player holds exactly 4 cards and all 4 match!
 *    - If a player holds 5 cards, they cannot win yet; they must choose and pass 1 card.
 *      After passing, if their remaining 4 cards match, they win!
 *    - If the starter receives their 4th card (from 3 to 4 cards) and all 4 match, they win!
 * 2. Next turn after a win:
 *    - If the passer won, the receiver now has 5 cards and passes next.
 *    - If the receiver (starter) won upon receiving the 4th card, the passer (responsible player)
 *      initiates the next pass to their remaining anticlockwise neighbor!
 * 3. Pro Mode Rules:
 *    - In Pro Mode, a player who received a card and now holds 5 cards CANNOT pass the exact card they just received.
 *    - Starter who was at 3 cards and now holds 4 cards after receiving CAN pass any card (including the received card).
 */
export declare function passCard(state: InternalGameState, playerId: string, cardId: string): {
    nextState: InternalGameState;
    pass: PassRecord;
    newWinners: WinnerResult[];
};
/**
 * Validate all critical invariants of the SOLAVIN game engine
 */
export declare function validateInvariants(state: InternalGameState): {
    valid: boolean;
    errors: string[];
};
/**
 * Generate public game state for broadcasting to all clients.
 * Never leaks private cards or opponents' secret cards.
 */
export declare function getPublicGameState(state: InternalGameState): PublicGameState;
/**
 * Generate authorized private player state for a specific player.
 * Contains only that player's cards, turn status, and neighbor hints.
 */
export declare function getPrivatePlayerState(state: InternalGameState, playerId: string): PrivatePlayerState | undefined;
//# sourceMappingURL=engine.d.ts.map