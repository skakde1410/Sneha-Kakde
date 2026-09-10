import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import { Menu, X, ArrowUpRight, Sparkles, Mail } from 'lucide-react';

export default function Navbar({ currentView, onNavigate, onOpenContact }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Work', href: '#work' },
    { name: 'Philosophy', href: '#interests' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (currentView !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        const targetId = href.replace('#', '');
        const element = document.getElementById(targetId);
        if (element) {
          const navOffset = 80;
          const pos = element.getBoundingClientRect().top + window.pageYOffset - navOffset;
          window.scrollTo({ top: pos, behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    if (href.startsWith('#')) {
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        const navOffset = 80;
        const pos = element.getBoundingClientRect().top + window.pageYOffset - navOffset;
        window.scrollTo({ top: pos, behavior: 'smooth' });
      }
    }
  };

  const isDarkNav = currentView === 'archive';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? (isDarkNav ? 'glass-dark py-2.5 sm:py-3 shadow-md' : 'glass-nav py-2.5 sm:py-3 shadow-sm') 
        : 'bg-transparent py-3.5 sm:py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Logo */}
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            if (currentView !== 'home') {
              onNavigate('home');
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="group flex items-center gap-1.5 sm:gap-2 focus:outline-none cursor-pointer"
        >
          <span className={`font-extrabold text-2xl sm:text-3xl tracking-tight transition-colors ${
            isDarkNav ? 'text-white group-hover:text-brand-pink' : 'text-brand-dark group-hover:text-brand-pink'
          }`}>
            {personalInfo.initials}
          </span>
          <span className="w-2 h-2 rounded-full bg-brand-pink group-hover:scale-125 transition-transform" />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`text-sm font-medium transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-brand-pink hover:after:w-full after:transition-all after:duration-300 cursor-pointer ${
                isDarkNav ? 'text-white hover:text-brand-pink' : 'text-gray-700 hover:text-brand-pink'
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Buttons (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          {currentView === 'home' ? (
            <button
              onClick={() => onNavigate('archive')}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-brand-dark hover:bg-black rounded-full transition-all hover:shadow-lg hover:scale-105 active:scale-95 group cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-400 group-hover:rotate-12 transition-transform" />
              <span>View 2025 Archive</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-gray-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          ) : (
            <button
              onClick={() => onNavigate('home')}
              className="inline-flex items-center gap-1.5 bg-black hover:bg-neutral-900 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold shadow-xl transition-all hover:scale-105 active:scale-95 group cursor-pointer border border-neutral-800 whitespace-nowrap"
            >
              <span>View New Portfolio</span>
              <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          )}
        </div>

        {/* Mobile Action Pill + Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          {currentView === 'home' ? (
            <button
              onClick={() => onNavigate('archive')}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white bg-brand-dark rounded-full cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-yellow-400" />
              <span>2025 Archive</span>
            </button>
          ) : (
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white bg-black rounded-full cursor-pointer border border-neutral-800"
            >
              <span>New Portfolio</span>
              <ArrowUpRight className="w-3 h-3 text-neutral-300" />
            </button>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-xl focus:outline-none transition-colors ${
              isDarkNav 
                ? 'text-white hover:text-brand-pink hover:bg-white/10' 
                : 'text-gray-700 hover:text-brand-pink hover:bg-gray-100'
            }`}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className={`md:hidden ${isDarkNav ? 'glass-dark border-neutral-800' : 'glass-nav border-gray-200/80'} border-b px-5 sm:px-6 py-5 shadow-lg overflow-hidden`}
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`text-base font-semibold ${isDarkNav ? 'text-white hover:text-brand-pink hover:bg-white/5' : 'text-gray-800 hover:text-brand-pink hover:bg-gray-50'} transition-colors py-2.5 px-3 rounded-lg flex items-center justify-between cursor-pointer`}
                >
                  <span>{link.name}</span>
                  <span className={`${isDarkNav ? 'text-neutral-400' : 'text-gray-400'} text-xs`}>→</span>
                </a>
              ))}
              
              <div className="pt-3 mt-1 border-t border-gray-200/70 flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenContact();
                  }}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-full text-sm font-bold text-white bg-brand-pink hover:bg-brand-pinkHover shadow-md active:scale-98 transition-all cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  <span>Let’s Talk / Contact</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
