import React from 'react';
import { Card as CardType } from '@solavin/shared';
import { Check, Lock } from 'lucide-react';

interface CardItemProps {
  card: CardType;
  isSelected?: boolean;
  disabled?: boolean;
  isForbidden?: boolean;
  forbiddenReason?: string;
  onSelect?: () => void;
}

export const CardItem: React.FC<CardItemProps> = ({
  card,
  isSelected,
  disabled,
  isForbidden,
  forbiddenReason,
  onSelect
}) => {
  return (
    <div
      onClick={() => {
        if (!disabled && !isForbidden && onSelect) onSelect();
      }}
      title={isForbidden ? (forbiddenReason || 'In Pro Mode, you cannot pass the card you just received.') : undefined}
      className={`relative w-28 sm:w-36 h-40 sm:h-52 rounded-2xl p-3 sm:p-4 flex flex-col justify-between transition-all duration-200 select-none ${
        isForbidden
          ? 'cursor-not-allowed bg-rose-950/20 border-2 border-rose-500/60 opacity-75 shadow-rose-950/40'
          : disabled
          ? 'opacity-60 cursor-not-allowed bg-surface-100 border border-card-border'
          : 'cursor-pointer hover:-translate-y-2 active:scale-95'
      } ${
        isSelected
          ? 'bg-gradient-to-b from-indigo-950/80 to-surface-100 border-2 border-indigo-400 -translate-y-3 shadow-xl shadow-indigo-600/30'
          : !isForbidden ? 'bg-surface-100 border border-card-border hover:border-slate-500 shadow-lg' : ''
      }`}
    >
      {/* Top Header of Card */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400 truncate max-w-[70px] sm:max-w-[85px]">
          {card.itemCategory || 'Card'}
        </span>
        {isSelected ? (
          <div className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center text-white">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
        ) : isForbidden ? (
          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-[9px] font-bold">
            <Lock className="w-2.5 h-2.5" />
            <span className="hidden sm:inline">LOCKED</span>
          </div>
        ) : (
          <div className="w-3.5 h-3.5 rounded-full bg-surface-50 border border-card-border" />
        )}
      </div>

      {/* Center Icon */}
      <div className="my-auto flex flex-col items-center justify-center text-center">
        <span className="text-3xl sm:text-5xl filter drop-shadow-md mb-1 sm:mb-2 transition-transform duration-200">
          {card.itemIcon || '🃏'}
        </span>
        <span className="font-extrabold text-xs sm:text-sm text-white tracking-tight leading-tight line-clamp-2">
          {card.itemName}
        </span>
      </div>

      {/* Bottom indicator */}
      <div className="pt-1 border-t border-card-border/60 flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-slate-400">
        <span className="truncate">SOLAVIN</span>
        {isSelected ? (
          <span className="text-indigo-400 font-bold tracking-wider uppercase">READY</span>
        ) : isForbidden ? (
          <span className="text-rose-400 font-bold tracking-wider uppercase text-[8px] sm:text-[9px]">RECEIVED</span>
        ) : null}
      </div>
    </div>
  );
};
