
import React, { useState, createContext, useMemo, useCallback, useEffect } from 'react';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { HomePage } from './pages/HomePage';
import { AppsPage } from './pages/AppsPage';
import { AppDetailPage } from './pages/AppDetailPage';
import { Contributors } from './components/Contributors';
import { UIContextType, SelectedItem } from './types';

// Context definition
export const UIContext = createContext<UIContextType | null>(null);

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isSidebarOpen, closeSidebar } = React.useContext(UIContext) as UIContextType;
  const location = useLocation();

  // Close sidebar automatically when route changes
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
};

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItemState] = useState<SelectedItem>(null);
  
  // Sidebar logic derived from selection
  const isSidebarOpen = !!selectedItem;

  const setSelectedItem = useCallback((item: SelectedItem) => {
    setSelectedItemState(item);
  }, []);

  const closeSidebar = useCallback(() => {
    setSelectedItemState(null);
  }, []);

  const toggleSidebar = useCallback(() => {
    setSelectedItemState(current => current ? null : current);
  }, []);

  const contextValue = useMemo(() => ({
    searchQuery,
    setSearchQuery,
    selectedItem,
    setSelectedItem,
    isSidebarOpen,
    toggleSidebar,
    closeSidebar
  }), [searchQuery, selectedItem, isSidebarOpen, setSelectedItem, toggleSidebar, closeSidebar]);

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
};

export default App;
