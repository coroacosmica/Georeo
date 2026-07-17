import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

export default function CartDrawer() {
  const { items, isOpen, toggleCart, updateQuantity, removeItem, getTotalPrice, toggleCheckout } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
          />
          
          {/* Drawer */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-safety-dark border-l border-safety-gray z-[70] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-safety-gray/50">
              <div className="flex items-center gap-3">
                <ShoppingCart className="text-safety-orange w-6 h-6" />
                <h2 className="font-safetyDisplay text-2xl text-white uppercase">Your Cart</h2>
              </div>
              <button onClick={toggleCart} className="text-safety-light/60 hover:text-white transition-colors cursor-pointer">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center opacity-50">
                  <ShoppingCart className="w-16 h-16 mb-4 text-safety-light/20" />
                  <p className="font-safetySans text-safety-light">Your cart is empty.</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 bg-safety-panel border border-safety-gray/30 p-4 rounded-xl">
                    <div className="w-20 h-20 bg-black rounded border border-safety-gray/50 flex items-center justify-center p-2 flex-shrink-0 relative overflow-hidden">
                      {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-contain relative z-10" />}
                    </div>
                    
                    <div className="flex flex-col flex-1">
                      <h3 className="font-safetyDisplay text-lg text-white leading-tight mb-1">{item.name}</h3>
                      {item.size && <p className="font-safetyMono text-xs text-safety-orange mb-2">Size: {item.size}</p>}
                      <div className="font-safetyMono text-sm text-safety-light/70 mb-auto">
                        ${item.price.toFixed(2)}
                      </div>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-3 bg-safety-dark border border-safety-gray rounded px-2 py-1">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-safety-light hover:text-safety-orange cursor-pointer">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-safetyMono text-sm text-white min-w-[20px] text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-safety-light hover:text-safety-orange cursor-pointer">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-400 p-1 cursor-pointer">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-safety-gray/50 bg-safety-panel">
                <div className="flex justify-between items-center mb-6">
                  <span className="font-safetySans text-safety-light">Total Estimated Cost</span>
                  <span className="font-safetyMono text-2xl text-safety-orange">${getTotalPrice().toFixed(2)}</span>
                </div>
                <button 
                  onClick={toggleCheckout}
                  className="w-full py-4 bg-safety-orange text-safety-dark font-bold hover:bg-yellow-500 transition-colors uppercase tracking-widest text-sm rounded shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
