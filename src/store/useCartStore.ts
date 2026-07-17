import { create } from 'zustand';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  type: '3D_BOARD' | 'STANDARD_LABEL';
  customLabel?: string; // For customized 3D boards
  customNote?: string; // For protocol hazmat notes
  size?: string;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  isCheckoutOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  toggleCheckout: () => void;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,
  isCheckoutOpen: false,
  
  addItem: (newItem) => set((state) => {
    const existingItem = state.items.find(item => item.id === newItem.id);
    if (existingItem) {
      return {
        items: state.items.map(item =>
          item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      };
    }
    return { items: [...state.items, { ...newItem, quantity: 1 }] };
  }),
  
  removeItem: (id) => set((state) => ({
    items: state.items.filter(item => item.id !== id)
  })),
  
  updateQuantity: (id, quantity) => set((state) => ({
    items: state.items.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
    )
  })),
  
  clearCart: () => set({ items: [] }),
  
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  
  toggleCheckout: () => set((state) => ({ isCheckoutOpen: !state.isCheckoutOpen, isOpen: false })),
  
  getTotalPrice: () => {
    const state = get();
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}));
