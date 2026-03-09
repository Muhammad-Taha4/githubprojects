import { useState } from "react";
import { Link } from "react-router-dom";

export default function TrackOrder() {
    const [showResult, setShowResult] = useState(false);
    const [orderNumber, setOrderNumber] = useState("");
    const [email, setEmail] = useState("");

    const handleTrack = (e) => {
        e.preventDefault();
        if (orderNumber && email) {
            setShowResult(true);
        }
    };

    const steps = [
        { label: "Order Placed", date: "Jan 15, 2:30 PM", completed: true },
        { label: "Processing", date: "Jan 15, 4:00 PM", completed: true },
        { label: "Shipped", date: "Jan 16, 9:00 AM", detail: "FedEx Ground #123456789", completed: true },
        { label: "Delivered", date: "Expected Jan 20", completed: false },
    ];

    return (
        <div className="min-h-screen bg-[#f8fafc] font-sans antialiased text-slate-900 py-12 lg:py-20">
            <div className="max-w-[800px] mx-auto px-4 space-y-12">
                {/* TOP SECTION: Search Form */}
                <div className="bg-white rounded-[32px] shadow-xl shadow-slate-200/50 border border-slate-100 p-8 lg:p-12 text-center space-y-8 animate-in fade-in slide-in-from-top-10 duration-700">
                    <div className="space-y-3">
                        <h1 className="text-3xl lg:text-4xl font-black text-[#1a3a5c] tracking-tight">Track Your Order</h1>
                        <p className="text-slate-500 font-medium">Enter your order details below to see the real-time status of your shipment.</p>
                    </div>

                    <form onSubmit={handleTrack} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
                        <div className="text-left space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Order Number</label>
                            <input
                                required
                                type="text"
                                placeholder="e.g. IW-2025-8834"
                                value={orderNumber}
                                onChange={(e) => setOrderNumber(e.target.value)}
                                className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-primary focus:ring-primary focus:ring-primary/5 outline-none transition-all font-mono text-sm"
                            />
                        </div>
                        <div className="text-left space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                            <input
                                required
                                type="email"
                                placeholder="james@globalfix.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-primary focus:ring-primary focus:ring-primary/5 outline-none transition-all text-sm"
                            />
                        </div>
                        <button type="submit" className="w-full bg-[#1a3a5c] hover:bg-[#122b46] text-white font-black py-4 rounded-2xl shadow-lg shadow-blue-900/10 transition-all active:scale-[0.98] uppercase tracking-wider text-sm">
                            Track Order
                        </button>
                    </form>
                </div>

                {/* TRACKING RESULT */}
                {showResult && (
                    <div className="space-y-8 animate-in slide-in-from-bottom-10 duration-700">
                        {/* Order Info Summary */}
                        <div className="bg-[#1a3a5c] text-white rounded-[24px] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl shadow-blue-900/10">
                            <div className="flex items-center gap-4">
                                <div className="size-12 rounded-xl bg-white/10 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-blue-400">inventory_2</span>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-blue-300 uppercase tracking-widest">Order Number</p>
                                    <p className="text-lg font-black tracking-tight">{orderNumber}</p>
                                </div>
                            </div>
                            <div className="flex gap-8 text-sm">
                                <div>
                                    <p className="text-[10px] font-bold text-blue-300 uppercase tracking-widest">Date</p>
                                    <p className="font-bold">Jan 15, 2025</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-blue-300 uppercase tracking-widest">Items</p>
                                    <p className="font-bold">3 Items</p>
                                </div>
                            </div>
                        </div>

                        {/* PROGRESS TRACKER */}
                        <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
                            <div className="space-y-10">
                                {steps.map((step, idx) => (
                                    <div key={idx} className="flex gap-6 group relative">
                                        {/* Line */}
                                        {idx !== steps.length - 1 && (
                                            <div className={`absolute left-[19px] top-10 w-0.5 h-10 ${step.completed ? "bg-green-500" : "bg-slate-100"}`}></div>
                                        )}

                                        <div className={`size-10 rounded-full flex items-center justify-center shrink-0 z-10 ${step.completed ? "bg-green-500 text-white" : "bg-slate-100 text-slate-300"}`}>
                                            {step.completed ? (
                                                <span className="material-symbols-outlined text-[20px] font-bold">check</span>
                                            ) : (
                                                <span className="material-symbols-outlined text-[20px]">schedule</span>
                                            )}
                                        </div>

                                        <div className="flex-1 pb-2">
                                            <div className="flex justify-between items-start mb-1">
                                                <h4 className={`font-bold uppercase tracking-tight ${step.completed ? "text-slate-900" : "text-slate-400"}`}>
                                                    {step.label}
                                                </h4>
                                                <span className="text-xs font-bold text-slate-400">{step.date}</span>
                                            </div>
                                            {step.detail && (
                                                <p className="text-xs font-bold text-primary bg-primary-light inline-block px-2 py-1 rounded mt-1">
                                                    {step.detail}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* SHIPMENT DETAILS */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm space-y-6">
                                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Shipment Details</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500 font-medium">Carrier</span>
                                        <span className="font-bold text-[#1a3a5c]">FedEx Ground</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500 font-medium">Tracking Number</span>
                                        <button className="font-bold text-primary hover:underline cursor-pointer">123456789</button>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500 font-medium">Estimated Delivery</span>
                                        <span className="font-bold text-green-600">January 20, 2025</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm space-y-6">
                                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Route Info</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500 font-medium">Ship From</span>
                                        <span className="font-bold text-[#1a3a5c]">Dallas, TX</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500 font-medium">Ship To</span>
                                        <span className="font-bold text-[#1a3a5c]">Austin, TX</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ITEMS IN ORDER */}
                        <div className="bg-white rounded-[32px] border border-slate-100 overflow-hidden shadow-sm">
                            <div className="px-8 py-6 border-b border-slate-50 bg-slate-50/50">
                                <h3 className="text-xs font-black text-[#1a3a5c] uppercase tracking-[0.2em]">Items in this Package</h3>
                            </div>
                            <div className="p-8 space-y-6">
                                {[
                                    { name: "iPhone 13 Pro Max OLED Display Assembly", sku: "LCD-IP13PM-SO", qty: 2 },
                                    { name: "Premium Li-Ion Battery for iPhone 13 Pro Max", sku: "BAT-IP13PM-PR", qty: 1 },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-center gap-4">
                                        <div className="space-y-1">
                                            <p className="text-sm font-bold text-slate-800 uppercase leading-snug">{item.name}</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">SKU: {item.sku}</p>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-xs font-black text-slate-400">QTY</span>
                                            <p className="font-black text-[#1a3a5c]">{item.qty}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* NEED HELP? */}
                        <div className="bg-primary-light rounded-[32px] p-8 text-center space-y-4 border border-blue-100">
                            <h4 className="text-lg font-bold text-[#1a3a5c]">Need help with this order?</h4>
                            <p className="text-sm text-slate-500 px-8">Our support team is available Mon-Fri 8:00 AM - 7:00 PM CST to assist with any shipment issues.</p>
                            <div className="pt-2">
                                <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3 bg-white hover:bg-slate-50 text-primary font-bold rounded-xl border border-blue-100 transition-all shadow-sm">
                                    <span className="material-symbols-outlined text-[18px]">support_agent</span>
                                    Contact Support
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
