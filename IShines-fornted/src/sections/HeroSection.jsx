import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../config/api';
import banner1 from '../assets/banner1.jpg';
import banner2 from '../assets/banner2.jpg';
import banner3 from '../assets/banner3.jpg';

const localBanners = [
    { id: 1, image: banner1, title: '', subtitle: '', link: '/shop' },
    { id: 2, image: banner2, title: '', subtitle: '', link: '/shop' },
    { id: 3, image: banner3, title: '', subtitle: '', link: '/shop' },
];

const HeroSection = ({ categoryMenuOpen }) => {
    const [categories, setCategories] = useState([]);
    const [banners, setBanners] = useState([]);
    const [currentBanner, setCurrentBanner] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [cats, bans] = await Promise.all([
                    apiFetch('/categories'),
                    apiFetch('/banners')
                ]);
                const priority = ['cables', 'car-chargers', 'power-banks', 'wireless-earbuds'];
                const sorted = [
                    ...priority.map(slug => cats.find(c => c.slug === slug)).filter(Boolean),
                    ...cats.filter(c => !priority.includes(c.slug))
                ];
                setCategories(sorted.slice(0, 8));

                if (bans && bans.length > 0) {
                    // Merge API banner text with local images
                    const merged = localBanners.map((local, i) => ({
                        ...local,
                        title: bans[i]?.title || '',
                        subtitle: bans[i]?.subtitle || '',
                        link: bans[i]?.link || '/shop',
                    }));
                    setBanners(merged);
                } else {
                    setBanners(localBanners);
                }
            } catch (e) {
                console.error(e);
                setBanners(localBanners);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    useEffect(() => {
        if (banners.length > 1) {
            const timer = setInterval(() => {
                setCurrentBanner(prev => (prev + 1) % banners.length);
            }, 4000);
            return () => clearInterval(timer);
        }
    }, [banners]);

    return (
        <section className="container mx-auto px-4 py-6">
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Left Category Menu (Desktop) */}
                <div
                    style={{ overflow: "hidden" }}
                    className={`hidden lg:block bg-white rounded-2xl border border-slate-100 shadow-sm h-full transition-all duration-500 ease-in-out flex-shrink-0 ${categoryMenuOpen ? "w-64 opacity-100" : "w-0 opacity-0 pointer-events-none border-none"}`}
                >
                    <div className="p-4 bg-slate-900 border-b border-slate-700">
                        <h3 className="text-white font-black text-sm uppercase tracking-widest flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm">menu</span>
                            Categories
                        </h3>
                    </div>
                    <ul className="divide-y divide-slate-50 min-w-[256px]">
                        {categories.map((cat) => (
                            <li key={cat.id}>
                                <Link
                                    className="flex items-center justify-between px-5 py-3.5 hover:bg-slate-50 hover:text-primary transition-all text-[13px] font-bold text-slate-700 group uppercase tracking-tight"
                                    to={`/shop?category=${cat.name}`}
                                >
                                    <span>{cat.name}</span>
                                    <span className="material-symbols-outlined text-[16px] text-slate-300 group-hover:text-primary transition-colors">
                                        chevron_right
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="p-4 bg-slate-50 min-w-[256px] border-t border-slate-100">
                        <Link
                            className="text-primary text-[13px] font-black flex items-center gap-1 uppercase tracking-widest hover:gap-3 transition-all"
                            to="/shop"
                        >
                            View All{" "}
                            <span className="material-symbols-outlined text-sm">
                                arrow_forward
                            </span>
                        </Link>
                    </div>
                </div>

                {/* Main Slider */}
                <div
                    className="flex-1 relative rounded-2xl overflow-hidden min-h-[460px] flex items-center bg-slate-100 transition-all duration-500"
                >
                    {/* Dynamic Background */}
                    <div className="absolute inset-0">
                        {localBanners.map((banner, i) => (
                            <div
                                key={i}
                                className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
                                style={{
                                    backgroundImage: `url(${banner.image})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    opacity: currentBanner === i ? 1 : 0,
                                }}
                            />
                        ))}
                    </div>

                    {/* Left Side Minimal Text Overlay */}
                    <div className="relative z-10 flex items-center h-full min-h-[460px] px-8 md:px-14">
                        <div className="max-w-[360px]">
                            {/* Title only - big bold navy text */}
                            {banners[currentBanner]?.title && (
                                <h2
                                    className="text-3xl md:text-5xl font-black leading-[1.1] tracking-tight mb-4"
                                    style={{
                                        color: '#1a3356',
                                        textShadow: '0 2px 20px rgba(255,255,255,0.9), 0 0 40px rgba(255,255,255,0.7)'
                                    }}
                                >
                                    {banners[currentBanner].title}
                                </h2>
                            )}

                            {/* Shop Now - pill style button */}
                            <Link
                                to={banners[currentBanner]?.link || '/shop'}
                                className="inline-flex items-center gap-2 px-7 py-3 text-white font-bold rounded-full text-sm uppercase tracking-widest transition-all active:scale-95 shadow-lg"
                                style={{ background: '#2ea4d5' }}
                                onMouseEnter={e => e.currentTarget.style.background = '#1a3356'}
                                onMouseLeave={e => e.currentTarget.style.background = '#2ea4d5'}
                            >
                                Shop Now
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </div>

                    {/* Slider Navigation Dots */}
                    {banners.length > 1 && (
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                            {banners.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentBanner(i)}
                                    className={currentBanner === i ? "h-3 rounded-full transition-all w-8" : "size-3 rounded-full transition-all hover:opacity-60"}
                                    style={currentBanner === i ? { background: '#1a3356' } : { background: 'rgba(26,51,86,0.3)' }}
                                />
                            ))}
                        </div>
                    )}

                    {/* Slider Arrows */}
                    <button
                        onClick={() => setCurrentBanner(prev => (prev - 1 + banners.length) % banners.length)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 size-12 rounded-2xl flex items-center justify-center transition-all group"
                        style={{ background: 'rgba(26, 51, 86, 0.5)', backdropFilter: 'blur(8px)' }}
                    >
                        <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform text-white">chevron_left</span>
                    </button>
                    <button
                        onClick={() => setCurrentBanner(prev => (prev + 1) % banners.length)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 size-12 rounded-2xl flex items-center justify-center transition-all group"
                        style={{ background: 'rgba(26, 51, 86, 0.5)', backdropFilter: 'blur(8px)' }}
                    >
                        <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform text-white">chevron_right</span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;

