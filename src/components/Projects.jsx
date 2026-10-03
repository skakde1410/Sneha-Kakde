import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { featuredProjects, rawProjects, personalInfo } from '../data/portfolioData';
import { ArrowUpRight, Maximize2 } from 'lucide-react';
import ImageWithSkeleton from './ImageWithSkeleton';

export default function Projects({ onSelectImage }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filterTabs = [
    { id: 'all', label: 'All' },
    { id: 'product-design', label: 'Product Design' },
    { id: 'branding', label: 'Branding' },
    { id: 'visual-journal', label: 'Visual Journal' }
  ];

  const filteredProjects = featuredProjects.filter((project) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'product-design') return project.category === 'Product Design';
    if (activeFilter === 'branding') return project.category === 'Branding';
    if (activeFilter === 'visual-journal' || activeFilter === 'raw') {
      return project.category === 'Visual Journal' || project.category === 'Raw';
    }
    return true;
  });

  const photographyProject = rawProjects.find(p => p.id === 'raw-photography') || rawProjects[0];
  const sketchesProject = rawProjects.find(p => p.id === 'raw-sketches') || rawProjects[1];

  return (
    <section id="work" className="py-16 sm:py-24 px-4 sm:px-8 bg-[#FBFBFC] relative scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-brand-dark tracking-tight">
            Projects
          </h2>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-8 sm:mb-12">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`inline-flex items-center px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-neutral-900 text-white shadow-md'
                    : 'bg-white text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 border border-neutral-200/80 shadow-sm'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* VISUAL JOURNAL VIEW: Two Dedicated Sections for Sketches & Photography */}
        {activeFilter === 'visual-journal' || activeFilter === 'raw' ? (
          <div className="space-y-12 sm:space-y-16">
            
            {/* SECTION 1: SKETCHES */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-5"
            >
              {/* Title Only */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
                  Sketches
                </h3>
              </div>

              {/* Sketches Gallery Tiles (Click opens Fit-to-screen modal) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
                {sketchesProject.gallery.map((sketch) => (
                  <button
                    key={sketch.id}
                    onClick={() => onSelectImage && onSelectImage(sketch)}
                    className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 text-left cursor-pointer focus:outline-hidden"
                  >
                    <ImageWithSkeleton
                      src={sketch.image}
                      alt={sketch.title}
                      loading="lazy"
                      containerClassName="w-full h-full"
                      className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/60 backdrop-blur-xs text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Maximize2 className="w-3.5 h-3.5 text-pink-300" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <p className="text-xs sm:text-sm font-bold leading-tight line-clamp-1 text-white">
                        {sketch.title}
                      </p>
                      <p className="text-[10px] sm:text-xs text-neutral-300 line-clamp-1 mt-0.5">
                        {sketch.subtitle}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* SECTION 2: PHOTOGRAPHY */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="space-y-5 pt-4"
            >
              {/* Title Only */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
                  Photography
                </h3>
              </div>

              {/* Photography Gallery Tiles (Click opens Fit-to-screen modal) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
                {photographyProject.gallery.map((photo) => (
                  <button
                    key={photo.id}
                    onClick={() => onSelectImage && onSelectImage(photo)}
                    className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 text-left cursor-pointer focus:outline-hidden"
                  >
                    <ImageWithSkeleton
                      src={photo.image}
                      alt={photo.title}
                      loading="lazy"
                      containerClassName="w-full h-full"
                      className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/60 backdrop-blur-xs text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Maximize2 className="w-3.5 h-3.5 text-pink-300" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <p className="text-xs sm:text-sm font-bold leading-tight line-clamp-1 text-white">
                        {photo.title}
                      </p>
                      <p className="text-[10px] sm:text-xs text-neutral-300 line-clamp-1 mt-0.5">
                        {photo.subtitle}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>

          </div>
        ) : (
          /* STANDARD PROJECTS GRID (All, Product Design, Branding) */
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => {
                const isVisualJournal = project.category === 'Visual Journal' || project.category === 'Raw';

                const handleCardClick = (e) => {
                  if (isVisualJournal) {
                    e.preventDefault();
                    setActiveFilter('visual-journal');
                    const el = document.getElementById('work');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                };

                return (
                  <motion.a
                    key={project.id}
                    layout
                    href={project.behanceLink || personalInfo.links.behance}
                    target={isVisualJournal ? undefined : "_blank"}
                    rel={isVisualJournal ? undefined : "noopener noreferrer"}
                    onClick={handleCardClick}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.35, delay: index * 0.04 }}
                    className="group cursor-pointer flex flex-col no-underline text-inherit"
                  >
                    {/* Card Thumbnail Container */}
                    <div className="relative w-full aspect-[16/10] bg-[#E2E4E8] rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm group-hover:shadow-2xl group-hover:-translate-y-1.5 transition-all duration-400 ease-out border border-gray-200/70">
                      
                      {/* Background Project Image */}
                      <ImageWithSkeleton
                        src={project.coverImage}
                        alt={project.title}
                        loading="lazy"
                        containerClassName="w-full h-full"
                        className={`w-full h-full object-cover ${project.objectPosition || 'object-center'} group-hover:scale-105 transition-transform duration-700 ease-out`}
                      />

                      {/* Subtle Gradient Overlay for Text Legibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

                      {/* Floating Tags Top Right */}
                      <div className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 z-10 flex items-center gap-1.5 sm:gap-2">
                        {project.duration && (
                          <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-black/65 backdrop-blur-md text-[10px] sm:text-xs font-semibold text-white/95 shadow-md border border-white/15 inline-flex items-center gap-1.5">
                            {project.duration.toLowerCase() === 'ongoing' && (
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            )}
                            <span>{project.duration}</span>
                          </span>
                        )}
                        <span className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[10px] sm:text-xs font-bold text-gray-800 shadow-md">
                          {project.category}
                        </span>
                      </div>

                      {/* Bottom Overlay Info (Matching Figma layout with bold Arrow) */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-7 lg:p-8 z-10 flex items-end justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base sm:text-xl lg:text-2xl font-bold text-white tracking-tight flex items-center gap-2 group-hover:text-pink-300 transition-colors">
                            <span className="truncate">{project.title}</span>
                            <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 text-brand-pink flex-shrink-0" />
                          </h3>
                        </div>
                      </div>

                    </div>

                    {/* Card Meta & Summary Below Thumbnail */}
                    <div className="pt-3 sm:pt-4 px-1 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-brand-pink">
                            {project.tagline}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm lg:text-base text-gray-600 leading-relaxed line-clamp-3">
                          {project.summary}
                        </p>
                      </div>
                    </div>

                  </motion.a>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

      </div>
    </section>
  );
}
