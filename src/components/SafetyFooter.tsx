import { useTranslation } from '../lib/i18n/translations';
import { useAdminStore } from '../store/useAdminStore';

export default function SafetyFooter() {
  const { t } = useTranslation();
  const { settings } = useAdminStore();
  return (
    <footer className="bg-black pt-20 pb-10 border-t border-safety-red/40 relative overflow-hidden scanline">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,0,51,0.03)_0%,_transparent_100%)] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mb-12">
          
          <div className="flex flex-col items-center md:items-start">
            <a href="/" className="flex items-center group mb-4">
              <div className="relative h-12 w-48 transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_0_10px_rgba(255,0,51,0.3)]">
                <img src="/images/Georeo-bk.png" alt="Georeo Logo" className="w-full h-full object-contain object-left md:object-left" />
              </div>
            </a>
            <p className="text-safety-light/50 font-safetyMono text-xs max-w-xs text-center md:text-left mt-4 uppercase">
              {t('footer.company')}
            </p>
          </div>
          
          <div className="flex gap-12">
            <div className="flex flex-col">
              <h4 className="font-safetyMono text-lg uppercase text-safety-red mb-4 tracking-widest">[ {t('footer.products')} ]</h4>
              <ul className="flex flex-col gap-2 font-safetyMono text-xs text-safety-light/60">
                <li><a href="#products" className="hover:text-safety-red hover:drop-shadow-[0_0_5px_rgba(255,0,51,0.8)] transition-all duration-300">{t('nav.products')}</a></li>
              </ul>
            </div>
            <div className="flex flex-col">
              <h4 className="font-safetyMono text-lg uppercase text-safety-red mb-4 tracking-widest">[ {t('footer.contact')} ]</h4>
              <ul className="flex flex-col gap-3 font-safetyMono text-xs text-safety-light/70">
                {settings?.contactEmail && settings.contactEmail.trim() !== '' && (
                  <li className="flex items-center gap-3">
                    <span className="w-16 text-safety-red/70">EMAIL:</span>
                    <a href={`mailto:${settings.contactEmail}`} className="hover:text-safety-red hover:drop-shadow-[0_0_5px_rgba(255,0,51,0.8)] transition-all duration-300">
                      {settings.contactEmail}
                    </a>
                  </li>
                )}
                
                {settings?.whatsappNumber && settings.whatsappNumber.trim() !== '' && (
                  <li className="flex items-center gap-3">
                    <span className="w-16 text-safety-red/70">COMMS:</span>
                    <a 
                      href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20Georeo%20Safety,%20I%27m%20interested%20in%20your%20safety%20boards%20and%20labels.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:text-safety-red hover:drop-shadow-[0_0_5px_rgba(255,0,51,0.8)] transition-all duration-300 group"
                      title="Secure Comm Channel"
                    >
                      <span className="font-safetyMono uppercase" dir="ltr">{settings.whatsappNumber}</span>
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-safety-red/20 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-safetyMono text-safety-light/30">
          <div>&gt; SYSTEM_ID: {new Date().getFullYear()} {settings?.storeName || 'GEOREO'}. {t('footer.rights')}</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-safety-red transition-colors">[ PRIVACY_PROTOCOL ]</a>
            <a href="#" className="hover:text-safety-red transition-colors">[ TERMS_OF_SERVICE ]</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
