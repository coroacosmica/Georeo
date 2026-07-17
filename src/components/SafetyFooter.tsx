import { useTranslation } from '../lib/i18n/translations';

export default function SafetyFooter() {
  const { t } = useTranslation();
  return (
    <footer className="bg-safety-panel pt-20 pb-10 border-t border-safety-gray/20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mb-12">
          
          <div className="flex flex-col items-center md:items-start">
            <a href="/" className="flex items-center group mb-4">
              <div className="relative h-12 w-48 transition-transform duration-300 group-hover:scale-105">
                <img src="/images/Georeo-bk.png" alt="Georeo Logo" className="w-full h-full object-contain object-left md:object-left" />
              </div>
            </a>
            <p className="text-safety-light/50 font-safetySans text-sm max-w-xs text-center md:text-left">
              {t('footer.company')}
            </p>
          </div>
          
          <div className="flex gap-12">
            <div className="flex flex-col">
              <h4 className="font-safetyDisplay text-xl uppercase text-white mb-4">{t('footer.products')}</h4>
              <ul className="flex flex-col gap-2 font-safetySans text-sm text-safety-light/60">
                <li><a href="#products" className="hover:text-safety-orange transition-colors">{t('nav.products')}</a></li>
              </ul>
            </div>
            <div className="flex flex-col">
              <h4 className="font-safetyDisplay text-xl uppercase text-white mb-4">{t('footer.contact')}</h4>
              <ul className="flex flex-col gap-2 font-safetySans text-sm text-safety-light/60">
                <li><a href="#" className="hover:text-safety-orange transition-colors">Our Process</a></li>
                <li><a href="#" className="hover:text-safety-orange transition-colors">Specs</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-safety-gray/30 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-safetyMono text-safety-light/40">
          <div>&copy; {new Date().getFullYear()} Georeo. {t('footer.rights')}</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-safety-orange transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-safety-orange transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
