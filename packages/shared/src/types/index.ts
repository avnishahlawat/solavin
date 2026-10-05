export type PlayerStatus = 'active' | 'finished' | 'disconnected' | 'spectating';

export type GamePhase =
  | 'LOBBY'
  | 'STARTING'
  | 'PLAYING'
  | 'PASSING'
  | 'ROUND_RESOLVED'
  | 'GAME_COMPLETE';

export type GameMode = 'classic' | 'pro';

export interface ThemeItem {
  id: string;
  name: string;
  category?: string;
  icon?: string;
  description?: string;
}

export interface Theme {
  id: string;
  name: string;
  category: string;
  description?: string;
  items: [ThemeItem, ThemeItem, ThemeItem, ThemeItem];
  isCustom?: boolean;
}

export interface Card {
  id: string; // e.g. "interstellar-1"
  itemId: string;
  itemName: string;
  itemCategory?: string;
  itemIcon?: string;
}

export interface PublicPlayer {
  id: string;
  name: string;
  isHost: boolean;
  seatIndex: number; // 0, 1, 2, 3
  status: PlayerStatus;
  rank?: 1 | 2 | 3 | 4;
  completedItem?: string;
  cardCount: number;
  isConnected: boolean;
}

export interface PassRecord {
  fromPlayerId: string;
  toPlayerId: string;
  fromSeatIndex: number;
  toSeatIndex: number;
  cardId?: string;
}

export interface WinnerResult {
  rank: 1 | 2 | 3 | 4;
  playerId: string;
  playerName: string;
  itemName: string;
  itemIcon?: string;
  roundCompleted: number;
}

export interface PublicGameState {
  roomCode: string;
  phase: GamePhase;
  round: number;
  gameMode: GameMode;
  players: PublicPlayer[];
  theme: Theme;
  hostId: string;
  turnPlayerId: string | null;
  starterPlayerId: string | null;
  turnDeadline: number | null; // Timestamp (ms) when current turn expires
  turnTimerSeconds: number;    // e.g. 30, 60, or 0 (no timer)
  activePassingOrder: string[]; // List of playerIds in anticlockwise order
  lastPass?: PassRecord;
  winners: WinnerResult[];
  totalActivePlayers: number;
  updatedAt: number;
}

export interface PrivatePlayerState {
  player: PublicPlayer;
  cards: Card[];
  isYourTurn: boolean;
  forbiddenCardId?: string;
  passingTo?: {
    id: string;
    name: string;
    seatIndex: number;
  };
  receivingFrom?: {
    id: string;
    name: string;
    seatIndex: number;
  };
}

export interface FullRoomState {
  publicState: PublicGameState;
  privateState?: PrivatePlayerState;
}

// Client to Server Events
export interface ClientToServerEvents {
  'room:create': (
    payload: {
      playerName: string;
      themeId?: string;
      customTheme?: { name: string; items: string[] };
      turnTimerSeconds?: number;
      gameMode?: GameMode;
    },
    callback?: (response: { success: boolean; roomCode?: string; playerId?: string; error?: string }) => void
  ) => void;
  'room:join': (
    payload: { roomCode: string; playerName: string; existingPlayerId?: string },
    callback?: (response: { success: boolean; roomCode?: string; playerId?: string; error?: string }) => void
  ) => void;
  'room:leave': () => void;
  'room:update-settings': (payload: {
    themeId?: string;
    customTheme?: { name: string; items: string[] };
    turnTimerSeconds?: number;
    gameMode?: GameMode;
  }) => void;
  'game:start': () => void;
  'game:pass-card': (payload: { cardId: string }) => void;
  'game:restart': (payload?: {
    sameTheme?: boolean;
    themeId?: string;
    customTheme?: { name: string; items: string[] };
    turnTimerSeconds?: number;
    gameMode?: GameMode;
  }) => void;
}

// Server to Client Events
export interface ServerToClientEvents {
  'sync:state': (payload: FullRoomState) => void;
  'game:passing': (payload: { pass: PassRecord; nextTurnPlayerId: string }) => void;
  'game:player-finished': (payload: WinnerResult) => void;
  'game:complete': (payload: { winners: WinnerResult[] }) => void;
  'notification': (payload: { type: 'info' | 'success' | 'warning' | 'error'; message: string }) => void;
  'error': (payload: { message: string; code?: string }) => void;
}
