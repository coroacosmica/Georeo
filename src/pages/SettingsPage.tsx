import { Save } from 'lucide-react';
import { toast } from 'sonner';

export default function SettingsPage() {
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Settings saved successfully!');
  };

  return (
    <div className="p-8 max-w-4xl">
      <h1 className="font-safetyDisplay text-3xl text-white uppercase mb-8">System Settings</h1>
      
      <form onSubmit={handleSave} className="bg-safety-panel border border-safety-gray/50 rounded-xl p-8 space-y-8">
        <div>
          <h2 className="text-white font-bold mb-4 border-b border-safety-gray/30 pb-2">Store Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-safetyMono text-xs text-safety-light/70 uppercase mb-2">Store Name</label>
              <input type="text" defaultValue="Georeo Safety" className="w-full bg-black border border-safety-gray/50 rounded px-4 py-3 text-white focus:outline-none focus:border-safety-orange" />
            </div>
            <div>
              <label className="block font-safetyMono text-xs text-safety-light/70 uppercase mb-2">Contact Email</label>
              <input type="email" defaultValue="sales@georeo.com" className="w-full bg-black border border-safety-gray/50 rounded px-4 py-3 text-white focus:outline-none focus:border-safety-orange" />
            </div>
            <div>
              <label className="block font-safetyMono text-xs text-safety-light/70 uppercase mb-2">WhatsApp Confirmation Number</label>
              <input type="tel" defaultValue="+20 100 000 0000" className="w-full bg-black border border-safety-gray/50 rounded px-4 py-3 text-white focus:outline-none focus:border-safety-orange" />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-white font-bold mb-4 border-b border-safety-gray/30 pb-2">Preferences</h2>
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-5 h-5 accent-safety-orange" />
              <span className="text-safety-light/80">Enable WhatsApp confirmation requirement</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-5 h-5 accent-safety-orange" />
              <span className="text-safety-light/80">Send email notification on new orders</span>
            </label>
          </div>
        </div>

        <div className="pt-6 border-t border-safety-gray/30">
          <button type="submit" className="flex items-center gap-2 px-8 py-3 bg-safety-orange text-safety-dark font-bold rounded hover:bg-yellow-500 transition-colors cursor-pointer">
            <Save className="w-5 h-5" />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
