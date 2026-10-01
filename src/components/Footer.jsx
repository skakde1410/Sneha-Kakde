import React from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import { ArrowUpRight, Mail, Phone, Heart } from 'lucide-react';
import ImageWithSkeleton from './ImageWithSkeleton';

export default function Footer({ onOpenContact, onNavigate }) {
  const handleNavClick = (sectionId) => {
    if (sectionId === 'archive') {
      if (onNavigate) onNavigate('archive');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (onNavigate) onNavigate('home');
      setTimeout(() => {
        if (sectionId === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const elem = document.getElementById(sectionId);
          if (elem) {
            const pos = elem.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({ top: pos, behavior: 'smooth' });
          }
        }
      }, 50);
    }
  };

  return (
    <footer id="contact" className="bg-black text-white relative overflow-hidden scroll-mt-20">

      {/* Top Lion Art Banner (Matching Figma frame 63:207) */}
      <div className="w-full h-36 sm:h-64 md:h-80 relative overflow-hidden bg-brand-dark">
        <ImageWithSkeleton
          src="/assets/footer_banner.webp"
          alt="Sneha Kakde Lion Artwork Banner"
          darkSkeleton={true}
          containerClassName="w-full h-full"
          className="w-full h-full object-cover object-center filter brightness-95 hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
      </div>

      {/* Main Dark Footer Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-10 sm:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 sm:pb-16 border-b border-neutral-800 items-start">

          {/* Left Headline & Action CTA */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
              Let's design<br />
              something that<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-rose-400">
                makes an impact.
              </span>
            </h2>

            <div>
              <button
                onClick={onOpenContact}
                className="inline-flex items-center gap-2 px-7 py-3.5 sm:px-8 sm:py-4 rounded-full bg-white text-black text-sm sm:text-base font-bold hover:bg-pink-100 hover:text-brand-pink transition-all shadow-xl hover:scale-105 active:scale-95 group cursor-pointer"
              >
                <span>Let’s talk</span>
                <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>

            {/* Direct Email & Phone Display */}
            <div className="pt-2 flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 sm:gap-6 text-xs sm:text-sm text-neutral-400">
              <a
                href={`mailto:${personalInfo.contact.email}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-brand-pink flex-shrink-0" />
                <span className="break-all">{personalInfo.contact.email}</span>
              </a>
              <span className="hidden sm:inline-block text-neutral-700">•</span>
              <a
                href={`tel:${personalInfo.contact.phone}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-brand-pink flex-shrink-0" />
                <span>{personalInfo.contact.phone}</span>
              </a>
            </div>
          </div>

          {/* Right Navigation & Socials Columns */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-6 sm:gap-12 pt-4 lg:pt-0">

            {/* Site Navigation */}
            <div className="space-y-3 sm:space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                Navigation
              </span>
              <ul className="space-y-2.5 sm:space-y-3">
                <li>
                  <button
                    onClick={() => handleNavClick('home')}
                    className="text-xs sm:text-sm text-neutral-300 hover:text-brand-pink transition-colors cursor-pointer text-left py-0.5"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavClick('about')}
                    className="text-xs sm:text-sm text-neutral-300 hover:text-brand-pink transition-colors cursor-pointer text-left py-0.5"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavClick('work')}
                    className="text-xs sm:text-sm text-neutral-300 hover:text-brand-pink transition-colors cursor-pointer text-left py-0.5"
                  >
                    Work
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavClick('archive')}
                    className="text-xs sm:text-sm text-neutral-300 hover:text-brand-pink transition-colors cursor-pointer text-left py-0.5"
                  >
                    2025 Archive
                  </button>
                </li>
                <li>
                  <button
                    onClick={onOpenContact}
                    className="text-xs sm:text-sm text-neutral-300 hover:text-brand-pink transition-colors text-left cursor-pointer py-0.5"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            {/* Social Media Links (Matching User's Specified URLs) */}
            <div className="space-y-3 sm:space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                Socials
              </span>
              <ul className="space-y-2.5 sm:space-y-3">
                <li>
                  <a
                    href={personalInfo.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm text-neutral-300 hover:text-brand-pink transition-colors inline-flex items-center gap-1 group py-0.5"
                  >
                    <span>LinkedIn</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-brand-pink transition-colors" />
                  </a>
                </li>
                <li>
                  <a
                    href={personalInfo.links.behance}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm text-neutral-300 hover:text-brand-pink transition-colors inline-flex items-center gap-1 group py-0.5"
                  >
                    <span>Behance</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-brand-pink transition-colors" />
                  </a>
                </li>
                <li>
                  <a
                    href={personalInfo.links.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm text-neutral-300 hover:text-brand-pink transition-colors inline-flex items-center gap-1 group py-0.5"
                  >
                    <span>YouTube</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-brand-pink transition-colors" />
                  </a>
                </li>
                <li>
                  <a
                    href={personalInfo.links.notion}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm text-neutral-300 hover:text-brand-pink transition-colors inline-flex items-center gap-1 group py-0.5"
                  >
                    <span>Notion (Writings)</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-brand-pink transition-colors" />
                  </a>
                </li>
                <li>
                  <a
                    href={personalInfo.links.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm text-neutral-300 hover:text-brand-pink transition-colors inline-flex items-center gap-1 group py-0.5"
                  >
                    <span>Instagram</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-brand-pink transition-colors" />
                  </a>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom Copyright Strip (Matching Figma exact footer line) */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-3 text-center sm:text-left">
          <p className="flex items-center gap-1.5 flex-wrap justify-center sm:justify-start">
            <span>Portfolio@2026</span>
            <span>|</span>
            <span>Crafted with heart</span>
            <span className="text-white font-semibold">Sneha</span>
            <Heart className="w-3.5 h-3.5 text-brand-pink inline fill-current" />
          </p>
          <p className="text-neutral-500">
            Design & Visual Communication • IIT Guwahati
          </p>
        </div>

      </div>
    </footer>
  );
}
