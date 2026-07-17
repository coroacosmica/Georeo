import { motion } from "framer-motion";
import { ShieldAlert, CheckCircle, Clock, Wrench } from "lucide-react";
import { useTranslation } from '../lib/i18n/translations';

export default function FeaturesStrip() {
  const { t } = useTranslation();
  
  return (
    <section id="features" className="py-20 bg-safety-dark border-t border-safety-gray/30">
      <div className="container mx-auto px-6">
        <h2 className="text-center font-safetyDisplay text-4xl text-white uppercase mb-12">{t('features.title')}</h2>
        <div className="grid md:grid-cols-4 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center group"
          >
            <div className="w-16 h-16 mx-auto bg-safety-panel border border-safety-gray rounded-xl flex items-center justify-center mb-6 group-hover:border-safety-orange transition-colors">
              <ShieldAlert className="w-8 h-8 text-safety-orange" />
            </div>
            <h3 className="font-safetyMono text-lg text-white mb-2 uppercase">{t('features.f1')}</h3>
            <p className="text-safety-light/70 font-safetySans text-sm">{t('features.f1d')}</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center group"
          >
            <div className="w-16 h-16 mx-auto bg-safety-panel border border-safety-gray rounded-xl flex items-center justify-center mb-6 group-hover:border-safety-orange transition-colors">
              <CheckCircle className="w-8 h-8 text-safety-orange" />
            </div>
            <h3 className="font-safetyMono text-lg text-white mb-2 uppercase">{t('features.f2')}</h3>
            <p className="text-safety-light/70 font-safetySans text-sm">{t('features.f2d')}</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center group"
          >
            <div className="w-16 h-16 mx-auto bg-safety-panel border border-safety-gray rounded-xl flex items-center justify-center mb-6 group-hover:border-safety-orange transition-colors">
              <Clock className="w-8 h-8 text-safety-orange" />
            </div>
            <h3 className="font-safetyMono text-lg text-white mb-2 uppercase">{t('features.f3')}</h3>
            <p className="text-safety-light/70 font-safetySans text-sm">{t('features.f3d')}</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center group"
          >
            <div className="w-16 h-16 mx-auto bg-safety-panel border border-safety-gray rounded-xl flex items-center justify-center mb-6 group-hover:border-safety-orange transition-colors">
              <Wrench className="w-8 h-8 text-safety-orange" />
            </div>
            <h3 className="font-safetyMono text-lg text-white mb-2 uppercase">{t('features.f4')}</h3>
            <p className="text-safety-light/70 font-safetySans text-sm">{t('features.f4d')}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
