import { motion } from "framer-motion";

export default function GeoreoVideo() {
  return (
    <section className="bg-transparent py-20 relative overflow-hidden border-t border-safety-gray/30">
      {/* Background industrial grid pattern */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #3A3D42 1px, transparent 1px), linear-gradient(to bottom, #3A3D42 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-8"
        >
          <div className="relative w-full max-w-5xl bg-safety-panel rounded-2xl border border-safety-red/30 shadow-[0_0_30px_rgba(255,90,0,0.15)] overflow-hidden group">
            <video 
              src="/Georeo.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
            />
            {/* Hexagon tech overlay accents */}
            <div className="absolute top-4 left-4 font-safetyMono text-[10px] text-safety-red tracking-widest pointer-events-none bg-black/50 px-2 py-1 rounded">
              SYS_ID: 948.GEO_VID
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
