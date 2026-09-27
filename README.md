# SOLAVIN 🃏

> **Think ahead. Pass smart. Complete the set.**  
> A modern, real-time multiplayer implementation of the traditional Indian **16 Parchi** (Four-of-a-Kind) card strategy game designed for exactly **4 players**.

[![CI Pipeline](https://github.com/solavin/solavin/actions/workflows/ci.yml/badge.svg)](https://github.com/solavin/solavin/actions)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue.svg)](https://www.typescriptlang.org/)
[![NestJS](https://img.shields.io/badge/NestJS-10.x-red.svg)](https://nestjs.com/)
[![React](https://img.shields.io/badge/React-18.x-61dafb.svg)](https://react.dev/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-4.7-black.svg)](https://socket.io/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8.svg)](https://tailwindcss.com/)

---

## 🌟 Game Overview

**SOLAVIN** brings the authentic turn-based gameplay of traditional 16 Parchi to the modern web. Built with a **TypeScript-first monorepo**, it features authoritative server-side mechanics, zero card leaks to browser inspectors, instant room sharing via 6-character codes, invite links, and QR codes.

### Core Turn-Based Flow

```mermaid
flowchart TD
    A["Host Creates Game & Configures Turn Timer (e.g. 30s, 1m, or Off)"] --> B["Select or Create Theme"]
    B --> C["Generate Room Code (e.g. LTKGTM)"]
    C --> D["4 Players Join Room"]
    D --> E["Host Starts Game"]
    E --> F["Server Deals 16 Cards (4 to each of the 4 players)"]
    F --> G["🎲 Server Randomly Picks 1 Player as STARTER"]
    G --> H["Starter Discards 1 Card First (Starter: 4 → 3 Cards)"]
    H --> I["Anticlockwise Neighbor Receives Card (Neighbor: 4 → 5 Cards)"]
    I --> J["Turn Timer Starts for Player with 5 Cards (e.g. 30s)"]
    J --> K["Player with 5 Cards Chooses & Passes 1 Card (5 → 4 Cards)"]
    K --> L["Check if Passing Player has 4 Matching Cards"]
    L -- Set Complete --> M["Award Rank: 1st, 2nd, 3rd, 4th"]
    L -- Incomplete --> N["Next Anticlockwise Neighbor Receives Card"]
    N --> J
```

---

## ⏱️ Turn Timer & Starter Mechanics

1. **Random Starter**: At game start, one player is chosen randomly as the **Starter** (`starterPlayerId`). The Starter has the first turn to discard a card anticlockwise.
2. **3 vs 5 Card Dynamic**:
   * After the Starter passes their first card, the Starter has **3 cards**.
   * The next player in the anticlockwise direction receives the card and now has **5 cards**.
   * The player with 5 cards has their turn timer ticking (configurable: 15s, 30s, 45s, 60s, or No Timer).
   * They choose which card to keep and which to pass anticlockwise. Once passed, they return to **4 cards**, and the next player receives the 5th card!
   * When cards make a full round back to the starter, the starter receives a card and returns to 4 cards.
3. **Turn Timeout Auto-Pass**: If a player's timer expires before choosing, the server authoritatively auto-discards a non-matching card to keep the game flowing seamlessly.
4. **4-Card Win Condition**:
   * A player can only win when they hold **exactly 4 matching cards**.
   * If a player holds 5 cards, they cannot win early; they must pass 1 card on their turn. If their remaining 4 cards match, they win!
   * If the starter receives their 4th card and all 4 match, the starter wins, and the player who passed to them initiates the next pass.
5. **Private Celebrations**: Celebratory animations and confetti trigger **only on the winner's device**, while other players receive a clean, non-intrusive notification.

---

## 📐 Architecture

```mermaid
graph TB
    subgraph Clients["Clients (Any Device / Network)"]
        P1["Player 1 (Host)\nDesktop / Phone"]
        P2["Player 2\nPhone"]
        P3["Player 3\nTablet"]
        P4["Player 4\nLaptop"]
    end

    subgraph Server["NestJS Authoritative Server"]
        Gateway["Socket.IO Gateway\n/socket.io"]
        RoomsSvc["Rooms Service\n(Codes, Seats, Timer Settings)"]
        GamesSvc["Games Service\n(Turns, State Machine, Auto-pass)"]
        Engine["Pure Game Engine\n(@solavin/shared)"]
        Prisma["Prisma ORM"]
    end

    subgraph Storage["Persistent Layer"]
        PG[("PostgreSQL\n(Match Records)")]
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

---

## 📂 Project Structure

```text
solavin/
├── apps/
│   ├── web/                     # React 18 + Vite + Tailwind CSS + Lucide
│   │   ├── src/
│   │   │   ├── components/      # UI: GameTable, Cards, Lobby, Modals, Header
│   │   │   ├── hooks/           # useSocket (Session resilience & Socket.IO client)
│   │   │   ├── lib/             # Web Audio API sound synthesizer
│   │   │   └── App.tsx          # Main orchestrator
│   │   └── package.json
│   │
│   └── server/                  # NestJS + Socket.IO + Prisma + PostgreSQL
│       ├── src/
│       │   ├── rooms/           # Room code generation, host migration, seat assignments
│       │   ├── games/           # Authoritative state machine & turn timer auto-pass
│       │   ├── websocket/       # Gateway broadcasting private hands & public state
│       │   ├── prisma/          # Optional PostgreSQL persistence
│       │   └── main.ts          # Server bootstrap
│       └── package.json
│
├── packages/
│   └── shared/                  # Pure TypeScript Game Engine & Types
│       ├── src/
│       │   ├── constants/       # 15+ Preset themes & custom theme generator
│       │   ├── engine/          # Authoritative turn passing, deal & win detection
│       │   ├── types/           # Shared types & Socket.IO contracts
│       │   └── index.ts
│       └── package.json
│
├── docker-compose.yml           # Multi-container orchestration (Postgres, Server, Web)
├── .env.example                 # Configuration template
├── test-e2e.ts                  # Automated 4-player WebSocket acceptance test
└── README.md                    # Complete documentation & deployment guide
```

---

## 🚀 Quick Start (Local Development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Build the Shared Package
```bash
npm run build --workspace=@solavin/shared
```

### 3. Run Automated Tests
```bash
# Pure game engine unit tests
node --test packages/shared/dist/engine/engine.spec.js

# Real-time 4-player Socket.IO turn-based E2E acceptance test
npx ts-node -r tsconfig-paths/register test-e2e.ts
```

### 4. Start Development Servers
In two separate terminals:

```bash
# Terminal 1: NestJS Backend (Port 3001)
npm run dev:server

# Terminal 2: React Frontend (Port 3000)
npm run dev:web
```

Open `http://localhost:3000` in multiple browser windows or separate devices on your local network to play!

---

## 🐳 Running with Docker Compose

Run the entire application along with PostgreSQL in containers:

```bash
docker compose up --build
```
* **Frontend**: `http://localhost:3000`
* **Backend**: `http://localhost:3001`
* **PostgreSQL**: `localhost:5432`

---

## 🚢 Deployment Guide (Free Tier Ready)

### 1. Database (Neon / Supabase)
1. Create a free PostgreSQL instance at [Neon.tech](https://neon.tech) or [Supabase](https://supabase.com).
2. Copy the connection string: `postgresql://user:password@ep-xyz.neon.tech/neondb?sslmode=require`.

### 2. Backend Deployment (Render / Railway / Fly.io)
Deploy the NestJS server:
* **Root Directory**: `apps/server` (or monorepo root)
* **Build Command**:
  ```bash
  npm run build --workspace=@solavin/shared && npm run prisma:generate --workspace=@solavin/server && npm run build --workspace=@solavin/server
  ```
* **Start Command**:
  ```bash
  node apps/server/dist/main.js
  ```
* **Environment Variables**:
  * `NODE_ENV=production`
  * `PORT=3001`
  * `CORS_ORIGIN=*` (or your frontend Vercel URL)
  * `DATABASE_URL=your_postgres_connection_string`

### 3. Frontend Deployment (Vercel)
Deploy the React frontend:
* **Framework Preset**: Vite
* **Root Directory**: `apps/web`
* **Build Command**: `npm run build --workspace=@solavin/web`
* **Output Directory**: `dist`
* **Environment Variables**:
  * `VITE_SOCKET_URL=https://your-backend.onrender.com` (Your Render/Railway backend URL)

---

## 📄 License
MIT © SOLAVIN Team
