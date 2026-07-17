import { motion } from "framer-motion";
import { useTranslation } from '../lib/i18n/translations';

export default function CtaBand() {
  const { t } = useTranslation();
  return (
    <section className="relative py-24 bg-safety-orange overflow-hidden">
      {/* Hazard stripe background texture */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg, transparent 0, transparent 20px, #000 20px, #000 40px)",
        }}
      />
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="font-safetyDisplay text-5xl md:text-7xl text-safety-dark uppercase mb-6 leading-tight whitespace-pre-line">
            {t('cta.title')}
          </h2>
          <p className="font-safetySans text-safety-dark/80 text-lg md:text-xl font-medium mb-10 max-w-xl mx-auto">
            {t('cta.desc')}
          </p>
          <a href="mailto:sales@georeo.com" className="inline-block px-10 py-5 bg-safety-dark text-white font-bold hover:bg-black transition-colors uppercase tracking-widest text-sm shadow-xl shadow-safety-dark/20 hover:scale-105 transform duration-300">
            {t('cta.btn')}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
