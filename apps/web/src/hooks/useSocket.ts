import { useState, useEffect, useRef, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import {
  FullRoomState,
  PublicGameState,
  PrivatePlayerState,
  WinnerResult,
  PassRecord,
  GameMode
} from '@solavin/shared';
import { sound } from '../lib/sound';

const SESSION_KEY = 'solavin_session';

interface SessionData {
  roomCode: string;
  playerId: string;
  playerName: string;
}

export function useSocket() {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [publicState, setPublicState] = useState<PublicGameState | null>(null);
  const [privateState, setPrivateState] = useState<PrivatePlayerState | null>(null);
  const [isPassing, setIsPassing] = useState<boolean>(false);
  const [lastPassRecord, setLastPassRecord] = useState<PassRecord | null>(null);
  const [activeCelebration, setActiveCelebration] = useState<WinnerResult | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'info' | 'success' | 'warning' | 'error' } | null>(null);

  const showToast = useCallback((message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 4000);
  }, []);

  useEffect(() => {
    const serverUrl =
      import.meta.env.VITE_SOCKET_URL ||
      (window.location.port === '3000'
        ? `${window.location.protocol}//${window.location.hostname}:3001`
        : window.location.origin);

    const s = io(serverUrl, {
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 10,
      reconnectionDelay: 1000
    });

    socketRef.current = s;

    s.on('connect', () => {
      setIsConnected(true);
      const saved = localStorage.getItem(SESSION_KEY);
      if (saved) {
        try {
          const session: SessionData = JSON.parse(saved);
          if (session.roomCode && session.playerId) {
            s.emit('room:join', {
              roomCode: session.roomCode,
              playerName: session.playerName,
              existingPlayerId: session.playerId
            }, (res: any) => {
              if (res && !res.success) {
                localStorage.removeItem(SESSION_KEY);
              }
            });
          }
        } catch {
          localStorage.removeItem(SESSION_KEY);
        }
      }
    });

    s.on('disconnect', () => {
      setIsConnected(false);
    });

    s.on('sync:state', (data: FullRoomState) => {
      setPublicState(data.publicState);
      if (data.privateState) {
        setPrivateState(data.privateState);
      }
    });

    s.on('game:passing', (data: { pass: PassRecord; nextTurnPlayerId: string }) => {
      setIsPassing(true);
      setLastPassRecord(data.pass);
      sound.playCardPass();

      setTimeout(() => {
        setIsPassing(false);
      }, 500);
    });

    s.on('game:player-finished', (winner: WinnerResult) => {
      setActiveCelebration(winner);
      sound.playSetComplete();
      setTimeout(() => {
        setActiveCelebration(null);
      }, 4500);
    });

    s.on('game:complete', () => {
      sound.playVictory();
    });

    s.on('notification', (payload: { type: any; message: string }) => {
      showToast(payload.message, payload.type);
      if (payload.type === 'info' && payload.message.includes('joined')) {
        sound.playJoin();
      }
      if (payload.type === 'success' && payload.message.includes('started')) {
        sound.playStart();
      }
    });

    s.on('error', (err: { message: string }) => {
      showToast(err.message, 'error');
    });

    return () => {
      s.disconnect();
    };
  }, [showToast]);

  const createRoom = useCallback(
    (
      playerName: string,
      themeId?: string,
      customTheme?: { name: string; items: string[] },
      turnTimerSeconds: number = 30,
      gameMode: GameMode = 'classic'
    ): Promise<{ success: boolean; error?: string }> => {
      return new Promise((resolve) => {
        if (!socketRef.current) return resolve({ success: false, error: 'Socket not connected' });
        socketRef.current.emit(
          'room:create',
          { playerName, themeId, customTheme, turnTimerSeconds, gameMode },
          (res: { success: boolean; roomCode?: string; playerId?: string; error?: string }) => {
            if (res.success && res.roomCode && res.playerId) {
              localStorage.setItem(
                SESSION_KEY,
                JSON.stringify({ roomCode: res.roomCode, playerId: res.playerId, playerName })
              );
              resolve({ success: true });
            } else {
              showToast(res.error || 'Failed to create room', 'error');
              resolve({ success: false, error: res.error });
            }
          }
        );
      });
    },
    [showToast]
  );

  const joinRoom = useCallback(
    (roomCode: string, playerName: string): Promise<{ success: boolean; error?: string }> => {
      return new Promise((resolve) => {
        if (!socketRef.current) return resolve({ success: false, error: 'Socket not connected' });
        socketRef.current.emit(
          'room:join',
          { roomCode, playerName },
          (res: { success: boolean; roomCode?: string; playerId?: string; error?: string }) => {
            if (res.success && res.roomCode && res.playerId) {
              localStorage.setItem(
                SESSION_KEY,
                JSON.stringify({ roomCode: res.roomCode, playerId: res.playerId, playerName })
              );
              resolve({ success: true });
            } else {
              showToast(res.error || 'Failed to join room', 'error');
              resolve({ success: false, error: res.error });
            }
          }
        );
      });
    },
    [showToast]
  );

  const updateSettings = useCallback(
    (payload: {
      themeId?: string;
      customTheme?: { name: string; items: string[] };
      turnTimerSeconds?: number;
      gameMode?: GameMode;
    }) => {
      if (!socketRef.current) return;
      socketRef.current.emit('room:update-settings', payload);
    },
    []
  );

  const startGame = useCallback(() => {
    if (!socketRef.current) return;
    socketRef.current.emit('game:start');
  }, []);

  const passCard = useCallback((cardId: string) => {
    if (!socketRef.current) return;
    sound.playCardSelect();
    socketRef.current.emit('game:pass-card', { cardId });
  }, []);

  const restartGame = useCallback(
    (options?: {
      sameTheme?: boolean;
      themeId?: string;
      customTheme?: { name: string; items: string[] };
      turnTimerSeconds?: number;
      gameMode?: GameMode;
    }) => {
      if (!socketRef.current) return;
      socketRef.current.emit('game:restart', options);
    },
    []
  );

  const leaveRoom = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    if (socketRef.current) {
      socketRef.current.emit('room:leave');
    }
    setPublicState(null);
    setPrivateState(null);
  }, []);

  return {
    isConnected,
    publicState,
    privateState,
    isPassing,
    lastPassRecord,
    activeCelebration,
    toast,
    createRoom,
    joinRoom,
    updateSettings,
    startGame,
    passCard,
    restartGame,
    leaveRoom
  };
}
