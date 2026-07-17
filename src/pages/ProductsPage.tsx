import { ALL_LABELS } from '../data/labels';
import { Package } from 'lucide-react';

export default function ProductsPage() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-safetyDisplay text-3xl text-white uppercase">Product Inventory</h1>
        <div className="bg-safety-panel px-4 py-2 rounded-lg border border-safety-gray/50 flex items-center gap-2">
          <Package className="w-5 h-5 text-safety-orange" />
          <span className="text-white font-safetyMono font-bold">{ALL_LABELS.length + 2}</span>
          <span className="text-safety-light/70 text-sm">Total Items</span>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="font-safetyDisplay text-xl text-white uppercase mb-4 border-b border-safety-gray/30 pb-2">3D Engineered Boards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[{ title: "Standard Site Safety", size: "1200x900mm" }, { title: "Hazmat Protocol", size: "1800x1200mm" }].map((board, i) => (
            <div key={i} className="bg-safety-panel border border-safety-gray/50 rounded-xl p-6 flex justify-between items-center">
              <div>
                <h3 className="text-white font-bold text-lg">{board.title}</h3>
                <p className="text-safety-light/70 text-sm font-safetyMono">Size: {board.size}</p>
              </div>
              <div className="text-safety-orange font-safetyMono">0 EGP</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="font-safetyDisplay text-xl text-white uppercase mb-4 border-b border-safety-gray/30 pb-2">Standard Labels ({ALL_LABELS.length})</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {ALL_LABELS.map((label) => (
            <div 
              key={label.id} 
              className="bg-safety-panel border border-safety-gray/50 rounded-xl overflow-hidden flex flex-col hover:border-safety-orange transition-colors"
            >
              <div className="aspect-square bg-black/50 p-4 flex items-center justify-center">
                <img src={label.url} alt={label.name} className="w-full h-full object-contain" loading="lazy" />
              </div>
              <div className="p-3 border-t border-safety-gray/50 text-center">
                <h3 className="text-white text-xs font-bold truncate" title={label.name}>{label.name}</h3>
                <p className="text-safety-orange text-xs font-safetyMono mt-1">0 EGP</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
