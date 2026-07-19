import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { useAdminStore } from '../store/useAdminStore';
import { useState } from 'react';
import { useTranslation } from '../lib/i18n/translations';

export default function CheckoutModal() {
  const { getTotalPrice, items, clearCart, isCheckoutOpen, toggleCheckout } = useCartStore();
  const { addOrder } = useAdminStore();
  const { t, language } = useTranslation();
  const [isSuccess, setIsSuccess] = useState(false);
  const [uploadedDesign, setUploadedDesign] = useState<string | undefined>();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedDesign(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const customer = {
      fullName: formData.get('fullName') as string,
      company: formData.get('company') as string,
      phone: formData.get('phone') as string,
      country: formData.get('country') as string,
      email: formData.get('email') as string,
      address: formData.get('address') as string,
      uploadedDesign
    };

    addOrder({
      customer,
      items: [...items],
      totalPrice: getTotalPrice(),
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      clearCart();
      setUploadedDesign(undefined);
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
            className="relative w-full max-w-xl bg-safety-dark border border-safety-orange/30 rounded-2xl shadow-2xl overflow-hidden p-8"
          >
            {isSuccess ? (
              <div className="py-12 flex flex-col items-center text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5, duration: 0.6 }}
                >
                  <CheckCircle className="w-24 h-24 text-green-500 mb-6" />
                </motion.div>
                <h2 className="font-safetyDisplay text-3xl text-white uppercase mb-2">{t('checkout.success')}</h2>
                <p className="font-safetySans text-safety-light/70">
                  {t('checkout.successDesc')}
                </p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-safetyDisplay text-3xl uppercase text-white">{t('checkout.title')}</h2>
                  <button onClick={toggleCheckout} className="text-safety-light/70 hover:text-white transition-colors cursor-pointer p-2 hover:bg-white/5 rounded-full">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <p className="text-safety-light/70 font-safetySans mb-8">
                  {t('checkout.desc')}
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-xs font-safetyMono text-safety-light/70 uppercase tracking-wider">{t('checkout.fullName')}</label>
                      <input required name="fullName" type="text" className="w-full bg-black border border-safety-gray/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-safety-orange transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-safetyMono text-safety-light/70 uppercase tracking-wider">{t('checkout.company')}</label>
                      <input required name="company" type="text" className="w-full bg-black border border-safety-gray/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-safety-orange transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-safetyMono text-safety-light/70 uppercase tracking-wider">{t('checkout.phone')}</label>
                      <input required name="phone" type="tel" className="w-full bg-black border border-safety-gray/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-safety-orange transition-colors text-left" dir="ltr" />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-safetyMono text-safety-light/70 uppercase tracking-wider">{t('checkout.email')}</label>
                      <input required name="email" type="email" className="w-full bg-black border border-safety-gray/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-safety-orange transition-colors text-left" dir="ltr" />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-safetyMono text-safety-light/70 uppercase tracking-wider">{t('checkout.country')}</label>
                      <input required name="country" type="text" className="w-full bg-black border border-safety-gray/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-safety-orange transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-safetyMono text-safety-light/70 uppercase tracking-wider">{t('checkout.address')}</label>
                      <input required name="address" type="text" className="w-full bg-black border border-safety-gray/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-safety-orange transition-colors" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-safetyMono text-safety-light/70 uppercase tracking-wider">Upload Design (Optional)</label>
                    <input type="file" accept="image/*,.pdf,.doc,.docx" onChange={handleFileUpload} className="w-full bg-black border border-safety-gray/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-safety-orange transition-colors cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-safety-orange file:text-safety-dark hover:file:bg-yellow-500" />
                    {uploadedDesign && <p className="text-xs text-green-500 mt-2 font-safetyMono">✓ File attached successfully</p>}
                  </div>

                  <div className={`flex justify-end gap-4 mt-8 pt-6 border-t border-safety-gray/30 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <button type="button" onClick={toggleCheckout} className="px-6 py-3 border border-safety-gray text-white font-bold uppercase tracking-widest text-sm rounded hover:bg-white/5 transition-colors cursor-pointer">
                      {t('checkout.cancel')}
                    </button>
                    <button 
                      type="submit" 
                      className="px-8 py-3 bg-safety-orange text-safety-dark font-bold uppercase tracking-widest text-sm rounded hover:bg-yellow-500 transition-colors cursor-pointer"
                    >
                      {t('checkout.submit')}
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
