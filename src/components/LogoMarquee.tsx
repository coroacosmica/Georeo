import { motion } from "framer-motion";

const PARTNER_LOGOS = [
  "/Labels/058afb5d75e0cfec62897356f682c6ad.jpg",
  "/Labels/76b1e83e069042275cb3c1952340c76f.jpg",
  "/Labels/8dd1d15aa03576ffc94a60667bb278e6.jpg",
  "/Labels/0ada0ed45a79275d2c1572aed780e3fd.jpg",
  "/Labels/1553eee8887b0e396ee0b658dd6f129f.jpg",
  "/Labels/273a62a3218df9eb131d6575c85fa65c.jpg",
  "/Labels/fcbcc7970f857b8639cc375bf9aeb82b.jpg",
  "/Labels/7ca63295819e925ff866d912cdc666fb.jpg"
];

import { useTranslation } from '../lib/i18n/translations';

// Duplicate the array to create a seamless infinite scroll effect
const SCROLLING_LOGOS = [...PARTNER_LOGOS, ...PARTNER_LOGOS];

export default function LogoMarquee() {
  const { t } = useTranslation();
  return (
    <section className="py-12 bg-safety-panel relative overflow-hidden border-b border-safety-red/20 scanline">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,0,51,0.05)_0%,_transparent_70%)] pointer-events-none" />
      
      <div className="container mx-auto px-6 mb-8 text-center relative z-10">
        <p className="font-safetyMono text-safety-red text-xs md:text-sm tracking-widest uppercase fade-in-subtitle" style={{ textShadow: '0 0 10px rgba(255,0,51,0.5)' }}>
          [ {t('logos.trusted')} ]
        </p>
      </div>
      
      <div className="relative w-full overflow-hidden flex whitespace-nowrap z-10">
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-safety-panel to-transparent z-10 pointer-events-none" />
        
        <motion.div
          animate={{ x: [0, -1920] }} 
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 30,
          }}
          className="flex items-center gap-16 md:gap-24 px-8 min-w-max"
        >
          {SCROLLING_LOGOS.map((logo, index) => (
            <div 
              key={index} 
              className="w-32 md:w-48 h-20 md:h-24 relative opacity-40 hover:opacity-100 transition-all duration-300 flex items-center justify-center bg-black/40 border border-safety-red/10 rounded-sm p-2 hover:border-safety-red/50 hover:shadow-[0_0_15px_rgba(255,0,51,0.2)]"
            >
              <img
                src={logo}
                alt="Partner Logo"
                className="w-full h-full object-contain mix-blend-screen filter sepia hue-rotate-[320deg] saturate-[3] hover:saturate-[5] transition-all"
              />
            </div>
          ))}
        </motion.div>

        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-safety-panel to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
}
