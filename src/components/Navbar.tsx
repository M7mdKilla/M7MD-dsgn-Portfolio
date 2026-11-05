import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { BrandLogo } from './BrandLogo';
import { Language, translations } from '../locales/translations';
import { Menu, X, Globe, ArrowUpRight } from 'lucide-react';

export type SectionId = 'home' | 'work' | 'about' | 'services' | 'contact';

interface NavbarProps {
  activeSection: SectionId;
  onNavigate: (section: SectionId) => void;
  currentLang: Language;
  onToggleLang: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  currentLang,
  onToggleLang,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[currentLang];

  const navContainerRef = useRef<HTMLElement>(null);
  const pillIndicatorRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<Record<SectionId, HTMLButtonElement | null>>({
    home: null,
    work: null,
    about: null,
    services: null,
    contact: null,
  });

  const navLinks: { id: SectionId; label: string }[] = [
    { id: 'home', label: t.nav.home },
    { id: 'work', label: t.nav.work },
    { id: 'about', label: t.nav.about },
    { id: 'services', label: t.nav.services },
    { id: 'contact', label: t.nav.contact },
  ];

  // Animate sliding active pill indicator in desktop navbar via GSAP
  useEffect(() => {
    const activeBtn = btnRefs.current[activeSection];
    const pill = pillIndicatorRef.current;
    const navEl = navContainerRef.current;
    if (!activeBtn || !pill || !navEl) return;

    const updatePill = (animate: boolean) => {
      const navRect = navEl.getBoundingClientRect();
      const btnRect = activeBtn.getBoundingClientRect();
      const x = btnRect.left - navRect.left;
      const width = btnRect.width;

      if (animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.to(pill, {
          x,
          width,
          duration: 0.38,
          ease: 'power3.out',
          overwrite: 'auto',
        });
      } else {
        gsap.set(pill, { x, width });
      }
    };

    updatePill(true);
    const rafId = requestAnimationFrame(() => updatePill(false));
    const onResize = () => updatePill(false);
    window.addEventListener('resize', onResize);

    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(() => updatePill(false));
      observer.observe(navEl);
      observer.observe(activeBtn);
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      observer?.disconnect();
    };
  }, [activeSection, currentLang]);

  const handleLinkClick = (id: SectionId) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#09090b]/85 backdrop-blur-md border-b border-zinc-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark with 7-Arrow */}
        <button
          onClick={() => handleLinkClick('home')}
          className="flex items-center gap-2 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00] rounded-lg transition-transform hover:opacity-90 active:scale-95 cursor-pointer shrink-0"
          aria-label="M7MD.dsgn Home"
        >
          <span className="sm:hidden flex items-center">
            <BrandLogo size="sm" />
          </span>
          <span className="hidden sm:flex items-center">
            <BrandLogo size="md" />
          </span>
        </button>

        {/* Zone 2: 5 Single-line Navigation Links (Desktop) with GSAP Sliding Pill */}
        <nav
          ref={navContainerRef}
          className="relative hidden md:flex items-center gap-1.5 p-1 bg-[#121218]/80 border border-zinc-800/80 rounded-full"
          aria-label="Main Navigation"
        >
          {/* GSAP Animated Active Pill Background */}
          <div
            ref={pillIndicatorRef}
            className="absolute top-1 bottom-1 left-0 rounded-full bg-[#ccff00] shadow-[0_0_16px_rgba(204,255,0,0.35)] pointer-events-none z-0"
          />

          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                ref={(el) => {
                  btnRefs.current[link.id] = el;
                }}
                onClick={() => handleLinkClick(link.id)}
                className={`relative z-10 px-4 py-1.5 text-xs rounded-full transition-colors duration-200 whitespace-nowrap cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00] active:scale-95 ${
                  isActive
                    ? 'text-[#09090b] font-bold'
                    : 'text-zinc-400 font-medium hover:text-white'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: AR/EN Switcher & Contact Action CTA */}
        <div className="flex items-center gap-3">
          {/* Visible AR / EN Switcher */}
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#14141c] hover:bg-[#1f1f2a] border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white active:scale-95 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00]"
            aria-label={`Switch language to ${currentLang === 'en' ? 'Arabic' : 'English'}`}
            title={`Switch to ${currentLang === 'en' ? 'Arabic (RTL)' : 'English (LTR)'}`}
          >
            <Globe className="w-3.5 h-3.5 text-[#ccff00]" />
            <span
              className={`text-[11px] ${
                currentLang === 'en' ? 'font-ar-body' : 'font-mono tracking-wide'
              }`}
            >
              {t.nav.switchLang}
            </span>
          </button>

          {/* Primary CTA */}
          <button
            onClick={() => handleLinkClick('contact')}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 hover:border-[#ccff00] hover:shadow-[0_0_15px_rgba(204,255,0,0.2)] active:scale-95 transition-all cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00]"
          >
            <span>{t.nav.talkCTA}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#ccff00] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-[#14141c] border border-zinc-800 text-zinc-300 hover:text-white active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00]"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#ccff00]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-800 bg-[#0c0c11] px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
                  isActive
                    ? 'bg-[#ccff00] text-[#09090b] font-bold'
                    : 'text-zinc-300 hover:bg-zinc-800/60'
                }`}
              >
                <span>{link.label}</span>
                {isActive && <span className="w-2 h-2 rounded-full bg-[#09090b]" />}
              </button>
            );
          })}

          <div className="pt-2 border-t border-zinc-800/80">
            <button
              onClick={() => handleLinkClick('contact')}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-[#181822] border border-[#ccff00]/40 text-[#ccff00] font-semibold text-sm"
            >
              <span>{t.nav.talkCTA}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
