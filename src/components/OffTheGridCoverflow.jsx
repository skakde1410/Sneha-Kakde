import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  PenTool, 
  Music, 
  Feather,
  Camera,
  Film,
  CookingPot,
  Layers,
  X 
} from 'lucide-react';

const BadmintonIcon = (props) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <circle cx="9.5" cy="9.5" r="5.5" />
    <line x1="13.5" y1="13.5" x2="20" y2="20" />
    <line x1="9.5" y1="4" x2="9.5" y2="15" />
    <line x1="4" y1="9.5" x2="15" y2="9.5" />
    <path d="M16 4l3 3" />
    <path d="M15 7l2-2" />
    <circle cx="19" cy="5" r="1.5" />
  </svg>
);

const coverflowSlides = [
  {
    id: 'reading',
    category: 'Reading',
    icon: BookOpen,
    title: 'Reading',
    quote: 'I read – because every book gives me another perspective.',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80',
    fallback: '/assets/archive_storybook_1.webp'
  },
  {
    id: 'sketching',
    category: 'Sketching',
    icon: PenTool,
    title: 'Sketching',
    quote: 'I sketch, illustrate & Calligraphy – when an idea feels easier to draw than explain.',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=80',
    fallback: '/assets/craft_sketch_book.webp'
  },
  {
    id: 'music',
    category: 'Music',
    icon: Music,
    title: 'Music',
    quote: 'I listen to music & sing – because sometimes a melody says what words cannot.',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=900&q=80',
    fallback: '/assets/craft_anchoring.webp'
  },
  {
    id: 'writing',
    category: 'Writing',
    icon: Feather,
    title: 'Writing',
    quote: 'I write – articles, thoughts, and poems in Marathi. Writing helps me turn observations and emotions into stories.',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80',
    fallback: '/assets/craft_poem.webp'
  },
  {
    id: 'photography',
    category: 'Photography',
    icon: Camera,
    title: 'Photography',
    quote: 'I photograph – little details, people, places, light, textures, and moments that often go unnoticed.',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80',
    fallback: '/assets/archive_photography.webp'
  },
  {
    id: 'badminton',
    category: 'Badminton',
    icon: BadmintonIcon,
    title: 'Badminton',
    quote: 'I play badminton for the energy, focus, and joy of simply playing.',
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=900&q=80',
    fallback: '/assets/craft_frame130_09_64ff3721.webp'
  },
  {
    id: 'movies',
    category: 'Movies',
    icon: Film,
    title: 'Movies',
    quote: 'I watch movies for the stories, characters, scenes, VFX, visual language, moodboards and different worlds they let me step into.',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80',
    fallback: '/assets/archive_3d_animation.webp'
  },
  {
    id: 'cooking',
    category: 'Cooking',
    icon: CookingPot,
    title: 'Cooking',
    quote: "I love cooking – experimenting with ingredients, trying new recipes, and turning simple things into something of my own. It reminds me that creativity doesn't always need a canvas or a screen.",
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=900&q=80',
    fallback: '/assets/adyam_cover.webp'
  },
  {
    id: 'sculpting',
    category: 'Sculpting',
    icon: Layers,
    title: 'Sculpting',
    quote: 'I love sculpting – working with POP and clay, shaping something with my hands and watching an idea slowly take physical form. I enjoy the process of building, carving, refining, and sometimes simply getting my hands messy.',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=900&q=80',
    fallback: '/assets/craft_clay.webp'
  }
];

export default function OffTheGridCoverflow() {
  const [virtualIndex, setVirtualIndex] = useState(0);
  const [isCardExpanded, setIsCardExpanded] = useState(false);
  const [isCenterHovered, setIsCenterHovered] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  const total = coverflowSlides.length;
  // Current active slide in original dataset
  const realIndex = ((virtualIndex % total) + total) % total;

  // Prioritized preloading to prevent rendering delays
  useEffect(() => {
    coverflowSlides.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);

  // Responsive breakpoint listener
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Manual & Auto Navigation Handlers
  const nextSlide = useCallback(() => {
    setIsCardExpanded(false);
    setVirtualIndex((prev) => prev + 1);
  }, []);

  const prevSlide = useCallback(() => {
    setIsCardExpanded(false);
    setVirtualIndex((prev) => prev - 1);
  }, []);

  const goToSlide = useCallback((targetIndex) => {
    setIsCardExpanded(false);
    setVirtualIndex((current) => {
      const currentReal = ((current % total) + total) % total;
      let diff = targetIndex - currentReal;
      if (diff > total / 2) diff -= total;
      if (diff < -total / 2) diff += total;
      return current + diff;
    });
  }, [total]);

  // Keyboard navigation & Escape dismiss
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isCardExpanded) {
        setIsCardExpanded(false);
        return;
      }
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, isCardExpanded]);

  // Dismiss expanded card on clicking outside
  useEffect(() => {
    if (!isCardExpanded) return;

    const handlePointerDown = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsCardExpanded(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [isCardExpanded]);

  // Automatic sliding timer (crisp, lively cadence)
  useEffect(() => {
    if (isCardExpanded || isInteracting || isCenterHovered) return;

    const timer = setInterval(() => {
      setVirtualIndex((prev) => prev + 1);
    }, 2200);

    return () => clearInterval(timer);
  }, [isCardExpanded, isInteracting, isCenterHovered, virtualIndex]);

  // Mobile Touch Gestures
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
    setIsInteracting(true);
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    setIsInteracting(false);
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 35) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
  };

  // 7 virtual slots to render: -3 (exit left), -2 (far left), -1 (left), 0 (center), 1 (right), 2 (far right), 3 (enter right)
  const visibleDiffs = [-3, -2, -1, 0, 1, 2, 3];

  return (
    <section 
      ref={containerRef}
      className="relative w-full rounded-[36px] sm:rounded-[44px] bg-[#F8F9FA] border border-neutral-200/80 shadow-[0_20px_60px_rgba(0,0,0,0.04)] py-12 sm:py-16 md:py-20 px-4 sm:px-8 select-none my-8 overflow-hidden"
      style={{ perspective: 1200 }}
    >
      {/* Subtle Radial Glow Behind Active Center Card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[750px] h-[400px] bg-white rounded-full blur-3xl opacity-70 pointer-events-none -z-0" />

      {/* Top Header Bar */}
      <div className="relative z-20 flex items-center justify-between mb-8 sm:mb-12 px-2 sm:px-6">
        <h2 className="text-xs sm:text-sm font-semibold tracking-widest text-zinc-800 uppercase font-sans">
          OFF THE GRID
        </h2>
      </div>

      {/* 3D Coverflow Stage */}
      <div 
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative z-10 w-full max-w-6xl mx-auto h-[440px] sm:h-[480px] md:h-[510px] flex items-center justify-center overflow-visible"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Floating Circular Prev Navigation Button */}
        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 backdrop-blur-md border border-neutral-200/90 shadow-[0_8px_25px_rgba(0,0,0,0.08)] flex items-center justify-center text-neutral-700 hover:scale-110 active:scale-95 transition-all cursor-pointer absolute left-1 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 z-40"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Floating Circular Next Navigation Button */}
        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 backdrop-blur-md border border-neutral-200/90 shadow-[0_8px_25px_rgba(0,0,0,0.08)] flex items-center justify-center text-neutral-700 hover:scale-110 active:scale-95 transition-all cursor-pointer absolute right-1 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-40"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Smoothly Sliding Continuous Coverflow Cards */}
        {visibleDiffs.map((diff) => {
          const vPos = virtualIndex + diff;
          const slideIdx = ((vPos % total) + total) % total;
          const slide = coverflowSlides[slideIdx];
          const Icon = slide.icon;

          const isActive = diff === 0;
          const absDiff = Math.abs(diff);

          // Calculate Horizontal Spacing, 3D Rotation, Scale, Depth & Blur
          let xOffset = 0;
          let yOffset = 0;
          let scale = 1.10;
          let rotateY = 0;
          let zIndex = 30;
          let opacity = 1.0;
          let blurAmount = 0;

          if (isMobile) {
            if (isActive) {
              xOffset = 0;
              yOffset = -6;
              scale = 1.05;
              zIndex = 30;
              opacity = 1.0;
              blurAmount = 0;
            } else if (absDiff === 1) {
              xOffset = diff * 120;
              yOffset = 4;
              scale = 0.92;
              rotateY = diff < 0 ? 10 : -10;
              zIndex = 20;
              opacity = 0.50;
              blurAmount = 4;
            } else if (absDiff === 2) {
              xOffset = diff * 108;
              yOffset = 8;
              scale = 0.82;
              rotateY = diff < 0 ? 14 : -14;
              zIndex = 10;
              opacity = 0.20;
              blurAmount = 8;
            } else {
              // Off-screen exit / entrance
              xOffset = diff * 100;
              yOffset = 12;
              scale = 0.72;
              rotateY = diff < 0 ? 18 : -18;
              zIndex = 5;
              opacity = 0;
              blurAmount = 10;
            }
          } else {
            // Desktop
            if (isActive) {
              xOffset = 0;
              yOffset = -10;
              scale = 1.10;
              rotateY = 0;
              zIndex = 30;
              opacity = 1.0;
              blurAmount = 0;
            } else if (absDiff === 1) {
              xOffset = diff * 195;
              yOffset = 6;
              scale = 0.90;
              rotateY = diff < 0 ? 12 : -12;
              zIndex = 20;
              opacity = 0.55;
              blurAmount = 5;
            } else if (absDiff === 2) {
              xOffset = diff * 168;
              yOffset = 12;
              scale = 0.80;
              rotateY = diff < 0 ? 18 : -18;
              zIndex = 10;
              opacity = 0.25;
              blurAmount = 9;
            } else {
              // Off-screen exit / entrance
              xOffset = diff * 155;
              yOffset = 16;
              scale = 0.70;
              rotateY = diff < 0 ? 22 : -22;
              zIndex = 5;
              opacity = 0;
              blurAmount = 12;
            }
          }

          return (
            <motion.div
              key={vPos}
              onClick={() => {
                if (isActive) {
                  setIsCardExpanded((prev) => !prev);
                } else if (absDiff <= 2) {
                  setIsCardExpanded(false);
                  setVirtualIndex(vPos);
                }
              }}
              onMouseEnter={() => {
                if (isActive) setIsCenterHovered(true);
              }}
              onMouseLeave={() => {
                if (isActive) setIsCenterHovered(false);
              }}
              animate={{
                x: xOffset,
                y: yOffset,
                scale,
                rotateY,
                opacity,
                filter: `blur(${blurAmount}px)`
              }}
              transition={{
                x: { type: "spring", stiffness: 320, damping: 28, mass: 0.7 },
                y: { type: "spring", stiffness: 320, damping: 28, mass: 0.7 },
                scale: { duration: 0.32, ease: [0.2, 0.8, 0.2, 1] },
                rotateY: { duration: 0.32, ease: [0.2, 0.8, 0.2, 1] },
                opacity: { duration: 0.25 },
                filter: { duration: 0.25 }
              }}
              drag={isActive ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragStart={() => setIsInteracting(true)}
              onDragEnd={(_, { offset, velocity }) => {
                setIsInteracting(false);
                if (offset.x < -35 || velocity.x < -200) nextSlide();
                else if (offset.x > 35 || velocity.x > 200) prevSlide();
              }}
              style={{
                zIndex,
                transformStyle: 'preserve-3d',
                cursor: absDiff <= 2 ? 'pointer' : 'default',
                pointerEvents: absDiff > 2 ? 'none' : 'auto'
              }}
              className={`absolute top-1/2 left-1/2 -ml-[120px] -mt-[160px] w-[240px] h-[320px] sm:-ml-[135px] sm:-mt-[180px] sm:w-[270px] sm:h-[360px] md:-ml-[145px] md:-mt-[195px] md:w-[290px] md:h-[390px] rounded-3xl overflow-hidden bg-neutral-900 transition-shadow duration-300 ${
                isActive 
                  ? 'ring-2 ring-white/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.28)]' 
                  : 'shadow-[0_10px_25px_rgba(0,0,0,0.10)]'
              }`}
              title={slide.title}
            >
              {/* High-Resolution Direct Image with Fallback */}
              <img 
                src={slide.image} 
                alt={slide.title} 
                className="object-cover w-full h-full absolute inset-0 pointer-events-none select-none"
                loading="eager"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = slide.fallback || '/assets/archive_storybook_1.webp';
                }}
              />

              {/* Gradient Vignette Behind Dock */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent pointer-events-none" />

              {/* Clean Frosted Dark Glass Bottom Dock (Expands smoothly on click) */}
              <motion.div 
                layout
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className={`absolute bottom-3 left-3 right-3 rounded-2xl bg-black/55 backdrop-blur-md border border-white/10 text-white text-center flex flex-col items-center shadow-lg transition-colors duration-300 ${
                  isCardExpanded && isActive 
                    ? 'p-4 sm:p-5 bg-black/80 backdrop-blur-xl border-white/20' 
                    : 'p-3.5 sm:p-4'
                }`}
              >
                {/* Close ✕ icon when expanded */}
                {isCardExpanded && isActive && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsCardExpanded(false);
                    }}
                    aria-label="Collapse"
                    className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}

                {/* Category Icon Pill */}
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-1.5 text-white flex-shrink-0 shadow-inner">
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2]" />
                </div>

                {/* Crisp White Title */}
                <h3 className="text-base md:text-lg font-semibold text-white tracking-tight leading-tight">
                  {slide.title}
                </h3>

                {/* Original Brief Quote: Truncated by default, untruncated full text on click */}
                {isActive && (
                  <motion.p
                    layout="position"
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`text-xs md:text-sm text-neutral-200 mt-1 font-normal leading-relaxed ${
                      isCardExpanded ? 'line-clamp-none' : 'line-clamp-2'
                    }`}
                  >
                    {slide.quote}
                  </motion.p>
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Clean Bottom Dot Navigation Bar */}
      <div className="relative z-20 mt-8 sm:mt-12 flex flex-col items-center">
        <div className="flex items-center gap-2.5">
          {coverflowSlides.map((slide, i) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(i)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                i === realIndex 
                  ? 'w-8 bg-zinc-800 shadow-sm' 
                  : 'w-2 bg-neutral-300 hover:bg-neutral-400'
              }`}
              aria-label={`Jump to ${slide.title}`}
              title={slide.title}
            />
          ))}
        </div>
      </div>

    </section>
  );
}
