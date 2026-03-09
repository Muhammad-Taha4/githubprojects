import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-navy text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* About iShine */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="size-8 bg-primary rounded-lg flex items-center justify-center">
                                <span className="text-white font-black text-xl">i</span>
                            </div>
                            <span className="text-2xl font-black tracking-tighter">iShine<span className="text-primary text-3xl leading-[0]">.</span></span>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Leading wholesale distributor of premium mobile repair parts and accessories.
                            Serving repair shops with OEM quality components since 2020.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://www.facebook.com/IShineWireles" target="_blank" rel="noreferrer" className="size-10 bg-white/5 hover:bg-primary rounded-xl flex items-center justify-center transition-all group">
                                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3l-.5 3h-2.5v6.8c4.56-.93 8-4.96 8-9.8z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-6">Quick Links</h4>
                        <ul className="space-y-4">
                            {['Shop All', 'Bulk Order', 'Track Order', 'About Us', 'Contact Us'].map((link) => (
                                <li key={link}>
                                    <Link to={`/${link.toLowerCase().replace(' ', '-')}`} className="text-slate-400 hover:text-primary transition-colors text-sm font-medium">
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="text-lg font-bold mb-6">Categories</h4>
                        <ul className="space-y-4">
                            {['LCD Screens', 'Charging Ports', 'Batteries', 'Small Parts', 'Tools'].map((cat) => (
                                <li key={cat}>
                                    <Link to="/shop" className="text-slate-400 hover:text-primary transition-colors text-sm font-medium">
                                        {cat}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-bold mb-6">Contact Info</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <svg className="w-5 h-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="text-slate-400 text-sm">11311 Harry Hines Blvd #503, Dallas TX 75229</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 8V5z" />
                                </svg>
                                <span className="text-slate-400 text-sm">(469) 260-2475</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span className="text-slate-400 text-sm">sales@ishinewireless.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs font-bold uppercase tracking-widest">
                    <p>© 2024 iShine Wireless. All Rights Reserved.</p>
                    <p>Wholesale Mobile Parts Since 2020</p>
                </div>
            </div>
        </footer>
    );
}
