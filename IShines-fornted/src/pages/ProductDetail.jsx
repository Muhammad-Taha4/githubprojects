import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { apiFetch } from '../config/api';
import toast from 'react-hot-toast';
import { addToCart, toggleWishlist, isInWishlist } from "../utils/productHelpers";

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [wishlistRefresh, setWishlistRefresh] = useState(0);

  useEffect(() => {
    setLoading(true);
    apiFetch(`/products/${slug}`)
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        toast.error('Product not found');
      });

    const handleWishUpdate = () => setWishlistRefresh(v => v + 1);
    window.addEventListener('wishlistUpdate', handleWishUpdate);
    return () => window.removeEventListener('wishlistUpdate', handleWishUpdate);
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center p-20">
        <div className="flex flex-col items-center gap-4">
          <div className="size-12 border-4 border-slate-200 border-t-primary rounded-full animate-spin"></div>
          <p className="font-black text-slate-400 uppercase tracking-widest text-[10px]">Fetching Tech Specs...</p>
        </div>
      </div>
      <Footer />
    </div>
  );

  if (!product) return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center p-20 text-center">
        <div className="bg-white p-12 rounded-[40px] shadow-sm border border-slate-100 max-w-md">
          <span className="material-symbols-outlined text-6xl text-slate-200 mb-6 font-thin">search_off</span>
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-4">Item Not Found</h2>
          <p className="text-slate-400 font-medium mb-8">The professional component you are looking for does not exist or has been retired.</p>
          <Link to="/shop" className="bg-primary text-white px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-blue-200 block hover:bg-slate-900 transition-all">Back to Shop</Link>
        </div>
      </div>
      <Footer />
    </div>
  );

  const images = product.images
    ? (typeof product.images === 'string' ? JSON.parse(product.images) : product.images)
    : [];

  if (images.length === 0) images.push('/placeholder-product.png');

  const inWish = isInWishlist(product.id);

  const getPriceForQty = (qty) => {
    if (qty >= 21) return (product.wholesale_price * 0.85).toFixed(2);
    if (qty >= 6) return product.wholesale_price;
    return product.retail_price;
  };

  const handleAddToCartClick = () => {
    addToCart(product, quantity);
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
  };

  return (
    <div className="bg-[#fcfdfe] min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-12 max-w-7xl">
        {/* Breadcrumb */}
        <nav className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-12 flex items-center gap-3">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <div className="size-1 bg-slate-300 rounded-full"></div>
          <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
          <div className="size-1 bg-slate-300 rounded-full"></div>
          <span className="text-slate-900 truncate max-w-[200px]">{product.name}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Images Section */}
          <div className="lg:w-[55%] flex flex-col md:flex-row gap-6">
            {images.length > 1 && (
              <div className="order-2 md:order-1 flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto max-h-[600px] no-scrollbar">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`size-20 bg-white rounded-2xl border-2 shrink-0 transition-all duration-300 p-2 overflow-hidden flex items-center justify-center shadow-sm ${selectedImage === i ? 'border-primary ring-4 ring-blue-50' : 'border-slate-50 hover:border-slate-200 grayscale-0'}`}
                  >
                    <img src={img} alt={`Thumb ${i}`} className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
            <div className="order-1 md:order-2 flex-grow aspect-square bg-white rounded-[40px] shadow-sm border border-slate-50 flex items-center justify-center p-12 relative overflow-hidden group">
              <img src={images[selectedImage]} alt={product.name} className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-110" />
              <button
                onClick={handleToggleWishlist}
                className={`absolute top-8 right-8 size-12 rounded-[20px] shadow-2xl flex items-center justify-center transition-all duration-300 active:scale-90 z-20 ${inWish ? 'bg-primary text-white scale-110' : 'bg-white text-slate-300 hover:text-red-500 scale-100'}`}
              >
                <span className={`material-symbols-outlined text-[24px] ${inWish ? 'fill-current' : ''}`}>favorite</span>
              </button>
            </div>
          </div>

          {/* Product Info Section */}
          <div className="lg:w-[45%] flex flex-col pt-4">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-100">{product.brand?.name} Professional</span>
                {product.stock > 0 ? (
                  <span className="flex items-center gap-1.5 text-green-600 text-[10px] font-black uppercase tracking-widest bg-green-50 px-3 py-1.5 rounded-xl border border-green-100">
                    <span className="size-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    Available
                  </span>
                ) : (
                  <span className="text-red-500 text-[10px] font-black uppercase tracking-widest bg-red-50 px-3 py-1.5 rounded-xl border border-red-100">Out of Stock</span>
                )}
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">#{product.sku}</span>
            </div>

            <h1 className="text-4xl font-black text-slate-900 mb-8 leading-[1.1] tracking-tight">{product.name}</h1>

            {product.compatibility && (
              <div className="mb-10 bg-[#f8fafc] p-6 rounded-3xl border border-slate-100">
                <div className="flex items-center gap-3 mb-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">build_circle</span>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Device Compatibility</span>
                </div>
                <p className="text-sm font-black text-slate-900 pl-8">{product.compatibility}</p>
              </div>
            )}

            {/* Wholesale Pricing Table */}
            <div className="mb-10 overflow-hidden rounded-[32px] border border-slate-100 shadow-sm bg-white">
              <div className="bg-slate-900 p-6 flex items-center justify-between">
                <h3 className="font-black text-white uppercase tracking-widest text-[10px]">Tier-Based Wholesale Inventory</h3>
                <div className="text-[9px] font-black text-slate-400 uppercase">{product.stock} Units ready for dispatch</div>
              </div>
              <table className="w-full text-sm">
                <thead className="bg-[#f8fafc] text-slate-400 uppercase text-[9px] font-black tracking-widest border-b border-slate-50">
                  <tr>
                    <th className="py-4 px-6 text-left">Quantity Range</th>
                    <th className="py-4 px-6 text-left">Unit Rate</th>
                    <th className="py-4 px-6 text-right">Potential Savvy</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 font-bold text-slate-600">
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="py-5 px-6">1 - 5 Units</td>
                    <td className="py-5 px-6 text-slate-900">${parseFloat(product.retail_price).toFixed(2)}</td>
                    <td className="py-5 px-6 text-right text-slate-300">-</td>
                  </tr>
                  <tr className="bg-blue-50/20 hover:bg-blue-50/40 transition-colors">
                    <td className="py-5 px-6 text-primary">6 - 20 Units</td>
                    <td className="py-5 px-6 text-slate-900 font-black">${parseFloat(product.wholesale_price).toFixed(2)}</td>
                    <td className="py-5 px-6 text-right text-green-600 font-black">
                      -{Math.round((1 - product.wholesale_price / product.retail_price) * 100)}% Off
                    </td>
                  </tr>
                  <tr className="bg-green-50/20 hover:bg-green-50/40 transition-colors">
                    <td className="py-5 px-6 text-green-700 font-black">21+ Units (Bulk)</td>
                    <td className="py-5 px-6 text-green-700 font-black">${(product.wholesale_price * 0.85).toFixed(2)}</td>
                    <td className="py-5 px-6 text-right text-green-600 font-black">
                      -{Math.round((1 - (product.wholesale_price * 0.85) / product.retail_price) * 100)}% Off
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Add to Cart Area */}
            <div className="mt-auto border-t border-slate-100 pt-10">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <span className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Calculated Total</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-slate-900 tracking-tighter">${(getPriceForQty(quantity) * quantity).toFixed(2)}</span>
                    <span className="text-[10px] text-slate-400 font-black uppercase">USD</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="flex items-center bg-white border-2 border-slate-100 rounded-[24px] overflow-hidden h-16 w-full sm:w-44 shadow-sm">
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="flex-1 text-slate-400 hover:text-primary transition-colors font-black text-2xl h-full">-</button>
                  <span className="w-14 text-center font-black text-slate-900 text-lg">{quantity}</span>
                  <button onClick={() => setQuantity(q => q + 1)} className="flex-1 text-slate-400 hover:text-primary transition-colors font-black text-2xl h-full">+</button>
                </div>

                <button
                  onClick={handleAddToCartClick}
                  disabled={product.stock <= 0}
                  className="w-full sm:flex-1 bg-slate-900 hover:bg-primary disabled:bg-slate-100 disabled:text-slate-300 disabled:cursor-not-allowed text-white font-black text-[12px] uppercase tracking-widest h-16 px-10 rounded-[24px] transition-all shadow-2xl hover:shadow-primary/40 active:scale-[0.98] flex items-center justify-center gap-3 group"
                >
                  <span className="material-symbols-outlined text-2xl group-hover:rotate-12 transition-transform">shopping_basket</span>
                  Commit to Cart
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Details and Specs Tab */}
        <div className="mt-24">
          <div className="flex items-center gap-8 mb-12 border-b border-slate-100 pb-10">
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Product Specifications</h2>
              <div className="h-1.5 w-16 bg-primary rounded-full shadow-lg shadow-primary/20"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <div className="prose max-w-none">
                <p className="text-slate-500 font-bold leading-[1.8] text-base whitespace-pre-line bg-white p-10 rounded-[40px] border border-slate-50 shadow-sm">
                  {product.description || 'No detailed architectural description available for this professional component.'}
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-slate-900 p-10 rounded-[40px] text-white">
                <span className="material-symbols-outlined text-4xl mb-6 text-primary font-thin">verified</span>
                <h4 className="font-black uppercase tracking-widest text-[10px] mb-4 text-slate-400">Quality Assurance</h4>
                <p className="text-sm font-medium leading-relaxed opacity-80">Every component is tested in-house using professional diagnostic equipment before being cataloged in our inventory.</p>
              </div>

              <div className="bg-primary p-10 rounded-[40px] text-white shadow-2xl shadow-primary/30">
                <span className="material-symbols-outlined text-4xl mb-6 text-white font-thin">local_shipping</span>
                <h4 className="font-black uppercase tracking-widest text-[10px] mb-4 text-blue-100">Rapid Fulfillment</h4>
                <p className="text-sm font-medium leading-relaxed">Orders confirmed before 2 PM EST are dispatched on the same business day with premium tracking enabled.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
