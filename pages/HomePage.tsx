
import type { JSX } from 'react';
import { useState } from 'react';
import { Badge } from '../components/Badge';
import { BANKS, PAYMENT_METHODS } from '../constants';
import { useUIContext } from '../hooks/useUIContext';
import { LogoVariant } from '../types';

type Category = 'banks' | 'payment_methods';

export function HomePage(): JSX.Element {
  const { setSelectedItem, selectedItem, logoVariant, setLogoVariant, getLogoUrl } = useUIContext();
  const [activeCategory, setActiveCategory] = useState<Category>('banks');
  const [logoSize, setLogoSize] = useState(100);

  const items = activeCategory === 'banks' ? BANKS : PAYMENT_METHODS;

  const categories: { key: Category; label: string; count: number }[] = [
    { key: 'banks', label: 'Banks', count: BANKS.length },
    { key: 'payment_methods', label: 'Payment Methods', count: PAYMENT_METHODS.length },
  ];

  const variants: { key: LogoVariant; label: string }[] = [
    { key: 'mono', label: 'Mono' },
    { key: 'branded', label: 'Branded' },
    { key: 'logomark', label: 'Logomark' },
  ];

  return (
    <div className="pb-8">
      <div className="py-12 border-b border-border/50">
        <h1 className="text-3xl font-bold text-white mb-2">Logo Library</h1>
        <p className="text-zinc-400 max-w-2xl">
          A collection of logos for Libyan banks and payment methods.
          Available in mono, branded, and logomark variants.
        </p>
      </div>

      {/* Toolbar: Category Tabs | Size Slider | Style Toggle */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 py-4 border-b border-zinc-800">
        {/* Category Tabs */}
        <div className="flex items-center gap-1">
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`
                relative flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors
                ${activeCategory === cat.key
                  ? 'text-white'
                  : 'text-zinc-500 hover:text-zinc-300'
                }
              `}
            >
              {cat.label}
              <span className={`
                text-xs px-2 py-0.5 rounded-md font-medium
                ${activeCategory === cat.key
                  ? 'bg-zinc-700 text-zinc-200'
                  : 'text-zinc-600'
                }
              `}>
                {cat.count}
              </span>
              {activeCategory === cat.key && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Size Slider (center) */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-zinc-300">size</span>
          <input
            type="range"
            min="100"
            max="200"
            value={logoSize}
            onChange={(e) => setLogoSize(Number(e.target.value))}
            className="range-slider w-48"
          />
          <span className="text-sm font-bold text-zinc-300 tabular-nums w-8 text-right">{logoSize}</span>
        </div>

        {/* Style Toggle */}
        <div className="flex items-center bg-zinc-900 rounded-lg border border-zinc-800 p-1 self-start lg:self-auto">
          {variants.map(v => (
            <button
              key={v.key}
              onClick={() => setLogoVariant(v.key)}
              className={`
                px-4 py-1.5 text-sm font-medium rounded-md transition-all
                ${logoVariant === v.key
                  ? 'bg-zinc-700 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
                }
              `}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      {/* Logo Grid */}
      <div className="border border-zinc-800 rounded-xl overflow-hidden mt-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {items.map(item => {
            const isSelected = selectedItem?.id === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={`
                  relative flex flex-col items-center justify-center gap-3
                  border-r border-b border-zinc-800
                  p-6 transition-all duration-150 cursor-pointer
                  ${isSelected
                    ? 'bg-zinc-900 ring-1 ring-inset ring-zinc-500'
                    : 'bg-background hover:bg-zinc-900/60'
                  }
                `}
                style={{ aspectRatio: '1 / 1' }}
              >
                {/* Badges */}
                {(item.isNew || item.isUpdated) && (
                  <div className="absolute top-3 left-3 flex gap-1">
                    {item.isNew && <Badge type="new" />}
                    {item.isUpdated && !item.isNew && <Badge type="updated" />}
                  </div>
                )}

                {/* Logo */}
                <img
                  src={getLogoUrl(item)}
                  alt={item.name}
                  className={`object-contain transition-all duration-200 ${
                    logoVariant === 'mono' ? 'brightness-0 invert' : ''
                  }`}
                  style={{
                    width: `${logoSize}px`,
                    height: `${logoSize}px`,
                  }}
                />

                {/* Name */}
                <span className="text-xs text-zinc-500 font-medium truncate w-full text-center">{item.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
