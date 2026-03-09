import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../config/api';
import toast from 'react-hot-toast';
import ProductCard from "../components/ProductCard";

const LatestArrivalsSection = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            try {
                const data = await apiFetch('/products?sort=latest&limit=4');
                setProducts(data.data || data);
            } catch (e) {
                toast.error("Error loading latest arrivals");
            }
            setLoading(false);
        };
        load();
    }, []);

    return (
        <section className="bg-slate-50 py-20">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <p className="text-primary text-xs font-black uppercase tracking-widest mb-1">
                            New Arrivals
                        </p>
                        <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                            Just Landed
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {loading ? (
                        [...Array(4)].map((_, i) => (
                            <div key={i} className="bg-white rounded-2xl p-8 h-80 animate-pulse shadow-sm" />
                        ))
                    ) : (
                        products.map(p => <ProductCard key={p.id} product={p} />)
                    )}
                </div>
            </div>
        </section>
    );
};

export default LatestArrivalsSection;
