import React from 'react';

export const DISCIPLINES = [
  { label: 'UI/UX', color: '#0066FF' },
  { label: 'PRODUCT DESIGN', color: '#8A2BE2' },
  { label: 'VISUAL DESIGN', color: '#E6004C' },
  { label: 'BRANDING', color: '#F43F5E' },
  { label: 'TYPOGRAPHY & LAYOUT', color: '#6366F1' },
  { label: 'ILLUSTRATION', color: '#F59E0B' },
  { label: 'INFOGRAPHICS', color: '#06B6D4' },
  { label: 'DATA VISUALIZATION', color: '#3B82F6' },
  { label: 'PACKAGING', color: '#10B981' },
  { label: 'EDITORIAL DESIGN', color: '#8B5CF6' },
  { label: 'MASCOT & CHARACTER DESIGN', color: '#EC4899' },
  { label: '3D CHARACTER DESIGN', color: '#00B4D8' },
  { label: 'CONCEPT DEVELOPMENT', color: '#F97316' },
  { label: 'ANIMATION', color: '#14B8A6' },
  { label: 'PRINT & DIGITAL DESIGN', color: '#84CC16' },
  { label: 'ICONOGRAPHY', color: '#A855F7' },
  { label: 'ART DIRECTION', color: '#D946EF' },
  { label: 'COMPOSITION', color: '#64748B' },
  { label: 'COLOR THEORY', color: '#EF4444' },
  { label: 'VISUAL STORYTELLING', color: '#E11D48' },
  { label: 'INFORMATION DESIGN', color: '#0284C7' },
  { label: 'COMMUNICATION DESIGN', color: '#7C3AED' },
  { label: 'PUBLICATION DESIGN', color: '#D97706' },
  { label: 'SKETCHING', color: '#4B5563' },
  { label: 'DRAWING', color: '#0D9488' },
  { label: '2D DESIGN', color: '#2563EB' },
  { label: 'CALLIGRAPHY', color: '#059669' },
  { label: 'SCULPTING', color: '#E65100' },
  { label: 'ART', color: '#DB2777' }
];

export const TOOLS = [
  { label: 'PHOTOSHOP', color: '#31A8FF' },
  { label: 'ILLUSTRATOR', color: '#FF9A00' },
  { label: 'INDESIGN', color: '#FF3366' },
  { label: 'AFTER EFFECTS', color: '#9999FF' },
  { label: 'CORELDRAW', color: '#00A651' },
  { label: 'CANVA', color: '#00C4CC' },
  { label: 'FIGMA', color: '#F24E1E' },
  { label: 'FIGJAM', color: '#A259FF' },
  { label: 'MIRO', color: '#FFD02F' },
  { label: 'NOTION', color: '#000000' },
  { label: 'BLENDER', color: '#E87D0D' },
  { label: 'ZBRUSH', color: '#4D7C0F' },
  { label: 'SUBSTANCE PAINTER', color: '#E6242B' },
  { label: 'MARMOSET TOOLBAG', color: '#2C7BE5' }
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
