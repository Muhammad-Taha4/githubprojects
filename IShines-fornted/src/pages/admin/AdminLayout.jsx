import React, { useContext } from 'react';
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
                  className={({ isActive }) => `flex items-center gap-3 px-6 py-3 transition-colors ${isActive ? 'bg-primary text-white border-r-4 border-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
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
