"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDeck = generateDeck;
exports.shuffleDeck = shuffleDeck;
exports.isWinningHand = isWinningHand;
exports.getActivePlayers = getActivePlayers;
exports.getAnticlockwisePassingOrder = getAnticlockwisePassingOrder;
exports.getPassingNeighbor = getPassingNeighbor;
exports.createGame = createGame;
exports.dealCards = dealCards;
exports.passCard = passCard;
exports.validateInvariants = validateInvariants;
exports.getPublicGameState = getPublicGameState;
exports.getPrivatePlayerState = getPrivatePlayerState;
const themes_1 = require("../constants/themes");
/**
 * Generate official 16 cards from theme (4 items x 4 copies each)
 */
function generateDeck(theme) {
    const cards = [];
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
function shuffleDeck(deck, randomFn = Math.random) {
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
function isWinningHand(hand) {
    if (hand.length !== 4)
        return false;
    const firstItemId = hand[0].itemId;
    return hand.every((card) => card.itemId === firstItemId);
}
/**
 * Get active players in seat order
 */
function getActivePlayers(state) {
    return state.players
        .filter((p) => p.status === 'active')
        .sort((a, b) => a.seatIndex - b.seatIndex);
}
/**
 * Get anticlockwise passing order for active players.
 * For seats [0, 1, 2, 3], anticlockwise direction is:
 * Seat 0 -> Seat 3 -> Seat 2 -> Seat 1 -> Seat 0
 */
function getAnticlockwisePassingOrder(activePlayers) {
    if (activePlayers.length <= 1)
        return activePlayers;
    return [...activePlayers].sort((a, b) => a.seatIndex - b.seatIndex);
}
/**
 * Determine who player passes to and receives from in anticlockwise order.
 */
function getPassingNeighbor(playerId, activePlayers) {
    const active = [...activePlayers].sort((a, b) => a.seatIndex - b.seatIndex);
    const index = active.findIndex((p) => p.id === playerId);
    if (index === -1 || active.length <= 1)
        return {};
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
function createGame(roomCode, hostId, theme = themes_1.DEFAULT_THEME, turnTimerSeconds = 30) {
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
function dealCards(state, randomFn = Math.random) {
    if (state.players.length !== 4) {
        throw new Error('SOLAVIN requires exactly 4 players to start');
    }
    const deck = generateDeck(state.theme);
    const shuffled = shuffleDeck(deck, randomFn);
    // Distribute 4 cards to each player
    const players = state.players.map((player, idx) => ({
        ...player,
        hand: shuffled.slice(idx * 4, (idx + 1) * 4),
        status: 'active',
        rank: undefined,
        completedItem: undefined,
        completedIcon: undefined
    }));
    // Choose a random player as the starter
    const starterIndex = Math.floor(randomFn() * players.length);
    const starter = players[starterIndex];
    const turnDeadline = state.turnTimerSeconds > 0 ? Date.now() + state.turnTimerSeconds * 1000 : null;
    return {
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
}
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
 */
function passCard(state, playerId, cardId) {
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
    // Update hands: remove passedCard from currentPlayer, add to target
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
    const passRecord = {
        fromPlayerId: currentPlayer.id,
        toPlayerId: target.id,
        fromSeatIndex: currentPlayer.seatIndex,
        toSeatIndex: target.seatIndex,
        cardId: passedCard.id
    };
    const newWinners = [];
    const currentWinners = [...state.winners];
    let nextRank = (currentWinners.length + 1);
    const getPlayer = (id) => updatedPlayers.find((p) => p.id === id);
    // 1. Check if currentPlayer (the passer) now has 4 matching cards
    const passer = getPlayer(currentPlayer.id);
    let passerWon = false;
    if (passer.hand.length === 4 && isWinningHand(passer.hand)) {
        passer.status = 'finished';
        passer.rank = nextRank;
        passer.completedItem = passer.hand[0].itemName;
        passer.completedIcon = passer.hand[0].itemIcon;
        const win = {
            rank: nextRank,
            playerId: passer.id,
            playerName: passer.name,
            itemName: passer.hand[0].itemName,
            itemIcon: passer.hand[0].itemIcon,
            roundCompleted: state.round
        };
        currentWinners.push(win);
        newWinners.push(win);
        nextRank = (nextRank + 1);
        passerWon = true;
    }
    // 2. Check if target (receiver) had 3 cards and now has 4 matching cards (e.g. starter)
    const receiver = getPlayer(target.id);
    let receiverWon = false;
    if (receiver.status === 'active' && receiver.hand.length === 4 && isWinningHand(receiver.hand)) {
        receiver.status = 'finished';
        receiver.rank = nextRank;
        receiver.completedItem = receiver.hand[0].itemName;
        receiver.completedIcon = receiver.hand[0].itemIcon;
        const win = {
            rank: nextRank,
            playerId: receiver.id,
            playerName: receiver.name,
            itemName: receiver.hand[0].itemName,
            itemIcon: receiver.hand[0].itemIcon,
            roundCompleted: state.round
        };
        currentWinners.push(win);
        newWinners.push(win);
        nextRank = (nextRank + 1);
        receiverWon = true;
    }
    // 3. Determine next turn player:
    // - If receiver didn't win, receiver now has 5 cards and passes next!
    // - If receiver WON (i.e. starter made 4 upon receiving), remaining players all have 4 cards each.
    //   The passer (responsible player) passes next: "next pass will be made by 4 bcz he was responsible as 1 make all 4"
    let nextTurnPlayerId;
    if (!receiverWon) {
        nextTurnPlayerId = receiver.id;
    }
    else {
        // Receiver won! Passer makes the next pass if active, otherwise next active neighbor
        if (passer.status === 'active') {
            nextTurnPlayerId = passer.id;
        }
        else {
            const remainingActive = updatedPlayers.filter((p) => p.status === 'active');
            nextTurnPlayerId = remainingActive.length > 0 ? remainingActive[0].id : '';
        }
    }
    // 4. Automatic 4th place when 3 players have finished
    const remainingActive = updatedPlayers.filter((p) => p.status === 'active');
    if (remainingActive.length === 1 && currentWinners.length === 3) {
        const lastPlayer = remainingActive[0];
        lastPlayer.status = 'finished';
        lastPlayer.rank = 4;
        lastPlayer.completedItem = lastPlayer.hand[0]?.itemName || 'Set';
        lastPlayer.completedIcon = lastPlayer.hand[0]?.itemIcon;
        const lastWin = {
            rank: 4,
            playerId: lastPlayer.id,
            playerName: lastPlayer.name,
            itemName: lastPlayer.completedItem,
            itemIcon: lastPlayer.completedIcon,
            roundCompleted: state.round
        };
        currentWinners.push(lastWin);
        newWinners.push(lastWin);
    }
    const allFinished = updatedPlayers.every((p) => p.status === 'finished' || p.status === 'spectating');
    const nextDeadline = state.turnTimerSeconds > 0 ? Date.now() + state.turnTimerSeconds * 1000 : null;
    const nextState = {
        ...state,
        phase: allFinished ? 'GAME_COMPLETE' : 'PLAYING',
        round: state.round + 1,
        turnPlayerId: allFinished ? null : nextTurnPlayerId,
        turnDeadline: allFinished ? null : nextDeadline,
        players: updatedPlayers,
        winners: currentWinners,
        lastPass: passRecord,
        updatedAt: Date.now()
    };
    return {
        nextState,
        pass: passRecord,
        newWinners
    };
}
/**
 * Validate all critical invariants of the SOLAVIN game engine
 */
function validateInvariants(state) {
    const errors = [];
    if (state.phase !== 'LOBBY') {
        const allCards = [];
        for (const player of state.players) {
            allCards.push(...player.hand);
            if (player.status === 'active') {
                if (player.hand.length < 3 || player.hand.length > 5) {
                    errors.push(`Player ${player.name} (${player.id}) has invalid hand size ${player.hand.length}, expected 3, 4, or 5`);
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
        const cardIds = new Set();
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
function getPublicGameState(state) {
    const activePlayers = getActivePlayers(state);
    const activePassingOrder = getAnticlockwisePassingOrder(activePlayers).map((p) => p.id);
    const publicPlayers = state.players.map((p) => ({
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
function getPrivatePlayerState(state, playerId) {
    const player = state.players.find((p) => p.id === playerId);
    if (!player)
        return undefined;
    const activePlayers = getActivePlayers(state);
    const { target, source } = getPassingNeighbor(playerId, activePlayers);
    const publicPlayer = {
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
//# sourceMappingURL=engine.js.map