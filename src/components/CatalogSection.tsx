import { useState } from 'react';
import { useAdminStore } from '../store/useAdminStore';
import { useCartStore } from '../store/useCartStore';
import { toast } from 'sonner';

export default function CatalogSection() {
  const { products } = useAdminStore();
  const { addItem } = useCartStore();
  const [activeTab, setActiveTab] = useState<string>('ALL');

  // Filter out non-image products if needed, but pdf_catalog uses type='image'
  const catalogProducts = products.filter(p => p.type === 'image' && p.id.startsWith('PRD-'));

  const filteredProducts = activeTab === 'ALL' 
    ? catalogProducts 
    : catalogProducts.filter(p => p.category === activeTab);

  const handleAddToCart = (product: any) => {
    addItem({
      id: `${product.id}-${Date.now()}`,
      name: product.name,
      price: product.price || 0,
      quantity: 1,
      type: 'CATALOG_ITEM',
      image: product.url
    });
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <section className="py-20 bg-white" id="catalog">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <h2 className="text-3xl font-black uppercase flex items-center">
            <span className="w-8 h-1 bg-[#FF8C00] mr-4"></span>
            Browse Our Catalog
          </h2>
          <div className="flex space-x-4 mt-6 md:mt-0 font-bold text-sm">
            {['ALL', 'WORKWEAR', 'FOOTWEAR', 'SAFETY'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 border-b-2 transition-colors cursor-pointer ${activeTab === tab ? 'border-[#FF8C00] text-[#FF8C00]' : 'border-transparent text-gray-500 hover:text-black'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <div key={product.id} className="group border border-gray-100 rounded-sm overflow-hidden hover:shadow-xl transition-all flex flex-col">
              <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden p-4">
                <img 
                  src={product.url} 
                  alt={product.name} 
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="bg-[#FF8C00] text-white font-bold py-3 px-6 transform translate-y-4 group-hover:translate-y-0 transition-all cursor-pointer"
                  >
                    Add to Quote
                  </button>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow bg-white">
                <span className="text-xs text-[#FF8C00] font-bold mb-2">{product.category}</span>
                <h3 className="font-black text-lg mb-3 line-clamp-2" title={product.name}>{product.name}</h3>
                <p className="text-sm text-gray-500 line-clamp-3 mb-4 flex-grow" title={product.description}>
                  {product.description}
                </p>
                <div className="font-bold text-lg mt-auto">
                  {product.price > 0 ? `$${product.price.toFixed(2)}` : 'Request Quote'}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No products found in this category.
          </div>
        )}
      </div>
    </section>
  );
}
