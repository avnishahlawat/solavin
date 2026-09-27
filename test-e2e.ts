import { io, Socket } from 'socket.io-client';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './apps/server/src/app.module';

async function runE2ETest() {
  console.log('🚀 Starting SOLAVIN Backend for Turn-Based Multiplayer E2E Acceptance Test...');

  // Start NestJS server on port 3333
  const app = await NestFactory.create(AppModule, { logger: false });
  app.enableCors({ origin: '*' });
  await app.listen(3333);
  console.log('✅ Server listening on http://localhost:3333');

  const serverUrl = 'http://localhost:3333';

  function createClient(name: string): Promise<Socket> {
    return new Promise((resolve) => {
      const socket = io(serverUrl, { transports: ['websocket'] });
      socket.on('connect', () => {
        resolve(socket);
      });
    });
  }

  try {
    console.log('👥 Connecting 4 real Socket.IO clients (Player 1, 2, 3, 4)...');
    const p1Socket = await createClient('Player 1 (Arya)');
    const p2Socket = await createClient('Player 2 (Rahul)');
    const p3Socket = await createClient('Player 3 (Priya)');
    const p4Socket = await createClient('Player 4 (Aman)');

    let p1State: any = null;
    let p2State: any = null;
    let p3State: any = null;
    let p4State: any = null;

    p1Socket.on('sync:state', (s: any) => (p1State = s));
    p2Socket.on('sync:state', (s: any) => (p2State = s));
    p3Socket.on('sync:state', (s: any) => (p3State = s));
    p4Socket.on('sync:state', (s: any) => (p4State = s));

    // 1. Player 1 creates room with 30s timer
    console.log('1️⃣ Player 1 creates room (30s timer)...');
    const createRes: any = await new Promise((resolve) => {
      p1Socket.emit('room:create', { playerName: 'Arya', turnTimerSeconds: 30 }, resolve);
    });

    if (!createRes.success || !createRes.roomCode) {
      throw new Error(`Failed to create room: ${createRes.error}`);
    }
    const roomCode = createRes.roomCode;
    console.log(`✅ Room created with code: ${roomCode}`);

    await new Promise((r) => setTimeout(r, 200));

    // 2. Players 2, 3, 4 join room
    console.log('2️⃣ Players 2, 3, 4 join room...');
    await new Promise((resolve) => {
      p2Socket.emit('room:join', { roomCode, playerName: 'Rahul' }, resolve);
    });
    await new Promise((resolve) => {
      p3Socket.emit('room:join', { roomCode, playerName: 'Priya' }, resolve);
    });
    await new Promise((resolve) => {
      p4Socket.emit('room:join', { roomCode, playerName: 'Aman' }, resolve);
    });

    await new Promise((r) => setTimeout(r, 300));
    console.log(`✅ Lobby populated: ${p1State?.publicState.players.length}/4 players`);

    // 3. Start game
    console.log('3️⃣ Host starts game...');
    p1Socket.emit('game:start');
    await new Promise((r) => setTimeout(r, 400));

    console.log(`✅ Game phase: ${p1State?.publicState.phase}, Round: ${p1State?.publicState.round}`);
    const starterId = p1State.publicState.starterPlayerId;
    const turnPlayerId = p1State.publicState.turnPlayerId;
    console.log(`🎲 Randomly chosen starter: ${starterId} (Turn: ${turnPlayerId})`);

    if (starterId !== turnPlayerId) {
      throw new Error('Starter player should have the first turn!');
    }

    // Verify information isolation
    console.log('🔒 Verifying Private State Isolation...');
    if ((p1State.publicState.players[1] as any).cards || (p1State.publicState.players[1] as any).hand) {
      throw new Error('SECURITY VIOLATION: Opponent cards leaked in public state!');
    }

    // Find socket of starter
    const socketMap: Record<string, { socket: Socket; getState: () => any }> = {
      [p1State.privateState.player.id]: { socket: p1Socket, getState: () => p1State },
      [p2State.privateState.player.id]: { socket: p2Socket, getState: () => p2State },
      [p3State.privateState.player.id]: { socket: p3Socket, getState: () => p3State },
      [p4State.privateState.player.id]: { socket: p4Socket, getState: () => p4State }
    };

    const starterInfo = socketMap[starterId];
    const starterCard = starterInfo.getState().privateState.cards[0];

    // 4. Starter passes 1 card
    console.log(`4️⃣ Starter passes 1 card (${starterCard.itemName}) anticlockwise...`);
    starterInfo.socket.emit('game:pass-card', { cardId: starterCard.id });

    // Wait for pass resolution
    await new Promise((r) => setTimeout(r, 600));

    // Verify: starter now has 3 cards!
    const starterAfter = starterInfo.getState();
    console.log(`✅ Starter now has ${starterAfter.privateState.cards.length} cards (expected: 3)`);
    if (starterAfter.privateState.cards.length !== 3) {
      throw new Error('Starter should have 3 cards after passing first card!');
    }

    // Next turn player should now have 5 cards!
    const nextTurnId = p1State.publicState.turnPlayerId;
    const nextTurnInfo = socketMap[nextTurnId];
    console.log(`✅ Next turn is on ${nextTurnId}, who now has ${nextTurnInfo.getState().privateState.cards.length} cards (expected: 5)`);
    if (nextTurnInfo.getState().privateState.cards.length !== 5) {
      throw new Error('Receiving player should have 5 cards!');
    }

    // 5. Next player passes 1 card
    const cardToPass2 = nextTurnInfo.getState().privateState.cards[0];
    console.log(`5️⃣ Player with 5 cards passes 1 card (${cardToPass2.itemName}) anticlockwise...`);
    nextTurnInfo.socket.emit('game:pass-card', { cardId: cardToPass2.id });

    await new Promise((r) => setTimeout(r, 600));

    // Player who had 5 cards now has 4 cards!
    console.log(`✅ That player now has ${nextTurnInfo.getState().privateState.cards.length} cards (expected: 4)`);
    if (nextTurnInfo.getState().privateState.cards.length !== 4) {
      throw new Error('Player should return to 4 cards after passing!');
    }

    // 6. Test Disconnect & Reconnect
    console.log('6️⃣ Testing player disconnect and reconnection...');
    const originalP2Id = p2State.privateState.player.id;
    p2Socket.disconnect();
    await new Promise((r) => setTimeout(r, 200));

    const p2Reconnect = await createClient('Player 2 Reconnect');
    let p2ReconnectedState: any = null;
    p2Reconnect.on('sync:state', (s: any) => (p2ReconnectedState = s));

    await new Promise((resolve) => {
      p2Reconnect.emit('room:join', {
        roomCode,
        playerName: 'Rahul',
        existingPlayerId: originalP2Id
      }, resolve);
    });

    await new Promise((r) => setTimeout(r, 300));
    if (!p2ReconnectedState || p2ReconnectedState.privateState?.player.id !== originalP2Id) {
      throw new Error('Reconnection failed to restore player session');
    }
    console.log(`✅ Reconnected player successfully restored hand of ${p2ReconnectedState.privateState.cards.length} cards!`);

    p1Socket.disconnect();
    p2Reconnect.disconnect();
    p3Socket.disconnect();
    p4Socket.disconnect();

    await app.close();
    console.log('🎉 ALL TURN-BASED MULTIPLAYER ACCEPTANCE TESTS PASSED! 🎉');
    process.exit(0);
  } catch (err) {
    console.error('❌ E2E Acceptance Test Failed:', err);
    await app.close();
    process.exit(1);
  }
}

runE2ETest();
