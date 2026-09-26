import React, { useState } from 'react';
import { Trophy, Award, Medal, Share2, RotateCcw, Home, Check, Sparkles } from 'lucide-react';
import { WinnerResult, Theme, PRESET_THEMES } from '@solavin/shared';

interface GameCompleteModalProps {
  winners: WinnerResult[];
  theme: Theme;
  isHost: boolean;
  onRestart: (options?: { sameTheme?: boolean; themeId?: string }) => void;
  onHome: () => void;
}

export const GameCompleteModal: React.FC<GameCompleteModalProps> = ({
  winners,
  theme,
  isHost,
  onRestart,
  onHome
}) => {
  const [copiedShare, setCopiedShare] = useState(false);
  const [selectedRestartTheme, setSelectedRestartTheme] = useState(theme.id);
  const [showThemePicker, setShowThemePicker] = useState(false);

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return {
          icon: <Trophy className="w-5 h-5 text-amber-400" />,
          title: '1ST PLACE',
          bg: 'bg-amber-500/10 border-amber-500/30 text-amber-300'
        };
      case 2:
        return {
          icon: <Award className="w-5 h-5 text-slate-300" />,
          title: '2ND PLACE',
          bg: 'bg-slate-400/10 border-slate-400/30 text-slate-200'
        };
      case 3:
        return {
          icon: <Medal className="w-5 h-5 text-amber-700" />,
          title: '3RD PLACE',
          bg: 'bg-amber-700/10 border-amber-700/30 text-amber-400'
        };
      default:
        return {
          icon: <span className="font-bold text-sm text-slate-500">4th</span>,
          title: '4TH PLACE',
          bg: 'bg-surface-50 border-card-border text-slate-400'
        };
    }
  };

  const handleShare = async () => {
    const lines = [
      '🃏 SOLAVIN — 16 Parchi Card Game',
      `Theme: ${theme.name}`,
      ''
    ];

    winners.forEach((w) => {
      const medal = w.rank === 1 ? '🏆' : w.rank === 2 ? '🥈' : w.rank === 3 ? '🥉' : '4th:';
      lines.push(`${medal} ${w.playerName} — ${w.itemName} ×4`);
    });

    lines.push('', 'Think you can beat us? Play at ' + window.location.origin);
    const text = lines.join('\n');

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'SOLAVIN Results',
          text
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    navigator.clipboard.writeText(text);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-surface-100 border border-card-border rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 text-center border-b border-card-border/60">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            GAME COMPLETE
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            FINAL STANDINGS
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Theme: <strong className="text-slate-200">{theme.name}</strong>
          </p>
        </div>

        {/* Podium List */}
        <div className="p-6 space-y-3 overflow-y-auto max-h-[45vh]">
          {winners.map((winner) => {
            const badge = getRankBadge(winner.rank);
            return (
              <div
                key={winner.playerId}
                className={`p-3.5 rounded-xl border flex items-center justify-between transition-all ${badge.bg}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-surface-200/80 border border-card-border flex items-center justify-center">
                    {badge.icon}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white leading-tight">
                      {winner.playerName}
                    </div>
                    <div className="text-[11px] font-semibold text-slate-400 flex items-center gap-1 mt-0.5">
                      <span>{winner.itemIcon}</span>
                      <span>{winner.itemName} ×4</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-black uppercase tracking-wider opacity-80">
                    {badge.title}
                  </span>
                  <div className="text-[10px] text-slate-500 font-mono">
                    Round {winner.roundCompleted}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Share Button */}
        <div className="px-6 py-2">
          <button
            onClick={handleShare}
            className="w-full py-2.5 rounded-xl bg-surface-50 hover:bg-surface-200 border border-card-border text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            {copiedShare ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Results Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-cyan-400" />
                <span>Share Results</span>
              </>
            )}
          </button>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-card-border/60 bg-surface-200/40 space-y-3">
          {isHost ? (
            <div className="space-y-2">
              <div className="flex gap-2">
                <button
                  onClick={() => onRestart({ sameTheme: true })}
                  className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>PLAY AGAIN (SAME THEME)</span>
                </button>
                <button
                  onClick={() => setShowThemePicker(!showThemePicker)}
                  className="px-4 py-3 rounded-xl bg-surface-50 hover:bg-surface-100 border border-card-border text-slate-300 hover:text-white font-bold text-xs transition-colors"
                >
                  CHANGE THEME
                </button>
              </div>

              {showThemePicker && (
                <div className="p-3 bg-surface-100 border border-card-border rounded-xl space-y-2">
                  <label className="block text-[11px] font-bold text-slate-400">
                    Select New Theme
                  </label>
                  <select
                    value={selectedRestartTheme}
                    onChange={(e) => setSelectedRestartTheme(e.target.value)}
                    className="w-full px-3 py-2 bg-surface-200 border border-card-border rounded-lg text-white text-xs"
                  >
                    {PRESET_THEMES.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => onRestart({ themeId: selectedRestartTheme })}
                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg"
                  >
                    START WITH SELECTED THEME
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="p-3 bg-surface-100 border border-card-border rounded-xl text-center text-xs text-slate-400">
              Waiting for the host to start another round...
            </div>
          )}

          <button
            onClick={onHome}
            className="w-full py-2.5 rounded-xl border border-card-border text-slate-400 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};
