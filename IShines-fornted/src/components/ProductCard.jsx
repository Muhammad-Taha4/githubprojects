import { Link } from 'react-router-dom';
import { useState } from 'react';

const getProductImage = (product) => {
    if (product.images && product.images.length > 0 && product.images[0]) {
        return product.images[0];
    }
    const brandColors = { apple: '1a3356', samsung: '2ea4d5', motorola: 'e65c00', google: '4285F4' };
    const b = product.brand?.name?.toLowerCase() || '';
    const color = Object.entries(brandColors).find(([k]) => b.includes(k))?.[1] || '2ea4d5';
    return `https://placehold.co/400x400/${color}/ffffff?text=${encodeURIComponent((product.name || '').substring(0, 15))}`;
};

export default function ProductCard({ product }) {
    const [imgError, setImgError] = useState(false);
    const price = product.retail_price || product.price || 0;
    const wholesale = product.wholesale_price;
    const isNew = product.is_featured;
    const inStock = (product.stock || 0) > 0;

    return (
        <Link
            to={`/shop/${product.slug}`}
            className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-primary/10 hover:border-primary/20 transition-all duration-300 flex flex-col"
        >
            {/* Image Container */}
            <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 aspect-square overflow-hidden">
                <img
                    src={imgError ? `https://placehold.co/400x400/2ea4d5/ffffff?text=iShine` : getProductImage(product)}
                    alt={product.name}
                    onError={() => setImgError(true)}
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                />
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {isNew && (
                        <span className="bg-primary text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-lg">
                            Featured
                        </span>
                    )}
                    {!inStock && (
                        <span className="bg-red-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                            Out of Stock
                        </span>
                    )}
                </div>
                {/* Quick view overlay */}
                <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/5 transition-all duration-300 flex items-center justify-center">
                    <span className="bg-white text-primary text-xs font-bold px-4 py-2 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 uppercase tracking-wider">
                        View Details
                    </span>
                </div>
            </div>

            {/* Info */}
            <div className="p-4 flex flex-col flex-1">
                {/* Brand */}
                {product.brand?.name && (
                    <span className="text-[11px] font-bold text-primary uppercase tracking-widest mb-1.5">
                        {product.brand.name}
                    </span>
                )}
                {/* Name */}
                <h3 className="text-sm font-bold text-slate-800 leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors flex-1">
                    {product.name}
                </h3>
                {/* Compatibility */}
                {product.compatibility && (
                    <p className="text-[11px] text-slate-400 mb-3 truncate">
                        {product.compatibility}
                    </p>
                )}
                {/* Price */}
                <div className="mt-auto pt-3 border-t border-slate-50 flex items-center justify-between">
                    <div>
                        <span className="text-lg font-black text-slate-900">
                            ${parseFloat(price).toFixed(2)}
                        </span>
                        {wholesale && (
                            <span className="block text-[11px] text-emerald-600 font-semibold">
                                Wholesale: ${parseFloat(wholesale).toFixed(2)}
                            </span>
                        )}
                    </div>
                    <button
                        onClick={(e) => { e.preventDefault(); }}
                        className="w-9 h-9 bg-primary hover:bg-primary-dark text-white rounded-xl flex items-center justify-center transition-all hover:scale-110 shadow-md shadow-primary/30"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                    </button>
                </div>
            </div>
        </Link>
    );
}
