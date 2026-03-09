export default function TopBar() {
    return (
        <div className="bg-navy text-white text-xs py-2.5 px-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <span className="flex items-center gap-1.5 font-semibold">
                        <svg className="w-3.5 h-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        FREE delivery on orders over $50
                    </span>
                    <span className="hidden md:flex items-center gap-1.5 text-slate-300">
                        <svg className="w-3.5 h-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 8V5z" />
                        </svg>
                        +1 (469) 260-2475
                    </span>
                    <span className="hidden md:flex items-center gap-1.5 text-slate-300">
                        <svg className="w-3.5 h-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        sales@ishinewireless.com
                    </span>
                </div>
                <div className="flex items-center gap-4 text-slate-300">
                    <span className="hidden sm:block">Dallas, TX 75229</span>
                    <span>|</span>
                    <span>Mon–Sat 8AM–7PM CST</span>
                </div>
            </div>
        </div>
    );
}
