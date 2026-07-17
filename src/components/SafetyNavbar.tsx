import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Menu, X, Globe } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { useTranslation } from '../lib/i18n/translations';
import { useLanguageStore } from '../store/useLanguageStore';

export default function SafetyNavbar() {
  const { toggleCart, items } = useCartStore();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const toggleLanguage = useLanguageStore((state) => state.toggleLanguage);

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
      
      <div className="flex items-center gap-4 md:gap-8">
        <nav className="hidden md:flex items-center gap-6 font-safetyMono text-sm text-safety-light/70 rtl:space-x-reverse">
          <a href="/#products" className="hover:text-safety-orange transition-colors">{t('nav.products')}</a>
          <a href="/#features" className="hover:text-safety-orange transition-colors">{t('nav.services')}</a>
        </nav>

        <div className="flex items-center gap-4 md:gap-6">
          <button 
            onClick={toggleLanguage}
            className="hidden sm:flex items-center gap-2 font-safetyMono text-sm text-safety-light/70 hover:text-safety-orange transition-colors cursor-pointer"
          >
            <Globe className="w-4 h-4" />
            {t('nav.language')}
          </button>
          
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
            {t('nav.getQuote')}
          </button>
          
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white hover:text-safety-orange transition-colors cursor-pointer">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-safety-panel border-t border-safety-gray md:hidden">
          <div className="px-4 py-4 space-y-4 flex flex-col">
            <a href="/#products" className="font-safetyMono font-bold text-white hover:text-safety-orange block px-3 py-2 uppercase">{t('nav.products')}</a>
            <a href="/#features" className="font-safetyMono font-bold text-white hover:text-safety-orange block px-3 py-2 uppercase">{t('nav.services')}</a>
            <button onClick={toggleLanguage} className="font-safetyMono font-bold text-white hover:text-safety-orange flex items-center gap-2 px-3 py-2 uppercase w-full cursor-pointer text-left">
              <Globe className="w-4 h-4" /> {t('nav.language')}
            </button>
            <button onClick={toggleCart} className="w-full mt-4 bg-safety-orange text-white font-safetyDisplay font-bold px-6 py-3 uppercase tracking-widest cursor-pointer rounded">
              {t('nav.getQuote')}
            </button>
          </div>
        </div>
      )}
    </motion.header>
  );
}
