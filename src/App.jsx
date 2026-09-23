import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Footer from './components/Footer';
import ArchivePage from './pages/ArchivePage';
import NotFoundPage from './pages/NotFoundPage';
import CaseStudyModal from './components/CaseStudyModal';
import ContactModal from './components/ContactModal';
import CraftGalleryModal from './components/CraftGalleryModal';
import { ArrowUp } from 'lucide-react';

const getViewFromHash = () => {
  const hash = window.location.hash;
  if (hash === '#archive') return 'archive';
  if (hash === '#404') return '404';
  if (!hash || hash === '#' || hash === '#home' || hash.startsWith('#about') || hash.startsWith('#work') || hash.startsWith('#interests') || hash.startsWith('#studio') || hash.startsWith('#unfiltered') || hash.startsWith('#contact') || hash.startsWith('#hero') || hash.startsWith('#craft') || hash.startsWith('#projects')) {
    return 'home';
  }
  return '404';
};

export default function App() {
  const [currentView, setCurrentView] = useState(() => getViewFromHash());
  const [selectedProject, setSelectedProject] = useState(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedCraft, setSelectedCraft] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Sync with browser URL hash
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentView(getViewFromHash());
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const navigateTo = (view) => {
    setCurrentView(view);
    if (view === 'archive') {
      window.location.hash = 'archive';
    } else if (view === '404') {
      window.location.hash = '404';
    } else {
      window.location.hash = '';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-[#1E1E1E] relative selection:bg-[#E6004C] selection:text-white">
      
      {/* Sticky Header Navigation */}
      <Navbar 
        currentView={currentView}
        onNavigate={navigateTo}
        onOpenContact={() => setIsContactOpen(true)} 
      />

      {/* Main Content Router */}
      <main>
        {currentView === 'home' && (
          <>
            <Hero 
              onOpenContact={() => setIsContactOpen(true)} 
            />
            
            <Projects />

            <About 
              onSelectCraft={(craft) => setSelectedCraft(craft)} 
            />
          </>
        )}
        {currentView === 'archive' && (
          <ArchivePage 
            onBackToHome={() => navigateTo('home')}
            onSelectImage={(item) => setSelectedCraft(item)}
          />
        )}
        {currentView === '404' && (
          <NotFoundPage 
            onBackToHome={() => navigateTo('home')}
            onOpenContact={() => setIsContactOpen(true)}
            onNavigateToArchive={() => navigateTo('archive')}
          />
        )}
      </main>

      {/* Footer & Contact Strip */}
      <Footer 
        onOpenContact={() => setIsContactOpen(true)} 
        onNavigate={navigateTo}
      />

      {/* Interactive Modals */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      <CraftGalleryModal
        item={selectedCraft}
        onClose={() => setSelectedCraft(null)}
      />

      {/* Floating Scroll-to-Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-brand-dark hover:bg-black text-white shadow-xl hover:scale-110 active:scale-95 transition-all border border-gray-700 cursor-pointer"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 text-pink-400" />
        </button>
      )}

    </div>
  );
}
