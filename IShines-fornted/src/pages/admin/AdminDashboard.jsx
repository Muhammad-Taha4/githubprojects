import React, { useEffect, useState } from 'react';
import { apiFetch } from '../../config/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await apiFetch('/admin/stats');
      setStats(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-10">Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="size-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined">shopping_cart</span>
          </div>
          <div>
            <p className="text-slate-500 text-sm">Total Orders</p>
            <p className="text-2xl font-bold">{stats?.total_orders || 0}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="size-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined">payments</span>
          </div>
          <div>
            <p className="text-slate-500 text-sm">Total Revenue</p>
            <p className="text-2xl font-bold">${Number(stats?.total_revenue || 0).toFixed(2)}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="size-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined">inventory_2</span>
          </div>
          <div>
            <p className="text-slate-500 text-sm">Total Products</p>
            <p className="text-2xl font-bold">{stats?.products_count || 0}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="size-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined">group</span>
          </div>
          <div>
            <p className="text-slate-500 text-sm">Total Users</p>
            <p className="text-2xl font-bold">{stats?.users_count || 0}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="font-bold text-slate-800">Recent Orders</h3>
        </div>
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-500 border-b border-slate-100">
            <tr>
              <th className="py-3 px-6 font-semibold">Order ID</th>
              <th className="py-3 px-6 font-semibold">Total</th>
              <th className="py-3 px-6 font-semibold">Status</th>
              <th className="py-3 px-6 font-semibold">Date</th>
            </tr>
          </thead>
          <tbody>
            {(stats?.recent_orders || []).map(order => (
              <tr key={order.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                <td className="py-3 px-6 font-medium">#{order.id}</td>
                <td className="py-3 px-6">${Number(order.total).toFixed(2)}</td>
                <td className="py-3 px-6">
                  <span className={`px-2 py-1 text-xs rounded font-medium ${
                    order.status === 'delivered' ? 'bg-green-100 text-green-700' : 
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {order.status.toUpperCase()}
                  </span>
                </td>
                <td className="py-3 px-6">{new Date(order.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
            {(!stats?.recent_orders || stats.recent_orders.length === 0) && (
              <tr>
                <td colSpan="4" className="py-6 text-center text-slate-400">No recent orders found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
