import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ZoomOut, RotateCcw, Sparkles, Maximize, Minimize2 } from 'lucide-react';
import ImageWithSkeleton from './ImageWithSkeleton';

export default function CraftGalleryModal({ item, onClose }) {
  const [scale, setScale] = useState(1);
  const [viewMode, setViewMode] = useState('fit-width'); // 'fit-width' or 'fit-screen'
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const lastTapRef = useRef(0);
  const pinchStartDistRef = useRef(0);
  const pinchStartScaleRef = useRef(1);

  // Reset state when opening a new item
  useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden';
      setScale(1);
      setViewMode('fit-width');
      setPosition({ x: 0, y: 0 });
      if (containerRef.current) {
        containerRef.current.scrollTop = 0;
        containerRef.current.scrollLeft = 0;
      }
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [item]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!item) return;
      if (e.key === 'Escape') onClose();
      if (e.key === '+' || e.key === '=') handleZoomIn();
      if (e.key === '-' || e.key === '_') handleZoomOut();
      if (e.key === '0') handleResetZoom();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, scale]);

  // Native non-passive touch pinch & wheel listeners for fluid zoom & pan
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const getDistance = (t1, t2) => {
      const dx = t1.clientX - t2.clientX;
      const dy = t1.clientY - t2.clientY;
      return Math.sqrt(dx * dx + dy * dy);
    };

    // Trackpad / Mousewheel pinch or Ctrl-zoom
    const handleNativeWheel = (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const delta = e.deltaY < 0 ? 0.25 : -0.25;
        setScale((prev) => {
          const next = Math.min(Math.max(Number((prev + delta).toFixed(2)), 1), 4);
          if (next === 1) setPosition({ x: 0, y: 0 });
          return next;
        });
      }
    };

    // 2-finger pinch start
    const handleTouchStart = (e) => {
      if (e.touches.length === 2) {
        pinchStartDistRef.current = getDistance(e.touches[0], e.touches[1]);
        pinchStartScaleRef.current = scale;
      }
    };

    // 2-finger pinch move
    const handleTouchMove = (e) => {
      if (e.touches.length === 2 && pinchStartDistRef.current > 0) {
        e.preventDefault();
        const dist = getDistance(e.touches[0], e.touches[1]);
        const factor = dist / pinchStartDistRef.current;
        const newScale = Math.min(Math.max(Number((pinchStartScaleRef.current * factor).toFixed(2)), 1), 4);
        setScale(newScale);
        if (newScale === 1) {
          setPosition({ x: 0, y: 0 });
        }
      }
    };

    const handleTouchEnd = (e) => {
      if (e.touches.length < 2) {
        pinchStartDistRef.current = 0;
      }
    };

    container.addEventListener('wheel', handleNativeWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('wheel', handleNativeWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [scale]);

  if (!item) return null;

  const handleZoomIn = () => {
    setScale((prev) => Math.min(Number((prev + 0.5).toFixed(2)), 4));
  };

  const handleZoomOut = () => {
    setScale((prev) => {
      const next = Math.max(Number((prev - 0.5).toFixed(2)), 1);
      if (next === 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  };

  const handleResetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const toggleViewMode = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setViewMode((prev) => (prev === 'fit-width' ? 'fit-screen' : 'fit-width'));
  };

  // Double click / Double tap to toggle zoom
  const handleDoubleInteraction = (e) => {
    if (scale > 1) {
      handleResetZoom();
    } else {
      setScale(2);
    }
  };

  // Mouse pan support when zoomed
  const handleMouseDown = (e) => {
    if (scale > 1) {
      setIsDragging(true);
      dragStartRef.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y
      };
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStartRef.current.x,
        y: e.clientY - dragStartRef.current.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Single touch pan & double-tap zoom
  const handleTouchStartSingle = (e) => {
    const now = Date.now();
    if (now - lastTapRef.current < 300) {
      handleDoubleInteraction(e);
      lastTapRef.current = 0;
      return;
    }
    lastTapRef.current = now;

    if (scale > 1 && e.touches.length === 1) {
      setIsDragging(true);
      dragStartRef.current = {
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y
      };
    }
  };

  const handleTouchMoveSingle = (e) => {
    if (isDragging && scale > 1 && e.touches.length === 1) {
      setPosition({
        x: e.touches[0].clientX - dragStartRef.current.x,
        y: e.touches[0].clientY - dragStartRef.current.y
      });
    }
  };

  const handleTouchEndSingle = () => {
    setIsDragging(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden bg-black/95 backdrop-blur-md flex flex-col justify-between items-center p-1 sm:p-4">
        
        {/* Backdrop click to close */}
        <div className="fixed inset-0 -z-10" onClick={onClose} />

        {/* Top Floating Header & Controls */}
        <div className="w-full max-w-6xl flex items-center justify-between z-20 pt-1 sm:pt-2 px-1 sm:px-2 text-white gap-2">
          
          {/* Badge & Mode Info */}
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-pink-500/20 border border-pink-500/30 text-pink-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider whitespace-nowrap">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>UNFILTERED</span>
            </div>

            {/* Mode Switcher Pill */}
            <button
              onClick={toggleViewMode}
              className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-[10px] sm:text-xs font-bold transition-colors cursor-pointer border border-neutral-700"
              title={viewMode === 'fit-width' ? 'Switch to Fit Screen overview' : 'Switch to Fit Width readable view'}
            >
              {viewMode === 'fit-width' ? (
                <>
                  <Minimize2 className="w-3 h-3 text-pink-400" />
                  <span>Fit Width</span>
                </>
              ) : (
                <>
                  <Maximize className="w-3 h-3 text-pink-400" />
                  <span>Fit Screen</span>
                </>
              )}
            </button>
          </div>

          {/* Floating Zoom Controls & Close Button */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <div className="flex items-center gap-0.5 sm:gap-1 bg-neutral-900/90 border border-neutral-700/80 rounded-full px-1.5 sm:px-2 py-0.5 sm:py-1 shadow-xl backdrop-blur-md">
              <button
                onClick={handleZoomOut}
                disabled={scale <= 1}
                className="p-1 sm:p-1.5 rounded-full hover:bg-neutral-800 text-neutral-300 disabled:opacity-35 disabled:hover:bg-transparent transition-colors cursor-pointer"
                title="Zoom Out (-)"
              >
                <ZoomOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
              
              <span className="text-[10px] sm:text-xs font-mono font-bold px-1 sm:px-2 text-neutral-200 min-w-[34px] sm:min-w-[44px] text-center">
                {Math.round(scale * 100)}%
              </span>

              <button
                onClick={handleZoomIn}
                disabled={scale >= 4}
                className="p-1 sm:p-1.5 rounded-full hover:bg-neutral-800 text-neutral-300 disabled:opacity-35 disabled:hover:bg-transparent transition-colors cursor-pointer"
                title="Zoom In (+)"
              >
                <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              {scale > 1 && (
                <button
                  onClick={handleResetZoom}
                  className="p-1 sm:p-1.5 rounded-full hover:bg-neutral-800 text-pink-400 transition-colors ml-0.5 sm:ml-1 border-l border-neutral-700 pl-1 sm:pl-2 cursor-pointer"
                  title="Reset Zoom (0)"
                >
                  <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </button>
              )}
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 transition-all hover:scale-105 active:scale-95 shadow-xl cursor-pointer"
              aria-label="Close modal"
              title="Close (Esc)"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

        </div>

        {/* Center Viewport: Natural Scroll & Zoom Canvas */}
        <div 
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStartSingle}
          onTouchMove={handleTouchMoveSingle}
          onTouchEnd={handleTouchEndSingle}
          className={`relative w-full max-w-6xl flex-1 my-1 sm:my-3 rounded-lg sm:rounded-2xl bg-neutral-950/85 border border-neutral-800/80 overflow-auto flex items-start justify-center p-1 sm:p-4 select-none hide-scrollbar overscroll-contain ${
            scale > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-zoom-in'
          }`}
        >
          <motion.div
            animate={{
              scale: scale,
              x: position.x,
              y: position.y
            }}
            transition={{
              type: isDragging ? false : 'spring',
              stiffness: 350,
              damping: 32
            }}
            onDoubleClick={handleDoubleInteraction}
            className={`relative flex items-center justify-center transition-transform origin-center ${
              viewMode === 'fit-width' && scale === 1
                ? 'w-full max-w-5xl my-auto'
                : 'max-w-full max-h-full my-auto'
            }`}
          >
            <ImageWithSkeleton
              src={item.image}
              alt={item.title}
              darkSkeleton={true}
              draggable={false}
              loading="eager"
              containerClassName={`rounded-md sm:rounded-lg shadow-2xl overflow-hidden ${
                viewMode === 'fit-width' && scale === 1 ? 'w-full' : ''
              }`}
              className={
                viewMode === 'fit-width' && scale === 1
                  ? 'w-full h-auto object-contain block'
                  : 'max-h-[78vh] sm:max-h-[82vh] w-auto max-w-full h-auto object-contain block'
              }
            />
          </motion.div>
        </div>

        {/* Bottom Footer Bar */}
        <div className="w-full max-w-6xl bg-neutral-900/95 border border-neutral-800 rounded-lg sm:rounded-2xl px-4 sm:px-6 py-2 sm:py-2.5 text-white flex items-center justify-between backdrop-blur-md">
          <span className="text-xs font-semibold text-neutral-400 tracking-wider uppercase">
            UNFILTERED
          </span>

          <div className="flex items-center justify-end">
            <button
              onClick={onClose}
              className="px-5 py-1 sm:py-1.5 rounded-full bg-white text-black text-xs font-bold hover:bg-neutral-200 transition-all active:scale-95 cursor-pointer text-center"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </AnimatePresence>
  );
}
