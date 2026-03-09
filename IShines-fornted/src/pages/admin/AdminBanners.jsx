import React, { useEffect, useState } from 'react';
import { apiFetch } from '../../config/api';
import toast from 'react-hot-toast';

export default function AdminBanners() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const defaultForm = { title: '', subtitle: '', image: '', link: '', sort_order: 0, is_active: true };
  const [formData, setFormData] = useState(defaultForm);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    setLoading(true);
    try { setBanners(await apiFetch('/admin/banners')); }
    catch (e) { toast.error("Failed to load banners"); }
    finally { setLoading(false); }
  };

  const handleOpen = (item = null) => {
    if (item) {
      setEditId(item.id);
      setFormData(item);
      setImagePreview(item.image || '');
    } else {
      setEditId(null);
      setFormData(defaultForm);
      setImagePreview('');
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitData = new FormData();
    submitData.append('title', formData.title);
    submitData.append('subtitle', formData.subtitle || '');
    submitData.append('link', formData.link || '');
    submitData.append('sort_order', formData.sort_order || 0);
    submitData.append('is_active', formData.is_active ? 1 : 0);

    if (imageFile) {
      submitData.append('image', imageFile);
    }

    const token = localStorage.getItem('ishine_token');
    const url = editId
      ? `http://localhost:8000/api/admin/banners/${editId}`
      : 'http://localhost:8000/api/admin/banners';

    const method = 'POST'; // Map PUT to POST for FormData
    if (editId) submitData.append('_method', 'PUT');

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
        body: submitData,
      });

      if (response.ok) {
        toast.success(editId ? "Banner updated" : "Banner created");
        setIsModalOpen(false);
        loadData();
      } else {
        const errData = await response.json();
        toast.error(errData.message || "Error saving banner");
      }
    } catch (e) { toast.error("Error saving banner"); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this banner?")) return;
    try { await apiFetch(`/admin/banners/${id}`, { method: 'DELETE' }); toast.success("Deleted"); loadData(); } catch (e) { toast.error("Error deleting"); }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Homepage Banners</h2>
        <button onClick={() => handleOpen()} className="bg-primary text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2"><span className="material-symbols-outlined">add</span> Add Banner</button>
      </div>
      <div className="grid grid-cols-1 gap-6">
        {banners.map(b => (
          <div key={b.id} className="bg-white rounded-xl shadow-sm border border-slate-100 flex p-4 items-center gap-6">
            <div className="w-1/4 h-32 bg-slate-100 rounded-lg overflow-hidden flex items-center justify-center text-slate-400">
              {b.image ? <img src={b.image} alt="Banner" className="w-full h-full object-cover" /> : "No Image or Demo Banner"}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg">{b.title}</h3>
              <p className="text-slate-500 text-sm mb-2">{b.subtitle}</p>
              <p className="text-xs text-blue-500 mb-2">Link to: {b.link}</p>
              <div className="flex items-center gap-4 text-sm mt-4">
                <span className="bg-slate-100 px-2 py-1 rounded">Sort: {b.sort_order}</span>
                {b.is_active ? <span className="text-green-600 bg-green-100 px-2 py-1 rounded">Active</span> : <span className="text-red-600 bg-red-100 px-2 py-1 rounded">Inactive</span>}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button onClick={() => handleOpen(b)} className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded text-sm font-medium text-slate-700">Edit</button>
              <button onClick={() => handleDelete(b.id)} className="px-3 py-1 bg-red-50 hover:bg-red-100 rounded text-sm font-medium text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[500px] max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">{editId ? 'Edit Banner' : 'Add Banner'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><label className="block text-sm font-medium mb-1">Title</label><input required className="w-full border rounded p-2" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} /></div>
              <div><label className="block text-sm font-medium mb-1">Subtitle</label><input className="w-full border rounded p-2" value={formData.subtitle} onChange={e => setFormData({ ...formData, subtitle: e.target.value })} /></div>
              <div>
                <label className="block text-sm font-medium mb-1">Banner Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full border rounded p-2"
                />
                {imagePreview && (
                  <img src={imagePreview} alt="Preview" style={{ width: '150px', marginTop: '10px' }} className="rounded shadow-sm border border-slate-200" />
                )}
              </div>
              <div><label className="block text-sm font-medium mb-1">Link Destination</label><input className="w-full border rounded p-2" value={formData.link || ''} onChange={e => setFormData({ ...formData, link: e.target.value })} /></div>
              <div><label className="block text-sm font-medium mb-1">Sort Order</label><input type="number" className="w-full border rounded p-2" value={formData.sort_order} onChange={e => setFormData({ ...formData, sort_order: e.target.value })} /></div>
              <label className="flex items-center gap-2"><input type="checkbox" checked={formData.is_active} onChange={e => setFormData({ ...formData, is_active: e.target.checked })} /> Active</label>
              <div className="flex justify-end gap-2 mt-4"><button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded">Cancel</button><button type="submit" className="px-4 py-2 bg-primary text-white rounded">Save</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
