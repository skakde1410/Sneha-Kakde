import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectGroups, personalInfo } from '../data/portfolioData';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import ImageWithSkeleton from './ImageWithSkeleton';

export default function Projects() {
  // Category state - defaults to 'product-design' so image cards are immediately visible
  const [activeCategory, setActiveCategory] = useState('product-design');

  const toggleCategory = (categoryId) => {
    setActiveCategory((prev) => (prev === categoryId ? null : categoryId));
  };

  const activeGroup = projectGroups.find((g) => g.id === activeCategory);
  const displayProjects = activeGroup ? activeGroup.projects : projectGroups.flatMap((g) => g.projects);

  return (
    <section id="work" className="py-16 sm:py-24 px-4 sm:px-8 bg-[#FBFBFC] relative scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header: "• Projects" matching handwritten diagram */}
        <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-12">
          <span className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-brand-pink flex-shrink-0" />
          <h2 className="text-3xl sm:text-5xl font-extrabold text-brand-dark tracking-tight">
            Projects
          </h2>
        </div>

        {/* Single Row of Category Buttons without arrows */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10 sm:mb-14">
          {projectGroups.map((group) => {
            const isActive = activeCategory === group.id;

            return (
              <button
                key={group.id}
                type="button"
                onClick={() => toggleCategory(group.id)}
                className={`group cursor-pointer inline-flex items-center gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl border-2 transition-all duration-300 shadow-sm focus:outline-none active:scale-[0.98] ${
                  isActive
                    ? 'bg-neutral-900 text-white border-neutral-900 shadow-md scale-[1.02]'
                    : 'bg-white text-neutral-900 border-neutral-900 hover:border-brand-pink hover:shadow-md'
                }`}
                aria-expanded={isActive}
                title={isActive ? `Click to view all projects` : `Click to view ${group.title} projects`}
              >
                <span
                  className={`w-2.5 h-2.5 rounded-full flex-shrink-0 transition-colors ${
                    isActive ? 'bg-brand-pink animate-pulse' : 'bg-brand-pink'
                  }`}
                />
                <span className="font-bold text-sm sm:text-base tracking-tight">
                  {group.title}
                </span>
                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ml-1 transition-colors ${
                    isActive ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-600'
                  }`}
                >
                  {group.projects.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Project Image Cards Grid (2-column responsive grid) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory || 'all'}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10"
          >
            {displayProjects.map((project, pIdx) => (
              <motion.a
                key={project.id}
                href={project.behanceLink || personalInfo.links.behance}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: pIdx * 0.05 }}
                className="group cursor-pointer flex flex-col no-underline text-inherit bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-200/90 hover:border-neutral-400/80 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300"
              >
                {/* Card Thumbnail Container */}
                <div className="relative w-full aspect-[16/10] bg-[#E2E4E8] overflow-hidden">
                  <ImageWithSkeleton
                    src={project.coverImage}
                    alt={project.title}
                    loading={pIdx < 2 ? 'eager' : 'lazy'}
                    containerClassName="w-full h-full"
                    className={`w-full h-full object-cover ${project.objectPosition || 'object-center'} group-hover:scale-105 transition-transform duration-700 ease-out`}
                  />

                  {/* Gradient Overlay for Text Legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Top Badges (Duration & Category) */}
                  <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-10 flex items-center gap-1.5 sm:gap-2">
                    {project.duration && (
                      <span className="px-2.5 sm:px-3 py-1 rounded-full bg-black/65 backdrop-blur-md text-[10px] sm:text-xs font-semibold text-white/95 shadow-md border border-white/15 inline-flex items-center gap-1.5">
                        {project.duration.toLowerCase() === 'ongoing' && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        )}
                        <span>{project.duration}</span>
                      </span>
                    )}
                    <span className="px-2.5 sm:px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] sm:text-xs font-bold text-neutral-800 shadow-md">
                      {project.category}
                    </span>
                  </div>

                  {/* Bottom Overlay Title & Bold Arrow */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-10 flex items-end justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white tracking-tight flex items-center justify-between gap-2 group-hover:text-pink-300 transition-colors">
                        <span className="truncate">{project.title}</span>
                        <ArrowUpRight className="w-5 h-5 text-brand-pink group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 flex-shrink-0" />
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Card Footer: Just keep View Project button */}
                <div className="p-4 sm:p-5 flex items-center justify-end bg-white border-t border-neutral-100">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-50 border border-neutral-200 text-xs sm:text-sm font-semibold text-neutral-800 group-hover:bg-brand-pink group-hover:text-white group-hover:border-brand-pink transition-all duration-300 shadow-2xs">
                    <span>View Project</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>

              </motion.a>
            ))}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
