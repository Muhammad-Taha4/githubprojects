import { useState, useEffect, useContext } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { apiFetch } from "../config/api";
import { AuthContext } from "../context/AuthContext";
import toast from 'react-hot-toast';
import { addToCart, toggleWishlist, isInWishlist } from "../utils/productHelpers";

const badgeColors = {
  purple: "bg-purple-100 text-purple-600",
  blue: "bg-primary-lighter text-primary",
  red: "bg-red-100 text-red-600",
  teal: "bg-teal-100 text-teal-600",
  orange: "bg-orange-100 text-orange-600",
  green: "bg-green-100 text-green-600",
  emerald: "bg-emerald-100 text-emerald-600",
};

export default function Shop() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlistRefresh, setWishlistRefresh] = useState(0);

  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    brand: searchParams.get('brand') || '',
    model: searchParams.get('model') || '',
    sort: 'latest',
    page: 1,
  });

  const [pagination, setPagination] = useState({});

  const [selectedItems, setSelectedItems] = useState([]);
  const [hideOutOfStock, setHideOutOfStock] = useState(false);
  const [quantities, setQuantities] = useState({});

  const [expandedSections, setExpandedSections] = useState({
    category: true,
    brand: true,
    model: false,
    quality: true
  });

  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      search: searchParams.get('search') || '',
      category: searchParams.get('category') || '',
      brand: searchParams.get('brand') || '',
      model: searchParams.get('model') || '',
      page: 1
    }));
  }, [searchParams]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (filters.search) params.append('search', filters.search);
        if (filters.category) params.append('category', filters.category);
        if (filters.brand) params.append('brand', filters.brand);
        if (filters.model) params.append('model', filters.model);
        params.append('sort', filters.sort);
        params.append('page', filters.page);

        const data = await apiFetch(`/products?${params.toString()}`);
        setProducts(data.data || data);
        setPagination({
          current_page: data.current_page,
          last_page: data.last_page,
          total: data.total
        });
      } catch (e) { toast.error("Error loading products"); }
      setLoading(false);
    };
    fetchProducts();
  }, [filters]);

  useEffect(() => {
    apiFetch('/categories').then(setCategories);
    apiFetch('/brands').then(setBrands);

    const handleWishUpdate = () => setWishlistRefresh(v => v + 1);
    window.addEventListener('wishlistUpdate', handleWishUpdate);
    return () => window.removeEventListener('wishlistUpdate', handleWishUpdate);
  }, []);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleItemSelection = (id) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === products.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(products.map(p => p.id));
    }
  };

  const updateQuantity = (id, delta) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta)
    }));
  };

  const removeFilter = (filterKey) => {
    setFilters(prev => ({ ...prev, [filterKey]: '', page: 1 }));
  };

  const setPage = (pageNumber) => {
    setFilters(prev => ({ ...prev, page: pageNumber }));
  };

  const handleToggleWishlist = (e, p) => {
    e.preventDefault();
    toggleWishlist(p);
  };

  const handleAddToCartClick = (p) => {
    const qty = quantities[p.id] || 1;
    addToCart(p, qty);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="mb-4">
          <p className="text-sm text-slate-400 font-bold uppercase tracking-widest text-[10px]">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-600">Shop</span>
          </p>
        </nav>

        {/* Title Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tight">Products</h1>
          <p className="text-slate-500 mt-1 font-medium">Browse our extensive catalog of premium repair parts and tools.</p>

          {/* Active Filter Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {filters.search && (
              <span className="bg-primary text-white rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-primary/20">
                Search: {filters.search}
                <button onClick={() => removeFilter('search')} className="hover:rotate-90 transition-transform">
                  <span className="material-symbols-outlined text-[14px] block">close</span>
                </button>
              </span>
            )}
            {filters.category && (
              <span className="bg-slate-900 text-white rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-lg">
                Category: {filters.category}
                <button onClick={() => removeFilter('category')} className="hover:rotate-90 transition-transform">
                  <span className="material-symbols-outlined text-[14px] block">close</span>
                </button>
              </span>
            )}
            {filters.brand && (
              <span className="bg-slate-900 text-white rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-lg">
                Brand: {filters.brand}
                <button onClick={() => removeFilter('brand')} className="hover:rotate-90 transition-transform">
                  <span className="material-symbols-outlined text-[14px] block">close</span>
                </button>
              </span>
            )}
            {filters.model && (
              <span className="bg-blue-600 text-white rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-lg">
                Model: {filters.model}
                <button onClick={() => removeFilter('model')} className="hover:rotate-90 transition-transform">
                  <span className="material-symbols-outlined text-[14px] block">close</span>
                </button>
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT SIDEBAR FILTERS */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-[32px] border border-slate-100 p-8 sticky top-24 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-black text-slate-900 uppercase tracking-widest text-sm">Filter Results</h2>
                <button onClick={() => setFilters({ search: '', category: '', brand: '', sort: 'latest', page: 1 })} className="text-primary text-[10px] font-black uppercase tracking-widest hover:underline">Clear All</button>
              </div>

              {/* Stock Toggle */}
              <div className="flex items-center justify-between mb-10 pb-8 border-b border-slate-50">
                <span className="text-xs font-black text-slate-900 uppercase tracking-widest">Hide Out of Stock</span>
                <button
                  onClick={() => setHideOutOfStock(!hideOutOfStock)}
                  className={`w-12 h-6 rounded-full relative transition-all duration-500 ${hideOutOfStock ? 'bg-primary shadow-lg shadow-primary/30' : 'bg-slate-200'}`}
                >
                  <div className={`absolute top-1 size-4 bg-white rounded-full shadow-sm transition-all duration-500 ${hideOutOfStock ? 'left-7' : 'left-1'}`}></div>
                </button>
              </div>

              {/* Collapsible Sections */}
              <div className="space-y-10">
                {/* 1. CATEGORY */}
                <div>
                  <button onClick={() => toggleSection('category')} className="w-full flex items-center justify-between font-black text-[11px] text-slate-900 uppercase tracking-widest mb-6">
                    Repair Categories
                    <span className={`material-symbols-outlined transition-all duration-500 ${expandedSections.category ? 'rotate-180 text-primary' : 'text-slate-400'}`}>expand_more</span>
                  </button>
                  {expandedSections.category && (
                    <div className="space-y-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                      {categories.map(cat => (
                        <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={filters.category === cat.slug}
                            onChange={() => setFilters(prev => ({ ...prev, category: prev.category === cat.slug ? '' : cat.slug, page: 1 }))}
                            className="size-5 rounded-lg border-2 border-slate-100 text-primary focus:ring-primary transition-all group-hover:border-primary"
                          />
                          <span className={`text-[11px] font-black uppercase tracking-widest transition-colors ${filters.category === cat.slug ? 'text-primary' : 'text-slate-500 group-hover:text-slate-900'}`}>{cat.name}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* 2. BRAND */}
                <div>
                  <button onClick={() => toggleSection('brand')} className="w-full flex items-center justify-between font-black text-[11px] text-slate-900 uppercase tracking-widest mb-6">
                    Brands
                    <span className={`material-symbols-outlined transition-all duration-500 ${expandedSections.brand ? 'rotate-180 text-primary' : 'text-slate-400'}`}>expand_more</span>
                  </button>
                  {expandedSections.brand && (
                    <div className="space-y-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                      {brands.map(brand => (
                        <label key={brand.id} className="flex items-center gap-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={filters.brand === brand.slug}
                            onChange={() => setFilters(prev => ({ ...prev, brand: prev.brand === brand.slug ? '' : brand.slug, page: 1 }))}
                            className="size-5 rounded-lg border-2 border-slate-100 text-primary focus:ring-primary transition-all group-hover:border-primary"
                          />
                          <span className={`text-[11px] font-black uppercase tracking-widest transition-colors ${filters.brand === brand.slug ? 'text-primary' : 'text-slate-500 group-hover:text-slate-900'}`}>{brand.name}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* 5. PRICE RANGE */}
                <div>
                  <h3 className="font-black text-[11px] text-slate-900 uppercase tracking-widest mb-6">Price Range</h3>
                  <div className="flex items-center gap-3">
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400">$</span>
                      <input type="number" placeholder="Min" className="w-full text-[10px] font-black pl-6 pr-3 py-3 border-2 border-slate-50 rounded-2xl outline-none focus:border-primary bg-slate-50 transition-all" />
                    </div>
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400">$</span>
                      <input type="number" placeholder="Max" className="w-full text-[10px] font-black pl-6 pr-3 py-3 border-2 border-slate-50 rounded-2xl outline-none focus:border-primary bg-slate-50 transition-all" />
                    </div>
                  </div>
                  <button className="w-full mt-4 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest py-3 rounded-2xl hover:bg-primary transition-all shadow-xl active:scale-95">Apply Filter</button>
                </div>
              </div>
            </div>
          </aside>

          {/* RIGHT PRODUCT GRID AREA */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-[32px] border border-slate-100 p-6 mb-8 flex flex-wrap items-center justify-between gap-6 shadow-sm">
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-3 text-[10px] font-black text-slate-900 uppercase tracking-widest cursor-pointer group">
                  <input
                    type="checkbox"
                    className="size-5 rounded-lg border-2 border-slate-100 transition-all group-hover:border-primary"
                    checked={selectedItems.length === products.length && products.length > 0}
                    onChange={handleSelectAll}
                  />
                  Select All
                </label>
                <div className="h-4 w-px bg-slate-100"></div>
                <span className="text-primary text-[10px] font-black uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">{selectedItems.length} Selected</span>
              </div>

              <div className="flex items-center gap-8 ml-auto">
                <div className="flex items-center gap-2 group">
                  <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Sort:</span>
                  <select
                    value={filters.sort}
                    onChange={e => setFilters(prev => ({ ...prev, sort: e.target.value, page: 1 }))}
                    className="text-[10px] font-black uppercase tracking-widest text-slate-900 border-none bg-transparent focus:ring-0 cursor-pointer"
                  >
                    <option value="latest">Newest</option>
                    <option value="price_low">Price Low</option>
                    <option value="price_high">Price High</option>
                  </select>
                </div>
                <div className="flex items-center bg-slate-50 rounded-2xl p-1 border-2 border-slate-100">
                  <button className="p-2.5 bg-white text-primary shadow-xl rounded-xl">
                    <span className="material-symbols-outlined text-[20px] block">grid_view</span>
                  </button>
                  <button className="p-2.5 text-slate-400 hover:text-slate-900 transition-colors">
                    <span className="material-symbols-outlined text-[20px] block">view_list</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-[32px] h-96 animate-pulse" />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="py-20 text-center bg-white rounded-[40px] border-2 border-dashed border-slate-100">
                <span className="material-symbols-outlined text-6xl text-slate-100 mb-4">search_off</span>
                <p className="text-slate-400 font-black uppercase tracking-widest text-sm">No products found matching your filters</p>
                <button
                  onClick={() => setFilters({ search: '', category: '', brand: '', sort: 'latest', page: 1 })}
                  className="mt-6 bg-slate-900 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all shadow-xl"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((p) => {
                  const pImgs = p.images ? (typeof p.images === 'string' ? JSON.parse(p.images) : p.images) : [];
                  const pImg = pImgs[0] || '/placeholder.png';
                  const inWish = isInWishlist(p.id);

                  return (
                    <div
                      key={p.id}
                      className="group bg-white rounded-[32px] border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col relative overflow-hidden"
                    >
                      {/* Selection Checkbox */}
                      <input
                        type="checkbox"
                        className="absolute top-6 left-6 z-20 size-6 rounded-xl border-2 border-slate-100 text-primary focus:ring-primary shadow-sm bg-white cursor-pointer transition-all"
                        checked={selectedItems.includes(p.id)}
                        onChange={() => toggleItemSelection(p.id)}
                      />

                      {/* Wishlist Button */}
                      <button
                        onClick={(e) => handleToggleWishlist(e, p)}
                        className={`absolute top-6 right-6 z-20 size-10 rounded-2xl shadow-xl flex items-center justify-center transition-all duration-300 active:scale-90 ${inWish ? 'bg-primary text-white scale-110' : 'bg-white text-slate-300 hover:text-red-500'}`}
                      >
                        <span className={`material-symbols-outlined text-xl ${inWish ? 'fill-current' : ''}`}>favorite</span>
                      </button>

                      {/* Image Area */}
                      <Link to={`/shop/${p.slug}`} className="block">
                        <div className="h-64 bg-slate-50/50 flex items-center justify-center relative p-8 overflow-hidden group-hover:bg-white transition-colors duration-500">
                          <img src={pImg} alt={p.name} className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110" />
                        </div>
                      </Link>

                      {/* Card Body */}
                      <div className="p-8 flex flex-col flex-1">
                        <div className="flex items-center justify-between mb-4">
                          <p className="text-[10px] text-primary font-black uppercase tracking-widest">{p.brand?.name || 'GENERIC'}</p>
                          <span className={`text-[9px] font-black px-2 py-1 rounded-full uppercase tracking-tighter ${p.stock > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                            {p.stock > 0 ? 'INSTOCK' : 'OUTSTOCK'}
                          </span>
                        </div>

                        <Link to={`/shop/${p.slug}`}>
                          <h3 className="font-black text-slate-900 text-sm leading-snug mb-3 line-clamp-2 h-10 group-hover:text-primary transition-colors">
                            {p.name}
                          </h3>
                        </Link>

                        <div className="mb-6 flex items-center justify-between">
                          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">SKU: {p.sku}</p>
                        </div>

                        <div className="mb-8">
                          <div className="flex items-baseline gap-2">
                            <span className="text-slate-900 font-black text-2xl">${parseFloat(p.retail_price).toFixed(2)}</span>
                            <span className="text-slate-400 text-[10px] font-black line-through">${(parseFloat(p.retail_price) * 1.2).toFixed(2)}</span>
                          </div>
                          <div className="mt-1 flex items-center gap-2">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Wholesale:</span>
                            <span className="text-xs font-black text-slate-900">${parseFloat(p.wholesale_price).toFixed(2)}</span>
                          </div>
                        </div>

                        {/* Bottom Actions */}
                        <div className="flex items-center gap-3 mt-auto">
                          <div className="flex items-center border-2 border-slate-50 rounded-2xl overflow-hidden bg-slate-50 h-12 shadow-sm">
                            <button
                              onClick={() => updateQuantity(p.id, -1)}
                              className="px-4 text-slate-500 hover:bg-white hover:text-primary transition-all font-black"
                            >
                              -
                            </button>
                            <span className="w-8 text-center text-xs font-black text-slate-900">{quantities[p.id] || 1}</span>
                            <button
                              onClick={() => updateQuantity(p.id, 1)}
                              className="px-4 text-slate-500 hover:bg-white hover:text-primary transition-all font-black"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => handleAddToCartClick(p)}
                            className="flex-1 bg-slate-900 hover:bg-primary text-white font-black uppercase tracking-widest h-12 rounded-2xl transition-all shadow-xl active:scale-95 text-[10px] flex items-center justify-center gap-2 hover:shadow-primary/30"
                          >
                            <span className="material-symbols-outlined text-lg">shopping_cart</span>
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Pagination */}
            {pagination.last_page > 1 && (
              <div className="mt-16 flex justify-center pb-10">
                <nav className="flex items-center gap-3 bg-white p-2 rounded-3xl border border-slate-100 shadow-sm">
                  <button
                    disabled={pagination.current_page === 1}
                    onClick={() => setPage(pagination.current_page - 1)}
                    className="size-10 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-slate-50 rounded-2xl transition-all disabled:opacity-30 active:scale-90"
                  >
                    <span className="material-symbols-outlined">chevron_left</span>
                  </button>
                  {[...Array(pagination.last_page)].map((_, i) => {
                    const page = i + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => setPage(page)}
                        className={`size-10 font-black text-xs rounded-2xl transition-all ${pagination.current_page === page ? 'bg-primary text-white shadow-xl shadow-primary/30 scale-110' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'}`}
                      >
                        {page}
                      </button>
                    )
                  })}
                  <button
                    disabled={pagination.current_page === pagination.last_page}
                    onClick={() => setPage(pagination.current_page + 1)}
                    className="size-10 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-slate-50 rounded-2xl transition-all disabled:opacity-30 active:scale-90"
                  >
                    <span className="material-symbols-outlined">chevron_right</span>
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
