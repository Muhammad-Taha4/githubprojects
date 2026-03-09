import { Link } from "react-router-dom";

export default function About() {
    return (
        <div className="min-h-screen bg-white font-sans antialiased text-slate-900">
            {/* 1. HERO BANNER */}
            <section className="bg-[#1a3a5c] py-20 lg:py-32 relative overflow-hidden text-white">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <defs>
                            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
                            </pattern>
                        </defs>
                        <rect width="100" height="100" fill="url(#grid)" />
                    </svg>
                </div>
                <div className="max-w-7xl mx-auto px-4 relative z-10 text-center space-y-6">
                    <nav className="flex justify-center items-center gap-2 text-sm text-blue-400 font-bold uppercase tracking-widest mb-4">
                        <Link to="/" className="hover:text-white transition-colors">Home</Link>
                        <span className="material-symbols-outlined text-xs">chevron_right</span>
                        <span className="text-white">About Us</span>
                    </nav>
                    <h1 className="text-4xl lg:text-6xl font-black tracking-tighter">About iShine Wireless</h1>
                    <p className="text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        Your trusted wholesale source for premium mobile repair parts since 2015.
                        Empowering repair businesses with quality, speed, and expertise.
                    </p>
                </div>
            </section>

            {/* 2. OUR STORY */}
            <section className="py-20 lg:py-32 max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8 animate-in slide-in-from-left duration-1000">
                        <div className="space-y-4">
                            <h2 className="text-sm font-black text-primary uppercase tracking-[0.3em]">Our Story</h2>
                            <h3 className="text-3xl lg:text-5xl font-black text-[#1a3a5c] leading-tight">
                                Quality Parts for Every Repair, Right from Dallas.
                            </h3>
                        </div>
                        <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                            <p>
                                Founded in <span className="text-[#1a3a5c] font-bold">Dallas, Texas</span>, iShine Wireless started with a single mission: to provide the repair industry with parts they can actually trust. After seeing the inconsistency in market quality, we built our own testing labs and supply chain.
                            </p>
                            <p>
                                Today, we serve thousands of repair shops, retailers, and distributors across the USA. Our 10,000+ product catalog covers everything from the latest <span className="font-bold">iPhone and Samsung LCDs</span> to hard-to-find Motorola and Google Pixel components.
                            </p>
                            <p>
                                With a state-of-the-art warehouse and a dedicated team, we ensure that every part leaving our facility meets strict quality benchmarks.
                            </p>
                        </div>
                        <div className="pt-4">
                            <Link to="/contact" className="inline-flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all">
                                Learn more about our quality process
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </Link>
                        </div>
                    </div>
                    <div className="relative animate-in slide-in-from-right duration-1000">
                        <div className="absolute -inset-4 bg-primary/5 rounded-[40px] -rotate-2"></div>
                        <div className="relative aspect-[4/3] rounded-[32px] bg-slate-100 overflow-hidden shadow-2xl overflow-hidden border-8 border-white">
                            <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                                <span className="material-symbols-outlined text-[120px]">warehouse</span>
                            </div>
                            <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1000" alt="Warehouse" className="w-full h-full object-cover opacity-80" />
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. WHY CHOOSE US */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-sm font-black text-primary uppercase tracking-[0.3em]">Why Work With Us</h2>
                        <p className="text-3xl lg:text-4xl font-black text-[#1a3a5c]">The Wholesale Advantage</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: "verified", title: "Premium Quality", desc: "Every LCD and battery is triple-tested in our labs." },
                            { icon: "price_change", title: "Wholesale Pricing", desc: "Tiered pricing modeled for business growth and margins." },
                            { icon: "local_shipping", title: "Fast US Shipping", desc: "Same-day shipping via FedEx Ground for most regions." },
                            { icon: "support_agent", title: "Expert Support", desc: "Dedicated account managers for B2B partners." },
                        ].map((card, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 group">
                                <div className="size-14 rounded-2xl bg-primary-light text-primary flex items-center justify-center mb-6 group-hover:bg-[#1a3a5c] group-hover:text-white transition-all">
                                    <span className="material-symbols-outlined text-[28px]">{card.icon}</span>
                                </div>
                                <h4 className="text-lg font-bold text-[#1a3a5c] mb-3">{card.title}</h4>
                                <p className="text-sm text-slate-500 leading-relaxed font-medium">{card.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. STATS ROW */}
            <section className="bg-[#1a3a5c] py-20 text-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
                        {[
                            { value: "10,000+", label: "Products" },
                            { value: "5,000+", label: "Happy Customers" },
                            { value: "8+", label: "Years Experience" },
                            { value: "48hr", label: "Fast Delivery" },
                        ].map((stat, idx) => (
                            <div key={idx} className="space-y-2">
                                <p className="text-4xl lg:text-5xl font-black tracking-tight">{stat.value}</p>
                                <p className="text-sm font-bold text-blue-400 uppercase tracking-widest">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. OUR BRANDS */}
            <section className="py-20 lg:py-32">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-sm font-black text-primary uppercase tracking-[0.3em]">Brands We Support</h2>
                        <p className="text-2xl font-bold text-slate-400">Trusted parts for every major manufacturer</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center text-center">
                        {["Apple", "Samsung", "Motorola", "Google Pixel", "OnePlus", "TCL", "Nokia", "Revvl"].map((brand) => (
                            <div key={brand} className="text-xl font-black text-slate-300 hover:text-[#1a3a5c] transition-colors cursor-default uppercase italic tracking-tighter">
                                {brand}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. TEAM SECTION */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-20 space-y-4">
                        <h2 className="text-sm font-black text-primary uppercase tracking-[0.3em]">Our Team</h2>
                        <p className="text-3xl lg:text-4xl font-black text-[#1a3a5c]">The Faces behind the Parts</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { name: "John Chen", role: "CEO & Founder", bio: "Founded iShine in 2015 to fix the quality crisis in the repair market." },
                            { name: "Sarah Miller", role: "Operations Director", bio: "Ensures that our Dallas warehouse runs like a well-oiled machine." },
                            { name: "Mike Ross", role: "Head of QC", bio: "Leading our triple-test quality control program across all supply lines." },
                        ].map((member, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-[32px] text-center space-y-6 shadow-sm border border-slate-100">
                                <div className="size-24 rounded-full bg-[#1a3a5c] text-white flex items-center justify-center mx-auto text-2xl font-black shadow-xl shadow-blue-900/20">
                                    {member.name.split(" ").map(n => n[0]).join("")}
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-xl font-bold text-[#1a3a5c] tracking-tight">{member.name}</h4>
                                    <p className="text-primary font-bold text-xs uppercase tracking-widest">{member.role}</p>
                                </div>
                                <p className="text-sm text-slate-500 font-medium leading-relaxed italic px-4">"{member.bio}"</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. CONTACT CTA BANNER */}
            <section className="py-20 lg:py-32">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="bg-[#1a3a5c] rounded-[40px] p-12 lg:p-20 text-center space-y-8 relative overflow-hidden shadow-2xl shadow-blue-900/20">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                        <div className="relative z-10 space-y-4">
                            <h2 className="text-3xl lg:text-5xl font-black text-white leading-tight">Ready to Start Wholesale Ordering?</h2>
                            <p className="text-slate-300 text-lg max-w-xl mx-auto font-medium">
                                Contact us today for volume pricing and priority account setup. We're ready to grow your business.
                            </p>
                        </div>
                        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/contact" className="w-full sm:w-auto px-10 py-4 bg-primary hover:bg-primary text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-900/20 active:scale-[0.98]">
                                Get In Touch
                            </Link>
                            <Link to="/shop" className="w-full sm:w-auto px-10 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl border border-white/20 transition-all">
                                Shop Now
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
