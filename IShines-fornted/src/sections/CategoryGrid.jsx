import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../config/api';

const CategoryGrid = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await apiFetch('/categories');
                // Pick top 5 categories for the grid
                setCategories(data.slice(0, 5));
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    // Helper to get card colors based on index
    const colors = [
        { bg: "bg-[#f0f4f8]", text: "text-blue-600" },
        { bg: "bg-[#e6f0ff]", text: "text-primary" },
        { bg: "bg-[#fff0e6]", text: "text-orange-600" },
        { bg: "bg-[#f8f0ec]", text: "text-rose-600" },
        { bg: "bg-[#f3f4f6]", text: "text-slate-600" }
    ];

    if (loading) return null;

    return (
        <section className="container mx-auto px-4 py-12">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <p className="text-primary text-xs font-black uppercase tracking-widest mb-1">
                        Product Range
                    </p>
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                        Shop by Category
                    </h2>
                </div>
                <Link
                    to="/shop"
                    className="hidden md:flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-dark transition-colors group"
                >
                    View All
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 md:h-[600px]">
                {categories.map((cat, idx) => (
                    <Link
                        key={cat.id}
                        to={`/shop?category=${cat.name}`}
                        className={`${colors[idx % colors.length].bg} ${idx === 1 ? 'md:row-span-2' : ''} rounded-3xl p-8 relative flex flex-col justify-center overflow-hidden group hover:shadow-2xl hover:-translate-y-1 transition-all duration-500`}
                    >
                        <div className="relative z-10 w-2/3">
                            <p className={`text-sm font-black uppercase tracking-widest ${colors[idx % colors.length].text} mb-2`}>Collection</p>
                            <h3 className={`text-2xl font-black text-slate-900 mb-6 leading-tight ${idx === 1 ? 'text-4xl' : ''}`}>
                                {cat.name}
                            </h3>
                            <span className="bg-slate-900 group-hover:bg-primary text-white font-bold py-2.5 px-6 rounded-xl transition-all w-max shadow-lg inline-block text-sm">
                                Explore Now
                            </span>
                        </div>
                        {/* Decorative background element */}
                        <div className="absolute -right-10 -bottom-10 w-64 h-64 opacity-5 group-hover:scale-125 transition-transform duration-700 bg-slate-900 rounded-full"></div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default CategoryGrid;
