import React from 'react';
import { Card as CardType } from '@solavin/shared';
import { Check } from 'lucide-react';

interface CardItemProps {
  card: CardType;
  isSelected?: boolean;
  disabled?: boolean;
  onSelect?: () => void;
}

export const CardItem: React.FC<CardItemProps> = ({
  card,
  isSelected,
  disabled,
  onSelect
}) => {
  return (
    <div
      onClick={() => {
        if (!disabled && onSelect) onSelect();
      }}
      className={`relative w-28 sm:w-36 h-40 sm:h-52 rounded-2xl p-3 sm:p-4 flex flex-col justify-between transition-all duration-200 select-none ${
        disabled
          ? 'opacity-60 cursor-not-allowed bg-surface-100 border border-card-border'
          : 'cursor-pointer hover:-translate-y-2 active:scale-95'
      } ${
        isSelected
          ? 'bg-gradient-to-b from-indigo-950/80 to-surface-100 border-2 border-indigo-400 -translate-y-3 shadow-xl shadow-indigo-600/30'
          : 'bg-surface-100 border border-card-border hover:border-slate-500 shadow-lg'
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
        {isSelected && (
          <span className="text-indigo-400 font-bold tracking-wider uppercase">READY</span>
        )}
      </div>
    </div>
  );
};
