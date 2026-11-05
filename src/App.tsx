/**
 * M7MD.dsgn — Main Application Controller
 *
 * Implements fluid overlapping GSAP timeline section transitions (~800ms),
 * synchronized top & side navigations, Arabic RTL / English LTR switcher,
 * and dark neon-lime visual identity.
 */

import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { Navbar, SectionId } from './components/Navbar';
import { SideNavDots } from './components/SideNavDots';
import { HomeHero } from './components/HomeHero';
import { WorkSection } from './components/WorkSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ContactSection } from './components/ContactSection';
import { ContactDock } from './components/ContactDock';
import { Language } from './locales/translations';

gsap.ticker.lagSmoothing(0);
if (typeof window !== 'undefined') {
  (window as unknown as Record<string, unknown>).__gsap = gsap;
}

const SECTION_ORDER: SectionId[] = ['home', 'work', 'about', 'services', 'contact'];

interface TransitionState {
  outgoing: SectionId;
  incoming: SectionId;
  direction: 'forward' | 'backward';
}

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [transitionState, setTransitionState] = useState<TransitionState | null>(null);
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [preselectedService, setPreselectedService] = useState<'static' | 'motion-ai' | null>(null);

  const transitionWrapperRef = useRef<HTMLDivElement>(null);
  const sectionLayerRefs = useRef< Partial<Record<SectionId, HTMLDivElement | null>> >({});
  const activeTimelineRef = useRef<gsap.core.Timeline | null>(null);

  // Sync html dir and lang attributes synchronously before child layout measurement
  useLayoutEffect(() => {
    document.documentElement.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', currentLang);
  }, [currentLang]);

  const handleNavigate = (targetSection: SectionId) => {
    // Prevent rapid clicks from corrupting state while a transition is in progress
    if (transitionState !== null || activeTimelineRef.current?.isActive()) {
      return;
    }
    if (targetSection === activeSection) return;

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setActiveSection(targetSection);
      setTransitionState(null);
      return;
    }

    const currentIndex = SECTION_ORDER.indexOf(activeSection);
    const targetIndex = SECTION_ORDER.indexOf(targetSection);
    const isForward = targetIndex >= currentIndex;

    setTransitionState({
      outgoing: activeSection,
      incoming: targetSection,
      direction: isForward ? 'forward' : 'backward',
    });
  };

  // Synchronously initialize and run overlapping GSAP transition timeline (~880ms) before browser paint
  useLayoutEffect(() => {
    if (!transitionState) return;

    const outgoingEl = sectionLayerRefs.current[transitionState.outgoing];
    const incomingEl = sectionLayerRefs.current[transitionState.incoming];
    if (!outgoingEl || !incomingEl) return;

    const isForward = transitionState.direction === 'forward';

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(incomingEl, {
            clearProps: 'transform,clipPath,opacity',
          });
          activeTimelineRef.current = null;
          setActiveSection(transitionState.incoming);
          setTransitionState(null);
        },
      });

      activeTimelineRef.current = tl;

      // 1. Synchronous initial states before paint (prevents any 1-frame flash)
      gsap.set(outgoingEl, {
        opacity: 1,
        y: 0,
        scale: 1,
        clipPath: 'inset(0% 0% 0% 0% round 0px)',
      });

      gsap.set(incomingEl, {
        opacity: 0,
        y: isForward ? 52 : -52,
        scale: 1.04,
        clipPath: isForward
          ? 'inset(28% 2% 0% 2% round 28px)'
          : 'inset(0% 2% 28% 2% round 28px)',
      });

      // 2. Outgoing section smoothly recedes with directional drift, scale & clip-path (0.00s -> 0.62s)
      tl.to(
        outgoingEl,
        {
          opacity: 0,
          y: isForward ? -44 : 44,
          scale: 0.945,
          clipPath: isForward
            ? 'inset(10% 2.5% 22% 2.5% round 28px)'
            : 'inset(22% 2.5% 10% 2.5% round 28px)',
          duration: 0.62,
          ease: 'power3.inOut',
        },
        0
      );

      // 3. Incoming section overlaps while outgoing is still moving (0.12s -> 0.88s)
      tl.to(
        incomingEl,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          clipPath: 'inset(0% 0% 0% 0% round 0px)',
          duration: 0.76,
          ease: 'expo.out',
        },
        0.12
      );

      // 4. Staggered entrance for internal headings, descriptions, cards, and buttons (0.22s -> 0.86s)
      const staggers = incomingEl.querySelectorAll(
        '.transition-stagger-1, .transition-stagger-2, .transition-stagger-3, .transition-stagger-4'
      );
      if (staggers.length > 0) {
        tl.fromTo(
          staggers,
          {
            opacity: 0,
            y: isForward ? 24 : -24,
            scale: 0.985,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.055,
            duration: 0.54,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
          },
          0.22
        );
      }
    }, transitionWrapperRef);

    return () => {
      activeTimelineRef.current = null;
      ctx.revert();
    };
  }, [transitionState]);

  const handleToggleLang = () => {
    setCurrentLang((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const handleSelectServiceAndContact = (service: 'static' | 'motion-ai') => {
    setPreselectedService(service);
    handleNavigate('contact');
  };

  // Keyboard navigation support: Arrow keys or Page Up/Down
  const currentNavSection = transitionState ? transitionState.incoming : activeSection;
  const currentIndex = SECTION_ORDER.indexOf(currentNavSection);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        ['INPUT', 'TEXTAREA', 'SELECT'].includes(
          (document.activeElement?.tagName || '').toUpperCase()
        )
      ) {
        return;
      }

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        if (currentIndex < SECTION_ORDER.length - 1) {
          handleNavigate(SECTION_ORDER[currentIndex + 1]);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        if (currentIndex > 0) {
          handleNavigate(SECTION_ORDER[currentIndex - 1]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, currentNavSection, transitionState]);

  const renderSectionComponent = (section: SectionId) => {
    switch (section) {
      case 'home':
        return <HomeHero onNavigate={handleNavigate} currentLang={currentLang} />;
      case 'work':
        return <WorkSection currentLang={currentLang} />;
      case 'about':
        return <AboutSection currentLang={currentLang} onNavigate={handleNavigate} />;
      case 'services':
        return (
          <ServicesSection
            currentLang={currentLang}
            onSelectServiceAndContact={handleSelectServiceAndContact}
          />
        );
      case 'contact':
        return (
          <ContactSection
            currentLang={currentLang}
            preselectedService={preselectedService}
          />
        );
      default:
        return null;
    }
  };

  // Render active section(s) in a single persistent parent container keyed by sectionId
  // so React never unmounts/remounts a section when it transitions from active -> outgoing or incoming -> active.
  const renderedSections: SectionId[] = transitionState
    ? [transitionState.outgoing, transitionState.incoming]
    : [activeSection];

  return (
    <div
      dir={currentLang === 'ar' ? 'rtl' : 'ltr'}
      className="relative w-screen h-screen overflow-hidden bg-[#09090b] text-[#f4f4f5] select-none flex flex-col font-sans"
    >
      {/* Top Navigation Bar synchronized with active or target section */}
      <Navbar
        activeSection={currentNavSection}
        onNavigate={handleNavigate}
        currentLang={currentLang}
        onToggleLang={handleToggleLang}
      />

      {/* Synchronized Vertical Side Navigation Rail */}
      <SideNavDots
        activeSection={currentNavSection}
        onNavigate={handleNavigate}
        currentLang={currentLang}
      />

      {/* Main View Area with GSAP Overlapping Timeline Transitions */}
      <main
        ref={transitionWrapperRef}
        className="relative flex-1 w-full pt-16 sm:pt-18 overflow-hidden"
        role="main"
      >
        <div className="relative w-full h-full overflow-hidden">
          {renderedSections.map((sectionId) => {
            const isOutgoing = transitionState?.outgoing === sectionId;
            const isIncoming = transitionState?.incoming === sectionId;
            const layerRole = isOutgoing
              ? 'outgoing'
              : isIncoming
                ? 'incoming'
                : 'active';

            return (
              <div
                key={sectionId}
                ref={(el) => {
                  sectionLayerRefs.current[sectionId] = el;
                }}
                data-transition-layer={layerRole}
                data-section-id={sectionId}
                className={`absolute inset-0 w-full h-full overflow-hidden will-change-transform ${
                  isOutgoing
                    ? 'pointer-events-none z-10'
                    : isIncoming
                      ? 'z-20'
                      : 'z-10'
                }`}
              >
                {renderSectionComponent(sectionId)}
              </div>
            );
          })}
        </div>
      </main>

      {/* Fixed Compact Contact Dock (WhatsApp & Email shortcuts) */}
      <ContactDock currentLang={currentLang} />
    </div>
  );
}
