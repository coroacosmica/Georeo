import { motion } from "framer-motion";
import { BookOpen, MessageCircle, CheckCircle2, Package } from 'lucide-react';
import { useTranslation } from '../lib/i18n/translations';

export default function ProcessSteps() {
  const { t } = useTranslation();
  
  const STEPS = [
    { 
      id: 1,
      title: t('process.s1'), 
      desc: t('process.s1d'),
      icon: BookOpen
    },
    { 
      id: 2,
      title: t('process.s2'), 
      desc: t('process.s2d'),
      icon: MessageCircle
    },
    { 
      id: 3,
      title: t('process.s3'), 
      desc: t('process.s3d'),
      icon: CheckCircle2
    },
    { 
      id: 4,
      title: t('process.s4'), 
      desc: t('process.s4d'),
      icon: Package
    }
  ];

  return (
    <section id="process" className="py-20 bg-transparent border-y border-safety-red/30 relative overflow-hidden scanline">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(255,0,51,0.05)_0%,_transparent_70%)] pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-safetyDisplay text-4xl md:text-5xl text-white uppercase drop-shadow-[0_0_10px_rgba(255,0,51,0.5)] fade-in"
          >
            {t('process.title')}
          </motion.h2>
        </div>
        
        {/* Connecting Data Line */}
        <div className="hidden lg:block absolute top-[60%] left-0 w-full h-px bg-safety-red/30 shadow-[0_0_10px_rgba(255,0,51,0.5)] z-0" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-safety-red/20 relative z-10">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className={`flex flex-col items-center text-center px-4 group ${i !== 0 ? 'pt-8 sm:pt-0' : ''}`}
              >
                <div className="w-16 h-16 rounded-sm bg-black border border-safety-red/30 flex items-center justify-center mb-6 text-safety-red transition-all duration-300 group-hover:bg-safety-red group-hover:text-black group-hover:shadow-[0_0_20px_rgba(255,0,51,0.8)] group-hover:scale-110 relative overflow-hidden">
                  <div className="absolute inset-0 scanline opacity-30 mix-blend-overlay pointer-events-none" />
                  <Icon className="w-8 h-8 relative z-10" />
                </div>
                <h3 className="font-safetyDisplay text-2xl uppercase text-white mb-3 group-hover:text-safety-red transition-colors">{step.title}</h3>
                <p className="font-safetySans text-safety-light/60 text-sm leading-relaxed max-w-[200px]">
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
