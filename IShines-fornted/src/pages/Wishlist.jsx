import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import toast from "react-hot-toast";
import { toggleWishlist, addToCart } from "../utils/productHelpers";

export default function Wishlist() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadWishlist = () => {
        const saved = JSON.parse(localStorage.getItem('ishine_wishlist') || '[]');
        setItems(saved);
        setLoading(false);
    };

    useEffect(() => {
        loadWishlist();

        const handleWishUpdate = () => loadWishlist();
        window.addEventListener('wishlistUpdate', handleWishUpdate);
        return () => window.removeEventListener('wishlistUpdate', handleWishUpdate);
    }, []);

    const handleRemove = (item) => {
        toggleWishlist(item);
    };

    const clearAll = () => {
        localStorage.setItem('ishine_wishlist', JSON.stringify([]));
        window.dispatchEvent(new Event('wishlistUpdate'));
        toast.success("Wishlist cleared");
    };

    const handleAddToCart = (item) => {
        addToCart(item);
    };

    const handleAddAllToCart = () => {
        items.forEach(item => addToCart(item, 1));
        toast.success("All items added to cart!");
    };

    return (
        <div className="min-h-screen bg-background-off flex flex-col">
            <Navbar />

            <main className="flex-grow py-12 bg-[#fcfdfe]">
                <div className="container mx-auto px-4">
                    {/* Breadcrumb */}
                    <nav className="mb-10 flex items-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                        <div className="size-1 bg-slate-200 rounded-full"></div>
                        <span className="text-slate-900">Wishlist</span>
                    </nav>

                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6 bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm relative overflow-hidden">
                        <div className="flex items-center gap-6 relative z-10">
                            <div className="size-16 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center shadow-inner">
                                <span className="material-symbols-outlined text-4xl">favorite</span>
                            </div>
                            <div>
                                <h1 className="font-black text-4xl text-slate-900 uppercase tracking-tight">
                                    My Wishlist
                                </h1>
                                <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-1">
                                    {items.length} Component{items.length !== 1 ? 's' : ''} saved for later
                                </p>
                            </div>
                        </div>

                        {items.length > 0 && (
                            <div className="flex items-center gap-6 relative z-10">
                                <button
                                    onClick={clearAll}
                                    className="text-slate-400 hover:text-red-500 text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 group"
                                >
                                    <span className="material-symbols-outlined text-xl group-hover:rotate-90 transition-transform">close_small</span>
                                    Clear Favorites
                                </button>
                                <button
                                    onClick={handleAddAllToCart}
                                    className="bg-slate-900 hover:bg-primary text-white px-10 py-5 rounded-[22px] font-black text-[11px] uppercase tracking-widest transition-all shadow-2xl active:scale-95 flex items-center gap-3"
                                >
                                    <span className="material-symbols-outlined text-xl">shopping_cart_checkout</span>
                                    Add All to Cart
                                </button>
                            </div>
                        )}
                        {/* Decorative BG */}
                        <div className="absolute top-0 right-0 w-64 h-full bg-slate-50 opacity-10 skew-x-[-20deg] translate-x-32"></div>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="bg-white rounded-[40px] h-96 animate-pulse border border-slate-50" />
                            ))}
                        </div>
                    ) : items.length > 0 ? (
                        <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                            {items.map((item) => {
                                const imgs = item.images ? (typeof item.images === 'string' ? JSON.parse(item.images) : item.images) : [];
                                return (
                                    <div
                                        key={item.id}
                                        className="bg-white rounded-[40px] border border-slate-100 overflow-hidden hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] hover:-translate-y-3 transition-all duration-500 relative flex flex-col group"
                                    >
                                        {/* Image Area */}
                                        <div className="h-64 flex items-center justify-center relative p-8 bg-slate-50/30 group-hover:bg-white transition-colors duration-700">
                                            <Link to={`/shop/${item.slug}`} className="w-full h-full flex items-center justify-center">
                                                <img
                                                    className="object-contain w-full h-full transition-transform duration-700 group-hover:scale-125"
                                                    src={imgs[0] || "/placeholder.png"}
                                                    alt={item.name}
                                                />
                                            </Link>

                                            {/* Remove Button */}
                                            <button
                                                onClick={() => handleRemove(item)}
                                                className="absolute top-6 right-6 size-10 bg-white shadow-2xl rounded-2xl flex items-center justify-center text-slate-300 hover:text-red-500 hover:rotate-90 transition-all duration-500 z-10 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
                                            >
                                                <span className="material-symbols-outlined text-xl">close</span>
                                            </button>
                                        </div>

                                        {/* Card Body */}
                                        <div className="p-8 flex flex-col flex-1">
                                            <Link to={`/shop/${item.slug}`} className="flex-1">
                                                <p className="text-[10px] text-primary uppercase tracking-[0.2em] font-black mb-3">
                                                    {item.brand?.name || 'GENERIC'}
                                                </p>
                                                <h3 className="font-extrabold text-slate-800 text-sm leading-[1.3] mb-4 line-clamp-2 h-10 group-hover:text-primary transition-colors">
                                                    {item.name}
                                                </h3>

                                                <div className="flex items-center mb-8">
                                                    <div className="flex flex-col">
                                                        <span className="text-slate-900 font-extrabold text-2xl tracking-tighter">
                                                            ${parseFloat(item.retail_price || 0).toFixed(2)}
                                                        </span>
                                                        <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Retail Rate</span>
                                                    </div>
                                                </div>
                                            </Link>

                                            {/* Actions */}
                                            <div className="flex gap-3 mt-auto">
                                                <button
                                                    onClick={() => handleAddToCart(item)}
                                                    className="w-full bg-slate-900 hover:bg-primary text-white text-[10px] font-black uppercase tracking-widest py-4 rounded-[20px] transition-all flex items-center justify-center gap-3 shadow-xl active:scale-95 group/btn"
                                                >
                                                    <span className="material-symbols-outlined text-xl group-hover/btn:rotate-12 transition-transform">add_shopping_cart</span>
                                                    Move to Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[60px] border border-slate-50 shadow-sm mt-10 p-12 text-center overflow-hidden relative">
                            <div className="relative z-10">
                                <div className="size-32 bg-slate-50 rounded-[40px] flex items-center justify-center mb-10 text-slate-200 shadow-inner group transition-transform duration-700 hover:scale-110">
                                    <span className="material-symbols-outlined text-7xl font-thin group-hover:text-red-100 group-hover:font-normal transition-all duration-700">
                                        heart_broken
                                    </span>
                                </div>
                                <h2 className="text-4xl font-black text-slate-900 mb-4 uppercase tracking-tight">Your heart list is empty</h2>
                                <p className="text-slate-400 font-medium max-w-sm mb-12 leading-relaxed text-base">
                                    Professional parts await. Start tagging items your business needs for rapid restoration and tech excellence.
                                </p>
                                <Link
                                    to="/shop"
                                    className="bg-primary hover:bg-slate-900 text-white px-12 py-5 rounded-[24px] font-black uppercase tracking-widest text-[11px] transition-all shadow-2xl active:scale-95 inline-flex items-center gap-3 group"
                                >
                                    Explore Catalogue
                                    <span className="material-symbols-outlined text-xl group-hover:translate-x-2 transition-transform">arrow_right_alt</span>
                                </Link>
                            </div>
                            {/* Decorative */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
