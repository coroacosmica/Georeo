import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { useAdminStore } from '../store/useAdminStore';
import { useState } from 'react';

export default function CheckoutModal() {
  const { isCheckoutOpen, toggleCheckout, clearCart, getTotalPrice, items } = useCartStore();
  const { addOrder } = useAdminStore();
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Extract form data
    const formData = new FormData(e.currentTarget);
    const customer = {
      fullName: formData.get('fullName') as string,
      company: formData.get('company') as string,
      phone: formData.get('phone') as string,
      country: formData.get('country') as string,
      email: formData.get('email') as string,
      address: formData.get('address') as string,
    };

    // Add to real-time admin store
    addOrder({
      customer,
      items: [...items],
      totalPrice: getTotalPrice(),
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      clearCart();
      toggleCheckout();
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={!isSuccess ? toggleCheckout : undefined}
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-xl bg-safety-dark border border-safety-orange/30 rounded-2xl shadow-2xl overflow-hidden"
          >
            {isSuccess ? (
              <div className="p-12 flex flex-col items-center text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5, duration: 0.6 }}
                >
                  <CheckCircle className="w-24 h-24 text-green-500 mb-6" />
                </motion.div>
                <h2 className="font-safetyDisplay text-3xl text-white uppercase mb-2">Order Received!</h2>
                <p className="font-safetySans text-safety-light/70">
                  Our engineering team has received your request and will contact you shortly with the finalized specs and delivery timeline.
                </p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center p-6 border-b border-safety-gray/50 bg-safety-panel">
                  <div>
                    <h2 className="font-safetyDisplay text-2xl text-white uppercase">Checkout</h2>
                    <p className="font-safetyMono text-xs text-safety-orange mt-1">Total: ${getTotalPrice().toFixed(2)}</p>
                  </div>
                  <button onClick={toggleCheckout} className="text-safety-light/60 hover:text-white cursor-pointer">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block font-safetyMono text-xs text-safety-light/70 uppercase mb-2">Full Name</label>
                      <input name="fullName" required type="text" className="w-full bg-black border border-safety-gray/50 rounded px-4 py-3 text-white focus:outline-none focus:border-safety-orange transition-colors" placeholder="John Doe" />
                    </div>
                    <div>
                      <label className="block font-safetyMono text-xs text-safety-light/70 uppercase mb-2">Company</label>
                      <input name="company" required type="text" className="w-full bg-black border border-safety-gray/50 rounded px-4 py-3 text-white focus:outline-none focus:border-safety-orange transition-colors" placeholder="Acme Corp" />
                    </div>
                    <div>
                      <label className="block font-safetyMono text-xs text-safety-light/70 uppercase mb-2">Phone Number</label>
                      <input name="phone" required type="tel" className="w-full bg-black border border-safety-gray/50 rounded px-4 py-3 text-white focus:outline-none focus:border-safety-orange transition-colors" placeholder="+20 123..." />
                    </div>
                    <div>
                      <label className="block font-safetyMono text-xs text-safety-light/70 uppercase mb-2">Country</label>
                      <input name="country" required type="text" className="w-full bg-black border border-safety-gray/50 rounded px-4 py-3 text-white focus:outline-none focus:border-safety-orange transition-colors" placeholder="Egypt" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block font-safetyMono text-xs text-safety-light/70 uppercase mb-2">Email Address</label>
                      <input name="email" required type="email" className="w-full bg-black border border-safety-gray/50 rounded px-4 py-3 text-white focus:outline-none focus:border-safety-orange transition-colors" placeholder="john@company.com" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block font-safetyMono text-xs text-safety-light/70 uppercase mb-2">Shipping Address</label>
                      <textarea name="address" required rows={3} className="w-full bg-black border border-safety-gray/50 rounded px-4 py-3 text-white focus:outline-none focus:border-safety-orange transition-colors resize-none" placeholder="123 Industrial Way..." />
                    </div>
                  </div>

                  <button type="submit" className="w-full py-4 bg-safety-orange text-safety-dark font-bold hover:bg-yellow-500 transition-colors uppercase tracking-widest text-sm rounded shadow-lg cursor-pointer">
                    Submit Quote Request
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
