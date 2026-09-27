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
  getPrivatePlayerState
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

  it('passer holding 5 cards passes 1 card and completes 4 matching cards to win 1st place', () => {
    let game = createGame('TEST02', 'p1', DEFAULT_THEME, 30);
    // P2 has 4 Interstellar cards + 1 extra Dune card
    const p2Hand = [
      { id: 'interstellar-1', itemId: 'interstellar', itemName: 'Interstellar' },
      { id: 'interstellar-2', itemId: 'interstellar', itemName: 'Interstellar' },
      { id: 'interstellar-3', itemId: 'interstellar', itemName: 'Interstellar' },
      { id: 'interstellar-4', itemId: 'interstellar', itemName: 'Interstellar' },
      { id: 'dune-1', itemId: 'dune', itemName: 'Dune' }
    ];

    game.players = [
      { id: 'p1', name: 'Arya', isHost: true, seatIndex: 0, status: 'active', hand: [], isConnected: true },
      { id: 'p2', name: 'Rahul', isHost: false, seatIndex: 1, status: 'active', hand: p2Hand, isConnected: true },
      { id: 'p3', name: 'Priya', isHost: false, seatIndex: 2, status: 'active', hand: [], isConnected: true },
      { id: 'p4', name: 'Aman', isHost: false, seatIndex: 3, status: 'active', hand: [], isConnected: true }
    ];
    game.phase = 'PLAYING';
    game.turnPlayerId = 'p2';

    // P2 passes the 5th card (dune-1) to P1 (anticlockwise neighbor from seat 1 is seat 0)
    const { nextState, newWinners } = passCard(game, 'p2', 'dune-1');

    assert.strictEqual(newWinners.length, 1);
    assert.strictEqual(newWinners[0].playerId, 'p2');
    assert.strictEqual(newWinners[0].rank, 1);
    assert.strictEqual(newWinners[0].itemName, 'Interstellar');

    const p2After = nextState.players.find((p) => p.id === 'p2')!;
    assert.strictEqual(p2After.status, 'finished');
    assert.strictEqual(p2After.rank, 1);
    assert.strictEqual(p2After.hand.length, 4);

    // Receiver P1 now has the card and is next turn
    assert.strictEqual(nextState.turnPlayerId, 'p1');
  });

  it('starter receiver completes 4 cards upon receiving: starter wins and passer makes next pass', () => {
    let game = createGame('TEST03', 'p1', DEFAULT_THEME, 30);
    // P1 (starter) had 3 Interstellar cards
    const p1Hand = [
      { id: 'interstellar-1', itemId: 'interstellar', itemName: 'Interstellar' },
      { id: 'interstellar-2', itemId: 'interstellar', itemName: 'Interstellar' },
      { id: 'interstellar-3', itemId: 'interstellar', itemName: 'Interstellar' }
    ];

    // P2 has 5 cards and passes the 4th interstellar to P1
    const p2Hand = [
      { id: 'interstellar-4', itemId: 'interstellar', itemName: 'Interstellar' },
      { id: 'avengers-1', itemId: 'avengers', itemName: 'Avengers' },
      { id: 'avengers-2', itemId: 'avengers', itemName: 'Avengers' },
      { id: 'dune-1', itemId: 'dune', itemName: 'Dune' },
      { id: 'inception-1', itemId: 'inception', itemName: 'Inception' }
    ];

    game.players = [
      { id: 'p1', name: 'Arya', isHost: true, seatIndex: 0, status: 'active', hand: p1Hand, isConnected: true },
      { id: 'p2', name: 'Rahul', isHost: false, seatIndex: 1, status: 'active', hand: p2Hand, isConnected: true },
      { id: 'p3', name: 'Priya', isHost: false, seatIndex: 2, status: 'active', hand: [], isConnected: true },
      { id: 'p4', name: 'Aman', isHost: false, seatIndex: 3, status: 'active', hand: [], isConnected: true }
    ];
    game.phase = 'PLAYING';
    game.turnPlayerId = 'p2';

    // P2 passes interstellar-4 to P1
    const { nextState, newWinners } = passCard(game, 'p2', 'interstellar-4');

    assert.strictEqual(newWinners.length, 1);
    assert.strictEqual(newWinners[0].playerId, 'p1');
    assert.strictEqual(newWinners[0].rank, 1);

    const p1After = nextState.players.find((p) => p.id === 'p1')!;
    assert.strictEqual(p1After.status, 'finished');
    assert.strictEqual(p1After.hand.length, 4);

    // Passer P2 made P1 win, so P2 makes the next pass!
    assert.strictEqual(nextState.turnPlayerId, 'p2');
  });

  it('guarantees private player state does not leak other players cards', () => {
    let game = createGame('TEST04', 'p1', DEFAULT_THEME);
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
