import { motion } from "framer-motion";
import { ShieldAlert, Globe2, Clock, CheckSquare } from "lucide-react";

const FEATURES = [
  {
    icon: ShieldAlert,
    title: "Weatherproof Build",
    desc: "UV-resistant inks and durable PVC/acrylic withstand extreme heat, rain, and dust."
  },
  {
    icon: Globe2,
    title: "Bilingual Layout",
    desc: "Clear English and Arabic formatting ensures critical information is understood by all."
  },
  {
    icon: Clock,
    title: "Fast Turnaround",
    desc: "Rapid production cycle to get your site compliant without delaying operations."
  },
  {
    icon: CheckSquare,
    title: "Standards-Aligned",
    desc: "Designs conform to local and international occupational health and safety regulations."
  }
];

export default function FeaturesStrip() {
  return (
    <section id="specs" className="py-20 bg-safety-panel border-y border-safety-gray/30">
      <div className="container mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-safety-gray/50">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className={`flex flex-col items-center text-center px-4 ${i !== 0 ? 'pt-8 sm:pt-0' : ''}`}
              >
                <div className="w-16 h-16 rounded-full bg-safety-dark border border-safety-gray flex items-center justify-center mb-6 text-safety-orange group-hover:bg-safety-orange transition-colors">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="font-safetyDisplay text-2xl uppercase text-white mb-3">{feature.title}</h3>
                <p className="font-safetySans text-safety-light/70 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
