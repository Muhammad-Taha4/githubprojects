import { Link } from "react-router-dom";

export default function OrderConfirmation() {
    return (
        <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6 font-sans antialiased text-slate-900">
            <div className="w-full max-w-[700px] space-y-8 py-12">
                {/* TOP SECTION: Success Header */}
                <div className="text-center space-y-4 animate-in fade-in zoom-in duration-700">
                    <div className="relative size-24 mx-auto mb-8">
                        <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-20"></div>
                        <div className="relative size-full bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-200">
                            <span className="material-symbols-outlined text-white text-[48px] font-bold">check</span>
                        </div>
                    </div>
                    <h1 className="text-4xl font-black text-[#1a3a5c] tracking-tight">Order Confirmed!</h1>
                    <p className="text-slate-500 text-lg max-w-md mx-auto">
                        Thank you for your order. We've sent a confirmation email to <span className="font-bold text-slate-900">james@globalfix.com</span>
                    </p>
                    <div className="inline-block bg-white px-8 py-3 rounded-2xl border border-slate-100 shadow-sm align-middle">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-2">Order Receipt</span>
                        <span className="text-lg font-mono font-black text-[#1a3a5c]">#IW-2025-8834</span>
                    </div>
                </div>

                {/* ORDER DETAILS CARD */}
                <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden divide-y divide-slate-50 animate-in slide-in-from-bottom-8 duration-700 delay-200">
                    <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="space-y-1">
                            <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Estimated Delivery</p>
                            <p className="text-lg font-bold text-[#1a3a5c]">3-5 Business Days</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Shipping to</p>
                            <p className="text-sm font-medium text-slate-700 leading-relaxed">
                                James Miller<br />
                                4821 Industrial Parkway<br />
                                Austin, TX 78758
                            </p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Payment Method</p>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="material-symbols-outlined text-slate-400">credit_card</span>
                                <p className="text-sm font-bold text-slate-700">Visa ending in 4242</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 space-y-4">
                        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Ordered Items</h3>
                        <div className="space-y-4">
                            {[
                                { name: "iPhone 13 Pro Max OLED Screen", qty: 2, price: "$290.00" },
                                { name: "Premium Li-Ion Battery Pack", qty: 5, price: "$62.50" },
                                { name: "Charging Port Flex Cable", qty: 1, price: "$8.99" },
                            ].map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center text-sm">
                                    <div className="flex gap-4 items-center">
                                        <span className="size-8 bg-slate-50 rounded flex items-center justify-center font-bold text-slate-400 text-xs">{item.qty}x</span>
                                        <p className="font-bold text-slate-700 uppercase">{item.name}</p>
                                    </div>
                                    <p className="font-mono font-bold text-slate-900">{item.price}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-8 bg-slate-50/50 space-y-3">
                        <div className="flex justify-between text-sm text-slate-500 font-medium">
                            <span>Subtotal</span>
                            <span>$361.49</span>
                        </div>
                        <div className="flex justify-between text-sm text-green-600 font-bold">
                            <span>Wholesale Discount</span>
                            <span>-$35.00</span>
                        </div>
                        <div className="flex justify-between text-sm text-slate-500 font-medium">
                            <span>Shipping (FedEx Ground)</span>
                            <span>$15.00</span>
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                            <span className="text-lg font-bold text-[#1a3a5c]">Total Paid</span>
                            <span className="text-2xl font-black text-primary">$341.49</span>
                        </div>
                    </div>
                </div>

                {/* WHAT HAPPENS NEXT */}
                <div className="space-y-6 animate-in slide-in-from-bottom-8 duration-700 delay-300">
                    <h3 className="text-center text-xs font-black text-slate-400 uppercase tracking-[0.2em]">What Happens Next</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { icon: "settings", title: "Order Processing", desc: "We're preparing your parts (1-2 hours)" },
                            { icon: "local_shipping", title: "Shipped", desc: "FedEx Ground tracking sent to email" },
                            { icon: "inventory", title: "Delivered", desc: "Expected in 3-5 business days" },
                        ].map((step, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 text-center space-y-3 shadow-sm hover:border-blue-100 transition-colors group">
                                <div className="size-12 bg-primary-light text-primary rounded-xl flex items-center justify-center mx-auto group-hover:bg-[#1a3a5c] group-hover:text-white transition-all">
                                    <span className="material-symbols-outlined">{step.icon}</span>
                                </div>
                                <h4 className="font-bold text-sm text-[#1a3a5c] uppercase">{step.title}</h4>
                                <p className="text-xs text-slate-400 font-medium leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* BOTTOM BUTTONS */}
                <div className="flex flex-col gap-3 pt-8 animate-in slide-in-from-bottom-8 duration-700 delay-500">
                    <button className="w-full py-4 bg-[#1a3a5c] hover:bg-[#122b46] text-white font-bold rounded-2xl shadow-xl shadow-blue-900/10 transition-all active:scale-[0.98]">
                        Track Your Order
                    </button>
                    <Link to="/" className="w-full py-4 bg-white hover:bg-slate-50 text-[#1a3a5c] font-bold rounded-2xl border-2 border-slate-100 text-center transition-all">
                        Continue Shopping
                    </Link>
                    <Link to="/account" className="text-center font-bold text-sm text-primary hover:text-primary transition-colors pt-2">
                        View All Orders
                    </Link>
                </div>
            </div>
        </div>
    );
}
