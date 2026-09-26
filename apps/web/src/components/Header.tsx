import React from 'react';
import { Volume2, VolumeX, HelpCircle, LogOut, Radio } from 'lucide-react';
import { sound } from '../lib/sound';

interface HeaderProps {
  roomCode?: string;
  isConnected: boolean;
  onOpenHelp: () => void;
  onLeaveRoom?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  roomCode,
  isConnected,
  onOpenHelp,
  onLeaveRoom,
}) => {
  const [isSoundOn, setIsSoundOn] = React.useState(sound.isEnabled());

  const toggleSound = () => {
    const next = sound.toggle();
    setIsSoundOn(next);
  };

  return (
    <header className="w-full border-b border-surface-50/50 bg-background/80 backdrop-blur-md sticky top-0 z-40 px-4 py-3 sm:px-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 relative flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
              <rect x="12" y="12" width="34" height="34" rx="8" fill="#6366F1" />
              <rect x="54" y="12" width="34" height="34" rx="8" fill="#06B6D4" />
              <rect x="12" y="54" width="34" height="34" rx="8" fill="#F59E0B" />
              <rect x="54" y="54" width="34" height="34" rx="8" fill="#10B981" />
              <circle cx="50" cy="50" r="10" fill="#0B0D13" stroke="#23293D" strokeWidth="3" />
            </svg>
          </div>
          <div>
            <h1 className="font-extrabold text-lg sm:text-xl tracking-wider text-slate-100 uppercase">
              SOLAVIN
            </h1>
            <span className="hidden sm:inline-block text-[11px] font-medium tracking-wide text-slate-400">
              16 PARCHI REAL-TIME
            </span>
          </div>
        </div>

        {/* Center: Room Code if in room */}
        {roomCode && (
          <div className="flex items-center gap-2 px-3 py-1 bg-surface-100 border border-card-border rounded-lg">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
              ROOM
            </span>
            <span className="font-mono font-bold text-sm tracking-widest text-indigo-400">
              {roomCode}
            </span>
          </div>
        )}

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Connection status */}
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
              isConnected
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                : 'bg-rose-500/10 text-rose-400 border-rose-500/20 animate-pulse'
            }`}
            title={isConnected ? 'Connected to server' : 'Reconnecting...'}
          >
            <Radio className="w-3 h-3" />
            <span className="hidden md:inline">{isConnected ? 'Online' : 'Connecting'}</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="p-2 rounded-lg bg-surface-100 hover:bg-surface-50 text-slate-300 hover:text-white transition-colors border border-card-border"
            title={isSoundOn ? 'Mute sound' : 'Unmute sound'}
            aria-label="Toggle sound"
          >
            {isSoundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          {/* How to Play */}
          <button
            onClick={onOpenHelp}
            className="p-2 rounded-lg bg-surface-100 hover:bg-surface-50 text-slate-300 hover:text-white transition-colors border border-card-border"
            title="How to play"
            aria-label="How to play"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Exit Room if in room */}
          {onLeaveRoom && roomCode && (
            <button
              onClick={onLeaveRoom}
              className="p-2 rounded-lg bg-surface-100 hover:bg-rose-950/40 text-slate-300 hover:text-rose-300 transition-colors border border-card-border hover:border-rose-800/40"
              title="Leave Room"
              aria-label="Leave Room"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
