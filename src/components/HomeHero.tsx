import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SectionId } from './Navbar';
import { Language, translations } from '../locales/translations';
import { siteConfig } from '../config/siteConfig';
import { OrbitBadges } from './OrbitBadges';
import { FolderOpen, MessageSquare, ArrowUpRight } from 'lucide-react';

gsap.ticker.lagSmoothing(0);

interface HomeHeroProps {
  onNavigate: (section: SectionId) => void;
  currentLang: Language;
}

const PARTICLES = [
  { id: 1, top: '18%', left: '16%', size: 'w-2 h-2', dx: 16, dy: -24, dur: 2.8, mobile: true },
  { id: 2, top: '26%', right: '14%', size: 'w-1.5 h-1.5', dx: -18, dy: -20, dur: 3.3, mobile: true },
  { id: 3, bottom: '28%', left: '20%', size: 'w-1.5 h-1.5', dx: 14, dy: 22, dur: 2.6, mobile: true },
  { id: 4, bottom: '24%', right: '18%', size: 'w-2 h-2', dx: -15, dy: -22, dur: 3.1, mobile: true },
  { id: 5, top: '12%', left: '48%', size: 'w-1.5 h-1.5', dx: 12, dy: 18, dur: 3.6, mobile: false },
  { id: 6, top: '44%', left: '8%', size: 'w-1 h-1', dx: -14, dy: -16, dur: 2.4, mobile: false },
  { id: 7, top: '48%', right: '8%', size: 'w-1.5 h-1.5', dx: 18, dy: 16, dur: 2.9, mobile: false },
  { id: 8, bottom: '36%', right: '32%', size: 'w-1 h-1', dx: -12, dy: -20, dur: 3.4, mobile: false },
];

export const HomeHero: React.FC<HomeHeroProps> = ({ onNavigate, currentLang }) => {
  const t = translations[currentLang];
  const isRtl = currentLang === 'ar';

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const heroRootRef = useRef<HTMLDivElement>(null);
  const ribbonTrail1Ref = useRef<SVGPathElement>(null);
  const ribbonGlow1Ref = useRef<SVGPathElement>(null);
  const ribbonPulse1Ref = useRef<SVGPathElement>(null);
  const ribbonTrail2Ref = useRef<SVGPathElement>(null);
  const ribbonGlow2Ref = useRef<SVGPathElement>(null);
  const ribbonPulse2Ref = useRef<SVGPathElement>(null);
  const orbitRing1Ref = useRef<SVGEllipseElement>(null);
  const orbitRing2Ref = useRef<SVGEllipseElement>(null);
  const topRibbonPulseRef = useRef<SVGPathElement>(null);
  const waveCrestRef = useRef<SVGPathElement>(null);
  const waveCrestGlowRef = useRef<SVGPathElement>(null);
  const waveCrestPulseRef = useRef<SVGPathElement>(null);
  const glowAuraRef = useRef<HTMLDivElement>(null);
  const portraitEntranceRef = useRef<HTMLDivElement>(null);
  const portraitFloatRef = useRef<HTMLDivElement>(null);
  const brushSwoopRef = useRef<SVGPathElement>(null);
  const primaryBtnRef = useRef<HTMLButtonElement>(null);
  const secondaryBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Master GSAP Context: Initial Hero Entrance + Continuous Neon Environment & Portrait Float
  useEffect(() => {
    if (prefersReducedMotion || !heroRootRef.current) return;

    const ctx = gsap.context(() => {
      // =========================================================================
      // 1. COORDINATED INITIAL HERO ENTRANCE TIMELINE (Phase 5)
      // =========================================================================
      const entranceTl = gsap.timeline({
        defaults: { ease: 'power3.out' },
      });

      // Step 1: Background glow fades in
      entranceTl.fromTo(
        '.hero-ambient-glow',
        { opacity: 0, scale: 0.82 },
        { opacity: 1, scale: 1, duration: 0.65, stagger: 0.1 },
        0
      );

      // Step 2: Availability badge & tagline enter softly
      entranceTl.fromTo(
        '.hero-badge-item',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
        0.08
      );

      // Step 3: Main heading reveals line by line with stagger + brush swoop
      entranceTl.fromTo(
        '.hero-heading-line',
        { opacity: 0, y: 26 },
        { opacity: 1, y: 0, duration: 0.58, stagger: 0.1 },
        0.16
      );

      if (brushSwoopRef.current) {
        entranceTl.fromTo(
          brushSwoopRef.current,
          { scaleX: 0, opacity: 0, transformOrigin: isRtl ? 'right center' : 'left center' },
          { scaleX: 1, opacity: 1, duration: 0.5, ease: 'power2.out' },
          0.38
        );
      }

      // Step 4: Description and feature strip fade in with slight upward movement
      entranceTl.fromTo(
        '.hero-desc-item',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.52, stagger: 0.08 },
        0.32
      );

      // Step 5: CTA buttons enter with a subtle scale effect
      entranceTl.fromTo(
        '.hero-cta-btn',
        { opacity: 0, scale: 0.88, y: 14 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.09, ease: 'back.out(1.6)' },
        0.42
      );

      // Step 6: Portrait rises and scales into position
      if (portraitEntranceRef.current) {
        entranceTl.fromTo(
          portraitEntranceRef.current,
          { opacity: 0, y: 40, scale: 0.92 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' },
          0.18
        );
      }

      // Step 7: Orbit icons appear individually with staggered motion
      entranceTl.fromTo(
        '.orbit-entrance-item',
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.58,
          stagger: 0.08,
          ease: 'back.out(1.7)',
        },
        0.3
      );

      // Step 8: Neon trails draw themselves into the scene
      entranceTl.fromTo(
        '.neon-draw-group',
        { opacity: 0, scale: 0.94, transformOrigin: 'center center' },
        { opacity: 1, scale: 1, duration: 0.75, ease: 'power2.out' },
        0.22
      );

      // =========================================================================
      // 2. CONTINUOUS NEON ENVIRONMENT & PORTRAIT MOTION (Phases 3 & 4)
      // =========================================================================

      // Gentle independent floating motion on the portrait inner wrapper
      if (portraitFloatRef.current) {
        gsap.to(portraitFloatRef.current, {
          y: -10,
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      // Upper neon ribbon continuous flowing stream + layered glow
      const upperTargets = [ribbonTrail1Ref.current, ribbonGlow1Ref.current].filter(Boolean);
      if (upperTargets.length > 0) {
        gsap.fromTo(
          upperTargets,
          { strokeDashoffset: 0 },
          {
            strokeDashoffset: -600,
            duration: 5.5,
            ease: 'none',
            repeat: -1,
          }
        );
      }

      // Upper neon ribbon bright traveling highlight pulse
      if (ribbonPulse1Ref.current) {
        gsap.fromTo(
          ribbonPulse1Ref.current,
          { strokeDashoffset: 0 },
          {
            strokeDashoffset: -600,
            duration: 3.2,
            ease: 'none',
            repeat: -1,
          }
        );
      }

      // Lower neon ribbon counter-flowing stream + layered glow
      const lowerTargets = [ribbonTrail2Ref.current, ribbonGlow2Ref.current].filter(Boolean);
      if (lowerTargets.length > 0) {
        gsap.fromTo(
          lowerTargets,
          { strokeDashoffset: 0 },
          {
            strokeDashoffset: 500,
            duration: 6.2,
            ease: 'none',
            repeat: -1,
          }
        );
      }

      // Lower neon ribbon counter-traveling bright highlight pulse
      if (ribbonPulse2Ref.current) {
        gsap.fromTo(
          ribbonPulse2Ref.current,
          { strokeDashoffset: 0 },
          {
            strokeDashoffset: 500,
            duration: 3.6,
            ease: 'none',
            repeat: -1,
          }
        );
      }

      // Elliptical guide rings continuous dash flow
      if (orbitRing1Ref.current) {
        gsap.to(orbitRing1Ref.current, {
          strokeDashoffset: -144,
          duration: 7,
          ease: 'none',
          repeat: -1,
        });
      }

      if (orbitRing2Ref.current) {
        gsap.to(orbitRing2Ref.current, {
          strokeDashoffset: 160,
          duration: 9,
          ease: 'none',
          repeat: -1,
        });
      }

      // Top-left decorative ribbon traveling light pulse
      if (topRibbonPulseRef.current) {
        gsap.fromTo(
          topRibbonPulseRef.current,
          { strokeDashoffset: 0 },
          {
            strokeDashoffset: -360,
            duration: 4.2,
            ease: 'none',
            repeat: -1,
          }
        );
      }

      // Sculpted bottom wave crest breathing glow + traveling highlight
      if (waveCrestGlowRef.current) {
        gsap.to(waveCrestGlowRef.current, {
          strokeOpacity: 0.55,
          strokeWidth: 12,
          duration: 2.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      if (waveCrestRef.current) {
        gsap.to(waveCrestRef.current, {
          strokeWidth: 4.2,
          opacity: 1,
          duration: 2.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      if (waveCrestPulseRef.current) {
        gsap.fromTo(
          waveCrestPulseRef.current,
          { strokeDashoffset: 0 },
          {
            strokeDashoffset: -820,
            duration: 4.0,
            ease: 'none',
            repeat: -1,
          }
        );
      }

      // Volumetric atmospheric glow continuous pulse
      if (glowAuraRef.current) {
        gsap.to(glowAuraRef.current, {
          scale: 1.12,
          opacity: 0.95,
          duration: 3.0,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      // Floating neon atmospheric particles
      PARTICLES.forEach((p, idx) => {
        gsap.to(`.neon-particle-${p.id}`, {
          x: p.dx,
          y: p.dy,
          scale: 1.35,
          opacity: 0.9,
          duration: p.dur,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: idx * 0.2,
        });
      });

      // Availability status dot pulse via GSAP
      gsap.fromTo(
        '.hero-status-ping',
        { scale: 1, opacity: 0.8 },
        {
          scale: 2.4,
          opacity: 0,
          duration: 1.4,
          repeat: -1,
          ease: 'power2.out',
        }
      );
    }, heroRootRef);

    return () => ctx.revert();
  }, [prefersReducedMotion, isRtl]);

  // Phase 7: GSAP Button Hover & Press Micro-Interactions
  const handleBtnEnter = (btn: HTMLButtonElement | null, isPrimary: boolean) => {
    if (prefersReducedMotion || !btn) return;
    gsap.to(btn, {
      scale: 1.04,
      y: -2,
      boxShadow: isPrimary
        ? '0 0 34px rgba(204, 255, 0, 0.55)'
        : '0 0 22px rgba(204, 255, 0, 0.22)',
      duration: 0.22,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  const handleBtnLeave = (btn: HTMLButtonElement | null, isPrimary: boolean) => {
    if (prefersReducedMotion || !btn) return;
    gsap.to(btn, {
      scale: 1,
      y: 0,
      boxShadow: isPrimary
        ? '0 0 25px rgba(204, 255, 0, 0.35)'
        : '0 4px 16px rgba(0, 0, 0, 0.5)',
      duration: 0.25,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  const handleBtnDown = (btn: HTMLButtonElement | null) => {
    if (prefersReducedMotion || !btn) return;
    gsap.to(btn, {
      scale: 0.96,
      y: 1,
      duration: 0.1,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  const handleBtnUp = (btn: HTMLButtonElement | null) => {
    if (prefersReducedMotion || !btn) return;
    gsap.to(btn, {
      scale: 1.04,
      y: -2,
      duration: 0.18,
      ease: 'back.out(2)',
      overwrite: 'auto',
    });
  };

  return (
    <div
      ref={heroRootRef}
      className="relative w-full h-full min-h-[calc(100svh-4.5rem)] flex items-start lg:items-center justify-center pt-4 pb-20 lg:py-4 px-4 sm:px-6 lg:px-12 overflow-y-auto lg:overflow-hidden select-none"
    >
      {/* 1. Neon Corner Marks framing the scene */}
      <div
        className={`absolute top-3 ${isRtl ? 'left-6 sm:left-10' : 'right-6 sm:right-10'} hidden sm:block pointer-events-none z-30 opacity-75`}
        aria-hidden="true"
      >
        <span className="font-mono text-lg text-[#ccff00]">⌝</span>
      </div>
      <div
        className={`absolute bottom-3 ${isRtl ? 'right-6 sm:right-10' : 'left-6 sm:left-10'} hidden sm:block pointer-events-none z-30 opacity-75`}
        aria-hidden="true"
      >
        <span className="font-mono text-lg text-[#ccff00]">⌞</span>
      </div>

      {/* 2. Atmospheric Ambient Light using GPU-friendly radial gradients (zero CSS blur filter cost) */}
      <div
        style={{
          background:
            'radial-gradient(circle, rgba(204,255,0,0.09) 0%, rgba(204,255,0,0.03) 45%, transparent 70%)',
        }}
        className="hero-ambient-glow absolute top-1/6 -left-40 w-[520px] h-[520px] rounded-full pointer-events-none"
      />
      <div
        style={{
          background:
            'radial-gradient(circle, rgba(204,255,0,0.14) 0%, rgba(204,255,0,0.04) 50%, transparent 72%)',
        }}
        className="hero-ambient-glow absolute top-1/5 right-1/6 w-[640px] h-[640px] rounded-full pointer-events-none"
      />

      {/* Top-Left Glowing Curved Light Ribbon with Layered Glow & GSAP Flowing Pulse */}
      <svg
        className="neon-draw-group absolute top-0 left-0 w-80 h-72 pointer-events-none opacity-65 hidden sm:block overflow-visible"
        viewBox="0 0 320 280"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="ribbonGradTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ccff00" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#ccff00" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#ccff00" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Outer soft neon glow stroke */}
        <path
          d="M -20 180 C 80 160, 160 90, 280 20"
          stroke="url(#ribbonGradTop)"
          strokeWidth="8"
          strokeOpacity="0.25"
          strokeLinecap="round"
        />
        <path
          d="M -20 180 C 80 160, 160 90, 280 20"
          stroke="url(#ribbonGradTop)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          ref={topRibbonPulseRef}
          d="M -20 180 C 80 160, 160 90, 280 20"
          stroke="#ffffff"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="65 295"
        />
        <path
          d="M -30 200 C 60 185, 140 120, 240 60"
          stroke="#ccff00"
          strokeWidth="1"
          strokeOpacity="0.4"
        />
      </svg>

      {/* Main Grid Content */}
      <div className="w-full max-w-7xl mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center pb-6 lg:pb-0">
        
        {/* Left Column: Brand, Tagline, Editorial Headline, Brush Swoosh, CTAs */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-4 sm:space-y-5 z-20 text-center lg:text-left rtl:lg:text-right">
          
          {/* Availability Status Badge & Note */}
          <div className="hero-badge-item flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#101017]/90 border border-zinc-800 text-[11px] font-mono tracking-wider text-zinc-300 shadow-md">
              <span className="relative flex h-2 w-2">
                <span className="hero-status-ping absolute inline-flex h-full w-full rounded-full bg-[#ccff00] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ccff00]" />
              </span>
              <span>{t.hero.badge}</span>
            </div>

            {isRtl && siteConfig.brand.arabicTaglineNote && (
              <span className="text-[11px] font-mono text-zinc-500">
                ({t.hero.taglineNote})
              </span>
            )}
          </div>

          {/* Prominent Approved Tagline */}
          <div className="hero-badge-item text-xs sm:text-sm font-mono font-semibold text-[#ccff00] tracking-wider">
            {currentLang === 'en'
              ? siteConfig.brand.englishTagline
              : siteConfig.brand.arabicTagline}
          </div>

          {/* Bold Editorial Headline with Staggered Line Reveals & Brush Swoop */}
          <div className="relative inline-block">
            <h1
              className={`text-2xl sm:text-4xl lg:text-[2.65rem] xl:text-[3.1rem] text-white max-w-2xl mx-auto lg:mx-0 ${
                isRtl
                  ? 'font-black leading-[1.42] tracking-normal'
                  : 'font-extrabold leading-[1.12] tracking-tight'
              }`}
            >
              <span className="hero-heading-line inline-block">
                {t.hero.headlinePart1}
              </span>{' '}
              <span className="hero-heading-line relative inline-block text-white">
                <span className="text-[#ccff00] font-black">
                  {t.hero.headlineHighlight}
                </span>
                {/* Neon Lime Brush Swoop directly under headline highlight */}
                <svg
                  className={`absolute ${isRtl ? '-bottom-1' : '-bottom-2'} left-0 w-full h-3 overflow-visible pointer-events-none`}
                  viewBox="0 0 220 14"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    ref={brushSwoopRef}
                    d="M 2 8 C 50 2, 160 2, 218 6 C 165 11, 70 12, 2 8 Z"
                    fill="#ccff00"
                  />
                </svg>
              </span>{' '}
              <span className="hero-heading-line inline-block">
                {t.hero.headlinePart2}
              </span>
            </h1>
          </div>

          {/* Lead Prose Description */}
          <p className="hero-desc-item text-xs sm:text-sm lg:text-[0.95rem] text-zinc-300 font-normal leading-relaxed max-w-xl mx-auto lg:mx-0 pt-0.5">
            {t.hero.description}
          </p>

          {/* Action CTAs: Solid Neon Lime + Dark Glass with GSAP Micro-Animations */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1.5">
            <button
              ref={primaryBtnRef}
              onClick={() => onNavigate('work')}
              onMouseEnter={() => handleBtnEnter(primaryBtnRef.current, true)}
              onMouseLeave={() => handleBtnLeave(primaryBtnRef.current, true)}
              onMouseDown={() => handleBtnDown(primaryBtnRef.current)}
              onMouseUp={() => handleBtnUp(primaryBtnRef.current)}
              className="hero-cta-btn group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#ccff00] text-[#09090b] font-bold text-xs sm:text-sm hover:bg-[#d9ff33] shadow-[0_0_25px_rgba(204,255,0,0.35)] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00] will-change-transform"
            >
              <FolderOpen className="w-4 h-4 stroke-[2.2]" />
              <span>{t.hero.viewWorkCTA}</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.2] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <button
              ref={secondaryBtnRef}
              onClick={() => onNavigate('contact')}
              onMouseEnter={() => handleBtnEnter(secondaryBtnRef.current, false)}
              onMouseLeave={() => handleBtnLeave(secondaryBtnRef.current, false)}
              onMouseDown={() => handleBtnDown(secondaryBtnRef.current)}
              onMouseUp={() => handleBtnUp(secondaryBtnRef.current)}
              className="hero-cta-btn group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#121218]/90 hover:bg-[#1a1a24] text-white font-semibold text-xs sm:text-sm border border-zinc-800 hover:border-[#ccff00]/60 shadow-lg cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00] will-change-transform"
            >
              <MessageSquare className="w-4 h-4 text-[#ccff00] transition-transform duration-200 group-hover:scale-110" />
              <span>{t.hero.contactCTA}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Cinematic 3D Scene with Portrait, Glowing Waves, Light Ribbons & Orbit */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative mt-4 lg:mt-0">
          <div className="relative w-full max-w-[480px] h-[440px] sm:h-[540px] flex items-center justify-center overflow-visible">
            
            {/* Atmospheric Green Volumetric Glow using pure radial gradient (zero filter lag) */}
            <div
              ref={glowAuraRef}
              style={{
                background:
                  'radial-gradient(circle, rgba(204,255,0,0.28) 0%, rgba(204,255,0,0.09) 42%, rgba(204,255,0,0.02) 65%, transparent 78%)',
              }}
              className="hero-ambient-glow absolute w-[420px] h-[420px] sm:w-[490px] sm:h-[490px] rounded-full pointer-events-none will-change-transform"
            />
            
            {/* GSAP Animated Floating Particle Motes */}
            <div className="absolute inset-0 pointer-events-none overflow-visible" aria-hidden="true">
              {PARTICLES.map((p) => (
                <span
                  key={p.id}
                  style={{ top: p.top, bottom: p.bottom, left: p.left, right: p.right }}
                  className={`neon-particle-${p.id} absolute ${p.size} rounded-full bg-[#ccff00] opacity-55 will-change-transform ${
                    p.mobile ? 'block' : 'hidden sm:block'
                  }`}
                />
              ))}
            </div>

            {/* Glowing 3D Light Ribbon Trails sweeping around the portrait (multi-stroke neon glow for 60fps performance) */}
            <svg
              className="neon-draw-group absolute w-[360px] h-[360px] sm:w-[620px] sm:h-[620px] pointer-events-none overflow-visible"
              viewBox="0 0 600 600"
              fill="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="neonTrailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ccff00" stopOpacity="0.95" />
                  <stop offset="45%" stopColor="#ccff00" stopOpacity="0.7" />
                  <stop offset="80%" stopColor="#38bdf8" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#ccff00" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="lowerTrailGrad" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ccff00" stopOpacity="0.9" />
                  <stop offset="60%" stopColor="#ccff00" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#ccff00" stopOpacity="0.1" />
                </linearGradient>
              </defs>

              {/* Orbital Ellipse Guide Ring 1 (Animated Dash Flow) */}
              <ellipse
                ref={orbitRing1Ref}
                cx="300"
                cy="320"
                rx="275"
                ry="130"
                transform="rotate(-14 300 320)"
                stroke="#ccff00"
                strokeWidth="1.3"
                strokeDasharray="6 10"
                opacity="0.4"
              />

              {/* Orbital Ellipse Guide Ring 2 (Counter-Animated Dash Flow) */}
              <ellipse
                ref={orbitRing2Ref}
                cx="300"
                cy="330"
                rx="295"
                ry="145"
                transform="rotate(12 300 330)"
                stroke="#ccff00"
                strokeWidth="1"
                strokeDasharray="4 12"
                opacity="0.22"
              />

              {/* Upper Neon Ribbon Base Curve */}
              <path
                d="M 60 360 C 90 200, 240 160, 480 230 C 560 260, 580 340, 510 390"
                stroke="url(#neonTrailGrad)"
                strokeWidth="2"
                opacity="0.35"
              />

              {/* Upper Sweeping Neon Ribbon Outer Bloom Stroke */}
              <path
                ref={ribbonGlow1Ref}
                d="M 60 360 C 90 200, 240 160, 480 230 C 560 260, 580 340, 510 390"
                stroke="#ccff00"
                strokeWidth="10"
                strokeOpacity="0.22"
                strokeLinecap="round"
                strokeDasharray="140 160"
              />

              {/* Upper Sweeping Neon Ribbon Flowing Core Stream */}
              <path
                ref={ribbonTrail1Ref}
                d="M 60 360 C 90 200, 240 160, 480 230 C 560 260, 580 340, 510 390"
                stroke="url(#neonTrailGrad)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeDasharray="140 160"
              />

              {/* Upper Ribbon Bright Traveling Light Highlight Pulse */}
              <path
                ref={ribbonPulse1Ref}
                d="M 60 360 C 90 200, 240 160, 480 230 C 560 260, 580 340, 510 390"
                stroke="#ffffff"
                strokeWidth="4.2"
                strokeLinecap="round"
                strokeDasharray="42 258"
              />

              {/* Lower Neon Ribbon Base Curve */}
              <path
                d="M 120 420 C 220 460, 380 470, 540 370"
                stroke="url(#lowerTrailGrad)"
                strokeWidth="1.6"
                opacity="0.32"
              />

              {/* Lower Sweeping Neon Ribbon Outer Bloom Stroke */}
              <path
                ref={ribbonGlow2Ref}
                d="M 120 420 C 220 460, 380 470, 540 370"
                stroke="#ccff00"
                strokeWidth="9"
                strokeOpacity="0.2"
                strokeLinecap="round"
                strokeDasharray="110 140"
              />

              {/* Lower Sweeping Neon Ribbon Counter-Flowing Stream */}
              <path
                ref={ribbonTrail2Ref}
                d="M 120 420 C 220 460, 380 470, 540 370"
                stroke="url(#lowerTrailGrad)"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeDasharray="110 140"
              />

              {/* Lower Ribbon Bright Traveling Highlight Pulse */}
              <path
                ref={ribbonPulse2Ref}
                d="M 120 420 C 220 460, 380 470, 540 370"
                stroke="#ccff00"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="38 212"
              />
            </svg>

            {/* UNIFIED 3D ORBITAL ICON LAYER:
                Individual icons dynamically switch between zIndex: 10 (behind portrait z-20)
                and zIndex: 30 (in front of portrait z-20 and bottom wave z-25) */}
            <OrbitBadges prefersReducedMotion={prefersReducedMotion} />

            {/* CENTRAL PORTRAIT COMPOSITION (z-20):
                Outer wrapper handles initial entrance; inner wrapper handles gentle continuous float */}
            <div
              ref={portraitEntranceRef}
              data-testid="home-portrait-container"
              className={`relative z-20 ${siteConfig.portrait.widthClasses} ${siteConfig.portrait.heightClasses} flex items-center justify-center pointer-events-none will-change-transform`}
            >
              <div
                ref={portraitFloatRef}
                className="relative w-full h-full flex items-center justify-center will-change-transform"
              >
                <img
                  data-testid="home-portrait-img"
                  src={siteConfig.portrait.src}
                  alt={isRtl ? siteConfig.portrait.altAr : siteConfig.portrait.alt}
                  draggable={false}
                  decoding="async"
                  className="relative z-10 w-full h-full object-contain bg-transparent select-none"
                  style={{
                    objectFit: siteConfig.portrait.objectFit,
                    objectPosition: siteConfig.portrait.objectPosition,
                    transform: `translate3d(${siteConfig.portrait.offsetX}px, ${siteConfig.portrait.offsetY}px, 0) scale(${siteConfig.portrait.scale})`,
                    transformOrigin: 'center bottom',
                  }}
                  onError={(e) => {
                    if (
                      siteConfig.portrait.fallbackSrc &&
                      !e.currentTarget.src.endsWith(siteConfig.portrait.fallbackSrc)
                    ) {
                      e.currentTarget.src = siteConfig.portrait.fallbackSrc;
                    }
                  }}
                />
              </div>

              {/* Bottom gradient fade blending portrait base into dark sculpted waves */}
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#09090b] via-[#09090b]/75 to-transparent pointer-events-none z-20" />
            </div>

            {/* SCULPTED 3D DARK WAVES WITH LUMINOUS LIME CRESTS AT THE BOTTOM (z-25) */}
            <div className="neon-draw-group absolute -bottom-8 -left-20 -right-20 h-44 z-25 pointer-events-none overflow-visible">
              <svg
                className="w-full h-full overflow-visible"
                viewBox="0 0 700 140"
                preserveAspectRatio="none"
                fill="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="waveFillGradBack" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#14141e" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#08080c" stopOpacity="0.98" />
                  </linearGradient>
                  <linearGradient id="waveFillGradFront" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#101017" stopOpacity="0.98" />
                    <stop offset="50%" stopColor="#0a0a0e" stopOpacity="0.99" />
                    <stop offset="100%" stopColor="#050508" stopOpacity="1" />
                  </linearGradient>
                </defs>

                {/* Back Sculpted Wave Mound */}
                <path
                  d="M -40 85 Q 140 45, 320 75 T 740 50 L 740 160 L -40 160 Z"
                  fill="url(#waveFillGradBack)"
                  opacity="0.85"
                />

                {/* Main Foreground Wave Body */}
                <path
                  d="M -50 95 Q 160 38, 380 82 T 750 62 L 750 170 L -50 170 Z"
                  fill="url(#waveFillGradFront)"
                />

                {/* Wave Crest Outer Neon Bloom Stroke */}
                <path
                  ref={waveCrestGlowRef}
                  d="M -50 95 Q 160 38, 380 82 T 750 62"
                  stroke="#ccff00"
                  strokeWidth="9"
                  strokeOpacity="0.32"
                  strokeLinecap="round"
                />

                {/* Bright Glowing Neon Lime Crest Line with GSAP breathing glow */}
                <path
                  ref={waveCrestRef}
                  d="M -50 95 Q 160 38, 380 82 T 750 62"
                  stroke="#ccff00"
                  strokeWidth="3"
                  opacity="0.9"
                />

                {/* Traveling White-Lime Energy Highlight Pulse along Wave Crest */}
                <path
                  ref={waveCrestPulseRef}
                  d="M -50 95 Q 160 38, 380 82 T 750 62"
                  stroke="#ffffff"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray="85 735"
                />

                {/* Secondary Lower Dark Ridge Accent */}
                <path
                  d="M 220 115 Q 420 85, 750 100"
                  stroke="#1c1c28"
                  strokeWidth="1.5"
                />
              </svg>

              {/* Wave Pill Badge: ● M7MD.dsgn // Creative Portfolio */}
              <div className="absolute bottom-3 right-16 sm:right-24 pointer-events-auto">
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0c0c12]/95 border border-zinc-800 text-[11px] font-mono text-zinc-300 shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00]" />
                  <span className="brand-logo-text font-semibold text-white tracking-wide">M7MD.dsgn</span>
                  <span className="text-zinc-500">// Creative Portfolio</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
