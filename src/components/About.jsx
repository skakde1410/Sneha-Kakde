import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { personalInfo, craftGallery } from '../data/portfolioData';
import { Sparkles, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import ImageWithSkeleton from './ImageWithSkeleton';
import OffTheGridCoverflow from './OffTheGridCoverflow';
import TypewriterBanner from './TypewriterBanner';

export default function About({ onSelectCraft }) {
  // Triple duplicated gallery to allow smooth bidirectional infinite scrolling
  const duplicatedGallery = [...craftGallery, ...craftGallery, ...craftGallery];
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);
  const isTouchingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftStartRef = useRef(0);
  const hasMovedRef = useRef(false);
  const animFrameRef = useRef(null);
  const lastTimeRef = useRef(performance.now());
  const wheelTimeoutRef = useRef(null);
  const isWheelingRef = useRef(false);

  // Initialize scroll position in the center batch so user can scroll left or right immediately
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const initPos = () => {
      if (el.scrollWidth > 0) {
        const batchWidth = el.scrollWidth / 3;
        if (el.scrollLeft === 0) {
          el.scrollLeft = batchWidth;
        }
      }
    };

    const t = setTimeout(initPos, 100);
    window.addEventListener('resize', initPos);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', initPos);
    };
  }, []);

  // Continuous auto-sliding that KEEPS SCROLLING AUTOMATICALLY (never stopped by mere hover)
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    lastTimeRef.current = performance.now();

    const tick = (now) => {
      const elapsed = now - lastTimeRef.current;
      lastTimeRef.current = now;

      // Keep scrolling automatically whenever user is NOT actively dragging/touching/wheeling
      if (!isDraggingRef.current && !isTouchingRef.current && !isWheelingRef.current) {
        if (el) {
          // Normalize to ~1.75px per 16ms for crisp, faster automatic motion
          const delta = (elapsed / 16.667) * 1.75;
          el.scrollLeft += Math.max(0.8, Math.min(delta, 5));

          const batchWidth = el.scrollWidth / 3;
          if (batchWidth > 0) {
            if (el.scrollLeft >= batchWidth * 2) {
              el.scrollLeft -= batchWidth;
            } else if (el.scrollLeft <= 0) {
              el.scrollLeft += batchWidth;
            }
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Handle wrap-around on native scroll (touch or trackpad)
  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const batchWidth = el.scrollWidth / 3;
    if (batchWidth > 0) {
      if (el.scrollLeft >= batchWidth * 2) {
        el.scrollLeft -= batchWidth;
      } else if (el.scrollLeft <= 5) {
        el.scrollLeft += batchWidth;
      }
    }
  }, []);

  // Global Mouse Drag Listeners so dragging is smooth and reliable even outside element
  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (!isDraggingRef.current) return;
      const el = scrollRef.current;
      if (!el) return;
      const diff = e.pageX - startXRef.current;
      if (Math.abs(diff) > 4) {
        hasMovedRef.current = true;
      }
      el.scrollLeft = scrollLeftStartRef.current - diff;

      // Handle infinite wrap-around during active drag
      const batchWidth = el.scrollWidth / 3;
      if (batchWidth > 0) {
        if (el.scrollLeft >= batchWidth * 2) {
          el.scrollLeft -= batchWidth;
          scrollLeftStartRef.current -= batchWidth;
        } else if (el.scrollLeft <= 0) {
          el.scrollLeft += batchWidth;
          scrollLeftStartRef.current += batchWidth;
        }
      }
    };

    const handleGlobalMouseUp = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        setIsDragging(false);
        lastTimeRef.current = performance.now(); // reset time so auto-scroll resumes immediately without a jump
        setTimeout(() => {
          hasMovedRef.current = false;
        }, 80);
      }
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, []);

  // Mouse Drag Start
  const handleMouseDown = (e) => {
    if (e.button !== 0) return; // only left click
    const el = scrollRef.current;
    if (!el) return;
    isDraggingRef.current = true;
    setIsDragging(true);
    hasMovedRef.current = false;
    startXRef.current = e.pageX;
    scrollLeftStartRef.current = el.scrollLeft;
  };

  // Touch Handlers for Mobile
  const handleTouchStart = () => {
    isTouchingRef.current = true;
  };

  const handleTouchEnd = () => {
    isTouchingRef.current = false;
    lastTimeRef.current = performance.now();
  };

  // Trackpad / Wheel scroll listener
  const handleWheel = () => {
    isWheelingRef.current = true;
    if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
    wheelTimeoutRef.current = setTimeout(() => {
      isWheelingRef.current = false;
      lastTimeRef.current = performance.now();
    }, 180);
  };

  // Manual Step Buttons
  const scrollStep = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = direction === 'left' ? -340 : 340;
    el.scrollBy({ left: amount, behavior: 'smooth' });
    lastTimeRef.current = performance.now();
  };

  return (
    <section id="about" className="pt-16 sm:pt-20 pb-12 px-4 sm:px-8 bg-white relative overflow-hidden scroll-mt-20">
      
      {/* Ambient background decoration */}
      <div className="absolute top-1/3 -right-20 w-72 sm:w-96 h-72 sm:h-96 bg-pink-50 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        
        {/* Section Heading (Matching Figma "A little about me") */}
        <div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-brand-dark tracking-tight">
            A little about me
          </h2>
        </div>

        {/* Top Split: Photo & Personal Narrative (Matching Figma frame 12:333) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-start">
          
          {/* Sneha's Portrait */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative group max-w-[280px] sm:max-w-sm w-full">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border-4 border-white ring-1 ring-gray-200">
                <ImageWithSkeleton
                  src="/assets/sneha_profile.webp"
                  alt="Sneha Kakde"
                  containerClassName="w-full h-auto"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </motion.div>

          {/* Narrative Bio (Exact Figma Text) */}
          <motion.div 
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-7 space-y-4 sm:space-y-5 text-left"
          >
            <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-dark">
              Hi, I’m <span className="text-brand-pink">Sneha</span>
            </h3>

            <p className="text-sm sm:text-lg text-gray-900 leading-relaxed font-bold">
              {personalInfo.extendedBio[0]}
            </p>

            <p className="text-xs sm:text-base text-gray-700 leading-relaxed font-normal">
              {personalInfo.extendedBio[1]}
            </p>

            <p className="text-xs sm:text-base text-gray-700 leading-relaxed font-normal">
              {personalInfo.extendedBio[2]}
            </p>
          </motion.div>

        </div>

        {/* OFF THE GRID - 3D Coverflow Carousel Matching Reference */}
        <div id="interests" className="scroll-mt-20">
          <OffTheGridCoverflow />
        </div>

        {/* Narrative Paragraph: Different interests. One curious mind. (Matching Figma exactly) */}
        <div className="space-y-2 sm:space-y-3 pt-2 text-left">
          <h3 className="text-lg sm:text-2xl font-bold text-neutral-900 tracking-tight">
            Different interests. One curious mind.
          </h3>
          <p className="text-xs sm:text-base text-neutral-700 leading-relaxed max-w-5xl">
            {personalInfo.interestsPhilosophy}
          </p>
        </div>

        {/* Typewriter Banner with Modern Rounded Corners */}
        <TypewriterBanner />

        {/* UNFILTERED - Photo Automatic Smooth Sliding Carousel with Full Manual Scroll & Drag Controls */}
        <div className="space-y-4 sm:space-y-6 pt-4">
          <div className="flex items-center justify-between">
            <h4 className="text-base sm:text-xl font-extrabold text-brand-dark flex items-center gap-1.5 sm:gap-2 tracking-wide uppercase">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-brand-pink flex-shrink-0" />
              <span>UNFILTERED</span>
            </h4>

            {/* Manual Left / Right Scroll Step Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollStep('left')}
                aria-label="Previous photos"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 flex items-center justify-center text-neutral-700 hover:text-black transition-all active:scale-95 cursor-pointer shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollStep('right')}
                aria-label="Next photos"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 flex items-center justify-center text-neutral-700 hover:text-black transition-all active:scale-95 cursor-pointer shadow-sm"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Smooth Scrollable & Drag Track */}
          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onScroll={handleScroll}
            onWheel={handleWheel}
            className={`relative overflow-x-auto hide-scrollbar py-2 -mx-4 sm:-mx-8 px-4 sm:px-8 select-none ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            <div className="flex gap-4 sm:gap-6 w-max">
              {duplicatedGallery.map((craft, idx) => (
                <div
                  key={`${craft.id}-${idx}`}
                  onClick={() => {
                    if (!hasMovedRef.current) {
                      onSelectCraft(craft);
                    }
                  }}
                  className="flex-shrink-0 w-56 sm:w-64 aspect-[3/4] rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-gray-200 cursor-pointer relative group bg-gray-100 transition-all duration-300 hover:scale-[1.03]"
                >
                  <ImageWithSkeleton
                    src={craft.image}
                    alt="Unfiltered visual"
                    containerClassName="w-full h-full pointer-events-none select-none"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none select-none"
                    draggable={false}
                  />
                  
                  {/* Overlay on hover (No text information) */}
                  <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <div className="w-10 h-10 rounded-full bg-white/25 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-transform">
                      <Eye className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
