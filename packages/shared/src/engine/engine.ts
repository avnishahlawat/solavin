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
  selectedCardId: string | null;
  isConnected: boolean;
  socketId?: string;
}

export interface InternalGameState {
  roomCode: string;
  phase: GamePhase;
  round: number;
  theme: Theme;
  hostId: string;
  players: InternalPlayer[];
  winners: WinnerResult[];
  lastPass?: PassRecord[];
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
 * Check if 4 cards form a complete matching set
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
 * If active seats are [0, 1, 2, 3], anticlockwise direction is:
 * 0 -> 3 -> 2 -> 1 -> 0
 * Reverse sort by seatIndex provides the anticlockwise loop.
 */
export function getAnticlockwisePassingOrder(activePlayers: InternalPlayer[]): InternalPlayer[] {
  if (activePlayers.length <= 1) return activePlayers;
  // Sort descending by seatIndex: seat 3 -> seat 2 -> seat 1 -> seat 0
  // Or relative to seat 0: 0 -> 3 -> 2 -> 1 -> 0
  const sorted = [...activePlayers].sort((a, b) => a.seatIndex - b.seatIndex);
  // To pass anticlockwise from seat 0:
  // Next player for seat[i] is seat[(i - 1 + length) % length]
  return sorted;
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
  // Anticlockwise: Seat 0 passes to the preceding seat index in cyclic order: (index - 1 + n) % n
  // For [0, 1, 2, 3]:
  // 0 passes to 3
  // 3 passes to 2
  // 2 passes to 1
  // 1 passes to 0
  const targetIndex = (index - 1 + n) % n;
  // Source is the one passing to current: (index + 1) % n
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
  theme: Theme = DEFAULT_THEME
): InternalGameState {
  return {
    roomCode,
    phase: 'LOBBY',
    round: 0,
    theme,
    hostId,
    players: [],
    winners: [],
    updatedAt: Date.now()
  };
}

/**
 * Deal 16 cards to 4 players
 */
export function dealCards(state: InternalGameState, randomFn: () => number = Math.random): InternalGameState {
  if (state.players.length !== 4) {
    throw new Error('SOLAVIN requires exactly 4 players to start');
  }

  const deck = generateDeck(state.theme);
  const shuffled = shuffleDeck(deck, randomFn);

  // Distribute 4 cards to each player
  const players = state.players.map((player, idx) => ({
    ...player,
    hand: shuffled.slice(idx * 4, (idx + 1) * 4),
    selectedCardId: null,
    status: 'active' as const,
    rank: undefined,
    completedItem: undefined
  }));

  const newState: InternalGameState = {
    ...state,
    phase: 'PLAYING',
    round: 1,
    players,
    winners: [],
    lastPass: undefined,
    updatedAt: Date.now()
  };

  // Immediate check if anyone was dealt 4 of a kind (very rare, but possible)
  return checkAndResolveWins(newState);
}

/**
 * Player selects a card from their own hand
 */
export function selectCard(
  state: InternalGameState,
  playerId: string,
  cardId: string
): InternalGameState {
  if (state.phase !== 'PLAYING') {
    throw new Error('Cannot select card when not in PLAYING phase');
  }

  const player = state.players.find((p) => p.id === playerId);
  if (!player) {
    throw new Error('Player not found');
  }

  if (player.status !== 'active') {
    throw new Error('Only active players can select cards');
  }

  const cardExistsInHand = player.hand.some((c) => c.id === cardId);
  if (!cardExistsInHand) {
    throw new Error('Selected card is not in player hand');
  }

  const updatedPlayers = state.players.map((p) => {
    if (p.id === playerId) {
      return {
        ...p,
        selectedCardId: cardId
      };
    }
    return p;
  });

  return {
    ...state,
    players: updatedPlayers,
    updatedAt: Date.now()
  };
}

/**
 * Check if all active players have selected a card
 */
export function areAllActivePlayersReady(state: InternalGameState): boolean {
  const active = getActivePlayers(state);
  if (active.length === 0) return false;
  return active.every((p) => p.selectedCardId !== null);
}

/**
 * Resolve round: Simultaneous anticlockwise pass across all active players
 */
export function resolvePassingRound(state: InternalGameState): {
  nextState: InternalGameState;
  passes: PassRecord[];
} {
  if (!areAllActivePlayersReady(state)) {
    throw new Error('Cannot resolve round until all active players have selected a card');
  }

  const active = getActivePlayers(state);
  const n = active.length;
  const passes: PassRecord[] = [];

  // Map of playerId -> Card being passed by that player
  const passedCards = new Map<string, Card>();

  for (const player of active) {
    const card = player.hand.find((c) => c.id === player.selectedCardId);
    if (!card) {
      throw new Error(`Player ${player.id} selected card ${player.selectedCardId} not in hand`);
    }
    passedCards.set(player.id, card);
  }

  // Create new hands for each active player
  const updatedPlayers = state.players.map((player) => {
    if (player.status !== 'active') return player;

    const { target, source } = getPassingNeighbor(player.id, active);
    if (!target || !source) return player;

    passes.push({
      fromPlayerId: player.id,
      toPlayerId: target.id,
      fromSeatIndex: player.seatIndex,
      toSeatIndex: target.seatIndex
    });

    // Remove the card this player passed
    const passedCard = passedCards.get(player.id)!;
    const remainingHand = player.hand.filter((c) => c.id !== passedCard.id);

    // Add the card received from source
    const receivedCard = passedCards.get(source.id)!;
    const newHand = [...remainingHand, receivedCard];

    return {
      ...player,
      hand: newHand,
      selectedCardId: null
    };
  });

  const stateAfterPass: InternalGameState = {
    ...state,
    round: state.round + 1,
    players: updatedPlayers,
    lastPass: passes,
    updatedAt: Date.now()
  };

  // Check for winners
  const resolvedState = checkAndResolveWins(stateAfterPass);

  return {
    nextState: resolvedState,
    passes
  };
}

/**
 * Check hands of all active players for 4 matching cards.
 * Assign 1st, 2nd, 3rd, 4th ranks dynamically.
 */
export function checkAndResolveWins(state: InternalGameState): InternalGameState {
  const currentWinners = [...state.winners];
  let nextRank = (currentWinners.length + 1) as 1 | 2 | 3 | 4;

  let stateChanged = false;
  let updatedPlayers = state.players.map((player) => ({ ...player }));

  // Check active players for completion
  for (let i = 0; i < updatedPlayers.length; i++) {
    const player = updatedPlayers[i];
    if (player.status === 'active' && isWinningHand(player.hand)) {
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

  // If only 1 player remains active, they are automatically 4th place
  if (remainingActive.length === 1 && currentWinners.length === 3) {
    const lastPlayer = remainingActive[0];
    lastPlayer.status = 'finished';
    lastPlayer.rank = 4;
    lastPlayer.completedItem = lastPlayer.hand[0]?.itemName;
    lastPlayer.completedIcon = lastPlayer.hand[0]?.itemIcon;

    currentWinners.push({
      rank: 4,
      playerId: lastPlayer.id,
      playerName: lastPlayer.name,
      itemName: lastPlayer.completedItem || 'Set',
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
      if (player.status === 'active' || player.status === 'finished') {
        if (player.hand.length !== 4) {
          errors.push(`Player ${player.name} (${player.id}) has ${player.hand.length} cards, expected 4`);
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
 * Never leaks private cards or opponents' secret card selections.
 */
export function getPublicGameState(state: InternalGameState): PublicGameState {
  const activePlayers = getActivePlayers(state);
  const activePassingOrder = getAnticlockwisePassingOrder(activePlayers).map((p) => p.id);
  const readyCount = activePlayers.filter((p) => p.selectedCardId !== null).length;

  const publicPlayers: PublicPlayer[] = state.players.map((p) => ({
    id: p.id,
    name: p.name,
    isHost: p.isHost,
    seatIndex: p.seatIndex,
    status: p.status,
    rank: p.rank,
    completedItem: p.completedItem,
    cardCount: p.hand.length,
    hasSelectedCard: p.selectedCardId !== null,
    isConnected: p.isConnected
  }));

  return {
    roomCode: state.roomCode,
    phase: state.phase,
    round: state.round,
    players: publicPlayers,
    theme: state.theme,
    hostId: state.hostId,
    activePassingOrder,
    lastPass: state.lastPass,
    winners: state.winners,
    readyCount,
    totalActivePlayers: activePlayers.length,
    allReady: activePlayers.length > 0 && readyCount === activePlayers.length,
    updatedAt: state.updatedAt
  };
}

/**
 * Generate authorized private player state for a specific player.
 * Contains only that player's cards and targeted passing indicators.
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
    hasSelectedCard: player.selectedCardId !== null,
    isConnected: player.isConnected
  };

  return {
    player: publicPlayer,
    cards: player.hand,
    selectedCardId: player.selectedCardId,
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
