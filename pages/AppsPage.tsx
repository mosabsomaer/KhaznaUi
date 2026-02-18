import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BANKS, MOCK_SCREENSHOTS } from '../constants';
import { UIContext } from '../App';
import { UIContextType } from '../types';
import { Badge } from '../components/Badge';

// Internal AppCard component to handle Carousel state independently
const AppCard = ({ app }: { app: typeof BANKS[0] }) => {
  const screenshots = MOCK_SCREENSHOTS[app.id] || [];
  const screenCount = screenshots.length;
  const hasScreens = screenshots.length > 0;
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % screenshots.length);
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation
    e.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  return (
    <Link 
      to={`/apps/${app.id}`} 
      className="group flex flex-col gap-3"
    >
      {/* Card Preview Container - Vertical Aspect Ratio */}
      <div className="relative aspect-[9/19] w-full bg-zinc-900 border border-border rounded-3xl overflow-hidden group-hover:border-zinc-600 transition-all duration-300 shadow-sm hover:shadow-md">
         
         {/* Carousel Content */}
         {hasScreens ? (
             <div className="w-full h-full relative bg-zinc-900">
                 {/* Images */}
                 {screenshots.map((screen, index) => (
                   <div 
                    key={screen.id}
                    className={`absolute inset-0 transition-opacity duration-300 ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                   >
                     <img 
                      src={screen.url} 
                      alt={`${app.name} Screen ${index + 1}`} 
                      className="w-full h-full object-cover"
                     />
                     {/* Gradient overlay for text readability at bottom if needed, though mostly clean looks better */}
                   </div>
                 ))}

                 {/* Navigation Arrows (Show on Hover) */}
                 {screenCount > 1 && (
                   <>
                     <button 
                       onClick={prevSlide}
                       className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70 backdrop-blur-sm"
                     >
                       <ChevronLeft size={16} />
                     </button>
                     <button 
                       onClick={nextSlide}
                       className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70 backdrop-blur-sm"
                     >
                       <ChevronRight size={16} />
                     </button>
                     
                     {/* Dots Indicator */}
                     <div className="absolute bottom-3 left-0 right-0 z-20 flex justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                       {screenshots.slice(0, 5).map((_, idx) => (
                         <div 
                           key={idx} 
                           className={`w-1.5 h-1.5 rounded-full shadow-sm ${idx === currentSlide ? 'bg-white' : 'bg-white/40'}`}
                         />
                       ))}
                       {screenshots.length > 5 && <div className="w-1.5 h-1.5 rounded-full bg-white/40" />}
                     </div>
                   </>
                 )}
             </div>
         ) : (
             <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900 p-6 text-center">
                 <img src={app.logoUrl} className="w-16 h-16 rounded-xl opacity-20 grayscale mb-4" alt="" />
                 <span className="text-xs text-zinc-600">No screenshots available</span>
             </div>
         )}

         {/* Badges */}
         <div className="absolute top-3 left-3 z-30">
          {app.isUpdated && <Badge type="updated" />}
         </div>
      </div>

      {/* Meta Info */}
      <div className="flex items-center gap-3 px-1">
         <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-border overflow-hidden flex-shrink-0 p-0.5">
            <img src={app.logoUrl} alt={app.name} className="w-full h-full object-contain rounded-lg" />
         </div>
         <div className="flex flex-col">
           <h3 className="text-sm font-semibold text-zinc-100 leading-tight group-hover:underline decoration-zinc-600 underline-offset-4">{app.name}</h3>
           <span className="text-xs text-zinc-500 mt-0.5">{screenCount} Screens</span>
         </div>
      </div>
    </Link>
  );
};

export const AppsPage: React.FC = () => {
  const { searchQuery } = useContext(UIContext) as UIContextType;

  // Filter only banks that have screenshots
  const apps = BANKS.filter(bank => 
    bank.hasScreenshots && 
    bank.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pb-20">
      <div className="py-12 border-b border-border/50">
        <h1 className="text-3xl font-bold text-white mb-2">App UI Gallery</h1>
        <p className="text-zinc-400 max-w-2xl">
          Explore user interface patterns from real Libyan banking applications. 
          Curated screenshots for research and inspiration.
        </p>
      </div>

      <section className="py-10">
        {apps.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-8 gap-y-12">
            {apps.map(app => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        ) : (
           <div className="py-20 text-center">
             <p className="text-zinc-500">No apps found matching your search.</p>
           </div>
        )}
      </section>
    </div>
  );
};