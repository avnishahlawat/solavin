import React, { useState, useEffect } from 'react';
import {
  Users,
  Copy,
  Check,
  QrCode,
  Share2,
  Crown,
  Play,
  Layers,
  Edit2,
  Clock
} from 'lucide-react';
import QRCode from 'qrcode';
import { PublicGameState, PublicPlayer } from '@solavin/shared';

interface LobbyViewProps {
  state: PublicGameState;
  currentPlayerId: string;
  onStartGame: () => void;
  onChangeTheme?: () => void;
  onUpdateTimer?: (seconds: number) => void;
}

export const LobbyView: React.FC<LobbyViewProps> = ({
  state,
  currentPlayerId,
  onStartGame,
  onChangeTheme,
  onUpdateTimer
}) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  const isHost = state.hostId === currentPlayerId;
  const isFull = state.players.length === 4;
  const inviteUrl = `${window.location.origin}?room=${state.roomCode}`;

  useEffect(() => {
    QRCode.toDataURL(inviteUrl, {
      width: 260,
      margin: 2,
      color: {
        dark: '#0F172A',
        light: '#FFFFFF'
      }
    }).then(setQrDataUrl).catch(() => {});
  }, [inviteUrl]);

  const copyCode = () => {
    navigator.clipboard.writeText(state.roomCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 max-w-4xl mx-auto w-full">
      <div className="w-full space-y-6">
        {/* Top Info Banner */}
        <div className="bg-surface-100 border border-card-border rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
              ROOM CODE
            </span>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <span className="font-mono text-3xl sm:text-4xl font-extrabold tracking-widest text-white">
                {state.roomCode}
              </span>
              <button
                onClick={copyCode}
                className="p-2 rounded-xl bg-surface-50 hover:bg-surface-200 border border-card-border text-slate-300 hover:text-white transition-all"
                title="Copy Room Code"
              >
                {copiedCode ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
            <p className="text-xs text-slate-400">Share this code with 3 friends to join</p>
          </div>

          {/* Quick Share Links */}
          <div className="flex items-center gap-3">
            <button
              onClick={copyLink}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-50 hover:bg-surface-200 border border-card-border text-slate-200 text-xs font-semibold transition-all"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-cyan-400" />}
              <span>{copiedLink ? 'Link Copied!' : 'Copy Invite Link'}</span>
            </button>
            <button
              onClick={() => setShowQr(true)}
              className="p-2.5 rounded-xl bg-surface-50 hover:bg-surface-200 border border-card-border text-slate-200 text-xs font-semibold transition-all"
              title="Show QR Code"
            >
              <QrCode className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </div>

        {/* Players Grid (4 Slots) */}
        <div>
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-400" />
              <h3 className="font-bold text-sm uppercase tracking-wider text-slate-300">
                Players in Room
              </h3>
            </div>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
              isFull ? 'bg-emerald-500/20 text-emerald-300' : 'bg-surface-50 text-slate-400'
            }`}>
              {state.players.length} / 4 Players
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((slotIdx) => {
              const player: PublicPlayer | undefined = state.players[slotIdx];
              if (player) {
                const isYou = player.id === currentPlayerId;
                return (
                  <div
                    key={player.id}
                    className={`p-4 rounded-xl border flex flex-col justify-between min-h-[100px] transition-all ${
                      isYou
                        ? 'bg-indigo-950/30 border-indigo-500/40 ring-1 ring-indigo-500/20'
                        : 'bg-surface-100 border-card-border'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-7 h-7 rounded-lg bg-surface-50 border border-card-border flex items-center justify-center font-bold text-xs text-indigo-400">
                        {slotIdx + 1}
                      </div>
                      {player.isHost && (
                        <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300">
                          <Crown className="w-3 h-3 text-amber-400" />
                          HOST
                        </span>
                      )}
                    </div>
                    <div className="mt-2">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-sm text-white truncate max-w-[130px]">
                          {player.name}
                        </span>
                        {isYou && (
                          <span className="text-[10px] text-indigo-400 font-semibold">(You)</span>
                        )}
                      </div>
                      <span className="text-[11px] text-emerald-400 flex items-center gap-1 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        Ready
                      </span>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={`empty-${slotIdx}`}
                  className="p-4 rounded-xl border border-dashed border-card-border/80 bg-surface-200/20 flex flex-col items-center justify-center min-h-[100px] text-center"
                >
                  <span className="text-xs text-slate-500 font-medium">Slot {slotIdx + 1}</span>
                  <span className="text-xs text-slate-600 mt-1">Waiting for player...</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Settings Bar: Theme & Turn Timer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Deck Theme */}
          <div className="bg-surface-100 border border-card-border rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-300">
                  Deck Theme
                </h3>
              </div>
              {isHost && onChangeTheme && (
                <button
                  onClick={onChangeTheme}
                  className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
                >
                  <Edit2 className="w-3 h-3" />
                  Edit
                </button>
              )}
            </div>

            <div>
              <h4 className="font-extrabold text-base text-white">{state.theme.name}</h4>
              <div className="flex items-center gap-2 mt-2">
                {state.theme.items.map((item) => (
                  <span
                    key={item.id}
                    title={item.name}
                    className="p-1.5 rounded-lg bg-surface-50 border border-card-border text-sm"
                  >
                    {item.icon}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Turn Timer Configuration */}
          <div className="bg-surface-100 border border-card-border rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-300">
                  Turn Timer
                </h3>
              </div>
              <span className="text-xs font-mono font-bold text-amber-400">
                {state.turnTimerSeconds === 0 ? 'No Timer' : `${state.turnTimerSeconds}s per turn`}
              </span>
            </div>

            {isHost && onUpdateTimer ? (
              <div className="grid grid-cols-5 gap-1.5 mt-2">
                {[
                  { label: '15s', val: 15 },
                  { label: '30s', val: 30 },
                  { label: '45s', val: 45 },
                  { label: '60s', val: 60 },
                  { label: 'Off', val: 0 }
                ].map((t) => (
                  <button
                    key={t.val}
                    type="button"
                    onClick={() => onUpdateTimer(t.val)}
                    className={`py-1.5 text-center rounded-lg border text-xs font-semibold transition-all ${
                      state.turnTimerSeconds === t.val
                        ? 'bg-amber-950/40 border-amber-400 text-amber-300'
                        : 'bg-surface-50 border-card-border text-slate-400 hover:text-white'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 mt-2">
                {state.turnTimerSeconds === 0
                  ? 'Casual mode with no timer restriction.'
                  : `Each player has ${state.turnTimerSeconds} seconds to choose and pass a card.`}
              </p>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 flex flex-col items-center">
          {isHost ? (
            <button
              onClick={onStartGame}
              disabled={!isFull}
              className={`w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm tracking-wider uppercase transition-all flex items-center justify-center gap-2 ${
                isFull
                  ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-600/30 scale-100 hover:scale-[1.02] active:scale-[0.98]'
                  : 'bg-surface-50 border border-card-border text-slate-500 cursor-not-allowed'
              }`}
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{isFull ? 'START GAME (4/4 READY)' : `WAITING FOR 4 PLAYERS (${state.players.length}/4)`}</span>
            </button>
          ) : (
            <div className="p-4 rounded-xl bg-surface-100 border border-card-border text-center text-xs text-slate-400 font-medium">
              Waiting for the host (<strong className="text-slate-200">{state.players.find(p => p.isHost)?.name}</strong>) to start the game...
            </div>
          )}
        </div>
      </div>

      {/* QR Code Modal */}
      {showQr && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-surface-100 border border-card-border rounded-2xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl">
            <h3 className="font-bold text-white text-base">Scan to Join Room</h3>
            <p className="text-xs text-slate-400">Point phone camera to join directly</p>
            {qrDataUrl && (
              <div className="bg-white p-4 rounded-xl inline-block shadow-inner mx-auto">
                <img src={qrDataUrl} alt="QR Code to Join Room" className="w-52 h-52 mx-auto" />
              </div>
            )}
            <div className="font-mono font-bold tracking-widest text-indigo-400 text-lg">
              {state.roomCode}
            </div>
            <button
              onClick={() => setShowQr(false)}
              className="w-full py-2.5 rounded-xl bg-surface-50 hover:bg-surface-200 border border-card-border text-slate-200 font-semibold text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
