
import type { JSX } from 'react';
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Contributors } from './components/Contributors';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { useUIContext } from './hooks/useUIContext';
import { AppDetailPage } from './pages/AppDetailPage';
import { AppsPage } from './pages/AppsPage';
import { HomePage } from './pages/HomePage';
import { SelectedItem, UIContextType } from './types';

export const UIContext = createContext<UIContextType | null>(null);

function Layout({ children }: { children: React.ReactNode }): JSX.Element {
  const { isSidebarOpen, closeSidebar } = useUIContext();
  const location = useLocation();

  useEffect(() => {
    closeSidebar();
  }, [location.pathname, closeSidebar]);

  return (
    <div className="min-h-screen bg-background text-zinc-100 flex flex-col">
      <Navbar />
      <div className={`relative transition-all duration-300 flex-1 flex flex-col ${isSidebarOpen ? 'md:mr-[400px]' : ''}`}>
        <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1">
          {children}
        </main>
        <Contributors />
      </div>
      <Sidebar />
    </div>
  );
}

function ScrollToTop(): null {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App(): JSX.Element {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItemState] = useState<SelectedItem>(null);

  const isSidebarOpen = !!selectedItem;

  const setSelectedItem = useCallback((item: SelectedItem) => {
    setSelectedItemState(item);
  }, []);

  const closeSidebar = useCallback(() => {
    setSelectedItemState(null);
  }, []);

  const contextValue = useMemo<UIContextType>(() => ({
    searchQuery,
    setSearchQuery,
    selectedItem,
    setSelectedItem,
    isSidebarOpen,
    closeSidebar,
  }), [searchQuery, selectedItem, isSidebarOpen, setSelectedItem, closeSidebar]);

  return (
    <UIContext.Provider value={contextValue}>
      <MemoryRouter>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/apps" element={<AppsPage />} />
            <Route path="/apps/:bankId" element={<AppDetailPage />} />
          </Routes>
        </Layout>
      </MemoryRouter>
    </UIContext.Provider>
  );
}

export default App;
