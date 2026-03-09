import React from 'react';
import { Link } from 'react-router-dom';

const WholesalePage = () => {
    return (
        <div className="bg-slate-50 text-slate-900 font-display min-h-screen flex flex-col antialiased">
            {/* Top Navigation */}
            <header className="sticky top-0 z-50 bg-white border-b border-slate-200 w-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo Section */}
                        <Link to="/" className="flex items-center gap-4">
                            <h1 className="text-xl font-bold tracking-tight text-slate-900">MobilesCentrix</h1>
                        </Link>
                        {/* Right Actions */}
                        <div className="flex items-center gap-4">
                            <div className="hidden md:flex items-center gap-2 text-slate-500 text-sm mr-4">
                                <span className="material-symbols-outlined text-[20px]">verified_user</span>
                                <span>Secure Checkout</span>
                            </div>
                            <button className="flex items-center justify-center h-10 px-4 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors text-sm font-semibold">
                                <span className="material-symbols-outlined text-[20px] mr-2">shopping_cart</span>
                                <span>Cart (12)</span>
                            </button>
                            <button className="p-2 text-slate-400 hover:text-primary">
                                <span className="material-symbols-outlined">help</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            {/* Main Content Area */}
            <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative">
                    {/* Left Column: Checkout Forms */}
                    <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-8">
                        {/* Breadcrumbs/Progress */}
                        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                            <Link to="/cart" className="text-primary font-medium cursor-pointer">Cart</Link>
                            <span className="material-symbols-outlined text-[16px] text-slate-400">chevron_right</span>
                            <span className="text-slate-900 font-semibold">Checkout</span>
                            <span className="material-symbols-outlined text-[16px] text-slate-400">chevron_right</span>
                            <span>Confirmation</span>
                        </nav>
                        {/* Section 1: Shipping Address */}
                        <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold text-sm">1</span>
                                    <h2 className="text-xl font-bold text-slate-900">Shipping Address</h2>
                                </div>
                                <button className="text-sm text-primary font-medium hover:underline">Use Saved Address</button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-600 mb-1">Company Name</label>
                                    <input className="w-full rounded-lg border-slate-200 bg-slate-50 text-slate-900 focus:ring-primary focus:border-primary py-2.5 px-3 text-sm" placeholder="e.g. Tech Solutions Ltd." type="text" defaultValue="Global Mobile Fix Inc." />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-600 mb-1">First Name</label>
                                    <input className="w-full rounded-lg border-slate-200 bg-slate-50 text-slate-900 focus:ring-primary focus:border-primary py-2.5 px-3 text-sm" type="text" defaultValue="James" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-600 mb-1">Last Name</label>
                                    <input className="w-full rounded-lg border-slate-200 bg-slate-50 text-slate-900 focus:ring-primary focus:border-primary py-2.5 px-3 text-sm" type="text" defaultValue="Miller" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-600 mb-1">Street Address</label>
                                    <input className="w-full rounded-lg border-slate-200 bg-slate-50 text-slate-900 focus:ring-primary focus:border-primary py-2.5 px-3 text-sm" type="text" defaultValue="4821 Industrial Parkway, Suite 400" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-600 mb-1">City</label>
                                    <input className="w-full rounded-lg border-slate-200 bg-slate-50 text-slate-900 focus:ring-primary focus:border-primary py-2.5 px-3 text-sm" type="text" defaultValue="Austin" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-600 mb-1">State</label>
                                        <select className="w-full rounded-lg border-slate-200 bg-slate-50 text-slate-900 focus:ring-primary focus:border-primary py-2.5 px-3 text-sm" defaultValue="TX">
                                            <option>TX</option>
                                            <option>CA</option>
                                            <option>NY</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-600 mb-1">ZIP</label>
                                        <input className="w-full rounded-lg border-slate-200 bg-slate-50 text-slate-900 focus:ring-primary focus:border-primary py-2.5 px-3 text-sm" type="text" defaultValue="78758" />
                                    </div>
                                </div>
                                <div className="md:col-span-2 flex items-center gap-2 mt-2">
                                    <input defaultChecked className="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4" type="checkbox" />
                                    <span className="text-sm text-slate-500">Save this address for future wholesale orders</span>
                                </div>
                            </div>
                        </section>
                        {/* Section 2: Shipping Method */}
                        <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold text-sm">2</span>
                                <h2 className="text-xl font-bold text-slate-900">Shipping Method</h2>
                            </div>
                            <div className="space-y-4">
                                {/* Option 1: Freight */}
                                <label className="relative flex cursor-pointer rounded-lg border border-primary bg-primary/5 p-4 shadow-sm focus:outline-none ring-1 ring-primary">
                                    <input defaultChecked className="sr-only" name="shipping-method" type="radio" value="freight" />
                                    <span className="flex flex-1">
                                        <span className="flex flex-col">
                                            <span className="block text-sm font-bold text-slate-900">Standard LTL Freight (Palletized)</span>
                                            <span className="mt-1 flex items-center text-sm text-slate-500">
                                                <span className="material-symbols-outlined text-[18px] mr-1">pallet</span>
                                                Best for bulk orders over 150 lbs
                                            </span>
                                            <span className="mt-2 text-xs font-medium text-primary bg-white px-2 py-1 rounded w-fit border border-primary/20">3-5 Business Days</span>
                                        </span>
                                    </span>
                                    <span className="flex flex-col text-right">
                                        <span className="text-sm font-bold text-slate-900">$145.00</span>
                                        <span className="text-xs text-slate-500">Est. Delivery: Oct 24</span>
                                    </span>
                                    <span aria-hidden="true" className="pointer-events-none absolute -inset-px rounded-lg border-2 border-primary"></span>
                                </label>
                                {/* Option 2: Express */}
                                <label className="relative flex cursor-pointer rounded-lg border border-slate-200 p-4 shadow-sm focus:outline-none hover:border-primary/50 transition-colors">
                                    <input className="sr-only" name="shipping-method" type="radio" value="express" />
                                    <span className="flex flex-1">
                                        <span className="flex flex-col">
                                            <span className="block text-sm font-bold text-slate-900">Express Courier (Parcel)</span>
                                            <span className="mt-1 flex items-center text-sm text-slate-500">
                                                <span className="material-symbols-outlined text-[18px] mr-1">local_shipping</span>
                                                Fastest option via FedEx/UPS
                                            </span>
                                            <span className="mt-2 text-xs font-medium text-slate-500 bg-slate-50 px-2 py-1 rounded w-fit border border-slate-200">1-2 Business Days</span>
                                        </span>
                                    </span>
                                    <span className="flex flex-col text-right">
                                        <span className="text-sm font-bold text-slate-900">$210.00</span>
                                        <span className="text-xs text-slate-500">Est. Delivery: Oct 20</span>
                                    </span>
                                </label>
                            </div>
                        </section>
                        {/* Section 3: Payment */}
                        <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold text-sm">3</span>
                                    <h2 className="text-xl font-bold text-slate-900">Payment Method</h2>
                                </div>
                                <div className="flex items-center gap-1 text-slate-500">
                                    <span className="material-symbols-outlined text-[18px]">lock</span>
                                    <span className="text-xs font-medium">Encrypted & Secure</span>
                                </div>
                            </div>
                            {/* Payment Tabs */}
                            <div className="border-b border-slate-200 mb-6">
                                <nav aria-label="Tabs" className="-mb-px flex space-x-8">
                                    <Link className="border-primary text-primary whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium flex items-center gap-2" to="#">
                                        <span className="material-symbols-outlined text-[20px]">credit_card</span>
                                        Credit Card
                                    </Link>
                                    <Link className="border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-900 whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium flex items-center gap-2" to="#">
                                        <span className="material-symbols-outlined text-[20px]">account_balance</span>
                                        Net 30 Terms
                                    </Link>
                                    <Link className="border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-900 whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium flex items-center gap-2" to="#">
                                        <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
                                        Wire Transfer
                                    </Link>
                                </nav>
                            </div>
                            {/* Credit Card Form */}
                            <div className="space-y-4 max-w-lg">
                                <div>
                                    <label className="block text-sm font-medium text-slate-600 mb-1">Card Number</label>
                                    <div className="relative">
                                        <input className="w-full rounded-lg border-slate-200 bg-slate-50 text-slate-900 focus:ring-primary focus:border-primary py-2.5 pl-10 pr-3 text-sm" placeholder="0000 0000 0000 0000" type="text" />
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="material-symbols-outlined text-slate-400 text-[20px]">credit_card</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-600 mb-1">Expiration Date</label>
                                        <input className="w-full rounded-lg border-slate-200 bg-slate-50 text-slate-900 focus:ring-primary focus:border-primary py-2.5 px-3 text-sm" placeholder="MM / YY" type="text" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-600 mb-1">CVC</label>
                                        <div className="relative">
                                            <input className="w-full rounded-lg border-slate-200 bg-slate-50 text-slate-900 focus:ring-primary focus:border-primary py-2.5 px-3 text-sm" placeholder="123" type="text" />
                                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                                                <span className="material-symbols-outlined text-[18px]">help</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-600 mb-1">Name on Card</label>
                                    <input className="w-full rounded-lg border-slate-200 bg-slate-50 text-slate-900 focus:ring-primary focus:border-primary py-2.5 px-3 text-sm" placeholder="Full Name" type="text" />
                                </div>
                                <div className="pt-4">
                                    <div className="bg-primary-light p-4 rounded-lg flex items-start gap-3">
                                        <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">info</span>
                                        <div className="text-xs text-slate-900">
                                            <p className="font-semibold mb-1">Tax Exemption</p>
                                            <p className="text-slate-600">If you have a valid resale certificate on file, tax will be removed at the final step of processing.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    {/* Right Column: Order Summary (Sticky) */}
                    <div className="lg:col-span-5 xl:col-span-4">
                        <div className="sticky top-24 space-y-6">
                            {/* Summary Card */}
                            <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                                <div className="p-6 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
                                    <h2 className="text-lg font-bold text-slate-900">Order Summary</h2>
                                    <span className="text-sm text-slate-500">12 Items</span>
                                </div>
                                {/* Scrollable Items Area */}
                                <div className="max-h-[320px] overflow-y-auto p-6 space-y-6">
                                    {/* Item 1 */}
                                    <div className="flex gap-4">
                                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-slate-200 bg-white">
                                            <img className="h-full w-full object-cover object-center" alt="Smartphone screen component close up" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAM_2_Fcrn78Z7LUTlA1wJ6qiP23vXfr6bADweZ4bS72Oq3Q0cMcsQZIOTnttVwrXMLcfXtS6rVl8Q1kSEkHfc5l-880yGoccNnIr48z48J5FYsTWb89cVd-QRkr9Ac6Nux-zIRsdiTDU0Uw0EU2ATYYSmeTaMEHsjMa0E7f7puSQfPLceOuqfWZf6uugeoHVraX6BFOhb45SadnLFyvxFiFOkQtqwy2pSMdbB4nh79CQdbGsHwMSNtoEty-DViBrR6ZF-4AUhr" />
                                        </div>
                                        <div className="flex flex-1 flex-col">
                                            <div>
                                                <div className="flex justify-between text-base font-medium text-slate-900">
                                                    <h3 className="text-sm line-clamp-2 leading-snug"><Link to="/shop/1" className="hover:text-primary transition-colors">iPhone 13 Pro Max OLED Display Assembly - Soft OLED</Link></h3>
                                                    <p className="ml-4 text-sm whitespace-nowrap">$145.00</p>
                                                </div>
                                                <p className="mt-1 text-xs text-slate-500">SKU: LCD-IP13PM-SO</p>
                                            </div>
                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                <p className="text-slate-500">Qty 5</p>
                                                <div className="flex text-primary">
                                                    <button className="font-medium hover:text-primary-dark text-xs" type="button">Edit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Item 2 */}
                                    <div className="flex gap-4">
                                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-slate-200 bg-white">
                                            <img className="h-full w-full object-cover object-center" alt="Electronic battery component" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOI8YdiUWrOfnViATgmPvL60ix4dUnR1dIx9TTDZfx225RFwWWL7uw4PwIcJeBvJSA433QRmFenEBOgipaeG6-aztSL7AtwE0rBYzYZsK_463TRSMrwfn7bQxbELaFP3n2pQbaDOWKl0ZO0Itu7S_IrOLg7tcIlgUbakB7T5lUEtV3vJveRvUhE1bdgwuoTLZpqPAXqc68s1kyBxSJNPO5xHS-EzpvsIpkCyKgFwNa-ZQ_523iUx3VXXhiJ9PCPB8Rwkxxzowl" />
                                        </div>
                                        <div className="flex flex-1 flex-col">
                                            <div>
                                                <div className="flex justify-between text-base font-medium text-slate-900">
                                                    <h3 className="text-sm line-clamp-2 leading-snug"><Link to="/shop/2" className="hover:text-primary transition-colors">Replacement Battery for Samsung Galaxy S21 - OEM Capacity</Link></h3>
                                                    <p className="ml-4 text-sm whitespace-nowrap">$18.50</p>
                                                </div>
                                                <p className="mt-1 text-xs text-slate-500">SKU: BAT-SAMS21</p>
                                            </div>
                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                <p className="text-slate-500">Qty 20</p>
                                                <div className="flex text-primary">
                                                    <button className="font-medium hover:text-primary-dark text-xs" type="button">Edit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Item 3 */}
                                    <div className="flex gap-4">
                                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-slate-200 bg-white">
                                            <img className="h-full w-full object-cover object-center" alt="Charging port flex cable" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMR7kc1huMQJVzvl2LItd9XXm50EuqUIJN0kiIo-t70NpLVVWtcISeHWYF57AOFRXF_vfAoD2XUso5Ya3TP9UPmqX7CnkK6kJU6XDH3zQBsovCrZ5jVYpbEanuACCa2tHWLrbeIZhst5dBYnOJm4OND5BECRebG_X6QjPPBUYcTyMl44KErYUCPgub6fuaRBzXs3tUuQiVV6WdJjuEYRHrMKInrqHTUMrYa71ss3g5tqDnWJcVBGkoxGenZCGoWdgJje_VUlW6" />
                                        </div>
                                        <div className="flex flex-1 flex-col">
                                            <div>
                                                <div className="flex justify-between text-base font-medium text-slate-900">
                                                    <h3 className="text-sm line-clamp-2 leading-snug"><Link to="/shop/3" className="hover:text-primary transition-colors">USB-C Charging Port Flex Cable - Universal Wholesale Pack</Link></h3>
                                                    <p className="ml-4 text-sm whitespace-nowrap">$4.25</p>
                                                </div>
                                                <p className="mt-1 text-xs text-slate-500">SKU: FLX-USB-C-100</p>
                                            </div>
                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                <p className="text-slate-500">Qty 50</p>
                                                <div className="flex text-primary">
                                                    <button className="font-medium hover:text-primary-dark text-xs" type="button">Edit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Calculations */}
                                <div className="border-t border-slate-200 p-6 bg-slate-50 space-y-4">
                                    <div className="flex justify-between text-sm text-slate-600">
                                        <p>Subtotal</p>
                                        <p className="font-medium text-slate-900">$1,307.50</p>
                                    </div>
                                    <div className="flex justify-between text-sm text-slate-600">
                                        <p>Freight / Shipping</p>
                                        <p className="font-medium text-slate-900">$145.00</p>
                                    </div>
                                    <div className="flex justify-between text-sm text-slate-600">
                                        <div className="flex items-center gap-1">
                                            <p>Estimated Tax</p>
                                            <span className="material-symbols-outlined text-[14px] cursor-help" title="Tax calculated based on shipping address">help</span>
                                        </div>
                                        <p className="font-medium text-slate-900">$108.94</p>
                                    </div>
                                    <div className="border-t border-slate-200 pt-4 flex justify-between items-center">
                                        <p className="text-base font-bold text-slate-900">Grand Total</p>
                                        <p className="text-2xl font-bold text-primary">$1,561.44</p>
                                    </div>
                                    <button className="w-full flex items-center justify-center rounded-lg border border-transparent bg-primary px-6 py-4 text-base font-bold text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-primary focus:ring-primary focus:ring-offset-2 transition-all" type="button">
                                        Place Wholesale Order
                                    </button>
                                    <div className="flex justify-center items-center gap-4 opacity-50 pt-2">
                                        <span className="material-symbols-outlined text-2xl" title="Visa">payments</span>
                                        <span className="material-symbols-outlined text-2xl" title="Mastercard">credit_card</span>
                                        <span className="material-symbols-outlined text-2xl" title="Amex">account_balance</span>
                                        <span className="material-symbols-outlined text-2xl" title="Secure">lock</span>
                                    </div>
                                </div>
                            </div>
                            {/* Help Card */}
                            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0">
                                        <span className="material-symbols-outlined text-primary">support_agent</span>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-slate-900">Need help with your order?</h3>
                                        <p className="mt-1 text-sm text-slate-500">
                                            Call our wholesale support line at <a className="font-medium text-primary hover:underline" href="#">1-800-555-0199</a> or email support@mobilescentrix.com
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            {/* Simple Footer */}
            <footer className="bg-white border-t border-slate-200 mt-auto py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-slate-500">© 2024 MobilesCentrix. All rights reserved.</p>
                    <div className="flex gap-6 text-sm text-slate-500">
                        <Link className="hover:text-primary transition-colors" to="/privacy">Privacy Policy</Link>
                        <Link className="hover:text-primary transition-colors" to="/terms">Terms of Service</Link>
                        <Link className="hover:text-primary transition-colors" to="/policy">Return Policy</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default WholesalePage;
