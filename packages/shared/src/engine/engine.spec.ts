import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  generateDeck,
  shuffleDeck,
  createGame,
  dealCards,
  selectCard,
  resolvePassingRound,
  validateInvariants,
  getPublicGameState,
  getPrivatePlayerState,
  InternalPlayer,
  checkAndResolveWins
} from './engine';
import { DEFAULT_THEME } from '../constants/themes';

describe('SOLAVIN Game Engine', () => {
  it('generates exactly 16 cards from theme (4 items x 4 copies each)', () => {
    const deck = generateDeck(DEFAULT_THEME);
    assert.strictEqual(deck.length, 16);

    const counts: Record<string, number> = {};
    for (const card of deck) {
      counts[card.itemId] = (counts[card.itemId] || 0) + 1;
    }

    assert.strictEqual(Object.keys(counts).length, 4);
    for (const itemId of Object.keys(counts)) {
      assert.strictEqual(counts[itemId], 4);
    }
  });

  it('deals 4 cards to each of the 4 players and preserves all 16 unique cards', () => {
    let game = createGame('TEST01', 'p1', DEFAULT_THEME);
    game.players = [
      { id: 'p1', name: 'Arya', isHost: true, seatIndex: 0, status: 'active', hand: [], selectedCardId: null, isConnected: true },
      { id: 'p2', name: 'Rahul', isHost: false, seatIndex: 1, status: 'active', hand: [], selectedCardId: null, isConnected: true },
      { id: 'p3', name: 'Priya', isHost: false, seatIndex: 2, status: 'active', hand: [], selectedCardId: null, isConnected: true },
      { id: 'p4', name: 'Aman', isHost: false, seatIndex: 3, status: 'active', hand: [], selectedCardId: null, isConnected: true }
    ];

    game = dealCards(game);

    assert.strictEqual(game.phase, 'PLAYING');
    assert.strictEqual(game.round, 1);
    assert.strictEqual(game.players.length, 4);

    const inv = validateInvariants(game);
    assert.strictEqual(inv.valid, true, inv.errors.join(', '));

    for (const p of game.players) {
      assert.strictEqual(p.hand.length, 4);
    }
  });

  it('passes cards anticlockwise simultaneously without card duplication or loss', () => {
    let game = createGame('TEST02', 'p1', DEFAULT_THEME);
    game.players = [
      { id: 'p1', name: 'Arya', isHost: true, seatIndex: 0, status: 'active', hand: [], selectedCardId: null, isConnected: true },
      { id: 'p2', name: 'Rahul', isHost: false, seatIndex: 1, status: 'active', hand: [], selectedCardId: null, isConnected: true },
      { id: 'p3', name: 'Priya', isHost: false, seatIndex: 2, status: 'active', hand: [], selectedCardId: null, isConnected: true },
      { id: 'p4', name: 'Aman', isHost: false, seatIndex: 3, status: 'active', hand: [], selectedCardId: null, isConnected: true }
    ];
    game = dealCards(game);

    // Each player selects a card from their own hand
    for (const p of game.players) {
      game = selectCard(game, p.id, p.hand[0].id);
    }

    const { nextState, passes } = resolvePassingRound(game);

    assert.strictEqual(passes.length, 4);
    // Anticlockwise passing checks:
    // P1 (seat 0) passes to P4 (seat 3)
    // P4 (seat 3) passes to P3 (seat 2)
    // P3 (seat 2) passes to P2 (seat 1)
    // P2 (seat 1) passes to P1 (seat 0)
    const p1Pass = passes.find((pass) => pass.fromPlayerId === 'p1');
    assert.strictEqual(p1Pass?.toPlayerId, 'p4');

    const p4Pass = passes.find((pass) => pass.fromPlayerId === 'p4');
    assert.strictEqual(p4Pass?.toPlayerId, 'p3');

    const p3Pass = passes.find((pass) => pass.fromPlayerId === 'p3');
    assert.strictEqual(p3Pass?.toPlayerId, 'p2');

    const p2Pass = passes.find((pass) => pass.fromPlayerId === 'p2');
    assert.strictEqual(p2Pass?.toPlayerId, 'p1');

    const inv = validateInvariants(nextState);
    assert.strictEqual(inv.valid, true, inv.errors.join(', '));
  });

  it('detects a winner with 4 matching cards, assigns 1st place, and updates active ring', () => {
    let game = createGame('TEST03', 'p1', DEFAULT_THEME);
    const mockTheme = DEFAULT_THEME;

    // Give p1 4 Interstellar cards
    const p1Hand = [
      { id: 'interstellar-1', itemId: 'interstellar', itemName: 'Interstellar' },
      { id: 'interstellar-2', itemId: 'interstellar', itemName: 'Interstellar' },
      { id: 'interstellar-3', itemId: 'interstellar', itemName: 'Interstellar' },
      { id: 'interstellar-4', itemId: 'interstellar', itemName: 'Interstellar' }
    ];

    const p2Hand = [
      { id: 'avengers-1', itemId: 'avengers', itemName: 'Avengers' },
      { id: 'avengers-2', itemId: 'avengers', itemName: 'Avengers' },
      { id: 'dune-1', itemId: 'dune', itemName: 'Dune' },
      { id: 'inception-1', itemId: 'inception', itemName: 'Inception' }
    ];

    const p3Hand = [
      { id: 'avengers-3', itemId: 'avengers', itemName: 'Avengers' },
      { id: 'dune-2', itemId: 'dune', itemName: 'Dune' },
      { id: 'dune-3', itemId: 'dune', itemName: 'Dune' },
      { id: 'inception-2', itemId: 'inception', itemName: 'Inception' }
    ];

    const p4Hand = [
      { id: 'avengers-4', itemId: 'avengers', itemName: 'Avengers' },
      { id: 'dune-4', itemId: 'dune', itemName: 'Dune' },
      { id: 'inception-3', itemId: 'inception', itemName: 'Inception' },
      { id: 'inception-4', itemId: 'inception', itemName: 'Inception' }
    ];

    game.players = [
      { id: 'p1', name: 'Arya', isHost: true, seatIndex: 0, status: 'active', hand: p1Hand, selectedCardId: null, isConnected: true },
      { id: 'p2', name: 'Rahul', isHost: false, seatIndex: 1, status: 'active', hand: p2Hand, selectedCardId: null, isConnected: true },
      { id: 'p3', name: 'Priya', isHost: false, seatIndex: 2, status: 'active', hand: p3Hand, selectedCardId: null, isConnected: true },
      { id: 'p4', name: 'Aman', isHost: false, seatIndex: 3, status: 'active', hand: p4Hand, selectedCardId: null, isConnected: true }
    ];
    game.phase = 'PLAYING';
    game.round = 1;

    const resolved = checkAndResolveWins(game);

    const p1 = resolved.players.find((p) => p.id === 'p1');
    assert.strictEqual(p1?.status, 'finished');
    assert.strictEqual(p1?.rank, 1);
    assert.strictEqual(resolved.winners.length, 1);
    assert.strictEqual(resolved.winners[0].playerId, 'p1');
    assert.strictEqual(resolved.winners[0].itemName, 'Interstellar');

    // Remaining active players: p2, p3, p4
    const pub = getPublicGameState(resolved);
    assert.strictEqual(pub.totalActivePlayers, 3);
    assert.deepStrictEqual(pub.activePassingOrder, ['p2', 'p3', 'p4']);
  });

  it('guarantees private player state does not leak other players cards', () => {
    let game = createGame('TEST04', 'p1', DEFAULT_THEME);
    game.players = [
      { id: 'p1', name: 'Arya', isHost: true, seatIndex: 0, status: 'active', hand: [], selectedCardId: null, isConnected: true },
      { id: 'p2', name: 'Rahul', isHost: false, seatIndex: 1, status: 'active', hand: [], selectedCardId: null, isConnected: true },
      { id: 'p3', name: 'Priya', isHost: false, seatIndex: 2, status: 'active', hand: [], selectedCardId: null, isConnected: true },
      { id: 'p4', name: 'Aman', isHost: false, seatIndex: 3, status: 'active', hand: [], selectedCardId: null, isConnected: true }
    ];
    game = dealCards(game);

    const p1Private = getPrivatePlayerState(game, 'p1');
    assert.ok(p1Private);
    assert.strictEqual(p1Private.cards.length, 4);

    const pub = getPublicGameState(game);
    // Public state has cardCount but NO cards array
    for (const player of pub.players) {
      assert.strictEqual(player.cardCount, 4);
      assert.strictEqual((player as any).hand, undefined);
      assert.strictEqual((player as any).cards, undefined);
    }
  });
});
