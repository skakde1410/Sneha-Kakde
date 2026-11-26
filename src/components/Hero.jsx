import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import { ArrowUpRight } from 'lucide-react';
import ImageWithSkeleton from './ImageWithSkeleton';
import mascotImg from '../assets/mascot.webp';

const DISCIPLINES = [
  { label: 'UI/UX', color: '#0066FF' },
  { label: 'PRODUCT DESIGN', color: '#8A2BE2' },
  { label: 'SCULPTING', color: '#E65100' },
  { label: '3D CHARACTER DESIGN', color: '#00B4D8' },
  { label: 'CALLIGRAPHY', color: '#10B981' },
  { label: 'VISUAL DESIGN', color: '#E6004C' },
  { label: 'ILLUSTRATION', color: '#F59E0B' },
  { label: 'SKETCHING', color: '#4B5563' },
  { label: 'ART', color: '#EC4899' },
  { label: 'VISUALIZATION', color: '#3B82F6' },
  { label: 'ANIMATION', color: '#14B8A6' }
];

const NAME_TEXT = 'Sneha Kakde';

export default function Hero({ onOpenContact }) {
  const [typedName, setTypedName] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(110);
  const [disciplineIndex, setDisciplineIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Typewriter effect for "Sneha Kakde"
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isDeleting) {
        setTypedName(NAME_TEXT.substring(0, typedName.length + 1));
        setTypingSpeed(110);

        if (typedName.length + 1 === NAME_TEXT.length) {
          setTimeout(() => setIsDeleting(true), 2500);
        }
      } else {
        setTypedName(NAME_TEXT.substring(0, typedName.length - 1));
        setTypingSpeed(60);

        if (typedName.length === 0) {
          setIsDeleting(false);
          setTypingSpeed(400);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [typedName, isDeleting, typingSpeed]);

  // Discipline tab auto-loop
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setDisciplineIndex((prev) => (prev + 1) % DISCIPLINES.length);
    }, 2200);

    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-8 lg:px-12 bg-gradient-to-b from-white via-[#FAFAFC] to-white overflow-hidden">
      
      {/* Background Subtle Ambient Glows */}
      <div className="absolute top-1/4 left-5 w-72 sm:w-[450px] h-72 sm:h-[450px] bg-pink-100/60 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-subtle" />
      <div className="absolute bottom-10 right-10 w-64 sm:w-96 h-64 sm:h-96 bg-orange-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-[1360px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        
        {/* Left Column: Prominent Large Mascot Illustration (Matching exact Figma frame 88:981) */}
        <motion.div 
          className="lg:col-span-6 flex justify-center items-center relative order-1"
          initial={{ opacity: 0, scale: 0.94, x: -30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="relative w-full max-w-[280px] sm:max-w-md lg:max-w-xl xl:max-w-2xl flex justify-center items-center">
            
            {/* Mascot Image with Gentle Floating Animation */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
              className="relative z-10 w-full flex justify-center items-center"
            >
              <ImageWithSkeleton
                src={mascotImg}
                alt="Sneha Kakde Character Mascot"
                loading="eager"
                draggable={false}
                containerClassName="w-full flex justify-center items-center overflow-visible"
                className="w-full h-auto max-h-[340px] sm:max-h-[580px] lg:max-h-[720px] xl:max-h-[780px] object-contain mascot-shadow select-none"
              />
            </motion.div>

          </div>
        </motion.div>

        {/* Right Column: Hero Typography & Call-To-Actions */}
        <motion.div 
          className="lg:col-span-6 flex flex-col justify-center text-left order-2"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
        >
          {/* Main Headline with Typewriter Effect */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-brand-dark tracking-tight leading-[1.15] mb-4 sm:mb-6 min-h-[1.3em]">
            Hi, I’m{' '}
            <span className="text-brand-pink inline-block relative font-black">
              {typedName}
              <span className="inline-block w-[3px] sm:w-[4px] h-[0.82em] bg-brand-pink ml-1.5 animate-cursor rounded-full align-baseline shadow-sm" />
            </span>
          </h1>

          {/* Looping Discipline Tab */}
          <div className="mb-5 sm:mb-6 flex items-center">
            <div 
              onClick={() => setDisciplineIndex((prev) => (prev + 1) % DISCIPLINES.length)}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="inline-flex items-center gap-2.5 sm:gap-3 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white border border-gray-200/90 shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer select-none group"
              title="Click to view next discipline"
            >
              {/* Pulsing Accent Dot */}
              <span 
                className="w-2.5 h-2.5 rounded-full flex-shrink-0 transition-colors duration-300 shadow-xs"
                style={{ backgroundColor: DISCIPLINES[disciplineIndex].color }}
              />

              {/* Looping Tab Text */}
              <div className="h-6 flex items-center overflow-hidden min-w-[120px] sm:min-w-[175px]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={DISCIPLINES[disciplineIndex].label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="text-xs sm:text-sm font-archivo font-extrabold tracking-wider text-gray-900 uppercase block whitespace-nowrap text-left"
                  >
                    {DISCIPLINES[disciplineIndex].label}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Multidisciplinary Designer Subtitle */}
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 font-semibold tracking-tight leading-snug max-w-xl mb-8 sm:mb-10">
            a multidisciplinary designer based in Maharashtra
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
            {/* CV Button (Exact Figma Black Pill) */}
            <a
              href={personalInfo.links.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:px-8 sm:py-4 rounded-full bg-brand-dark hover:bg-black text-white text-sm sm:text-base font-semibold transition-all hover:shadow-xl hover:scale-105 active:scale-95 group text-center"
            >
              <span>Curriculum Vitae</span>
              <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>

          {/* Quick Social Links Bar */}
          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-100 flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-500 font-medium">
            <span className="text-[11px] uppercase tracking-wider text-gray-400 font-bold">Connect:</span>
            <a 
              href={personalInfo.links.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-brand-pink transition-colors"
            >
              LinkedIn ↗
            </a>
            <a 
              href={personalInfo.links.behance} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-brand-pink transition-colors"
            >
              Behance ↗
            </a>
            <a 
              href={personalInfo.links.instagram} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-brand-pink transition-colors"
            >
              Instagram ↗
            </a>
            <a 
              href={personalInfo.links.notion} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-brand-pink transition-colors"
            >
              Notion ↗
            </a>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
