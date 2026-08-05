import { useState } from 'react';
import { useAdminStore } from '../store/useAdminStore';
import { Lock, AlertCircle, Globe, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../lib/i18n/translations';
import { useLanguageStore } from '../store/useLanguageStore';

export default function AdminLogin() {
  const { t } = useTranslation();
  const toggleLanguage = useLanguageStore(state => state.toggleLanguage);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const { login } = useAdminStore();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      navigate('/admin');
    } else {
      setError(true);
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-white flex font-publicSans">
      {/* Left Panel - Image Cover */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-black items-center justify-center overflow-hidden">
        <img 
          src="/images/placeholders/hero_bg.png" 
          alt="Industrial Safety" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        
        <div className="relative z-10 p-12 flex flex-col items-center text-center max-w-lg">
          <div className="w-20 h-20 bg-[#FF8C00] rounded-full flex items-center justify-center mb-8 shadow-xl">
            <ShieldCheck className="w-10 h-10 text-black" />
          </div>
          <h2 className="text-4xl font-archivo font-black text-white uppercase tracking-wider leading-tight mb-4">
            Georeo Safety<br/>Management
          </h2>
          <p className="text-gray-300 font-medium">
            Access your industrial dashboard to manage products, orders, and safety equipment efficiently.
          </p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
        <button 
          onClick={toggleLanguage}
          className="absolute top-8 right-8 text-gray-400 hover:text-black transition-colors cursor-pointer flex items-center gap-2 text-sm font-bold uppercase tracking-widest bg-gray-50 px-4 py-2 rounded-sm border border-gray-200"
        >
          <Globe className="w-4 h-4" />
          <span>EN / AR</span>
        </button>

        <div className="w-full max-w-md">
          <div className="flex flex-col items-center mb-10">
            <img src="/images/Georeo-bk.png" alt="Georeo Logo" className="h-16 object-contain mb-8" />
            
            <h1 className="text-3xl font-archivo font-black text-black uppercase tracking-wider mb-2">{t('login.title')}</h1>
            <p className="text-gray-500 font-medium text-sm text-center">{t('login.subtitle')}</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-bold text-xs mb-2 uppercase tracking-widest">{t('login.accessCode')} (georeo2026)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(false);
                  }}
                  className="w-full bg-gray-50 border-2 border-gray-200 focus:border-[#FF8C00] rounded-sm pl-11 pr-4 py-4 text-black font-bold focus:outline-none transition-colors"
                  placeholder="Enter access code..."
                  autoFocus
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-sm p-4 flex items-center gap-3 text-red-600 text-sm font-bold animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{t('login.error')}</span>
              </div>
            )}

            <button 
              type="submit"
              className="w-full bg-[#FF8C00] hover:bg-black hover:text-[#FF8C00] text-black font-black text-lg uppercase py-4 rounded-sm transition-all duration-300 cursor-pointer shadow-sm flex items-center justify-center gap-2 group"
            >
              <span>{t('login.submit')}</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              © {new Date().getFullYear()} Georeo Safety Systems
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
