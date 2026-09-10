import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import CategoryShowcase from '../components/CategoryShowcase';

export default function ArchivePage({ onBackToHome, onSelectImage }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white pb-16 sm:pb-20">
      
      {/* Top Banner with Subtle Scrolling Sketch Artwork Background */}
      <div className="relative w-full h-[300px] sm:h-[420px] lg:h-[480px] bg-[#141414] overflow-hidden pt-16 sm:pt-20">
        
        {/* Continuous Subtle Horizontal Scrolling Sketch Background */}
        <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none">
          <div className="animate-banner-scroll flex h-full select-none">
            {/* Group 1 */}
            <div className="flex h-full flex-shrink-0">
              <img
                src="/assets/archive_banner.png"
                alt="Sneha Kakde Sketches Artwork Background"
                className="h-full w-auto max-w-none object-cover select-none"
                draggable={false}
              />
              <img
                src="/assets/archive_banner.png"
                alt=""
                aria-hidden="true"
                className="h-full w-auto max-w-none object-cover select-none"
                draggable={false}
              />
            </div>
            {/* Group 2 (Identical Duplicate for Seamless Infinite Scrolling) */}
            <div className="flex h-full flex-shrink-0" aria-hidden="true">
              <img
                src="/assets/archive_banner.png"
                alt=""
                className="h-full w-auto max-w-none object-cover select-none"
                draggable={false}
              />
              <img
                src="/assets/archive_banner.png"
                alt=""
                className="h-full w-auto max-w-none object-cover select-none"
                draggable={false}
              />
            </div>
          </div>
        </div>

        {/* Floating Badge - Centered with max-w-7xl grid, positioned right above the bottom box */}
        <div className="absolute bottom-[68px] sm:bottom-[108px] lg:bottom-[140px] inset-x-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2 z-10">
          
          {/* Orange "Portfolio - 2025" Small Ribbon Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#E64A19] text-white font-bold px-3 sm:px-4 py-1 sm:py-1.5 rounded-md sm:rounded-lg text-xs sm:text-sm md:text-base shadow-md tracking-tight border border-orange-600/30 whitespace-nowrap"
          >
            Portfolio - 2025
          </motion.div>

        </div>

      </div>

      {/* Overlapping Contents & Category Showcase Section */}
      <div className="-mt-14 sm:-mt-24 lg:-mt-32 relative z-20">
        <CategoryShowcase onSelectImage={onSelectImage} />
      </div>

      {/* Bottom Return Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-12 sm:mt-20 text-center">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-brand-dark hover:bg-black text-white text-sm sm:text-base font-bold transition-all hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Return to 2026 Portfolio</span>
        </button>
      </div>

    </div>
  );
}
