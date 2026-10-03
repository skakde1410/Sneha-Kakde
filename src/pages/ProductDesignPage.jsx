import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Layers, ExternalLink } from 'lucide-react';
import { productDesignProjects, personalInfo } from '../data/portfolioData';
import ImageWithSkeleton from '../components/ImageWithSkeleton';

export default function ProductDesignPage({ onBackToHome, onOpenContact }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FBFBFC] text-[#1E1E1E] pb-20">
      
      {/* Top Banner with Dark Indigo Aesthetic */}
      <div className="relative w-full bg-[#0F172A] text-white pt-24 pb-16 sm:pt-32 sm:pb-24 overflow-hidden border-b border-slate-800">
        
        {/* Subtle Ambient Background Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-pink/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumb / Category Tag */}
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider border border-blue-500/30">
              <Layers className="w-3.5 h-3.5 text-blue-400" />
              <span>Dedicated Collection</span>
            </span>
            <span className="text-xs font-semibold text-slate-400">
              4 Flagship Works
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6 text-white">
            Product Design
          </h1>
          
          <p className="text-slate-300 max-w-2xl text-sm sm:text-base lg:text-lg leading-relaxed mb-8">
            An integrated suite of digital product ecosystems, pediatric healthcare telemetry, offline-first learning platforms, and parametric physical industrial design.
          </p>

          {/* Quick Highlight Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl pt-6 border-t border-slate-800/80">
            <div className="bg-slate-900/60 p-3 sm:p-4 rounded-xl border border-slate-800">
              <div className="text-xs text-slate-400 font-medium">Digital Platforms</div>
              <div className="text-lg sm:text-xl font-bold text-white mt-0.5">3 Works</div>
            </div>
            <div className="bg-slate-900/60 p-3 sm:p-4 rounded-xl border border-slate-800">
              <div className="text-xs text-slate-400 font-medium">Physical Design</div>
              <div className="text-lg sm:text-xl font-bold text-white mt-0.5">1 Work</div>
            </div>
            <div className="bg-slate-900/60 p-3 sm:p-4 rounded-xl border border-slate-800">
              <div className="text-xs text-slate-400 font-medium">Active Research</div>
              <div className="text-lg sm:text-xl font-bold text-emerald-400 mt-0.5">2 Ongoing</div>
            </div>
            <div className="bg-slate-900/60 p-3 sm:p-4 rounded-xl border border-slate-800">
              <div className="text-xs text-slate-400 font-medium">Institution</div>
              <div className="text-lg sm:text-xl font-bold text-white mt-0.5">IIT Guwahati</div>
            </div>
          </div>

        </div>
      </div>

      {/* Main Showcase Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
        
        <div className="flex items-center justify-between mb-8 sm:mb-12 pb-4 border-b border-gray-200">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-brand-dark tracking-tight">
              All Product Design Projects
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Click any project card to view the complete case study and presentation on Behance.
            </p>
          </div>
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-gray-100 text-gray-700 text-xs sm:text-sm font-semibold border border-gray-200 shadow-sm transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Portfolio</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {productDesignProjects.map((project, index) => (
            <motion.a
              key={project.id}
              href={project.behanceLink || personalInfo.links.behance}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer flex flex-col no-underline text-inherit bg-white rounded-3xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300"
            >
              {/* Card Thumbnail */}
              <div className="relative w-full aspect-[16/10] bg-[#E2E4E8] overflow-hidden">
                <ImageWithSkeleton
                  src={project.coverImage}
                  alt={project.title}
                  loading={index < 2 ? "eager" : "lazy"}
                  containerClassName="w-full h-full"
                  className={`w-full h-full object-cover ${project.objectPosition || 'object-center'} group-hover:scale-105 transition-transform duration-700 ease-out`}
                />

                {/* Gradient Overlay for Text Contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

                {/* Top Right Status & Category Badges */}
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

                {/* Bottom Overlay Title & Arrow */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-7 lg:p-8 z-10 flex items-end justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-xl lg:text-2xl font-bold text-white tracking-tight flex items-center gap-2 group-hover:text-pink-300 transition-colors">
                      <span className="truncate">{project.title}</span>
                      <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 text-brand-pink flex-shrink-0" />
                    </h3>
                  </div>
                </div>
              </div>

              {/* Card Meta, Summary & Metrics Below Thumbnail */}
              <div className="p-5 sm:p-6 lg:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <div className="mb-2">
                    <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-brand-pink">
                      {project.tagline}
                    </span>
                  </div>
                  
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-3 mb-4">
                    {project.summary}
                  </p>

                  {/* 3-Column Metrics Grid */}
                  {project.metrics && (
                    <div className="grid grid-cols-3 gap-2 py-3 px-3.5 rounded-xl bg-gray-50 border border-gray-100 mb-4">
                      {project.metrics.map((m, mIdx) => (
                        <div key={mIdx} className="text-center">
                          <div className="text-[10px] text-gray-400 font-medium truncate">{m.label}</div>
                          <div className="text-xs font-bold text-gray-800 truncate mt-0.5">{m.value}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-3 border-t border-gray-100 mb-4">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="text-[10px] sm:text-[11px] font-semibold px-2 sm:px-2.5 py-0.5 rounded-md bg-gray-100 text-gray-600 border border-gray-200/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Direct Link Footer */}
                  <div className="flex items-center justify-between text-xs font-bold text-gray-500 group-hover:text-brand-pink transition-colors">
                    <span>View Behance Case Study</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

            </motion.a>
          ))}
        </div>

        {/* Bottom Return Button */}
        <div className="mt-16 sm:mt-24 text-center">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2.5 px-8 sm:px-10 py-4 rounded-full bg-brand-dark hover:bg-black text-white text-sm sm:text-base font-bold shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Return to Main Portfolio</span>
          </button>
        </div>

      </div>

    </div>
  );
}
