import { useAdminStore } from '../store/useAdminStore';
import { ShieldAlert } from 'lucide-react';

export default function MaintenancePage() {
  const { settings } = useAdminStore();

  return (
    <div className="min-h-screen bg-safety-dark flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative background stripes */}
      <div className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 20px, #ff5722 20px, #ff5722 40px)'
        }}
      />
      
      <div className="z-10 bg-black/80 backdrop-blur-md p-10 md:p-16 rounded-3xl border-2 border-safety-orange text-center max-w-2xl w-full shadow-2xl">
        <div className="flex justify-center mb-6 relative">
          <div className="absolute animate-ping opacity-20 bg-safety-orange w-24 h-24 rounded-full"></div>
          <div className="bg-safety-orange/20 p-6 rounded-full relative z-10 border border-safety-orange/50">
            <ShieldAlert className="w-16 h-16 text-safety-orange animate-pulse" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-safetyDisplay text-white uppercase tracking-widest mb-4">
          {settings?.storeName || 'Georeo'}
        </h1>
        
        <div className="inline-block bg-safety-orange text-black px-6 py-2 font-bold font-safetyMono text-lg uppercase rounded-md mb-8 tracking-widest rotate-[-2deg] shadow-lg">
          Coming Soon
        </div>
        
        <p className="text-safety-light/80 font-safetySans text-lg md:text-xl max-w-lg mx-auto leading-relaxed mb-10">
          We are currently performing scheduled maintenance to improve your experience. We will be back online shortly.
        </p>

        {settings?.whatsappNumber && (
          <a 
            href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20b958] text-white px-8 py-4 rounded-xl font-bold font-safetySans text-lg transition-transform hover:scale-105"
          >
            Contact us on WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}
