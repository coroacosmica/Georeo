import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslation } from '../lib/i18n/translations';
import { useAdminStore } from '../store/useAdminStore';

export default function SettingsPage() {
  const { t } = useTranslation();
  const { settings, updateSettings } = useAdminStore();
  
  const [formData, setFormData] = useState({
    storeName: settings?.storeName || '',
    contactEmail: settings?.contactEmail || '',
    whatsappNumber: settings?.whatsappNumber || '',
    enableWhatsapp: settings?.enableWhatsapp ?? true,
    maintenanceMode: settings?.maintenanceMode ?? false,
  });

  useEffect(() => {
    setFormData({
      storeName: settings?.storeName || '',
      contactEmail: settings?.contactEmail || '',
      whatsappNumber: settings?.whatsappNumber || '',
      enableWhatsapp: settings?.enableWhatsapp ?? true,
      maintenanceMode: settings?.maintenanceMode ?? false,
    });
  }, [settings]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    toast.success(t('adminSettings.saveSuccess'));
  };

  return (
    <div className="font-publicSans max-w-4xl relative z-10">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-2 h-8 bg-[#FF8C00]" />
        <h1 className="font-archivo font-black text-3xl text-black uppercase tracking-widest">{t('adminSettings.title')}</h1>
      </div>
      
      <form onSubmit={handleSave} className="bg-white border border-gray-200 p-8 space-y-8 shadow-sm">
        <div className="relative z-10">
          <h2 className="text-black text-sm font-black tracking-widest uppercase mb-4 border-b border-gray-100 pb-2">{t('adminSettings.storeInfo')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">{t('adminSettings.storeName')}</label>
              <input type="text" value={formData.storeName} onChange={e => setFormData({...formData, storeName: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-sm px-4 py-3 text-black text-sm focus:outline-none focus:border-[#FF8C00] transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">{t('adminSettings.contactEmail')}</label>
              <input type="email" value={formData.contactEmail} onChange={e => setFormData({...formData, contactEmail: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-sm px-4 py-3 text-black text-sm focus:outline-none focus:border-[#FF8C00] transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">{t('adminSettings.whatsapp')}</label>
              <input type="tel" value={formData.whatsappNumber} onChange={e => setFormData({...formData, whatsappNumber: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-sm px-4 py-3 text-black text-sm focus:outline-none focus:border-[#FF8C00] transition-colors" />
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <h2 className="text-black text-sm font-black tracking-widest uppercase mb-4 border-b border-gray-100 pb-2">{t('adminSettings.preferences')}</h2>
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={formData.enableWhatsapp} onChange={e => setFormData({...formData, enableWhatsapp: e.target.checked})} className="w-5 h-5 accent-[#FF8C00] rounded-sm" />
              <span className="text-gray-700 font-medium">{t('adminSettings.enableWhatsapp')}</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input 
                  type="checkbox" 
                  checked={formData.maintenanceMode}
                  onChange={(e) => setFormData({...formData, maintenanceMode: e.target.checked})}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF8C00]"></div>
              </div>
              <span className="text-gray-700 font-medium group-hover:text-black transition-colors">Enable Maintenance Mode (Coming Soon page)</span>
            </label>
            <p className="text-gray-500 text-sm mt-1 ml-14">Hide the store and show a coming soon page to visitors.</p>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-100 relative z-10 flex justify-end">
          <button type="submit" className="bg-[#FF8C00] hover:bg-orange-500 text-black px-6 py-3 font-bold uppercase flex items-center shadow-sm rounded-sm transition-colors">
            <Save className="w-4 h-4 mr-2" />
            {t('adminSettings.saveChanges')}
          </button>
        </div>
      </form>
    </div>
  );
}
