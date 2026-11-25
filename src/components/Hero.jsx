import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import ImageWithSkeleton from './ImageWithSkeleton';
import mascotImg from '../assets/mascot.webp';

const TYPEWRITER_PHRASES = [
  'Sneha Kakde',
  'a Visual Designer',
  'a Product Designer',
  'a Multidisciplinary Designer',
  'a Creative Storyteller',
  'Sneha Kakde'
];

const CHARACTER_ANNOTATIONS = [
  // Left side annotations
  { text: 'CALLIGRAPHY', dotColor: '#EC4899', pos: 'top-6 -left-3 sm:-left-6 lg:-left-10 xl:-left-14', rotate: -5, delay: 0.1 },
  { text: 'VISUAL DESIGN', dotColor: '#E6004C', pos: 'top-24 -left-6 sm:-left-10 lg:-left-16 xl:-left-20', rotate: 2.5, delay: 0.25 },
  { text: 'ILLUSTRATION', dotColor: '#10B981', pos: 'top-44 -left-8 sm:-left-12 lg:-left-18 xl:-left-24', rotate: -3.5, delay: 0.4 },
  { text: 'SKETCHING', dotColor: '#F97316', pos: 'top-64 -left-5 sm:-left-8 lg:-left-14 xl:-left-16', rotate: 3, delay: 0.55 },
  { text: 'ART', dotColor: '#F59E0B', pos: 'bottom-20 -left-2 sm:-left-4 lg:-left-8 xl:-left-10', rotate: -2, delay: 0.7 },
  
  // Top Center
  { text: 'SCULPTING', dotColor: '#EAB308', pos: '-top-6 left-1/4 -translate-x-1/2', rotate: -2, delay: 0.2 },

  // Right side annotations
  { text: 'UI/UX', dotColor: '#0EA5E9', pos: 'top-4 -right-2 sm:-right-4 lg:-right-8 xl:-right-10', rotate: -2.5, delay: 0.15 },
  { text: 'PRODUCT DESIGN', dotColor: '#E6004C', pos: 'top-24 -right-6 sm:-right-8 lg:-right-14 xl:-right-18', rotate: 3, delay: 0.3 },
  { text: '3D CHARACTER DESIGN', dotColor: '#8B5CF6', pos: 'top-44 -right-8 sm:-right-10 lg:-right-18 xl:-right-22', rotate: -3, delay: 0.45 },
  { text: 'ANIMATION', dotColor: '#A855F7', pos: 'top-64 -right-6 sm:-right-8 lg:-right-12 xl:-right-16', rotate: 2, delay: 0.6 },
  { text: 'VISUALIZATION', dotColor: '#14B8A6', pos: 'bottom-20 -right-2 sm:-right-4 lg:-right-8 xl:-right-10', rotate: -3, delay: 0.75 }
];

export default function Hero({ onOpenContact }) {
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(110);

  useEffect(() => {
    const currentPhrase = TYPEWRITER_PHRASES[phraseIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing forward
        setText(currentPhrase.substring(0, text.length + 1));
        setTypingSpeed(100);

        if (text.length + 1 === currentPhrase.length) {
          // Pause when word is completely typed
          setTimeout(() => setIsDeleting(true), 2400);
        }
      } else {
        // Deleting backwards
        setText(currentPhrase.substring(0, text.length - 1));
        setTypingSpeed(50);

        if (text.length === 0) {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % TYPEWRITER_PHRASES.length);
          setTypingSpeed(300);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, phraseIndex, typingSpeed]);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-8 lg:px-12 bg-gradient-to-b from-white via-[#FAFAFC] to-white overflow-hidden">
      
      {/* Background Subtle Ambient Glows */}
      <div className="absolute top-1/4 left-5 w-72 sm:w-[450px] h-72 sm:h-[450px] bg-pink-100/60 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-subtle" />
      <div className="absolute bottom-10 right-10 w-64 sm:w-96 h-64 sm:h-96 bg-orange-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-[1360px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        
        {/* Left Column: Character Mascot with Floating Annotations */}
        <motion.div 
          className="lg:col-span-6 flex flex-col justify-center items-center relative order-1"
          initial={{ opacity: 0, scale: 0.94, x: -30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="relative w-full max-w-[280px] sm:max-w-md lg:max-w-xl xl:max-w-2xl flex justify-center items-center">
            
            {/* Hand-drawn style "(that's me! 👋)" sticker badge with arrow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7, rotate: -6 }}
              animate={{ opacity: 1, scale: 1, rotate: -5 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="absolute -top-3 sm:-top-5 right-2 sm:right-6 lg:-right-1 z-30 flex flex-col items-center pointer-events-none select-none"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1B1A17] text-white shadow-xl border border-white/30 backdrop-blur-sm">
                <span className="font-caveat font-bold text-lg sm:text-xl text-[#FFFEFB] tracking-wide">
                  that's me!
                </span>
                <span className="text-base animate-pulse">👋</span>
              </div>
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#1B1A17] -mt-1 mr-3 transform rotate-12 drop-shadow-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M6 3c2 5 3 9 7 13m0 0l-4-1m4 1l-1-4" />
              </svg>
            </motion.div>

            {/* Floating Desktop Annotations around character */}
            {CHARACTER_ANNOTATIONS.map((item, index) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  y: [0, -6, 0]
                }}
                transition={{
                  opacity: { duration: 0.5, delay: item.delay },
                  scale: { duration: 0.5, delay: item.delay },
                  y: { repeat: Infinity, duration: 3.6 + (index % 3) * 0.7, ease: "easeInOut", delay: item.delay }
                }}
                whileHover={{ scale: 1.1, rotate: 0, zIndex: 40 }}
                className={`hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-gray-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.08)] cursor-default select-none pointer-events-auto z-20 absolute ${item.pos}`}
                style={{ transform: `rotate(${item.rotate}deg)` }}
              >
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.dotColor }} />
                <span className="font-archivo font-bold text-[11px] xl:text-[12px] tracking-wider text-[#1F2937] whitespace-nowrap">
                  {item.text}
                </span>
              </motion.div>
            ))}

            {/* Mascot Image with Gentle Floating Animation & Die-Cut Sticker Style */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
              className="relative z-10 w-full flex justify-center items-center"
            >
              <ImageWithSkeleton
                src={mascotImg}
                alt="Sneha Kakde - Multidisciplinary Designer"
                loading="eager"
                draggable={false}
                containerClassName="w-full flex justify-center items-center overflow-visible"
                className="w-full h-auto max-h-[340px] sm:max-h-[580px] lg:max-h-[720px] xl:max-h-[780px] object-contain mascot-shadow select-none"
              />
            </motion.div>

          </div>

          {/* Mobile Annotation Chips Cloud (under character on small screens) */}
          <div className="lg:hidden flex flex-wrap justify-center items-center gap-2 pt-4 px-1 max-w-lg mx-auto select-none">
            {CHARACTER_ANNOTATIONS.map((item) => (
              <span
                key={item.text}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 border border-gray-200/90 shadow-xs text-[11px] sm:text-xs font-archivo font-bold text-[#1F2937]"
                style={{ transform: `rotate(${item.rotate * 0.6}deg)` }}
              >
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.dotColor }} />
                {item.text}
              </span>
            ))}
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
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-brand-dark tracking-tight leading-[1.15] mb-4 sm:mb-5 min-h-[3em] sm:min-h-[2.4em]">
            Hi,<br />
            I’m{' '}
            <span className="text-brand-pink inline-block relative font-black">
              {text}
              <span className="inline-block w-[3px] sm:w-[4px] h-[0.82em] bg-brand-pink ml-1.5 animate-cursor rounded-full align-baseline shadow-sm" />
            </span>
          </h1>

          {/* Multidisciplinary Designer Statement */}
          <p className="text-base sm:text-xl font-bold text-gray-900 tracking-tight mb-3 sm:mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-pink flex-shrink-0 animate-ping" />
            <span>I’m a multidisciplinary designer based in Maharashtra.</span>
          </p>

          {/* Description */}
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed max-w-xl mb-8 sm:mb-10 font-normal">
            {personalInfo.heroBio}
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

            {/* Explore Work */}
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                const elem = document.getElementById('work');
                if (elem) {
                  const navOffset = 80;
                  const pos = elem.getBoundingClientRect().top + window.pageYOffset - navOffset;
                  window.scrollTo({ top: pos, behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4 rounded-full bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 text-sm sm:text-base font-semibold transition-all hover:shadow-md hover:border-gray-300 cursor-pointer text-center"
            >
              <span>Explore Selected Work</span>
              <ArrowDown className="w-4 h-4 text-brand-pink" />
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
