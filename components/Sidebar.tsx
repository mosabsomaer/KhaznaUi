
import React, { useContext, useState, useEffect, useMemo } from 'react';
import { X, Download, Copy, Check, LayoutGrid, FileCode, Image as ImageIcon, Loader2 } from 'lucide-react';
import { UIContext } from '../App';
import { UIContextType } from '../types';
import { generateCode } from '../utils/generators';
import { downloadBlob, convertSvgToImage } from '../utils/download';
import { FigmaLogo } from './FigmaLogo';

// MOCK SVG for demonstration since we are using Picsum images currently.
const MOCK_SVG_CONTENT = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const ColorPill: React.FC<{ color: string }> = ({ color }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 600);
  };

  const isLight = useMemo(() => {
    try {
      const hex = color.replace('#', '');
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      return brightness > 155;
    } catch (e) {
      return false;
    }
  }, [color]);

  return (
    <button
      onClick={handleCopy}
      className="flex items-center justify-center px-4 py-2 rounded-full border border-white/10 shadow-sm transition-all hover:scale-105 active:scale-95"
      style={{ backgroundColor: color }}
      title="Click to copy HEX"
    >
      <span className={`text-xs font-bold font-mono uppercase tracking-wider ${isLight ? 'text-black/80' : 'text-white'}`}>
        {copied ? 'Copied!' : color}
      </span>
    </button>
  );
};

export const Sidebar: React.FC = () => {
  const { selectedItem, isSidebarOpen, closeSidebar } = useContext(UIContext) as UIContextType;
  const [activeTab, setActiveTab] = useState<'download' | 'code'>('download');
  const [codeFormat, setCodeFormat] = useState('React');
  const [copied, setCopied] = useState(false);
  const [svgContent, setSvgContent] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  // Fetch SVG Content when item changes
  useEffect(() => {
    const fetchSvg = async () => {
      if (!selectedItem) return;
      
      try {
        if (selectedItem.logoUrl.endsWith('.svg')) {
          const response = await fetch(selectedItem.logoUrl);
          const text = await response.text();
          setSvgContent(text);
        } else {
          setSvgContent(MOCK_SVG_CONTENT);
        }
      } catch (err) {
        console.error("Failed to fetch SVG", err);
        setSvgContent(MOCK_SVG_CONTENT);
      }
    };

    fetchSvg();
    setCopied(false);
    setIsProcessing(null);
  }, [selectedItem]);

  // Generate code based on current selection
  const generatedCode = useMemo(() => {
    if (!svgContent || !selectedItem) return '';
    return generateCode(codeFormat, svgContent, selectedItem.name);
  }, [svgContent, codeFormat, selectedItem]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 600); // Fast feedback
  };

  const handleDownload = async (format: string) => {
    if (!selectedItem || !svgContent || isProcessing) return;

    setIsProcessing(format);
    const filename = `${selectedItem.id}-${selectedItem.name.toLowerCase().replace(/\s+/g, '-')}`;

    try {
      if (format === 'SVG') {
        const blob = new Blob([svgContent], { type: 'image/svg+xml' });
        downloadBlob(blob, `${filename}.svg`);
      } else {
        const mimeType = format === 'PNG' ? 'image/png' : 'image/webp';
        await new Promise(resolve => setTimeout(resolve, 500)); 
        const dataUrl = await convertSvgToImage(svgContent, 1024, 1024, mimeType);
        const res = await fetch(dataUrl);
        const blob = await res.blob();
        downloadBlob(blob, `${filename}.${format.toLowerCase()}`);
      }
    } catch (e) {
      console.error("Download failed", e);
      alert("Could not convert image. Try downloading as SVG.");
    } finally {
      setIsProcessing(null);
    }
  };

  if (!isSidebarOpen) return null;

  return (
    <aside className={`
      fixed inset-y-0 right-0 z-50 
      w-full md:w-[400px] 
      bg-background border-l border-border 
      transform transition-transform duration-300 ease-in-out
      flex flex-col shadow-2xl shadow-black
      ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
    `}>
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-border bg-background/95 backdrop-blur z-10">
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
          <LayoutGrid size={14} /> Details
        </h2>
        <button 
          onClick={closeSidebar}
          className="p-2 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-full transition-colors outline-none focus:bg-zinc-800"
        >
          <X size={20} />
        </button>
      </div>

      {selectedItem ? (
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {/* Preview Area */}
          <div className="relative aspect-square w-full border-b border-border bg-zinc-900/50 flex items-center justify-center p-12 overflow-hidden group">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                 style={{ 
                   backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3Ccircle cx='13' cy='13' r='1'/%3E%3C/g%3E%3C/svg%3E")` 
                 }} 
            />
            
            <img 
              src={selectedItem.logoUrl} 
              alt={selectedItem.name} 
              className="relative z-10 w-full h-full object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <div className="p-6 space-y-8">
            {/* Info Header */}
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <h1 className="text-2xl font-bold text-white">{selectedItem.name}</h1>
                {selectedItem.figmaUrl && (
                  <a
                    href={selectedItem.figmaUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-800/50 border border-zinc-700 hover:bg-zinc-800 hover:border-zinc-600 transition-all group overflow-visible"
                  >
                    <FigmaLogo className="w-4 h-4" />
                    <span className="text-xs font-semibold text-zinc-400 group-hover:text-white uppercase tracking-wide">Figma</span>
                    
                    {/* Hyper Tooltip */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 px-3 py-1.5 bg-zinc-950/90 backdrop-blur-md border border-white/10 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none transform translate-y-1 group-hover:translate-y-0 z-50 whitespace-nowrap">
                      <span className="text-[10px] font-medium text-white">View on Figma</span>
                      <div className="w-2 h-2 bg-zinc-950/90 border-t border-l border-white/10 transform rotate-45 absolute left-1/2 -translate-x-1/2 -top-1"></div>
                    </div>
                  </a>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                 {selectedItem.colors.map((color, idx) => (
                   <ColorPill key={idx} color={color} />
                 ))}
              </div>
            </div>

            {/* Tabs */}
            <div className="space-y-6">
              <div className="flex border-b border-border relative">
                <button
                  onClick={() => setActiveTab('download')}
                  className={`flex-1 pb-3 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${activeTab === 'download' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                  <ImageIcon size={16} /> Assets
                </button>
                <button
                  onClick={() => setActiveTab('code')}
                  className={`flex-1 pb-3 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${activeTab === 'code' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                  <FileCode size={16} /> Code
                </button>
                
                {/* Active Tab Indicator */}
                <div 
                  className="absolute bottom-0 h-0.5 bg-white transition-all duration-300"
                  style={{ 
                    left: activeTab === 'download' ? '0%' : '50%', 
                    width: '50%' 
                  }}
                />
              </div>

              {activeTab === 'download' ? (
                <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  {['SVG', 'PNG', 'WebP'].map(fmt => (
                    <button
                      key={fmt}
                      onClick={() => handleDownload(fmt)}
                      disabled={!!isProcessing}
                      className="group w-full flex items-center justify-between px-4 py-3.5 rounded-xl border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900 hover:border-zinc-700 active:scale-[0.98] transition-all duration-200 outline-none focus:ring-1 focus:ring-zinc-600"
                    >
                      <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">
                        {fmt}
                      </span>
                      
                      <div className="text-zinc-600 group-hover:text-white transition-colors">
                        {isProcessing === fmt ? (
                          <Loader2 size={18} className="animate-spin" />
                        ) : (
                          <Download size={18} />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                   <div className="grid grid-cols-4 gap-2">
                    {['React', 'Vue', 'Svelte', 'HTML'].map(fmt => (
                      <button
                        key={fmt}
                        onClick={() => setCodeFormat(fmt)}
                        className={`
                          py-2 text-[10px] sm:text-xs font-medium rounded-lg border transition-all duration-200
                          ${codeFormat === fmt 
                            ? 'bg-white text-black border-white shadow-lg shadow-white/10' 
                            : 'bg-transparent text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900'}
                        `}
                      >
                        {fmt}
                      </button>
                    ))}
                  </div>

                  <div 
                    className="relative group cursor-pointer overflow-hidden rounded-lg border border-border bg-zinc-950"
                    onClick={handleCopy}
                  >
                    <pre className="p-4 font-mono text-xs text-zinc-300 overflow-x-auto h-64 custom-scrollbar leading-relaxed">
                      <code>{generatedCode}</code>
                    </pre>

                    {/* Hover Overlay */}
                    <div className={`
                        absolute inset-0 bg-zinc-950/80 backdrop-blur-[2px] 
                        flex items-center justify-center gap-2 
                        transition-opacity duration-200
                        ${copied ? 'opacity-100 bg-emerald-950/80' : 'opacity-0 group-hover:opacity-100'}
                    `}>
                        {copied ? (
                            <>
                                <Check size={20} className="text-emerald-500" />
                                <span className="text-emerald-500 font-semibold">Copied!</span>
                            </>
                        ) : (
                            <>
                                <Copy size={20} className="text-white" />
                                <span className="text-white font-semibold">Click to copy</span>
                            </>
                        )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-zinc-500">
          <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center mb-4 ring-1 ring-zinc-800">
            <LayoutGrid size={24} className="opacity-50" />
          </div>
          <p className="text-sm font-medium text-zinc-400">No logo selected</p>
          <p className="text-xs text-zinc-600 mt-1">Select an item from the grid to view details</p>
        </div>
      )}
    </aside>
  );
};
