import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { apiFetch } from "../config/api";
import toast from "react-hot-toast";
import ProductCard from "../components/ProductCard";

const WholesaleLCDSection = () => {
    const [activeTab, setActiveTab] = useState("LCD SCREENS");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const tabs = [
        { name: "LCD SCREENS", slug: "lcd-screens" },
        { name: "TOOLS", slug: "tools" },
        { name: "ACCESSORIES", slug: "accessories" }
    ];

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            try {
                const data = await apiFetch(`/products?category=${activeTab}&limit=5`);
                setProducts(data.data || data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, [activeTab]);

    return (
        <div className="bg-slate-50 py-10">
            <section className="container mx-auto px-4">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
                    <div>
                        <p className="text-primary text-xs font-black uppercase tracking-widest mb-1">
                            Wholesale Collections
                        </p>
                        <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                            Bulk Repair Parts
                        </h2>
                    </div>

                    {/* Tabs */}
                    <div className="flex items-center gap-6 overflow-x-auto no-scrollbar whitespace-nowrap">
                        {tabs.map((tab) => (
                            <button
                                key={tab.name}
                                onClick={() => setActiveTab(tab.name)}
                                className={`${activeTab === tab.name
                                    ? "text-primary font-bold border-b-2 border-primary pb-1"
                                    : "text-slate-400 font-medium hover:text-slate-700 pb-1 cursor-pointer transition-colors"
                                    }`}
                            >
                                {tab.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-6 min-h-[400px]">
                    {loading ? (
                        [...Array(5)].map((_, i) => (
                            <div key={i} className="bg-white rounded-2xl h-80 animate-pulse border border-slate-100" />
                        ))
                    ) : products.length > 0 ? (
                        products.map((p) => <ProductCard key={p.id} product={p} />)
                    ) : (
                        <div className="col-span-full text-center py-20 text-slate-400 font-medium">
                            No products found in this category.
                        </div>
                    )}
                </div>

                <div className="mt-12 text-center">
                    <Link to="/shop" className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-primary transition-all shadow-lg active:scale-95">
                        Explore Full Wholesale Catalog
                        <span className="material-symbols-outlined">straighten</span>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default WholesaleLCDSection;
