import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from './useCartStore';
import { ALL_LABELS } from '../data/labels';
import { CATALOG_PRODUCTS } from '../data/pdf_catalog';
import { supabase } from '../lib/supabase';

export interface OrderCustomer {
  fullName: string;
  company: string;
  phone: string;
  country: string;
  email: string;
  address: string;
  uploadedDesign?: string;
  uploadedLogo?: string;
}

export interface AdminOrder {
  id: string;
  customer: OrderCustomer;
  items: CartItem[];
  totalPrice: number;
  status: 'Pending' | 'Confirmed' | 'Shipped' | 'Cancelled';
  date: string;
}

export interface AdminProduct {
  id: string;
  name: string;
  price: number;
  url: string;
  type?: string;
  fileType?: 'image' | '3d';
  category?: string;
  description?: string;
}

export interface AdminSettings {
  storeName: string;
  contactEmail: string;
  whatsappNumber: string;
  enableWhatsapp: boolean;
  maintenanceMode: boolean;
}

interface AdminStore {
  orders: AdminOrder[];
  fetchOrders: () => Promise<void>;
  addOrder: (order: Omit<AdminOrder, 'id' | 'status' | 'date'>) => void;
  updateOrderStatus: (id: string, status: AdminOrder['status']) => void;
  deleteOrder: (id: string) => void;
  
  products: AdminProduct[];
  fetchProducts: () => Promise<void>;
  addProduct: (product: Omit<AdminProduct, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<AdminProduct>) => void;
  deleteProduct: (id: string) => void;
  
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  
  settings: AdminSettings;
  updateSettings: (newSettings: Partial<AdminSettings>) => void;
}

// Initial combined products from labels and new catalog
const INITIAL_PRODUCTS = [
  ...CATALOG_PRODUCTS,
  ...ALL_LABELS.map(label => ({
    id: `std-${label.id}`,
    name: label.name,
    price: 50,
    url: label.url,
    type: 'label',
    category: 'Safety Labels'
  }))
];

export const useAdminStore = create<AdminStore>()(
  persist(
    (set) => ({
      orders: [],

      fetchOrders: async () => {
        if (supabase) {
          try {
            const { data, error } = await supabase.from('orders').select('*').order('date', { ascending: false });
            if (!error) {
              set({ orders: data || [] });
            }
          } catch (e) {
            console.error('Failed to fetch orders from Supabase', e);
          }
        }
      },

      addOrder: async (orderData) => {
        const newId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
        const date = new Date().toISOString();
        const newOrder: AdminOrder = {
          ...orderData,
          id: newId,
          status: 'Pending',
          date
        };

        if (supabase) {
          try {
            await supabase.from('orders').insert([newOrder]);
          } catch (e) {
            console.error('Supabase error', e);
          }
        }

        set((state) => ({ orders: [newOrder, ...state.orders] }));
      },

      updateOrderStatus: async (id, status) => {
        if (supabase) {
          try {
            await supabase.from('orders').update({ status }).eq('id', id);
          } catch (e) {
            console.error('Supabase error', e);
          }
        }
        set((state) => ({
          orders: state.orders.map(order => 
            order.id === id ? { ...order, status } : order
          )
        }));
      },

      deleteOrder: async (id) => {
        if (supabase) {
          try {
            await supabase.from('orders').delete().eq('id', id);
          } catch (e) {
            console.error('Supabase error', e);
          }
        }
        set((state) => ({
          orders: state.orders.filter(order => order.id !== id)
        }));
      },

      products: INITIAL_PRODUCTS,

      fetchProducts: async () => {
        if (supabase) {
          try {
            const { data, error } = await supabase.from('products').select('*');
            if (!error) {
              set({ products: data && data.length > 0 ? data : INITIAL_PRODUCTS });
            }
          } catch (e) {
            console.error('Failed to fetch products from Supabase', e);
          }
        }
      },
      
      addProduct: async (product) => {
        const newProduct = {
          ...product,
          id: `PROD-${Date.now()}`
        };

        if (supabase) {
          try {
            await supabase.from('products').insert([newProduct]);
          } catch (e) {
            console.error('Supabase error', e);
          }
        }

        set((state) => ({ products: [newProduct, ...state.products] }));
      },

      updateProduct: async (id, updates) => {
        if (supabase) {
          try {
            await supabase.from('products').update(updates).eq('id', id);
          } catch (e) {
            console.error('Supabase error', e);
          }
        }
        set((state) => ({
          products: state.products.map(p => 
            p.id === id ? { ...p, ...updates } : p
          )
        }));
      },

      deleteProduct: async (id) => {
        if (supabase) {
          try {
            await supabase.from('products').delete().eq('id', id);
          } catch (e) {
            console.error('Supabase error', e);
          }
        }
        set((state) => ({
          products: state.products.filter(p => p.id !== id)
        }));
      },

      isAuthenticated: false,
      login: (password) => {
        if (password === 'georeo2026') {
          set({ isAuthenticated: true });
          return true;
        }
        return false;
      },
      logout: () => set({ isAuthenticated: false }),

      settings: {
        storeName: 'Georeo Safety',
        contactEmail: 'sales@georeo.com',
        whatsappNumber: '+20 100 000 0000',
        enableWhatsapp: true,
        maintenanceMode: false,
      },
      updateSettings: (newSettings) => set((state) => ({
        settings: { ...state.settings, ...newSettings }
      })),

    }),
    {
      name: 'georeo-admin-storage',
      version: 4,
      migrate: (persistedState: any, version: number) => {
        if (version < 4) {
          // Version 4 introduces individual extracted catalog products and overrides the product list.
          persistedState.products = INITIAL_PRODUCTS;
        }
        return persistedState;
      }
    }
  )
);
