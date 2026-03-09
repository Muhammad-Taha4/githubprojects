import React, { useEffect, useState } from 'react';
import { apiFetch } from '../../config/api';
import toast from 'react-hot-toast';

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  
  const defaultForm = { name: '', slug: '', is_active: true };
  const [formData, setFormData] = useState(defaultForm);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await apiFetch('/admin/categories');
      setCategories(data);
    } catch (e) {
      toast.error("Failed to load categories");
    } finally { setLoading(false); }
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
      if (editId) {
        await apiFetch(`/admin/categories/${editId}`, { method: 'PUT', body: JSON.stringify(data) });
        toast.success("Category updated");
      } else {
        await apiFetch('/admin/categories', { method: 'POST', body: JSON.stringify(data) });
        toast.success("Category created");
      }
      setIsModalOpen(false);
      loadData();
    } catch (e) { toast.error("Error saving category"); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    try {
      await apiFetch(`/admin/categories/${id}`, { method: 'DELETE' });
      toast.success("Category deleted");
      loadData();
    } catch (e) { toast.error("Error deleting category"); }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Categories Management</h2>
        <button onClick={() => handleOpen()} className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-dark transition flex items-center gap-2">
          <span className="material-symbols-outlined">add</span> Add Category
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-500 border-b border-slate-100 uppercase text-xs">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Slug</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(c => (
              <tr key={c.id} className="border-b border-slate-50 hover:bg-slate-50">
                <td className="py-3 px-4 font-semibold text-slate-800">{c.name}</td>
                <td className="py-3 px-4">{c.slug}</td>
                <td className="py-3 px-4">{c.is_active ? 'Active' : 'Inactive'}</td>
                <td className="py-3 px-4 text-right">
                  <button onClick={() => handleOpen(c)} className="text-blue-500 hover:text-blue-700 mx-2 material-symbols-outlined text-sm">edit</button>
                  <button onClick={() => handleDelete(c.id)} className="text-red-500 hover:text-red-700 material-symbols-outlined text-sm">delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96">
            <h3 className="text-xl font-bold mb-4">{editId ? 'Edit Category' : 'Add Category'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><label className="block text-sm font-medium mb-1">Name</label><input required className="w-full border rounded p-2" value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})}/></div>
              <div><label className="block text-sm font-medium mb-1">Slug (auto-generated if empty)</label><input className="w-full border rounded p-2" value={formData.slug} onChange={e=>setFormData({...formData, slug: e.target.value})}/></div>
              <label className="flex items-center gap-2"><input type="checkbox" checked={formData.is_active} onChange={e=>setFormData({...formData, is_active: e.target.checked})}/> Active</label>
              <div className="flex justify-end gap-2 mt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary text-white rounded">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
