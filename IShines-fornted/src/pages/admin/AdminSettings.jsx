import React, { useEffect, useState } from 'react';
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
