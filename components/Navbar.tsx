import type { JSX } from 'react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, LayoutGrid, Smartphone, Menu, X, Github, Figma, Mail } from 'lucide-react';
import { useUIContext } from '../hooks/useUIContext';
import { SOCIAL_LINKS } from '../constants';

export function Navbar(): JSX.Element {
  const { searchQuery, setSearchQuery } = useUIContext();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isAppsPage = location.pathname.includes('/apps');
  const isHomePage = location.pathname === '/';
  const searchPlaceholder = isAppsPage ? 'Search apps...' : 'Search logos...';

  function handleMobileNav(): void {
    setIsMobileMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-[1600px] mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 gap-4">

        {/* Left: Brand & Desktop Nav */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-white z-50">
            Khazna UI
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <Link
              to="/"
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${!isAppsPage ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'}`}
            >
              <LayoutGrid size={16} />
              Logos
            </Link>
            <Link
              to="/apps"
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isAppsPage ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'}`}
            >
              <Smartphone size={16} />
              Apps
            </Link>
          </nav>
        </div>

        {/* Center: Search (Desktop) - hidden on homepage */}
        {!isHomePage && (
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 h-4 w-4" />
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 rounded-lg bg-zinc-900 border border-border pl-10 pr-4 text-sm text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-700 transition-all"
              />
            </div>
          </div>
        )}

        {/* Right: Actions (Desktop) */}
        <div className="hidden md:flex items-center gap-2">
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noreferrer"
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-colors"
            title="GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href={SOCIAL_LINKS.figma}
            target="_blank"
            rel="noreferrer"
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-colors"
            title="Figma Community"
          >
            <Figma size={20} />
          </a>
          <div className="w-px h-4 bg-zinc-800 mx-1" />
          <a
            href={SOCIAL_LINKS.email}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 text-sm font-semibold rounded-full transition-colors"
          >
            <Mail size={16} />
            <span className="hidden lg:inline">Contribute</span>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 -mr-2 text-zinc-400 hover:text-white rounded-md"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background absolute left-0 right-0 top-16 h-[calc(100vh-4rem)] overflow-y-auto px-4 py-6 flex flex-col gap-6 animate-in slide-in-from-top-4 fade-in duration-200 shadow-2xl">

          {/* Mobile Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 h-4 w-4" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 rounded-lg bg-zinc-900 border border-border pl-10 pr-4 text-base text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-700 transition-all"
            />
          </div>

          {/* Mobile Nav Links */}
          <nav className="flex flex-col gap-2">
            <Link
              to="/"
              onClick={handleMobileNav}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors ${!isAppsPage ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'}`}
            >
              <LayoutGrid size={20} />
              Logos
            </Link>
            <Link
              to="/apps"
              onClick={handleMobileNav}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors ${isAppsPage ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'}`}
            >
              <Smartphone size={20} />
              Apps
            </Link>
          </nav>

          <hr className="border-zinc-800" />

          {/* Mobile Socials & Contribute */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between px-2">
              <span className="text-sm font-medium text-zinc-500">Community</span>
              <div className="flex items-center gap-2">
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-zinc-900 text-zinc-400 hover:text-white rounded-lg border border-border"
                >
                  <Github size={20} />
                </a>
                <a
                  href={SOCIAL_LINKS.figma}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-zinc-900 text-zinc-400 hover:text-white rounded-lg border border-border"
                >
                  <Figma size={20} />
                </a>
              </div>
            </div>

            <a
              href={SOCIAL_LINKS.email}
              className="flex items-center justify-center gap-2 w-full px-4 py-4 bg-zinc-100 active:bg-zinc-200 text-zinc-900 text-base font-bold rounded-xl transition-colors mt-2"
            >
              <Mail size={18} />
              Contribute
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
