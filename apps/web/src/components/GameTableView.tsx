import React from 'react';
import {
  PublicGameState,
  PrivatePlayerState,
  PublicPlayer,
  WinnerResult,
  PassRecord
} from '@solavin/shared';
import { CardItem } from './CardItem';
import {
  RotateCcw,
  CheckCircle2,
  Clock,
  ArrowRight,
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  Trophy,
  Crown
} from 'lucide-react';

interface GameTableViewProps {
  publicState: PublicGameState;
  privateState?: PrivatePlayerState;
  isPassing: boolean;
  onSelectCard: (cardId: string) => void;
}

export const GameTableView: React.FC<GameTableViewProps> = ({
  publicState,
  privateState,
  isPassing,
  onSelectCard
}) => {
  const currentUserId = privateState?.player.id;
  const currentUserSeat = privateState?.player.seatIndex ?? 0;

  // Re-orient opponents relative to current player so current player is always South
  const getRelativePosition = (seatIndex: number): 'south' | 'west' | 'north' | 'east' => {
    const diff = (seatIndex - currentUserSeat + 4) % 4;
    switch (diff) {
      case 0:
        return 'south';
      case 1:
        return 'west';
      case 2:
        return 'north';
      case 3:
        return 'east';
      default:
        return 'north';
    }
  };

  const opponents = publicState.players.filter((p) => p.id !== currentUserId);

  const westPlayer = opponents.find((p) => getRelativePosition(p.seatIndex) === 'west');
  const northPlayer = opponents.find((p) => getRelativePosition(p.seatIndex) === 'north');
  const eastPlayer = opponents.find((p) => getRelativePosition(p.seatIndex) === 'east');

  const isCurrentPlayerActive = privateState?.player.status === 'active';
  const hasSelected = !!privateState?.selectedCardId;

  // Render an opponent pod
  const renderOpponentPod = (player?: PublicPlayer, position?: string) => {
    if (!player) {
      return (
        <div className="w-40 sm:w-48 p-3 rounded-xl border border-dashed border-card-border/60 bg-surface-200/20 text-center text-xs text-slate-600">
          Empty Seat
        </div>
      );
    }

    const isFinished = player.status === 'finished';
    const isDisconnected = !player.isConnected;

    return (
      <div
        className={`w-40 sm:w-52 p-3 sm:p-3.5 rounded-2xl border transition-all duration-300 shadow-xl ${
          isFinished
            ? 'bg-amber-950/30 border-amber-500/40 ring-1 ring-amber-500/30'
            : player.hasSelectedCard
            ? 'bg-surface-100 border-indigo-500/50 ring-1 ring-indigo-500/20'
            : 'bg-surface-100/90 border-card-border'
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 truncate max-w-[120px]">
            <span className="font-extrabold text-xs sm:text-sm text-white truncate">
              {player.name}
            </span>
            {player.isHost && <Crown className="w-3 h-3 text-amber-400 flex-shrink-0" />}
          </div>
          {isFinished ? (
            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
              {player.rank === 1 ? '🏆 1ST' : player.rank === 2 ? '🥈 2ND' : player.rank === 3 ? '🥉 3RD' : '4TH'}
            </span>
          ) : player.hasSelectedCard ? (
            <span className="flex items-center gap-1 text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded-full border border-indigo-500/30">
              <CheckCircle2 className="w-3 h-3" />
              READY
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[10px] text-slate-500">
              <Clock className="w-3 h-3 animate-spin" />
              Thinking
            </span>
          )}
        </div>

        {/* Finished player details */}
        {isFinished && player.completedItem ? (
          <div className="text-[11px] text-amber-300 font-semibold flex items-center gap-1 py-1">
            <span>🎉 Set complete: {player.completedItem} ×4</span>
          </div>
        ) : (
          /* Face-down cards visual */
          <div className="flex items-center justify-center gap-1 py-1">
            {[0, 1, 2, 3].slice(0, player.cardCount).map((idx) => (
              <div
                key={idx}
                className={`w-6 h-9 sm:w-7 sm:h-10 rounded-md border border-card-border bg-gradient-to-br from-surface-50 to-surface-200 shadow-sm flex items-center justify-center text-[9px] font-mono text-slate-500 ${
                  player.hasSelectedCard && idx === 0 ? 'border-indigo-400 -translate-y-1' : ''
                }`}
              >
                ●
              </div>
            ))}
          </div>
        )}

        {isDisconnected && (
          <div className="text-[10px] text-rose-400 font-medium text-center mt-1">
            Disconnected (Reconnecting...)
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex-1 flex flex-col justify-between max-w-6xl mx-auto w-full px-2 sm:px-4 py-4 space-y-4">
      {/* Passing Animation Overlay */}
      {isPassing && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs flex items-center justify-center pointer-events-none animate-fadeIn">
          <div className="bg-surface-100 border border-indigo-500/50 rounded-2xl px-8 py-5 shadow-2xl flex flex-col items-center gap-3 animate-pulse">
            <RotateCcw className="w-10 h-10 text-indigo-400 animate-spin" />
            <h3 className="font-extrabold text-lg sm:text-xl text-white tracking-wider">
              PASSING CARDS ANTICLOCKWISE...
            </h3>
            <p className="text-xs text-indigo-300">Simultaneous card exchange</p>
          </div>
        </div>
      )}

      {/* Virtual Table Board */}
      <div className="relative w-full rounded-3xl bg-surface-200/40 border border-card-border/80 p-4 sm:p-8 flex flex-col justify-between items-center min-h-[460px] sm:min-h-[520px]">
        {/* NORTH (Opponent 2) */}
        <div className="flex justify-center z-10">
          {renderOpponentPod(northPlayer, 'north')}
        </div>

        {/* MIDDLE SECTION (West Opponent - Center Table - East Opponent) */}
        <div className="w-full flex items-center justify-between gap-2 sm:gap-4 my-auto">
          {/* WEST (Opponent 1) */}
          <div className="flex justify-start z-10">
            {renderOpponentPod(westPlayer, 'west')}
          </div>

          {/* CENTER TABLE HUB */}
          <div className="relative w-44 h-44 sm:w-60 sm:h-60 rounded-full border-2 border-dashed border-card-border/80 flex flex-col items-center justify-center text-center p-4 bg-surface-100/50 backdrop-blur-xs shadow-inner">
            {/* Animated Anticlockwise Direction Indicator */}
            <div className="absolute inset-0 rounded-full border border-indigo-500/20 animate-spin-slow pointer-events-none" />

            <div className="space-y-1">
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-400">
                ROUND {String(publicState.round).padStart(2, '0')}
              </span>
              <div className="text-sm sm:text-base font-extrabold text-white">
                {publicState.theme.name}
              </div>
            </div>

            {/* Readiness progress */}
            <div className="mt-3 flex flex-col items-center gap-1">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-50 border border-card-border text-[11px] font-bold text-slate-300">
                <RotateCcw className="w-3 h-3 text-cyan-400 animate-spin-slow" />
                <span>
                  {publicState.readyCount} / {publicState.totalActivePlayers} Ready
                </span>
              </div>
              <span className="text-[10px] text-slate-500 flex items-center gap-1">
                Anticlockwise Pass ↺
              </span>
            </div>
          </div>

          {/* EAST (Opponent 3) */}
          <div className="flex justify-end z-10">
            {renderOpponentPod(eastPlayer, 'east')}
          </div>
        </div>

        {/* SOUTH: Active target & source clues */}
        <div className="w-full flex items-center justify-between text-[11px] font-semibold text-slate-400 px-2 sm:px-8">
          {privateState?.receivingFrom && (
            <div className="flex items-center gap-1 text-cyan-400">
              <span>← Receiving from: {privateState.receivingFrom.name}</span>
            </div>
          )}
          {privateState?.passingTo && (
            <div className="flex items-center gap-1 text-indigo-400 ml-auto">
              <span>Passing to: {privateState.passingTo.name} →</span>
            </div>
          )}
        </div>
      </div>

      {/* CURRENT PLAYER'S POD & HAND (BOTTOM AREA) */}
      <div className="w-full bg-surface-100 border border-card-border rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-col items-center">
        {/* Status bar */}
        <div className="w-full flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
            <span className="font-extrabold text-sm sm:text-base text-white">
              {privateState?.player.name} (You)
            </span>
            {privateState?.player.isHost && (
              <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                HOST
              </span>
            )}
          </div>

          <div>
            {!isCurrentPlayerActive ? (
              <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 font-bold text-xs flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                {privateState?.player.rank === 1 ? '1st Place Winner!' : `${privateState?.player.rank}th Place Finished`}
              </span>
            ) : hasSelected ? (
              <span className="text-xs font-bold text-indigo-400 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                Card Locked — Waiting for others
              </span>
            ) : (
              <span className="text-xs font-semibold text-cyan-400 animate-pulse">
                👉 Tap 1 card to pass anticlockwise
              </span>
            )}
          </div>
        </div>

        {/* 4 Cards Hand */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 overflow-x-auto py-2 px-1 max-w-full">
          {privateState?.cards.map((card) => {
            const isSelected = privateState.selectedCardId === card.id;
            return (
              <CardItem
                key={card.id}
                card={card}
                isSelected={isSelected}
                disabled={!isCurrentPlayerActive || isPassing}
                onSelect={() => onSelectCard(card.id)}
              />
            );
          })}
        </div>

        {/* Guidance footnote */}
        <div className="mt-2 text-center text-xs text-slate-500">
          {isCurrentPlayerActive ? (
            <span>Cards will pass simultaneously when all active players lock their card</span>
          ) : (
            <span className="text-amber-400/80 font-medium">
              You completed your 4 matching cards! Sit back and spectate the remaining players.
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
