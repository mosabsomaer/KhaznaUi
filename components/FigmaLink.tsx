import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

interface FigmaLinkProps {
  href: string;
  tooltipPosition?: 'top' | 'bottom';
  className?: string;
}

export function FigmaLink({ href, tooltipPosition = 'bottom', className = '' }: FigmaLinkProps): JSX.Element {
  const { t } = useTranslation();
  const isTop = tooltipPosition === 'top';

  const tooltipPositionClasses = isTop
    ? 'bottom-full start-1/2 -translate-x-1/2 mb-3'
    : 'top-full start-1/2 -translate-x-1/2 mt-3';

  const arrowClasses = isTop
    ? 'border-e border-b start-1/2 -translate-x-1/2 -bottom-1'
    : 'border-t border-s start-1/2 -translate-x-1/2 -top-1';

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border-subtle hover:bg-surface-hover hover:border-border transition-all group overflow-visible ${className}`}
    >
      <img src="/Figma_logo.svg" alt="Figma" className="w-4 h-4" />
      <span className="text-xs font-semibold text-muted group-hover:text-primary uppercase tracking-wide">
        {t('figma.figma')}
      </span>

      <div
        className={`absolute ${tooltipPositionClasses} px-3 py-1.5 bg-elevated/90 backdrop-blur-md border border-border/10 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none transform translate-y-1 group-hover:translate-y-0 z-50 whitespace-nowrap`}
      >
        <span className="text-[10px] font-medium text-primary">{t('figma.viewOnFigma')}</span>
        <div
          className={`w-2 h-2 bg-elevated/90 border-border/10 transform rotate-45 absolute ${arrowClasses}`}
        />
      </div>
    </a>
  );
}
