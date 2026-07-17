import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from './useCartStore';

export interface OrderCustomer {
  fullName: string;
  company: string;
  phone: string;
  country: string;
  email: string;
  address: string;
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
}

interface AdminStore {
  orders: AdminOrder[];
  addOrder: (order: Omit<AdminOrder, 'id' | 'status' | 'date'>) => void;
  updateOrderStatus: (id: string, status: AdminOrder['status']) => void;
  deleteOrder: (id: string) => void;
  
  products: AdminProduct[];
  addProduct: (product: Omit<AdminProduct, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<AdminProduct>) => void;
  deleteProduct: (id: string) => void;
}

export const useAdminStore = create<AdminStore>()(
  persist(
    (set) => ({
      orders: [],

      addOrder: (orderData) => set((state) => {
        // Generate a random ID like ORD-1234
        const newId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
        const date = new Date().toLocaleString();

        const newOrder: AdminOrder = {
          ...orderData,
          id: newId,
          status: 'Pending',
          date
        };

        return { orders: [newOrder, ...state.orders] };
      }),

      updateOrderStatus: (id, status) => set((state) => ({
        orders: state.orders.map(order => 
          order.id === id ? { ...order, status } : order
        )
      })),

      deleteOrder: (id) => set((state) => ({
        orders: state.orders.filter(order => order.id !== id)
      })),

      products: [],
      
      addProduct: (product) => set((state) => {
        const newProduct = {
          ...product,
          id: `PROD-${Date.now()}`
        };
        return { products: [newProduct, ...state.products] };
      }),

      updateProduct: (id, updates) => set((state) => ({
        products: state.products.map(p => 
          p.id === id ? { ...p, ...updates } : p
        )
      })),

      deleteProduct: (id) => set((state) => ({
        products: state.products.filter(p => p.id !== id)
      })),

    }),
    {
      name: 'georeo-admin-storage', // key in local storage
    }
  )
);
