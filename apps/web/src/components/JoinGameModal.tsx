import React, { useState, useEffect } from 'react';
import { X, LogIn, AlertCircle } from 'lucide-react';

interface JoinGameModalProps {
  isOpen: boolean;
  initialRoomCode?: string;
  onClose: () => void;
  onJoin: (roomCode: string, playerName: string) => Promise<{ success: boolean; error?: string }>;
}

export const JoinGameModal: React.FC<JoinGameModalProps> = ({
  isOpen,
  initialRoomCode = '',
  onClose,
  onJoin
}) => {
  const [playerName, setPlayerName] = useState(localStorage.getItem('solavin_last_name') || '');
  const [roomCode, setRoomCode] = useState(initialRoomCode);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (initialRoomCode) {
      setRoomCode(initialRoomCode.toUpperCase());
    }
  }, [initialRoomCode]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const trimmedName = playerName.trim();
    const trimmedCode = roomCode.trim().toUpperCase();

    if (!trimmedName) {
      setErrorMsg('Please enter your display name');
      return;
    }

    if (!trimmedCode || trimmedCode.length !== 6) {
      setErrorMsg('Room code must be exactly 6 characters');
      return;
    }

    localStorage.setItem('solavin_last_name', trimmedName);
    setIsLoading(true);

    const res = await onJoin(trimmedCode, trimmedName);
    setIsLoading(false);

    if (res.success) {
      onClose();
    } else if (res.error) {
      setErrorMsg(res.error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-surface-100 border border-card-border rounded-2xl w-full max-w-md flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-card-border">
          <div className="flex items-center gap-2">
            <LogIn className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-white tracking-wide">Join Game</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-surface-50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errorMsg && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center gap-2 text-rose-300 text-xs">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Your Display Name
            </label>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="e.g. Rahul"
              maxLength={20}
              required
              className="w-full px-4 py-3 bg-surface-200 border border-card-border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              6-Character Room Code
            </label>
            <input
              type="text"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''))}
              placeholder="e.g. K7P4QX"
              maxLength={6}
              required
              className="w-full px-4 py-3 bg-surface-200 border border-card-border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-center font-mono font-bold tracking-widest text-lg"
            />
          </div>

          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-card-border text-slate-400 hover:text-white font-medium text-xs transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-cyan-600/30 transition-all flex items-center justify-center gap-1.5"
            >
              {isLoading ? 'Joining...' : 'JOIN ROOM'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
