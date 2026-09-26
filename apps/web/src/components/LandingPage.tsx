import React from 'react';
import { PlusCircle, LogIn, Users, Sparkles, Layers, ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onCreateClick: () => void;
  onJoinClick: () => void;
  onOpenHelp: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onCreateClick,
  onJoinClick,
  onOpenHelp,
}) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 sm:py-16">
      <div className="max-w-3xl w-full text-center space-y-8 sm:space-y-12">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs sm:text-sm font-medium">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Real-time Multiplayer 16 Parchi</span>
        </div>

        {/* Hero title & tagline */}
        <div className="space-y-4 sm:space-y-6">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white">
            Think ahead. <br className="hidden sm:inline" />
            Pass smart. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-amber-400">
              Complete the set.
            </span>
          </h1>
          <p className="max-w-xl mx-auto text-base sm:text-lg text-slate-400 leading-relaxed">
            The traditional Indian 4-of-a-kind card game, redesigned for the modern web.
            Send a room code to three friends and play instantly from any device.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <button
            onClick={onCreateClick}
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white font-bold text-base shadow-lg shadow-indigo-600/30 transition-all border border-indigo-400/30"
          >
            <PlusCircle className="w-5 h-5" />
            <span>CREATE GAME</span>
          </button>
          <button
            onClick={onJoinClick}
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-surface-100 hover:bg-surface-50 active:scale-[0.98] text-slate-100 font-bold text-base transition-all border border-card-border hover:border-slate-600"
          >
            <LogIn className="w-5 h-5 text-cyan-400" />
            <span>JOIN GAME</span>
          </button>
        </div>

        {/* 4 Feature Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto pt-6">
          <div className="p-4 rounded-xl bg-surface-100/60 border border-card-border flex flex-col items-center">
            <span className="text-2xl font-black text-indigo-400">4</span>
            <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold mt-1">
              PLAYERS
            </span>
          </div>
          <div className="p-4 rounded-xl bg-surface-100/60 border border-card-border flex flex-col items-center">
            <span className="text-2xl font-black text-cyan-400">16</span>
            <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold mt-1">
              CARDS
            </span>
          </div>
          <div className="p-4 rounded-xl bg-surface-100/60 border border-card-border flex flex-col items-center">
            <span className="text-2xl font-black text-amber-400">4</span>
            <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold mt-1">
              SETS
            </span>
          </div>
          <div className="p-4 rounded-xl bg-surface-100/60 border border-card-border flex flex-col items-center">
            <span className="text-2xl font-black text-emerald-400">1</span>
            <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold mt-1">
              WINNER
            </span>
          </div>
        </div>

        {/* Decorative Card preview */}
        <div className="pt-4 flex items-center justify-center gap-2 opacity-85">
          <div className="w-16 h-24 sm:w-20 sm:h-28 rounded-xl bg-surface-50 border border-indigo-500/40 p-2 flex flex-col justify-between -rotate-6 shadow-xl shadow-black/40">
            <span className="text-lg">🌌</span>
            <span className="text-[10px] font-bold text-indigo-300">INTERSTELLAR</span>
          </div>
          <div className="w-16 h-24 sm:w-20 sm:h-28 rounded-xl bg-surface-50 border border-cyan-500/40 p-2 flex flex-col justify-between -rotate-2 shadow-xl shadow-black/40">
            <span className="text-lg">🛡️</span>
            <span className="text-[10px] font-bold text-cyan-300">AVENGERS</span>
          </div>
          <div className="w-16 h-24 sm:w-20 sm:h-28 rounded-xl bg-surface-50 border border-amber-500/40 p-2 flex flex-col justify-between rotate-3 shadow-xl shadow-black/40">
            <span className="text-lg">🏜️</span>
            <span className="text-[10px] font-bold text-amber-300">DUNE</span>
          </div>
          <div className="w-16 h-24 sm:w-20 sm:h-28 rounded-xl bg-surface-50 border border-emerald-500/40 p-2 flex flex-col justify-between rotate-8 shadow-xl shadow-black/40">
            <span className="text-lg">🌀</span>
            <span className="text-[10px] font-bold text-emerald-300">INCEPTION</span>
          </div>
        </div>

        {/* How to play trigger */}
        <div>
          <button
            onClick={onOpenHelp}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
          >
            <span>First time playing? Read the simple rules</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
