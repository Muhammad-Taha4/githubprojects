import React, { useEffect, useState } from 'react';
import { apiFetch } from '../../config/api';
import toast from 'react-hot-toast';

export default function AdminMenu() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const defaultForm = { label: '', slug: '', type: 'brand', badge: '', sort_order: 0, is_active: true, parent_id: '' };
  const [formData, setFormData] = useState(defaultForm);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    setLoading(true);
    try { setItems(await apiFetch('/admin/menu-items')); } 
    catch (e) { toast.error("Failed to load menu items"); } 
    finally { setLoading(false); }
  };

  const handleOpen = (item = null) => {
    if (item) { setEditId(item.id); setFormData({ ...item, parent_id: item.parent_id || '' }); } 
    else { setEditId(null); setFormData(defaultForm); }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...formData, parent_id: formData.parent_id || null };
    try {
      if (editId) await apiFetch(`/admin/menu-items/${editId}`, { method: 'PUT', body: JSON.stringify(data) });
      else await apiFetch('/admin/menu-items', { method: 'POST', body: JSON.stringify(data) });
      toast.success(editId ? "Updated" : "Created");
      setIsModalOpen(false); loadData();
    } catch (e) { toast.error("Error saving"); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this menu item?")) return;
    try { await apiFetch(`/admin/menu-items/${id}`, { method: 'DELETE' }); toast.success("Deleted"); loadData(); } catch (e) { toast.error("Error deleting"); }
  };

  const parents = items.filter(i => !i.parent_id);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Menu Items Navigation</h2>
        <button onClick={() => handleOpen()} className="bg-primary text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2"><span className="material-symbols-outlined">add</span> Add Node</button>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-500 border-b border-slate-100 uppercase text-xs">
            <tr><th className="py-3 px-4">Label</th><th className="py-3 px-4">Type</th><th className="py-3 px-4">Badge</th><th className="py-3 px-4 text-right">Actions</th></tr>
          </thead>
          <tbody>
            {items.sort((a,b)=>a.parent_id - b.parent_id || a.sort_order - b.sort_order).map(i => (
              <tr key={i.id} className="border-b border-slate-50 hover:bg-slate-50">
                <td className="py-3 px-4 font-semibold text-slate-800">
                    <span style={{marginLeft: i.parent_id ? '20px' : '0px'}}>
                        {i.parent_id ? '↳ ' : ''}{i.label}
                    </span>
                </td>
                <td className="py-3 px-4">{i.type}</td>
                <td className="py-3 px-4">{i.badge && <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">{i.badge}</span>}</td>
                <td className="py-3 px-4 text-right">
                    <button onClick={() => handleOpen(i)} className="text-blue-500 mx-2 material-symbols-outlined text-sm">edit</button>
                    <button onClick={() => handleDelete(i.id)} className="text-red-500 material-symbols-outlined text-sm">delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[500px]">
            <h3 className="text-xl font-bold mb-4">{editId ? 'Edit Menu Item' : 'Add Menu Item'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><label className="block text-sm font-medium mb-1">Label</label><input required className="w-full border rounded p-2" value={formData.label} onChange={e=>setFormData({...formData, label: e.target.value})}/></div>
              <div><label className="block text-sm font-medium mb-1">Slug</label><input required className="w-full border rounded p-2" value={formData.slug} onChange={e=>setFormData({...formData, slug: e.target.value})}/></div>
              <div><label className="block text-sm font-medium mb-1">Parent Item (Optional)</label>
                   <select className="w-full border rounded p-2" value={formData.parent_id} onChange={e=>setFormData({...formData, parent_id: e.target.value})}>
                       <option value="">-- None (Top Level) --</option>
                       {parents.filter(p=>p.id !== editId).map(p=><option key={p.id} value={p.id}>{p.label}</option>)}
                   </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium mb-1">Type</label>
                       <select className="w-full border rounded p-2" value={formData.type} onChange={e=>setFormData({...formData, type: e.target.value})}>
                           <option value="brand">Brand</option><option value="category">Category</option><option value="custom">Custom</option>
                       </select>
                  </div>
                  <div><label className="block text-sm font-medium mb-1">Badge</label><input placeholder="NEW, HOT, SALE" className="w-full border rounded p-2" value={formData.badge||''} onChange={e=>setFormData({...formData, badge: e.target.value})}/></div>
              </div>
              <div><label className="block text-sm font-medium mb-1">Sort Order</label><input type="number" className="w-full border rounded p-2" value={formData.sort_order} onChange={e=>setFormData({...formData, sort_order: e.target.value})}/></div>
              <label className="flex items-center gap-2"><input type="checkbox" checked={formData.is_active} onChange={e=>setFormData({...formData, is_active: e.target.checked})}/> Active</label>
              <div className="flex justify-end gap-2 mt-4"><button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded">Cancel</button><button type="submit" className="px-4 py-2 bg-primary text-white rounded">Save</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
