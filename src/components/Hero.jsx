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
  { text: 'CALLIGRAPHY', dotColor: '#EC4899', pos: 'top-4 -left-2 sm:-left-4 lg:-left-6', rotate: -5, delay: 0.1 },
  { text: 'VISUAL DESIGN', dotColor: '#E6004C', pos: 'top-22 -left-4 sm:-left-6 lg:-left-8', rotate: 2.5, delay: 0.25 },
  { text: 'ILLUSTRATION', dotColor: '#10B981', pos: 'top-42 -left-5 sm:-left-7 lg:-left-9', rotate: -3.5, delay: 0.4 },
  { text: 'SKETCHING', dotColor: '#F97316', pos: 'top-62 -left-3 sm:-left-5 lg:-left-7', rotate: 3, delay: 0.55 },
  { text: 'ART', dotColor: '#F59E0B', pos: 'bottom-16 -left-1 sm:-left-3 lg:-left-5', rotate: -2, delay: 0.7 },
  
  // Top Center
  { text: 'SCULPTING', dotColor: '#EAB308', pos: '-top-5 left-1/4 -translate-x-1/2', rotate: -2, delay: 0.2 },

  // Right side annotations - strictly contained inside left column
  { text: 'UI/UX', dotColor: '#0EA5E9', pos: 'top-3 right-0 sm:right-2 lg:right-3', rotate: -2.5, delay: 0.15 },
  { text: 'PRODUCT DESIGN', dotColor: '#E6004C', pos: 'top-22 right-0 sm:right-1 lg:right-2', rotate: 3, delay: 0.3 },
  { text: '3D CHARACTER DESIGN', dotColor: '#8B5CF6', pos: 'top-42 right-0 sm:right-1 lg:right-2', rotate: -3, delay: 0.45 },
  { text: 'ANIMATION', dotColor: '#A855F7', pos: 'top-62 right-0 sm:right-2 lg:right-3', rotate: 2, delay: 0.6 },
  { text: 'VISUALIZATION', dotColor: '#14B8A6', pos: 'bottom-16 right-1 sm:right-3 lg:right-4', rotate: -3, delay: 0.75 }
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
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-brand-dark tracking-tight leading-[1.15] mb-4 sm:mb-6 min-h-[3em] sm:min-h-[2.4em]">
            Hi,<br />
            I’m{' '}
            <span className="text-brand-pink inline-block relative font-black">
              {text}
              <span className="inline-block w-[3px] sm:w-[4px] h-[0.82em] bg-brand-pink ml-1.5 animate-cursor rounded-full align-baseline shadow-sm" />
            </span>
          </h1>

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

          {/* Quick Social Links Bar - Logos */}
          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-100 flex items-center gap-2.5 sm:gap-3 text-gray-500">
            <span className="text-[11px] uppercase tracking-wider text-gray-400 font-bold mr-1">Connect:</span>
            
            {/* LinkedIn */}
            <a 
              href={personalInfo.links.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn"
              title="LinkedIn"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white hover:bg-[#0A66C2] hover:text-white text-gray-700 border border-gray-200/90 shadow-xs hover:shadow-md transition-all duration-200 flex items-center justify-center hover:scale-110 active:scale-95"
            >
              <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px] fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2" />
              </svg>
            </a>

            {/* Behance */}
            <a 
              href={personalInfo.links.behance} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Behance"
              title="Behance"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white hover:bg-[#0057FF] hover:text-white text-gray-700 border border-gray-200/90 shadow-xs hover:shadow-md transition-all duration-200 flex items-center justify-center hover:scale-110 active:scale-95"
            >
              <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px] fill-current" viewBox="0 0 24 24">
                <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-4.102 0-5.836-2.584-5.836-6.195 0-3.801 2.215-6.005 5.758-6.005 3.738 0 5.485 2.451 5.485 5.867 0 .422-.053 1.096-.062 1.333h-8.081c.074 1.954 1.154 3.012 2.85 3.012 1.346 0 2.148-.568 2.531-1.295l2.456.282zm-7.892-3.88h5.088c-.068-1.527-.852-2.316-2.451-2.316-1.597 0-2.493.789-2.637 2.316zm-7.834-4.12h-3.957v-4h3.754c1.65 0 2.766.75 2.766 2.016 0 1.233-1.01 1.984-2.563 1.984zm.447 3.072c1.944 0 3.125.867 3.125 2.348 0 1.547-1.309 2.58-3.328 2.58h-4.201v-4.928h4.404zm-4.404 6.928h4.375c3.275 0 5.475-1.594 5.475-4.248 0-1.844-1.176-3.137-2.73-3.664 1.258-.619 1.996-1.748 1.996-3.336 0-2.449-1.957-3.752-4.707-3.752h-6.409v15h2z" />
              </svg>
            </a>

            {/* Instagram */}
            <a 
              href={personalInfo.links.instagram} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Instagram"
              title="Instagram"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] hover:text-white text-gray-700 border border-gray-200/90 shadow-xs hover:shadow-md transition-all duration-200 flex items-center justify-center hover:scale-110 active:scale-95"
            >
              <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px] fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            {/* Notion */}
            <a 
              href={personalInfo.links.notion} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Notion"
              title="Notion"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white hover:bg-black hover:text-white text-gray-700 border border-gray-200/90 shadow-xs hover:shadow-md transition-all duration-200 flex items-center justify-center hover:scale-110 active:scale-95"
            >
              <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px] fill-current" viewBox="0 0 24 24">
                <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.83a2.91 2.91 0 0 0-1.867-.653L3.712 2.106c-.466.047-.56.28-.373.466l1.12 1.636zm-.7 2.754v14.471c0 .7.373 1.026 1.074.98l13.82-.794c.7-.046.887-.466.887-1.12V6.169c0-.653-.28-.98-.84-.933l-14.1 1.027c-.607.046-.84.28-.84.7zM16.927 8.082l.046 10.222c0 .466-.233.653-.606.653-.327 0-.514-.093-.794-.466l-5.32-8.31v8.123c0 .513-.233.746-.7.746h-.887c-.467 0-.607-.233-.607-.7V8.595c0-.466.233-.653.607-.653.42 0 .653.187.98.653l5.086 8.03V8.082c0-.466.234-.653.7-.653h.794c.467 0 .7.187.7.653z" />
              </svg>
            </a>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
