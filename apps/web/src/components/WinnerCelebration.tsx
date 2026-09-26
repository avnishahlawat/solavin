import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { WinnerResult } from '@solavin/shared';
import { Trophy, Award, Medal } from 'lucide-react';

interface WinnerCelebrationProps {
  winner: WinnerResult;
  isCurrentPlayer: boolean;
}

export const WinnerCelebration: React.FC<WinnerCelebrationProps> = ({
  winner,
  isCurrentPlayer
}) => {
  useEffect(() => {
    // Fire celebratory confetti
    confetti({
      particleCount: winner.rank === 1 ? 120 : 60,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, [winner]);

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return {
          icon: <Trophy className="w-8 h-8 text-amber-400 animate-bounce" />,
          title: '1ST PLACE',
          color: 'from-amber-500/20 to-surface-100 border-amber-500/40 text-amber-300'
        };
      case 2:
        return {
          icon: <Award className="w-8 h-8 text-slate-300" />,
          title: '2ND PLACE',
          color: 'from-slate-400/20 to-surface-100 border-slate-400/40 text-slate-200'
        };
      case 3:
        return {
          icon: <Medal className="w-8 h-8 text-amber-600" />,
          title: '3RD PLACE',
          color: 'from-amber-700/20 to-surface-100 border-amber-700/40 text-amber-400'
        };
      default:
        return {
          icon: <Award className="w-8 h-8 text-indigo-400" />,
          title: '4TH PLACE',
          color: 'from-indigo-500/20 to-surface-100 border-indigo-500/40 text-indigo-300'
        };
    }
  };

  const badge = getRankBadge(winner.rank);

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-fadeIn">
      <div
        className={`px-6 py-4 rounded-2xl bg-gradient-to-b ${badge.color} border shadow-2xl backdrop-blur-md flex items-center gap-4 min-w-[320px] justify-center`}
      >
        <div className="flex-shrink-0">{badge.icon}</div>
        <div className="text-center">
          <div className="text-[11px] font-black uppercase tracking-widest opacity-80">
            {badge.title}
          </div>
          <div className="text-lg font-black text-white leading-tight">
            {winner.playerName} {isCurrentPlayer ? '(You!)' : ''}
          </div>
          <div className="text-xs font-semibold mt-0.5 flex items-center justify-center gap-1.5 text-slate-200">
            <span>{winner.itemIcon}</span>
            <span>{winner.itemName} ×4</span>
          </div>
        </div>
      </div>
    </div>
  );
};
