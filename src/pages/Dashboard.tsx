import { useAdminStore } from '../store/useAdminStore';
import { useAnalyticsStore } from '../store/useAnalyticsStore';
import { ALL_LABELS } from '../data/labels';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip 
} from 'recharts';
import { useTranslation } from '../lib/i18n/translations';
import { useState, useEffect, useRef } from 'react';

export default function Dashboard() {
  const { orders } = useAdminStore();
  const { pageViews, uniqueVisitors, trafficData, topPages } = useAnalyticsStore();
  const { t } = useTranslation();
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [chartDims, setChartDims] = useState({ width: 0, height: 300 });

  useEffect(() => {
    if (!chartContainerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      if (!Array.isArray(entries) || !entries.length) return;
      const { width, height } = entries[0].contentRect;
      // Prevent resize loop errors by using requestAnimationFrame
      window.requestAnimationFrame(() => {
        setChartDims({ width, height });
      });
    });
    observer.observe(chartContainerRef.current);
    return () => observer.disconnect();
  }, []);

  // Real-time calculated stats
  const totalProducts = ALL_LABELS.length + 2;
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart Area */}
          <div className="lg:col-span-2 bg-safety-panel p-6 rounded-lg border border-safety-gray/50">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6">{t('dashboard.traffic')}</h4>
            <div className="h-[300px] w-full" ref={chartContainerRef}>
              {chartDims.width > 0 && (
                <LineChart width={chartDims.width} height={chartDims.height} data={trafficData} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#3A3D42" />
                  <XAxis 
                    dataKey="time" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#E2E8F0', opacity: 0.5, fontSize: 12, fontFamily: 'JetBrains Mono' }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#E2E8F0', opacity: 0.5, fontSize: 12, fontFamily: 'JetBrains Mono' }} 
                    dx={-10}
                    ticks={[8, 16, 24, 32, 40]}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1E2024', border: '1px solid #3A3D42', borderRadius: '8px', color: '#fff', fontFamily: 'JetBrains Mono' }}
                    itemStyle={{ color: '#F2661E' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="visitors" 
                    stroke="#F2661E" 
                    strokeWidth={2}
                    dot={{ r: 4, fill: '#0A0C0F', stroke: '#F2661E', strokeWidth: 2 }}
                    activeDot={{ r: 6, fill: '#F2661E', stroke: '#0A0C0F' }}
                  />
                </LineChart>
              )}
            </div>
          </div>

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
                  <span className="font-bold text-white">{page.views}</span>
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
