import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import { ArrowUpRight, ArrowDown, Sparkles } from 'lucide-react';
import ImageWithSkeleton from './ImageWithSkeleton';
import mascotImg from '../assets/mascot.webp';

const TYPEWRITER_PHRASES = [
  'Sneha Kakde',
  'a Visual Designer',
  'a UX Designer',
  'a Creative Storyteller',
  'Sneha Kakde'
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
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 self-start px-3 sm:px-3.5 py-1 rounded-full bg-pink-50 border border-pink-100 text-brand-pink text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-4 sm:mb-6">
            <Sparkles className="w-3.5 h-3.5 text-brand-pink" />
            <span>Design Portfolio 2026</span>
          </div>

          {/* Main Headline with Typewriter Effect */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-brand-dark tracking-tight leading-[1.15] mb-3 sm:mb-4 min-h-[3em] sm:min-h-[2.4em]">
            Hi,<br />
            I’m{' '}
            <span className="text-brand-pink inline-block relative font-black">
              {text}
              <span className="inline-block w-[3px] sm:w-[4px] h-[0.82em] bg-brand-pink ml-1.5 animate-cursor rounded-full align-baseline shadow-sm" />
            </span>
          </h1>

          {/* Role Subtitle */}
          <h2 className="text-base sm:text-xl font-bold text-gray-700 mb-4 sm:mb-6 tracking-tight flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span>Visual Designer</span>
            <span className="text-brand-pink">•</span>
            <span>UX Researcher & Strategist</span>
          </h2>

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
