import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const segments = [
  { text: "Design", highlight: true },
  { text: " is what I do. ", highlight: false },
  { text: "Creating", highlight: true },
  { text: " is how I think. ", highlight: false },
  { text: "Curiosity", highlight: true },
  { text: " is what keeps me going.", highlight: false },
];

const totalLength = segments.reduce((sum, seg) => sum + seg.text.length, 0);

export default function TypewriterBanner() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  const [charIndex, setCharIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  // Blinking cursor cycle
  useEffect(() => {
    if (!showCursor) return;
    const blinkInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 530);
    return () => clearInterval(blinkInterval);
  }, [showCursor]);

  // Smooth typewriter progression (~50ms per character)
  useEffect(() => {
    if (!isInView) return;

    setCharIndex(0);
    setIsCompleted(false);
    setShowCursor(true);

    const typeInterval = setInterval(() => {
      setCharIndex((prev) => {
        if (prev + 1 >= totalLength) {
          clearInterval(typeInterval);
          setIsCompleted(true);
          return totalLength;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(typeInterval);
  }, [isInView]);

  // Fade out cursor gracefully 3 seconds after typing completes
  useEffect(() => {
    if (!isCompleted) return;
    const fadeTimer = setTimeout(() => {
      setShowCursor(false);
    }, 3000);
    return () => clearTimeout(fadeTimer);
  }, [isCompleted]);

  // Replay animation on click
  const handleReplay = () => {
    setCharIndex(0);
    setIsCompleted(false);
    setShowCursor(true);

    const replayInterval = setInterval(() => {
      setCharIndex((prev) => {
        if (prev + 1 >= totalLength) {
          clearInterval(replayInterval);
          setIsCompleted(true);
          return totalLength;
        }
        return prev + 1;
      });
    }, 48);
  };

  // Render text segments respecting styling and partial slicing
  const renderTypedSegments = (currentCharCount) => {
    let accumulated = 0;

    return segments.map((seg, idx) => {
      const start = accumulated;
      const end = accumulated + seg.text.length;
      accumulated = end;

      if (currentCharCount <= start) {
        return null;
      }

      const charsToShow = Math.min(currentCharCount - start, seg.text.length);
      const visibleText = seg.text.slice(0, charsToShow);

      if (seg.highlight) {
        return (
          <span key={idx} className="text-[#E11D48] italic font-medium">
            {visibleText}
          </span>
        );
      }

      return (
        <span key={idx} className="text-neutral-900 font-semibold">
          {visibleText}
        </span>
      );
    });
  };

  return (
    <div className="flex justify-center pt-2 w-full">
      <motion.div
        ref={containerRef}
        onClick={handleReplay}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-4xl text-center py-2.5 sm:py-3 px-6 sm:px-8 rounded-xl sm:rounded-2xl border border-neutral-300 hover:border-neutral-400 bg-transparent transition-all flex items-center justify-center min-h-[46px] sm:min-h-[52px] cursor-pointer select-none"
      >
        <p className="text-xs sm:text-base md:text-lg lg:text-xl font-bold tracking-tight text-neutral-900 leading-snug sm:leading-relaxed">
          {renderTypedSegments(charIndex)}
          {showCursor && (
            <span
              className={`inline-block ml-0.5 text-[#E11D48] font-light select-none transition-opacity duration-200 ${
                cursorVisible ? 'opacity-100' : 'opacity-0'
              }`}
              aria-hidden="true"
            >
              |
            </span>
          )}
        </p>
      </motion.div>
    </div>
  );
}
