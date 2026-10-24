import React from 'react';
import { motion } from 'framer-motion';
import { projectGroups, personalInfo } from '../data/portfolioData';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import ImageWithSkeleton from './ImageWithSkeleton';

export default function Projects() {
  return (
    <section id="work" className="py-16 sm:py-24 px-4 sm:px-8 bg-[#FBFBFC] relative scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header: "• Projects" matching handwritten diagram */}
        <div className="flex items-center gap-3 sm:gap-4 mb-12 sm:mb-16">
          <span className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-brand-pink flex-shrink-0" />
          <h2 className="text-3xl sm:text-5xl font-extrabold text-brand-dark tracking-tight">
            Projects
          </h2>
        </div>

        {/* Category Groups Matching User's Handwritten Layout:
            [ Category Pill ]  --->  [ Project Cards Stack ]
        */}
        <div className="space-y-16 sm:space-y-24">
          {projectGroups.map((group, groupIdx) => (
            <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: groupIdx * 0.05 }}
                className="flex flex-col lg:flex-row items-start gap-6 sm:gap-8 lg:gap-12"
              >
                {/* Left Column: Category Badge + Arrow "-->" */}
                <div className="w-full lg:w-72 xl:w-80 flex-shrink-0 lg:sticky lg:top-28">
                  <div className="flex items-center gap-3 sm:gap-4">
                    {/* Category Box / Pill */}
                    <div className="inline-flex items-center gap-2.5 px-5 py-2.5 sm:py-3 rounded-2xl bg-white border-2 border-neutral-900 text-neutral-900 shadow-sm font-bold text-sm sm:text-base tracking-tight hover:border-brand-pink transition-colors">
                      <span className="w-2.5 h-2.5 rounded-full bg-brand-pink flex-shrink-0" />
                      <span>{group.title}</span>
                    </div>

                    {/* Arrow "-->" extending from category pill towards projects */}
                    <div className="flex items-center text-neutral-900 flex-shrink-0">
                      <svg
                        className="w-10 h-6 sm:w-14 sm:h-7 text-neutral-800"
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
                  </div>

                  {group.subtitle && (
                    <p className="hidden lg:block text-xs text-neutral-500 mt-3 max-w-xs leading-relaxed">
                      {group.subtitle}
                    </p>
                  )}
                </div>

                {/* Right Column: Stack of Project Cards */}
                <div className="flex-1 w-full space-y-6 sm:space-y-8 min-w-0">
                  {group.projects.map((project, pIdx) => (
                    <motion.a
                      key={project.id}
                      href={project.behanceLink || personalInfo.links.behance}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: pIdx * 0.05 }}
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
                </div>

              </motion.div>
            ))}
        </div>

      </div>
    </section>
  );
}
