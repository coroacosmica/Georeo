import { useState } from "react";
import { Menu, X, Globe, Search, User, ShoppingBag } from 'lucide-react';
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
    <header className="bg-white text-gray-900 border-b border-gray-100 sticky top-0 z-50 font-publicSans">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="flex items-center justify-between h-28">
          {/* Logo Section */}
          <div className="flex items-center">
            <a href="/" id="nav-logo-link" className="flex items-center pr-12">
              <img src="/images/Georeo-bk.png" alt="GEOREO SAFETY" className="h-20 w-auto object-contain" />
            </a>
            {/* Navigation Menu */}
            <nav className="hidden lg:flex items-center space-x-10 text-sm font-bold tracking-wider font-archivo rtl:space-x-reverse uppercase">
              <a href="/" id="nav-home" className="hover:text-[#FF8C00] transition-colors">{t('nav.home') || 'HOME'}</a>
              <a href="/#products" id="nav-shop" className="text-[#FF8C00] transition-colors">{t('nav.products') || 'SHOP'}</a>
              <a href="/#features" id="nav-services" className="hover:text-[#FF8C00] transition-colors">{t('nav.services') || 'SERVICES'}</a>
            </nav>
          </div>

          {/* Right Search/Icons */}
          <div className="flex items-center space-x-8 rtl:space-x-reverse">
            <div className="hidden md:flex relative">
              <input type="text" placeholder="What you looking for?" className="bg-gray-50 border border-gray-200 text-sm py-3 px-5 pr-12 w-72 focus:ring-1 focus:ring-[#FF8C00] focus:border-[#FF8C00] outline-none rounded-sm transition-all" />
              <Search className="absolute right-4 top-3.5 text-gray-400 w-5 h-5" />
            </div>
            <div className="flex items-center space-x-5 text-2xl text-gray-700 rtl:space-x-reverse">
              <button onClick={toggleLanguage} className="hover:text-[#FF8C00] transition-colors cursor-pointer flex items-center justify-center">
                <Globe className="w-6 h-6" />
              </button>
              <a href="#" id="user-account" className="hover:text-[#FF8C00] transition-colors"><User className="w-6 h-6" /></a>
              <button 
                onClick={toggleCart} 
                id="user-cart" 
                className="hover:text-[#FF8C00] transition-colors relative cursor-pointer"
              >
                <ShoppingBag className="w-6 h-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#FF8C00] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>
              <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-gray-700 hover:text-[#FF8C00] transition-colors cursor-pointer">
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-t border-gray-100 lg:hidden shadow-lg font-archivo">
          <div className="px-6 py-4 space-y-4 flex flex-col text-gray-900 font-bold uppercase tracking-wider text-sm">
            <a href="/" className="hover:text-[#FF8C00] block py-2">{t('nav.home') || 'HOME'}</a>
            <a href="/#products" className="hover:text-[#FF8C00] block py-2">{t('nav.products') || 'SHOP'}</a>
            <a href="/#features" className="hover:text-[#FF8C00] block py-2">{t('nav.services') || 'SERVICES'}</a>
            <div className="relative mt-4 font-publicSans">
              <input type="text" placeholder="What you looking for?" className="bg-gray-50 border border-gray-200 text-sm py-3 px-5 pr-12 w-full focus:ring-1 focus:ring-[#FF8C00] focus:border-[#FF8C00] outline-none rounded-sm transition-all" />
              <Search className="absolute right-4 top-3.5 text-gray-400 w-5 h-5" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
