# SOLAVIN 🃏

> **Think ahead. Pass smart. Complete the set.**  
> A high-speed, real-time multiplayer implementation of the traditional Indian **16 Parchi** (Four-of-a-Kind) card strategy game, crafted for exactly **4 players**.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue.svg)](https://www.typescriptlang.org/)
[![NestJS](https://img.shields.io/badge/NestJS-10.x-red.svg)](https://nestjs.com/)
[![React](https://img.shields.io/badge/React-18.x-61dafb.svg)](https://react.dev/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-4.7-black.svg)](https://socket.io/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8.svg)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 🌟 Game Overview

**SOLAVIN** brings the authentic turn-based excitement of traditional 16 Parchi into a modern, responsive web application. Built on an authoritative **TypeScript monorepo architecture**, SOLAVIN guarantees competitive integrity: opponent cards are never transmitted over the network, preventing any client-side inspect cheating.

Players can jump into games instantly via **6-character room codes**, direct invite links, or scannable **QR codes**.

---

## 🎮 Game Modes

| Feature | 🎲 Classic Mode | ⚡ Pro Mode |
| :--- | :--- | :--- |
| **Passing Rule** | Any card in hand can be passed freely. | You **cannot** pass the card you just received on the same turn. |
| **Strategic Depth** | Fast-paced, intuitive, casual-friendly. | High tactical deduction; bluffing and holding required. |
| **Starter Exemption** | N/A | Round starter (who drops to 3 cards) **can** pass the received card upon reaching 4 cards to complete the cycle. |
| **Winning Shift** | Standard cycle resumes. | When a receiver completes a winning set, the player who passed to them becomes the next starter. |
| **Card Lock UI** | All cards always selectable. | Forbidden card is badged with `🔒 LOCKED / RECEIVED` and disabled. |

---

## 🎨 Theme & Appearance

SOLAVIN features a dynamic multi-theme engine accessible from the top navigation bar:

- 🌙 **Dark Mode**: Cyberpunk-inspired deep slate and violet gaming aesthetic.
- ☀️ **Light Mode**: Crisp, high-contrast daylight theme with pristine readability.
- ☯️ **Black & White Mode**: Pure minimalist monochrome aesthetic.
- 🎴 **16+ Deck Themes**: Choose preset decks (Classic Kings & Queens, Animals, Cyberpunk, Bollywood, Space, Food, and Black & White Monochrome) or generate custom card sets.

---

## 🔄 Turn-Based Gameplay Flow

```mermaid
flowchart TD
    A["Host Creates Game<br/>Sets Timer & Mode"] --> B["Select or Create Theme"]
    B --> C["Generate Room Code<br/>(e.g. LTKGTM)"]
    C --> D["4 Players Join Room"]
    D --> E["Host Starts Game"]
    E --> F["Server Deals 16 Cards<br/>(4 to each player)"]
    F --> G["Server Picks 1 Starter"]
    G --> H["Starter Passes 1st Card<br/>(Hand: 4 → 3 Cards)"]
    H --> I["Neighbor Receives Card<br/>(Hand: 4 → 5 Cards)"]
    I --> J["Turn Timer Starts<br/>(Player with 5 Cards)"]
    J --> K["Player Passes 1 Card<br/>(Hand: 5 → 4 Cards)"]
    K --> L{"Check for 4<br/>Matching Cards"}
    L -- "Complete (Win)" --> M["Award Standings<br/>(1st, 2nd, 3rd)"]
    L -- "Incomplete" --> N["Next Player Receives<br/>(Cycle Continues)"]
    N --> J
```

---

## ⏱️ Core Mechanics & Rules

1. **The 16-Card Deck**:
   - The deck consists of **exactly 16 cards** composed of 4 unique ranks/items, with 4 identical copies each.
   - At the beginning of the match, all 16 cards are shuffled and dealt evenly (4 cards each to all 4 players).

2. **The 3 vs 5 Card Dynamic**:
   - A random player is designated as the **Starter** (`starterPlayerId`).
   - The Starter initiates the round by passing 1 card anticlockwise, leaving them with **3 cards**.
   - The receiving player now holds **5 cards** and enters an active turn.
   - That player must choose 1 card to pass anticlockwise to return to **4 cards**.
   - When the card completes a full rotation back to the starter, the starter receives it and returns to **4 cards**.

3. **Turn Timers & Intelligent Auto-Pass**:
   - Room hosts can set turn limits: **15s, 30s, 45s, 60s**, or **No Timer**.
   - If the timer expires before a move is made, the server automatically passes an optimal non-matching card to maintain game tempo.
   - In **Pro Mode**, the auto-pass engine strictly filters out locked cards to prevent illegal discards.

4. **Winning & Standings**:
   - To win, a player must possess **all 4 identical cards of a single rank**.
   - A player holding 5 cards cannot declare a win until they pass their 5th card and verify their remaining 4 cards match.
   - Players are ranked **1st, 2nd, and 3rd place**. The 4th player remaining without a set is the runner-up.
   - **Private Winner Celebrations**: Confetti and celebratory audio trigger exclusively on the winner's device, while remaining players receive sleek status updates.

---

## 📐 System Architecture

```mermaid
flowchart TD
    subgraph Clients ["Clients (Any Device)"]
        P1["Player 1 (Host)<br/>Desktop / Mobile"]
        P2["Player 2<br/>Mobile"]
        P3["Player 3<br/>Tablet"]
        P4["Player 4<br/>Laptop"]
    end

    subgraph Server ["NestJS Authoritative Server"]
        Gateway["Socket.IO Gateway<br/>/socket.io"]
        RoomsSvc["Rooms Service<br/>(Codes, Seats, Settings)"]
        GamesSvc["Games Service<br/>(Turns, State, Auto-Pass)"]
        Engine["Game Engine<br/>(@solavin/shared)"]
        Prisma["Prisma ORM<br/>(Optional DB)"]
    end

    subgraph Storage ["Persistence Layer"]
        PG[("PostgreSQL / In-Memory<br/>Match Records")]
    end

    P1 <--> Gateway
    P2 <--> Gateway
    P3 <--> Gateway
    P4 <--> Gateway

    Gateway <--> RoomsSvc
    Gateway <--> GamesSvc
    GamesSvc <--> Engine
    GamesSvc -.-> Prisma
    Prisma -.-> PG
```

### Security & State Segregation
- **`PublicGameState`**: Broadcasted to all room participants. Contains player IDs, seating layout, card counts (`handSize: number`), active turn pointer, and round history.
- **`PrivatePlayerState`**: Dispatched exclusively to the individual socket. Contains full card objects in hand (`hand: Card[]`), personal win status, and computed `forbiddenCardId`.

---

## 📂 Project Structure

```text
solavin/
├── apps/
│   ├── web/                     # React 18 + Vite + Tailwind CSS + Lucide
│   │   ├── src/
│   │   │   ├── components/      # GameTable, Cards, Lobby, Modals, Header
│   │   │   ├── hooks/           # useSocket (Multiplayer gateway), useTheme (Dark/Light/BW)
│   │   │   ├── lib/             # Web Audio API sound synthesizer
│   │   │   ├── index.css        # Multi-theme CSS variable design tokens
│   │   │   └── App.tsx          # Root view controller
│   │   ├── vite.config.ts       # Reverse proxy (/api & /socket.io -> :3001)
│   │   └── package.json
│   │
│   └── server/                  # NestJS 10 + Socket.IO + Prisma
│       ├── src/
│       │   ├── rooms/           # Room codes, seat allocation, host migration
│       │   ├── games/           # Authoritative state machine & turn timers
│       │   ├── websocket/       # Gateway broadcasting private & public state
│       │   ├── prisma/          # Database persistence with pure in-memory fallback
│       │   └── main.ts          # Server entrypoint (Port 3001)
│       └── package.json
│
├── packages/
│   └── shared/                  # Pure TypeScript Game Engine & Types
│       ├── src/
│       │   ├── constants/       # Preset themes (B&W, Classic, Cyberpunk, etc.)
│       │   ├── engine/          # Authoritative deal, pass & win detection algorithms
│       │   ├── engine.spec.ts   # Comprehensive test suite (Classic & Pro mode)
│       │   ├── types/           # Shared models, DTOs & Socket event contracts
│       │   └── index.ts
│       └── package.json
│
├── docker-compose.yml           # Multi-container local orchestration
├── test-e2e.ts                  # Automated 4-player WebSocket acceptance test
└── README.md                    # Project documentation
```

---

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
- **Node.js**: `v20.x` or later
- **npm**: `v10.x` or later

### 2. Installation
Clone the repository and install all workspace dependencies:
```bash
git clone https://github.com/avnishahlawat/solavin.git
cd solavin
npm install
```

### 3. Build Workspaces
Compile the shared engine and build output:
```bash
npm run build
```

### 4. Run Tests
```bash
# Run unit tests for game rules, modes, and deck logic
npm test --workspace=@solavin/shared

# Run full 4-client automated WebSocket E2E test
npx tsx test-e2e.ts
```

### 5. Start Development Servers
Run the backend and frontend concurrently in two terminals:

```bash
# Terminal 1: NestJS Backend API & WebSockets (Port 3001)
npm run dev:server

# Terminal 2: React Vite Web Frontend (Port 3000)
npm run dev:web
```

Access the application in your browser:
- **Web App**: [http://localhost:3000](http://localhost:3000)
- **Backend Health Check**: [http://localhost:3001/health](http://localhost:3001/health)

---

## 🐳 Running with Docker Compose

To spin up the frontend, backend, and PostgreSQL in isolated containers:

```bash
docker compose up --build
```
- **Web Client**: `http://localhost:3000`
- **Server API**: `http://localhost:3001`
- **PostgreSQL**: `localhost:5432`

---

## 📡 WebSocket Event Contracts

### Client to Server (`client -> server`)
| Event | Payload | Description |
| :--- | :--- | :--- |
| `room:create` | `{ playerName, avatar, settings? }` | Create a new room with custom mode and timer |
| `room:join` | `{ roomCode, playerName, avatar }` | Join an existing room via 6-character code |
| `room:update-settings` | `{ roomCode, settings }` | Update theme, gameMode, or timer (Host only) |
| `game:start` | `{ roomCode }` | Deal cards and initiate match (Requires 4 players) |
| `game:pass-card` | `{ roomCode, cardId }` | Pass 1 card to the next player |
| `game:restart` | `{ roomCode, themeId?, gameMode? }` | Reset cards and start a new round |

### Server to Client (`server -> client`)
| Event | Payload | Description |
| :--- | :--- | :--- |
| `room:state` | `Room` | Active room metadata, player roster, and settings |
| `game:public-state` | `PublicGameState` | Global card counts, current turn, standings |
| `game:private-state`| `PrivatePlayerState` | Player's private hand and `forbiddenCardId` |
| `game:won` | `{ playerId, rank }` | Broadcasted when a player completes 4 matching cards |
| `game:ended` | `{ standings }` | Broadcasted when match concludes with final rankings |
| `error` | `{ message }` | Action rejection notice (e.g. invalid move) |

---

## 🚢 Production Deployment

### 1. Database (Optional)
SOLAVIN works **out of the box with zero database setup** using in-memory state. For permanent match history, provide any PostgreSQL database URI:
- [Neon.tech](https://neon.tech) or [Supabase](https://supabase.com) free-tier instance.
- Set `DATABASE_URL="postgresql://user:password@host/db?sslmode=require"`.

### 2. Backend Deployment (Render, Railway, Fly.io)
- **Root Directory**: `apps/server` (or repository root)
- **Build Command**:
  ```bash
  npm run build --workspace=@solavin/shared && npm run build --workspace=@solavin/server
  ```
- **Start Command**:
  ```bash
  node apps/server/dist/main.js
  ```
- **Environment Variables**:
  ```env
  NODE_ENV=production
  PORT=3001
  CORS_ORIGIN=*
  DATABASE_URL=your_postgres_connection_string # (Optional)
  ```

### 3. Frontend Deployment (Vercel, Netlify, Cloudflare)
- **Framework Preset**: Vite
- **Root Directory**: `apps/web`
- **Build Command**: `npm run build --workspace=@solavin/web`
- **Output Directory**: `dist`
- **Environment Variables**:
  ```env
  VITE_SOCKET_URL=https://your-backend-domain.com
  ```

---

## 📄 License
Released under the [MIT License](LICENSE). © SOLAVIN Team.
