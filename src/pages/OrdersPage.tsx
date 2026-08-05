import { useEffect } from 'react';
import { useAdminStore } from '../store/useAdminStore';
import { motion } from 'framer-motion';
import { ShoppingCart, Download, PackageOpen } from 'lucide-react';
import * as XLSX from 'xlsx';
import { useTranslation } from '../lib/i18n/translations';

export default function OrdersPage() {
  const { orders, updateOrderStatus, deleteOrder, fetchOrders } = useAdminStore();
  const { t } = useTranslation();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const exportToExcel = () => {
    const data = orders.map(order => ({
      'Order ID': order.id,
      'Date': order.date,
      'Status': order.status,
      'Customer Name': order.customer.fullName,
      'Company': order.customer.company,
      'Phone': order.customer.phone,
      'Email': order.customer.email,
      'Address': order.customer.address,
      'Country': order.customer.country,
      'Items Count': order.items.reduce((sum, item) => sum + item.quantity, 0),
      'Items Details': order.items.map(item => `${item.quantity}x ${item.name} (${item.type})`).join('; '),
      'Total Price': 0
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Orders");
    XLSX.writeFile(wb, `Georeo_Orders_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  return (
    <div className="font-publicSans">
      <div className="flex justify-between items-center mb-8 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-2 h-8 bg-[#FF8C00]" />
          <h1 className="font-archivo font-black text-3xl text-black uppercase tracking-widest">{t('orders.title')}</h1>
        </div>
        <div className="flex gap-4">
          <button 
            className="bg-white border border-gray-200 text-black px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-sm font-bold shadow-sm transition-colors"
            onClick={exportToExcel}
          >
            <Download className="w-4 h-4" /> Export to Excel
          </button>
          <div className="bg-white px-4 py-2 border border-gray-200 flex items-center gap-3 shadow-sm">
            <ShoppingCart className="w-5 h-5 text-gray-500" />
            <span className="text-black font-black text-lg">{orders.length}</span>
            <span className="text-gray-400 text-xs uppercase tracking-widest">{t('orders.totalItems')}</span>
          </div>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 bg-white border border-gray-200 shadow-sm">
          <PackageOpen className="w-16 h-16 text-gray-300 mb-4" />
          <p className="font-bold text-gray-400 tracking-widest uppercase">{t('orders.noOrders')}</p>
        </div>
      ) : (
        <div className="space-y-6 relative z-10">
          {orders.map((order, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={order.id} 
              className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
            >
              
              {/* Order Header */}
              <div className="bg-gray-50 p-4 border-b border-gray-200 flex flex-wrap justify-between items-center gap-4">
                <div className="flex items-center gap-3">
                  <div>
                    <h3 className="font-black text-lg text-black tracking-widest">{order.id}</h3>
                    <p className="text-xs text-gray-500 mt-1">{new Date(order.date).toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <select 
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                    className={`bg-white border px-3 py-1.5 text-xs font-bold tracking-widest uppercase outline-none cursor-pointer rounded-sm ${
                      order.status === 'Pending' ? 'border-yellow-300 text-yellow-600' :
                      order.status === 'Confirmed' ? 'border-blue-300 text-blue-600' :
                      order.status === 'Cancelled' ? 'border-red-300 text-red-600' :
                      'border-emerald-300 text-emerald-600'
                    }`}
                  >
                    <option value="Pending">PENDING</option>
                    <option value="Confirmed">CONFIRMED</option>
                    <option value="Shipped">SHIPPED</option>
                    <option value="Cancelled">CANCELLED</option>
                  </select>
                  <button 
                    onClick={() => { if(confirm('Are you sure?')) deleteOrder(order.id) }}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer px-3 py-1.5 border border-transparent hover:border-red-200 rounded-sm"
                  >
                    DELETE
                  </button>
                </div>
              </div>

              <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Customer Details */}
                <div className="space-y-3 text-sm">
                  <h4 className="text-xs font-black text-black tracking-widest uppercase border-b border-gray-100 pb-2 mb-4">{t('orders.customerDetails')}</h4>
                  <p className="text-gray-700"><span className="text-gray-400 w-24 inline-block tracking-widest text-xs uppercase">{t('checkout.fullName')}:</span> {order.customer.fullName}</p>
                  <p className="text-gray-700"><span className="text-gray-400 w-24 inline-block tracking-widest text-xs uppercase">{t('orders.company')}:</span> {order.customer.company}</p>
                  <p className="text-gray-700"><span className="text-gray-400 w-24 inline-block tracking-widest text-xs uppercase">{t('orders.phone')}:</span> <span dir="ltr">{order.customer.phone}</span></p>
                  <p className="text-gray-700"><span className="text-gray-400 w-24 inline-block tracking-widest text-xs uppercase">{t('orders.email')}:</span> <span dir="ltr">{order.customer.email}</span></p>
                  <p className="text-gray-700"><span className="text-gray-400 w-24 inline-block tracking-widest text-xs uppercase">{t('orders.address')}:</span> {order.customer.address}, {order.customer.country}</p>
                  {(order.customer.uploadedDesign || order.customer.uploadedLogo) && (
                    <div className="mt-6 grid grid-cols-2 gap-4">
                      {order.customer.uploadedDesign && (
                        <div className="border border-dashed border-gray-300 p-2 bg-gray-50 text-center relative group rounded-sm">
                          <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 font-bold">Design</p>
                          {order.customer.uploadedDesign.startsWith('data:image') ? (
                            <img src={order.customer.uploadedDesign} alt="Uploaded Design" className="max-h-24 mx-auto opacity-80 group-hover:opacity-100 transition-opacity" />
                          ) : (
                            <a href={order.customer.uploadedDesign} download="custom_design" className="text-[#FF8C00] text-[10px] uppercase font-bold hover:underline">[ DOWNLOAD ]</a>
                          )}
                        </div>
                      )}
                      {order.customer.uploadedLogo && (
                        <div className="border border-dashed border-gray-300 p-2 bg-gray-50 text-center relative group rounded-sm">
                          <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 font-bold">Logo</p>
                          {order.customer.uploadedLogo.startsWith('data:image') ? (
                            <img src={order.customer.uploadedLogo} alt="Uploaded Logo" className="max-h-24 mx-auto opacity-80 group-hover:opacity-100 transition-opacity" />
                          ) : (
                            <a href={order.customer.uploadedLogo} download="custom_logo" className="text-[#FF8C00] text-[10px] uppercase font-bold hover:underline">[ DOWNLOAD ]</a>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Items */}
                <div className="lg:col-span-2 space-y-3 text-sm">
                  <h4 className="text-xs font-black text-black tracking-widest uppercase border-b border-gray-100 pb-2 mb-4">{t('orders.items')}</h4>
                  <div className="space-y-4">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex gap-4 items-center bg-gray-50 p-3 border border-gray-100 rounded-sm">
                        <div className="w-16 h-16 bg-white flex-shrink-0 p-1 border border-gray-200">
                          {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-contain" />}
                        </div>
                        <div className="flex-1">
                          <h5 className="text-gray-900 font-bold tracking-wider">{item.name}</h5>
                          <div className="flex gap-4 text-[10px] text-gray-500 mt-2 uppercase tracking-widest font-bold">
                            <span>QTY: {item.quantity}</span>
                            <span>TYPE: {item.type}</span>
                            {item.size && <span>SIZE: {item.size}</span>}
                          </div>
                          {item.customNote && (
                            <div className="mt-3 text-[10px] bg-yellow-50 text-yellow-700 p-2 border border-yellow-200 uppercase tracking-widest rounded-sm">
                              <span className="font-bold">NOTE:</span> {item.customNote}
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="text-black font-black tracking-widest">0 {t('common.egp')}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
