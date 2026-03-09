import React from 'react';
import appleLogo from '../assets/logosd/Apple_logo_with_text_(white).png';
import googleLogo from '../assets/logosd/Google-Logo.wine.png';
import motorolaLogo from '../assets/logosd/Motorola-logo-black-and-white.png';
import nokiaLogo from '../assets/logosd/Nokia-Logo.png';
import oneplusLogo from '../assets/logosd/OnePlus-Logo.png';
import tclLogo from '../assets/logosd/png-transparent-tcl-hd-logo.png';
import samsungLogo from '../assets/logosd/Samsung-emblem.png';

const BrandsSection = () => {
    const brands = [
        { name: 'Apple', logo: appleLogo },
        { name: 'Samsung', logo: samsungLogo },
        { name: 'Motorola', logo: motorolaLogo },
        { name: 'Google', logo: googleLogo },
        { name: 'OnePlus', logo: oneplusLogo },
        { name: 'Nokia', logo: nokiaLogo },
        { name: 'TCL', logo: tclLogo },
    ];

    return (
        <section className="border-y border-slate-100 bg-white py-10 overflow-hidden">
            <div className="flex whitespace-nowrap animate-marquee w-max hover:[animation-play-state:paused] cursor-default">
                {[...Array(3)].map((_, groupIndex) => (
                    <div key={groupIndex} className="flex items-center gap-20 px-10">
                        {brands.map((brand, i) => (
                            <div
                                key={`${groupIndex}-${i}`}
                                className="flex items-center justify-center w-28 h-14 rounded-xl p-3 group"
                                style={{ background: brand.name === 'Apple' ? '#1a3356' : 'transparent' }}
                            >
                                <img
                                    src={brand.logo}
                                    alt={brand.name}
                                    className="h-7 w-auto object-contain"
                                />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BrandsSection;
