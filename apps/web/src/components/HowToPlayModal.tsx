import React from 'react';
import { X, Layers, RotateCcw, Trophy, Clock, Dice5 } from 'lucide-react';

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-surface-100 border border-card-border rounded-2xl w-full max-w-lg max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-card-border">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-white tracking-wide">How to Play SOLAVIN</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-surface-50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5 overflow-y-auto space-y-5 text-sm text-slate-300">
          <div className="p-3.5 bg-indigo-950/30 border border-indigo-500/20 rounded-xl">
            <p className="text-indigo-200 font-medium leading-relaxed">
              SOLAVIN is the modern 4-player multiplayer version of the traditional Indian card game <strong>16 Parchi</strong> (Four-of-a-Kind).
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-surface-50 border border-card-border flex items-center justify-center font-bold text-xs text-indigo-400">
                1
              </span>
              <div>
                <h4 className="font-semibold text-white">4 Players & 16 Cards</h4>
                <p className="text-slate-400 text-xs mt-0.5">
                  The deck has exactly 4 distinct items with 4 copies each (16 cards total). Each player is dealt 4 cards at the start.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-surface-50 border border-card-border flex items-center justify-center font-bold text-xs text-indigo-400">
                2
              </span>
              <div>
                <h4 className="font-semibold text-white flex items-center gap-1.5">
                  <span>Random Starter Discards First</span>
                  <Dice5 className="w-3.5 h-3.5 text-cyan-400" />
                </h4>
                <p className="text-slate-400 text-xs mt-0.5">
                  One player is randomly chosen to start. The Starter passes 1 card anticlockwise to the next player.
                </p>
                <div className="mt-1.5 p-2 bg-surface-200/80 rounded-lg border border-card-border text-xs text-cyan-300">
                  Starter now has <strong>3 cards</strong> ➔ Next player now has <strong>5 cards</strong>!
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-surface-50 border border-card-border flex items-center justify-center font-bold text-xs text-indigo-400">
                3
              </span>
              <div>
                <h4 className="font-semibold text-white flex items-center gap-1.5">
                  <span>Turn-by-Turn Passing & Timer</span>
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                </h4>
                <p className="text-slate-400 text-xs mt-0.5">
                  The player holding 5 cards has their turn timer ticking (e.g. 30s or 1 min). They inspect their 5 cards, choose 1 card, and pass it anticlockwise!
                </p>
                <p className="text-slate-400 text-xs mt-1">
                  They return to 4 cards, and the next player receives the 5th card to think and pass. If the timer runs out, the server auto-passes a non-matching card.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-surface-50 border border-card-border flex items-center justify-center font-bold text-xs text-indigo-400">
                4
              </span>
              <div>
                <h4 className="font-semibold text-white">Complete 4 Matching Cards</h4>
                <p className="text-slate-400 text-xs mt-0.5">
                  The first player to collect 4 cards of the same item wins <strong>1st Place</strong>! The remaining players continue passing until 2nd, 3rd, and 4th places are decided.
                </p>
              </div>
            </div>
          </div>

          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-start gap-2.5">
            <Trophy className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-amber-200/90 text-xs leading-relaxed">
              <strong>Strategy tip:</strong> Watch what cards your neighbor is passing you. If they keep passing you Inception, they aren't collecting it! Be careful not to pass them what they want.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-card-border bg-surface-200/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-colors"
          >
            Got it, let's play
          </button>
        </div>
      </div>
    </div>
  );
};
