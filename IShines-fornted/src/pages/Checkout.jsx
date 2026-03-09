import { useState } from "react";
import { Link } from "react-router-dom";

export default function Checkout() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
    phone: "",
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
    billingSameAsShipping: true,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const nextStep = (e) => {
    e.preventDefault();
    setCurrentStep((prev) => prev + 1);
    window.scrollTo(0, 0);
  };

  const cartItems = [
    {
      id: 1,
      name: "iPhone 13 Pro Max OLED Display Assembly - Soft OLED",
      qty: 5,
      price: 145.0,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAM_2_Fcrn78Z7LUTlA1wJ6qiP23vXfr6bADweZ4bS72Oq3Q0cMcsQZIOTnttVwrXMLcfXtS6rVl8Q1kSEkHfc5l-880yGoccNnIr48z48J5FYsTWb89cVd-QRkr9Ac6Nux-zIRsdiTDU0Uw0EU2ATYYSmeTaMEHsjMa0E7f7puSQfPLceOuqfWZf6uugeoHVraX6BFOhb45SadnLFyvxFiFOkQtqwy2pSMdbB4nh79CQdbGsHwMSNtoEty-DViBrR6ZF-4AUhr",
    },
    {
      id: 2,
      name: "Premium Lithium-Ion Battery for iPhone 13 Pro Max",
      qty: 20,
      price: 12.5,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDWCBa-QPF4bMzG3AG311_GN4gKqbVJww8pO2OaNYK26org1sE3a2Zy6gu0mX5_uYy2Korrh3lXWef6ZHahChdtFaL6sgEM3-7sPKd02gQleX2i6g-HXhui_frVgvmqoWfokAugnerWZ1FfmkYE70RG09Ud0kZlBws3-uiImklPRqFu23yQO1z0_D894okAqHTn6LqWBN-_G3KrjOl3f2kYaM0kuisOXKpvYIK1j5zqRqmkBf6LrrYSOtYVN6WNqu-zm37TYPBj",
    },
    {
      id: 3,
      name: "USB-C Charging Port Flex Cable for Samsung S21",
      qty: 10,
      price: 8.99,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMR7kc1huMQJVzvl2LItd9XXm50EuqUIJN0kiIo-t70NpLVVWtcISeHWYF57AOFRXF_vfAoD2XUso5Ya3TP9UPmqX7CnkK6kJU6XDH3zQBsovCrZ5jVYpbEanuACCa2tHWLrbeIZhst5dBYnOJm4OND5BECRebG_X6QjPPBUYcTyMl44KErYUCPgub6fuaRBzXs3tUuQiVV6WdJjuEYRHrMKInrqHTUMrYa71ss3g5tqDnWJcVBGkoxGenZCGoWdgJje_VUlW6",
    },
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const volumeDiscount = 110.5;
  const shipping = 15.0;
  const total = subtotal - volumeDiscount + shipping;
  const freeShippingThreshold = 5000;
  const progress = Math.min((total / freeShippingThreshold) * 100, 100);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans antialiased">
      {/* Checkout Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[28px] text-[#1a3a5c]">
              smartphone
            </span>
            <span className="text-xl font-bold tracking-tight text-[#1a3a5c]">
              iShine Wireless
            </span>
          </Link>
          <div className="flex items-center gap-4 text-slate-500">
            <span className="material-symbols-outlined">lock</span>
            <span className="text-sm font-medium hidden sm:inline">
              Secure Checkout
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT SIDE: Steps */}
          <div className="lg:col-span-8 space-y-8">
            {/* Step Indicator */}
            <div className="flex items-center justify-between max-w-2xl mx-auto mb-12 relative">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 z-0"></div>
              <div
                className="absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2 z-0 transition-all duration-500"
                style={{ width: `${(currentStep - 1) * 50}%` }}
              ></div>

              {[
                { step: 1, label: "Shipping" },
                { step: 2, label: "Payment" },
                { step: 3, label: "Success" },
              ].map((item) => (
                <div key={item.step} className="relative z-10 flex flex-col items-center gap-2">
                  <div
                    className={`size-10 rounded-full flex items-center justify-center font-bold transition-all ${currentStep >= item.step
                        ? "bg-primary text-white shadow-lg shadow-blue-200"
                        : "bg-white text-slate-400 border-2 border-slate-200"
                      }`}
                  >
                    {currentStep > item.step ? (
                      <span className="material-symbols-outlined text-white">check</span>
                    ) : (
                      item.step
                    )}
                  </div>
                  <span
                    className={`text-xs font-bold uppercase tracking-wider ${currentStep >= item.step ? "text-[#1a3a5c]" : "text-slate-400"
                      }`}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {currentStep === 1 && (
              /* STEP 1: SHIPPING */
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                  <h2 className="text-xl font-bold text-[#1a3a5c]">Shipping Information</h2>
                </div>
                <form onSubmit={nextStep} className="p-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                        Full Name
                      </label>
                      <input
                        required
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-primary focus:ring-primary/5 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                        Company Name
                      </label>
                      <input
                        required
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        placeholder="iShine Repair Shop"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-primary focus:ring-primary/5 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                      Street Address
                    </label>
                    <input
                      required
                      type="text"
                      name="address1"
                      value={formData.address1}
                      onChange={handleInputChange}
                      placeholder="123 repair Lane"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-primary focus:ring-primary/5 outline-none transition-all mb-3"
                    />
                    <input
                      type="text"
                      name="address2"
                      value={formData.address2}
                      onChange={handleInputChange}
                      placeholder="Suite 400 (Optional)"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-primary focus:ring-primary/5 outline-none transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                        City
                      </label>
                      <input
                        required
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-primary focus:ring-primary/5 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                        State
                      </label>
                      <select
                        required
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-primary focus:ring-primary/5 outline-none transition-all"
                      >
                        <option value="">Select State</option>
                        <option value="NY">New York</option>
                        <option value="TX">Texas</option>
                        <option value="CA">California</option>
                        <option value="FL">Florida</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                        ZIP Code
                      </label>
                      <input
                        required
                        type="text"
                        name="zip"
                        value={formData.zip}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-primary focus:ring-primary/5 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                        Country
                      </label>
                      <input
                        readOnly
                        type="text"
                        name="country"
                        value={formData.country}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 outline-none transition-all cursor-not-allowed"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                        Phone Number
                      </label>
                      <input
                        required
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="(555) 000-0000"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-primary focus:ring-primary/5 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="pt-6">
                    <button
                      type="submit"
                      className="w-full md:w-auto px-12 py-4 bg-[#1a3a5c] hover:bg-[#122b46] text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-900/10 active:scale-[0.98]"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </form>
              </div>
            )}

            {currentStep === 2 && (
              /* STEP 2: PAYMENT */
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-[#1a3a5c]">Payment Method</h2>
                  <div className="flex gap-2">
                    <span className="material-symbols-outlined text-[32px] text-slate-300">payments</span>
                    <span className="material-symbols-outlined text-[32px] text-slate-300">credit_card</span>
                  </div>
                </div>
                <form onSubmit={nextStep} className="p-8 space-y-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        required
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="0000 0000 0000 0000"
                        className="w-full px-4 py-3 pl-12 rounded-xl border border-slate-200 focus:border-primary focus:ring-primary focus:ring-primary/5 outline-none transition-all font-mono"
                      />
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        credit_card
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                      Name on Card
                    </label>
                    <input
                      required
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      placeholder="JOHN DOE"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-primary focus:ring-primary/5 outline-none transition-all uppercase"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                        Expiry Date
                      </label>
                      <input
                        required
                        type="text"
                        name="expiry"
                        value={formData.expiry}
                        onChange={handleInputChange}
                        placeholder="MM / YY"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-primary focus:ring-primary/5 outline-none transition-all font-mono text-center"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                        CVV
                      </label>
                      <input
                        required
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-primary focus:ring-primary/5 outline-none transition-all font-mono text-center"
                      />
                    </div>
                  </div>

                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      name="billingSameAsShipping"
                      checked={formData.billingSameAsShipping}
                      onChange={handleInputChange}
                      className="rounded border-slate-300 text-primary focus:ring-primary w-5 h-5"
                    />
                    <span className="text-sm font-medium text-slate-600">Billing address same as shipping</span>
                  </label>

                  <div className="pt-6">
                    <button
                      type="submit"
                      className="w-full py-4 bg-primary hover:bg-primary text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-200 active:scale-[0.98]"
                    >
                      Place Order — ${total.toFixed(2)}
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="w-full py-4 text-slate-400 font-bold hover:text-slate-600 transition-all text-sm mt-2"
                    >
                      Back to Shipping
                    </button>
                  </div>
                </form>
              </div>
            )}

            {currentStep === 3 && (
              /* STEP 3: SUCCESS */
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center space-y-6">
                <div className="size-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="material-symbols-outlined text-green-600 text-[48px] font-bold">check</span>
                </div>
                <h2 className="text-3xl font-bold text-[#1a3a5c]">Order Placed Successfully!</h2>
                <p className="text-slate-500 text-lg">
                  Thank you for your business. We've sent a confirmation email to your address.
                </p>
                <div className="bg-slate-50 rounded-xl p-4 inline-block px-8 py-3">
                  <span className="text-sm text-slate-400 uppercase tracking-widest font-bold">Order Number</span>
                  <p className="text-xl font-mono font-bold text-slate-700 mt-1">#WSH-7749-X2</p>
                </div>
                <div className="pt-8">
                  <Link
                    to="/shop"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-[#1a3a5c] hover:bg-[#122b46] text-white font-bold rounded-xl transition-all"
                  >
                    <span className="material-symbols-outlined">shopping_bag</span>
                    Continue Shopping
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT SIDE: Summary Sidebar */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                <h3 className="font-bold text-[#1a3a5c] flex items-center gap-2 text-lg">
                  <span className="material-symbols-outlined">shopping_cart</span>
                  Order Summary
                </h3>
              </div>
              <div className="p-6 space-y-6">
                {/* Free Shipping Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
                    <span>Free Shipping Progress</span>
                    <span>{progress.toFixed(0)}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 transition-all duration-1000"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">
                    Add <span className="text-[#1a3a5c] font-bold">${(freeShippingThreshold - total).toFixed(2)}</span> more for free FedEx Ground
                  </p>
                </div>

                {/* Items */}
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 group">
                      <div className="size-20 rounded-xl border border-slate-100 bg-slate-50 flex-shrink-0 p-2 group-hover:bg-white transition-colors">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex flex-col justify-center flex-1">
                        <h4 className="text-sm font-bold text-slate-800 line-clamp-2 leading-snug group-hover:text-primary transition-colors uppercase">
                          {item.name}
                        </h4>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs font-bold text-slate-400">QTY: {item.qty}</span>
                          <span className="text-sm font-bold text-slate-900">${(item.price * item.qty).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-3 pt-6 border-t border-slate-100">
                  <div className="flex justify-between text-slate-500 font-medium tracking-tight">
                    <span>Subtotal</span>
                    <span className="text-slate-900">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-green-600 font-bold tracking-tight">
                    <span>Volume Discount</span>
                    <span>-${volumeDiscount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-500 font-medium tracking-tight">
                    <span>Shipping (Standard)</span>
                    <span className="text-slate-900">${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400 font-medium tracking-tight text-sm">
                    <span>Tax</span>
                    <span className="italic">Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between items-end pt-4 border-t border-slate-100">
                    <span className="text-lg font-bold text-[#1a3a5c]">Total</span>
                    <span className="text-2xl font-black text-primary tracking-tighter">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-2 pt-6 opacity-80">
                  {[
                    { icon: "verified_user", name: "Secure SSL" },
                    { icon: "history", name: "30-Day Returns" },
                    { icon: "shield", name: "Protection" },
                  ].map((badge) => (
                    <div key={badge.name} className="flex flex-col items-center gap-1.5 text-center">
                      <div className="size-9 rounded-full bg-slate-100 flex items-center justify-center text-[#1a3a5c]">
                        <span className="material-symbols-outlined text-[20px]">{badge.icon}</span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase leading-tight">
                        {badge.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
