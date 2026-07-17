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

// Duplicate the array to create a seamless infinite scroll effect
const SCROLLING_LOGOS = [...PARTNER_LOGOS, ...PARTNER_LOGOS];

export default function LogoMarquee() {
  return (
    <section className="py-12 bg-black border-y border-safety-gray/30 overflow-hidden">
      <div className="container mx-auto px-6 mb-8 text-center">
        <p className="font-safetyMono text-safety-light/50 text-sm tracking-widest uppercase">
          Trusted By Industry Leaders
        </p>
      </div>
      
      <div className="relative w-full overflow-hidden flex whitespace-nowrap">
        {/* Left fade out */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        
        <motion.div
          animate={{ x: [0, -1920] }} // Adjust value based on total width, or use percentage
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
              className="w-32 md:w-48 h-20 md:h-24 relative opacity-50 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0 filter flex items-center justify-center bg-white/5 rounded-lg p-2"
            >
              <img
                src={logo}
                alt="Partner Logo"
                className="w-full h-full object-contain mix-blend-screen"
              />
            </div>
          ))}
        </motion.div>

        {/* Right fade out */}
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
}
