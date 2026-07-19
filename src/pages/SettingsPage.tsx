import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslation } from '../lib/i18n/translations';
import { useAdminStore } from '../store/useAdminStore';

export default function SettingsPage() {
  const { t } = useTranslation();
  const { settings, updateSettings } = useAdminStore();
  
  const [formData, setFormData] = useState(settings);

  useEffect(() => {
    setFormData(settings);
  }, [settings]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    toast.success(t('adminSettings.saveSuccess'));
  };

  return (
    <div className="p-8 max-w-4xl">
      <h1 className="font-safetyDisplay text-3xl text-white uppercase mb-8">{t('adminSettings.title')}</h1>
      
      <form onSubmit={handleSave} className="bg-safety-panel border border-safety-gray/50 rounded-xl p-8 space-y-8">
        <div>
          <h2 className="text-white font-bold mb-4 border-b border-safety-gray/30 pb-2">{t('adminSettings.storeInfo')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-safetyMono text-xs text-safety-light/70 uppercase mb-2">{t('adminSettings.storeName')}</label>
              <input type="text" value={formData.storeName} onChange={e => setFormData({...formData, storeName: e.target.value})} className="w-full bg-black border border-safety-gray/50 rounded px-4 py-3 text-white focus:outline-none focus:border-safety-orange" />
            </div>
            <div>
              <label className="block font-safetyMono text-xs text-safety-light/70 uppercase mb-2">{t('adminSettings.contactEmail')}</label>
              <input type="email" value={formData.contactEmail} onChange={e => setFormData({...formData, contactEmail: e.target.value})} className="w-full bg-black border border-safety-gray/50 rounded px-4 py-3 text-white focus:outline-none focus:border-safety-orange" />
            </div>
            <div>
              <label className="block font-safetyMono text-xs text-safety-light/70 uppercase mb-2">{t('adminSettings.whatsapp')}</label>
              <input type="tel" value={formData.whatsappNumber} onChange={e => setFormData({...formData, whatsappNumber: e.target.value})} className="w-full bg-black border border-safety-gray/50 rounded px-4 py-3 text-white focus:outline-none focus:border-safety-orange" />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-white font-bold mb-4 border-b border-safety-gray/30 pb-2">{t('adminSettings.preferences')}</h2>
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={formData.enableWhatsapp} onChange={e => setFormData({...formData, enableWhatsapp: e.target.checked})} className="w-5 h-5 accent-safety-orange" />
              <span className="text-safety-light/80">{t('adminSettings.enableWhatsapp')}</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={formData.emailAlerts} onChange={e => setFormData({...formData, emailAlerts: e.target.checked})} className="w-5 h-5 accent-safety-orange" />
              <span className="text-safety-light/80">{t('adminSettings.emailAlerts')}</span>
            </label>
          </div>
        </div>

        <div className="pt-6 border-t border-safety-gray/30">
          <button type="submit" className="flex items-center gap-2 px-8 py-3 bg-safety-orange text-safety-dark font-bold rounded hover:bg-yellow-500 transition-colors cursor-pointer">
            <Save className="w-5 h-5" />
            {t('adminSettings.saveChanges')}
          </button>
        </div>
      </form>
    </div>
  );
}
