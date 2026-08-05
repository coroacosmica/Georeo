import { motion } from "framer-motion";

export default function HazardDivider() {
  return (
    <div className="w-full h-1 md:h-2 overflow-hidden bg-black shadow-[0_0_15px_rgba(255,0,51,0.8)] relative z-20">
      <motion.div
        animate={{ x: ["-50%", "0%"] }}
        transition={{ 
          repeat: Infinity, 
          ease: "linear", 
          duration: 2 
        }}
        className="w-[200%] h-full opacity-80"
        style={{
          backgroundImage: "repeating-linear-gradient(90deg, #FF0033 0, #FF0033 50px, transparent 50px, transparent 100px)",
        }}
      />
    </div>
  );
}
