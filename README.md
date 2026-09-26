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

**SOLAVIN** brings the classic four-of-a-kind card game to the modern web. Built with a **TypeScript-first monorepo**, it features authoritative server-side mechanics, zero card leaks to browser inspectors, instant room sharing via 6-character codes, invite links, and QR codes.

### Core Game Flow

```mermaid
flowchart TD
    A["Host Creates Game"] --> B["Select or Create Theme"]
    B --> C["Generate Room Code (e.g. 98XPFX)"]
    C --> D["Share Link / QR Code"]
    D --> E["4 Players Join Room"]
    E --> F["Host Starts Game"]
    F --> G["Server Authoritatively Deals 16 Cards (4 each)"]
    G --> H["Each Player Secretly Selects 1 Card"]
    H --> I{"All 4 Active Players Ready?"}
    I -- No --> H
    I -- Yes --> J["Simultaneous Anticlockwise Pass"]
    J --> K["Check for 4 Matching Cards"]
    K -- Set Complete --> L["Assign Rank: 1st, 2nd, 3rd, 4th"]
    L --> M{"3 or 4 Finished?"}
    M -- No --> H
    M -- Yes --> N["Game Complete & Final Standings"]
    K -- Incomplete --> H
```

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
        RoomsSvc["Rooms Service\n(Codes, Seats, Host Migration)"]
        GamesSvc["Games Service\n(Turns, State Machine)"]
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

## 🛡️ Critical Invariants & Security Principles

1. **Zero Information Leakage**: The server authoritatively manages all 16 cards. Opponent hands and secret selections are **never** transmitted over the network until set completion.
2. **Anticlockwise Simultaneous Passing**: Card choices remain locked and secret until all active players have chosen. Resolution exchanges cards simultaneously across the active seat ring:
   $$\text{Seat } 0 \to \text{Seat } 3 \to \text{Seat } 2 \to \text{Seat } 1 \to \text{Seat } 0$$
3. **Card Invariant**: The total number of cards in circulation is strictly 16 at all times ($4 \text{ items} \times 4 \text{ copies}$). Each active player always holds exactly 4 cards.
4. **Dynamic Active Ring**: When a player completes 4 matching cards, they win their permanent rank (1st, 2nd, 3rd) and transition to spectator mode. The active passing order automatically skips finished players without disrupting card ownership.
5. **Session Resilience**: Players can refresh the browser or switch Wi-Fi networks; session IDs in `localStorage` enable immediate reconnect without losing seat or hand state.

---

## 📂 Project Structure

```text
solavin/
├── apps/
│   ├── web/                     # React + Vite + Tailwind CSS + Lucide
│   │   ├── src/
│   │   │   ├── components/      # UI: GameTable, Cards, Lobby, Modals
│   │   │   ├── hooks/           # useSocket (Multiplayer state & actions)
│   │   │   ├── lib/             # Web Audio API sound synthesizer
│   │   │   └── App.tsx          # Root view orchestrator
│   │   └── package.json
│   │
│   └── server/                  # NestJS + Socket.IO + Prisma
│       ├── src/
│       │   ├── rooms/           # Room code generation, host migration
│       │   ├── games/           # Game lifecycle, round resolution
│       │   ├── websocket/       # Gateway broadcasting private/public states
│       │   ├── prisma/          # Optional PostgreSQL persistence
│       │   └── main.ts          # Server bootstrap
│       └── package.json
│
├── packages/
│   └── shared/                  # Pure TypeScript Game Engine & Types
│       ├── src/
│       │   ├── constants/       # 15+ Preset themes & custom theme generator
│       │   ├── engine/          # Pure shuffle, deal, pass & win detection
│       │   ├── types/           # Shared state & WebSocket event contracts
│       │   └── index.ts
│       └── package.json
│
├── docker-compose.yml           # Production-ready container orchestration
├── .env.example                 # Configuration template
├── test-e2e.ts                  # Automated 4-player WebSocket acceptance test
└── README.md
```

---

## 🎨 Themes Included

Hosts can pick from over 15 rich preset themes or create custom sets:
* 🌌 **Blockbuster Cinema**: Interstellar, Avengers, Dune, Inception
* ⚽ **Football Legends**: Messi, Ronaldo, Mbappé, Haaland
* 🏏 **Cricket Giants**: Virat Kohli, MS Dhoni, Rohit Sharma, Jasprit Bumrah
* 🗽 **Global Metropolises**: Tokyo, Paris, New York, London
* 🗺️ **Nations of the World**: Japan, Brazil, India, Switzerland
* 🏛️ **World Wonders**: Taj Mahal, Giza Pyramids, Colosseum, Eiffel Tower
* ⚛️ **Scientific Pioneers**: Einstein, Newton, Curie, Tesla
* 🎬 **Hollywood Icons**: DiCaprio, Bale, Pitt, Cruise
* 🍏 **Tech Giants**: Apple, Google, Microsoft, NVIDIA
* 🦁 **Wild Kingdom**: Lion, Eagle, Tiger, Whale
* 🍕 **Culinary Delights**: Pizza, Sushi, Biryani, Burger
* 🏎️ **Supercars**: Ferrari, Lamborghini, Porsche, Bugatti
* 🦸 **Superheroes**: Batman, Spider-Man, Superman, Iron Man
* 🛠️ **Custom Theme**: Enter any 4 distinct items; SOLAVIN automatically generates the 16-card deck!

---

## 🚀 Quick Start (Local Development)

### Prerequisites
* **Node.js** >= 20.x
* **npm** >= 10.x

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

# Real-time 4-player Socket.IO E2E acceptance test
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

Run the entire stack with PostgreSQL:

```bash
docker compose up --build
```
* **Frontend**: `http://localhost:3000`
* **Backend**: `http://localhost:3001`
* **PostgreSQL**: `localhost:5432`

---

## 🚢 Deployment Guide

### Frontend (e.g. Vercel)
1. Point build to `apps/web`
2. Build command: `npm run build --workspace=@solavin/web`
3. Output directory: `apps/web/dist`
4. Set environment variables:
   * `VITE_SOCKET_URL=https://your-backend-service.onrender.com`

### Backend (e.g. Render / Railway / Fly.io)
1. Build command:
   ```bash
   npm run build --workspace=@solavin/shared && npm run prisma:generate --workspace=@solavin/server && npm run build --workspace=@solavin/server
   ```
2. Start command:
   ```bash
   node apps/server/dist/main.js
   ```
3. Environment variables:
   * `PORT=3001`
   * `CORS_ORIGIN=*`
   * `DATABASE_URL=postgresql://user:password@neon-or-supabase/db` (optional)

---

## 📄 License
MIT © SOLAVIN Team
