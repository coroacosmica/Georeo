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
    <section id="process" className="py-20 bg-safety-dark border-y border-safety-gray/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-safetyDisplay text-4xl md:text-5xl text-white uppercase"
          >
            {t('process.title')}
          </motion.h2>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-safety-gray/50">
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
                <div className="w-16 h-16 rounded-full bg-safety-panel border border-safety-gray/50 flex items-center justify-center mb-6 text-safety-orange transition-colors group-hover:bg-safety-orange group-hover:text-safety-dark shadow-[0_0_15px_rgba(0,0,0,0.3)]">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="font-safetyDisplay text-2xl uppercase text-white mb-3">{step.title}</h3>
                <p className="font-safetySans text-safety-light/70 text-sm leading-relaxed max-w-[200px]">
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
