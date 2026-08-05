import { useAdminStore } from '../store/useAdminStore';
import { useAnalyticsStore } from '../store/useAnalyticsStore';
import { useTranslation } from '../lib/i18n/translations';

export default function Dashboard() {
  const { orders, products } = useAdminStore();
  const { pageViews, uniqueVisitors, topPages } = useAnalyticsStore();
  const { t } = useTranslation();

  // Real-time calculated stats
  const totalProducts = products.length;
  const newRequests = orders.filter(o => o.status === 'Pending').length;
  const contactedCount = orders.filter(o => o.status === 'Confirmed' || o.status === 'Shipped').length;
  const completedCount = orders.filter(o => o.status === 'Shipped').length; // Assuming shipped means completed

  const productsSold = orders.reduce((total, order) => {
    return total + order.items.reduce((sum, item) => sum + item.quantity, 0);
  }, 0);

  return (
    <div className="font-publicSans">
      
      {/* Top Header */}
      <div className="flex justify-between items-center mb-8 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-2 h-8 bg-[#FF8C00]" />
          <h1 className="font-archivo font-black text-3xl text-black uppercase tracking-widest">{t('dashboard.overview')}</h1>
        </div>
        <button className="bg-white border border-gray-200 text-black px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-sm font-bold shadow-sm transition-colors">
          <span>↻</span> {t('dashboard.refresh')}
        </button>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 relative z-10">
        <div className="bg-white p-6 border border-gray-100 shadow-sm relative group hover:shadow-md transition-all duration-300">
          <p className="text-xs text-gray-500 mb-2 uppercase tracking-widest font-bold">{t('dashboard.totalProducts')}</p>
          <h3 className="text-4xl font-black text-black group-hover:text-[#FF8C00] transition-colors">{totalProducts}</h3>
        </div>
        <div className="bg-white p-6 border border-gray-100 shadow-sm relative group hover:shadow-md transition-all duration-300">
          <p className="text-xs text-gray-500 mb-2 uppercase tracking-widest font-bold">{t('dashboard.newRequests')}</p>
          <h3 className="text-4xl font-black text-blue-600">{newRequests}</h3>
        </div>
        <div className="bg-white p-6 border border-gray-100 shadow-sm relative group hover:shadow-md transition-all duration-300">
          <p className="text-xs text-gray-500 mb-2 uppercase tracking-widest font-bold">{t('dashboard.contacted')}</p>
          <h3 className="text-4xl font-black text-[#FF8C00]">{contactedCount}</h3>
        </div>
        <div className="bg-white p-6 border border-gray-100 shadow-sm relative group hover:shadow-md transition-all duration-300">
          <p className="text-xs text-gray-500 mb-2 uppercase tracking-widest font-bold">{t('dashboard.completed')}</p>
          <h3 className="text-4xl font-black text-emerald-500">{completedCount}</h3>
        </div>
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
        {/* Time Filters */}
        <div className="flex items-center gap-4 mb-6 text-sm font-bold uppercase tracking-wider">
          <button className="text-gray-400 hover:text-black">Today</button>
          <button className="bg-[#FF8C00] text-black px-4 py-1 rounded-sm">Week</button>
          <button className="text-gray-400 hover:text-black">Month</button>
          <button className="text-gray-400 hover:text-black">Year</button>
        </div>

        {/* Sub Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 relative z-10">
          <div className="bg-white p-5 border-l-4 border-gray-200 shadow-sm">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1 font-bold">{t('dashboard.pageViews')}</p>
            <h3 className="text-2xl font-black text-black">{pageViews}</h3>
          </div>
          <div className="bg-white p-5 border-l-4 border-gray-200 shadow-sm">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1 font-bold">{t('dashboard.uniqueVisitors')}</p>
            <h3 className="text-2xl font-black text-black">{uniqueVisitors}</h3>
          </div>
          <div className="bg-white p-5 border-l-4 border-[#FF8C00] shadow-sm">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1 font-bold">{t('dashboard.productsSold')}</p>
            <h3 className="text-2xl font-black text-black">{productsSold}</h3>
          </div>
          <div className="bg-white p-5 border-l-4 border-[#FF8C00] shadow-sm">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1 font-bold">{t('dashboard.conversionRate')}</p>
            <h3 className="text-2xl font-black text-black">
              {uniqueVisitors > 0 ? ((orders.length / uniqueVisitors) * 100).toFixed(1) : "0.0"}%
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 relative z-10">
          {/* Top Pages List */}
          <div className="bg-white p-6 border border-gray-100 shadow-sm">
            <h4 className="text-sm font-black text-black uppercase tracking-widest mb-6 border-b border-gray-100 pb-4">{t('dashboard.topPages')}</h4>
            <div className="space-y-3">
              {topPages.map((page, index) => (
                <div key={index} className="flex items-center justify-between text-sm bg-gray-50 p-3 border-l-4 border-gray-200 hover:border-[#FF8C00] transition-colors">
                  <div className="flex items-center gap-4">
                    <span className="w-6 h-6 bg-black text-white font-bold flex items-center justify-center text-[10px]">
                      {index + 1}
                    </span>
                    <span className="text-gray-700 font-medium truncate max-w-[200px]" dir="ltr">{page.path}</span>
                  </div>
                  <span className="font-bold text-black tracking-widest text-xs uppercase">{page.views} Views</span>
                </div>
              ))}
              {topPages.length === 0 && (
                <div className="text-gray-400 text-sm text-center py-4 font-bold tracking-widest uppercase">
                  {t('dashboard.noPages')}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
