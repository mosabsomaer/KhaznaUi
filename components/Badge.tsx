import React, { useContext } from 'react';

interface BadgeProps {
  type: 'new' | 'updated';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ type, className = '' }) => {
  const styles = type === 'new' 
    ? 'bg-zinc-100 text-zinc-950 border-zinc-200 font-semibold' 
    : 'bg-zinc-800 text-zinc-300 border-zinc-700';
  
  const label = type === 'new' ? 'New' : 'Updated';

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium border ${styles} ${className}`}>
      {label}
    </span>
  );
};