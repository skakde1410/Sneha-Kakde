import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { figmaProjectsData } from '../data/portfolioData';
import ImageWithSkeleton from './ImageWithSkeleton';

function PolaroidCard({ project, section, index }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-[340px] sm:w-[332px] flex-shrink-0 pt-3"
    >
      {/* Washi Tape Strip with subtle angle & translucent look */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 z-20 w-[106px] h-[36px] pointer-events-none rounded-[1px] shadow-[0_1px_3px_rgba(0,0,0,0.12)] border-y border-white/40"
        style={{
          backgroundColor: section.tapeColor || 'rgba(169, 220, 242, 0.85)',
          transform: `translateX(-50%) rotate(${project.tapeRotation || 0}deg)`,
        }}
      />

      {/* Polaroid Card Link */}
      <a
        href={project.behanceLink}
        target="_blank"
        rel="noopener noreferrer"
        className="group block w-full bg-[#FFFEFB] p-3 pb-3.5 rounded-[2px] shadow-[2px_8px_18px_rgba(0,0,0,0.14)] hover:shadow-[2px_14px_28px_rgba(0,0,0,0.22)] hover:-translate-y-1.5 transition-all duration-300 ease-out no-underline cursor-pointer border border-[#EFEFEA]/80 text-inherit"
      >
        {/* Photo container (Single Photo or Diptych) */}
        {project.isDiptych ? (
          <div className="flex gap-1.5 w-full h-[245px]">
            {project.images.map((imgSrc, imgIdx) => (
              <div key={imgIdx} className="relative flex-1 h-full bg-[#E9E9E4] rounded-[2px] overflow-hidden">
                <ImageWithSkeleton
                  src={imgSrc}
                  alt={`${project.title} - view ${imgIdx + 1}`}
                  containerClassName="w-full h-full"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="relative w-full h-[245px] bg-[#E9E9E4] rounded-[2px] overflow-hidden">
            <ImageWithSkeleton
              src={project.image}
              alt={project.title}
              containerClassName="w-full h-full"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
          </div>
        )}

        {/* Handwritten Caption in Caveat Bold */}
        <p className="font-caveat font-bold text-[25px] sm:text-[27px] leading-[1.15] text-[#1B1A17] pt-2 px-0.5 truncate group-hover:text-black" title={project.caption}>
          {project.caption}
        </p>

        {/* Metadata Row: Project Title & Behance Link */}
        <div className="flex items-center justify-between gap-2 pt-1 px-0.5 text-[13px] font-archivo">
          <span className="text-[#333333] font-medium truncate flex-1" title={project.title}>
            {project.title}
          </span>
          <span className="text-[#6A6A66] group-hover:text-[#141414] transition-colors font-normal flex-shrink-0 flex items-center gap-0.5">
            Behance ↗
          </span>
        </div>
      </a>
    </motion.div>
  );
}

function SectionHead({ section, className = '' }) {
  return (
    <div className={`flex items-baseline mb-8 sm:mb-10 ${className}`}>
      <div className="relative inline-flex items-baseline w-fit">
        {/* Pastel highlighter marker bar strictly matching text width */}
        <span
          className="absolute bottom-1 inset-x-0 h-4 sm:h-5 rounded-[3px] pointer-events-none -z-0 opacity-80"
          style={{ backgroundColor: section.markerColor }}
        />
        <h3 className="relative z-10 font-caveat font-bold text-3xl sm:text-[40px] lg:text-[44px] text-[#141414] leading-tight px-1 whitespace-nowrap">
          {section.title}
        </h3>
      </div>
    </div>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');

  const { chips, sections } = figmaProjectsData;

  const hybridSection = sections.find((s) => s.id === 'hybrid-product-design');
  const visualDesignSection = sections.find((s) => s.id === 'visual-design-illustration');
  const motionSection = sections.find((s) => s.id === 'motion-animation');
  const modellingSection = sections.find((s) => s.id === '3d-modelling');
  const visualJournalSection = sections.find((s) => s.id === 'visual-journal');
  const rawSection = sections.find((s) => s.id === 'raw');

  // Filtered single section when not 'all'
  const currentFilteredSection = activeFilter !== 'all'
    ? sections.find((s) => s.id === activeFilter)
    : null;

  return (
    <section id="work" className="py-16 sm:py-24 px-4 sm:px-8 lg:px-12 bg-[#F6F6F3] relative scroll-mt-20">
      <div className="max-w-[1360px] mx-auto">
        
        {/* Hero Section Header: Title */}
        <div className="mb-4 sm:mb-6">
          <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-archivo font-extrabold text-[#141414] tracking-[-0.02em] leading-tight">
            Projects
          </h2>
        </div>

        {/* Interactive Category Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-14 sm:mb-20">
          {chips.map((chip) => {
            const isActive = activeFilter === chip.id;

            return (
              <button
                key={chip.id}
                type="button"
                onClick={() => setActiveFilter(chip.id)}
                className={`group cursor-pointer inline-flex items-center gap-2 px-4 py-2 sm:px-4 sm:py-2.5 rounded-full border text-[14px] sm:text-[15px] font-archivo font-medium transition-all duration-200 focus:outline-none active:scale-[0.98] ${
                  isActive
                    ? 'bg-[#141414] text-white border-[#141414] shadow-sm scale-[1.02]'
                    : 'bg-white text-[#141414] border-[#D9D8D1] hover:border-[#999995] hover:bg-[#FAF9F5]'
                }`}
                aria-pressed={isActive}
              >
                {chip.dotColor && (
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: chip.dotColor }}
                  />
                )}
                <span>{chip.label}</span>
                <span className={`text-[12px] sm:text-[13px] ${isActive ? 'text-[#BBBBBB]' : 'text-[#6A6A66]'}`}>
                  {chip.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {activeFilter !== 'all' && currentFilteredSection ? (
            /* Filtered Single Section View */
            <motion.div
              key={currentFilteredSection.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6 sm:space-y-8"
            >
              <SectionHead section={currentFilteredSection} />
              <div className="flex flex-wrap gap-7 sm:gap-8 lg:gap-10 items-start">
                {currentFilteredSection.projects.map((project, idx) => (
                  <PolaroidCard
                    key={project.id}
                    project={project}
                    section={currentFilteredSection}
                    index={idx}
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            /* 'All' View — Faithful reproduction of the Figma desktop & responsive layout */
            <motion.div
              key="all-sections"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-16 sm:space-y-20 lg:space-y-24"
            >
              {/* 1. Hybrid Product Design Section */}
              {hybridSection && (
                <div className="space-y-6 sm:space-y-8">
                  <SectionHead section={hybridSection} />
                  <div className="flex flex-wrap gap-7 sm:gap-8 lg:gap-10 items-start">
                    {hybridSection.projects.map((project, idx) => (
                      <PolaroidCard
                        key={project.id}
                        project={project}
                        section={hybridSection}
                        index={idx}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* 2. Visual Design & Illustration + Motion & Animation (Side-by-side row on desktop) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-start">
                {visualDesignSection && (
                  <div className="lg:col-span-7 xl:col-span-8 space-y-6 sm:space-y-8">
                    <SectionHead section={visualDesignSection} className="min-h-[48px] sm:min-h-[54px] flex items-baseline" />
                    <div className="flex flex-wrap gap-7 sm:gap-8 lg:gap-10 items-start">
                      {visualDesignSection.projects.map((project, idx) => (
                        <PolaroidCard
                          key={project.id}
                          project={project}
                          section={visualDesignSection}
                          index={idx}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {motionSection && (
                  <div className="lg:col-span-5 xl:col-span-4 space-y-6 sm:space-y-8">
                    <SectionHead section={motionSection} className="min-h-[48px] sm:min-h-[54px] flex items-baseline" />
                    <div className="flex flex-wrap gap-7 sm:gap-8 lg:gap-10 items-start">
                      {motionSection.projects.map((project, idx) => (
                        <PolaroidCard
                          key={project.id}
                          project={project}
                          section={motionSection}
                          index={idx}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 3. 3D Modelling (1 card) + Visual Journal (1 card) + Raw (2 cards) - Balanced full row */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-10 lg:gap-8 xl:gap-10 items-start">
                {/* 3D Modelling - 1 card */}
                {modellingSection && (
                  <div className="xl:col-span-3 space-y-6 sm:space-y-8">
                    <SectionHead section={modellingSection} className="min-h-[48px] sm:min-h-[54px] flex items-baseline" />
                    <div className="flex flex-wrap gap-7 sm:gap-8 items-start">
                      {modellingSection.projects.map((project, idx) => (
                        <PolaroidCard
                          key={project.id}
                          project={project}
                          section={modellingSection}
                          index={idx}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Visual Journal - 1 diptych card */}
                {visualJournalSection && (
                  <div className="xl:col-span-3 space-y-6 sm:space-y-8">
                    <SectionHead section={visualJournalSection} className="min-h-[48px] sm:min-h-[54px] flex items-baseline" />
                    <div className="flex flex-wrap gap-7 sm:gap-8 items-start">
                      {visualJournalSection.projects.map((project, idx) => (
                        <PolaroidCard
                          key={project.id}
                          project={project}
                          section={visualJournalSection}
                          index={idx}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Raw - 2 cards */}
                {rawSection && (
                  <div className="md:col-span-2 xl:col-span-6 space-y-6 sm:space-y-8">
                    <SectionHead section={rawSection} className="min-h-[48px] sm:min-h-[54px] flex items-baseline" />
                    <div className="flex flex-wrap gap-7 sm:gap-8 items-start">
                      {rawSection.projects.map((project, idx) => (
                        <PolaroidCard
                          key={project.id}
                          project={project}
                          section={rawSection}
                          index={idx}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
