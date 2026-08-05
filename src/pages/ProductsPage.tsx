import { useState, useEffect } from 'react';
import { Package, Edit2, Trash2, Plus, Image as ImageIcon } from 'lucide-react';
import { useAdminStore } from '../store/useAdminStore';
import { useTranslation } from '../lib/i18n/translations';

export default function ProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct, fetchProducts } = useAdminStore();
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<{name: string, price: number, url: string, fileType?: 'image'|'3d', fileName?: string}>({ name: '', price: 0, url: '', fileType: 'image' });
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleEdit = (product: any) => {
    setIsEditing(product.id);
    setEditForm({ name: product.name, price: product.price, url: product.url, fileType: product.fileType || 'image' });
  };

  const handleSave = (id: string) => {
    updateProduct(id, editForm);
    setIsEditing(null);
  };

  const handleAdd = () => {
    if (editForm.name && editForm.url) {
      addProduct({ name: editForm.name, price: editForm.price, url: editForm.url, type: 'custom', fileType: editForm.fileType });
      setIsAdding(false);
      setEditForm({ name: '', price: 0, url: '', fileType: 'image' });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const is3D = file.name.endsWith('.html') || file.name.endsWith('.glb');
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditForm({ ...editForm, url: reader.result as string, fileType: is3D ? '3d' : 'image', fileName: file.name });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="font-publicSans">
      <div className="flex justify-between items-center mb-8 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-2 h-8 bg-[#FF8C00]" />
          <h1 className="font-archivo font-black text-3xl text-black uppercase tracking-widest">{t('adminProducts.title')}</h1>
        </div>
        <div className="flex gap-4">
          <button 
            className="bg-[#FF8C00] text-black px-4 py-2 flex items-center gap-2 text-sm font-bold shadow-sm transition-colors hover:bg-orange-500"
            onClick={() => { setIsAdding(true); setEditForm({ name: '', price: 0, url: '', fileType: 'image' }); }}
          >
            <Plus className="w-4 h-4" /> {t('adminProducts.addProduct')}
          </button>
          <div className="bg-white px-4 py-2 border border-gray-200 flex items-center gap-3 shadow-sm">
            <Package className="w-5 h-5 text-gray-500" />
            <span className="text-black font-black text-lg">{products.length}</span>
            <span className="text-gray-400 text-xs uppercase tracking-widest">{t('orders.totalItems')}</span>
          </div>
        </div>
      </div>

      {isAdding && (
        <div className="bg-white border border-gray-200 p-6 mb-8 shadow-sm">
          <div className="flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-xs text-black font-bold uppercase mb-2">{t('adminProducts.formName')}</label>
              <input type="text" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} className="w-full bg-gray-50 border border-gray-200 focus:border-[#FF8C00] outline-none px-3 py-2 text-black text-sm transition-colors rounded-sm" />
            </div>
            <div className="w-32">
              <label className="block text-xs text-black font-bold uppercase mb-2">{t('adminProducts.formPrice')}</label>
              <input type="number" value={editForm.price} onChange={e => setEditForm({...editForm, price: Number(e.target.value)})} className="w-full bg-gray-50 border border-gray-200 focus:border-[#FF8C00] outline-none px-3 py-2 text-black text-sm transition-colors rounded-sm" />
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-xs text-black font-bold uppercase mb-2">{t('adminProducts.formImage')} (IMG / 3D)</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={editForm.url.startsWith('data:') ? (editForm.fileName || 'LOCAL FILE UPLOADED') : editForm.url} 
                  onChange={e => {
                    if (!editForm.url.startsWith('data:')) {
                      setEditForm({...editForm, url: e.target.value});
                    }
                  }}
                  disabled={editForm.url.startsWith('data:')}
                  placeholder="URL OR BASE64" 
                  className={`w-full border focus:border-[#FF8C00] outline-none px-3 py-2 text-black text-xs transition-colors rounded-sm ${editForm.url.startsWith('data:') ? 'bg-gray-100 border-gray-200 cursor-not-allowed text-gray-500' : 'bg-gray-50 border-gray-200'}`} 
                />
                <input type="file" accept="image/*,.html,.glb" onChange={handleImageUpload} className="w-full bg-gray-50 border border-gray-200 hover:border-[#FF8C00] transition-colors p-1 text-black text-xs file:bg-gray-200 file:text-black file:border-0 file:px-3 file:py-1 file:font-bold file:mr-2 file:cursor-pointer cursor-pointer rounded-sm" />
              </div>
              {editForm.url.startsWith('data:') && (
                <button onClick={() => setEditForm({...editForm, url: '', fileName: undefined})} className="text-[10px] text-red-500 hover:text-red-700 mt-2 cursor-pointer font-bold uppercase transition-colors">CLEAR FILE</button>
              )}
            </div>
            <div className="flex gap-2">
              <button className="bg-[#FF8C00] text-black px-6 py-2 font-bold uppercase hover:bg-orange-500 transition-colors shadow-sm rounded-sm" onClick={handleAdd}>{t('adminProducts.save')}</button>
              <button className="bg-white border border-gray-200 text-black px-6 py-2 font-bold uppercase hover:bg-gray-50 transition-colors shadow-sm rounded-sm" onClick={() => setIsAdding(false)}>{t('adminProducts.cancel')}</button>
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10">
        <h2 className="text-xs font-black text-black tracking-widest uppercase mb-6 border-b border-gray-200 pb-2">{t('admin.products')} ({products.length})</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 relative group flex flex-col"
            >
              
              <div className="aspect-square bg-gray-50 p-4 flex items-center justify-center relative overflow-hidden">
                {product.fileType === '3d' ? (
                  <iframe src={product.url} className="w-full h-full border-0 pointer-events-none" />
                ) : (
                  product.url ? <img src={product.url} alt={product.name} className="w-full h-full object-contain" loading="lazy" /> : <ImageIcon className="w-8 h-8 text-gray-300" />
                )}
                <div className="absolute inset-0 bg-white/80 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-all duration-300 backdrop-blur-sm">
                  <button onClick={() => handleEdit(product)} className="bg-white border border-gray-200 text-gray-600 hover:text-black hover:border-black p-3 rounded-full transition-colors shadow-sm"><Edit2 className="w-5 h-5" /></button>
                  <button onClick={() => { if(confirm(t('adminProducts.deleteConfirm'))) deleteProduct(product.id) }} className="bg-white border border-red-200 text-red-500 hover:text-white hover:bg-red-500 p-3 rounded-full transition-colors shadow-sm"><Trash2 className="w-5 h-5" /></button>
                </div>
              </div>

              {isEditing === product.id ? (
                <div className="p-4 border-t border-gray-100 flex flex-col gap-3 bg-gray-50 flex-1">
                  <input type="text" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} className="w-full bg-white border border-gray-200 focus:border-[#FF8C00] outline-none text-xs text-black p-2 font-bold uppercase transition-colors rounded-sm" />
                  <input type="number" value={editForm.price} onChange={e => setEditForm({...editForm, price: Number(e.target.value)})} className="w-full bg-white border border-gray-200 focus:border-[#FF8C00] outline-none text-xs text-black p-2 font-bold transition-colors rounded-sm" />
                  
                  <div className="flex flex-col gap-2">
                    <input 
                      type="text" 
                      value={editForm.url.startsWith('data:') ? (editForm.fileName || 'LOCAL FILE UPLOADED') : editForm.url} 
                      onChange={e => {
                        if (!editForm.url.startsWith('data:')) {
                          setEditForm({...editForm, url: e.target.value});
                        }
                      }}
                      disabled={editForm.url.startsWith('data:')}
                      className={`w-full text-xs text-black p-2 border focus:border-[#FF8C00] outline-none transition-colors rounded-sm ${editForm.url.startsWith('data:') ? 'bg-gray-100 border-gray-200 cursor-not-allowed text-gray-500' : 'bg-white border-gray-200'}`} 
                      placeholder="IMAGE URL" 
                    />
                    <input type="file" accept="image/*,.html,.glb" onChange={handleImageUpload} className="w-full bg-white border border-gray-200 text-[10px] text-black p-1 file:bg-gray-200 file:text-black file:border-0 file:px-2 file:py-1 file:font-bold file:mr-2 file:cursor-pointer cursor-pointer hover:border-[#FF8C00] transition-colors rounded-sm" />
                  </div>

                  <div className="flex gap-2 mt-auto pt-2">
                    <button onClick={() => handleSave(product.id)} className="bg-black text-white hover:bg-gray-800 text-xs px-2 py-2 w-full font-bold uppercase transition-colors rounded-sm">SAVE</button>
                    <button onClick={() => setIsEditing(null)} className="bg-white border border-gray-200 hover:bg-gray-50 text-black text-xs px-2 py-2 w-full font-bold uppercase transition-colors rounded-sm">CANCEL</button>
                  </div>
                </div>
              ) : (
                <div className="p-4 border-t border-gray-100 text-center flex-1 flex flex-col justify-center">
                  <h3 className="text-black text-sm font-bold truncate uppercase" title={product.name}>{product.name}</h3>
                  <p className="text-gray-500 text-sm font-bold mt-1">{product.price} {t('common.egp')}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
