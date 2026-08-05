import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useCartStore } from '../store/useCartStore';
import { useAdminStore } from '../store/useAdminStore';
import { toast } from "sonner";
import { useTranslation } from '../lib/i18n/translations';
import { MetalButton } from './ui/button';

export default function StandardLabels() {
  const { t } = useTranslation();
  const { addItem } = useCartStore();
  const { products, fetchProducts } = useAdminStore();
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleAddToCart = (label: any) => {
    addItem({
      id: `std-${label.id}-${Date.now()}`,
      name: label.name,
      price: label.price,
      quantity: 1,
      type: 'STANDARD_LABEL',
      image: label.url
    });
    toast.success(`${label.name} added to your cart!`);
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 12, products.length));
  };

  const visibleLabels = products.slice(0, visibleCount);

  return (
    <section className="py-24 bg-transparent border-t border-safety-red/30 relative overflow-hidden scanline">
      <div className="absolute inset-0 bg-black/50 pointer-events-none z-0" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="font-safetyDisplay text-4xl md:text-5xl text-white uppercase">{t('labels.title1')} <span className="text-safety-red">{t('labels.title2')}</span></h2>
          <p className="text-safety-light/70 font-safetySans mt-4 max-w-2xl mx-auto">
            {t('labels.desc')}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {visibleLabels.map((label, i) => (
            <motion.div
              key={`${label.id}-${i}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-safety-panel/60 backdrop-blur-sm border border-safety-red/20 rounded-xl overflow-hidden group flex flex-col shadow-[0_0_15px_rgba(255,0,51,0.1)] hover:shadow-[0_0_30px_rgba(255,0,51,0.3)] hover:border-safety-red/60 transition-all duration-300 relative"
            >
              <div className="absolute inset-0 scanline pointer-events-none opacity-20 mix-blend-overlay z-0" />
              <div className="aspect-square p-6 flex items-center justify-center bg-black/40 relative z-10">
                {label.fileType === '3d' ? (
                  <iframe 
                    src={label.url} 
                    className="w-full h-full border-0 pointer-events-none group-hover:scale-110 transition-transform duration-500" 
                  />
                ) : (
                  <img 
                    src={label.url} 
                    alt={label.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                )}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                  <div className="text-[9px] text-center px-4 text-safety-light/70 mb-2 leading-tight">{t('labels.orderConfirm')}</div>
                  <MetalButton 
                    variant="primary"
                    onClick={() => handleAddToCart(label)}
                  >
                    {t('labels.addToCart')}
                  </MetalButton>
                </div>
              </div>
              <div className="p-3 border-t border-safety-red/20 mt-auto flex flex-col items-center justify-between gap-2 h-full bg-safety-panel/80 backdrop-blur-md z-10">
                <h3 className="font-safetyDisplay text-xs text-white uppercase text-center line-clamp-2 w-full" title={label.name}>{label.name === "Abstract Pattern" ? "Safety Label" : label.name}</h3>
                <div className="text-safety-red font-safetyMono font-bold text-sm bg-black/50 px-3 py-1 rounded w-full text-center border border-safety-gray/30">
                  {label.price} {t('common.egp')}
                </div>
                <div className="md:hidden mt-1 w-full flex justify-center">
                  <MetalButton 
                    variant="primary"
                    onClick={() => handleAddToCart(label)}
                  >
                    {t('labels.addToCart')}
                  </MetalButton>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {visibleCount < products.length && (
          <div className="mt-12 text-center">
            <MetalButton 
              variant="default"
              onClick={handleLoadMore}
            >
              {t('labels.loadMore')} ({products.length - visibleCount} {t('labels.remaining')})
            </MetalButton>
          </div>
        )}
      </div>
    </section>
  );
}
