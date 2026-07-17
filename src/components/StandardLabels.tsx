import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useCartStore } from '../store/useCartStore';
import { useAdminStore } from '../store/useAdminStore';
import { toast } from "sonner";

export default function StandardLabels() {
  const { addItem } = useCartStore();
  const { products, fetchProducts } = useAdminStore();
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    fetchProducts();
  }, []);

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
    <section className="py-24 bg-safety-dark border-t border-safety-gray/30">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="font-safetyDisplay text-4xl md:text-5xl text-white uppercase">Standard <span className="text-safety-orange">Labels</span></h2>
          <p className="text-safety-light/70 font-safetySans mt-4 max-w-2xl mx-auto">
            High-contrast, durable adhesive labels for quick compliance and safety marking across your facility.
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
              className="bg-safety-panel border border-safety-gray rounded-xl overflow-hidden group flex flex-col"
            >
              <div className="aspect-square p-6 flex items-center justify-center bg-white/5 relative">
                <img 
                  src={label.url} 
                  alt={label.name}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                  <div className="text-white font-safetyMono font-bold text-lg">{label.price} EGP</div>
                  <div className="text-[9px] text-center px-4 text-safety-light/70 mb-2 leading-tight">Order confirmation via WhatsApp required</div>
                  <button 
                    onClick={() => handleAddToCart(label)}
                    className="px-6 py-2 bg-safety-orange text-safety-dark font-bold text-sm uppercase rounded shadow-lg hover:bg-yellow-500 transition-colors cursor-pointer"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
              <div className="p-4 border-t border-safety-gray/50 mt-auto">
                <h3 className="font-safetyDisplay text-sm text-white uppercase text-center truncate" title={label.name}>{label.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        {visibleCount < products.length && (
          <div className="mt-12 text-center">
            <button 
              onClick={handleLoadMore}
              className="px-8 py-3 border-2 border-safety-orange text-safety-orange font-bold uppercase tracking-widest text-sm rounded hover:bg-safety-orange hover:text-safety-dark transition-colors cursor-pointer"
            >
              Load More ({products.length - visibleCount} remaining)
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
