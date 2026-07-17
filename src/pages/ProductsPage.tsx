import { useState, useEffect } from 'react';
import { Package, Edit2, Trash2, Plus } from 'lucide-react';
import { useAdminStore } from '../store/useAdminStore';
import { useTranslation } from '../lib/i18n/translations';

export default function ProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct, fetchProducts } = useAdminStore();
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: '', price: 0, url: '' });
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product: any) => {
    setIsEditing(product.id);
    setEditForm({ name: product.name, price: product.price, url: product.url });
  };

  const handleSave = (id: string) => {
    updateProduct(id, editForm);
    setIsEditing(null);
  };

  const handleAdd = () => {
    if (editForm.name && editForm.url) {
      addProduct({ name: editForm.name, price: editForm.price, url: editForm.url, type: 'custom' });
      setIsAdding(false);
      setEditForm({ name: '', price: 0, url: '' });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditForm({ ...editForm, url: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-safetyDisplay text-3xl text-white uppercase">{t('adminProducts.title')}</h1>
        <div className="flex gap-4">
          <button 
            onClick={() => { setIsAdding(true); setEditForm({ name: '', price: 0, url: '' }); }}
            className="bg-safety-orange hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors cursor-pointer text-sm font-safetySans"
          >
            <Plus className="w-4 h-4" /> {t('adminProducts.addProduct')}
          </button>
          <div className="bg-safety-panel px-4 py-2 rounded-lg border border-safety-gray/50 flex items-center gap-2">
            <Package className="w-5 h-5 text-safety-orange" />
            <span className="text-white font-safetyMono font-bold">{products.length}</span>
            <span className="text-safety-light/70 text-sm">{t('orders.totalItems')}</span>
          </div>
        </div>
      </div>

      {isAdding && (
        <div className="bg-safety-panel border border-safety-orange rounded-xl p-6 mb-8 flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs text-safety-light/70 mb-1">{t('adminProducts.formName')}</label>
            <input type="text" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} className="w-full bg-black border border-safety-gray/50 rounded px-3 py-2 text-white" />
          </div>
          <div className="w-32">
            <label className="block text-xs text-safety-light/70 mb-1">{t('adminProducts.formPrice')}</label>
            <input type="number" value={editForm.price} onChange={e => setEditForm({...editForm, price: Number(e.target.value)})} className="w-full bg-black border border-safety-gray/50 rounded px-3 py-2 text-white" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs text-safety-light/70 mb-1">{t('adminProducts.formImage')}</label>
            <div className="flex gap-2">
              <input type="text" value={editForm.url} onChange={e => setEditForm({...editForm, url: e.target.value})} placeholder="URL or Base64" className="w-full bg-black border border-safety-gray/50 rounded px-3 py-2 text-white text-xs" />
              <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full bg-black border border-safety-gray/50 rounded p-1 text-white text-xs" />
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleAdd} className="bg-green-600 text-white px-4 py-2 rounded font-bold">{t('adminProducts.save')}</button>
            <button onClick={() => setIsAdding(false)} className="bg-red-600 text-white px-4 py-2 rounded font-bold">{t('adminProducts.cancel')}</button>
          </div>
        </div>
      )}

      <div>
        <h2 className="font-safetyDisplay text-xl text-white uppercase mb-4 border-b border-safety-gray/30 pb-2">{t('admin.products')} ({products.length})</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="bg-safety-panel border border-safety-gray/50 rounded-xl overflow-hidden flex flex-col hover:border-safety-orange transition-colors group relative"
            >
              <div className="aspect-square bg-black/50 p-4 flex items-center justify-center relative">
                <img src={product.url} alt={product.name} className="w-full h-full object-contain" loading="lazy" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity">
                  <button onClick={() => handleEdit(product)} className="bg-white/20 hover:bg-white/40 p-2 rounded-full text-white cursor-pointer"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => { if(confirm(t('adminProducts.deleteConfirm'))) deleteProduct(product.id) }} className="bg-red-500/80 hover:bg-red-500 p-2 rounded-full text-white cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>

              {isEditing === product.id ? (
                <div className="p-3 border-t border-safety-gray/50 flex flex-col gap-2">
                  <input type="text" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} className="w-full bg-black text-xs text-white p-1 rounded" />
                  <input type="number" value={editForm.price} onChange={e => setEditForm({...editForm, price: Number(e.target.value)})} className="w-full bg-black text-xs text-white p-1 rounded" />
                  <input type="text" value={editForm.url} onChange={e => setEditForm({...editForm, url: e.target.value})} className="w-full bg-black text-xs text-white p-1 rounded" placeholder="Image URL" />
                  <div className="flex gap-2 mt-1">
                    <button onClick={() => handleSave(product.id)} className="bg-green-600 text-white text-xs px-2 py-1 rounded w-full">{t('adminProducts.save')}</button>
                    <button onClick={() => setIsEditing(null)} className="bg-safety-gray text-white text-xs px-2 py-1 rounded w-full">{t('adminProducts.cancel')}</button>
                  </div>
                </div>
              ) : (
                <div className="p-3 border-t border-safety-gray/50 text-center">
                  <h3 className="text-white text-xs font-bold truncate" title={product.name}>{product.name}</h3>
                  <p className="text-safety-orange text-xs font-safetyMono mt-1">{product.price} {t('common.egp')}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
