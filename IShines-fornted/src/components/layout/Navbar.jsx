import { useState, useRef, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const megaMenuData = {
    apple: {
        sidebar: ["iPhone", "iPad", "iWatch", "AirPods"],
        content: {
            "iPhone": ["iPhone 17 Pro Max", "iPhone 17 Pro", "iPhone 16 Pro Max", "iPhone 16 Pro", "iPhone 15 Pro Max", "iPhone 15 Pro", "iPhone 14 Pro Max", "iPhone 14", "iPhone 13 Pro Max", "iPhone 13", "iPhone 12 Pro Max", "iPhone 12", "iPhone 11 Pro Max", "iPhone 11", "iPhone XR", "iPhone X", "iPhone 8 Plus", "iPhone 8", "iPhone 7"],
            "iPad": ["iPad Pro 13\"", "iPad Pro 12.9\" 6th Gen", "iPad Pro 11\" 4th Gen", "iPad Air 5", "iPad Mini 7", "iPad Mini 6", "iPad 10", "iPad 9", "iPad 8"],
            "iWatch": ["Series 10 46MM", "Series 10 42MM", "Series 9 45MM", "Series 9 41MM", "Series Ultra 2nd Gen", "Series 8 45MM", "Series 7 45MM", "Series SE 2nd Gen"],
            "AirPods": ["AirPods Pro 2nd Gen", "AirPods Pro 1st Gen", "AirPods 3rd Gen", "AirPods 2nd Gen"]
        }
    },
    samsung: {
        sidebar: ["S Series", "A Series", "Note Series", "Z Series", "Tab Series"],
        content: {
            "S Series": ["Galaxy S25 Ultra 5G", "Galaxy S25 Plus", "Galaxy S25", "Galaxy S24 Ultra", "Galaxy S24 Plus", "Galaxy S24 FE", "Galaxy S23 Ultra", "Galaxy S23 Plus", "Galaxy S22 Ultra", "Galaxy S22", "Galaxy S21 Ultra", "Galaxy S21", "Galaxy S20 Ultra", "Galaxy S20"],
            "A Series": ["A56", "A52", "A51", "A42", "A36", "A35", "A34", "A32", "A25", "A23", "A21s", "A15 5G", "A14", "A13", "A12", "A11", "A10", "A06", "A03S", "A02S", "A01"],
            "Note Series": ["Note 20 Ultra 5G", "Note 20 5G", "Note 10 Plus", "Note 10", "Note 9", "Note 8", "Note 5", "Note 4", "Note 3", "Note 2"],
            "Z Series": ["Flip 3", "Flip 4", "Flip 5"],
            "Tab Series": ["Tab A9 Plus"]
        }
    },
    motorola: {
        sidebar: ["2026 Series", "2025 Series", "2024 Series", "2023 Series", "2022 Series", "2021 Series"],
        content: {
            "2026 Series": ["Moto Edge 60", "Moto G 2026"],
            "2025 Series": ["Moto Edge 50", "Moto G Power 2025"],
            "2024 Series": ["Moto G Stylus 2024", "Razr 2024"],
            "2023 Series": ["Moto Edge+ 2023", "Moto G Play 2023"],
            "2022 Series": ["Moto Edge 2022"],
            "2021 Series": ["Moto G100"]
        }
    },
    otherbrands: {
        sidebar: ["Google", "LG", "OnePlus", "Sony"],
        content: {
            "Google": ["Pixel 9 Pro", "Pixel 8 Pro", "Pixel 7 Pro"],
            "LG": ["V60 ThinQ", "Velvet"],
            "OnePlus": ["12 Pro", "11 5G"],
            "Sony": ["Xperia 1 V"]
        }
    },
    wegacell: {
        sidebar: ["Home Charger", "Car Charger", "Aux Cable", "Ear Phone", "Data Cable"],
        content: {
            "Home Charger": ["Wega Home 20W"],
            "Car Charger": ["Wega Car 40W"],
            "Aux Cable": ["Wega Braided Aux"],
            "Ear Phone": ["Wega Wired Earphones"],
            "Data Cable": ["Wega 3-in-1 Cable"]
        }
    },
    ncc: {
        sidebar: ["Wireless Earbuds", "Car Chargers", "Power Banks", "Cables", "Speakers"],
        content: {
            "Wireless Earbuds": ["NCC Sound 1", "NCC Sound Pro"],
            "Car Chargers": ["NCC Rapid Charge"],
            "Power Banks": ["NCC Power 10K"],
            "Cables": ["NCC USB-C", "NCC Lightning"],
            "Speakers": ["NCC Bluetooth Speaker"]
        }
    },
    speakers: {
        sidebar: ["Bluetooth Speakers", "Party Speakers", "Soundbars"],
        content: {
            "Bluetooth Speakers": ["Portable Mini", "Rugged Outdoor"],
            "Party Speakers": ["Boombox RGB", "Tower Max"],
            "Soundbars": ["Eco Sound 2.1"]
        }
    },
    tools: {
        sidebar: ["Repair Tools", "Opening Tools", "Soldering"],
        content: {
            "Repair Tools": ["Screwdrivers", "Tweezers"],
            "Opening Tools": ["Spudgers", "Suction Cups"],
            "Soldering": ["Soldering Iron", "Flux"]
        }
    },
    gameaccessories: {
        sidebar: ["Controllers", "Headsets", "Charging Stations"],
        content: {
            "Controllers": ["PS5 Custom", "Xbox Elite Pro"],
            "Headsets": ["7.1 Surround", "Wireless Pro"],
            "Charging Stations": ["Dual Dock", "Cooling Stand"]
        }
    }
};

const navItems = [
    { label: "Apple", key: "apple" },
    { label: "Samsung", key: "samsung" },
    { label: "Motorola", key: "motorola" },
    { label: "Other Brands", key: "otherbrands", badge: "NEW" },
    { label: "WEGA CELL", key: "wegacell" },
    { label: "NCC", key: "ncc" },
    { label: "Speakers", key: "speakers" },
    { label: "Tools", key: "tools", badge: "NEW" },
    { label: "Game Accessories", key: "gameaccessories", badge: "NEW" },
];

export default function Navbar({ categoryMenuOpen, onToggleCategory }) {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(null);
    const [activeSub, setActiveSub] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [wishlistCount, setWishlistCount] = useState(0);
    const [cartCount, setCartCount] = useState(0);

    const menuRef = useRef(null);

    useEffect(() => {
        const updateCounts = () => {
            const wishlist = JSON.parse(localStorage.getItem('ishine_wishlist') || '[]');
            const cart = JSON.parse(localStorage.getItem('ishine_cart') || '[]');
            setWishlistCount(wishlist.length);
            // Sum quantities for cart
            const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
            setCartCount(totalItems);
        };

        updateCounts();

        // Listen for storage changes (for other tabs) or custom events
        window.addEventListener('storage', updateCounts);
        window.addEventListener('wishlistUpdate', updateCounts);
        return () => {
            window.removeEventListener('storage', updateCounts);
            window.removeEventListener('wishlistUpdate', updateCounts);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setActiveTab(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleTabClick = (tab) => {
        if (activeTab === tab) {
            setActiveTab(null);
        } else {
            setActiveTab(tab);
            if (megaMenuData[tab]?.sidebar) {
                setActiveSub(megaMenuData[tab].sidebar[0]);
            }
        }
    };

    const closeMenu = () => setActiveTab(null);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
            closeMenu();
        }
    };

    return (
        <header className="bg-white sticky top-0 z-50 transition-all duration-300 shadow-sm" ref={menuRef}>
            {/* Top Bar */}
            <div className="border-b border-border-light">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between gap-8">
                        {/* Logo */}
                        <Link
                            className="flex items-center gap-2 text-primary hover:opacity-90 transition-all min-w-max group"
                            to="/"
                            onClick={closeMenu}
                        >
                            <div className="size-10 bg-primary group-hover:bg-slate-900 rounded-xl flex items-center justify-center text-white transition-colors">
                                <span className="material-symbols-outlined text-2xl">smartphone</span>
                            </div>
                            <h1 className="text-2xl font-black tracking-tight text-slate-900 group-hover:text-primary transition-colors">
                                iShine Wireless
                            </h1>
                        </Link>
                        {/* Search Bar */}
                        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl group">
                            <div className="w-full flex border-2 border-slate-100 rounded-2xl overflow-hidden transition-all focus-within:border-primary bg-slate-50">
                                <input
                                    className="flex-1 bg-transparent py-3 px-6 text-sm outline-none border-none placeholder:text-slate-400 font-medium"
                                    placeholder="Search repair parts, tools, brands..."
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button type="submit" className="bg-slate-900 hover:bg-primary text-white px-10 py-3 font-black uppercase text-xs transition-all tracking-widest active:scale-95">
                                    SEARCH
                                </button>
                            </div>
                        </form>
                        {/* User Actions */}
                        <div className="flex items-center gap-6 text-slate-700">
                            <Link className="flex flex-col items-center gap-1 hover:text-primary transition-all group" to={user ? '/account' : '/login'} onClick={closeMenu}>
                                <div className="size-10 rounded-xl flex items-center justify-center group-hover:bg-slate-50 transition-colors">
                                    <span className="material-symbols-outlined text-2xl group-hover:fill-current">person</span>
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest hidden lg:block">{user ? 'Account' : 'Login'}</span>
                            </Link>
                            <Link className="flex flex-col items-center gap-1 hover:text-primary transition-all group relative" to="/wishlist" onClick={closeMenu}>
                                <div className="size-10 rounded-xl flex items-center justify-center group-hover:bg-slate-50 transition-colors">
                                    <span className="material-symbols-outlined text-2xl group-hover:fill-current">favorite</span>
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest hidden lg:block">Wishlist</span>
                                {wishlistCount > 0 && (
                                    <span className="absolute top-0 right-0 size-5 bg-primary text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-lg animate-in zoom-in duration-300">
                                        {wishlistCount}
                                    </span>
                                )}
                            </Link>
                            <Link className="flex flex-col items-center gap-1 hover:text-primary transition-all group relative" to="/cart" onClick={closeMenu}>
                                <div className="size-10 rounded-xl flex items-center justify-center group-hover:bg-slate-50 transition-colors">
                                    <span className="material-symbols-outlined text-2xl group-hover:fill-current">shopping_cart</span>
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest hidden lg:block">Cart</span>
                                {cartCount > 0 && (
                                    <span className="absolute top-0 right-0 size-5 bg-secondary text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-lg animate-in zoom-in duration-300">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Nav + Mega Menu */}
            <div className="bg-white border-b border-border-light hidden md:block relative">
                <div className="container mx-auto px-4">
                    <nav className="flex items-center h-14">
                        <button
                            onClick={onToggleCategory}
                            className={`flex items-center gap-2 font-black uppercase tracking-widest text-xs transition-all mr-12 group ${categoryMenuOpen ? "text-primary" : "text-slate-800 hover:text-primary"}`}
                        >
                            <div className={`size-8 rounded-lg flex items-center justify-center transition-colors ${categoryMenuOpen ? 'bg-primary text-white' : 'bg-slate-50 group-hover:bg-primary group-hover:text-white'}`}>
                                <span className="material-symbols-outlined text-lg">{categoryMenuOpen ? 'close' : 'menu'}</span>
                            </div>
                            Browse Categories
                        </button>

                        <div className="flex items-center gap-2 h-full">
                            {navItems.map((item) => (
                                <button
                                    key={item.key}
                                    onClick={() => handleTabClick(item.key)}
                                    className={`relative flex items-center px-5 h-full text-[11px] font-black uppercase tracking-widest transition-all border-b-2 whitespace-nowrap ${activeTab === item.key ? "text-primary border-primary bg-slate-50" : "text-slate-600 border-transparent hover:text-primary hover:bg-slate-50"}`}
                                >
                                    {item.badge && (
                                        <span className="absolute top-2 right-1 bg-green-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full z-10 shadow-sm">
                                            {item.badge}
                                        </span>
                                    )}
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </nav>
                </div>

                {/* Mega Dropdown Panel */}
                <div className={`absolute left-0 w-full bg-white shadow-2xl overflow-hidden transition-all duration-300 ease-in-out border-b border-slate-100 z-50 ${activeTab ? "max-height-[600px] border-t border-slate-100 opacity-100" : "max-height-0 opacity-0 pointer-events-none"}`} style={{ maxHeight: activeTab ? "600px" : "0" }}>
                    <div className="container mx-auto h-[450px] flex">
                        {activeTab && (
                            <>
                                {/* Sidebar */}
                                <div className="w-[240px] bg-slate-50 border-r border-slate-100 py-8 overflow-y-auto">
                                    {megaMenuData[activeTab]?.sidebar?.map((sub) => (
                                        <button
                                            key={sub}
                                            onClick={() => setActiveSub(sub)}
                                            className={`w-full text-left px-8 py-4 text-[11px] font-black uppercase tracking-widest transition-all ${activeSub === sub ? "bg-white text-primary border-r-4 border-primary shadow-sm" : "text-slate-500 hover:bg-white/50"}`}
                                        >
                                            {sub}
                                        </button>
                                    ))}
                                </div>

                                {/* Content Grid */}
                                <div className="flex-1 p-12 overflow-y-auto bg-white">
                                    <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-50">
                                        <div className="size-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                                            <span className="material-symbols-outlined text-3xl">build_circle</span>
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
                                                {activeSub} Parts
                                            </h3>
                                            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Found in {megaMenuData[activeTab].sidebar?.length} Categories</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-6">
                                        {megaMenuData[activeTab]?.content[activeSub]?.map((item) => (
                                            <Link
                                                key={item}
                                                to={`/shop?brand=${activeTab}&model=${item}`}
                                                onClick={closeMenu}
                                                className="text-[13px] text-slate-500 hover:text-primary transition-all font-bold uppercase tracking-tight flex items-center gap-2 group"
                                            >
                                                <span className="size-1.5 bg-slate-200 group-hover:bg-primary group-hover:scale-150 rounded-full transition-all"></span>
                                                {item}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Search Bar */}
            <form onSubmit={handleSearch} className="md:hidden p-4 bg-white border-b border-border-light">
                <div className="relative w-full group">
                    <input
                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl py-2.5 px-4 pr-12 text-sm focus:border-primary outline-none transition-all font-medium"
                        placeholder="Search products..."
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 size-8 bg-slate-900 rounded-lg flex items-center justify-center text-white">
                        <span className="material-symbols-outlined text-sm">search</span>
                    </button>
                </div>
            </form>
        </header>
    );
}
