import React, { useEffect, useState } from 'react';
import { apiFetch } from '../../config/api';
import toast from 'react-hot-toast';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const defaultForm = { name: '', sku: '', brand_id: '', category_id: '', retail_price: '', wholesale_price: '', stock: '', description: '', compatibility: '', is_featured: false, is_active: true };
  const [formData, setFormData] = useState(defaultForm);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [prodRes, brandRes, catRes] = await Promise.all([
        apiFetch('/admin/products?limit=100'),
        apiFetch('/admin/brands'),
        apiFetch('/admin/categories')
      ]);
      setProducts(prodRes.data || prodRes);
      setBrands(brandRes);
      setCategories(catRes);
    } catch (e) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = (item = null) => {
    if (item) {
      setEditId(item.id);
      setFormData(item);

      let imgUrl = '';
      if (item.images && item.images.length > 0) {
        try {
          const parsed = JSON.parse(item.images);
          if (parsed.length > 0) imgUrl = parsed[0];
        } catch (e) { imgUrl = item.images; }
      }
      setImagePreview(imgUrl);
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
    submitData.append('name', formData.name);
    submitData.append('sku', formData.sku);
    submitData.append('brand_id', formData.brand_id);
    submitData.append('category_id', formData.category_id);
    submitData.append('retail_price', formData.retail_price);
    submitData.append('wholesale_price', formData.wholesale_price);
    submitData.append('stock', formData.stock);
    submitData.append('description', formData.description || '');
    submitData.append('compatibility', formData.compatibility || '');
    submitData.append('is_featured', formData.is_featured ? 1 : 0);
    submitData.append('is_active', formData.is_active ? 1 : 0);

    if (imageFile) {
      submitData.append('image', imageFile);
    }

    const token = localStorage.getItem('ishine_token');
    const url = editId
      ? `http://localhost:8000/api/admin/products/${editId}`
      : 'http://localhost:8000/api/admin/products';

    const method = 'POST'; // We forcefully use POST to allow FormData file uploads in Laravel
    if (editId) submitData.append('_method', 'PUT'); // Spoof PUT method for Laravel properly

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
        toast.success(editId ? 'Product updated!' : 'Product added!');
        loadData();
        setIsModalOpen(false);
      } else {
        const errData = await response.json();
        toast.error(errData.message || 'Error saving product');
      }
    } catch (e) {
      toast.error('Error saving product');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await apiFetch(`/admin/products/${id}`, { method: 'DELETE' });
      toast.success("Product deleted");
      loadData();
    } catch (e) {
      toast.error("Error deleting product");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Products Management</h2>
        <button onClick={() => handleOpen()} className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-dark transition flex items-center gap-2">
          <span className="material-symbols-outlined">add</span> Add Product
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-500 border-b border-slate-100 uppercase text-xs">
            <tr>
              <th className="py-3 px-4">Name / SKU</th>
              <th className="py-3 px-4">Price (R/W)</th>
              <th className="py-3 px-4">Stock</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(products || []).map(p => (
              <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50">
                <td className="py-3 px-4">
                  <p className="font-semibold text-slate-800">{p.name}</p>
                  <p className="text-xs text-slate-400">{p.sku}</p>
                </td>
                <td className="py-3 px-4">${p.retail_price} / ${p.wholesale_price}</td>
                <td className="py-3 px-4">{p.stock}</td>
                <td className="py-3 px-4">
                  {p.is_active ? <span className="text-green-600 bg-green-100 px-2 py-1 rounded text-xs">Active</span> : <span className="text-red-600 bg-red-100 px-2 py-1 rounded text-xs">Inactive</span>}
                </td>
                <td className="py-3 px-4 text-right">
                  <button onClick={() => handleOpen(p)} className="text-blue-500 hover:text-blue-700 mx-2 material-symbols-outlined text-sm">edit</button>
                  <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:text-red-700 material-symbols-outlined text-sm">delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">{editId ? 'Edit Product' : 'Add Product'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium mb-1">Name</label><input required className="w-full border rounded p-2" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} /></div>
                <div><label className="block text-sm font-medium mb-1">SKU</label><input required className="w-full border rounded p-2" value={formData.sku} onChange={e => setFormData({ ...formData, sku: e.target.value })} /></div>
                <div>
                  <label className="block text-sm font-medium mb-1">Brand</label>
                  <select required className="w-full border rounded p-2" value={formData.brand_id} onChange={e => setFormData({ ...formData, brand_id: e.target.value })}>
                    <option value="">Select Brand</option>
                    {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select required className="w-full border rounded p-2" value={formData.category_id} onChange={e => setFormData({ ...formData, category_id: e.target.value })}>
                    <option value="">Select Category</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div><label className="block text-sm font-medium mb-1">Retail Price</label><input required type="number" step="0.01" className="w-full border rounded p-2" value={formData.retail_price} onChange={e => setFormData({ ...formData, retail_price: e.target.value })} /></div>
                <div><label className="block text-sm font-medium mb-1">Wholesale Price</label><input required type="number" step="0.01" className="w-full border rounded p-2" value={formData.wholesale_price} onChange={e => setFormData({ ...formData, wholesale_price: e.target.value })} /></div>
                <div><label className="block text-sm font-medium mb-1">Stock</label><input required type="number" className="w-full border rounded p-2" value={formData.stock} onChange={e => setFormData({ ...formData, stock: e.target.value })} /></div>
                <div><label className="block text-sm font-medium mb-1">Compatibility</label><input className="w-full border rounded p-2" value={formData.compatibility} onChange={e => setFormData({ ...formData, compatibility: e.target.value })} /></div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Product Image</label>
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

              <div><label className="block text-sm font-medium mb-1">Description</label><textarea className="w-full border rounded p-2 h-24" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} /></div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2"><input type="checkbox" checked={formData.is_featured} onChange={e => setFormData({ ...formData, is_featured: e.target.checked })} /> Featured</label>
                <label className="flex items-center gap-2"><input type="checkbox" checked={formData.is_active} onChange={e => setFormData({ ...formData, is_active: e.target.checked })} /> Active</label>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded text-slate-600">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary text-white rounded">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
