import { motion } from "framer-motion";
import { ShieldAlert, CheckCircle, Clock, Wrench } from "lucide-react";
import { useTranslation } from '../lib/i18n/translations';

export default function FeaturesStrip() {
  const { t } = useTranslation();
  
  return (
    <section id="features" className="py-20 bg-transparent border-t border-safety-red/30 relative overflow-hidden scanline">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,0,51,0.05)_0%,_transparent_60%)] pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-center font-safetyDisplay text-4xl text-white uppercase mb-12 drop-shadow-[0_0_10px_rgba(255,0,51,0.5)] fade-in">{t('features.title')}</h2>
        
        {/* Connecting Line (Circuit Board effect) */}
        <div className="hidden md:block absolute top-[50%] left-0 w-full h-px bg-gradient-to-r from-transparent via-safety-red/50 to-transparent shadow-[0_0_10px_rgba(255,0,51,0.5)] z-0" />

        <div className="grid md:grid-cols-4 gap-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center group relative"
          >
            <div className="w-16 h-16 mx-auto bg-black border-2 border-safety-red/20 rounded flex items-center justify-center mb-6 group-hover:border-safety-red group-hover:shadow-[0_0_20px_rgba(255,0,51,0.6)] transition-all duration-300 relative z-10 overflow-hidden">
              <div className="absolute inset-0 scanline opacity-30" />
              <ShieldAlert className="w-8 h-8 text-safety-red relative z-10 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="font-safetyMono text-lg text-white mb-2 uppercase group-hover:text-safety-red transition-colors">{t('features.f1')}</h3>
            <p className="text-safety-light/50 font-safetySans text-sm">{t('features.f1d')}</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center group relative"
          >
            <div className="w-16 h-16 mx-auto bg-black border-2 border-safety-red/20 rounded flex items-center justify-center mb-6 group-hover:border-safety-red group-hover:shadow-[0_0_20px_rgba(255,0,51,0.6)] transition-all duration-300 relative z-10 overflow-hidden">
              <div className="absolute inset-0 scanline opacity-30" />
              <CheckCircle className="w-8 h-8 text-safety-red relative z-10 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="font-safetyMono text-lg text-white mb-2 uppercase group-hover:text-safety-red transition-colors">{t('features.f2')}</h3>
            <p className="text-safety-light/50 font-safetySans text-sm">{t('features.f2d')}</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center group relative"
          >
            <div className="w-16 h-16 mx-auto bg-black border-2 border-safety-red/20 rounded flex items-center justify-center mb-6 group-hover:border-safety-red group-hover:shadow-[0_0_20px_rgba(255,0,51,0.6)] transition-all duration-300 relative z-10 overflow-hidden">
              <div className="absolute inset-0 scanline opacity-30" />
              <Clock className="w-8 h-8 text-safety-red relative z-10 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="font-safetyMono text-lg text-white mb-2 uppercase group-hover:text-safety-red transition-colors">{t('features.f3')}</h3>
            <p className="text-safety-light/50 font-safetySans text-sm">{t('features.f3d')}</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center group relative"
          >
            <div className="w-16 h-16 mx-auto bg-black border-2 border-safety-red/20 rounded flex items-center justify-center mb-6 group-hover:border-safety-red group-hover:shadow-[0_0_20px_rgba(255,0,51,0.6)] transition-all duration-300 relative z-10 overflow-hidden">
              <div className="absolute inset-0 scanline opacity-30" />
              <Wrench className="w-8 h-8 text-safety-red relative z-10 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="font-safetyMono text-lg text-white mb-2 uppercase group-hover:text-safety-red transition-colors">{t('features.f4')}</h3>
            <p className="text-safety-light/50 font-safetySans text-sm">{t('features.f4d')}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
