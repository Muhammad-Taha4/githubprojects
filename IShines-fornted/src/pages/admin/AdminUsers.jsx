import React, { useEffect, useState } from 'react';
import { apiFetch } from '../../config/api';
import toast from 'react-hot-toast';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    setLoading(true);
    try { 
      const res = await apiFetch('/admin/users'); 
      setUsers(res.data || res); 
    } 
    catch (e) { toast.error("Failed to load users"); } 
    finally { setLoading(false); }
  };

  const updateRole = async (id, role) => {
    try {
      await apiFetch(`/admin/users/${id}`, { method: 'PUT', body: JSON.stringify({ role }) });
      toast.success("User role updated");
      loadData();
    } catch (e) { toast.error("Error updating role"); }
  };

  const deleteUser = async (id) => {
      if(!window.confirm("Delete this user?")) return;
      try {
        await apiFetch(`/admin/users/${id}`, { method: 'DELETE' });
        toast.success("User deleted");
        loadData();
      } catch (e) { toast.error("Error deleting user"); }
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Users</h2>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-500 border-b border-slate-100 uppercase text-xs">
            <tr><th className="py-3 px-4">Name</th><th className="py-3 px-4">Email</th><th className="py-3 px-4">Role</th><th className="py-3 px-4 text-right">Actions</th></tr>
          </thead>
          <tbody>
            {(users || []).map(u => (
              <tr key={u.id} className="border-b border-slate-50 hover:bg-slate-50">
                <td className="py-3 px-4 font-bold text-slate-800">{u.name}</td>
                <td className="py-3 px-4">{u.email}</td>
                <td className="py-3 px-4">
                    <select value={u.role} onChange={(e) => updateRole(u.id, e.target.value)} className="border rounded px-2 py-1 text-xs outline-none">
                        <option value="customer">Customer</option>
                        <option value="admin">Admin</option>
                    </select>
                </td>
                <td className="py-3 px-4 text-right">
                    <button onClick={()=>deleteUser(u.id)} className="text-red-500 material-symbols-outlined text-sm">delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
