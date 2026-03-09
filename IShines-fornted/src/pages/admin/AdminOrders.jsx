import React, { useEffect, useState } from 'react';
import { apiFetch } from '../../config/api';
import toast from 'react-hot-toast';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    setLoading(true);
    try { 
      const res = await apiFetch('/admin/orders'); 
      setOrders(res.data || res); 
    } 
    catch (e) { toast.error("Failed to load orders"); } 
    finally { setLoading(false); }
  };

  const updateStatus = async (id, status) => {
    try {
      await apiFetch(`/admin/orders/${id}`, { method: 'PUT', body: JSON.stringify({ status }) });
      toast.success("Order status updated");
      loadData();
    } catch (e) { toast.error("Error updating status"); }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Orders</h2>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-500 border-b border-slate-100 uppercase text-xs">
            <tr><th className="py-3 px-4">Order ID</th><th className="py-3 px-4">Customer</th><th className="py-3 px-4">Total</th><th className="py-3 px-4">Date</th><th className="py-3 px-4">Status</th><th className="py-3 px-4 text-right">Update Status</th></tr>
          </thead>
          <tbody>
            {(orders || []).map(o => (
              <tr key={o.id} className="border-b border-slate-50 hover:bg-slate-50">
                <td className="py-3 px-4 font-bold text-slate-800">#{o.id}</td>
                <td className="py-3 px-4">{o.user_id ? `User #${o.user_id}` : 'Guest'}</td>
                <td className="py-3 px-4 font-semibold">${Number(o.total).toFixed(2)}</td>
                <td className="py-3 px-4">{new Date(o.created_at).toLocaleDateString()}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${o.status === 'delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>{o.status}</span>
                </td>
                <td className="py-3 px-4 text-right">
                    <select value={o.status} onChange={(e) => updateStatus(o.id, e.target.value)} className="border rounded px-2 py-1 text-xs">
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </td>
              </tr>
            ))}
            {orders.length === 0 && <tr><td colSpan="6" className="text-center py-8 text-slate-400">No orders found</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
