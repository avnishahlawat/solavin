import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  generateDeck,
  shuffleDeck,
  createGame,
  dealCards,
  passCard,
  validateInvariants,
  getPublicGameState,
  getPrivatePlayerState,
  checkAndResolveWins
} from './engine';
import { DEFAULT_THEME } from '../constants/themes';

describe('SOLAVIN Turn-Based Game Engine', () => {
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

  it('deals 4 cards each and selects a random starter player', () => {
    let game = createGame('TEST01', 'p1', DEFAULT_THEME, 30);
    game.players = [
      { id: 'p1', name: 'Arya', isHost: true, seatIndex: 0, status: 'active', hand: [], isConnected: true },
      { id: 'p2', name: 'Rahul', isHost: false, seatIndex: 1, status: 'active', hand: [], isConnected: true },
      { id: 'p3', name: 'Priya', isHost: false, seatIndex: 2, status: 'active', hand: [], isConnected: true },
      { id: 'p4', name: 'Aman', isHost: false, seatIndex: 3, status: 'active', hand: [], isConnected: true }
    ];

    game = dealCards(game);

    assert.strictEqual(game.phase, 'PLAYING');
    assert.ok(game.starterPlayerId);
    assert.strictEqual(game.turnPlayerId, game.starterPlayerId);
    assert.strictEqual(game.turnTimerSeconds, 30);
    assert.ok(game.turnDeadline);

    for (const p of game.players) {
      assert.strictEqual(p.hand.length, 4);
    }

    const inv = validateInvariants(game);
    assert.strictEqual(inv.valid, true, inv.errors.join(', '));
  });

  it('starter passes 1 card: starter has 3 cards, next receiver has 5 cards', () => {
    let game = createGame('TEST02', 'p1', DEFAULT_THEME, 30);
    game.players = [
      { id: 'p1', name: 'Arya', isHost: true, seatIndex: 0, status: 'active', hand: [], isConnected: true },
      { id: 'p2', name: 'Rahul', isHost: false, seatIndex: 1, status: 'active', hand: [], isConnected: true },
      { id: 'p3', name: 'Priya', isHost: false, seatIndex: 2, status: 'active', hand: [], isConnected: true },
      { id: 'p4', name: 'Aman', isHost: false, seatIndex: 3, status: 'active', hand: [], isConnected: true }
    ];

    game = dealCards(game);
    // Force starter to p1 (seat 0) for deterministic check
    game.starterPlayerId = 'p1';
    game.turnPlayerId = 'p1';

    const p1 = game.players.find((p) => p.id === 'p1')!;
    const cardToPass = p1.hand[0];

    // P1 passes card to anticlockwise neighbor (Seat 0 passes to Seat 3 -> P4)
    const { nextState, pass } = passCard(game, 'p1', cardToPass.id);

    assert.strictEqual(pass.fromPlayerId, 'p1');
    assert.strictEqual(pass.toPlayerId, 'p4');

    const updatedP1 = nextState.players.find((p) => p.id === 'p1')!;
    const updatedP4 = nextState.players.find((p) => p.id === 'p4')!;

    // Starter now has 3 cards
    assert.strictEqual(updatedP1.hand.length, 3);
    // Receiver now has 5 cards
    assert.strictEqual(updatedP4.hand.length, 5);
    // Next turn is on P4!
    assert.strictEqual(nextState.turnPlayerId, 'p4');

    const inv = validateInvariants(nextState);
    assert.strictEqual(inv.valid, true, inv.errors.join(', '));
  });

  it('second player with 5 cards passes 1 card: drops to 4 cards, next receiver gets 5 cards', () => {
    let game = createGame('TEST03', 'p1', DEFAULT_THEME, 30);
    game.players = [
      { id: 'p1', name: 'Arya', isHost: true, seatIndex: 0, status: 'active', hand: [], isConnected: true },
      { id: 'p2', name: 'Rahul', isHost: false, seatIndex: 1, status: 'active', hand: [], isConnected: true },
      { id: 'p3', name: 'Priya', isHost: false, seatIndex: 2, status: 'active', hand: [], isConnected: true },
      { id: 'p4', name: 'Aman', isHost: false, seatIndex: 3, status: 'active', hand: [], isConnected: true }
    ];
    game = dealCards(game);
    game.starterPlayerId = 'p1';
    game.turnPlayerId = 'p1';

    // Step 1: P1 (4 cards) passes to P4
    const pass1 = passCard(game, 'p1', game.players[0].hand[0].id);
    let s2 = pass1.nextState;

    // Step 2: P4 (now has 5 cards) passes to P3 (seat 2)
    const p4 = s2.players.find((p) => p.id === 'p4')!;
    assert.strictEqual(p4.hand.length, 5);
    const pass2 = passCard(s2, 'p4', p4.hand[0].id);
    let s3 = pass2.nextState;

    const p4After = s3.players.find((p) => p.id === 'p4')!;
    const p3After = s3.players.find((p) => p.id === 'p3')!;

    // P4 now has 4 cards
    assert.strictEqual(p4After.hand.length, 4);
    // P3 now has 5 cards
    assert.strictEqual(p3After.hand.length, 5);
    // Turn is now on P3
    assert.strictEqual(s3.turnPlayerId, 'p3');

    const inv = validateInvariants(s3);
    assert.strictEqual(inv.valid, true, inv.errors.join(', '));
  });

  it('detects a winner with 4 matching cards, assigns 1st place, and updates active ring', () => {
    let game = createGame('TEST04', 'p1', DEFAULT_THEME);

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
      { id: 'p1', name: 'Arya', isHost: true, seatIndex: 0, status: 'active', hand: p1Hand, isConnected: true },
      { id: 'p2', name: 'Rahul', isHost: false, seatIndex: 1, status: 'active', hand: p2Hand, isConnected: true },
      { id: 'p3', name: 'Priya', isHost: false, seatIndex: 2, status: 'active', hand: p3Hand, isConnected: true },
      { id: 'p4', name: 'Aman', isHost: false, seatIndex: 3, status: 'active', hand: p4Hand, isConnected: true }
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
  });

  it('guarantees private player state does not leak other players cards', () => {
    let game = createGame('TEST05', 'p1', DEFAULT_THEME);
    game.players = [
      { id: 'p1', name: 'Arya', isHost: true, seatIndex: 0, status: 'active', hand: [], isConnected: true },
      { id: 'p2', name: 'Rahul', isHost: false, seatIndex: 1, status: 'active', hand: [], isConnected: true },
      { id: 'p3', name: 'Priya', isHost: false, seatIndex: 2, status: 'active', hand: [], isConnected: true },
      { id: 'p4', name: 'Aman', isHost: false, seatIndex: 3, status: 'active', hand: [], isConnected: true }
    ];
    game = dealCards(game);

    const p1Private = getPrivatePlayerState(game, 'p1');
    assert.ok(p1Private);
    assert.strictEqual(p1Private.cards.length, 4);

    const pub = getPublicGameState(game);
    for (const player of pub.players) {
      assert.strictEqual(player.cardCount, 4);
      assert.strictEqual((player as any).hand, undefined);
      assert.strictEqual((player as any).cards, undefined);
    }
  });
});
