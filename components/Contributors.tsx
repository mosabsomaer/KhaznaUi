
import type { JSX } from 'react';
import { useEffect, useState } from 'react';
import { CONTRIBUTORS, SOCIAL_LINKS } from '../constants';
import { ArrowUpRight, Bookmark, FolderInput, Command, Keyboard } from 'lucide-react';

export function Contributors(): JSX.Element {
  const [shortcut, setShortcut] = useState({ key: 'CTRL', symbol: 'D' });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isMac = userAgent.includes('mac');
    const isIOS = /iphone|ipad|ipod/.test(userAgent);
    const isAndroid = userAgent.includes('android');

    if (isMac) {
      setShortcut({ key: 'CMD', symbol: 'D' });
    }

    if (isIOS || isAndroid) {
      setIsMobile(true);
    }
  }, []);

  return (
    <section className="py-24 border-t border-border/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-950/50 pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Community Contributors */}
        <div className="flex flex-col items-center justify-center mb-16">
          <p className="text-zinc-500 text-sm font-medium mb-6 uppercase tracking-wider">Community Contributors</p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {CONTRIBUTORS.map((c, i) => (
              <div key={i} className="group/avatar relative">
                <div className="w-10 h-10 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 transition-all duration-300 group-hover/avatar:scale-110 group-hover/avatar:border-zinc-500 cursor-default">
                  <img src={c.avatar} alt={c.name} className="w-full h-full object-cover grayscale group-hover/avatar:grayscale-0 transition-all" />
                </div>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-zinc-800 text-white text-[10px] rounded opacity-0 group-hover/avatar:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-zinc-700">
                  {c.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bookmark Card */}
          <div className="relative bg-zinc-900/40 border border-zinc-800/60 rounded-3xl p-8 md:p-10 overflow-hidden">
            <div className="relative z-10 flex flex-col h-full items-start">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center mb-6 shadow-lg shadow-amber-900/20">
                <Bookmark size={24} />
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">Don't lose this</h3>
              <p className="text-zinc-400 leading-relaxed mb-8 max-w-md">
                This might be the last time we meet. Save the website and bookmark it now to ensure you always have access to these assets.
              </p>

              <div className="mt-auto flex items-center gap-3">
                {!isMobile ? (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-500">
                    {shortcut.key === 'CMD' ? <Command size={12} className="mr-1"/> : <Keyboard size={12} className="mr-1"/>}
                    <span className="bg-zinc-800 px-1.5 rounded text-zinc-300 border border-zinc-700 min-w-[30px] text-center">
                      {shortcut.key}
                    </span>
                    <span>+</span>
                    <span className="bg-zinc-800 px-1.5 rounded text-zinc-300 border border-zinc-700 min-w-[20px] text-center">
                      {shortcut.symbol}
                    </span>
                  </div>
                ) : (
                  <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-zinc-500">
                    Tap share icon to bookmark
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Contribute Card */}
          <div className="relative bg-zinc-900/40 border border-zinc-800/60 rounded-3xl p-8 md:p-10 overflow-hidden">
            <div className="relative z-10 flex flex-col h-full items-start">
              <div className="w-12 h-12 rounded-2xl bg-zinc-800 border border-zinc-700 text-white flex items-center justify-center mb-6 shadow-lg shadow-black/20">
                <FolderInput size={24} />
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">Missing something?</h3>
              <p className="text-zinc-400 leading-relaxed mb-8 max-w-md">
                Notice a missing bank or outdated logo? Become a contributor and add it to the collection.
              </p>

              <a
                href={SOCIAL_LINKS.email}
                className="mt-auto inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-zinc-200 text-black rounded-full text-sm font-bold transition-colors"
              >
                Become a contributor
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
