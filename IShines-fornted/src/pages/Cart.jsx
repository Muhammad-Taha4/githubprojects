import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import toast from "react-hot-toast";

export default function Cart() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('ishine_cart') || '[]');
    setItems(cartData);
    setLoading(false);
  }, []);

  const saveCart = (newItems) => {
    setItems(newItems);
    localStorage.setItem('ishine_cart', JSON.stringify(newItems));
    // Dispatch event to update navbar count
    window.dispatchEvent(new Event('storage'));
  };

  const updateQty = (id, delta) => {
    const newItems = items.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, (item.quantity || 1) + delta) } : item
    );
    saveCart(newItems);
  };

  const removeItem = (id) => {
    const newItems = items.filter(item => item.id !== id);
    saveCart(newItems);
    toast.success('Item removed from cart');
  };

  const clearCart = () => {
    saveCart([]);
    toast.success('Cart cleared');
  };

  const getSubtotal = () => {
    return items.reduce((acc, item) => {
      // Logic for wholesale vs retail pricing in cart
      const price = item.quantity >= 6 ? parseFloat(item.wholesale_price) : parseFloat(item.retail_price);
      return acc + (price * item.quantity);
    }, 0);
  };

  const totalQty = items.reduce((acc, item) => acc + (item.quantity || 1), 0);
  const subtotal = getSubtotal();

  // 5% discount if subtotal > 1000
  const discountThreshold = 1000;
  const discountRate = 0.05;
  const volumeDiscount = subtotal > discountThreshold ? subtotal * discountRate : 0;

  const shippingCharge = items.length > 0 ? 15.00 : 0;
  const totalAmount = subtotal - volumeDiscount + shippingCharge;

  // Free shipping over 1500
  const freeShippingThreshold = 1500;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - totalAmount);
  const freeShippingProgress = Math.min(100, (totalAmount / freeShippingThreshold) * 100);

  if (loading) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tight">Your Cart</h1>
            <div className="flex items-center gap-3 mt-3">
              <p className="text-sm text-slate-500 font-bold uppercase tracking-widest text-[10px]">
                {items.length} {items.length === 1 ? 'Item' : 'Items'} in your selection
              </p>
              <div className="size-1 bg-slate-300 rounded-full"></div>
              <Link to="/shop" className="text-primary text-[10px] uppercase font-black tracking-[0.1em] hover:underline">
                Continue Shopping
              </Link>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-10">
            {/* LEFT SIDE - CART TABLE */}
            <div className="flex-1">
              {items.length > 0 ? (
                <div className="space-y-6">
                  <div className="bg-white rounded-[32px] border border-slate-100 overflow-hidden shadow-sm">
                    {/* Header */}
                    <div className="px-8 py-5 border-b border-slate-50 hidden md:grid grid-cols-12 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <span className="col-span-6">Product Information</span>
                      <span className="col-span-2 text-center">Unit Price</span>
                      <span className="col-span-2 text-center">Quantity</span>
                      <span className="col-span-2 text-right">Subtotal</span>
                    </div>

                    {/* Items */}
                    <div className="divide-y divide-slate-50">
                      {items.map((item) => {
                        const pImgs = item.images ? (typeof item.images === 'string' ? JSON.parse(item.images) : item.images) : [];
                        const pPrice = item.quantity >= 6 ? parseFloat(item.wholesale_price) : parseFloat(item.retail_price);
                        const isWholesale = item.quantity >= 6;

                        return (
                          <div key={item.id} className="px-6 md:px-8 py-8 grid grid-cols-1 md:grid-cols-12 items-center gap-6 md:gap-0">
                            {/* Product Details */}
                            <div className="md:col-span-6 flex items-center gap-6">
                              <div className="size-24 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0 p-3 overflow-hidden">
                                <img src={pImgs[0] || "/placeholder.png"} alt={item.name} className="w-full h-full object-contain" />
                              </div>
                              <div>
                                <p className="text-[10px] text-primary font-black uppercase tracking-widest mb-1">{item.brand?.name || 'GENERIC'}</p>
                                <Link to={`/shop/${item.slug}`} className="font-black text-slate-900 text-sm hover:text-primary transition-colors leading-tight line-clamp-2 mb-2">
                                  {item.name}
                                </Link>
                                <div className="flex flex-wrap gap-2">
                                  <span className="text-[9px] text-slate-400 font-bold bg-slate-50 px-2 py-1 rounded-md border border-slate-100 uppercase tracking-tighter">SKU: {item.sku}</span>
                                  {isWholesale && <span className="text-[9px] text-green-600 font-black bg-green-50 px-2 py-1 rounded-md border border-green-100 uppercase tracking-tighter">Wholesale Rate</span>}
                                </div>
                              </div>
                            </div>

                            {/* Unit Price */}
                            <div className="md:col-span-2 text-center">
                              <p className="font-black text-slate-900 text-base">${pPrice.toFixed(2)}</p>
                              {!isWholesale && <p className="text-[9px] text-slate-400 font-medium">Retail Price</p>}
                            </div>

                            {/* Quantity */}
                            <div className="md:col-span-2 flex justify-center">
                              <div className="flex items-center bg-slate-50 border-2 border-slate-100 rounded-2xl overflow-hidden h-12 shadow-sm">
                                <button onClick={() => updateQty(item.id, -1)} className="px-4 text-slate-400 hover:text-primary transition-colors font-black">-</button>
                                <span className="w-10 text-center font-black text-slate-900 text-sm">{item.quantity}</span>
                                <button onClick={() => updateQty(item.id, 1)} className="px-4 text-slate-400 hover:text-primary transition-colors font-black">+</button>
                              </div>
                            </div>

                            {/* Subtotal and actions */}
                            <div className="md:col-span-2 flex items-center justify-end gap-6 text-right">
                              <div>
                                <p className="font-black text-slate-900 text-lg">${(pPrice * item.quantity).toFixed(2)}</p>
                              </div>
                              <button onClick={() => removeItem(item.id)} className="size-10 bg-slate-50 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl flex items-center justify-center transition-all">
                                <span className="material-symbols-outlined text-xl">delete</span>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm gap-4">
                    <Link to="/shop" className="group flex items-center gap-3 text-slate-600 hover:text-primary font-black uppercase text-[10px] tracking-widest transition-all">
                      <span className="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform">arrow_back</span>
                      Return to Shopping
                    </Link>
                    <button onClick={clearCart} className="text-red-400 hover:text-red-600 font-black uppercase text-[10px] tracking-widest px-6 py-3 hover:bg-red-50 rounded-2xl transition-all flex items-center gap-2">
                      <span className="material-symbols-outlined text-lg">delete_sweep</span>
                      Purge All Items
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-[40px] border-2 border-dashed border-slate-100 p-24 flex flex-col items-center justify-center text-center">
                  <div className="size-24 bg-slate-50 rounded-[32px] flex items-center justify-center mb-8 shadow-inner">
                    <span className="material-symbols-outlined text-slate-200 text-6xl">shopping_cart</span>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-4">Your basket is empty</h2>
                  <p className="text-slate-400 font-medium max-w-sm mb-10 leading-relaxed">
                    It seems you haven't selected any premium repair parts yet. Browse our professional catalogue to get started.
                  </p>
                  <Link to="/shop" className="bg-primary hover:bg-slate-900 text-white px-10 py-4 rounded-[20px] font-black uppercase tracking-widest text-[10px] transition-all shadow-xl shadow-blue-200 active:scale-95 flex items-center gap-3">
                    <span className="material-symbols-outlined text-xl">storefront</span>
                    Explore Shop
                  </Link>
                </div>
              )}
            </div>

            {/* RIGHT SIDE - ORDER SUMMARY */}
            <div className="w-full lg:w-96 shrink-0">
              <div className="bg-white rounded-[40px] border border-slate-100 p-10 sticky top-24 shadow-2xl shadow-slate-200/50">
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-10 border-b border-slate-50 pb-6">Summary</h3>

                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Subtotal ({totalQty} units)</span>
                    <span className="font-black text-slate-900">${subtotal.toFixed(2)}</span>
                  </div>

                  {volumeDiscount > 0 && (
                    <div className="flex justify-between items-center bg-green-50/50 p-4 rounded-2xl border border-green-100">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-green-600">verified</span>
                        <span className="text-[10px] font-black text-green-700 uppercase tracking-widest">Volume Bonus (5%)</span>
                      </div>
                      <span className="font-black text-green-700">-${volumeDiscount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Global Shipping</span>
                    <span className="font-black text-slate-900">${shippingCharge.toFixed(2)}</span>
                  </div>

                  <div className="pt-8 border-t border-slate-50 mt-8">
                    <div className="flex justify-between items-end mb-10">
                      <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Total Amount</span>
                      <div className="text-right">
                        <p className="text-4xl font-black text-slate-900 tracking-tighter leading-none">${totalAmount.toFixed(2)}</p>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-2">All prices in USD</p>
                      </div>
                    </div>
                  </div>

                  <button
                    disabled={items.length === 0}
                    onClick={() => navigate('/checkout')}
                    className="w-full bg-slate-900 hover:bg-primary disabled:bg-slate-100 disabled:text-slate-300 disabled:cursor-not-allowed text-white font-black py-5 rounded-[22px] flex items-center justify-center gap-3 transition-all active:scale-95 shadow-2xl hover:shadow-primary/40 group"
                  >
                    Proceed to Checkout
                    <span className="material-symbols-outlined text-2xl group-hover:translate-x-1 transition-transform">payments</span>
                  </button>

                  {/* FREE SHIPPING PROGRESS */}
                  {items.length > 0 && (
                    <div className="pt-10 border-t border-slate-50 mt-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className={`material-symbols-outlined text-xl ${amountToFreeShipping === 0 ? 'text-green-500' : 'text-primary'}`}>local_shipping</span>
                          <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Shipping Bonus</span>
                        </div>
                        {amountToFreeShipping === 0 && <span className="text-[9px] font-black text-green-600 bg-green-50 px-2 py-1 rounded-md">UNLOCKED</span>}
                      </div>

                      <div className="w-full bg-slate-50 border border-slate-100 rounded-full h-3 overflow-hidden shadow-inner">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ease-out shadow-lg ${amountToFreeShipping === 0 ? 'bg-green-500' : 'bg-primary shadow-primary/30'}`}
                          style={{ width: `${freeShippingProgress}%` }}
                        ></div>
                      </div>

                      {amountToFreeShipping > 0 ? (
                        <p className="text-slate-400 text-[9px] font-bold mt-4 leading-relaxed uppercase tracking-tight">
                          Unlock <span className="text-slate-900">FREE Ground Shipping</span> with <span className="text-primary font-black">${amountToFreeShipping.toFixed(2)}</span> more in your cart.
                        </p>
                      ) : (
                        <p className="text-green-600 text-[10px] font-black mt-4 uppercase tracking-widest flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">check</span> Free Global Shipping Applied
                        </p>
                      )}
                    </div>
                  )}

                  {/* Trust Footer */}
                  <div className="flex justify-center gap-8 pt-8 opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700">
                    <img src="/Logos/samsung-logo-samsung-icon-transparent-free-png.webp" alt="Trust" className="h-4 object-contain" />
                    <img src="/Logos/apple.png" alt="Trust" className="h-4 object-contain" />
                    <img src="/Logos/google_logo.png" alt="Trust" className="h-4 object-contain" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
