import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { figmaProjectsData } from '../data/portfolioData';
import ImageWithSkeleton from './ImageWithSkeleton';

function PolaroidCard({ project, section, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRotation = project.cardRotation ?? (index % 2 === 0 ? -1.6 : 1.4);
  const tapeRotation = project.tapeRotation ?? 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-[340px] sm:w-[332px] flex-shrink-0 pt-4"
    >
      {/* Polaroid Card Link with natural tilt & straighten on hover */}
      <a
        href={project.behanceLink}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative block w-full bg-[#FFFEFB] p-3 pb-3.5 rounded-[2px] border border-[#EFEFEA]/80 text-inherit no-underline cursor-pointer"
        style={{
          transform: isHovered ? 'rotate(0deg) translateY(-8px)' : `rotate(${cardRotation}deg)`,
          boxShadow: isHovered
            ? '2px 18px 36px 0px rgba(0, 0, 0, 0.22)'
            : '2px 8px 18px 0px rgba(0, 0, 0, 0.14)',
          transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease',
          zIndex: isHovered ? 30 : 1,
        }}
      >
        {/* Washi Tape Strip pinned to the top of the card */}
        <div
          className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 w-[106px] h-[36px] pointer-events-none rounded-[1px] shadow-[0_1px_3px_rgba(0,0,0,0.12)] border-y border-white/40"
          style={{
            backgroundColor: section.tapeColor || 'rgba(169, 220, 242, 0.85)',
            transform: `translateX(-50%) rotate(${tapeRotation}deg)`,
          }}
        />

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

        {/* Caption in Inter Bold */}
        <p className="font-inter font-bold text-[18px] sm:text-[20px] leading-snug text-[#1B1A17] pt-2 px-0.5 truncate group-hover:text-black tracking-tight" title={project.caption}>
          {project.caption}
        </p>

        {/* Metadata Row: Project Title & Behance Link */}
        <div className="flex items-center justify-between gap-2 pt-1 px-0.5 text-[13px] font-inter">
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
          className="absolute bottom-1 inset-x-0 h-3.5 sm:h-4 rounded-[3px] pointer-events-none -z-0 opacity-80"
          style={{ backgroundColor: section.markerColor }}
        />
        <h3 className="relative z-10 font-inter font-extrabold text-2xl sm:text-3xl lg:text-[34px] text-[#141414] tracking-tight leading-tight px-1 whitespace-nowrap">
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

  // Filtered single section when not 'all'
  const currentFilteredSection = activeFilter !== 'all'
    ? sections.find((s) => s.id === activeFilter)
    : null;

  return (
    <section id="work" className="py-16 sm:py-24 px-4 sm:px-8 lg:px-12 bg-[#F6F6F3] bg-dot-grid relative scroll-mt-20 font-inter">
      <div className="max-w-[1360px] mx-auto">
        
        {/* Hero Section Header: Title */}
        <div className="mb-4 sm:mb-6">
          <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-inter font-extrabold text-[#141414] tracking-[-0.02em] leading-tight">
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
                className={`group cursor-pointer inline-flex items-center gap-2 px-4 py-2 sm:px-4 sm:py-2.5 rounded-full border text-[14px] sm:text-[15px] font-inter font-medium transition-all duration-200 focus:outline-none active:scale-[0.98] ${
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
              {/* 3. 3D Modelling (1 card) + Visual Journal (1 card) - Natural paired row */}
              <div className="flex flex-wrap gap-10 lg:gap-14 items-start">
                {/* 3D Modelling - 1 card */}
                {modellingSection && (
                  <div className="space-y-6 sm:space-y-8">
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
                  <div className="space-y-6 sm:space-y-8">
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
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
