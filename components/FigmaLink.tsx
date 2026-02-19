import type { JSX } from 'react';

interface FigmaLinkProps {
  href: string;
  tooltipPosition?: 'top' | 'bottom';
  className?: string;
}

export function FigmaLink({ href, tooltipPosition = 'bottom', className = '' }: FigmaLinkProps): JSX.Element {
  const isTop = tooltipPosition === 'top';

  const tooltipPositionClasses = isTop
    ? 'bottom-full left-1/2 -translate-x-1/2 mb-3'
    : 'top-full left-1/2 -translate-x-1/2 mt-3';

  const arrowClasses = isTop
    ? 'border-r border-b left-1/2 -translate-x-1/2 -bottom-1'
    : 'border-t border-l left-1/2 -translate-x-1/2 -top-1';

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-700 hover:bg-zinc-800 hover:border-zinc-600 transition-all group overflow-visible ${className}`}
    >
      <img src="/Figma_logo.svg" alt="Figma" className="w-4 h-4" />
      <span className="text-xs font-semibold text-zinc-400 group-hover:text-white uppercase tracking-wide">
        Figma
      </span>

      <div
        className={`absolute ${tooltipPositionClasses} px-3 py-1.5 bg-zinc-950/90 backdrop-blur-md border border-white/10 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none transform translate-y-1 group-hover:translate-y-0 z-50 whitespace-nowrap`}
      >
        <span className="text-[10px] font-medium text-white">View on Figma</span>
        <div
          className={`w-2 h-2 bg-zinc-950/90 border-white/10 transform rotate-45 absolute ${arrowClasses}`}
        />
      </div>
    </a>
  );
}
