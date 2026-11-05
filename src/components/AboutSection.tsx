import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Language } from '../locales/translations';
import { SectionId } from './Navbar';
import {
  aboutConfig,
  ExpertiseIconType,
  getAboutContactLinks,
} from '../config/aboutConfig';
import { WhatsApp3DBadge, Email3DBadge } from './AboutContactBadges';

interface AboutSectionProps {
  currentLang: Language;
  onNavigate?: (section: SectionId) => void;
}

const ABOUT_PARTICLES = [
  { id: 1, top: '16%', left: '38%', size: 'w-1.5 h-1.5', dx: 12, dy: -18, dur: 3.1 },
  { id: 2, top: '32%', left: '49%', size: 'w-2 h-2', dx: -14, dy: -16, dur: 2.7 },
  { id: 3, top: '64%', left: '46%', size: 'w-1.5 h-1.5', dx: 15, dy: 14, dur: 3.4 },
  { id: 4, top: '76%', left: '30%', size: 'w-1.5 h-1.5', dx: -10, dy: -20, dur: 2.9 },
  { id: 5, top: '22%', right: '14%', size: 'w-1 h-1', dx: 10, dy: 16, dur: 3.6 },
  { id: 6, bottom: '18%', right: '18%', size: 'w-1.5 h-1.5', dx: -14, dy: -14, dur: 3.2 },
];

/**
 * Renders the compact neon-lime outline icon for each of the 3 expertise indicators.
 */
const ExpertiseOutlineIcon: React.FC<{ type: ExpertiseIconType }> = ({ type }) => {
  switch (type) {
    case 'social':
      return (
        <svg
          viewBox="0 0 36 36"
          fill="none"
          className="w-7 h-7 sm:w-8 sm:h-8 text-[#ccff00] shrink-0"
          aria-hidden="true"
        >
          {/* Creative Monitor / Canvas Frame */}
          <rect
            x="5"
            y="7"
            width="24"
            height="17"
            rx="3.5"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M12 29H22M17 24V29"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Stylus Pen nib drawing across canvas */}
          <path
            d="M22.5 11.5L26.5 15.5L16.5 20.5L13.5 21L14 18L22.5 11.5Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
            fill="rgba(204,255,0,0.12)"
          />
        </svg>
      );
    case 'motion':
      return (
        <svg
          viewBox="0 0 36 36"
          fill="none"
          className="w-7 h-7 sm:w-8 sm:h-8 text-[#ccff00] shrink-0"
          aria-hidden="true"
        >
          {/* Clapperboard / Motion Frame */}
          <rect
            x="6"
            y="12"
            width="24"
            height="17"
            rx="3"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M6 12L8.5 6.8C9.1 5.6 10.5 5 11.8 5.4L28.5 9.5C29.6 9.8 30.2 10.9 30 12H6Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
            fill="rgba(204,255,0,0.1)"
          />
          <path
            d="M13 6.5L11 11.5M20 8L18 12"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          {/* Play Triangle */}
          <path
            d="M15.5 17.2L21.5 20.5L15.5 23.8V17.2Z"
            fill="currentColor"
          />
        </svg>
      );
    case 'ai':
      return (
        <svg
          viewBox="0 0 36 36"
          fill="none"
          className="w-7 h-7 sm:w-8 sm:h-8 text-[#ccff00] shrink-0"
          aria-hidden="true"
        >
          {/* Dual-Hemisphere Creative AI Brain / Circuit Outline */}
          <path
            d="M17 9.5C17 7.6 15.4 6 13.5 6C11.8 6 10.4 7.2 10.1 8.8C8.3 9.3 7 11 7 13C7 14.3 7.6 15.5 8.5 16.3C7.5 17.2 7 18.5 7 20C7 22.4 8.8 24.4 11.1 24.8C11.4 26.6 13 28 14.9 28C16.1 28 17 27.1 17 25.9V9.5Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
            fill="rgba(204,255,0,0.08)"
          />
          <path
            d="M19 9.5C19 7.6 20.6 6 22.5 6C24.2 6 25.6 7.2 25.9 8.8C27.7 9.3 29 11 29 13C29 14.3 28.4 15.5 27.5 16.3C28.5 17.2 29 18.5 29 20C29 22.4 27.2 24.4 24.9 24.8C24.6 26.6 23 28 21.1 28C19.9 28 19 27.1 19 25.9V9.5Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
            fill="rgba(204,255,0,0.08)"
          />
          {/* Neural Nodes */}
          <circle cx="13" cy="14" r="1.4" fill="currentColor" />
          <circle cx="13" cy="20" r="1.4" fill="currentColor" />
          <circle cx="23" cy="14" r="1.4" fill="currentColor" />
          <circle cx="23" cy="20" r="1.4" fill="currentColor" />
          <path
            d="M13 14L17 16.5M13 20L17 18.5M23 14L19 16.5M23 20L19 18.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
  }
};

export const AboutSection: React.FC<AboutSectionProps> = ({ currentLang }) => {
  const isRtl = currentLang === 'ar';
  const [hoveredIcon, setHoveredIcon] = useState<'whatsapp' | 'email' | null>(null);

  const sectionRootRef = useRef<HTMLDivElement>(null);
  const portraitEntranceRef = useRef<HTMLDivElement>(null);
  const portraitFloatRef = useRef<HTMLDivElement>(null);

  const waEntranceRef = useRef<HTMLDivElement>(null);
  const waHoverRef = useRef<HTMLAnchorElement>(null);
  const waFloatRef = useRef<HTMLDivElement>(null);

  const emailEntranceRef = useRef<HTMLDivElement>(null);
  const emailHoverRef = useRef<HTMLAnchorElement>(null);
  const emailFloatRef = useRef<HTMLDivElement>(null);

  const labelEntranceRef = useRef<HTMLDivElement>(null);
  const labelFloatRef = useRef<HTMLDivElement>(null);

  const leftArcPulseRef = useRef<SVGPathElement>(null);
  const leftArcGlowRef = useRef<SVGPathElement>(null);
  const bottomRightArcPulseRef = useRef<SVGPathElement>(null);
  const palmRing1Ref = useRef<SVGEllipseElement>(null);
  const palmRing2Ref = useRef<SVGEllipseElement>(null);
  const palmSwirlPulseRef = useRef<SVGPathElement>(null);
  const titleSwooshRef = useRef<SVGPathElement>(null);

  const { whatsappHref, emailHref, whatsappLabel, emailLabel } =
    getAboutContactLinks(currentLang, aboutConfig);

  // Master GSAP Entrance Sequence + Continuous Idle Floating & Neon Trail Loops
  useEffect(() => {
    const rootEl = sectionRootRef.current;
    if (!rootEl) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const waCfg = aboutConfig.contactIcons.whatsapp;
      const mailCfg = aboutConfig.contactIcons.email;

      // Set initial resting 3D tilt on icon hover wrappers
      if (waHoverRef.current) {
        gsap.set(waHoverRef.current, {
          rotationZ: waCfg.baseTiltZ,
          rotationX: 4,
          rotationY: -6,
          transformPerspective: 1000,
          force3D: true,
        });
      }
      if (emailHoverRef.current) {
        gsap.set(emailHoverRef.current, {
          rotationZ: mailCfg.baseTiltZ,
          rotationX: 5,
          rotationY: 7,
          transformPerspective: 1000,
          force3D: true,
        });
      }

      if (prefersReducedMotion) return;

      // =====================================================================
      // 1. COORDINATED ENTRANCE TIMELINE
      // =====================================================================
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Step 1: Background green illumination & neon trails fade in
      tl.fromTo(
        '.about-ambient-glow',
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 0.7, stagger: 0.08 },
        0
      );

      tl.fromTo(
        '.about-neon-trail-svg',
        { opacity: 0 },
        { opacity: 1, duration: 0.65 },
        0.08
      );

      // Step 2: Portrait enters with subtle upward movement and scale
      if (portraitEntranceRef.current) {
        tl.fromTo(
          portraitEntranceRef.current,
          { opacity: 0, y: 36, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, duration: 0.78, ease: 'power3.out' },
          0.12
        );
      }

      // Step 3: Contact icons appear separately with staggered 3D entrance
      const iconEntrances = [waEntranceRef.current, emailEntranceRef.current].filter(Boolean);
      if (iconEntrances.length > 0) {
        tl.fromTo(
          iconEntrances,
          { opacity: 0, y: 28, scale: 0.55 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.64,
            stagger: 0.14,
            ease: 'back.out(1.65)',
          },
          0.26
        );
      }

      // Step 4: "Contact Me" / "تواصل معي" speech bubble label appears and connects to the icon group
      if (labelEntranceRef.current) {
        tl.fromTo(
          labelEntranceRef.current,
          { opacity: 0, y: 18, scale: 0.84 },
          { opacity: 1, y: 0, scale: 1, duration: 0.56, ease: 'back.out(1.5)' },
          0.42
        );
      }

      // Step 5: Right-side section label, brand name, professional title, swoosh & bio reveal smoothly
      tl.fromTo(
        '.about-info-reveal',
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.56, stagger: 0.09 },
        0.2
      );

      if (titleSwooshRef.current) {
        tl.fromTo(
          titleSwooshRef.current,
          { scaleX: 0, opacity: 0, transformOrigin: 'center center' },
          { scaleX: 1, opacity: 1, duration: 0.52, ease: 'power2.out' },
          0.44
        );
      }

      // Step 6: Three expertise indicators appear one after another
      tl.fromTo(
        '.about-expertise-item',
        { opacity: 0, y: 18, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, duration: 0.48, stagger: 0.1 },
        0.48
      );

      // =====================================================================
      // 2. CONTINUOUS IDLE FLOATING & NEON TRAIL ANIMATIONS
      // =====================================================================

      // Extremely subtle floating motion on the portrait
      if (portraitFloatRef.current) {
        gsap.to(portraitFloatRef.current, {
          y: -6,
          duration: 3.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      // WhatsApp 3D Icon independent floating cycle + subtle 3D tilt
      if (waFloatRef.current) {
        gsap.to(waFloatRef.current, {
          y: waCfg.floatAmplitudeY,
          rotationZ: 2.4,
          rotationY: 4,
          duration: waCfg.floatDuration,
          delay: waCfg.floatDelay,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      // Email 3D Icon independent floating cycle with phase offset + subtle 3D tilt
      if (emailFloatRef.current) {
        gsap.to(emailFloatRef.current, {
          y: mailCfg.floatAmplitudeY,
          rotationZ: -2.6,
          rotationY: -4,
          duration: mailCfg.floatDuration,
          delay: mailCfg.floatDelay,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      // "Contact Me" label coordinated gentle float following the icon group
      if (labelFloatRef.current) {
        gsap.to(labelFloatRef.current, {
          y: -7,
          rotationZ: -1.2,
          duration: 4.5,
          delay: 0.25,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      // Left Portrait Curved Neon-Lime Trail Traveling Light Pulse
      if (leftArcPulseRef.current) {
        gsap.fromTo(
          leftArcPulseRef.current,
          { strokeDashoffset: 0 },
          {
            strokeDashoffset: -760,
            duration: 6.4,
            ease: 'none',
            repeat: -1,
          }
        );
      }

      if (leftArcGlowRef.current) {
        gsap.to(leftArcGlowRef.current, {
          opacity: 0.65,
          duration: 2.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      // Bottom-Right Neon-Lime Trail Traveling Light Pulse
      if (bottomRightArcPulseRef.current) {
        gsap.fromTo(
          bottomRightArcPulseRef.current,
          { strokeDashoffset: 0 },
          {
            strokeDashoffset: 560,
            duration: 5.8,
            ease: 'none',
            repeat: -1,
          }
        );
      }

      // Palm Orbital Rings Continuous Dash Rotation
      if (palmRing1Ref.current) {
        gsap.to(palmRing1Ref.current, {
          strokeDashoffset: -220,
          duration: 6.2,
          ease: 'none',
          repeat: -1,
        });
      }

      if (palmRing2Ref.current) {
        gsap.to(palmRing2Ref.current, {
          strokeDashoffset: 240,
          duration: 7.4,
          ease: 'none',
          repeat: -1,
        });
      }

      if (palmSwirlPulseRef.current) {
        gsap.fromTo(
          palmSwirlPulseRef.current,
          { strokeDashoffset: 0 },
          {
            strokeDashoffset: -520,
            duration: 4.2,
            ease: 'none',
            repeat: -1,
          }
        );
      }

      // Ambient floating particles
      ABOUT_PARTICLES.forEach((p) => {
        gsap.to(`.about-particle-${p.id}`, {
          x: p.dx,
          y: p.dy,
          opacity: 0.85,
          duration: p.dur,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
    }, rootEl);

    return () => {
      ctx.revert();
    };
  }, []);

  // Responsive GSAP Hover Lift & 3D Tilt Feedback on the 3D Contact Icons
  useEffect(() => {
    const waEl = waHoverRef.current;
    const mailEl = emailHoverRef.current;
    const waCfg = aboutConfig.contactIcons.whatsapp;
    const mailCfg = aboutConfig.contactIcons.email;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dur = prefersReducedMotion ? 0.12 : 0.34;

    if (waEl) {
      if (hoveredIcon === 'whatsapp') {
        gsap.to(waEl, {
          scale: 1.1,
          y: -9,
          rotationZ: waCfg.baseTiltZ * 0.35,
          rotationX: 0,
          rotationY: 0,
          duration: dur,
          ease: 'power3.out',
          overwrite: 'auto',
        });
      } else {
        gsap.to(waEl, {
          scale: hoveredIcon === 'email' ? 0.96 : 1,
          y: 0,
          rotationZ: waCfg.baseTiltZ,
          rotationX: 4,
          rotationY: -6,
          duration: dur,
          ease: 'power3.out',
          overwrite: 'auto',
        });
      }
    }

    if (mailEl) {
      if (hoveredIcon === 'email') {
        gsap.to(mailEl, {
          scale: 1.1,
          y: -9,
          rotationZ: mailCfg.baseTiltZ * 0.35,
          rotationX: 0,
          rotationY: 0,
          duration: dur,
          ease: 'power3.out',
          overwrite: 'auto',
        });
      } else {
        gsap.to(mailEl, {
          scale: hoveredIcon === 'whatsapp' ? 0.96 : 1,
          y: 0,
          rotationZ: mailCfg.baseTiltZ,
          rotationX: 5,
          rotationY: 7,
          duration: dur,
          ease: 'power3.out',
          overwrite: 'auto',
        });
      }
    }
  }, [hoveredIcon]);

  return (
    <section
      ref={sectionRootRef}
      data-testid="about-section-viewport"
      dir="ltr"
      aria-label="About M7MD.dsgn"
      className="relative w-full h-[calc(100svh-4rem)] sm:h-[calc(100svh-4.5rem)] max-h-[calc(100dvh-4rem)] sm:max-h-[calc(100dvh-4.5rem)] overflow-hidden bg-[#07070b] select-none flex items-center justify-center"
    >
      {/* =====================================================================
          1. BACKGROUND ATMOSPHERIC LIGHTING & ANIMATED NEON-LIME LIGHT TRAILS
         ===================================================================== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        {/* Deep Charcoal Studio Vignette & Subtle Texture Radial */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_28%_52%,rgba(28,38,14,0.42)_0%,rgba(10,11,16,0.92)_58%,#060609_100%)]" />

        {/* Atmospheric Green Illumination Behind Portrait & Floating Icons */}
        <div
          className="about-ambient-glow absolute left-[2%] top-[10%] w-[320px] h-[320px] sm:w-[460px] sm:h-[460px] lg:w-[560px] lg:h-[560px] rounded-full bg-[radial-gradient(circle,rgba(204,255,0,0.18)_0%,rgba(132,204,22,0.06)_48%,transparent_72%)]"
        />

        {/* Concentrated Emerald-Lime Aura Behind the Two 3D Contact Icons & Open Palm */}
        <div
          className="about-ambient-glow absolute left-[22%] sm:left-[24%] lg:left-[23%] top-[30%] sm:top-[28%] w-[260px] h-[260px] sm:w-[360px] sm:h-[360px] lg:w-[420px] lg:h-[420px] rounded-full bg-[radial-gradient(circle,rgba(204,255,0,0.24)_0%,rgba(34,197,94,0.09)_45%,transparent_70%)]"
        />

        {/* Soft Bottom-Right Ambient Corner Glow */}
        <div
          className="about-ambient-glow absolute -right-12 -bottom-16 w-[300px] h-[260px] sm:w-[420px] sm:h-[340px] rounded-full bg-[radial-gradient(circle,rgba(204,255,0,0.16)_0%,rgba(204,255,0,0.04)_52%,transparent_74%)]"
        />

        {/* Full-Viewport SVG Layer for Left Portrait Arc & Bottom-Right Curved Neon Light Trail */}
        <svg
          className="about-neon-trail-svg absolute inset-0 w-full h-full overflow-visible"
          viewBox="0 0 1440 820"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="aboutLeftArcGrad" x1="0" y1="0" x2="260" y2="820" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ccff00" stopOpacity="0.95" />
              <stop offset="48%" stopColor="#84cc16" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#ccff00" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="aboutBottomRightGrad" x1="1080" y1="820" x2="1440" y2="580" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ccff00" stopOpacity="0" />
              <stop offset="45%" stopColor="#ccff00" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#ecfccb" stopOpacity="1" />
            </linearGradient>
          </defs>

          {/* Left Sweeping Neon-Lime Arc Behind Portrait (Matching Reference Left Edge) */}
          <path
            ref={leftArcGlowRef}
            d="M 168 -18 C -32 135, -42 585, 118 842"
            stroke="#ccff00"
            strokeWidth="12"
            strokeOpacity="0.22"
            strokeLinecap="round"
          />
          <path
            d="M 168 -18 C -32 135, -42 585, 118 842"
            stroke="url(#aboutLeftArcGrad)"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <path
            ref={leftArcPulseRef}
            d="M 168 -18 C -32 135, -42 585, 118 842"
            stroke="#ffffff"
            strokeWidth="4.2"
            strokeLinecap="round"
            strokeDasharray="110 650"
          />

          {/* Bottom-Right Sweeping Neon-Lime Arc (Matching Reference Bottom-Right Corner) */}
          <path
            d="M 1120 845 C 1235 775, 1345 705, 1465 655"
            stroke="#ccff00"
            strokeWidth="12"
            strokeOpacity="0.22"
            strokeLinecap="round"
          />
          <path
            d="M 1120 845 C 1235 775, 1345 705, 1465 655"
            stroke="url(#aboutBottomRightGrad)"
            strokeWidth="3.6"
            strokeLinecap="round"
          />
          <path
            ref={bottomRightArcPulseRef}
            d="M 1120 845 C 1235 775, 1345 705, 1465 655"
            stroke="#ffffff"
            strokeWidth="4.4"
            strokeLinecap="round"
            strokeDasharray="85 475"
          />
        </svg>

        {/* Subtle Glowing Atmospheric Particles */}
        {ABOUT_PARTICLES.map((p) => (
          <span
            key={p.id}
            style={{ top: p.top, left: p.left, right: p.right, bottom: p.bottom }}
            className={`about-particle-${p.id} absolute ${p.size} rounded-full bg-[#ccff00] opacity-40 shadow-[0_0_10px_#ccff00]`}
          />
        ))}
      </div>

      {/* =====================================================================
          2. MAIN TWO-COLUMN FULL-SCREEN STAGE (LEFT: PORTRAIT & ICONS, RIGHT: INFO)
             Preserves Left/Right composition in both languages; text adapts to RTL/LTR
         ===================================================================== */}
      <div className="relative z-10 w-full max-w-[1400px] h-full mx-auto px-4 sm:px-8 lg:px-14 xl:px-16 grid grid-cols-1 lg:grid-cols-12 items-center gap-2 sm:gap-4 lg:gap-6">
        {/* ===================================================================
            LEFT COLUMN (7 cols on lg): PORTRAIT CUTOUT + OPEN PALM + 3D ICONS + "CONTACT ME"
           =================================================================== */}
        <div
          data-testid="about-visual-column"
          className="lg:col-span-7 relative w-full h-[46%] sm:h-[50%] lg:h-full flex items-end justify-center lg:justify-start overflow-visible"
        >
          {/* Unified Visual Stage Anchoring Portrait, Palm & Floating Contact Group */}
          <div className="relative w-full max-w-[680px] h-full flex items-end justify-start overflow-visible">
            {/* A. PERSONAL PORTRAIT CUTOUT (Left Side, Extended Open Palm) */}
            <div
              ref={portraitEntranceRef}
              data-testid="about-portrait-container"
              className={`relative z-10 ${aboutConfig.portrait.widthClasses} ${aboutConfig.portrait.heightClasses} shrink-0 pointer-events-none flex items-end justify-start -ml-2 sm:ml-0`}
            >
              <div
                ref={portraitFloatRef}
                className="relative w-full h-full flex items-end justify-start will-change-transform"
              >
                <img
                  data-testid="about-portrait-img"
                  src={aboutConfig.portrait.src}
                  alt={isRtl ? aboutConfig.portrait.altAr : aboutConfig.portrait.altEn}
                  draggable={false}
                  decoding="async"
                  style={{
                    objectFit: aboutConfig.portrait.objectFit,
                    objectPosition: aboutConfig.portrait.objectPosition,
                    transform: `translate3d(${aboutConfig.portrait.offsetX}px, ${aboutConfig.portrait.offsetY}px, 0) scale(${aboutConfig.portrait.scale})`,
                    transformOrigin: 'left bottom',
                  }}
                  onError={(e) => {
                    if (
                      aboutConfig.portrait.fallbackSrc &&
                      !e.currentTarget.src.endsWith(aboutConfig.portrait.fallbackSrc)
                    ) {
                      e.currentTarget.src = aboutConfig.portrait.fallbackSrc;
                    }
                  }}
                  className="w-full h-full object-contain bg-transparent select-none"
                />
              </div>

              {/* Subtle Bottom Edge Blend into Viewport Floor */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#07070b] via-[#07070b]/45 to-transparent pointer-events-none"
              />
            </div>

            {/* B. FLOATING CONTACT ICON CLUSTER & "CONTACT ME" SPEECH BUBBLE ABOVE THE OPEN PALM */}
            <div
              data-testid="about-contact-cluster"
              className="
                absolute z-20
                left-[39%] sm:left-[41%] md:left-[42%] lg:left-[41%] xl:left-[42%]
                bottom-[19%] sm:bottom-[21%] md:bottom-[23%] lg:bottom-[25%] xl:bottom-[26%]
                w-[230px] h-[250px]
                sm:w-[285px] sm:h-[310px]
                md:w-[325px] md:h-[345px]
                lg:w-[360px] lg:h-[385px]
                xl:w-[395px] xl:h-[415px]
                pointer-events-none
              "
            >
              {/* Animated Swirling Neon-Lime Orbital Light Rings Wrapping the Icons Above the Palm */}
              <svg
                data-testid="about-palm-neon-rings"
                viewBox="0 0 400 320"
                fill="none"
                aria-hidden="true"
                className="about-neon-trail-svg pointer-events-none absolute -inset-x-6 bottom-0 w-[115%] h-[82%] overflow-visible z-10"
              >
                <defs>
                  <linearGradient id="palmSwirlGrad" x1="20" y1="190" x2="375" y2="145" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#ccff00" stopOpacity="0.08" />
                    <stop offset="35%" stopColor="#ccff00" stopOpacity="0.65" />
                    <stop offset="75%" stopColor="#ecfccb" stopOpacity="0.98" />
                    <stop offset="100%" stopColor="#ccff00" stopOpacity="0.15" />
                  </linearGradient>
                  <filter id="palmRingGlow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Outer Tilted Elliptical Guide Ring */}
                <ellipse
                  ref={palmRing1Ref}
                  cx="200"
                  cy="192"
                  rx="168"
                  ry="66"
                  transform="rotate(-12 200 192)"
                  stroke="#ccff00"
                  strokeOpacity="0.32"
                  strokeWidth="1.8"
                  strokeDasharray="18 14"
                />

                {/* Inner Counter-Rotating Elliptical Guide Ring */}
                <ellipse
                  ref={palmRing2Ref}
                  cx="196"
                  cy="202"
                  rx="136"
                  ry="52"
                  transform="rotate(-8 196 202)"
                  stroke="#84cc16"
                  strokeOpacity="0.28"
                  strokeWidth="1.5"
                  strokeDasharray="12 16"
                />

                {/* Luminous Neon-Lime Energy Swirl Arc Sweeping Around the Icons */}
                <path
                  d="M 38 198 C 52 138, 178 118, 298 144 C 368 160, 378 214, 294 242 C 218 266, 108 258, 56 226"
                  stroke="#ccff00"
                  strokeWidth="10"
                  strokeOpacity="0.2"
                  strokeLinecap="round"
                />
                <path
                  d="M 38 198 C 52 138, 178 118, 298 144 C 368 160, 378 214, 294 242 C 218 266, 108 258, 56 226"
                  stroke="url(#palmSwirlGrad)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Traveling White-Lime Highlight Pulse Along the Palm Swirl */}
                <path
                  ref={palmSwirlPulseRef}
                  d="M 38 198 C 52 138, 178 118, 298 144 C 368 160, 378 214, 294 242 C 218 266, 108 258, 56 226"
                  stroke="#ffffff"
                  strokeWidth="4.2"
                  strokeLinecap="round"
                  strokeDasharray="72 448"
                />
              </svg>

              {/* 1. FLOATING "CONTACT ME" / "تواصل معي" SPEECH-BUBBLE LABEL (Outside Icon Faces, Top-Anchored) */}
              <div
                ref={labelEntranceRef}
                data-testid="about-contact-me-wrapper"
                className="
                  absolute
                  -top-8 sm:-top-9 left-[23%] sm:left-[25%] lg:left-[25%]
                  z-30 pointer-events-none
                "
              >
                <div
                  ref={labelFloatRef}
                  className="relative flex flex-col items-start will-change-transform"
                >
                  {/* Three Energetic Neon-Lime Accent Rays at Upper-Left of Bubble (Matching Reference) */}
                  <svg
                    viewBox="0 0 44 36"
                    fill="none"
                    aria-hidden="true"
                    className="w-7 h-6 sm:w-9 sm:h-7 -mb-2 -ml-3 sm:-ml-4 text-[#ccff00]"
                  >
                    <path
                      d="M 8 28 L 22 30"
                      stroke="currentColor"
                      strokeWidth="4.2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 14 14 L 27 22"
                      stroke="currentColor"
                      strokeWidth="4.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 28 6 L 34 18"
                      stroke="currentColor"
                      strokeWidth="4.2"
                      strokeLinecap="round"
                    />
                  </svg>

                  {/* Outlined Neon-Lime Speech Bubble Pill */}
                  <div
                    data-testid="about-contact-me-label"
                    dir={isRtl ? 'rtl' : 'ltr'}
                    style={{
                      transform: 'rotate(-5deg)',
                    }}
                    className="
                      relative px-5 py-2 sm:px-7 sm:py-2.5 lg:px-8 lg:py-3
                      rounded-full
                      bg-[#0e1017]
                      border-2 border-[#ccff00]
                      shadow-[0_14px_32px_rgba(0,0,0,0.85),0_0_24px_rgba(204,255,0,0.38),inset_0_1px_2px_rgba(255,255,255,0.22)]
                      flex items-center justify-center gap-2 whitespace-nowrap
                    "
                  >
                    {/* Subtle Double-Rim Inner Highlight */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-1 rounded-full border border-white/15"
                    />

                    {isRtl ? (
                      <span className="font-ar-heading text-base sm:text-xl lg:text-2xl font-extrabold tracking-tight leading-none flex items-center gap-1.5">
                        <span className="text-white">
                          {aboutConfig.contactLabel.textArPrimary}
                        </span>
                        <span className="text-[#ccff00]">
                          {aboutConfig.contactLabel.textArAccent}
                        </span>
                      </span>
                    ) : (
                      <span className="font-en-heading text-base sm:text-xl lg:text-2xl font-extrabold tracking-tight leading-none flex items-center gap-1.5">
                        <span className="text-white">
                          {aboutConfig.contactLabel.textEnPrimary}
                        </span>
                        <span className="text-[#ccff00]">
                          {aboutConfig.contactLabel.textEnAccent}
                        </span>
                      </span>
                    )}
                  </div>

                  {/* Curved Neon-Lime Pointer Arrow Swooping Down Toward the Two Contact Icons */}
                  <svg
                    data-testid="about-contact-me-pointer"
                    viewBox="0 0 84 68"
                    fill="none"
                    aria-hidden="true"
                    className="w-12 h-10 sm:w-16 sm:h-13 lg:w-18 lg:h-14 -mt-1.5 ml-3 sm:ml-5 text-[#ccff00] overflow-visible"
                  >
                    <path
                      d="M 54 2 C 24 8, 14 26, 20 48 L 11 45 L 26 62 L 36 42 L 27 45 C 24 28, 34 14, 62 8"
                      stroke="currentColor"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="rgba(204,255,0,0.12)"
                    />
                  </svg>
                </div>
              </div>

              {/* 2. WHATSAPP 3D CONTACT ICON (Upper-Right Icon Above the Open Palm) */}
              <div
                ref={waEntranceRef}
                data-testid="about-whatsapp-wrapper"
                style={{
                  zIndex: hoveredIcon === 'whatsapp' ? 45 : 22,
                }}
                className="
                  absolute
                  left-[32%] sm:left-[33%] lg:left-[33%]
                  top-[22%] sm:top-[23%] lg:top-[22%]
                  pointer-events-auto
                "
              >
                <div ref={waFloatRef} className="will-change-transform">
                  <a
                    ref={waHoverRef}
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="about-whatsapp-icon"
                    aria-label={whatsappLabel}
                    title={whatsappLabel}
                    onPointerEnter={() => setHoveredIcon('whatsapp')}
                    onPointerLeave={() =>
                      setHoveredIcon((prev) => (prev === 'whatsapp' ? null : prev))
                    }
                    onFocus={() => setHoveredIcon('whatsapp')}
                    onBlur={() =>
                      setHoveredIcon((prev) => (prev === 'whatsapp' ? null : prev))
                    }
                    className={`
                      group/wa relative block ${aboutConfig.contactIcons.whatsapp.sizeClasses}
                      bg-transparent overflow-visible cursor-pointer
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00] rounded-3xl
                      active:scale-95
                    `}
                  >
                    <WhatsApp3DBadge
                      customImageSrc={aboutConfig.contactIcons.whatsapp.customImageSrc}
                      alt={whatsappLabel}
                      isHovered={hoveredIcon === 'whatsapp'}
                    />

                    {/* Accessible Floating Tooltip Pill on Hover/Focus */}
                    <span
                      dir={isRtl ? 'rtl' : 'ltr'}
                      className="
                        pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2
                        px-2.5 py-1 rounded-lg
                        bg-[#0b0c12]/95 border border-[#ccff00]/70
                        text-[11px] font-semibold text-[#ccff00] whitespace-nowrap
                        shadow-[0_6px_18px_rgba(0,0,0,0.85)]
                        opacity-0 translate-y-1
                        group-hover/wa:opacity-100 group-hover/wa:translate-y-0
                        group-focus-visible/wa:opacity-100 group-focus-visible/wa:translate-y-0
                        transition-all duration-200
                      "
                    >
                      {whatsappLabel}
                    </span>
                  </a>
                </div>
              </div>

              {/* 3. EMAIL 3D CONTACT ICON (Lower-Left Icon Above Open Palm, Controlled Overlap) */}
              <div
                ref={emailEntranceRef}
                data-testid="about-email-wrapper"
                style={{
                  zIndex: hoveredIcon === 'email' ? 45 : 28,
                }}
                className="
                  absolute
                  left-[10%] sm:left-[12%] lg:left-[12%]
                  bottom-[10%] sm:bottom-[10%] lg:bottom-[9%]
                  pointer-events-auto
                "
              >
                <div ref={emailFloatRef} className="will-change-transform">
                  <a
                    ref={emailHoverRef}
                    href={emailHref}
                    data-testid="about-email-icon"
                    aria-label={emailLabel}
                    title={emailLabel}
                    onPointerEnter={() => setHoveredIcon('email')}
                    onPointerLeave={() =>
                      setHoveredIcon((prev) => (prev === 'email' ? null : prev))
                    }
                    onFocus={() => setHoveredIcon('email')}
                    onBlur={() =>
                      setHoveredIcon((prev) => (prev === 'email' ? null : prev))
                    }
                    className={`
                      group/mail relative block ${aboutConfig.contactIcons.email.sizeClasses}
                      bg-transparent overflow-visible cursor-pointer
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00] rounded-3xl
                      active:scale-95
                    `}
                  >
                    <Email3DBadge
                      customImageSrc={aboutConfig.contactIcons.email.customImageSrc}
                      alt={emailLabel}
                      isHovered={hoveredIcon === 'email'}
                    />

                    {/* Accessible Floating Tooltip Pill on Hover/Focus */}
                    <span
                      dir={isRtl ? 'rtl' : 'ltr'}
                      className="
                        pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2
                        px-2.5 py-1 rounded-lg
                        bg-[#0b0c12]/95 border border-[#ccff00]/70
                        text-[11px] font-semibold text-[#ccff00] whitespace-nowrap
                        shadow-[0_6px_18px_rgba(0,0,0,0.85)]
                        opacity-0 -translate-y-1
                        group-hover/mail:opacity-100 group-hover/mail:translate-y-0
                        group-focus-visible/mail:opacity-100 group-focus-visible/mail:translate-y-0
                        transition-all duration-200
                      "
                    >
                      {emailLabel}
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================================
            RIGHT COLUMN (5 cols on lg): PERSONAL INFORMATION & EXPERTISE INDICATORS
           =================================================================== */}
        <div
          data-testid="about-info-column"
          dir={isRtl ? 'rtl' : 'ltr'}
          className={`
            lg:col-span-5 relative z-20
            flex flex-col justify-center
            space-y-2.5 sm:space-y-3.5 lg:space-y-4
            ${isRtl ? 'text-right items-end' : 'text-left items-start'}
            px-2 sm:px-4 lg:px-0
          `}
        >
          {/* 1. Small Section Label: "ABOUT ME // من أنا" + Name & Location */}
          <div
            data-testid="about-section-label"
            dir="ltr"
            className="about-info-reveal inline-flex flex-wrap items-center gap-2 text-xs sm:text-sm font-mono font-semibold tracking-wider text-[#ccff00]"
          >
            <span>{aboutConfig.info.sectionLabel}</span>
            <span className="w-2 h-2 rounded-full bg-[#ccff00] shadow-[0_0_10px_#ccff00]" />
            <span className="text-zinc-400 font-normal text-[11px] sm:text-xs">
              {isRtl
                ? `${aboutConfig.info.nameAr} · ${aboutConfig.info.details.locationAr}`
                : `${aboutConfig.info.nameEn} · ${aboutConfig.info.details.locationEn}`}
            </span>
          </div>

          {/* 2. Main Brand Name Lockup ("M7MD.dsgn") & Professional Title ("Graphic Designer") */}
          <div
            className={`about-info-reveal flex flex-col ${
              isRtl ? 'items-end' : 'items-start'
            } space-y-1.5 sm:space-y-2`}
          >
            {/* Official M7MD.dsgn Cropped Brand Logo Lockup */}
            <h1
              data-testid="about-brand-name"
              dir="ltr"
              className="brand-logo-text inline-flex items-baseline select-none"
            >
              <span className="sr-only">
                {aboutConfig.info.brandName}.{aboutConfig.info.brandSub}
              </span>
              <img
                data-testid="about-brand-logo-img"
                src={aboutConfig.info.logoSrc}
                alt={`${aboutConfig.info.brandName}.${aboutConfig.info.brandSub}`}
                draggable={false}
                decoding="async"
                style={{ objectFit: 'contain' }}
                className="h-9 sm:h-11 md:h-12 lg:h-[52px] xl:h-[58px] w-auto object-contain bg-transparent select-none pointer-events-none"
              />
            </h1>

            {/* Professional Title: "Graphic Designer" + Neon-Lime Curved Brush Swoosh */}
            <div className="relative inline-flex flex-col items-center">
              <h2
                data-testid="about-professional-title"
                dir="ltr"
                className="font-en-heading text-lg sm:text-xl md:text-2xl lg:text-[28px] xl:text-[31px] font-normal tracking-[0.06em] text-zinc-100 leading-tight"
              >
                {aboutConfig.info.professionalTitle}
              </h2>

              {/* Curved Neon-Lime Brush Underline Matching Reference */}
              <svg
                viewBox="0 0 320 20"
                fill="none"
                aria-hidden="true"
                className="w-[88%] h-3 sm:h-3.5 mt-0.5 overflow-visible"
              >
                <path
                  ref={titleSwooshRef}
                  d="M 8 15 C 88 4, 212 3, 312 12 C 224 8, 96 10, 8 15 Z"
                  fill="#ccff00"
                  stroke="#ccff00"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Specialization Tagline */}
            <div
              dir="ltr"
              data-testid="about-specialization"
              className="text-[11px] sm:text-xs font-mono font-medium text-[#ccff00]/90 tracking-wide"
            >
              {aboutConfig.info.specialization}
            </div>
          </div>

          {/* 3. Official 3-Paragraph Biography (Switches Arabic / English Automatically) */}
          <div
            data-testid="about-bio-text"
            className={`
              about-info-reveal
              max-w-xl
              space-y-1.5 sm:space-y-2
              text-xs sm:text-[13px] lg:text-[13.5px] xl:text-[14.5px]
              text-zinc-200/95
              ${
                isRtl
                  ? 'font-ar-body leading-[1.68] font-normal'
                  : 'font-en-body leading-[1.58] font-normal'
              }
            `}
          >
            {(isRtl
              ? aboutConfig.info.bioParagraphsAr
              : aboutConfig.info.bioParagraphsEn
            ).map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* 4. Three Compact Expertise Indicators (Social Media Design, Motion & Video, Creative AI) */}
          <div
            data-testid="about-expertise-strip"
            className="about-info-reveal w-full max-w-xl pt-2 sm:pt-3 border-t border-zinc-800/80 grid grid-cols-3 gap-2 sm:gap-3"
          >
            {aboutConfig.expertiseIndicators.map((indicator, idx) => {
              const label = isRtl ? indicator.labelAr : indicator.labelEn;
              return (
                <div
                  key={indicator.id}
                  data-testid={`about-expertise-${indicator.id}`}
                  className={`
                    about-expertise-item
                    flex flex-col items-center justify-start text-center
                    px-2 py-1 sm:px-3 sm:py-1.5
                    ${
                      idx > 0
                        ? isRtl
                          ? 'border-r border-zinc-800/85'
                          : 'border-l border-zinc-800/85'
                        : ''
                    }
                  `}
                >
                  <div className="mb-1.5 p-1.5 sm:p-2 rounded-xl bg-[#11121a]/80 border border-[#ccff00]/25 shadow-[0_0_16px_rgba(204,255,0,0.08)]">
                    <ExpertiseOutlineIcon type={indicator.iconType} />
                  </div>
                  <span
                    className={`
                      text-[11px] sm:text-xs lg:text-[13px] font-medium text-zinc-200 leading-snug
                      ${isRtl ? 'font-ar-body' : 'font-en-body'}
                    `}
                  >
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
