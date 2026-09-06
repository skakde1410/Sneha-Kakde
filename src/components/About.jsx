import React from 'react';
import { motion } from 'framer-motion';
import { personalInfo, craftGallery } from '../data/portfolioData';
import { Sparkles, Eye } from 'lucide-react';
import ImageWithSkeleton from './ImageWithSkeleton';
import OffTheGridCoverflow from './OffTheGridCoverflow';
import TypewriterBanner from './TypewriterBanner';

export default function About({ onSelectCraft }) {
  const duplicatedGallery = [...craftGallery, ...craftGallery];

  return (
    <section id="about" className="pt-16 sm:pt-20 pb-12 px-4 sm:px-8 bg-white relative overflow-hidden scroll-mt-20">
      
      {/* Ambient background decoration */}
      <div className="absolute top-1/3 -right-20 w-72 sm:w-96 h-72 sm:h-96 bg-pink-50 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        
        {/* Section Heading (Matching Figma "A little about me") */}
        <div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-brand-dark tracking-tight">
            A little about me
          </h2>
        </div>

        {/* Top Split: Photo & Personal Narrative (Matching Figma frame 12:333) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-start">
          
          {/* Sneha's Portrait */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative group max-w-[280px] sm:max-w-sm w-full">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border-4 border-white ring-1 ring-gray-200">
                <ImageWithSkeleton
                  src="/assets/sneha_profile.webp"
                  alt="Sneha Kakde"
                  containerClassName="w-full h-auto"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </motion.div>

          {/* Narrative Bio (Exact Figma Text) */}
          <motion.div 
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-7 space-y-4 sm:space-y-5 text-left"
          >
            <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-dark">
              Hi, I’m <span className="text-brand-pink">Sneha</span>
            </h3>

            <p className="text-sm sm:text-lg text-gray-900 leading-relaxed font-bold">
              {personalInfo.extendedBio[0]}
            </p>

            <p className="text-xs sm:text-base text-gray-700 leading-relaxed font-normal">
              {personalInfo.extendedBio[1]}
            </p>

            <p className="text-xs sm:text-base text-gray-700 leading-relaxed font-normal">
              {personalInfo.extendedBio[2]}
            </p>
          </motion.div>

        </div>

        {/* OFF THE GRID - 3D Coverflow Carousel Matching Reference */}
        <div id="interests" className="scroll-mt-20">
          <OffTheGridCoverflow />
        </div>

        {/* Narrative Paragraph: Different interests. One curious mind. (Matching Figma exactly) */}
        <div className="space-y-2 sm:space-y-3 pt-2 text-left">
          <h3 className="text-lg sm:text-2xl font-bold text-neutral-900 tracking-tight">
            Different interests. One curious mind.
          </h3>
          <p className="text-xs sm:text-base text-neutral-700 leading-relaxed max-w-5xl">
            {personalInfo.interestsPhilosophy}
          </p>
        </div>

        {/* Typewriter Banner with Modern Rounded Corners */}
        <TypewriterBanner />

        {/* UNFILTERED - Photo Automatic Smooth Sliding Carousel */}
        <div className="space-y-4 sm:space-y-6 pt-4">
          <div className="flex items-center justify-between">
            <h4 className="text-base sm:text-xl font-extrabold text-brand-dark flex items-center gap-1.5 sm:gap-2 tracking-wide uppercase">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-brand-pink flex-shrink-0" />
              <span>UNFILTERED</span>
            </h4>
          </div>

          {/* Smooth Auto-sliding Track */}
          <div className="marquee-container relative overflow-hidden py-2 -mx-4 sm:-mx-8 px-4 sm:px-8 cursor-grab">
            <div className="animate-marquee-crafts flex gap-4 sm:gap-6">
              {duplicatedGallery.map((craft, idx) => (
                <div
                  key={`${craft.id}-${idx}`}
                  onClick={() => onSelectCraft(craft)}
                  className="flex-shrink-0 w-56 sm:w-64 aspect-[3/4] rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-gray-200 cursor-pointer relative group bg-gray-100 transition-all duration-300 hover:scale-[1.03]"
                >
                  <ImageWithSkeleton
                    src={craft.image}
                    alt="Unfiltered visual"
                    containerClassName="w-full h-full"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Overlay on hover (No text information) */}
                  <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white/25 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-transform">
                      <Eye className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
