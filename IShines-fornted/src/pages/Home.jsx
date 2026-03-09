import React, { useState } from 'react';
import TopBar from "../components/layout/TopBar";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import HeroSection from "../sections/HeroSection";
import BrandsSection from "../sections/BrandsSection";
import CategoryGrid from "../sections/CategoryGrid";
import DiscountProductsSection from "../sections/DiscountProductsSection";
import LatestArrivalsSection from "../sections/LatestArrivalsSection";
import WholesaleLCDSection from "../sections/WholesaleLCDSection";

export default function Home() {
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);


  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar
        categoryMenuOpen={categoryMenuOpen}
        onToggleCategory={() => setCategoryMenuOpen(prev => !prev)}
      />
      <main>
        <HeroSection categoryMenuOpen={categoryMenuOpen} />
        <section className="bg-white border-y border-slate-100 py-5">
          <div className="max-w-7xl mx-auto px-4">
         
          </div>
        </section>
        <BrandsSection />
        <CategoryGrid />
        <DiscountProductsSection />
        <LatestArrivalsSection />
        <WholesaleLCDSection />
      </main>
      <Footer />
    </div>
  );
}