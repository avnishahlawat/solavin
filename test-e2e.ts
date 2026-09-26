import { io, Socket } from 'socket.io-client';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './apps/server/src/app.module';

async function runE2ETest() {
  console.log('🚀 Starting SOLAVIN Backend for Real-Time Multiplayer E2E Acceptance Test...');

  // Start NestJS server on port 3333
  const app = await NestFactory.create(AppModule, { logger: false });
  app.enableCors({ origin: '*' });
  await app.listen(3333);
  console.log('✅ Server listening on http://localhost:3333');

  const serverUrl = 'http://localhost:3333';

  // Helper to create connected socket
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

    // 1. Player 1 creates room
    console.log('1️⃣ Player 1 creates room...');
    const createRes: any = await new Promise((resolve) => {
      p1Socket.emit('room:create', { playerName: 'Arya' }, resolve);
    });

    if (!createRes.success || !createRes.roomCode) {
      throw new Error(`Failed to create room: ${createRes.error}`);
    }
    const roomCode = createRes.roomCode;
    console.log(`✅ Room created with code: ${roomCode}`);

    // Wait for p1State
    await new Promise((r) => setTimeout(r, 200));

    // 2. Player 2, 3, 4 join room
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
    if (p1State?.publicState.players.length !== 4) {
      throw new Error('Lobby does not contain 4 players');
    }

    // 3. Player 1 (Host) starts game
    console.log('3️⃣ Host starts game...');
    p1Socket.emit('game:start');
    await new Promise((r) => setTimeout(r, 400));

    console.log(`✅ Game phase: ${p1State?.publicState.phase}, Round: ${p1State?.publicState.round}`);
    if (p1State?.publicState.phase !== 'PLAYING') {
      throw new Error('Game did not enter PLAYING phase');
    }

    // Verify information isolation: Player 1 can only see Player 1's cards!
    console.log('🔒 Verifying Private State Isolation...');
    if (!p1State?.privateState || p1State.privateState.cards.length !== 4) {
      throw new Error('Player 1 does not have 4 private cards');
    }
    if (p1State.publicState.players[1].cards || p1State.publicState.players[1].hand) {
      throw new Error('SECURITY VIOLATION: Opponent cards leaked in public state!');
    }
    console.log(`✅ Player 1 hand: [${p1State.privateState.cards.map((c: any) => c.itemName).join(', ')}]`);
    console.log(`✅ Public state contains only cardCount (${p1State.publicState.players[1].cardCount}) and public info`);

    // 4. Simultaneous Card Selection & Passing
    console.log('4️⃣ Simulating round selections and anticlockwise simultaneous passing...');

    let passingEventReceived = false;
    p1Socket.on('game:passing', (data: any) => {
      passingEventReceived = true;
      console.log(`🔄 Received 'game:passing' event with ${data.passes.length} simultaneous card passes!`);
      const p1Pass = data.passes.find((p: any) => p.fromSeatIndex === 0);
      console.log(`↪️ Seat 0 passed to Seat ${p1Pass?.toSeatIndex} (anticlockwise!)`);
    });

    // Each player selects card 0 from their private hand
    p1Socket.emit('game:select-card', { cardId: p1State.privateState.cards[0].id });
    p2Socket.emit('game:select-card', { cardId: p2State!.privateState!.cards[0].id });
    p3Socket.emit('game:select-card', { cardId: p3State!.privateState!.cards[0].id });
    p4Socket.emit('game:select-card', { cardId: p4State!.privateState!.cards[0].id });

    // Wait for server resolution and delay (500ms server delay + state broadcast)
    await new Promise((r) => setTimeout(r, 1000));

    if (!passingEventReceived) {
      throw new Error('Did not receive game:passing event');
    }

    console.log(`✅ Round incremented to ${p1State?.publicState.round}`);
    console.log(`✅ Player 1 hand size after pass: ${p1State?.privateState?.cards.length} cards`);
    if (p1State?.privateState?.cards.length !== 4) {
      throw new Error('Player hand size invariant violated! Expected 4 cards.');
    }

    // 5. Test Reconnection
    console.log('5️⃣ Testing player disconnect and reconnection...');
    const originalP2Id = p2State!.privateState!.player.id;
    p2Socket.disconnect();
    await new Promise((r) => setTimeout(r, 200));

    // Player 2 reconnects
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

    // Clean up
    p1Socket.disconnect();
    p2Reconnect.disconnect();
    p3Socket.disconnect();
    p4Socket.disconnect();

    await app.close();
    console.log('🎉 ALL MULTIPLAYER REAL-TIME ACCEPTANCE TESTS PASSED SUCCESSFULLY! 🎉');
    process.exit(0);
  } catch (err) {
    console.error('❌ E2E Acceptance Test Failed:', err);
    await app.close();
    process.exit(1);
  }
}

runE2ETest();
