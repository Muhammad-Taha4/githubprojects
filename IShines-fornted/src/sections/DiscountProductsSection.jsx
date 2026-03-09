import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { apiFetch } from "../config/api";
import toast from "react-hot-toast";
import ProductCard from "../components/ProductCard";

const DiscountProductsSection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const data = await apiFetch("/products?is_featured=1&limit=6");
        const raw = data.data || data;
        setProducts(raw);
      } catch (error) {
        toast.error("Error loading featured products");
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-white py-16">
      <section className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-primary text-xs font-black uppercase tracking-widest mb-1">
              Top Categories
            </p>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              Featured Products
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

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {isLoading
            ? [...Array(6)].map((_, i) => (
              <div key={i} className="bg-white border border-slate-100 rounded-2xl p-6 animate-pulse h-80">
                <div className="h-44 bg-slate-50 rounded-2xl mb-4"></div>
                <div className="h-4 bg-slate-100 w-3/4 mb-2 rounded"></div>
              </div>
            ))
            : products.map((p) => <ProductCard key={p.id} product={p} />)
          }
        </div>
      </section>
    </div>
  );
};

export default DiscountProductsSection;