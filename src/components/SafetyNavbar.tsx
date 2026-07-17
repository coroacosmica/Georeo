import { motion } from "framer-motion";

import { useCartStore } from '../store/useCartStore';
import { ShoppingCart } from 'lucide-react';

export default function SafetyNavbar() {
  const { toggleCart, items } = useCartStore();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6"
    >
      <a href="/" className="flex items-center group">
        <div className="relative h-20 w-72 transition-transform duration-300 group-hover:scale-105">
          <img src="/images/Georeo-bk.png" alt="Georeo Logo" className="w-full h-full object-contain object-left" />
        </div>
      </a>
      
      <div className="flex items-center gap-8">
        <nav className="hidden md:flex items-center gap-6 font-safetyMono text-sm text-safety-light/70">
          <a href="/#products" className="hover:text-safety-orange transition-colors">Products</a>
          <a href="/#features" className="hover:text-safety-orange transition-colors">Features</a>
        </nav>

        <div className="flex items-center gap-6">
          <button 
            onClick={toggleCart}
            className="relative text-white hover:text-safety-orange transition-colors cursor-pointer"
          >
            <ShoppingCart className="w-6 h-6" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-safety-orange text-safety-dark text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
          <button 
            onClick={toggleCart}
            className="hidden sm:block px-6 py-2.5 bg-safety-orange hover:bg-orange-600 text-white font-bold tracking-wide text-sm uppercase rounded-md transition-colors duration-300 cursor-pointer"
          >
            Request a Quote
          </button>
        </div>
      </div>
    </motion.header>
  );
}
