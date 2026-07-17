import { motion } from "framer-motion";

export default function HazardDivider() {
  return (
    <div className="w-full h-4 overflow-hidden border-y border-black">
      <motion.div
        animate={{ x: ["-50%", "0%"] }}
        transition={{ 
          repeat: Infinity, 
          ease: "linear", 
          duration: 4 
        }}
        className="w-[200%] h-full"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg, #F4A225 0, #F4A225 20px, #0A0C0F 20px, #0A0C0F 40px)",
        }}
      />
    </div>
  );
}
