"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const engine_1 = require("./engine");
const themes_1 = require("../constants/themes");
(0, node_test_1.describe)('SOLAVIN Turn-Based Game Engine', () => {
    (0, node_test_1.it)('generates exactly 16 cards from theme (4 items x 4 copies each)', () => {
        const deck = (0, engine_1.generateDeck)(themes_1.DEFAULT_THEME);
        node_assert_1.default.strictEqual(deck.length, 16);
        const counts = {};
        for (const card of deck) {
            counts[card.itemId] = (counts[card.itemId] || 0) + 1;
        }
        node_assert_1.default.strictEqual(Object.keys(counts).length, 4);
        for (const itemId of Object.keys(counts)) {
            node_assert_1.default.strictEqual(counts[itemId], 4);
        }
    });
    (0, node_test_1.it)('deals 4 cards each and selects a random starter player', () => {
        let game = (0, engine_1.createGame)('TEST01', 'p1', themes_1.DEFAULT_THEME, 30);
        game.players = [
            { id: 'p1', name: 'Arya', isHost: true, seatIndex: 0, status: 'active', hand: [], isConnected: true },
            { id: 'p2', name: 'Rahul', isHost: false, seatIndex: 1, status: 'active', hand: [], isConnected: true },
            { id: 'p3', name: 'Priya', isHost: false, seatIndex: 2, status: 'active', hand: [], isConnected: true },
            { id: 'p4', name: 'Aman', isHost: false, seatIndex: 3, status: 'active', hand: [], isConnected: true }
        ];
        game = (0, engine_1.dealCards)(game);
        node_assert_1.default.strictEqual(game.phase, 'PLAYING');
        node_assert_1.default.ok(game.starterPlayerId);
        node_assert_1.default.strictEqual(game.turnPlayerId, game.starterPlayerId);
        node_assert_1.default.strictEqual(game.turnTimerSeconds, 30);
        node_assert_1.default.ok(game.turnDeadline);
        for (const p of game.players) {
            node_assert_1.default.strictEqual(p.hand.length, 4);
        }
        const inv = (0, engine_1.validateInvariants)(game);
        node_assert_1.default.strictEqual(inv.valid, true, inv.errors.join(', '));
    });
    (0, node_test_1.it)('passer holding 5 cards passes 1 card and completes 4 matching cards to win 1st place', () => {
        let game = (0, engine_1.createGame)('TEST02', 'p1', themes_1.DEFAULT_THEME, 30);
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
        const { nextState, newWinners } = (0, engine_1.passCard)(game, 'p2', 'dune-1');
        node_assert_1.default.strictEqual(newWinners.length, 1);
        node_assert_1.default.strictEqual(newWinners[0].playerId, 'p2');
        node_assert_1.default.strictEqual(newWinners[0].rank, 1);
        node_assert_1.default.strictEqual(newWinners[0].itemName, 'Interstellar');
        const p2After = nextState.players.find((p) => p.id === 'p2');
        node_assert_1.default.strictEqual(p2After.status, 'finished');
        node_assert_1.default.strictEqual(p2After.rank, 1);
        node_assert_1.default.strictEqual(p2After.hand.length, 4);
        // Receiver P1 now has the card and is next turn
        node_assert_1.default.strictEqual(nextState.turnPlayerId, 'p1');
    });
    (0, node_test_1.it)('starter receiver completes 4 cards upon receiving: starter wins and passer makes next pass', () => {
        let game = (0, engine_1.createGame)('TEST03', 'p1', themes_1.DEFAULT_THEME, 30);
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
        const { nextState, newWinners } = (0, engine_1.passCard)(game, 'p2', 'interstellar-4');
        node_assert_1.default.strictEqual(newWinners.length, 1);
        node_assert_1.default.strictEqual(newWinners[0].playerId, 'p1');
        node_assert_1.default.strictEqual(newWinners[0].rank, 1);
        const p1After = nextState.players.find((p) => p.id === 'p1');
        node_assert_1.default.strictEqual(p1After.status, 'finished');
        node_assert_1.default.strictEqual(p1After.hand.length, 4);
        // Passer P2 made P1 win, so P2 makes the next pass!
        node_assert_1.default.strictEqual(nextState.turnPlayerId, 'p2');
    });
    (0, node_test_1.it)('guarantees private player state does not leak other players cards', () => {
        let game = (0, engine_1.createGame)('TEST04', 'p1', themes_1.DEFAULT_THEME);
        game.players = [
            { id: 'p1', name: 'Arya', isHost: true, seatIndex: 0, status: 'active', hand: [], isConnected: true },
            { id: 'p2', name: 'Rahul', isHost: false, seatIndex: 1, status: 'active', hand: [], isConnected: true },
            { id: 'p3', name: 'Priya', isHost: false, seatIndex: 2, status: 'active', hand: [], isConnected: true },
            { id: 'p4', name: 'Aman', isHost: false, seatIndex: 3, status: 'active', hand: [], isConnected: true }
        ];
        game = (0, engine_1.dealCards)(game);
        const p1Private = (0, engine_1.getPrivatePlayerState)(game, 'p1');
        node_assert_1.default.ok(p1Private);
        node_assert_1.default.strictEqual(p1Private.cards.length, 4);
        const pub = (0, engine_1.getPublicGameState)(game);
        for (const player of pub.players) {
            node_assert_1.default.strictEqual(player.cardCount, 4);
            node_assert_1.default.strictEqual(player.hand, undefined);
            node_assert_1.default.strictEqual(player.cards, undefined);
        }
    });
});
//# sourceMappingURL=engine.spec.js.map