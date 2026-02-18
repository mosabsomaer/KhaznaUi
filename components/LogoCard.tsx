
import React, { useContext } from 'react';
import { Bank, PaymentMethod, UIContextType } from '../types';
import { Badge } from './Badge';
import { UIContext } from '../App';

interface LogoCardProps {
  item: Bank | PaymentMethod;
}

export const LogoCard: React.FC<LogoCardProps> = ({ item }) => {
  const { setSelectedItem, selectedItem } = useContext(UIContext) as UIContextType;

  const isSelected = selectedItem?.id === item.id;

  return (
    <div className="flex flex-col gap-3 group">
      <button
        onClick={() => setSelectedItem(item)}
        className={`
          relative w-full aspect-square flex flex-col items-center justify-center p-6
          border rounded-xl transition-all duration-200
          hover:bg-zinc-900/50 
          ${isSelected ? 'border-zinc-500 ring-1 ring-zinc-500 bg-zinc-900' : 'border-border bg-background hover:border-zinc-600'}
        `}
      >
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {item.isNew && <Badge type="new" />}
          {item.isUpdated && !item.isNew && <Badge type="updated" />}
        </div>

        {/* Logo Container */}
        <div className="w-full h-20 flex items-center justify-center transition-all duration-300">
          <img 
            src={item.logoUrl} 
            alt={item.name} 
            className="max-w-full max-h-full object-contain" 
          />
        </div>
      </button>

      <span className="text-sm font-medium text-zinc-400 group-hover:text-zinc-100 transition-colors text-center px-1">
        {item.name}
      </span>
    </div>
  );
};
