import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { SectionId } from './Navbar';
import { Language, translations } from '../locales/translations';
import { Home, Layers, UserRound, LayoutGrid, Send } from 'lucide-react';

interface SideNavDotsProps {
  activeSection: SectionId;
  onNavigate: (section: SectionId) => void;
  currentLang: Language;
}

export const SideNavDots: React.FC<SideNavDotsProps> = ({
  activeSection,
  onNavigate,
  currentLang,
}) => {
  const [hoveredSection, setHoveredSection] = useState<SectionId | null>(null);
  const t = translations[currentLang];
  const isRtl = currentLang === 'ar';

  const prevActiveRef = useRef<SectionId>(activeSection);

  const btnRefs = useRef<Record<SectionId, HTMLButtonElement | null>>({
    home: null,
    work: null,
    about: null,
    services: null,
    contact: null,
  });

  const navItems: {
    id: SectionId;
    label: string;
    index: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: 'home',
      label: t.nav.home,
      index: '01',
      icon: <Home className="w-4 h-4 stroke-[1.8]" />,
    },
    {
      id: 'work',
      label: t.nav.work,
      index: '02',
      icon: <Layers className="w-4 h-4 stroke-[1.8]" />,
    },
    {
      id: 'about',
      label: t.nav.about,
      index: '03',
      icon: <UserRound className="w-4 h-4 stroke-[1.8]" />,
    },
    {
      id: 'services',
      label: t.nav.services,
      index: '04',
      icon: <LayoutGrid className="w-4 h-4 stroke-[1.8]" />,
    },
    {
      id: 'contact',
      label: t.nav.contact,
      index: '05',
      icon: <Send className="w-4 h-4 stroke-[1.8]" />,
    },
  ];

  // Smoothly animate the newly activated icon button when activeSection changes
  useEffect(() => {
    if (prevActiveRef.current === activeSection) return;
    const prevBtn = btnRefs.current[prevActiveRef.current];
    const nextBtn = btnRefs.current[activeSection];
    prevActiveRef.current = activeSection;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    if (prevBtn) {
      gsap.to(prevBtn, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
    if (nextBtn) {
      gsap.fromTo(
        nextBtn,
        { scale: 0.78 },
        {
          scale: 1.05,
          duration: 0.45,
          ease: 'back.out(2.2)',
          overwrite: 'auto',
        }
      );
    }
  }, [activeSection]);

  const handleMouseEnter = (id: SectionId) => {
    setHoveredSection(id);
    const btn = btnRefs.current[id];
    if (btn && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.to(btn, {
        scale: 1.14,
        duration: 0.22,
        ease: 'back.out(2)',
        overwrite: 'auto',
      });
    }
  };

  const handleMouseLeave = (id: SectionId) => {
    setHoveredSection(null);
    const btn = btnRefs.current[id];
    if (btn && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.to(btn, {
        scale: activeSection === id ? 1.05 : 1,
        duration: 0.25,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
  };

  const handleMouseDown = (id: SectionId) => {
    const btn = btnRefs.current[id];
    if (btn && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.to(btn, {
        scale: 0.9,
        duration: 0.1,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
  };

  return (
    <nav
      className={`fixed top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-2 py-4 px-2 rounded-full bg-[#101017]/90 backdrop-blur-xl border border-zinc-800/90 shadow-[0_12px_40px_rgba(0,0,0,0.85)] transition-all ${
        isRtl ? 'left-5' : 'right-5'
      }`}
      aria-label="Vertical Section Navigation Rail"
    >
      {navItems.map((item, index) => {
        const isActive = activeSection === item.id;
        const isHovered = hoveredSection === item.id;

        return (
          <React.Fragment key={item.id}>
            <div
              className="relative z-10 flex items-center justify-center group"
              onMouseEnter={() => handleMouseEnter(item.id)}
              onMouseLeave={() => handleMouseLeave(item.id)}
            >
              {/* Tooltip Label (hover / keyboard focus) */}
              <div
                className={`absolute top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-200 z-50 whitespace-nowrap ${
                  isRtl ? 'left-full ml-3' : 'right-full mr-3'
                } ${
                  isHovered
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-2'
                }`}
              >
                <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-[#14141e]/95 backdrop-blur-md border border-zinc-700/80 shadow-2xl">
                  <span className="font-mono text-[10px] text-[#ccff00] font-bold">
                    {item.index}
                  </span>
                  <span className="text-xs font-semibold text-white tracking-wide">
                    {item.label}
                  </span>
                </div>
              </div>

              {/* Icon Button */}
              <button
                ref={(el) => {
                  btnRefs.current[item.id] = el;
                }}
                onClick={() => onNavigate(item.id)}
                onMouseDown={() => handleMouseDown(item.id)}
                onFocus={() => setHoveredSection(item.id)}
                onBlur={() => setHoveredSection(null)}
                className={`relative flex items-center justify-center w-8.5 h-8.5 rounded-full transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00] will-change-transform ${
                  isActive
                    ? 'bg-[#ccff00] text-[#09090b] shadow-[0_0_18px_rgba(204,255,0,0.45)] font-bold'
                    : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/60'
                }`}
                aria-label={`Navigate to ${item.label}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.icon}
              </button>
            </div>

            {/* Separator dot between icons (except after the last item) */}
            {index < navItems.length - 1 && (
              <span
                className="relative z-10 w-1 h-1 rounded-full bg-zinc-700/60 pointer-events-none my-0.5"
                aria-hidden="true"
              />
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
