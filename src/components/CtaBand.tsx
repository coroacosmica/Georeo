import { motion } from "framer-motion";
import { useTranslation } from '../lib/i18n/translations';
import { MetalButton } from './ui/button';

export default function CtaBand() {
  const { t } = useTranslation();
  return (
    <section className="relative py-24 bg-black border-y border-safety-red/40 overflow-hidden scanline">
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none mix-blend-screen"
        style={{
          backgroundImage: "repeating-linear-gradient(90deg, #FF0033 0, #FF0033 2px, transparent 2px, transparent 100px)",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,0,51,0.15)_0%,_transparent_70%)] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto border-2 border-safety-red/30 p-12 bg-safety-dark/80 backdrop-blur-md relative"
        >
          {/* HUD Accents */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-safety-red" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-safety-red" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-safety-red" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-safety-red" />
          
          <p className="font-safetyMono text-safety-red text-sm tracking-widest uppercase mb-4 animate-pulse">
            [ SYSTEM_READY_FOR_INPUT ]
          </p>

          <h2 className="font-safetyDisplay text-5xl md:text-6xl text-white uppercase mb-6 leading-tight whitespace-pre-line drop-shadow-[0_0_10px_rgba(255,0,51,0.5)]">
            {t('cta.title')}
          </h2>
          <p className="font-safetyMono text-safety-light/60 text-sm md:text-base font-medium mb-10 max-w-xl mx-auto">
            {t('cta.desc')}
          </p>
          <MetalButton 
            variant="error"
            onClick={() => window.location.href = "mailto:sales@georeo.com"}
          >
            {t('cta.btn')}
          </MetalButton>
        </motion.div>
      </div>
    </section>
  );
}
