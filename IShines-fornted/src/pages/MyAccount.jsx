import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiFetch } from "../config/api";
import { AuthContext } from "../context/AuthContext";
import toast from 'react-hot-toast';

export default function MyAccount() {
    const { user, setUser, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("dashboard");
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAccountData = async () => {
            try {
                // Fetch real user data
                const userData = await apiFetch('/auth/me');
                setUser(userData.user || userData);

                // Fetch real orders
                const ordersData = await apiFetch('/orders');
                setOrders(ordersData.data || ordersData || []);
            } catch (err) {
                console.error("Failed to load account data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAccountData();
    }, [setUser]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-primary font-bold animate-pulse text-xl">Loading Account...</div>
            </div>
        );
    }

    const navItems = [
        { id: "dashboard", label: "Dashboard Overview", icon: "dashboard" },
        { id: "orders", label: "My Orders", icon: "shopping_bag" },
        { id: "profile", label: "Business Profile", icon: "business" },
        { id: "wishlist", label: "Wishlist", icon: "favorite" },
        { id: "address", label: "Address Book", icon: "location_on" },
        { id: "settings", label: "Account Settings", icon: "settings" },
        { id: "support", label: "FAQ & Support", icon: "help_outline" },
    ];

    const getFirstName = () => user?.name?.split(' ')[0] || 'Customer';

    const renderDashboard = () => {
        // Calculate totals dynamically from user's live orders array
        const totalSpent = orders?.reduce((acc, order) => acc + Number(order.total), 0) || 0;
        const totalOrdersCount = orders?.length || 0;

        return (
            <div className="animate-in fade-in duration-500">
                <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">Welcome back, {getFirstName()}</h2>
                        <p className="text-slate-500 text-sm mt-1">Here's what's happening with your wholesale account today.</p>
                    </div>
                    <Link to="/shop" className="bg-primary hover:bg-[#258ab5] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg active:scale-95">
                        <span className="material-symbols-outlined text-[20px]">add_circle</span>
                        New Quick Order
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-2xl border border-slate-100 p-6 flex justify-between items-start shadow-sm hover:shadow-xl transition-all">
                        <div>
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Total Orders</p>
                            <h3 className="text-4xl font-black text-slate-800 tracking-tighter">{totalOrdersCount}</h3>
                        </div>
                        <div className="bg-blue-50 text-blue-600 rounded-2xl p-4">
                            <span className="material-symbols-outlined text-[32px]">shopping_bag</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-100 p-6 flex justify-between items-start shadow-sm hover:shadow-xl transition-all">
                        <div>
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Total Spent</p>
                            <h3 className="text-4xl font-black text-slate-800 tracking-tighter">${totalSpent.toFixed(2)}</h3>
                        </div>
                        <div className="bg-green-50 text-green-600 rounded-2xl p-4">
                            <span className="material-symbols-outlined text-[32px]">payments</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-100 p-6 flex justify-between items-start shadow-sm hover:shadow-xl transition-all">
                        <div>
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Account Status</p>
                            <h3 className="text-2xl mt-2 font-black text-green-500 tracking-tighter uppercase">{user?.role || 'Customer'}</h3>
                        </div>
                        <div className="bg-green-50 text-green-500 rounded-2xl p-4">
                            <span className="material-symbols-outlined text-[32px]">verified_user</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden mb-8">
                    <div className="p-6 border-b border-slate-50 flex justify-between items-center">
                        <h3 className="font-black text-slate-800 uppercase tracking-tight">Recent Orders</h3>
                        <button onClick={() => setActiveTab("orders")} className="text-primary font-bold text-sm hover:underline">View All Orders</button>
                    </div>
                    <div className="overflow-x-auto">
                        <div className="min-w-[800px] p-6">
                            <div className="bg-slate-50 rounded-2xl px-6 py-4 grid grid-cols-5 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">
                                <span>Order ID</span>
                                <span>Date</span>
                                <span>Status</span>
                                <span>Total Amount</span>
                                <span className="text-right">Action</span>
                            </div>

                            {orders.slice(0, 3).map((order) => (
                                <div key={order.id} className="grid grid-cols-5 items-center px-6 py-5 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                                    <span className="font-bold text-slate-800">#{order.id}</span>
                                    <span className="text-sm text-slate-500">{new Date(order.created_at).toLocaleDateString()}</span>
                                    <div>
                                        <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                                order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                                                    'bg-blue-100 text-blue-700'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <span className="font-bold text-slate-800">${Number(order.total).toFixed(2)}</span>
                                    <div className="text-right">
                                        <button className="text-primary font-bold text-sm hover:underline">Track Order</button>
                                    </div>
                                </div>
                            ))}
                            {orders.length === 0 && (
                                <div className="text-center py-6 text-slate-500 text-sm">No recent orders found.</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderOrders = () => (
        <div className="animate-in fade-in duration-500">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 uppercase tracking-tight">My Wholesale Orders</h2>

            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6">
                    <div className="bg-slate-50 rounded-2xl px-6 py-4 grid grid-cols-5 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">
                        <span>Order ID</span>
                        <span>Date</span>
                        <span>Status</span>
                        <span>Total Amount</span>
                        <span className="text-right">Action</span>
                    </div>

                    {orders.map((order) => (
                        <div key={order.id} className="grid grid-cols-5 items-center px-6 py-5 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                            <span className="font-bold text-slate-800">#{order.id}</span>
                            <span className="text-sm text-slate-500">{new Date(order.created_at).toLocaleDateString()}</span>
                            <div>
                                <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                        order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                                            'bg-blue-100 text-blue-700'
                                    }`}>
                                    {order.status}
                                </span>
                            </div>
                            <span className="font-bold text-slate-800">${Number(order.total).toFixed(2)}</span>
                            <div className="text-right">
                                <button className="text-primary font-bold text-sm hover:underline">View Invoice</button>
                            </div>
                        </div>
                    ))}
                    {orders.length === 0 && (
                        <div className="text-center py-6 text-slate-500 text-sm">You have not placed any orders yet.</div>
                    )}
                </div>
            </div>
        </div>
    );

    const renderProfile = () => (
        <div className="animate-in fade-in duration-500 max-w-3xl">
            <h2 className="text-2xl font-bold text-slate-800 mb-8 uppercase tracking-tight">Business Profile</h2>
            <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Full Name</label>
                        <input type="text" defaultValue={user?.name || ''} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm font-semibold outline-none focus:border-primary transition-colors" />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Email Address</label>
                        <input type="email" readOnly defaultValue={user?.email || ''} className="w-full bg-slate-100 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm font-semibold outline-none text-slate-500" />
                    </div>
                </div>
                <button className="mt-8 bg-primary text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary transition-all shadow-lg active:scale-95">
                    Save Changes
                </button>
            </div>
        </div>
    );

    const renderAddressBook = () => (
        <div className="animate-in fade-in duration-500">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-slate-800 uppercase tracking-tight">Address Book</h2>
                <button className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-all">+ Add New</button>
            </div>
            <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm relative group text-center">
                <p className="text-slate-500 text-sm">No addresses saved yet.</p>
            </div>
        </div>
    );

    const renderSettings = () => (
        <div className="animate-in fade-in duration-500 max-w-2xl">
            <h2 className="text-2xl font-bold text-slate-800 mb-8 uppercase tracking-tight">Account Settings</h2>
            <div className="space-y-8">
                <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm relative text-center">
                    <p className="text-slate-500 text-sm">Settings preferences logic goes here.</p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-[calc(100vh-140px)] flex font-sans antialiased">
            <aside className="w-72 bg-[#1a3356] text-white hidden lg:flex flex-col border-r border-slate-800 shrink-0">
                <div className="p-10 border-b border-white/5">
                    <div className="flex items-center gap-6">
                        <div className="size-16 rounded-3xl bg-[#2ea4d5] flex items-center justify-center font-black text-2xl shadow-xl">
                            {user?.name?.charAt(0)?.toUpperCase()}
                        </div>
                        <div className="overflow-hidden">
                            <h4 className="font-black text-lg leading-tight tracking-tight truncate w-full">{user?.name}</h4>
                            <p className="text-slate-400 text-xs truncate w-full mt-1 border border-transparent">{user?.email}</p>
                            <span className="inline-block px-2 py-0.5 rounded-lg text-[9px] font-black bg-blue-500/20 text-blue-400 uppercase tracking-widest mt-2 border border-blue-500/20">
                                {user?.role || 'Customer'}
                            </span>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 p-6 space-y-1.5 overflow-y-auto">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl font-black uppercase text-[10px] tracking-[0.1em] transition-all w-full text-left ${activeTab === item.id
                                ? "bg-[#2ea4d5] text-white shadow-xl shadow-blue-900/50"
                                : "text-slate-400 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div className="p-6">
                    <button onClick={handleLogout} className="flex items-center gap-3 px-6 py-6 font-black text-[10px] uppercase tracking-[0.15em] text-red-400 hover:text-red-300 transition-all w-full mt-2">
                        <span className="material-symbols-outlined text-[20px]">logout</span>
                        Log Out Account
                    </button>
                </div>
            </aside>

            <main className="flex-1 bg-slate-50 p-6 sm:p-10 min-h-full">
                <div className="max-w-6xl mx-auto">
                    {activeTab === "dashboard" && renderDashboard()}
                    {activeTab === "orders" && renderOrders()}
                    {activeTab === "profile" && renderProfile()}
                    {activeTab === "wishlist" && (
                        <div className="flex flex-col items-center justify-center py-20 animate-in zoom-in duration-500">
                            <div className="size-24 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                                <span className="material-symbols-outlined text-red-400 text-5xl">favorite</span>
                            </div>
                            <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">My Wishlist</h2>
                            <Link to="/wishlist" className="bg-primary text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest mt-8 shadow-xl hover:bg-primary-dark">Open Wishlist</Link>
                        </div>
                    )}
                    {activeTab === "address" && renderAddressBook()}
                    {activeTab === "settings" && renderSettings()}
                    {activeTab === "support" && (
                        <div className="flex flex-col items-center justify-center py-20">
                            <span className="material-symbols-outlined text-slate-200 text-9xl">help_center</span>
                            <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight mt-6">Knowledge Base</h2>
                            <p className="text-slate-500 mt-2">Find answers to common wholesale questions.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
