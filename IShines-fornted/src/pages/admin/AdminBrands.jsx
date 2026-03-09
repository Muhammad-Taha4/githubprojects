import React, { useEffect, useState } from 'react';
import { apiFetch } from '../../config/api';
import toast from 'react-hot-toast';

export default function AdminBrands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const defaultForm = { name: '', slug: '', is_active: true };
  const [formData, setFormData] = useState(defaultForm);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await apiFetch('/admin/brands');
      setBrands(data);
    } catch (e) { toast.error("Failed to load brands"); } 
    finally { setLoading(false); }
  };

  const handleOpen = (item = null) => {
    if (item) { setEditId(item.id); setFormData(item); } 
    else { setEditId(null); setFormData(defaultForm); }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...formData };
    if(!data.slug) data.slug = data.name.toLowerCase().replace(/\s+/g, '-');
    try {
      if (editId) await apiFetch(`/admin/brands/${editId}`, { method: 'PUT', body: JSON.stringify(data) });
      else await apiFetch('/admin/brands', { method: 'POST', body: JSON.stringify(data) });
      toast.success(editId ? "Brand updated" : "Brand created");
      setIsModalOpen(false);
      loadData();
    } catch (e) { toast.error("Error saving brand"); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this brand?")) return;
    try { await apiFetch(`/admin/brands/${id}`, { method: 'DELETE' }); toast.success("Brand deleted"); loadData(); } catch (e) { toast.error("Error deleting brand"); }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Brands Management</h2>
        <button onClick={() => handleOpen()} className="bg-primary text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2"><span className="material-symbols-outlined">add</span> Add Brand</button>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-500 border-b border-slate-100 uppercase text-xs">
            <tr><th className="py-3 px-4">Name</th><th className="py-3 px-4">Slug</th><th className="py-3 px-4">Status</th><th className="py-3 px-4 text-right">Actions</th></tr>
          </thead>
          <tbody>
            {brands.map(b => (
              <tr key={b.id} className="border-b border-slate-50 hover:bg-slate-50"><td className="py-3 px-4 font-semibold text-slate-800">{b.name}</td><td className="py-3 px-4">{b.slug}</td><td className="py-3 px-4">{b.is_active ? 'Active' : 'Inactive'}</td><td className="py-3 px-4 text-right"><button onClick={() => handleOpen(b)} className="text-blue-500 mx-2 material-symbols-outlined text-sm">edit</button><button onClick={() => handleDelete(b.id)} className="text-red-500 material-symbols-outlined text-sm">delete</button></td></tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96">
            <h3 className="text-xl font-bold mb-4">{editId ? 'Edit Brand' : 'Add Brand'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><label className="block text-sm font-medium mb-1">Name</label><input required className="w-full border rounded p-2" value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})}/></div>
              <div><label className="block text-sm font-medium mb-1">Slug</label><input className="w-full border rounded p-2" value={formData.slug} onChange={e=>setFormData({...formData, slug: e.target.value})}/></div>
              <label className="flex items-center gap-2"><input type="checkbox" checked={formData.is_active} onChange={e=>setFormData({...formData, is_active: e.target.checked})}/> Active</label>
              <div className="flex justify-end gap-2 mt-4"><button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded">Cancel</button><button type="submit" className="px-4 py-2 bg-primary text-white rounded">Save</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
