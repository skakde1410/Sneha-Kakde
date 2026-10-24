import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectGroups, personalInfo } from '../data/portfolioData';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import ImageWithSkeleton from './ImageWithSkeleton';

export default function Projects() {
  // Category state - click on category button to open its projects, click again to collapse
  const [activeCategory, setActiveCategory] = useState(null);

  const toggleCategory = (categoryId) => {
    setActiveCategory((prev) => (prev === categoryId ? null : categoryId));
  };

  const activeGroup = projectGroups.find((g) => g.id === activeCategory);

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

        {/* Single Row of Category Buttons without explanation lines */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-5 mb-10 sm:mb-14">
          {projectGroups.map((group) => {
            const isActive = activeCategory === group.id;

            return (
              <button
                key={group.id}
                type="button"
                onClick={() => toggleCategory(group.id)}
                className="group/btn cursor-pointer inline-flex items-center gap-2.5 sm:gap-3.5 text-left focus:outline-none transition-transform active:scale-[0.98]"
                aria-expanded={isActive}
                title={isActive ? `Click to collapse ${group.title}` : `Click to open ${group.title} projects`}
              >
                {/* Category Box / Pill */}
                <div
                  className={`inline-flex items-center gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl border-2 transition-all duration-300 shadow-sm ${
                    isActive
                      ? 'bg-neutral-900 text-white border-neutral-900 shadow-md scale-[1.02]'
                      : 'bg-white text-neutral-900 border-neutral-900 hover:border-brand-pink hover:shadow-md'
                  }`}
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
                </div>

                {/* Arrow "-->" extending from category pill towards projects */}
                <div
                  className={`flex items-center transition-all duration-300 ${
                    isActive
                      ? 'text-brand-pink translate-x-1.5'
                      : 'text-neutral-800 group-hover/btn:translate-x-1 group-hover/btn:text-brand-pink'
                  }`}
                >
                  <svg
                    className="w-8 h-5 sm:w-12 sm:h-6"
                    viewBox="0 0 56 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="2" y1="12" x2="50" y2="12" />
                    <polyline points="40 5 51 12 40 19" />
                  </svg>
                </div>
              </button>
            );
          })}
        </div>

        {/* Project Cards (Opens when a category button is clicked) */}
        <AnimatePresence mode="wait">
          {activeGroup && (
            <motion.div
              key={activeGroup.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6 sm:space-y-8"
            >
              {activeGroup.projects.map((project, pIdx) => (
                <motion.a
                  key={project.id}
                  href={project.behanceLink || personalInfo.links.behance}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: pIdx * 0.05 }}
                  className="group block bg-white rounded-2xl sm:rounded-3xl border border-neutral-200/90 hover:border-neutral-400/80 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden no-underline text-inherit"
                >
                  <div className="flex flex-col md:flex-row md:items-stretch">
                    
                    {/* Card Thumbnail */}
                    <div className="relative w-full md:w-72 lg:w-80 xl:w-96 flex-shrink-0 aspect-[16/10] md:aspect-auto md:min-h-[230px] bg-[#E2E4E8] overflow-hidden">
                      <ImageWithSkeleton
                        src={project.coverImage}
                        alt={project.title}
                        loading="lazy"
                        containerClassName="w-full h-full"
                        className={`w-full h-full object-cover ${project.objectPosition || 'object-center'} group-hover:scale-105 transition-transform duration-500 ease-out`}
                      />

                      {/* Subtle overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                      {/* Duration / Status Pill */}
                      {project.duration && (
                        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
                          <span className="px-2.5 sm:px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-[10px] sm:text-xs font-semibold text-white shadow-md border border-white/15 inline-flex items-center gap-1.5">
                            {project.duration.toLowerCase() === 'ongoing' && (
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            )}
                            <span>{project.duration}</span>
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Card Content & Details */}
                    <div className="flex-1 p-5 sm:p-6 lg:p-7 flex flex-col justify-between">
                      <div>
                        {/* Tagline */}
                        <div className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-brand-pink mb-1.5">
                          {project.tagline}
                        </div>

                        {/* Title with Arrow */}
                        <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight flex items-center justify-between gap-2 group-hover:text-brand-pink transition-colors">
                          <span>{project.title}</span>
                          <ArrowUpRight className="w-5 h-5 text-brand-pink group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 flex-shrink-0" />
                        </h3>

                        {/* Summary */}
                        <p className="mt-2.5 text-xs sm:text-sm lg:text-base text-neutral-600 leading-relaxed line-clamp-3">
                          {project.summary}
                        </p>
                      </div>

                      {/* Tags & Action Link */}
                      <div className="mt-5 pt-4 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap gap-1.5">
                          {project.tags?.slice(0, 3).map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-700 text-[11px] font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <span className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-neutral-900 group-hover:text-brand-pink transition-colors">
                          <span>View Project</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>

                    </div>

                  </div>
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
