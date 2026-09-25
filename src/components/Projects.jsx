import React from 'react';
import { motion } from 'framer-motion';
import { featuredProjects, personalInfo } from '../data/portfolioData';
import { ArrowUpRight, Layers } from 'lucide-react';
import ImageWithSkeleton from './ImageWithSkeleton';

export default function Projects() {
  return (
    <section id="work" className="py-16 sm:py-24 px-4 sm:px-8 bg-[#FBFBFC] relative scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header (Matching Figma "Projects") */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-4 sm:gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-200/60 text-gray-700 text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-2 sm:mb-3">
              <Layers className="w-3.5 h-3.5 text-brand-pink" />
              <span>Selected Works</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-brand-dark tracking-tight">
              Projects
            </h2>
          </div>
          <p className="text-gray-500 max-w-md text-xs sm:text-base">
            Curated UX case studies, interactive learning systems, brand identity guidelines, and AI product experiences.
          </p>
        </div>

        {/* Projects Grid (Matching Figma 2x2 Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {featuredProjects.map((project, index) => (
            <motion.a
              key={project.id}
              href={project.behanceLink || personalInfo.links.behance}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
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
                    <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-black/65 backdrop-blur-md text-[10px] sm:text-xs font-semibold text-white/95 shadow-md border border-white/15">
                      {project.duration}
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

                <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3 pt-2.5 border-t border-gray-100">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="text-[10px] sm:text-[11px] font-semibold px-2 sm:px-2.5 py-0.5 rounded-md bg-gray-100 text-gray-600 border border-gray-200/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}
