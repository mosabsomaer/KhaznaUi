
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ZoomIn, Download, X, Loader2, DownloadCloud, ChevronLeft, ChevronRight } from 'lucide-react';
import { BANKS, MOCK_SCREENSHOTS } from '../constants';
import { Screenshot } from '../types';
import JSZip from 'jszip';
import { downloadBlob } from '../utils/download';
import { FigmaLogo } from '../components/FigmaLogo';

export const AppDetailPage: React.FC = () => {
  const { bankId } = useParams<{ bankId: string }>();
  const [selectedScreen, setSelectedScreen] = useState<Screenshot | null>(null);
  const [isDownloadingAll, setIsDownloadingAll] = useState(false);
  const [isDownloadingSingle, setIsDownloadingSingle] = useState(false);

  const bank = BANKS.find(b => b.id === bankId);
  const screenshots = bankId ? MOCK_SCREENSHOTS[bankId] || [] : [];

  if (!bank) {
    return <Navigate to="/apps" replace />;
  }

  // Handle keydown for lightbox navigation
  useEffect(() => {
    if (!selectedScreen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedScreen(null);
      } else if (e.key === 'ArrowRight') {
        navigateLightbox('next');
      } else if (e.key === 'ArrowLeft') {
        navigateLightbox('prev');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedScreen, screenshots]);

  const navigateLightbox = useCallback((direction: 'next' | 'prev') => {
    if (!selectedScreen) return;
    const currentIndex = screenshots.findIndex(s => s.id === selectedScreen.id);
    if (currentIndex === -1) return;

    let newIndex;
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % screenshots.length;
    } else {
      newIndex = (currentIndex - 1 + screenshots.length) % screenshots.length;
    }
    setSelectedScreen(screenshots[newIndex]);
  }, [selectedScreen, screenshots]);


  // Handle downloading a single image from the lightbox
  const handleDownloadSingle = async (screen: Screenshot) => {
    try {
      setIsDownloadingSingle(true);
      const response = await fetch(screen.url);
      const blob = await response.blob();
      const filename = `${bank.name.toLowerCase().replace(/\s+/g, '-')}-${screen.label.toLowerCase().replace(/\s+/g, '-')}.png`;
      downloadBlob(blob, filename);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download image.');
    } finally {
      setIsDownloadingSingle(false);
    }
  };

  // Handle downloading all images as a ZIP
  const handleDownloadAll = async () => {
    if (screenshots.length === 0) return;

    try {
      setIsDownloadingAll(true);
      const zip = new JSZip();
      const folder = zip.folder(bank.name.replace(/\s+/g, '-'));

      const promises = screenshots.map(async (screen) => {
        try {
          const response = await fetch(screen.url);
          const blob = await response.blob();
          const filename = `${screen.label.replace(/\s+/g, '-').toLowerCase()}.png`;
          folder?.file(filename, blob);
        } catch (err) {
          console.warn(`Failed to fetch ${screen.url}`, err);
        }
      });

      await Promise.all(promises);
      
      const content = await zip.generateAsync({ type: 'blob' });
      const zipName = `${bank.name.toLowerCase().replace(/\s+/g, '-')}-ui-kit.zip`;
      downloadBlob(content, zipName);

    } catch (error) {
      console.error('Batch download failed:', error);
      alert('Failed to create zip file.');
    } finally {
      setIsDownloadingAll(false);
    }
  };

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="py-8 border-b border-border">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link 
              to="/apps" 
              className="w-10 h-10 flex items-center justify-center rounded-full border border-border hover:bg-zinc-800 transition-colors text-zinc-400 hover:text-white"
            >
              <ArrowLeft size={20} />
            </Link>
            <div className="flex items-center gap-3">
              <img src={bank.logoUrl} alt={bank.name} className="w-10 h-10 rounded-lg bg-zinc-900 object-cover" />
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-xl font-bold text-white">{bank.name}</h1>
                  {bank.figmaUrl && (
                    <a
                      href={bank.figmaUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 hover:border-zinc-600 transition-all group overflow-visible"
                    >
                      <FigmaLogo className="w-4 h-4" />
                      <span className="text-xs font-semibold text-zinc-400 group-hover:text-white uppercase tracking-wide">Figma</span>
                      
                       {/* Hyper Tooltip */}
                       <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 bg-zinc-950/90 backdrop-blur-md border border-white/10 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none transform translate-y-1 group-hover:translate-y-0 z-20 whitespace-nowrap">
                          <span className="text-[10px] font-medium text-white">View on Figma</span>
                          <div className="w-2 h-2 bg-zinc-950/90 border-r border-b border-white/10 transform rotate-45 absolute left-1/2 -translate-x-1/2 -bottom-1"></div>
                       </div>
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-500 mt-1">
                  <span>{screenshots.length} Screens</span>
                  
                  {screenshots.length > 0 && (
                    <>
                      <span>&bull;</span>
                      <button 
                        onClick={handleDownloadAll}
                        disabled={isDownloadingAll}
                        className="flex items-center gap-1 text-zinc-300 hover:text-white hover:underline disabled:opacity-50 disabled:no-underline disabled:cursor-not-allowed transition-colors"
                      >
                        {isDownloadingAll ? (
                          <Loader2 size={10} className="animate-spin" />
                        ) : (
                          <DownloadCloud size={12} />
                        )}
                        {isDownloadingAll ? 'Zipping...' : 'Download All'}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery - No Filters */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-8">
        {screenshots.length > 0 ? (
          screenshots.map(screen => (
            <div key={screen.id} className="group flex flex-col gap-3">
              <button 
                onClick={() => setSelectedScreen(screen)}
                className="relative aspect-[9/19] w-full rounded-2xl overflow-hidden border border-border bg-zinc-900 cursor-pointer outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-offset-2 focus:ring-offset-zinc-950"
              >
                <img 
                  src={screen.url} 
                  alt={screen.label} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                   <div className="p-3 bg-zinc-900/80 rounded-full text-white shadow-xl transform scale-90 group-hover:scale-100 transition-all duration-300">
                     <ZoomIn size={20} />
                   </div>
                </div>
              </button>
              <div className="text-center">
                <h3 className="text-sm font-medium text-zinc-300">{screen.label}</h3>
                <p className="text-[10px] text-zinc-500 uppercase tracking-wider mt-0.5">{screen.category}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center text-zinc-500">
            No screenshots available for this bank.
          </div>
        )}
      </div>

      {/* Lightbox / Big Picture View */}
      {selectedScreen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedScreen(null)}
        >
          {/* Navigation Buttons */}
          <button 
            onClick={(e) => { e.stopPropagation(); navigateLightbox('prev'); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-zinc-400 hover:text-white bg-zinc-800/50 hover:bg-zinc-800 rounded-full transition-colors z-50 hidden md:block"
          >
            <ChevronLeft size={32} />
          </button>

          <button 
            onClick={(e) => { e.stopPropagation(); navigateLightbox('next'); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-zinc-400 hover:text-white bg-zinc-800/50 hover:bg-zinc-800 rounded-full transition-colors z-50 hidden md:block"
          >
            <ChevronRight size={32} />
          </button>

          {/* Close Button */}
          <button 
            onClick={(e) => { e.stopPropagation(); setSelectedScreen(null); }}
            className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white bg-zinc-800/50 hover:bg-zinc-800 rounded-full transition-colors z-50"
          >
            <X size={24} />
          </button>

          {/* Main Content */}
          <div 
            className="relative w-full h-full flex items-center justify-center p-4"
            // REMOVED stopPropagation here to allow click to pass to parent backdrop
          >
            <div 
              className="relative flex flex-col items-center gap-4 max-h-full"
              onClick={(e) => e.stopPropagation()} // Keep this so clicking image/controls doesn't close
            >
               <img 
                src={selectedScreen.url} 
                alt={selectedScreen.label} 
                className="max-h-[85vh] w-auto object-contain rounded-lg shadow-2xl ring-1 ring-white/10"
              />
              
              <div className="flex items-center gap-4 bg-zinc-900/80 px-6 py-3 rounded-full backdrop-blur-md border border-white/10">
                <div className="text-center">
                  <h3 className="text-sm font-medium text-white">{selectedScreen.label}</h3>
                </div>
                
                <div className="h-4 w-px bg-zinc-700"></div>

                <button 
                  onClick={() => handleDownloadSingle(selectedScreen)}
                  disabled={isDownloadingSingle}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white text-black text-xs font-bold rounded-full hover:bg-zinc-200 transition-colors disabled:opacity-50"
                >
                  {isDownloadingSingle ? <Loader2 size={12} className="animate-spin" /> : <Download size={12} />}
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
