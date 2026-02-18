
import { Bank, PaymentMethod, Screenshot } from './types';

export const SOCIAL_LINKS = {
  github: "https://github.com",
  figma: "https://figma.com",
  email: "mailto:hello@khaznaui.com"
};

export const CONTRIBUTORS = [
  { name: "Ahmed Ali", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Ahmed" },
  { name: "Sara Smith", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Sara" },
  { name: "Omar Khaleel", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Omar" },
  { name: "Huda Ben", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Huda" },
  { name: "Karim Zayd", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Karim" },
];

export const BANKS: Bank[] = [
  {
    id: 'nuran-bank',
    name: 'Nuran Bank',
    logoUrl: 'https://picsum.photos/seed/nuran/200',
    colors: ['#1E3A8A', '#3B82F6'],
    hasScreenshots: true,
    isUpdated: true,
    type: 'bank',
    figmaUrl: 'https://figma.com/file/nuran'
  },
  {
    id: 'wahda-bank',
    name: 'Wahda Bank',
    logoUrl: 'https://picsum.photos/seed/wahda/200',
    colors: ['#047857', '#10B981'],
    hasScreenshots: true,
    type: 'bank',
    figmaUrl: 'https://figma.com/file/wahda'
  },
  {
    id: 'jumhouria-bank',
    name: 'Jumhouria Bank',
    logoUrl: 'https://picsum.photos/seed/jumhouria/200',
    colors: ['#B91C1C', '#EF4444'],
    hasScreenshots: false,
    type: 'bank'
  },
  {
    id: 'sahara-bank',
    name: 'Sahara Bank',
    logoUrl: 'https://picsum.photos/seed/sahara/200',
    colors: ['#D97706', '#F59E0B'],
    hasScreenshots: true,
    isNew: true,
    type: 'bank',
    figmaUrl: 'https://figma.com/file/sahara'
  },
  {
    id: 'aman-bank',
    name: 'Aman Bank',
    logoUrl: 'https://picsum.photos/seed/aman/200',
    colors: ['#4338CA', '#6366F1'],
    hasScreenshots: true,
    type: 'bank'
  },
  {
    id: 'yaqeen-bank',
    name: 'Yaqeen Bank',
    logoUrl: 'https://picsum.photos/seed/yaqeen/200',
    colors: ['#0F172A', '#334155'],
    hasScreenshots: false,
    type: 'bank'
  },
  {
    id: 'north-africa-bank',
    name: 'North Africa Bank',
    logoUrl: 'https://picsum.photos/seed/nab/200',
    colors: ['#15803D', '#22C55E'],
    hasScreenshots: true,
    type: 'bank'
  },
  {
    id: 'commerce-dev-bank',
    name: 'Commerce & Dev Bank',
    logoUrl: 'https://picsum.photos/seed/cdb/200',
    colors: ['#BE185D', '#EC4899'],
    hasScreenshots: false,
    type: 'bank'
  }
];

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'sadad',
    name: 'Sadad',
    logoUrl: 'https://picsum.photos/seed/sadad/200',
    colors: ['#E11D48'],
    type: 'payment_method',
    figmaUrl: 'https://figma.com/file/sadad'
  },
  {
    id: 'moamalat',
    name: 'Moamalat',
    logoUrl: 'https://picsum.photos/seed/moamalat/200',
    colors: ['#0891B2'],
    isUpdated: true,
    type: 'payment_method'
  },
  {
    id: 'edfea',
    name: 'Edfea',
    logoUrl: 'https://picsum.photos/seed/edfea/200',
    colors: ['#7C3AED'],
    type: 'payment_method'
  },
  {
    id: 'tadavul',
    name: 'Tadavul',
    logoUrl: 'https://picsum.photos/seed/tadavul/200',
    colors: ['#EA580C'],
    type: 'payment_method'
  },
  {
    id: 'visa',
    name: 'Visa',
    logoUrl: 'https://picsum.photos/seed/visa/200',
    colors: ['#1A365D'],
    type: 'payment_method',
    figmaUrl: 'https://figma.com/file/visa'
  },
  {
    id: 'mastercard',
    name: 'Mastercard',
    logoUrl: 'https://picsum.photos/seed/mastercard/200',
    colors: ['#EB001B', '#F79E1B'],
    type: 'payment_method'
  }
];

export const MOCK_SCREENSHOTS: Record<string, Screenshot[]> = {
  'nuran-bank': [
    { id: '1', url: 'https://picsum.photos/seed/nuran1/400/800', label: 'Splash Screen', category: 'onboarding' },
    { id: '2', url: 'https://picsum.photos/seed/nuran2/400/800', label: 'Login', category: 'auth' },
    { id: '3', url: 'https://picsum.photos/seed/nuran3/400/800', label: 'Home Dashboard', category: 'dashboard' },
    { id: '4', url: 'https://picsum.photos/seed/nuran4/400/800', label: 'Transfer', category: 'transaction' },
    { id: '5', url: 'https://picsum.photos/seed/nuran5/400/800', label: 'Settings', category: 'settings' },
  ],
  'wahda-bank': [
    { id: '1', url: 'https://picsum.photos/seed/wahda1/400/800', label: 'Login', category: 'auth' },
    { id: '2', url: 'https://picsum.photos/seed/wahda2/400/800', label: 'Accounts', category: 'dashboard' },
  ],
  'sahara-bank': [
    { id: '1', url: 'https://picsum.photos/seed/sahara1/400/800', label: 'Welcome', category: 'onboarding' },
    { id: '2', url: 'https://picsum.photos/seed/sahara2/400/800', label: 'Card Details', category: 'dashboard' },
    { id: '3', url: 'https://picsum.photos/seed/sahara3/400/800', label: 'Profile', category: 'settings' },
  ]
};
