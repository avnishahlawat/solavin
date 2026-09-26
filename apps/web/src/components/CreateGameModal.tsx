import React, { useState } from 'react';
import { X, Sparkles, Check, Plus, AlertCircle } from 'lucide-react';
import { PRESET_THEMES } from '@solavin/shared';

interface CreateGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (
    playerName: string,
    themeId?: string,
    customTheme?: { name: string; items: string[] }
  ) => Promise<{ success: boolean; error?: string }>;
}

export const CreateGameModal: React.FC<CreateGameModalProps> = ({ isOpen, onClose, onCreate }) => {
  const [playerName, setPlayerName] = useState(localStorage.getItem('solavin_last_name') || '');
  const [activeTab, setActiveTab] = useState<'preset' | 'custom'>('preset');
  const [selectedThemeId, setSelectedThemeId] = useState(PRESET_THEMES[0].id);

  // Custom theme fields
  const [customName, setCustomName] = useState('');
  const [customItem1, setCustomItem1] = useState('');
  const [customItem2, setCustomItem2] = useState('');
  const [customItem3, setCustomItem3] = useState('');
  const [customItem4, setCustomItem4] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const trimmedName = playerName.trim();
    if (!trimmedName) {
      setErrorMsg('Please enter your display name');
      return;
    }

    localStorage.setItem('solavin_last_name', trimmedName);
    setIsLoading(true);

    let res;
    if (activeTab === 'preset') {
      res = await onCreate(trimmedName, selectedThemeId);
    } else {
      const items = [customItem1.trim(), customItem2.trim(), customItem3.trim(), customItem4.trim()];
      if (items.some((i) => !i)) {
        setIsLoading(false);
        setErrorMsg('Please fill in all 4 custom items');
        return;
      }
      const unique = new Set(items.map((i) => i.toLowerCase()));
      if (unique.size !== 4) {
        setIsLoading(false);
        setErrorMsg('All 4 custom items must be unique');
        return;
      }
      res = await onCreate(trimmedName, undefined, {
        name: customName.trim() || 'Custom Theme',
        items
      });
    }

    setIsLoading(false);
    if (res.success) {
      onClose();
    } else if (res.error) {
      setErrorMsg(res.error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-surface-100 border border-card-border rounded-2xl w-full max-w-xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-card-border">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-white tracking-wide">Create New Game</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-surface-50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="px-6 py-5 overflow-y-auto space-y-6">
            {errorMsg && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center gap-2 text-rose-300 text-xs">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Name input */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Your Display Name
              </label>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="e.g. Arya"
                maxLength={20}
                required
                className="w-full px-4 py-3 bg-surface-200 border border-card-border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm font-medium"
              />
            </div>

            {/* Theme Tabs */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Card Theme
              </label>
              <div className="flex rounded-xl bg-surface-200 p-1 border border-card-border mb-4">
                <button
                  type="button"
                  onClick={() => setActiveTab('preset')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${
                    activeTab === 'preset'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  PRESET THEMES
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('custom')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${
                    activeTab === 'custom'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  CUSTOM THEME
                </button>
              </div>

              {/* Preset selection grid */}
              {activeTab === 'preset' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-56 overflow-y-auto pr-1">
                  {PRESET_THEMES.map((theme) => {
                    const isSelected = selectedThemeId === theme.id;
                    return (
                      <div
                        key={theme.id}
                        onClick={() => setSelectedThemeId(theme.id)}
                        className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-indigo-950/40 border-indigo-500 ring-1 ring-indigo-500'
                            : 'bg-surface-200/50 border-card-border hover:border-slate-600'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-xs text-white">{theme.name}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-indigo-400" />}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-400">
                          {theme.items.map((item) => (
                            <span key={item.id} title={item.name}>
                              {item.icon}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Custom Theme Form */
                <div className="space-y-3 bg-surface-200/60 p-4 rounded-xl border border-card-border">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                      Theme Name
                    </label>
                    <input
                      type="text"
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      placeholder="e.g. My Favorite Movies"
                      maxLength={30}
                      className="w-full px-3 py-2 bg-surface-100 border border-card-border rounded-lg text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                      Enter 4 Distinct Items (4 items × 4 cards = 16 cards)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={customItem1}
                        onChange={(e) => setCustomItem1(e.target.value)}
                        placeholder="Item 1"
                        maxLength={20}
                        className="px-3 py-2 bg-surface-100 border border-card-border rounded-lg text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                      />
                      <input
                        type="text"
                        value={customItem2}
                        onChange={(e) => setCustomItem2(e.target.value)}
                        placeholder="Item 2"
                        maxLength={20}
                        className="px-3 py-2 bg-surface-100 border border-card-border rounded-lg text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                      />
                      <input
                        type="text"
                        value={customItem3}
                        onChange={(e) => setCustomItem3(e.target.value)}
                        placeholder="Item 3"
                        maxLength={20}
                        className="px-3 py-2 bg-surface-100 border border-card-border rounded-lg text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                      />
                      <input
                        type="text"
                        value={customItem4}
                        onChange={(e) => setCustomItem4(e.target.value)}
                        placeholder="Item 4"
                        maxLength={20}
                        className="px-3 py-2 bg-surface-100 border border-card-border rounded-lg text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-card-border bg-surface-200/50 flex items-center justify-between">
            <span className="text-xs text-slate-400">Generates 16 cards</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-slate-400 hover:text-white font-medium text-xs transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-indigo-600/30 transition-all flex items-center gap-1.5"
              >
                {isLoading ? 'Creating Room...' : 'CREATE ROOM'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
