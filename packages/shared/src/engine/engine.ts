import {
  Card,
  GamePhase,
  PassRecord,
  PrivatePlayerState,
  PublicGameState,
  PublicPlayer,
  Theme,
  WinnerResult
} from '../types';
import { DEFAULT_THEME } from '../constants/themes';

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
  theme: Theme;
  hostId: string;
  turnPlayerId: string | null;
  starterPlayerId: string | null;
  turnDeadline: number | null;
  turnTimerSeconds: number; // e.g. 30, 60, or 0 (no timer)
  players: InternalPlayer[];
  winners: WinnerResult[];
  lastPass?: PassRecord;
  updatedAt: number;
}

/**
 * Generate official 16 cards from theme (4 items x 4 copies each)
 */
export function generateDeck(theme: Theme): Card[] {
  const cards: Card[] = [];
  for (const item of theme.items) {
    for (let copy = 1; copy <= 4; copy++) {
      cards.push({
        id: `${item.id}-${copy}`,
        itemId: item.id,
        itemName: item.name,
        itemCategory: item.category || theme.category,
        itemIcon: item.icon
      });
    }
  }
  return cards;
}

/**
 * Authoritative Fisher-Yates shuffle
 */
export function shuffleDeck(deck: Card[], randomFn: () => number = Math.random): Card[] {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(randomFn() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Check if hand forms a complete matching set of 4 cards
 */
export function isWinningHand(hand: Card[]): boolean {
  if (hand.length !== 4) return false;
  const firstItemId = hand[0].itemId;
  return hand.every((card) => card.itemId === firstItemId);
}

/**
 * Get active players in seat order
 */
export function getActivePlayers(state: InternalGameState): InternalPlayer[] {
  return state.players
    .filter((p) => p.status === 'active')
    .sort((a, b) => a.seatIndex - b.seatIndex);
}

/**
 * Get anticlockwise passing order for active players.
 * For seats [0, 1, 2, 3], anticlockwise direction is:
 * Seat 0 -> Seat 3 -> Seat 2 -> Seat 1 -> Seat 0
 */
export function getAnticlockwisePassingOrder(activePlayers: InternalPlayer[]): InternalPlayer[] {
  if (activePlayers.length <= 1) return activePlayers;
  return [...activePlayers].sort((a, b) => a.seatIndex - b.seatIndex);
}

/**
 * Determine who player passes to and receives from in anticlockwise order.
 */
export function getPassingNeighbor(
  playerId: string,
  activePlayers: InternalPlayer[]
): { target?: InternalPlayer; source?: InternalPlayer } {
  const active = [...activePlayers].sort((a, b) => a.seatIndex - b.seatIndex);
  const index = active.findIndex((p) => p.id === playerId);
  if (index === -1 || active.length <= 1) return {};

  const n = active.length;
  // Anticlockwise passing: seat index - 1 (wrapping around)
  // For [0, 1, 2, 3]: 0 -> 3 -> 2 -> 1 -> 0
  const targetIndex = (index - 1 + n) % n;
  const sourceIndex = (index + 1) % n;

  return {
    target: active[targetIndex],
    source: active[sourceIndex]
  };
}

/**
 * Create a new Game state for a room
 */
export function createGame(
  roomCode: string,
  hostId: string,
  theme: Theme = DEFAULT_THEME,
  turnTimerSeconds: number = 30
): InternalGameState {
  return {
    roomCode,
    phase: 'LOBBY',
    round: 0,
    theme,
    hostId,
    turnPlayerId: null,
    starterPlayerId: null,
    turnDeadline: null,
    turnTimerSeconds,
    players: [],
    winners: [],
    updatedAt: Date.now()
  };
}

/**
 * Deal 16 cards to 4 players and randomly select starter
 */
export function dealCards(
  state: InternalGameState,
  randomFn: () => number = Math.random
): InternalGameState {
  if (state.players.length !== 4) {
    throw new Error('SOLAVIN requires exactly 4 players to start');
  }

  const deck = generateDeck(state.theme);
  const shuffled = shuffleDeck(deck, randomFn);

  // Distribute 4 cards to each player
  const players: InternalPlayer[] = state.players.map((player, idx) => ({
    ...player,
    hand: shuffled.slice(idx * 4, (idx + 1) * 4),
    status: 'active' as const,
    rank: undefined,
    completedItem: undefined,
    completedIcon: undefined
  }));

  // Choose a random player as the starter
  const starterIndex = Math.floor(randomFn() * players.length);
  const starter = players[starterIndex];

  const turnDeadline =
    state.turnTimerSeconds > 0 ? Date.now() + state.turnTimerSeconds * 1000 : null;

  const dealtState: InternalGameState = {
    ...state,
    phase: 'PLAYING',
    round: 1,
    turnPlayerId: starter.id,
    starterPlayerId: starter.id,
    turnDeadline,
    players,
    winners: [],
    lastPass: undefined,
    updatedAt: Date.now()
  };

  return checkAndResolveWins(dealtState);
}

/**
 * Turn player passes 1 card anticlockwise to the next player.
 * Starter starts with 4 cards -> passes 1 -> has 3 cards.
 * Next player receives card -> has 5 cards -> passes 1 -> has 4 cards.
 */
export function passCard(
  state: InternalGameState,
  playerId: string,
  cardId: string
): { nextState: InternalGameState; pass: PassRecord } {
  if (state.phase !== 'PLAYING') {
    throw new Error('Cannot pass card when not in PLAYING phase');
  }

  if (state.turnPlayerId !== playerId) {
    throw new Error(`It is not player ${playerId}'s turn to pass`);
  }

  const active = getActivePlayers(state);
  const currentPlayer = active.find((p) => p.id === playerId);
  if (!currentPlayer) {
    throw new Error(`Current turn player not found or not active`);
  }

  const cardIndex = currentPlayer.hand.findIndex((c) => c.id === cardId);
  if (cardIndex === -1) {
    throw new Error(`Card ${cardId} is not in player hand`);
  }

  const { target } = getPassingNeighbor(playerId, active);
  if (!target) {
    throw new Error(`No target neighbor available to receive card`);
  }

  const passedCard = currentPlayer.hand[cardIndex];

  // Update hands: remove from current, add to target
  let updatedPlayers = state.players.map((p) => {
    if (p.id === currentPlayer.id) {
      return {
        ...p,
        hand: p.hand.filter((c) => c.id !== passedCard.id)
      };
    }
    if (p.id === target.id) {
      return {
        ...p,
        hand: [...p.hand, passedCard]
      };
    }
    return p;
  });

  const passRecord: PassRecord = {
    fromPlayerId: currentPlayer.id,
    toPlayerId: target.id,
    fromSeatIndex: currentPlayer.seatIndex,
    toSeatIndex: target.seatIndex,
    cardId: passedCard.id
  };

  // Next turn player is target!
  let nextTurnPlayerId: string = target.id;
  const nextDeadline =
    state.turnTimerSeconds > 0 ? Date.now() + state.turnTimerSeconds * 1000 : null;

  const stateAfterPass: InternalGameState = {
    ...state,
    round: state.round + 1,
    turnPlayerId: nextTurnPlayerId,
    turnDeadline: nextDeadline,
    players: updatedPlayers,
    lastPass: passRecord,
    updatedAt: Date.now()
  };

  // Check if any player has 4 matching cards and completes their set
  const resolvedState = checkAndResolveWins(stateAfterPass);

  // If nextTurnPlayer finished, advance turn to the next active player in ring
  if (resolvedState.phase === 'PLAYING') {
    const nextPlayerObj = resolvedState.players.find((p) => p.id === resolvedState.turnPlayerId);
    if (!nextPlayerObj || nextPlayerObj.status !== 'active') {
      const remainingActive = getActivePlayers(resolvedState);
      if (remainingActive.length > 0) {
        resolvedState.turnPlayerId = remainingActive[0].id;
      }
    }
  }

  return {
    nextState: resolvedState,
    pass: passRecord
  };
}

/**
 * Check hands of all active players for 4 matching cards.
 * If someone holds 4 matching cards, they win and are marked 'finished'.
 */
export function checkAndResolveWins(state: InternalGameState): InternalGameState {
  const currentWinners = [...state.winners];
  let nextRank = (currentWinners.length + 1) as 1 | 2 | 3 | 4;

  let stateChanged = false;
  let updatedPlayers = state.players.map((player) => ({ ...player }));

  // Check players with exactly 4 cards for completion
  for (let i = 0; i < updatedPlayers.length; i++) {
    const player = updatedPlayers[i];
    if (player.status === 'active' && player.hand.length === 4 && isWinningHand(player.hand)) {
      player.status = 'finished';
      player.rank = nextRank;
      player.completedItem = player.hand[0].itemName;
      player.completedIcon = player.hand[0].itemIcon;

      currentWinners.push({
        rank: nextRank,
        playerId: player.id,
        playerName: player.name,
        itemName: player.hand[0].itemName,
        itemIcon: player.hand[0].itemIcon,
        roundCompleted: state.round
      });

      nextRank = (nextRank + 1) as 1 | 2 | 3 | 4;
      stateChanged = true;
    }
  }

  // Count remaining active players
  const remainingActive = updatedPlayers.filter((p) => p.status === 'active');

  // If only 1 active player remains, they are automatically 4th place
  if (remainingActive.length === 1 && currentWinners.length === 3) {
    const lastPlayer = remainingActive[0];
    lastPlayer.status = 'finished';
    lastPlayer.rank = 4;
    lastPlayer.completedItem = lastPlayer.hand[0]?.itemName || 'Set';
    lastPlayer.completedIcon = lastPlayer.hand[0]?.itemIcon;

    currentWinners.push({
      rank: 4,
      playerId: lastPlayer.id,
      playerName: lastPlayer.name,
      itemName: lastPlayer.completedItem,
      itemIcon: lastPlayer.completedIcon,
      roundCompleted: state.round
    });

    stateChanged = true;
  }

  const allFinished = updatedPlayers.every(
    (p) => p.status === 'finished' || p.status === 'spectating'
  );

  return {
    ...state,
    players: updatedPlayers,
    winners: currentWinners,
    phase: allFinished ? 'GAME_COMPLETE' : state.phase,
    updatedAt: stateChanged ? Date.now() : state.updatedAt
  };
}

/**
 * Validate all critical invariants of the SOLAVIN game engine
 */
export function validateInvariants(state: InternalGameState): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (state.phase !== 'LOBBY') {
    const allCards: Card[] = [];
    for (const player of state.players) {
      allCards.push(...player.hand);
      // Valid hand sizes during game: 3, 4, or 5 cards
      if (player.status === 'active') {
        if (player.hand.length < 3 || player.hand.length > 5) {
          errors.push(
            `Player ${player.name} (${player.id}) has invalid hand size ${player.hand.length}, expected 3, 4, or 5`
          );
        }
      }
      if (player.status === 'finished') {
        if (player.hand.length !== 4) {
          errors.push(`Finished player ${player.name} has ${player.hand.length} cards, expected 4`);
        }
      }
    }

    if (allCards.length !== 16) {
      errors.push(`Total cards across players is ${allCards.length}, expected 16`);
    }

    const cardIds = new Set<string>();
    for (const card of allCards) {
      if (cardIds.has(card.id)) {
        errors.push(`Duplicate card instance detected: ${card.id}`);
      }
      cardIds.add(card.id);
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Generate public game state for broadcasting to all clients.
 * Never leaks private cards or opponents' secret cards.
 */
export function getPublicGameState(state: InternalGameState): PublicGameState {
  const activePlayers = getActivePlayers(state);
  const activePassingOrder = getAnticlockwisePassingOrder(activePlayers).map((p) => p.id);

  const publicPlayers: PublicPlayer[] = state.players.map((p) => ({
    id: p.id,
    name: p.name,
    isHost: p.isHost,
    seatIndex: p.seatIndex,
    status: p.status,
    rank: p.rank,
    completedItem: p.completedItem,
    cardCount: p.hand.length,
    isConnected: p.isConnected
  }));

  return {
    roomCode: state.roomCode,
    phase: state.phase,
    round: state.round,
    players: publicPlayers,
    theme: state.theme,
    hostId: state.hostId,
    turnPlayerId: state.turnPlayerId,
    starterPlayerId: state.starterPlayerId,
    turnDeadline: state.turnDeadline,
    turnTimerSeconds: state.turnTimerSeconds,
    activePassingOrder,
    lastPass: state.lastPass,
    winners: state.winners,
    totalActivePlayers: activePlayers.length,
    updatedAt: state.updatedAt
  };
}

/**
 * Generate authorized private player state for a specific player.
 * Contains only that player's cards, turn status, and neighbor hints.
 */
export function getPrivatePlayerState(
  state: InternalGameState,
  playerId: string
): PrivatePlayerState | undefined {
  const player = state.players.find((p) => p.id === playerId);
  if (!player) return undefined;

  const activePlayers = getActivePlayers(state);
  const { target, source } = getPassingNeighbor(playerId, activePlayers);

  const publicPlayer: PublicPlayer = {
    id: player.id,
    name: player.name,
    isHost: player.isHost,
    seatIndex: player.seatIndex,
    status: player.status,
    rank: player.rank,
    completedItem: player.completedItem,
    cardCount: player.hand.length,
    isConnected: player.isConnected
  };

  return {
    player: publicPlayer,
    cards: player.hand,
    isYourTurn: state.turnPlayerId === playerId && state.phase === 'PLAYING',
    passingTo: target
      ? {
          id: target.id,
          name: target.name,
          seatIndex: target.seatIndex
        }
      : undefined,
    receivingFrom: source
      ? {
          id: source.id,
          name: source.name,
          seatIndex: source.seatIndex
        }
      : undefined
  };
}
