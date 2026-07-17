import { motion } from "framer-motion";
import { useTranslation } from '../lib/i18n/translations';

export default function SafetyHero() {
  const { t } = useTranslation();
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-36 md:pt-24 lg:pt-20 overflow-hidden bg-safety-dark">
      {/* Background industrial grid pattern */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #3A3D42 1px, transparent 1px), linear-gradient(to bottom, #3A3D42 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Radial gradient to highlight center */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-safety-dark/80 to-safety-dark pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          <div className="inline-block px-4 py-1.5 border border-safety-orange/30 bg-safety-orange/10 rounded-full w-max">
            <span className="font-safetyMono text-safety-orange text-xs tracking-widest uppercase">
              {t('hero.badge')}
            </span>
          </div>
          <h1 className="font-safetyDisplay text-6xl md:text-8xl lg:text-9xl text-white uppercase leading-[0.85] tracking-tight">
            {t('hero.title1')} <span className="text-safety-orange">{t('hero.title2')}</span><br />
            {t('hero.title3')}
          </h1>
          <p className="text-safety-light/80 text-lg md:text-xl max-w-lg mt-4 font-safetySans font-light">
            {t('hero.desc')}
          </p>
          <div className="flex gap-4 mt-8">
            <button 
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-white text-safety-dark font-bold hover:bg-gray-200 transition-colors uppercase tracking-wider text-sm cursor-pointer"
            >
              {t('hero.cta1')}
            </button>
            <button 
              onClick={() => document.getElementById('specs')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-transparent border border-safety-gray text-white hover:border-safety-orange transition-colors uppercase tracking-wider text-sm cursor-pointer"
            >
              {t('hero.cta2')}
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="relative h-[500px] lg:h-[700px] w-full flex items-center justify-center"
        >
          {/* Main Hero Image */}
          <div className="relative w-full h-full max-w-2xl bg-safety-panel rounded-xl border border-safety-gray/50 shadow-2xl shadow-black/50 overflow-hidden group">
            <iframe 
              src="/models/site_safety_board_3d_with_upload.html"
              title="Site Safety Board"
              className="w-full h-full border-0 opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-opacity duration-1000 ease-in-out"
              style={{ backgroundColor: 'transparent' }}
            />
            {/* Hexagon tech overlay accents */}
            <div className="absolute top-4 left-4 font-safetyMono text-[10px] text-safety-orange tracking-widest">
              SYS_ID: 948.GEO
            </div>
            <div className="absolute bottom-4 right-4 flex gap-1">
              {[1,2,3].map(i => (
                <div key={i} className="w-2 h-2 bg-safety-orange/50 rounded-full" />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
