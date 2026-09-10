import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { archiveCategories } from '../data/portfolioData';
import { BookOpen, Play, ArrowUpRight } from 'lucide-react';
import ImageWithSkeleton from './ImageWithSkeleton';

const categoryStyles = {
  illustration: {
    number: '01',
    color: '#E6004C',
    bg: 'bg-[#E6004C]',
    ring: 'ring-[#E6004C]/30',
    lightBg: 'bg-pink-50',
    border: 'border-pink-200'
  },
  'graphic-design': {
    number: '02',
    color: '#F39C12',
    bg: 'bg-[#F39C12]',
    ring: 'ring-[#F39C12]/30',
    lightBg: 'bg-amber-50',
    border: 'border-amber-200'
  },
  'character-design': {
    number: '03',
    color: '#16A085',
    bg: 'bg-[#16A085]',
    ring: 'ring-[#16A085]/30',
    lightBg: 'bg-teal-50',
    border: 'border-teal-200'
  },
  'product-design': {
    number: '04',
    color: '#2980B9',
    bg: 'bg-[#2980B9]',
    ring: 'ring-[#2980B9]/30',
    lightBg: 'bg-blue-50',
    border: 'border-blue-200'
  },
  photography: {
    number: '05',
    color: '#8E44AD',
    bg: 'bg-[#8E44AD]',
    ring: 'ring-[#8E44AD]/30',
    lightBg: 'bg-purple-50',
    border: 'border-purple-200'
  },
  '3d-animation': {
    number: '06',
    color: '#2C3E50',
    bg: 'bg-[#2C3E50]',
    ring: 'ring-[#2C3E50]/30',
    lightBg: 'bg-slate-50',
    border: 'border-slate-200'
  },
  miscellaneous: {
    number: '07',
    color: '#0E6251',
    bg: 'bg-[#0E6251]',
    ring: 'ring-[#0E6251]/30',
    lightBg: 'bg-emerald-50',
    border: 'border-emerald-200'
  }
};

export default function CategoryShowcase({ onSelectImage }) {
  const [activeCategory, setActiveCategory] = useState(archiveCategories[0].id);
  const [activeStorybookIndex, setActiveStorybookIndex] = useState(0);

  const currentCategory = archiveCategories.find(c => c.id === activeCategory) || archiveCategories[0];
  const activeStyle = categoryStyles[currentCategory.id] || categoryStyles.illustration;

  const handleOpenBoard = (title, subtitle, image) => {
    onSelectImage({
      title: title || `${currentCategory.title} (Category ${currentCategory.number})`,
      subtitle: subtitle || currentCategory.description,
      image: image || currentCategory.boardImage
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-10">
      
      {/* Contents Card Container (Matching Figma Frame 66:884) */}
      <div className="bg-[#F5F3ED] rounded-xl sm:rounded-3xl p-3 sm:p-7 lg:p-9 border border-stone-200/80 shadow-md relative overflow-hidden">
        
        {/* Orange Ribbon Tag on Left (Matching Figma "Contents") */}
        <div className="mb-4 sm:mb-6 flex items-center justify-between">
          <div className="bg-[#E64A19] text-white text-xs sm:text-sm font-extrabold px-3.5 sm:px-5 py-1 sm:py-1.5 rounded-r-lg shadow-sm -ml-3 sm:-ml-7 lg:-ml-9 uppercase tracking-wider">
            Contents
          </div>
        </div>

        {/* 7 Numbered Circles Row (01 - 07 Disciplines) */}
        <div className="flex items-start justify-start lg:justify-between gap-2 sm:gap-6 overflow-x-auto pb-2 hide-scrollbar pt-0.5 overscroll-x-contain">
          {archiveCategories.map((category) => {
            const isActive = category.id === activeCategory;
            const style = categoryStyles[category.id] || categoryStyles.illustration;

            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className="flex flex-col items-center flex-1 min-w-[76px] sm:min-w-[120px] max-w-[150px] group focus:outline-none transition-transform cursor-pointer flex-shrink-0"
              >
                {/* Circle Badge with Drop Shadow */}
                <div className="relative flex items-center justify-center h-11 w-11 sm:h-16 sm:w-16 mb-1.5 sm:mb-3">
                  <div
                    className={`w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center font-extrabold text-xs sm:text-base text-white transition-all duration-300 shadow-md border-2 border-white ${
                      style.bg
                    } ${
                      isActive
                        ? 'scale-110 sm:scale-115 ring-4 ring-offset-2 ring-stone-400 shadow-xl'
                        : 'opacity-85 hover:opacity-100 hover:scale-105'
                    }`}
                  >
                    {category.number}
                  </div>
                </div>

                {/* Category Title */}
                <div className="min-h-[34px] sm:min-h-[44px] flex items-start justify-center w-full px-0.5">
                  <span
                    className={`text-[9.5px] sm:text-xs font-bold text-center leading-tight sm:leading-snug transition-colors ${
                      isActive ? 'text-stone-950 font-black' : 'text-stone-600 group-hover:text-stone-900'
                    }`}
                  >
                    {category.title}
                  </span>
                </div>

                {/* Active Indicator Underline */}
                <div
                  className={`h-1 rounded-full transition-all duration-300 mt-0.5 sm:mt-1 ${
                    isActive ? 'w-7 sm:w-10 ' + style.bg : 'w-0 bg-transparent'
                  }`}
                />
              </button>
            );
          })}
        </div>

      </div>

      {/* Full Presentation Board Showcase for Selected Discipline */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentCategory.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25 }}
          className="bg-white rounded-xl sm:rounded-3xl p-2 sm:p-6 lg:p-8 border border-gray-200/90 shadow-xl space-y-4 sm:space-y-6"
        >
          {/* Header Bar */}
          <div className="pb-3 sm:pb-5 border-b border-gray-100 px-1 sm:px-0">
            <div>
              <div className="inline-flex items-center gap-1.5 sm:gap-2 mb-1">
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider px-2 sm:px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-800">
                  Category {currentCategory.number}
                </span>
              </div>
              <h3 className="text-xl sm:text-3xl font-extrabold text-brand-dark tracking-tight">
                {currentCategory.title}
              </h3>
              <p className="text-[11px] sm:text-sm text-gray-600 mt-0.5 sm:mt-1 max-w-3xl">
                {currentCategory.description}
              </p>
            </div>
          </div>

          {/* SPECIFIC VIEW FOR CATEGORY 01: ILLUSTRATION (Storybook 01 & Storybook 02) */}
          {currentCategory.id === 'illustration' && currentCategory.storybooks ? (
            <div className="space-y-4 sm:space-y-8">
              {/* Storybook Switcher Pills */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 px-1 sm:px-0">
                {currentCategory.storybooks.map((sb, idx) => (
                  <button
                    key={sb.id}
                    onClick={() => setActiveStorybookIndex(idx)}
                    className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      activeStorybookIndex === idx
                        ? 'bg-[#E6004C] text-white shadow-lg scale-105'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span>{sb.title}</span>
                  </button>
                ))}
              </div>

              {/* Active Storybook High-Resolution Master Board */}
              {(() => {
                const activeSb = currentCategory.storybooks[activeStorybookIndex] || currentCategory.storybooks[0];
                return (
                  <div className="space-y-3 sm:space-y-4">
                    <div className="px-1 sm:px-0">
                      <h4 className="text-sm sm:text-lg font-extrabold text-neutral-900">{activeSb.title}</h4>
                      <p className="text-[11px] sm:text-sm text-neutral-500">{activeSb.subtitle}</p>
                    </div>

                    <div
                      onClick={() => handleOpenBoard(activeSb.title, activeSb.subtitle, activeSb.image)}
                      className="relative w-full rounded-lg sm:rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200/80 shadow-md group cursor-zoom-in transition-all duration-300 hover:border-brand-pink/50 hover:shadow-2xl"
                    >
                      <ImageWithSkeleton
                        src={activeSb.image}
                        alt={activeSb.title}
                        loading="eager"
                        className="w-full h-auto object-contain block select-none"
                      />
                    </div>

                    {/* Also display the other storybook below for immediate complete discovery */}
                    <div className="pt-4 sm:pt-8 border-t border-stone-200">
                      <div className="mb-2 sm:mb-4 px-1 sm:px-0">
                        <h4 className="text-sm sm:text-lg font-extrabold text-neutral-900">
                          {currentCategory.storybooks[1 - activeStorybookIndex]?.title}
                        </h4>
                        <p className="text-[11px] sm:text-sm text-neutral-500">
                          {currentCategory.storybooks[1 - activeStorybookIndex]?.subtitle}
                        </p>
                      </div>

                      <div
                        onClick={() => {
                          const other = currentCategory.storybooks[1 - activeStorybookIndex];
                          handleOpenBoard(other.title, other.subtitle, other.image);
                        }}
                        className="relative w-full rounded-lg sm:rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200/80 shadow-md group cursor-zoom-in transition-all duration-300 hover:border-brand-pink/50 hover:shadow-2xl"
                      >
                        <ImageWithSkeleton
                          src={currentCategory.storybooks[1 - activeStorybookIndex]?.image}
                          alt={currentCategory.storybooks[1 - activeStorybookIndex]?.title}
                          loading="lazy"
                          className="w-full h-auto object-contain block select-none"
                        />
                      </div>
                    </div>

                  </div>
                );
              })()}
            </div>
          ) : (
            /* ALL OTHER CATEGORIES (02 - 07): FULL RESOLUTION MASTER BOARD */
            <div className="space-y-3 sm:space-y-5">
              <div 
                onClick={() => handleOpenBoard()}
                className="relative w-full rounded-lg sm:rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200/80 shadow-md group cursor-zoom-in transition-all duration-300 hover:border-brand-pink/50 hover:shadow-2xl"
              >
                <ImageWithSkeleton
                  src={currentCategory.boardImage}
                  alt={`${currentCategory.title} Presentation Board`}
                  loading="eager"
                  className="w-full h-auto object-contain block select-none"
                />
              </div>

              {/* Interactive Clickable Video & Asset Links (Matching Figma Orange Bar Aesthetic) */}
              {currentCategory.externalLinks && currentCategory.externalLinks.length > 0 && (
                <div className="space-y-2.5 sm:space-y-3 pt-1">
                  {currentCategory.externalLinks.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#E64A19] to-[#F4511E] text-white shadow-lg hover:shadow-2xl hover:scale-[1.01] active:scale-[0.99] transition-all group cursor-pointer border border-orange-500/40"
                    >
                      <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
                        <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center flex-shrink-0 group-hover:bg-white group-hover:text-[#E64A19] text-white transition-colors">
                          <Play className="w-3 h-3 sm:w-4 sm:h-4 fill-current ml-0.5" />
                        </div>
                        <div className="flex flex-wrap sm:flex-nowrap items-center gap-1 sm:gap-2 min-w-0">
                          <span className="font-extrabold text-xs sm:text-base tracking-tight whitespace-nowrap">
                            {link.title}
                          </span>
                          <span className="opacity-75 text-xs sm:text-sm hidden sm:inline">-</span>
                          <span className="text-[10px] sm:text-sm font-medium opacity-90 underline underline-offset-2 truncate max-w-[200px] sm:max-w-md lg:max-w-2xl">
                            {link.url}
                          </span>
                        </div>
                      </div>

                      <div className="inline-flex items-center gap-1.5 self-end sm:self-auto px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white text-[#E64A19] text-[11px] sm:text-xs font-bold shadow-md group-hover:bg-black group-hover:text-white transition-colors flex-shrink-0">
                        <span>Open Drive Link</span>
                        <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}

        </motion.div>
      </AnimatePresence>

    </div>
  );
}

