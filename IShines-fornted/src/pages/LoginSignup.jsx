import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { apiFetch } from "../config/api";
import toast from 'react-hot-toast';

export default function LoginSignup() {
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState("signin");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const [signUpData, setSignUpData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        companyName: "",
        password: "",
        confirmPassword: "",
        businessType: "Repair Shop",
        agreeToTerms: false,
    });

    const handleSignUpChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSignUpData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await apiFetch('/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
            });
            localStorage.setItem('ishine_token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            // Update auth context
            setUser(data.user);
            toast.success('Login successful!');
            if (data.user.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/account');
            }
        } catch (err) {
            toast.error(err.message || 'Login failed');
        }
    };

    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        if (signUpData.password !== signUpData.confirmPassword) {
            return toast.error("Passwords do not match");
        }
        try {
            const data = await apiFetch('/auth/register', {
                method: 'POST',
                body: JSON.stringify({ name: signUpData.firstName + ' ' + signUpData.lastName, email: signUpData.email, password: signUpData.password })
            });
            localStorage.setItem('ishine_token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            setUser(data.user);
            toast.success("Account created successfully!");
            navigate("/account");
        } catch (error) {
            toast.error("Registration failed. Email might be in use.");
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] flex font-sans antialiased text-slate-900">
            {/* LEFT SIDE - Desktop Only */}
            <div className="hidden lg:flex lg:w-1/3 xl:w-1/4 bg-[#1a3a5c] flex-col justify-between p-12 text-white relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>

                <div className="relative z-10">
                    <Link to="/" className="inline-flex items-center gap-2 mb-8 group">
                        <span className="material-symbols-outlined text-[32px] text-blue-400 group-hover:scale-110 transition-transform">
                            smartphone
                        </span>
                        <span className="text-2xl font-bold tracking-tight">iShine Wireless</span>
                    </Link>
                    <h2 className="text-3xl font-bold leading-tight mb-4">
                        Premium Mobile Repair Parts — <span className="text-blue-400">Wholesale Prices</span>
                    </h2>
                    <p className="text-slate-300 text-lg">
                        Join thousands of repair shops and retailers who trust us for quality parts and fast delivery.
                    </p>
                </div>

                <div className="relative z-10 space-y-8">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
                            <span className="material-symbols-outlined text-blue-400">inventory_2</span>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg">10,000+ Products</h4>
                            <p className="text-slate-400 text-sm">Largest inventory of LCDs, batteries, and tools.</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
                            <span className="material-symbols-outlined text-blue-400">payments</span>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg">Wholesale Pricing</h4>
                            <p className="text-slate-400 text-sm">Tiered pricing designed for business growth.</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
                            <span className="material-symbols-outlined text-blue-400">local_shipping</span>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg">Fast US Shipping</h4>
                            <p className="text-slate-400 text-sm">Same-day shipping for orders placed before 4 PM EST.</p>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 text-xs text-slate-400">
                    © 2024 iShine Wireless. All rights reserved.
                </div>
            </div>

            {/* RIGHT SIDE - Form Container */}
            <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
                <div className="w-full max-w-[480px]">
                    {/* Mobile Logo */}
                    <div className="lg:hidden flex justify-center mb-8">
                        <Link to="/" className="inline-flex items-center gap-2">
                            <span className="material-symbols-outlined text-[32px] text-[#1a3a5c]">
                                smartphone
                            </span>
                            <span className="text-2xl font-bold tracking-tight text-[#1a3a5c]">iShine Wireless</span>
                        </Link>
                    </div>

                    {/* Card */}
                    <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
                        {/* Tabs */}
                        <div className="flex border-b border-slate-100">
                            <button
                                onClick={() => setActiveTab("signin")}
                                className={`flex-1 py-4 text-sm font-bold transition-all relative ${activeTab === "signin"
                                    ? "text-[#1a3a5c]"
                                    : "text-slate-400 hover:text-slate-600 bg-slate-50/50"
                                    }`}
                            >
                                Sign In
                                {activeTab === "signin" && (
                                    <div className="absolute bottom-0 left-0 w-full h-1 bg-[#1a3a5c]"></div>
                                )}
                            </button>
                            <button
                                onClick={() => setActiveTab("signup")}
                                className={`flex-1 py-4 text-sm font-bold transition-all relative ${activeTab === "signup"
                                    ? "text-[#1a3a5c]"
                                    : "text-slate-400 hover:text-slate-600 bg-slate-50/50"
                                    }`}
                            >
                                Create Account
                                {activeTab === "signup" && (
                                    <div className="absolute bottom-0 left-0 w-full h-1 bg-[#1a3a5c]"></div>
                                )}
                            </button>
                        </div>

                        <div className="p-8">
                            {activeTab === "signin" ? (
                                /* SIGN IN FORM */
                                <form onSubmit={handleLogin} className="space-y-5">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <input
                                                required
                                                type="email"
                                                name="email"
                                                placeholder="james@example.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-primary focus:ring-primary focus:ring-primary/5 outline-none transition-all placeholder:text-slate-300"
                                            />
                                            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-300">
                                                mail
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                                            Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                required
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                placeholder="••••••••"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-primary focus:ring-primary focus:ring-primary/5 outline-none transition-all placeholder:text-slate-300"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500"
                                            >
                                                <span className="material-symbols-outlined">
                                                    {showPassword ? "visibility_off" : "visibility"}
                                                </span>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <label className="flex items-center gap-2 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                name="rememberMe"
                                                checked={rememberMe}
                                                onChange={(e) => setRememberMe(e.target.checked)}
                                                className="rounded border-slate-300 text-primary focus:ring-primary cursor-pointer w-4 h-4"
                                            />
                                            <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">
                                                Remember Me
                                            </span>
                                        </label>
                                        <Link
                                            to="/forgot-password"
                                            className="text-sm font-bold text-primary hover:text-primary transition-colors"
                                        >
                                            Forgot Password?
                                        </Link>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-[#1a3a5c] hover:bg-[#122b46] text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-900/20 active:scale-[0.98]"
                                    >
                                        Sign In
                                    </button>

                                    <div className="relative flex items-center gap-4 py-2">
                                        <div className="flex-1 h-px bg-slate-100"></div>
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">OR</span>
                                        <div className="flex-1 h-px bg-slate-100"></div>
                                    </div>

                                    <button
                                        type="button"
                                        className="w-full bg-white hover:bg-slate-50 text-slate-600 font-bold py-4 rounded-xl border border-slate-200 transition-all active:scale-[0.98]"
                                    >
                                        Continue as Guest
                                    </button>

                                    <p className="text-center text-sm text-slate-500 pt-2">
                                        Don&apos;t have an account?{" "}
                                        <button
                                            type="button"
                                            onClick={() => setActiveTab("signup")}
                                            className="font-bold text-primary hover:text-primary underline underline-offset-4"
                                        >
                                            Create one
                                        </button>
                                    </p>
                                </form>
                            ) : (
                                /* CREATE ACCOUNT FORM */
                                <form onSubmit={handleSignUpSubmit} className="space-y-5">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                                                First Name
                                            </label>
                                            <input
                                                required
                                                type="text"
                                                name="firstName"
                                                value={signUpData.firstName}
                                                onChange={handleSignUpChange}
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-primary focus:ring-primary focus:ring-primary/5 outline-none transition-all placeholder:text-slate-300"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                                                Last Name
                                            </label>
                                            <input
                                                required
                                                type="text"
                                                name="lastName"
                                                value={signUpData.lastName}
                                                onChange={handleSignUpChange}
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-primary focus:ring-primary focus:ring-primary/5 outline-none transition-all placeholder:text-slate-300"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                                            Email Address
                                        </label>
                                        <input
                                            required
                                            type="email"
                                            name="email"
                                            value={signUpData.email}
                                            onChange={handleSignUpChange}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-primary focus:ring-primary focus:ring-primary/5 outline-none transition-all placeholder:text-slate-300"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                                                Phone Number
                                            </label>
                                            <input
                                                required
                                                type="tel"
                                                name="phone"
                                                value={signUpData.phone}
                                                onChange={handleSignUpChange}
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-primary focus:ring-primary focus:ring-primary/5 outline-none transition-all placeholder:text-slate-300"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                                                Business Type
                                            </label>
                                            <select
                                                name="businessType"
                                                value={signUpData.businessType}
                                                onChange={handleSignUpChange}
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-primary focus:ring-primary focus:ring-primary/5 outline-none transition-all"
                                            >
                                                <option value="Repair Shop">Repair Shop</option>
                                                <option value="Retailer">Retailer</option>
                                                <option value="Distributor">Distributor</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                                            Company Name
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            name="companyName"
                                            value={signUpData.companyName}
                                            onChange={handleSignUpChange}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-primary focus:ring-primary focus:ring-primary/5 outline-none transition-all placeholder:text-slate-300"
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                                            Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                required
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                value={signUpData.password}
                                                onChange={handleSignUpChange}
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-primary focus:ring-primary focus:ring-primary/5 outline-none transition-all"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500"
                                            >
                                                <span className="material-symbols-outlined">
                                                    {showPassword ? "visibility_off" : "visibility"}
                                                </span>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                                            Confirm Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                required
                                                type={showConfirmPassword ? "text" : "password"}
                                                name="confirmPassword"
                                                value={signUpData.confirmPassword}
                                                onChange={handleSignUpChange}
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-primary focus:ring-primary focus:ring-primary/5 outline-none transition-all"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500"
                                            >
                                                <span className="material-symbols-outlined">
                                                    {showConfirmPassword ? "visibility_off" : "visibility"}
                                                </span>
                                            </button>
                                        </div>
                                    </div>

                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <input
                                            required
                                            type="checkbox"
                                            name="agreeToTerms"
                                            checked={signUpData.agreeToTerms}
                                            onChange={handleSignUpChange}
                                            className="rounded border-slate-300 text-primary focus:ring-primary cursor-pointer w-4 h-4"
                                        />
                                        <span className="text-sm text-slate-600">
                                            I agree to the{" "}
                                            <Link to="/terms" className="text-primary font-bold hover:underline">
                                                Terms & Conditions
                                            </Link>
                                        </span>
                                    </label>

                                    <button
                                        type="submit"
                                        className="w-full bg-[#1a3a5c] hover:bg-[#122b46] text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-900/20 active:scale-[0.98]"
                                    >
                                        Create Account
                                    </button>

                                    <p className="text-center text-sm text-slate-500">
                                        Already have an account?{" "}
                                        <button
                                            type="button"
                                            onClick={() => setActiveTab("signin")}
                                            className="font-bold text-primary hover:text-primary underline underline-offset-4"
                                        >
                                            Sign In
                                        </button>
                                    </p>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
