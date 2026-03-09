const fs = require('fs');
const path = require('path');

const adminDir = path.join(__dirname, 'src', 'pages', 'admin');
if (!fs.existsSync(adminDir)) {
    fs.mkdirSync(adminDir, { recursive: true });
}

const components = {
    'AdminLayout.jsx': `import React, { useContext } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Toaster } from 'react-hot-toast';

export default function AdminLayout() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const menu = [
    { name: 'Dashboard', path: '/admin', icon: 'dashboard' },
    { name: 'Products', path: '/admin/products', icon: 'inventory_2' },
    { name: 'Categories', path: '/admin/categories', icon: 'category' },
    { name: 'Brands', path: '/admin/brands', icon: 'branding_watermark' },
    { name: 'Banners', path: '/admin/banners', icon: 'view_carousel' },
    { name: 'Menu Items', path: '/admin/menu', icon: 'menu_open' },
    { name: 'Orders', path: '/admin/orders', icon: 'shopping_cart' },
    { name: 'Users', path: '/admin/users', icon: 'group' },
    { name: 'Settings', path: '/admin/settings', icon: 'settings' },
  ];

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      <Toaster position="top-right" />
      <aside className="w-64 bg-slate-900 text-white flex flex-col hidden md:flex">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">admin_panel_settings</span>
            Admin Panel
          </h1>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1">
            {menu.map(item => (
              <li key={item.path}>
                <NavLink 
                  to={item.path} 
                  end={item.path === '/admin'}
                  className={({ isActive }) => \`flex items-center gap-3 px-6 py-3 transition-colors \${isActive ? 'bg-primary text-white border-r-4 border-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}\`}
                >
                  <span className="material-symbols-outlined">{item.icon}</span>
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-10 rounded-full bg-primary flex items-center justify-center font-bold">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div>
              <p className="text-sm font-semibold">{user?.name || 'Admin User'}</p>
              <p className="text-xs text-slate-400 truncate w-32">{user?.email}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 text-sm text-red-400 hover:bg-slate-800 rounded transition-colors"
          >
            <span className="material-symbols-outlined text-sm">logout</span>
            Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 md:hidden">
            <h1 className="text-xl font-bold">Admin Panel</h1>
            <button onClick={handleLogout} className="text-red-500 material-symbols-outlined">logout</button>
        </header>
        <div className="flex-1 overflow-y-auto p-6 lg:p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
`,
    'AdminDashboard.jsx': `import React, { useEffect, useState } from 'react';
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
            <p className="text-2xl font-bold">\${Number(stats?.total_revenue || 0).toFixed(2)}</p>
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
                <td className="py-3 px-6">\${Number(order.total).toFixed(2)}</td>
                <td className="py-3 px-6">
                  <span className={\`px-2 py-1 text-xs rounded font-medium \${
                    order.status === 'delivered' ? 'bg-green-100 text-green-700' : 
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'
                  }\`}>
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
`,
    'AdminProducts.jsx': `import React, { useEffect, useState } from 'react';
import { apiFetch } from '../../config/api';
import toast from 'react-hot-toast';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  
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
    } else {
      setEditId(null);
      setFormData(defaultForm);
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...formData, images: formData.images || [] };
    if(!data.slug) data.slug = data.name.toLowerCase().replace(/\\s+/g, '-');
    
    try {
      if (editId) {
        await apiFetch(\`/admin/products/\${editId}\`, { method: 'PUT', body: JSON.stringify(data) });
        toast.success("Product updated");
      } else {
        await apiFetch('/admin/products', { method: 'POST', body: JSON.stringify(data) });
        toast.success("Product created");
      }
      setIsModalOpen(false);
      loadData();
    } catch (e) {
      toast.error("Error saving product");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await apiFetch(\`/admin/products/\${id}\`, { method: 'DELETE' });
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
                <td className="py-3 px-4">\${p.retail_price} / \${p.wholesale_price}</td>
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
                <div><label className="block text-sm font-medium mb-1">Name</label><input required className="w-full border rounded p-2" value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})}/></div>
                <div><label className="block text-sm font-medium mb-1">SKU</label><input required className="w-full border rounded p-2" value={formData.sku} onChange={e=>setFormData({...formData, sku: e.target.value})}/></div>
                <div>
                  <label className="block text-sm font-medium mb-1">Brand</label>
                  <select required className="w-full border rounded p-2" value={formData.brand_id} onChange={e=>setFormData({...formData, brand_id: e.target.value})}>
                    <option value="">Select Brand</option>
                    {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select required className="w-full border rounded p-2" value={formData.category_id} onChange={e=>setFormData({...formData, category_id: e.target.value})}>
                    <option value="">Select Category</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div><label className="block text-sm font-medium mb-1">Retail Price</label><input required type="number" step="0.01" className="w-full border rounded p-2" value={formData.retail_price} onChange={e=>setFormData({...formData, retail_price: e.target.value})}/></div>
                <div><label className="block text-sm font-medium mb-1">Wholesale Price</label><input required type="number" step="0.01" className="w-full border rounded p-2" value={formData.wholesale_price} onChange={e=>setFormData({...formData, wholesale_price: e.target.value})}/></div>
                <div><label className="block text-sm font-medium mb-1">Stock</label><input required type="number" className="w-full border rounded p-2" value={formData.stock} onChange={e=>setFormData({...formData, stock: e.target.value})}/></div>
                <div><label className="block text-sm font-medium mb-1">Compatibility</label><input className="w-full border rounded p-2" value={formData.compatibility} onChange={e=>setFormData({...formData, compatibility: e.target.value})}/></div>
              </div>
              <div><label className="block text-sm font-medium mb-1">Description</label><textarea className="w-full border rounded p-2 h-24" value={formData.description} onChange={e=>setFormData({...formData, description: e.target.value})}/></div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2"><input type="checkbox" checked={formData.is_featured} onChange={e=>setFormData({...formData, is_featured: e.target.checked})}/> Featured</label>
                <label className="flex items-center gap-2"><input type="checkbox" checked={formData.is_active} onChange={e=>setFormData({...formData, is_active: e.target.checked})}/> Active</label>
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
`,
    'AdminCategories.jsx': `import React, { useEffect, useState } from 'react';
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
    if(!data.slug) data.slug = data.name.toLowerCase().replace(/\\s+/g, '-');
    try {
      if (editId) {
        await apiFetch(\`/admin/categories/\${editId}\`, { method: 'PUT', body: JSON.stringify(data) });
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
      await apiFetch(\`/admin/categories/\${id}\`, { method: 'DELETE' });
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
`,
    'AdminBrands.jsx': `import React, { useEffect, useState } from 'react';
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
    if(!data.slug) data.slug = data.name.toLowerCase().replace(/\\s+/g, '-');
    try {
      if (editId) await apiFetch(\`/admin/brands/\${editId}\`, { method: 'PUT', body: JSON.stringify(data) });
      else await apiFetch('/admin/brands', { method: 'POST', body: JSON.stringify(data) });
      toast.success(editId ? "Brand updated" : "Brand created");
      setIsModalOpen(false);
      loadData();
    } catch (e) { toast.error("Error saving brand"); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this brand?")) return;
    try { await apiFetch(\`/admin/brands/\${id}\`, { method: 'DELETE' }); toast.success("Brand deleted"); loadData(); } catch (e) { toast.error("Error deleting brand"); }
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
`,
    'AdminBanners.jsx': `import React, { useEffect, useState } from 'react';
import { apiFetch } from '../../config/api';
import toast from 'react-hot-toast';

export default function AdminBanners() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
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
    if (item) { setEditId(item.id); setFormData(item); } 
    else { setEditId(null); setFormData(defaultForm); }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) await apiFetch(\`/admin/banners/\${editId}\`, { method: 'PUT', body: JSON.stringify(formData) });
      else await apiFetch('/admin/banners', { method: 'POST', body: JSON.stringify(formData) });
      toast.success(editId ? "Banner updated" : "Banner created");
      setIsModalOpen(false); loadData();
    } catch (e) { toast.error("Error saving banner"); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this banner?")) return;
    try { await apiFetch(\`/admin/banners/\${id}\`, { method: 'DELETE' }); toast.success("Deleted"); loadData(); } catch (e) { toast.error("Error deleting"); }
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
          <div className="bg-white rounded-xl p-6 w-[500px]">
            <h3 className="text-xl font-bold mb-4">{editId ? 'Edit Banner' : 'Add Banner'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><label className="block text-sm font-medium mb-1">Title</label><input required className="w-full border rounded p-2" value={formData.title} onChange={e=>setFormData({...formData, title: e.target.value})}/></div>
              <div><label className="block text-sm font-medium mb-1">Subtitle</label><input className="w-full border rounded p-2" value={formData.subtitle} onChange={e=>setFormData({...formData, subtitle: e.target.value})}/></div>
              <div><label className="block text-sm font-medium mb-1">Image URL</label><input className="w-full border rounded p-2" value={formData.image||''} onChange={e=>setFormData({...formData, image: e.target.value})}/></div>
              <div><label className="block text-sm font-medium mb-1">Link Destination</label><input className="w-full border rounded p-2" value={formData.link||''} onChange={e=>setFormData({...formData, link: e.target.value})}/></div>
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
`,
    'AdminMenu.jsx': `import React, { useEffect, useState } from 'react';
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
      if (editId) await apiFetch(\`/admin/menu-items/\${editId}\`, { method: 'PUT', body: JSON.stringify(data) });
      else await apiFetch('/admin/menu-items', { method: 'POST', body: JSON.stringify(data) });
      toast.success(editId ? "Updated" : "Created");
      setIsModalOpen(false); loadData();
    } catch (e) { toast.error("Error saving"); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this menu item?")) return;
    try { await apiFetch(\`/admin/menu-items/\${id}\`, { method: 'DELETE' }); toast.success("Deleted"); loadData(); } catch (e) { toast.error("Error deleting"); }
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
`,
    'AdminOrders.jsx': `import React, { useEffect, useState } from 'react';
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
      await apiFetch(\`/admin/orders/\${id}\`, { method: 'PUT', body: JSON.stringify({ status }) });
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
                <td className="py-3 px-4">{o.user_id ? \`User #\${o.user_id}\` : 'Guest'}</td>
                <td className="py-3 px-4 font-semibold">\${Number(o.total).toFixed(2)}</td>
                <td className="py-3 px-4">{new Date(o.created_at).toLocaleDateString()}</td>
                <td className="py-3 px-4">
                  <span className={\`px-2 py-1 rounded text-xs font-bold uppercase \${o.status === 'delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}\`}>{o.status}</span>
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
`,
    'AdminUsers.jsx': `import React, { useEffect, useState } from 'react';
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
      await apiFetch(\`/admin/users/\${id}\`, { method: 'PUT', body: JSON.stringify({ role }) });
      toast.success("User role updated");
      loadData();
    } catch (e) { toast.error("Error updating role"); }
  };

  const deleteUser = async (id) => {
      if(!window.confirm("Delete this user?")) return;
      try {
        await apiFetch(\`/admin/users/\${id}\`, { method: 'DELETE' });
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
`,
    'AdminSettings.jsx': `import React, { useEffect, useState } from 'react';
import { apiFetch } from '../../config/api';
import toast from 'react-hot-toast';

export default function AdminSettings() {
  const [settings, setSettings] = useState({
      site_name: 'iShine Wireless',
      footer_text: 'Your trusted B2B source for LCD screens.',
      contact_email: 'sales@ishinewireless.com',
      contact_phone: '(469) 260-2475',
      enable_featured: true,
      enable_latest: true
  });
  const [loading, setLoading] = useState(false);

  const handleSave = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
          await apiFetch('/admin/sections/site_settings', { method: 'PUT', body: JSON.stringify(settings) });
          toast.success("Settings saved successfully!");
      } catch (err) {
          toast.error("Error saving settings");
      } finally {
          setLoading(false);
      }
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Site Settings</h2>
        <p className="text-slate-500 text-sm">Manage global settings and homepage sections.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm space-y-4">
            <h3 className="font-bold border-b pb-2 mb-4">General Info</h3>
            <div><label className="block text-sm font-medium mb-1">Site Name</label><input required className="w-full border rounded p-2 focus:ring-primary" value={settings.site_name} onChange={e=>setSettings({...settings, site_name: e.target.value})}/></div>
            <div><label className="block text-sm font-medium mb-1">Footer Text</label><textarea className="w-full border rounded p-2 focus:ring-primary" value={settings.footer_text} onChange={e=>setSettings({...settings, footer_text: e.target.value})}/></div>
            <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium mb-1">Contact Email</label><input type="email" className="w-full border rounded p-2 focus:ring-primary" value={settings.contact_email} onChange={e=>setSettings({...settings, contact_email: e.target.value})}/></div>
                <div><label className="block text-sm font-medium mb-1">Contact Phone</label><input className="w-full border rounded p-2 focus:ring-primary" value={settings.contact_phone} onChange={e=>setSettings({...settings, contact_phone: e.target.value})}/></div>
            </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm space-y-4">
            <h3 className="font-bold border-b pb-2 mb-4">Homepage Sections</h3>
            <label className="flex items-center gap-3">
                <input type="checkbox" checked={settings.enable_featured} onChange={e=>setSettings({...settings, enable_featured: e.target.checked})} className="size-5 text-primary rounded" />
                <span>Enable "Featured Products" Section</span>
            </label>
            <label className="flex items-center gap-3">
                <input type="checkbox" checked={settings.enable_latest} onChange={e=>setSettings({...settings, enable_latest: e.target.checked})} className="size-5 text-primary rounded" />
                <span>Enable "Latest Arrivals" Section</span>
            </label>
        </div>

        <button type="submit" disabled={loading} className="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-bold w-full transition-colors disabled:opacity-50">
            {loading ? 'Saving...' : 'Save All Settings'}
        </button>
      </form>
    </div>
  );
}
`
};

for (const [file, content] of Object.entries(components)) {
    fs.writeFileSync(path.join(adminDir, file), content);
}
console.log('Admin panel components created.');
