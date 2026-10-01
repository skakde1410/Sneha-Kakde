import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Home, FolderArchive, Mail, ArrowUpRight } from 'lucide-react';

export default function NotFoundPage({ onBackToHome, onOpenContact, onNavigateToArchive }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-[85vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-[#FCFCFD]">
      
      {/* Background Decorative Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-pink-100/50 via-rose-50/40 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-amber-50/50 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-xl w-full text-center relative z-10">
        
        {/* Mascot Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative inline-block mb-6 animate-float"
        >
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 mx-auto rounded-3xl p-3 bg-gradient-to-tr from-pink-50 via-white to-neutral-50 shadow-xl border border-pink-100/80 flex items-center justify-center">
            <picture>
              <source srcset="/assets/mascot.webp" type="image/webp" />
              <img 
                src="/assets/mascot.png" 
                alt="Sneha's Mascot" 
                className="w-full h-full object-contain drop-shadow-md select-none"
              />
            </picture>
          </div>

          <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-[#111111] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-lg border border-gray-700 whitespace-nowrap flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E6004C] animate-ping" />
            <span>Lost in Exploration</span>
          </div>
        </motion.div>

        {/* 404 Headline */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          <h1 className="font-display font-extrabold text-7xl sm:text-8xl md:text-9xl tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[#111111] via-[#2A2A2A] to-[#E6004C]/80 leading-none">
            404
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-display text-[#111111] tracking-tight mt-3 mb-2">
            Oops! You've reached an empty canvas.
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto leading-relaxed mb-8">
            The page or view you are looking for doesn't exist, was moved, or took a creative detour.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10"
        >
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 bg-[#111111] hover:bg-black text-white px-6 py-3.5 rounded-full text-sm font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 group cursor-pointer border border-neutral-800"
          >
            <Home className="w-4 h-4 text-pink-400 group-hover:-translate-y-0.5 transition-transform" />
            <span>Return to Portfolio</span>
          </button>

          {onNavigateToArchive && (
            <button
              onClick={onNavigateToArchive}
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-800 px-6 py-3.5 rounded-full text-sm font-bold shadow-sm hover:shadow border border-gray-200 hover:border-gray-300 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <FolderArchive className="w-4 h-4 text-amber-500" />
              <span>Explore 2025 Archive</span>
            </button>
          )}

          {onOpenContact && (
            <button
              onClick={onOpenContact}
              className="inline-flex items-center gap-2 bg-pink-50 hover:bg-pink-100 text-[#E6004C] px-5 py-3.5 rounded-full text-sm font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer border border-pink-200"
            >
              <Mail className="w-4 h-4" />
              <span>Say Hello</span>
            </button>
          )}
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-2 px-4 rounded-2xl bg-gray-100/80 border border-gray-200/80 text-xs sm:text-sm text-gray-600"
        >
          <span className="font-medium text-gray-400">Jump to:</span>
          <button 
            onClick={() => {
              onBackToHome();
              setTimeout(() => {
                const el = document.getElementById('work');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }} 
            className="font-semibold text-gray-700 hover:text-[#E6004C] transition-colors cursor-pointer"
          >
            Work
          </button>
          <span className="text-gray-300">•</span>
          <button 
            onClick={() => {
              onBackToHome();
              setTimeout(() => {
                const el = document.getElementById('about');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }} 
            className="font-semibold text-gray-700 hover:text-[#E6004C] transition-colors cursor-pointer"
          >
            About
          </button>
          <span className="text-gray-300">•</span>
          <button 
            onClick={() => {
              onBackToHome();
              setTimeout(() => {
                const el = document.getElementById('interests');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }} 
            className="font-semibold text-gray-700 hover:text-[#E6004C] transition-colors cursor-pointer"
          >
            Philosophy
          </button>
        </motion.div>

      </div>
    </div>
  );
}
