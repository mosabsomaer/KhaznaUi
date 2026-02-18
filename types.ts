
export type ItemType = 'bank' | 'payment_method';

export interface Bank {
  id: string;
  name: string;
  logoUrl: string; // Using placeholder URLs for demo
  colors: string[];
  hasScreenshots: boolean;
  isNew?: boolean;
  isUpdated?: boolean;
  website?: string;
  figmaUrl?: string;
  type: 'bank';
}

export interface PaymentMethod {
  id: string;
  name: string;
  logoUrl: string;
  colors: string[];
  isNew?: boolean;
  isUpdated?: boolean;
  figmaUrl?: string;
  type: 'payment_method';
}

export interface Screenshot {
  id: string;
  url: string;
  label: string;
  category: 'onboarding' | 'dashboard' | 'transaction' | 'settings' | 'auth';
}

export type SelectedItem = Bank | PaymentMethod | null;

export interface UIContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedItem: SelectedItem;
  setSelectedItem: (item: SelectedItem) => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
}
