import { motion } from "framer-motion";
import { useState, useRef, type MouseEvent } from "react";
import { useCartStore } from '../store/useCartStore';
import { useAdminStore, type AdminProduct } from '../store/useAdminStore';
import { toast } from "sonner";

const PRODUCTS = [
  { id: 1, title: "Standard Site Safety", size: "1200x900mm", price: "0 EGP", modelUrl: "/models/site_safety_board_3d_with_upload.html" },
  { id: 2, title: "Hazmat Protocol", size: "1800x1200mm", price: "0 EGP", modelUrl: "/models/site_safety_board_1800x1200_3d.html" },
];

function ProductCard({ product }: { product: typeof PRODUCTS[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState<AdminProduct | null>(null);
  const [customNote, setCustomNote] = useState("");
  const { addItem } = useCartStore();
  const { products } = useAdminStore();

  const applyTexture = (label: AdminProduct) => {
    setSelectedLabel(label);
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage({ type: 'SET_TEXTURE', url: label.url }, '*');
    }
  };

  const resetTexture = () => {
    setSelectedLabel(null);
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage({ type: 'RESET_TEXTURE' }, '*');
    }
  };

  const handleAddToCart = () => {
    addItem({
      id: `3d-${product.id}-${selectedLabel?.id || 'base'}-${Date.now()}`,
      name: `${product.title} ${selectedLabel ? `(${selectedLabel.name})` : ''}`,
      price: 0,
      quantity: 1,
      type: '3D_BOARD',
      size: product.size,
      customLabel: selectedLabel?.url,
      customNote: customNote,
      image: selectedLabel?.url || '/images/Georeo-bk.png'
    });
    toast.success(`${product.title} added to your cart!`);
    setIsCustomizing(false);
    setCustomNote("");
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (product.modelUrl) return;
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation limits (max 15 degrees)
    const rotateXValue = ((y - centerY) / centerY) * -15;
    const rotateYValue = ((x - centerX) / centerX) * 15;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    if (product.modelUrl) return;
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div className="relative w-full z-10 hover:z-20">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full aspect-[4/3] perspective-1000"
        style={{ perspective: "1000px" }}
      >
      <motion.div
        animate={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.5 }}
        className="w-full h-full relative group"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Hexagon-cut card */}
        <div 
          className="absolute inset-0 bg-safety-panel border border-safety-gray overflow-hidden"
          style={{ clipPath: "polygon(10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%, 0 10%)" }}
        >
          {/* 3D Model iframe */}
          <div className="absolute inset-0 bg-black">
            {product.modelUrl && (
              <iframe 
                ref={iframeRef}
                src={product.modelUrl}
                title={product.title}
                className="w-full h-full border-0"
                style={{ backgroundColor: 'transparent' }}
              />
            )}
          </div>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-safety-dark via-safety-dark/40 to-transparent pointer-events-none" />
          
          {/* Content */}
          <div className="absolute bottom-0 left-0 p-6 w-full pointer-events-none flex flex-col justify-end" style={{ transform: "translateZ(30px)" }}>
            <div className="flex justify-between items-end mb-2">
              <div className="font-safetyMono text-safety-orange text-xs">SPEC: {product.size}</div>
              {product.price && (
                <div className="font-safetyMono text-white/70 text-[10px] uppercase text-right max-w-[140px] leading-tight">
                  Price: <span className="text-safety-orange text-sm">{product.price}</span>
                  <div className="text-[8px] text-safety-light/50 mt-0.5">Order confirmation via Call/WhatsApp</div>
                </div>
              )}
            </div>
            <h3 className="font-safetyDisplay text-3xl uppercase text-white leading-none">{product.title}</h3>
            {product.modelUrl && (
              <div className="mt-3 flex items-center gap-3 pointer-events-auto">
                <div className="inline-flex items-center text-xs font-safetyMono text-safety-orange bg-safety-orange/10 px-2 py-1 rounded border border-safety-orange/30">
                  <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  3D Interactive
                </div>
                <button 
                  onClick={() => setIsCustomizing(!isCustomizing)}
                  className="inline-flex items-center text-xs font-safetyMono text-safety-dark bg-safety-orange px-3 py-1 rounded hover:bg-yellow-500 transition-colors cursor-pointer"
                >
                  <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
                  Customize
                </button>
                <button 
                  onClick={handleAddToCart}
                  className="inline-flex items-center text-xs font-safetyMono text-white bg-safety-dark px-3 py-1 rounded hover:bg-black transition-colors cursor-pointer border border-safety-gray/50"
                >
                  <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  Add to Cart
                </button>
              </div>
            )}
          </div>
          
          {/* Top-right accent */}
          <div className="absolute top-4 right-4 text-safety-gray group-hover:text-safety-orange transition-colors duration-300 pointer-events-none" style={{ transform: "translateZ(20px)" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </motion.div>
      </div>

      {/* Customization Panel */}
      {isCustomizing && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-[105%] left-0 w-full bg-safety-panel border border-safety-gray rounded-xl p-4 z-50 shadow-2xl"
        >
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-safetyMono text-sm text-white">Select Label Design ({products.length} Available)</h4>
            <button onClick={resetTexture} className="text-xs font-safetyMono text-safety-light/60 hover:text-white transition-colors cursor-pointer">
              [ Reset ]
            </button>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 mb-4 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
            {products.map(label => (
              <button 
                key={label.id}
                onClick={() => applyTexture(label)}
                className={`aspect-square bg-black border ${selectedLabel?.id === label.id ? 'border-safety-orange ring-2 ring-safety-orange/50' : 'border-safety-gray/50 hover:border-safety-orange'} rounded overflow-hidden transition-all cursor-pointer p-1`}
                title={label.name}
              >
                <img src={label.url} alt={label.name} className="w-full h-full object-contain" loading="lazy" />
              </button>
            ))}
          </div>
          
          <div className="border-t border-safety-gray/50 pt-3">
            <label className="block font-safetyMono text-xs text-safety-light/70 uppercase mb-2">Custom Notes / Design Requirements</label>
            <textarea 
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              placeholder="e.g. Please add our logo to the top right corner..."
              className="w-full bg-black border border-safety-gray/50 rounded px-3 py-2 text-white focus:outline-none focus:border-safety-orange transition-colors text-sm resize-none"
              rows={2}
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default function ProductGrid() {
  return (
    <section id="products" className="py-24 bg-safety-dark">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="font-safetyDisplay text-5xl md:text-7xl text-white uppercase">Engineered <span className="text-safety-gray">Signage</span></h2>
          <p className="text-safety-light/70 font-safetySans mt-4 max-w-2xl mx-auto">
            Heavy-duty PVC and acrylic panels coated with weather-resistant finishes. Designed to endure harsh industrial environments.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.8, y: 50, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.2, type: "spring", bounce: 0.4 }}
              className="relative"
            >
              {/* Outer pulsing glow */}
              <motion.div 
                animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.02, 1] }} 
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -inset-2 bg-gradient-to-r from-safety-orange via-yellow-500 to-safety-orange rounded-[20%] blur-xl opacity-50 -z-10" 
              />
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
