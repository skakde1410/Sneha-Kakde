import React from 'react';

export const DISCIPLINES = [
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

export default function DisciplineTrail() {
  return (
    <section 
      aria-label="Disciplines Trail" 
      className="w-full bg-[#FAFAFC] border-y border-gray-200/80 py-4 sm:py-5 overflow-hidden relative marquee-container select-none"
    >
      {/* Edge Soft Fades */}
      <div className="absolute inset-y-0 left-0 w-12 sm:w-28 bg-gradient-to-r from-[#FAFAFC] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-12 sm:w-28 bg-gradient-to-l from-[#FAFAFC] to-transparent z-10 pointer-events-none" />

      {/* Infinite Scrolling Track */}
      <div className="animate-marquee-disciplines">
        {/* Track 1 */}
        <div className="flex items-center gap-3 sm:gap-4 pr-3 sm:pr-4">
          {DISCIPLINES.map((d) => (
            <span
              key={d.label}
              className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white border border-gray-200/90 shadow-xs text-xs sm:text-sm font-archivo font-extrabold text-gray-800 tracking-wider uppercase whitespace-nowrap hover:scale-105 transition-transform"
            >
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
              {d.label}
            </span>
          ))}
        </div>
        {/* Track 2 (Duplicate for seamless continuous loop) */}
        <div className="flex items-center gap-3 sm:gap-4 pr-3 sm:pr-4" aria-hidden="true">
          {DISCIPLINES.map((d, i) => (
            <span
              key={`${d.label}-dup-${i}`}
              className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white border border-gray-200/90 shadow-xs text-xs sm:text-sm font-archivo font-extrabold text-gray-800 tracking-wider uppercase whitespace-nowrap hover:scale-105 transition-transform"
            >
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
              {d.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
