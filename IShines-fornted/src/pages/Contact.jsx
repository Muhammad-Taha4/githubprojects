import { useState } from "react";
import { Link } from "react-router-dom";

export default function Contact() {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        companyName: "",
        subject: "General Inquiry",
        message: "",
    });

    const [openFaq, setOpenFaq] = useState(0);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Sending message...", formData);
        setSubmitted(true);
        // Simulate API call
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }, 100);
    };

    const faqs = [
        {
            q: "How do I set up a wholesale account?",
            a: "To set up a wholesale account, simply fill out the contact form or register through our Sign Up page. Our team will review your business information and tax ID to activate your tiered wholesale pricing within 24 hours.",
        },
        {
            q: "What are your minimum order quantities?",
            a: "We believe in supporting businesses of all sizes. While most items don't have a strict MOQ, wholesale tiered pricing begins at 10+ units for most small components like batteries and charging ports.",
        },
        {
            q: "Do you ship outside the United States?",
            a: "Currently, we focused on providing lightning-fast service to the US market via our Dallas hub. We do ship to Canada and Puerto Rico, but for other international regions, please contact our sales team directly.",
        },
    ];

    return (
        <div className="min-h-screen bg-white font-sans antialiased text-slate-900">
            {/* Header Banner */}
            <section className="bg-[#1a3a5c] py-16 text-white text-center">
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="text-4xl font-black tracking-tight mb-4">Contact iShine Wireless</h1>
                    <p className="text-slate-300 max-w-2xl mx-auto font-medium">
                        Based in Dallas, TX, we're here to support your repair business with premium parts and expert guidance.
                    </p>
                </div>
            </section>

            <main className="max-w-7xl mx-auto px-4 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    {/* LEFT SIDE: Contact Info */}
                    <div className="lg:col-span-5 space-y-12">
                        <div className="space-y-4">
                            <h2 className="text-3xl font-black text-[#1a3a5c]">Get In Touch</h2>
                            <p className="text-slate-500 font-medium leading-relaxed">
                                Questions about wholesale pricing? Ready to open an account? Our team of experts is ready to help you grow your profit margins.
                            </p>
                        </div>

                        <div className="space-y-6">
                            {[
                                { icon: "location_on", label: "Our Warehouse", value: "11311 Harry Hines Blvd #503, Dallas, TX 75229" },
                                { icon: "phone", label: "Call Us", value: "(469) 260-2475" },
                                { icon: "email", label: "Sales & Support", value: "sales@ishinewireless.com" },
                                { icon: "schedule", label: "Business Hours", value: "Mon-Fri 8:00 AM - 7:00 PM CST" },
                            ].map((info) => (
                                <div key={info.label} className="flex gap-5 p-6 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
                                    <div className="size-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary group-hover:bg-[#1a3a5c] group-hover:text-white transition-all">
                                        <span className="material-symbols-outlined">{info.icon}</span>
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{info.label}</h4>
                                        <p className="font-bold text-slate-900 leading-tight">{info.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-6">
                            <h4 className="text-xs font-black text-[#1a3a5c] uppercase tracking-[0.2em] flex items-center gap-4">
                                Follow Us
                                <div className="flex-1 h-px bg-slate-100"></div>
                            </h4>
                            <button className="size-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-[#1a3a5c] hover:text-white hover:border-[#1a3a5c] transition-all overflow-hidden">
                                <span className="font-bold">FB</span>
                            </button>
                        </div>

                        {/* Map Placeholder */}
                        <div className="aspect-[16/9] rounded-3xl bg-slate-100 border border-slate-200 flex flex-col items-center justify-center gap-3 text-slate-400 group cursor-default shadow-inner">
                            <span className="material-symbols-outlined text-[48px] group-hover:scale-110 transition-transform">map_outline</span>
                            <p className="font-bold uppercase tracking-widest text-sm">Dallas, TX</p>
                        </div>
                    </div>

                    {/* RIGHT SIDE: Contact Form */}
                    <div className="lg:col-span-7">
                        {submitted ? (
                            <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200/60 border border-slate-100 p-12 lg:p-20 text-center space-y-6 animate-in zoom-in duration-500">
                                <div className="size-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="material-symbols-outlined text-[40px] font-bold">check</span>
                                </div>
                                <h2 className="text-3xl font-black text-[#1a3a5c]">Message Sent!</h2>
                                <p className="text-slate-500 text-lg">
                                    Thank you for reaching out. We've received your inquiry and will reply within <span className="font-bold text-slate-900">24 hours</span>.
                                </p>
                                <div className="pt-4">
                                    <button onClick={() => setSubmitted(false)} className="text-primary font-bold hover:underline">
                                        Send another message
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200/60 border border-slate-100 p-8 lg:p-12">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">First Name</label>
                                            <input required name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full px-4 py-4 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-primary focus:ring-primary focus:ring-primary/5 outline-none transition-all placeholder:text-slate-300" placeholder="Jane" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Last Name</label>
                                            <input required name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full px-4 py-4 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-primary focus:ring-primary focus:ring-primary/5 outline-none transition-all placeholder:text-slate-300" placeholder="Doe" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                                            <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-4 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-primary focus:ring-primary focus:ring-primary/5 outline-none transition-all placeholder:text-slate-300" placeholder="jane@company.com" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Phone Number</label>
                                            <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-4 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-primary focus:ring-primary focus:ring-primary/5 outline-none transition-all placeholder:text-slate-300" placeholder="(555) 000-0000" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Company Name</label>
                                            <input required name="companyName" value={formData.companyName} onChange={handleInputChange} className="w-full px-4 py-4 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-primary focus:ring-primary focus:ring-primary/5 outline-none transition-all placeholder:text-slate-300" placeholder="Your Repair Shop" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Subject</label>
                                            <select name="subject" value={formData.subject} onChange={handleInputChange} className="w-full px-4 py-4 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-primary outline-none transition-all appearance-none cursor-pointer">
                                                <option>General Inquiry</option>
                                                <option>Wholesale Account</option>
                                                <option>Order Issue</option>
                                                <option>Product Question</option>
                                                <option>Other</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Message</label>
                                        <textarea required name="message" value={formData.message} onChange={handleInputChange} rows="5" className="w-full px-4 py-4 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-primary focus:ring-primary focus:ring-primary/5 outline-none transition-all placeholder:text-slate-300 resize-none" placeholder="How can we help you?" />
                                    </div>

                                    <button type="submit" className="w-full bg-[#1a3a5c] hover:bg-[#122b46] text-white font-black py-5 rounded-3xl shadow-xl shadow-blue-900/20 transition-all active:scale-[0.98] uppercase tracking-[0.1em]">
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>

                {/* BOTTOM: FAQ Section */}
                <div className="mt-32 max-w-4xl mx-auto space-y-12">
                    <div className="text-center space-y-4">
                        <h2 className="text-sm font-black text-primary uppercase tracking-[0.4em]">Need Answers Fast?</h2>
                        <p className="text-3xl font-black text-[#1a3a5c]">Wholesale FAQ</p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <div key={idx} className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <button
                                    onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                                    className="w-full px-8 py-6 text-left flex items-center justify-between group"
                                >
                                    <span className="font-bold text-[#1a3a5c] group-hover:text-primary transition-colors">{faq.q}</span>
                                    <span className={`material-symbols-outlined text-slate-300 transition-transform ${openFaq === idx ? "rotate-180" : ""}`}>
                                        expand_more
                                    </span>
                                </button>
                                <div className={`transition-all duration-300 ease-in-out ${openFaq === idx ? "max-h-96" : "max-h-0"} overflow-hidden`}>
                                    <div className="px-8 pb-8 text-slate-500 leading-relaxed font-medium">
                                        {faq.a}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
