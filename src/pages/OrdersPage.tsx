import { useEffect } from 'react';
import { useAdminStore } from '../store/useAdminStore';
import { motion } from 'framer-motion';
import { ShoppingCart, Download } from 'lucide-react';
import * as XLSX from 'xlsx';

export default function OrdersPage() {
  const { orders, updateOrderStatus, deleteOrder, fetchOrders } = useAdminStore();

  useEffect(() => {
    fetchOrders();
  }, []);

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
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-safetyDisplay text-3xl text-white uppercase">Orders Management</h1>
        <div className="flex gap-4">
          <button 
            onClick={exportToExcel}
            className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors cursor-pointer text-sm font-safetySans"
          >
            <Download className="w-4 h-4" /> Export to Excel
          </button>
          <div className="bg-safety-panel px-4 py-2 rounded-lg border border-safety-gray/50 flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-safety-orange" />
            <span className="text-white font-safetyMono font-bold">{orders.length}</span>
            <span className="text-safety-light/70 text-sm">Total Orders</span>
          </div>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 bg-safety-panel rounded-xl border border-safety-gray/50">
          <ShoppingCart className="w-16 h-16 text-safety-light/20 mb-4" />
          <p className="font-safetySans text-safety-light/50">No orders have been received yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={order.id} 
              className="bg-safety-panel border border-safety-gray/50 rounded-xl overflow-hidden"
            >
              {/* Order Header */}
              <div className="bg-black/30 p-4 border-b border-safety-gray/50 flex flex-wrap justify-between items-center gap-4">
                <div>
                  <h3 className="font-safetyMono text-lg text-safety-orange font-bold">{order.id}</h3>
                  <p className="text-sm text-safety-light/70">{order.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <select 
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                    className={`bg-black border rounded px-3 py-1.5 text-sm font-safetyMono outline-none ${
                      order.status === 'Pending' ? 'border-yellow-500 text-yellow-500' :
                      order.status === 'Confirmed' ? 'border-blue-500 text-blue-500' :
                      order.status === 'Cancelled' ? 'border-red-500 text-red-500' :
                      'border-green-500 text-green-500'
                    }`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                  <button 
                    onClick={() => { if(confirm('Are you sure?')) deleteOrder(order.id) }}
                    className="text-red-500 hover:text-red-400 text-sm font-bold uppercase cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Customer Details */}
                <div className="space-y-3">
                  <h4 className="font-safetyMono text-xs text-safety-light/50 uppercase border-b border-safety-gray/30 pb-2 mb-3">Customer Details</h4>
                  <p className="text-white"><span className="text-safety-light/70 w-20 inline-block">Name:</span> {order.customer.fullName}</p>
                  <p className="text-white"><span className="text-safety-light/70 w-20 inline-block">Company:</span> {order.customer.company}</p>
                  <p className="text-white"><span className="text-safety-light/70 w-20 inline-block">Phone:</span> {order.customer.phone}</p>
                  <p className="text-white"><span className="text-safety-light/70 w-20 inline-block">Email:</span> {order.customer.email}</p>
                  <p className="text-white"><span className="text-safety-light/70 w-20 inline-block">Address:</span> {order.customer.address}, {order.customer.country}</p>
                </div>

                {/* Items */}
                <div className="lg:col-span-2 space-y-3">
                  <h4 className="font-safetyMono text-xs text-safety-light/50 uppercase border-b border-safety-gray/30 pb-2 mb-3">Order Items</h4>
                  <div className="space-y-4">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex gap-4 items-center bg-black/20 p-3 rounded-lg border border-white/5">
                        <div className="w-16 h-16 bg-black rounded border border-safety-gray/50 flex-shrink-0 p-1">
                          {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-contain" />}
                        </div>
                        <div className="flex-1">
                          <h5 className="text-white font-bold">{item.name}</h5>
                          <div className="flex gap-4 text-xs text-safety-light/70 mt-1">
                            <span>Qty: {item.quantity}</span>
                            <span>Type: {item.type}</span>
                            {item.size && <span>Size: {item.size}</span>}
                          </div>
                          {item.customNote && (
                            <div className="mt-2 text-xs bg-yellow-500/10 text-yellow-500 p-2 rounded border border-yellow-500/20">
                              <span className="font-bold">Note:</span> {item.customNote}
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="text-safety-orange font-safetyMono font-bold">0 EGP</div>
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
