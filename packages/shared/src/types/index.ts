export type PlayerStatus = 'active' | 'finished' | 'disconnected' | 'spectating';

export type GamePhase =
  | 'LOBBY'
  | 'STARTING'
  | 'PLAYING'
  | 'PASSING'
  | 'ROUND_RESOLVED'
  | 'GAME_COMPLETE';

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
  hasSelectedCard: boolean;
  isConnected: boolean;
}

export interface PassRecord {
  fromPlayerId: string;
  toPlayerId: string;
  fromSeatIndex: number;
  toSeatIndex: number;
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
  players: PublicPlayer[];
  theme: Theme;
  hostId: string;
  activePassingOrder: string[]; // List of playerIds in anticlockwise order
  lastPass?: PassRecord[];
  winners: WinnerResult[];
  readyCount: number;
  totalActivePlayers: number;
  allReady: boolean;
  updatedAt: number;
}

export interface PrivatePlayerState {
  player: PublicPlayer;
  cards: Card[];
  selectedCardId?: string | null;
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
    payload: { playerName: string; themeId?: string; customTheme?: { name: string; items: string[] } },
    callback?: (response: { success: boolean; roomCode?: string; playerId?: string; error?: string }) => void
  ) => void;
  'room:join': (
    payload: { roomCode: string; playerName: string; existingPlayerId?: string },
    callback?: (response: { success: boolean; roomCode?: string; playerId?: string; error?: string }) => void
  ) => void;
  'room:leave': () => void;
  'room:update-theme': (payload: { themeId?: string; customTheme?: { name: string; items: string[] } }) => void;
  'game:start': () => void;
  'game:select-card': (payload: { cardId: string }) => void;
  'game:restart': (payload?: { sameTheme?: boolean; themeId?: string; customTheme?: { name: string; items: string[] } }) => void;
}

// Server to Client Events
export interface ServerToClientEvents {
  'sync:state': (payload: FullRoomState) => void;
  'game:passing': (payload: { passes: PassRecord[]; nextRound: number }) => void;
  'game:player-finished': (payload: WinnerResult) => void;
  'game:complete': (payload: { winners: WinnerResult[] }) => void;
  'notification': (payload: { type: 'info' | 'success' | 'warning' | 'error'; message: string }) => void;
  'error': (payload: { message: string; code?: string }) => void;
}
