import React, { useState, useEffect } from 'react';
import {
  PublicGameState,
  PrivatePlayerState,
  PublicPlayer,
  Card as CardType
} from '@solavin/shared';
import { CardItem } from './CardItem';
import {
  RotateCcw,
  Clock,
  Trophy,
  Crown,
  Sparkles,
  ArrowRight,
  Dice5,
  Zap,
  ShieldAlert
} from 'lucide-react';

interface GameTableViewProps {
  publicState: PublicGameState;
  privateState?: PrivatePlayerState;
  isPassing: boolean;
  onPassCard: (cardId: string) => void;
}

export const GameTableView: React.FC<GameTableViewProps> = ({
  publicState,
  privateState,
  isPassing,
  onPassCard
}) => {
  const currentUserId = privateState?.player.id;
  const currentUserSeat = privateState?.player.seatIndex ?? 0;

  // Real-time smooth timer countdown
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 100);
    return () => clearInterval(timer);
  }, []);

  const turnPlayer = publicState.players.find((p) => p.id === publicState.turnPlayerId);
  const isYourTurn = !!privateState?.isYourTurn;

  let secondsLeft = 0;
  if (publicState.turnDeadline) {
    secondsLeft = Math.max(0, Math.ceil((publicState.turnDeadline - now) / 1000));
  }

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

  // Render an opponent pod
  const renderOpponentPod = (player?: PublicPlayer) => {
    if (!player) {
      return (
        <div className="w-40 sm:w-48 p-3 rounded-xl border border-dashed border-card-border/60 bg-surface-200/20 text-center text-xs text-slate-600">
          Empty Seat
        </div>
      );
    }

    const isFinished = player.status === 'finished';
    const isPlayerTurn = publicState.turnPlayerId === player.id;
    const isStarter = publicState.starterPlayerId === player.id;
    const isDisconnected = !player.isConnected;

    return (
      <div
        className={`w-40 sm:w-52 p-3 sm:p-3.5 rounded-2xl border transition-all duration-300 shadow-xl ${
          isFinished
            ? 'bg-amber-950/30 border-amber-500/40 ring-1 ring-amber-500/30'
            : isPlayerTurn
            ? 'bg-indigo-950/40 border-indigo-400 ring-2 ring-indigo-500/50 shadow-indigo-500/20'
            : 'bg-surface-100/90 border-card-border'
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 truncate max-w-[120px]">
            <span className="font-extrabold text-xs sm:text-sm text-white truncate">
              {player.name}
            </span>
            {player.isHost && <Crown className="w-3 h-3 text-amber-400 flex-shrink-0" />}
            {isStarter && (
              <span title="Started the round">
                <Dice5 className="w-3 h-3 text-cyan-400 flex-shrink-0" />
              </span>
            )}
          </div>
          {isFinished ? (
            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
              {player.rank === 1 ? '🏆 1ST' : player.rank === 2 ? '🥈 2ND' : player.rank === 3 ? '🥉 3RD' : '4TH'}
            </span>
          ) : isPlayerTurn ? (
            <span className="flex items-center gap-1 text-[10px] font-bold text-indigo-300 bg-indigo-500/20 px-1.5 py-0.5 rounded-full border border-indigo-500/40 animate-pulse">
              <Clock className="w-3 h-3 text-indigo-400" />
              {publicState.turnTimerSeconds > 0 ? `${secondsLeft}s` : 'Thinking'}
            </span>
          ) : (
            <span className="text-[10px] font-medium text-slate-500">
              {player.cardCount} cards
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
            {[0, 1, 2, 3, 4].slice(0, player.cardCount).map((idx) => (
              <div
                key={idx}
                className={`w-6 h-9 sm:w-7 sm:h-10 rounded-md border border-card-border bg-gradient-to-br from-surface-50 to-surface-200 shadow-sm flex items-center justify-center text-[9px] font-mono text-slate-500 ${
                  isPlayerTurn ? 'border-indigo-400' : ''
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
              PASSING CARD ANTICLOCKWISE...
            </h3>
            <p className="text-xs text-indigo-300">Passing 1 card to the next player</p>
          </div>
        </div>
      )}

      {/* Virtual Table Board */}
      <div className="relative w-full rounded-3xl bg-surface-200/40 border border-card-border/80 p-4 sm:p-8 flex flex-col justify-between items-center min-h-[460px] sm:min-h-[520px]">
        {/* NORTH (Opponent 2) */}
        <div className="flex justify-center z-10">
          {renderOpponentPod(northPlayer)}
        </div>

        {/* MIDDLE SECTION (West Opponent - Center Table - East Opponent) */}
        <div className="w-full flex items-center justify-between gap-2 sm:gap-4 my-auto">
          {/* WEST (Opponent 1) */}
          <div className="flex justify-start z-10">
            {renderOpponentPod(westPlayer)}
          </div>

          {/* CENTER TABLE HUB */}
          <div className="relative w-44 h-44 sm:w-60 sm:h-60 rounded-full border-2 border-dashed border-card-border/80 flex flex-col items-center justify-center text-center p-4 bg-surface-100/50 backdrop-blur-xs shadow-inner">
            <div className="absolute inset-0 rounded-full border border-indigo-500/20 animate-spin-slow pointer-events-none" />

            <div className="space-y-0.5">
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-400">
                ROUND {String(publicState.round).padStart(2, '0')}
              </span>
              <div className="text-sm sm:text-base font-extrabold text-white">
                {publicState.theme.name}
              </div>
              <div className="flex items-center justify-center pt-0.5">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                  publicState.gameMode === 'pro'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                }`}>
                  {publicState.gameMode === 'pro' ? <ShieldAlert className="w-3 h-3" /> : <Zap className="w-3 h-3" />}
                  <span>{publicState.gameMode === 'pro' ? 'PRO MODE' : 'CLASSIC'}</span>
                </span>
              </div>
            </div>

            {/* Turn & Timer Display */}
            <div className="mt-2.5 flex flex-col items-center gap-1">
              {isYourTurn ? (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-bold shadow-lg shadow-indigo-600/40 animate-pulse">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>YOUR TURN</span>
                  {publicState.turnTimerSeconds > 0 && (
                    <span className="bg-black/30 px-1.5 py-0.5 rounded-full text-[10px] font-mono">
                      {secondsLeft}s
                    </span>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-50 border border-card-border text-[11px] font-bold text-slate-300">
                  <Clock className="w-3 h-3 text-cyan-400" />
                  <span>{turnPlayer?.name || 'Turn'}</span>
                  {publicState.turnTimerSeconds > 0 && (
                    <span className="text-amber-400 font-mono">({secondsLeft}s)</span>
                  )}
                </div>
              )}
              <span className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                Anticlockwise Pass ↺
              </span>
            </div>
          </div>

          {/* EAST (Opponent 3) */}
          <div className="flex justify-end z-10">
            {renderOpponentPod(eastPlayer)}
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
      <div
        className={`w-full rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-col items-center transition-all ${
          isYourTurn
            ? 'bg-gradient-to-b from-indigo-950/40 to-surface-100 border-2 border-indigo-500 ring-2 ring-indigo-500/20'
            : 'bg-surface-100 border border-card-border'
        }`}
      >
        {/* Status bar */}
        <div className="w-full flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isYourTurn ? 'bg-indigo-400 animate-ping' : 'bg-emerald-500'
              }`}
            />
            <span className="font-extrabold text-sm sm:text-base text-white">
              {privateState?.player.name} (You)
            </span>
            <span className="text-xs font-mono font-bold text-slate-400 bg-surface-50 px-2 py-0.5 rounded-lg border border-card-border">
              {privateState?.cards.length} cards
            </span>
            {publicState.gameMode === 'pro' && (
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 flex items-center gap-1">
                <ShieldAlert className="w-3 h-3 text-amber-400" />
                PRO
              </span>
            )}
            {privateState?.player.isHost && (
              <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                HOST
              </span>
            )}
            {publicState.starterPlayerId === currentUserId && (
              <span className="text-[10px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20 flex items-center gap-1">
                <Dice5 className="w-3 h-3" />
                STARTER
              </span>
            )}
          </div>

          <div>
            {!isCurrentPlayerActive ? (
              <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 font-bold text-xs flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                {privateState?.player.rank === 1 ? '1st Place Winner!' : `${privateState?.player.rank}th Place Finished`}
              </span>
            ) : isYourTurn ? (
              <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5 animate-pulse">
                <span>👉 Tap 1 card to pass to {privateState?.passingTo?.name}</span>
                {publicState.turnTimerSeconds > 0 && (
                  <span
                    className={`font-mono px-2 py-0.5 rounded-full text-xs font-black ${
                      secondsLeft <= 5
                        ? 'bg-rose-500 text-white animate-bounce'
                        : secondsLeft <= 10
                        ? 'bg-amber-500 text-black'
                        : 'bg-indigo-600 text-white'
                    }`}
                  >
                    ⏱️ {secondsLeft}s
                  </span>
                )}
              </span>
            ) : (
              <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>Waiting for {turnPlayer?.name || 'player'} to pass</span>
                {publicState.turnTimerSeconds > 0 && (
                  <span className="text-amber-400/90 font-mono">({secondsLeft}s)</span>
                )}
              </span>
            )}
          </div>
        </div>

        {/* Player's Cards Hand (can be 3, 4, or 5 cards!) */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 overflow-x-auto py-2 px-1 max-w-full">
          {privateState?.cards.map((card: CardType) => {
            const isForbidden = isYourTurn && card.id === privateState?.forbiddenCardId;
            return (
              <CardItem
                key={card.id}
                card={card}
                disabled={!isYourTurn || isPassing}
                isForbidden={isForbidden}
                forbiddenReason="In Pro Mode, you cannot pass the card you just received from your neighbor."
                onSelect={() => {
                  if (isYourTurn && !isPassing && !isForbidden) {
                    onPassCard(card.id);
                  }
                }}
              />
            );
          })}
        </div>

        {/* Guidance footnote */}
        <div className="mt-2 text-center text-xs text-slate-500">
          {isCurrentPlayerActive ? (
            isYourTurn ? (
              privateState?.forbiddenCardId ? (
                <span className="text-amber-300 font-medium flex items-center justify-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                  <span>Pro Mode Active: You cannot pass the card just received (locked). Select 1 of your other 4 cards.</span>
                </span>
              ) : (
                <span className="text-indigo-300 font-medium">
                  Tap the card you want to discard. It will pass anticlockwise to {privateState?.passingTo?.name}.
                </span>
              )
            ) : (
              <span>Inspect your cards and prepare your strategy while opponent decides</span>
            )
          ) : (
            <span className="text-amber-400/80 font-medium">
              You completed your 4 matching cards! You are now spectating the remaining players.
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
