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
    <div className="p-8 font-safetySans">
      
      {/* Top Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-safetyDisplay text-3xl text-white uppercase">{t('dashboard.overview')}</h1>
        <button className="px-4 py-1.5 text-sm font-medium text-safety-light/70 bg-safety-panel border border-safety-gray/50 rounded hover:bg-white/5 transition-colors flex items-center gap-2 cursor-pointer">
          <span className="text-safety-orange">↻</span> {t('dashboard.refresh')}
        </button>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-safety-panel p-6 rounded-lg border border-safety-gray/50">
          <h3 className="font-safetyMono text-3xl font-bold text-white">{totalProducts}</h3>
          <p className="text-sm text-safety-light/50 mt-1 uppercase tracking-wider font-bold">{t('dashboard.totalProducts')}</p>
        </div>
        <div className="bg-safety-panel p-6 rounded-lg border border-safety-gray/50">
          <h3 className="font-safetyMono text-3xl font-bold text-blue-500">{newRequests}</h3>
          <p className="text-sm text-safety-light/50 mt-1 uppercase tracking-wider font-bold">{t('dashboard.newRequests')}</p>
        </div>
        <div className="bg-safety-panel p-6 rounded-lg border border-safety-gray/50">
          <h3 className="font-safetyMono text-3xl font-bold text-safety-orange">{contactedCount}</h3>
          <p className="text-sm text-safety-light/50 mt-1 uppercase tracking-wider font-bold">{t('dashboard.contacted')}</p>
        </div>
        <div className="bg-safety-panel p-6 rounded-lg border border-safety-gray/50">
          <h3 className="font-safetyMono text-3xl font-bold text-green-500">{completedCount}</h3>
          <p className="text-sm text-safety-light/50 mt-1 uppercase tracking-wider font-bold">{t('dashboard.completed')}</p>
        </div>
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
        {/* Time Filters */}
        <div className="flex items-center gap-4 mb-6 text-sm font-safetyMono">
          <button className="text-safety-light/50 hover:text-white">Today</button>
          <button className="bg-safety-orange text-safety-dark px-4 py-1 rounded-full font-bold">Week</button>
          <button className="text-safety-light/50 hover:text-white">Month</button>
          <button className="text-safety-light/50 hover:text-white">Year</button>
        </div>

        {/* Sub Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-safety-panel p-6 rounded-lg border border-safety-gray/50">
            <p className="text-xs text-safety-light/50 uppercase tracking-wider mb-2">{t('dashboard.pageViews')}</p>
            <h3 className="font-safetyMono text-3xl font-bold text-white">{pageViews}</h3>
          </div>
          <div className="bg-safety-panel p-6 rounded-lg border border-safety-gray/50">
            <p className="text-xs text-safety-light/50 uppercase tracking-wider mb-2">{t('dashboard.uniqueVisitors')}</p>
            <h3 className="font-safetyMono text-3xl font-bold text-white">{uniqueVisitors}</h3>
          </div>
          <div className="bg-safety-panel p-6 rounded-lg border border-safety-gray/50">
            <p className="text-xs text-safety-light/50 uppercase tracking-wider mb-2">{t('dashboard.productsSold')}</p>
            <h3 className="font-safetyMono text-3xl font-bold text-white">{productsSold}</h3>
          </div>
          <div className="bg-safety-panel p-6 rounded-lg border border-safety-gray/50">
            <p className="text-xs text-safety-light/50 uppercase tracking-wider mb-2">{t('dashboard.conversionRate')}</p>
            <h3 className="font-safetyMono text-3xl font-bold text-white">
              {uniqueVisitors > 0 ? ((orders.length / uniqueVisitors) * 100).toFixed(1) : "0.0"}%
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* Top Pages List */}
          <div className="bg-safety-panel p-6 rounded-lg border border-safety-gray/50">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6">{t('dashboard.topPages')}</h4>
            <div className="space-y-4">
              {topPages.map((page, index) => (
                <div key={index} className="flex items-center justify-between text-sm font-safetyMono">
                  <div className="flex items-center gap-4">
                    <span className="w-6 h-6 bg-black text-safety-light/50 rounded border border-safety-gray/50 flex items-center justify-center text-xs">
                      {index + 1}
                    </span>
                    <span className="text-safety-light/70 truncate max-w-[120px]" dir="ltr">{page.path}</span>
                  </div>
                  <span className="font-bold text-white">{page.views} views</span>
                </div>
              ))}
              {topPages.length === 0 && (
                <div className="text-safety-light/50 text-sm text-center py-4 font-safetySans">
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
