/**
 * M7MD.dsgn — Full-Screen Interactive Services Showcase
 *
 * Features:
 * - Single-viewport (100dvh / no vertical scroll) responsive composition with a dedicated,
 *   unobstructed horizontal heading area above the cards.
 * - Exactly two large interactive service cards with opposite subtle tilts & restrained overlap:
 *   01 — Static Social Media Design:
 *        Oversized integrated SVG artwork at UPPER-LEFT (outer corner, ~50% card area)
 *        Number "01" at UPPER-RIGHT (inner corner)
 *   02 — Motion & AI Creative Video:
 *        Oversized integrated SVG artwork at UPPER-RIGHT (outer corner, ~50% card area)
 *        Number "02" at UPPER-LEFT (inner corner)
 * - Unsynchronized GSAP idle floating, SVG stroke-dashoffset & highlight path motion, border light beams,
 *   and 540ms interactive hover focus/recede physics.
 */

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import { Language, translations } from '../locales/translations';
import {
  SERVICES_SHOWCASE_CARDS,
  ServiceCardId,
  getServiceCardInteractionState,
} from '../utils/portfolio';

interface ServicesSectionProps {
  currentLang: Language;
  onSelectServiceAndContact: (service: 'static' | 'motion-ai') => void;
}

/**
 * Oversized Custom Geometric SVG Vector Artwork for Card 01: Static Social Media Design
 * Anchored at the UPPER-LEFT (outer) corner (~50% of the card's visual area), partially extending
 * beyond the top and left boundaries while emerging from the card's internal grid architecture.
 */
const StaticDesignVectorArtwork: React.FC<{ isHovered: boolean }> = ({ isHovered }) => {
  return (
    <svg
      data-testid="service-static-vector-svg"
      viewBox="0 0 440 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-full h-full overflow-visible select-none pointer-events-none"
    >
      <defs>
        {/* Deep Charcoal Architectural Plane Gradients */}
        <linearGradient id="staticPlaneDark" x1="360" y1="20" x2="30" y2="310" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#191c26" stopOpacity="0.96" />
          <stop offset="55%" stopColor="#11131a" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#0b0c10" stopOpacity="0.78" />
        </linearGradient>

        <linearGradient id="staticPlaneMid" x1="290" y1="10" x2="20" y2="260" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#222634" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#12141c" stopOpacity="0.9" />
        </linearGradient>

        {/* Neon-Lime Vector Stroke Gradients */}
        <linearGradient id="staticLimeStroke" x1="380" y1="320" x2="15" y2="12" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ccff00" stopOpacity="0.08" />
          <stop offset="38%" stopColor="#ccff00" stopOpacity="0.55" />
          <stop offset="82%" stopColor="#ccff00" stopOpacity="0.98" />
          <stop offset="100%" stopColor="#f4ff99" stopOpacity="1" />
        </linearGradient>

        <linearGradient id="staticLimeFillGlow" x1="230" y1="20" x2="50" y2="240" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ccff00" stopOpacity="0.22" />
          <stop offset="60%" stopColor="#ccff00" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#ccff00" stopOpacity="0" />
        </linearGradient>

        <radialGradient id="staticCornerAura" cx="26%" cy="26%" r="54%">
          <stop offset="0%" stopColor="#ccff00" stopOpacity={isHovered ? '0.28' : '0.16'} />
          <stop offset="55%" stopColor="#ccff00" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#ccff00" stopOpacity="0" />
        </radialGradient>

        <filter id="staticLimeGlowFilter" x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="4.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Ambient Radial Aura Integrating Upper-Left Corner Artwork with Card Surface */}
      <ellipse cx="120" cy="105" rx="175" ry="135" fill="url(#staticCornerAura)" />

      {/* =======================================================================
          LAYER 0: STRUCTURAL GRID LINES EMERGING FROM INSIDE THE CARD (UPPER-LEFT)
         ======================================================================= */}
      <g className="opacity-75">
        <line x1="12" y1="295" x2="425" y2="295" stroke="url(#staticLimeStroke)" strokeWidth="1" strokeDasharray="4 6" />
        <line x1="8" y1="235" x2="395" y2="235" stroke="#2a2d3d" strokeWidth="1" />
        <line x1="8" y1="175" x2="345" y2="175" stroke="#2a2d3d" strokeWidth="1" />
        <line x1="5" y1="115" x2="295" y2="115" stroke="url(#staticLimeStroke)" strokeWidth="1" strokeDasharray="3 5" />

        <line x1="65" y1="290" x2="65" y2="-4" stroke="url(#staticLimeStroke)" strokeWidth="1" />
        <line x1="135" y1="315" x2="135" y2="0" stroke="#272a38" strokeWidth="1" />
        <line x1="205" y1="330" x2="205" y2="4" stroke="url(#staticLimeStroke)" strokeWidth="1" strokeDasharray="4 6" />
        <line x1="275" y1="340" x2="275" y2="8" stroke="#272a38" strokeWidth="1" />

        {/* Golden Ratio / Diagonal Composition Guide toward Upper-Left Corner */}
        <line x1="368" y1="322" x2="14" y2="-4" stroke="url(#staticLimeStroke)" strokeWidth="1.2" strokeDasharray="8 6" />

        {/* Precision Registration Crop Marks (+) */}
        <g stroke="#ccff00" strokeWidth="1.4" strokeOpacity="0.7">
          <path d="M 270 115 H 280 M 275 110 V 120" />
          <path d="M 200 235 H 210 M 205 230 V 240" />
          <path d="M 60 175 H 70 M 65 170 V 180" />
          <path d="M 10 28 H 22 M 16 22 V 34" />
        </g>
      </g>

      {/* =======================================================================
          LAYER 1 (BACK): OVERSIZED EDITORIAL POSTER FRAME (UPPER-LEFT CORNER)
         ======================================================================= */}
      <g className="svg-float-layer-1">
        {/* Back Tilted 4:5 Campaign Poster Sheet */}
        <g transform="rotate(-6 122 118)">
          <rect
            x="24"
            y="-10"
            width="196"
            height="242"
            rx="16"
            fill="url(#staticPlaneDark)"
            stroke="#32364a"
            strokeWidth="1.5"
          />
          {/* Inner Poster Margin & Swiss Grid */}
          <rect
            x="38"
            y="4"
            width="168"
            height="214"
            rx="10"
            stroke="#ccff00"
            strokeOpacity="0.32"
            strokeWidth="1"
          />
          {/* Poster Header Bar */}
          <line x1="38" y1="38" x2="206" y2="38" stroke="#ccff00" strokeOpacity="0.35" strokeWidth="1" />
          <circle cx="54" cy="21" r="4" fill="#ccff00" fillOpacity="0.8" />
          <circle cx="68" cy="21" r="4" stroke="#f4f4f5" strokeOpacity="0.5" strokeWidth="1.2" />
          <rect x="146" y="17" width="46" height="8" rx="4" fill="#ccff00" fillOpacity="0.28" />

          {/* Geometric Art Frame Inside Back Poster */}
          <rect
            x="52"
            y="52"
            width="140"
            height="98"
            rx="6"
            fill="url(#staticLimeFillGlow)"
            stroke="#ccff00"
            strokeOpacity="0.55"
            strokeWidth="1.3"
          />
          {/* Diagonal Image Frame Crosshairs + Geometric Sun & Prism */}
          <line x1="52" y1="52" x2="192" y2="150" stroke="#ccff00" strokeOpacity="0.22" strokeWidth="1" />
          <line x1="192" y1="52" x2="52" y2="150" stroke="#ccff00" strokeOpacity="0.22" strokeWidth="1" />
          <circle cx="156" cy="80" r="14" stroke="#f4f4f5" strokeOpacity="0.75" strokeWidth="1.6" fill="#ccff00" fillOpacity="0.18" />
          <path
            d="M 60 150 L 104 96 L 144 150 Z"
            fill="#191d28"
            stroke="#ccff00"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M 112 150 L 150 108 L 186 150 Z"
            fill="#12151e"
            stroke="#f4f4f5"
            strokeOpacity="0.7"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />

          {/* Poster Typography Layout Bars */}
          <rect x="52" y="164" width="96" height="10" rx="3" fill="#f4f4f5" fillOpacity="0.88" />
          <rect x="52" y="180" width="128" height="6" rx="3" fill="#71717a" fillOpacity="0.55" />
          <rect x="52" y="192" width="78" height="6" rx="3" fill="#ccff00" fillOpacity="0.75" />
        </g>
      </g>

      {/* =======================================================================
          LAYER 2 (MIDDLE & FOREGROUND): LAYERED CAROUSEL FRAME + TYPOGRAPHY BLOCK
         ======================================================================= */}
      <g className="svg-float-layer-2">
        {/* Middle Overlapping Square 1:1 Social Carousel Frame */}
        <g transform="rotate(4 204 154)">
          <rect
            x="114"
            y="52"
            width="184"
            height="184"
            rx="16"
            fill="url(#staticPlaneMid)"
            stroke="#3f445c"
            strokeWidth="1.5"
          />

          {/* Animated Neon-Lime Perimeter Stroke on Primary Composition Frame */}
          <rect
            className="svg-draw-stroke"
            x="114"
            y="52"
            width="184"
            height="184"
            rx="16"
            stroke="#ccff00"
            strokeWidth="2.4"
            strokeDasharray="220 520"
            strokeDashoffset="0"
            filter="url(#staticLimeGlowFilter)"
          />

          {/* Top Grid Ruler & Aspect Ratio Specifier */}
          <line x1="114" y1="84" x2="298" y2="84" stroke="#2e3244" strokeWidth="1.2" />
          <rect x="130" y="64" width="34" height="8" rx="4" fill="#ccff00" />
          <rect x="170" y="64" width="22" height="8" rx="4" fill="#2e3244" />
          <circle cx="278" cy="68" r="4.5" stroke="#ccff00" strokeWidth="1.5" />

          {/* Large Architectural "Aa" Typography Specimen & Grid Geometry (Readable Left-to-Right) */}
          <g transform="translate(130, 96)">
            <rect
              x="0"
              y="0"
              width="86"
              height="86"
              rx="10"
              fill="#0c0e14"
              stroke="#ccff00"
              strokeOpacity="0.65"
              strokeWidth="1.5"
            />
            <line x1="0" y1="28" x2="86" y2="28" stroke="#ccff00" strokeOpacity="0.18" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="0" y1="62" x2="86" y2="62" stroke="#ccff00" strokeOpacity="0.28" strokeWidth="1" />

            {/* Geometric Vector "A" & "a" Outline */}
            <path
              d="M 16 64 L 31 20 L 46 64 M 21 50 H 41"
              stroke="#f4f4f5"
              strokeWidth="3.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M 69 40 C 69 34, 54 34, 54 43 C 54 51, 69 47, 69 47 V 64 M 69 50 C 60 50, 52 53, 52 59 C 52 64, 60 65, 69 61"
              stroke="#ccff00"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Corner Bounding-Box Selection Nodes */}
            <rect x="-3" y="-3" width="6" height="6" fill="#ccff00" />
            <rect x="83" y="-3" width="6" height="6" fill="#ccff00" />
            <rect x="-3" y="83" width="6" height="6" fill="#ccff00" />
            <rect x="83" y="83" width="6" height="6" fill="#ccff00" />
          </g>

          {/* Right Column Modular Layout Blocks inside Carousel Card */}
          <rect
            x="228"
            y="96"
            width="54"
            height="40"
            rx="7"
            fill="#181b26"
            stroke="#f4f4f5"
            strokeOpacity="0.4"
            strokeWidth="1.2"
          />
          <path d="M 238 124 L 250 108 L 262 120 L 272 112" stroke="#ccff00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

          <rect
            x="228"
            y="144"
            width="54"
            height="38"
            rx="7"
            fill="#ccff00"
            fillOpacity="0.14"
            stroke="#ccff00"
            strokeWidth="1.4"
          />
          <line x1="238" y1="157" x2="272" y2="157" stroke="#ccff00" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="238" y1="168" x2="260" y2="168" stroke="#f4f4f5" strokeWidth="2" strokeLinecap="round" />

          {/* Carousel Slide Indicator Rhythm Bar */}
          <rect x="130" y="198" width="44" height="6" rx="3" fill="#ccff00" />
          <rect x="180" y="198" width="18" height="6" rx="3" fill="#3f445c" />
          <rect x="204" y="198" width="18" height="6" rx="3" fill="#3f445c" />
          <rect x="130" y="212" width="112" height="5" rx="2.5" fill="#71717a" fillOpacity="0.45" />
        </g>

        {/* Foreground Vector Pen Bezier Curve & Anchor Handles Slicing Across Upper-Left Corner */}
        <g>
          <path
            className="svg-draw-stroke"
            d="M 332 258 C 282 148, 162 232, 78 82"
            stroke="#ccff00"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeDasharray="140 300"
            filter="url(#staticLimeGlowFilter)"
          />
          <path
            className="svg-highlight-beam"
            d="M 332 258 C 282 148, 162 232, 78 82"
            stroke="#ffffff"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="36 380"
          />

          {/* Bezier Control Handle Tangents */}
          <line x1="252" y1="186" x2="160" y2="196" stroke="#f4f4f5" strokeOpacity="0.75" strokeWidth="1.3" strokeDasharray="3 3" />
          <circle cx="252" cy="186" r="4.5" fill="#09090b" stroke="#ccff00" strokeWidth="2" />
          <circle cx="160" cy="196" r="4.5" fill="#09090b" stroke="#ccff00" strokeWidth="2" />

          {/* Vertex Anchor Nodes */}
          <rect x="201" y="186" width="10" height="10" rx="2" fill="#ccff00" stroke="#09090b" strokeWidth="2" />
          <circle cx="332" cy="258" r="5" fill="#ccff00" />
          <circle cx="78" cy="82" r="6" fill="#ccff00" stroke="#ffffff" strokeWidth="2" />
        </g>

        {/* Floating Upper-Left Bleed Accent Frame (Extends Controlled Amount Past Card Upper-Left Corner) */}
        <g transform="translate(8, -8)">
          <rect
            x="0"
            y="0"
            width="92"
            height="66"
            rx="12"
            fill="#11131b"
            stroke="#ccff00"
            strokeWidth="2"
            filter="url(#staticLimeGlowFilter)"
          />
          <line x1="14" y1="20" x2="78" y2="20" stroke="#ccff00" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="14" y1="33" x2="58" y2="33" stroke="#f4f4f5" strokeOpacity="0.85" strokeWidth="2" strokeLinecap="round" />
          <rect x="14" y="44" width="24" height="10" rx="3" fill="#ccff00" fillOpacity="0.25" stroke="#ccff00" strokeWidth="1.2" />
          <circle cx="72" cy="47" r="7" stroke="#ccff00" strokeWidth="1.6" />
        </g>
      </g>
    </svg>
  );
};

/**
 * Oversized Custom Geometric SVG Vector Artwork for Card 02: Motion & AI Creative Video
 * Anchored at the UPPER-RIGHT (outer) corner (~50% of the card's visual area), mirroring the Static card
 * and partially extending beyond the top and right boundaries.
 */
const MotionAiVectorArtwork: React.FC<{ isHovered: boolean }> = ({ isHovered }) => {
  return (
    <svg
      data-testid="service-motion-vector-svg"
      viewBox="0 0 440 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-full h-full overflow-visible select-none pointer-events-none"
    >
      <defs>
        <linearGradient id="motionPlaneDark" x1="80" y1="20" x2="415" y2="310" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#191c26" stopOpacity="0.96" />
          <stop offset="55%" stopColor="#11131a" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#0b0c10" stopOpacity="0.78" />
        </linearGradient>

        <linearGradient id="motionPlaneMid" x1="150" y1="10" x2="422" y2="260" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#222634" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#12141c" stopOpacity="0.9" />
        </linearGradient>

        <linearGradient id="motionLimeStroke" x1="60" y1="320" x2="425" y2="12" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ccff00" stopOpacity="0.08" />
          <stop offset="38%" stopColor="#ccff00" stopOpacity="0.55" />
          <stop offset="82%" stopColor="#ccff00" stopOpacity="0.98" />
          <stop offset="100%" stopColor="#f4ff99" stopOpacity="1" />
        </linearGradient>

        <radialGradient id="motionCornerAura" cx="74%" cy="26%" r="54%">
          <stop offset="0%" stopColor="#ccff00" stopOpacity={isHovered ? '0.28' : '0.16'} />
          <stop offset="55%" stopColor="#ccff00" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#ccff00" stopOpacity="0" />
        </radialGradient>

        <filter id="motionLimeGlowFilter" x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="4.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Ambient Radial Aura Integrating Upper-Right Corner Artwork with Card Surface */}
      <ellipse cx="320" cy="105" rx="175" ry="135" fill="url(#motionCornerAura)" />

      {/* =======================================================================
          LAYER 0: STRUCTURAL TIMELINE & VIEWPORT AXES EMERGING FROM CARD (UPPER-RIGHT)
         ======================================================================= */}
      <g className="opacity-75">
        <line x1="15" y1="295" x2="428" y2="295" stroke="url(#motionLimeStroke)" strokeWidth="1" strokeDasharray="4 6" />
        <line x1="45" y1="235" x2="432" y2="235" stroke="#2a2d3d" strokeWidth="1" />
        <line x1="95" y1="175" x2="432" y2="175" stroke="#2a2d3d" strokeWidth="1" />
        <line x1="145" y1="115" x2="435" y2="115" stroke="url(#motionLimeStroke)" strokeWidth="1" strokeDasharray="3 5" />

        <line x1="165" y1="340" x2="165" y2="8" stroke="#272a38" strokeWidth="1" />
        <line x1="235" y1="330" x2="235" y2="4" stroke="url(#motionLimeStroke)" strokeWidth="1" strokeDasharray="4 6" />
        <line x1="305" y1="315" x2="305" y2="0" stroke="#272a38" strokeWidth="1" />
        <line x1="375" y1="290" x2="375" y2="-4" stroke="url(#motionLimeStroke)" strokeWidth="1" />

        {/* Kinetic Diagonal Trajectory Axis toward Upper-Right Corner */}
        <line x1="72" y1="322" x2="426" y2="-4" stroke="url(#motionLimeStroke)" strokeWidth="1.2" strokeDasharray="8 6" />
      </g>

      {/* =======================================================================
          LAYER 1 (BACK): OVERSIZED CINEMATIC 16:9 DIRECTOR FRAME (UPPER-RIGHT BLEED)
         ======================================================================= */}
      <g className="svg-float-layer-1">
        <g transform="rotate(5 305 110)">
          {/* Widescreen Cinematic Viewport Frame Extending Beyond Upper-Right */}
          <rect
            x="184"
            y="-8"
            width="238"
            height="168"
            rx="16"
            fill="url(#motionPlaneDark)"
            stroke="#32364a"
            strokeWidth="1.5"
          />

          {/* Safe-Action Director Corner Brackets */}
          <g stroke="#ccff00" strokeWidth="2.2" strokeLinecap="round">
            <path d="M 200 22 V 8 H 216" />
            <path d="M 406 22 V 8 H 390" />
            <path d="M 200 128 V 142 H 216" />
            <path d="M 406 128 V 142 H 390" />
          </g>

          {/* Concentric Kinetic Sound-Wave & Neural Synthesis Rings */}
          <circle
            cx="303"
            cy="75"
            r="52"
            stroke="#ccff00"
            strokeOpacity="0.28"
            strokeWidth="1.2"
            strokeDasharray="6 6"
          />
          <circle
            className="svg-draw-stroke"
            cx="303"
            cy="75"
            r="38"
            stroke="#ccff00"
            strokeWidth="2"
            strokeDasharray="110 160"
            filter="url(#motionLimeGlowFilter)"
          />
          <ellipse
            cx="303"
            cy="75"
            rx="78"
            ry="28"
            transform="rotate(18 303 75)"
            stroke="#f4f4f5"
            strokeOpacity="0.4"
            strokeWidth="1.2"
            strokeDasharray="10 8"
          />

          {/* Central Geometric Play-Frame Prism */}
          <polygon
            points="290,53 290,97 328,75"
            fill="#ccff00"
            fillOpacity="0.22"
            stroke="#ccff00"
            strokeWidth="2.6"
            strokeLinejoin="round"
            filter="url(#motionLimeGlowFilter)"
          />
          <polygon
            points="296,61 296,89 320,75"
            fill="#f4f4f5"
          />

          {/* Optical Center Crosshair Marks */}
          <line x1="238" y1="75" x2="256" y2="75" stroke="#ccff00" strokeOpacity="0.6" strokeWidth="1.4" />
          <line x1="350" y1="75" x2="368" y2="75" stroke="#ccff00" strokeOpacity="0.6" strokeWidth="1.4" />
        </g>
      </g>

      {/* =======================================================================
          LAYER 2 (MIDDLE & FOREGROUND): 9:16 REEL FRAME + NLE TIMELINE + MOTION PATHS
         ======================================================================= */}
      <g className="svg-float-layer-2">
        {/* Overlapping 9:16 Motion Reel & Timeline Sequencer Panel */}
        <g transform="rotate(-3.5 225 178)">
          <rect
            x="120"
            y="84"
            width="216"
            height="174"
            rx="16"
            fill="url(#motionPlaneMid)"
            stroke="#3f445c"
            strokeWidth="1.5"
          />

          {/* Animated Neon-Lime Perimeter Stroke */}
          <rect
            className="svg-draw-stroke"
            x="120"
            y="84"
            width="216"
            height="174"
            rx="16"
            stroke="#ccff00"
            strokeWidth="2.4"
            strokeDasharray="210 560"
            strokeDashoffset="0"
            filter="url(#motionLimeGlowFilter)"
          />

          {/* Top AI Synthesis Node Constellation & Motion Velocity Curve */}
          <g transform="translate(136, 100)">
            <rect
              x="0"
              y="0"
              width="184"
              height="78"
              rx="10"
              fill="#0c0e14"
              stroke="#2e3244"
              strokeWidth="1.2"
            />

            {/* Speed-Ramped Easing S-Curve */}
            <path
              className="svg-draw-stroke"
              d="M 14 62 C 58 62, 62 16, 112 16 C 142 16, 148 44, 170 20"
              stroke="#ccff00"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeDasharray="120 240"
            />
            <path
              className="svg-highlight-beam"
              d="M 14 62 C 58 62, 62 16, 112 16 C 142 16, 148 44, 170 20"
              stroke="#ffffff"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeDasharray="28 240"
            />

            {/* Keyframe Diamond Markers (◇) */}
            <polygon points="14,56 20,62 14,68 8,62" fill="#ccff00" />
            <polygon points="62,33 68,39 62,45 56,39" fill="#09090b" stroke="#f4f4f5" strokeWidth="1.8" />
            <polygon points="112,10 118,16 112,22 106,16" fill="#ccff00" />
            <polygon points="170,14 176,20 170,26 164,20" fill="#f4f4f5" />

            {/* Kinetic Directional Speed Lines */}
            <line x1="18" y1="24" x2="48" y2="24" stroke="#ccff00" strokeOpacity="0.65" strokeWidth="2" strokeLinecap="round" />
            <line x1="26" y1="34" x2="44" y2="34" stroke="#f4f4f5" strokeOpacity="0.45" strokeWidth="1.6" strokeLinecap="round" />
          </g>

          {/* Multi-Track NLE Timeline Sequencer */}
          <g transform="translate(136, 190)">
            {/* Track 1: Video Frames */}
            <rect x="0" y="0" width="76" height="12" rx="4" fill="#ccff00" fillOpacity="0.25" stroke="#ccff00" strokeWidth="1.4" />
            <rect x="82" y="0" width="62" height="12" rx="4" fill="#1e2230" stroke="#f4f4f5" strokeOpacity="0.5" strokeWidth="1.2" />
            <rect x="150" y="0" width="34" height="12" rx="4" fill="#ccff00" fillOpacity="0.85" />

            {/* Track 2: Motion Keyframes */}
            <rect x="18" y="18" width="98" height="10" rx="4" fill="#ccff00" />
            <rect x="122" y="18" width="48" height="10" rx="4" fill="#2e3244" />

            {/* Track 3: Sound-Sync Waveform Bars */}
            <g stroke="#ccff00" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.8">
              <line x1="8" y1="42" x2="8" y2="48" />
              <line x1="18" y1="38" x2="18" y2="50" />
              <line x1="28" y1="35" x2="28" y2="52" />
              <line x1="38" y1="40" x2="38" y2="48" />
              <line x1="48" y1="34" x2="48" y2="52" />
              <line x1="58" y1="39" x2="58" y2="49" />
              <line x1="68" y1="42" x2="68" y2="47" />
              <line x1="78" y1="36" x2="78" y2="51" />
              <line x1="88" y1="34" x2="88" y2="52" />
              <line x1="98" y1="40" x2="98" y2="48" />
              <line x1="108" y1="37" x2="108" y2="50" />
              <line x1="118" y1="41" x2="118" y2="48" />
            </g>

            {/* Vertical Playhead Needle */}
            <line x1="92" y1="-12" x2="92" y2="54" stroke="#f4f4f5" strokeWidth="2" />
            <polygon points="86,-12 98,-12 92,-4" fill="#ccff00" />
          </g>
        </g>

        {/* Sweeping Kinetic Motion Trajectory Arc Slicing Across Upper-Right Corner */}
        <g>
          <path
            className="svg-draw-stroke"
            d="M 98 188 C 242 42, 386 68, 424 198"
            stroke="#ccff00"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeDasharray="150 320"
            filter="url(#motionLimeGlowFilter)"
          />
          <path
            className="svg-highlight-beam"
            d="M 98 188 C 242 42, 386 68, 424 198"
            stroke="#ffffff"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="40 360"
          />

          {/* Floating Upper-Right Bleed Kinetic Frame (Extends Controlled Amount Past Card Upper-Right Corner) */}
          <g transform="translate(338, -8)">
            <rect
              x="0"
              y="0"
              width="94"
              height="66"
              rx="12"
              fill="#11131b"
              stroke="#ccff00"
              strokeWidth="2"
              filter="url(#motionLimeGlowFilter)"
            />
            {/* Play Symbol & AI Pulse Nodes inside Bleed Badge */}
            <polygon points="22,18 22,48 46,33" fill="#ccff00" />
            <line x1="56" y1="24" x2="78" y2="24" stroke="#f4f4f5" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="56" y1="34" x2="72" y2="34" stroke="#ccff00" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="56" y1="44" x2="66" y2="44" stroke="#71717a" strokeWidth="2" strokeLinecap="round" />
          </g>
        </g>
      </g>
    </svg>
  );
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  currentLang,
  onSelectServiceAndContact,
}) => {
  const t = translations[currentLang];
  const isRtl = currentLang === 'ar';

  const sectionRootRef = useRef<HTMLElement>(null);

  // Outer hover/focus GSAP wrappers (handle base rotation + hover focus/recede)
  const staticFocusRef = useRef<HTMLDivElement>(null);
  const motionFocusRef = useRef<HTMLDivElement>(null);

  // Inner continuous idle float GSAP wrappers
  const staticFloatRef = useRef<HTMLDivElement>(null);
  const motionFloatRef = useRef<HTMLDivElement>(null);

  // Oversized SVG artwork container refs for hover reaction
  const staticArtworkRef = useRef<HTMLDivElement>(null);
  const motionArtworkRef = useRef<HTMLDivElement>(null);

  const [hoveredCard, setHoveredCard] = useState<ServiceCardId | null>(null);
  const [isMobileViewport, setIsMobileViewport] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  // Track responsive breakpoint for mobile vs desktop rotation & scale angles
  useEffect(() => {
    const handleResize = () => {
      setIsMobileViewport(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // =========================================================================
  // 1. CONTINUOUS IDLE ANIMATION (CARDS + SVG VECTOR STROKES + BORDER BEAMS)
  // =========================================================================
  useEffect(() => {
    const rootEl = sectionRootRef.current;
    if (!rootEl) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const staticSpec = SERVICES_SHOWCASE_CARDS.static;
      const motionSpec = SERVICES_SHOWCASE_CARDS['motion-ai'];
      const mobileNow = typeof window !== 'undefined' && window.innerWidth < 768;

      // Initialize resting rotations on focus wrappers
      if (staticFocusRef.current) {
        gsap.set(staticFocusRef.current, {
          rotationZ: mobileNow ? staticSpec.mobileRotateZ : staticSpec.baseRotateZ,
          scale: 1,
          y: 0,
          zIndex: 22,
          transformPerspective: 1200,
          force3D: true,
        });
      }
      if (motionFocusRef.current) {
        gsap.set(motionFocusRef.current, {
          rotationZ: mobileNow ? motionSpec.mobileRotateZ : motionSpec.baseRotateZ,
          scale: 1,
          y: 0,
          zIndex: 20,
          transformPerspective: 1200,
          force3D: true,
        });
      }

      if (prefersReducedMotion) return;

      // Unsynchronized subtle floating loop for Card 01 (Static)
      if (staticFloatRef.current) {
        gsap.to(staticFloatRef.current, {
          y: staticSpec.floatAmplitudeY,
          rotationZ: staticSpec.floatAmplitudeRotate,
          duration: staticSpec.floatDuration,
          delay: staticSpec.floatDelay,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      // Unsynchronized subtle floating loop for Card 02 (Motion & AI)
      if (motionFloatRef.current) {
        gsap.to(motionFloatRef.current, {
          y: motionSpec.floatAmplitudeY,
          rotationZ: motionSpec.floatAmplitudeRotate,
          duration: motionSpec.floatDuration,
          delay: motionSpec.floatDelay,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      // Restrained directional movement on oversized SVG vector layers
      gsap.to('.svg-float-layer-1', {
        y: -4,
        x: -3,
        duration: 4.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.6,
      });

      gsap.to('.svg-float-layer-2', {
        y: 4.5,
        x: 3,
        duration: 5.1,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.75,
      });

      // Continuous SVG stroke-dashoffset animation
      gsap.to('.svg-draw-stroke', {
        strokeDashoffset: -360,
        duration: 9.5,
        repeat: -1,
        ease: 'none',
      });

      // Moving white-lime highlight pulse along geometric SVG paths
      gsap.to('.svg-highlight-beam', {
        strokeDashoffset: -400,
        duration: 5.8,
        repeat: -1,
        ease: 'none',
      });

      // Slow, subtle light movement along portions of each card border
      gsap.to('.card-border-beam', {
        strokeDashoffset: -600,
        duration: 11,
        repeat: -1,
        ease: 'none',
      });

      // Subtle neon glow intensity breathing
      gsap.to('.card-ambient-glow', {
        opacity: 0.85,
        duration: 3.6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.9,
      });
    }, rootEl);

    return () => ctx.revert();
  }, []);

  // =========================================================================
  // 2. INTERACTIVE HOVER FOCUS & RECEDE PHYSICS (450–650ms GSAP TRANSITIONS)
  // =========================================================================
  useEffect(() => {
    const staticEl = staticFocusRef.current;
    const motionEl = motionFocusRef.current;
    if (!staticEl || !motionEl) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const staticTarget = getServiceCardInteractionState(
      'static',
      hoveredCard,
      isMobileViewport
    );
    const motionTarget = getServiceCardInteractionState(
      'motion-ai',
      hoveredCard,
      isMobileViewport
    );

    const dur = prefersReducedMotion ? 0.01 : staticTarget.transitionDuration;

    gsap.set(staticEl, { zIndex: staticTarget.zIndex });
    gsap.set(motionEl, { zIndex: motionTarget.zIndex });

    gsap.to(staticEl, {
      scale: staticTarget.scale,
      y: staticTarget.y,
      rotationZ: staticTarget.rotationZ,
      opacity: staticTarget.opacity,
      filter: `brightness(${staticTarget.brightness})`,
      duration: dur,
      ease: 'power3.out',
      overwrite: 'auto',
    });

    gsap.to(motionEl, {
      scale: motionTarget.scale,
      y: motionTarget.y,
      rotationZ: motionTarget.rotationZ,
      opacity: motionTarget.opacity,
      filter: `brightness(${motionTarget.brightness})`,
      duration: dur,
      ease: 'power3.out',
      overwrite: 'auto',
    });

    if (staticArtworkRef.current) {
      gsap.to(staticArtworkRef.current, {
        scale: staticTarget.artworkScale,
        x: staticTarget.artworkShiftX,
        y: staticTarget.artworkShiftY,
        duration: dur,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    }

    if (motionArtworkRef.current) {
      gsap.to(motionArtworkRef.current, {
        scale: motionTarget.artworkScale,
        x: motionTarget.artworkShiftX,
        y: motionTarget.artworkShiftY,
        duration: dur,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    }
  }, [hoveredCard, isMobileViewport]);

  const staticCardSpec = SERVICES_SHOWCASE_CARDS.static;
  const motionCardSpec = SERVICES_SHOWCASE_CARDS['motion-ai'];

  const staticTitle = isRtl ? staticCardSpec.titleAr : staticCardSpec.titleEn;
  const staticDesc = isRtl ? staticCardSpec.descriptionAr : staticCardSpec.descriptionEn;
  const staticCta = isRtl ? staticCardSpec.ctaAr : staticCardSpec.ctaEn;

  const motionTitle = isRtl ? motionCardSpec.titleAr : motionCardSpec.titleEn;
  const motionDesc = isRtl ? motionCardSpec.descriptionAr : motionCardSpec.descriptionEn;
  const motionCta = isRtl ? motionCardSpec.ctaAr : motionCardSpec.ctaEn;

  return (
    <section
      ref={sectionRootRef}
      data-testid="services-section-root"
      aria-label={t.services.title}
      className="
        relative w-full
        h-[calc(100dvh-4rem)] sm:h-[calc(100dvh-4.5rem)] max-h-full
        overflow-hidden
        bg-[#09090b]
        flex flex-col items-center
        px-4 sm:px-8 lg:px-14
        pt-2 sm:pt-4 lg:pt-5
        pb-3 sm:pb-5 lg:pb-7
        select-none
      "
    >
      {/* Subtle Background Atmospheric Lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden z-0"
      >
        <div
          className="
            card-ambient-glow absolute left-1/2 top-[56%] -translate-x-1/2 -translate-y-1/2
            w-[560px] sm:w-[780px] lg:w-[980px] h-[320px] sm:h-[400px]
            rounded-full opacity-55
          "
          style={{
            background:
              'radial-gradient(circle, rgba(204,255,0,0.11) 0%, rgba(204,255,0,0.03) 50%, transparent 75%)',
          }}
        />
      </div>

      {/* =========================================================================
          RESERVED HORIZONTAL HEADING AREA ABOVE BOTH CARDS (NO OVERLAP)
         ========================================================================= */}
      <header
        data-testid="services-page-header"
        dir={isRtl ? 'rtl' : 'ltr'}
        className="
          relative z-30 w-full max-w-3xl mx-auto shrink-0
          text-center
          pt-0.5 sm:pt-1
          pb-3 sm:pb-5 md:pb-8 lg:pb-10
          transition-stagger-1
        "
      >
        <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-mono tracking-widest uppercase text-[#ccff00]/90 mb-1">
          <span>04</span>
          <span aria-hidden="true">·</span>
          <span>{isRtl ? 'الخدمات الإبداعية' : 'Creative Disciplines'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[42px] font-extrabold text-white tracking-tight leading-tight">
          {t.services.title}
        </h1>
      </header>

      {/* =========================================================================
          TWO LARGE INTERACTIVE SERVICE CARDS STAGE (CLEARLY SEPARATED BELOW HEADING)
          - Card 01 (Left): SVG Artwork at UPPER-LEFT (outer), Number "01" at UPPER-RIGHT (inner)
          - Card 02 (Right): Number "02" at UPPER-LEFT (inner), SVG Artwork at UPPER-RIGHT (outer)
         ========================================================================= */}
      <div
        dir="ltr"
        data-testid="services-cards-stage"
        className="
          relative z-20 flex-1 w-full max-w-[1160px] mx-auto
          flex flex-col md:flex-row items-center justify-center
          gap-5 sm:gap-6 md:gap-0
          pt-3 sm:pt-4 md:pt-5 lg:pt-6
          pb-1 sm:pb-2
          min-h-0
          transition-stagger-2
        "
      >
        {/* =======================================================================
            CARD 01: STATIC SOCIAL MEDIA DESIGN
            - Oversized SVG Artwork: UPPER-LEFT corner (outer side)
            - Number "01": UPPER-RIGHT corner (inner side)
           ======================================================================= */}
        <div
          ref={staticFocusRef}
          data-testid="service-card-static-wrapper"
          className="
            relative
            w-[92%] max-w-[400px] sm:max-w-[440px]
            md:w-[48%] md:max-w-[465px]
            lg:w-[490px] lg:max-w-[500px]
            xl:w-[530px] xl:max-w-[530px]
            h-[198px] sm:h-[222px] md:h-[365px] lg:h-[405px] xl:h-[428px]
            md:-mr-1.5 lg:-mr-2.5
            will-change-transform
          "
        >
          <div ref={staticFloatRef} className="w-full h-full will-change-transform">
            <div
              role="button"
              tabIndex={0}
              data-testid="service-card-static"
              aria-label={`${staticCardSpec.number} — ${staticTitle}. ${staticDesc}`}
              onClick={() => onSelectServiceAndContact('static')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectServiceAndContact('static');
                }
              }}
              onPointerEnter={() => setHoveredCard('static')}
              onPointerLeave={() =>
                setHoveredCard((prev) => (prev === 'static' ? null : prev))
              }
              onFocus={() => setHoveredCard('static')}
              onBlur={() =>
                setHoveredCard((prev) => (prev === 'static' ? null : prev))
              }
              style={{
                boxShadow:
                  hoveredCard === 'static'
                    ? '0 30px 75px -12px rgba(0,0,0,0.95), 0 0 42px rgba(204,255,0,0.28), inset 0 1px 1px rgba(255,255,255,0.18)'
                    : '0 22px 50px -15px rgba(0,0,0,0.88), 0 0 22px rgba(204,255,0,0.10), inset 0 1px 1px rgba(255,255,255,0.08)',
              }}
              className={`
                group/static relative w-full h-full rounded-[26px] sm:rounded-[32px]
                bg-gradient-to-br from-[#14161f] via-[#0f1017] to-[#0a0b0f]
                border transition-colors duration-500
                ${
                  hoveredCard === 'static'
                    ? 'border-[#ccff00]'
                    : 'border-[#ccff00]/35 hover:border-[#ccff00]/80'
                }
                overflow-visible cursor-pointer
                flex flex-col justify-between
                p-4 sm:p-6 md:p-7 lg:p-8
                focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00]
              `}
            >
              {/* Clipped Inner Atmospheric Lighting & Subtle Surface Gradient */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[26px] sm:rounded-[32px] overflow-hidden z-0"
              >
                {/* Upper-Left Radial Glow Under Static Artwork */}
                <div
                  className="card-ambient-glow absolute -top-16 -left-16 w-64 h-64 sm:w-80 sm:h-80 rounded-full opacity-60"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(204,255,0,0.18) 0%, rgba(204,255,0,0.04) 55%, transparent 75%)',
                  }}
                />
                {/* Bottom Text Legibility Scrim */}
                <div className="absolute inset-x-0 bottom-0 h-[64%] bg-gradient-to-t from-[#090a0f] via-[#0c0d14]/92 to-transparent" />
              </div>

              {/* Animated Thin Neon-Lime Border Light Beam Around Card Edges */}
              <svg
                aria-hidden="true"
                viewBox="0 0 500 440"
                preserveAspectRatio="none"
                className="pointer-events-none absolute inset-0 w-full h-full rounded-[26px] sm:rounded-[32px] z-10 overflow-visible"
              >
                <rect
                  className="card-border-beam"
                  x="1"
                  y="1"
                  width="498"
                  height="438"
                  rx="30"
                  fill="none"
                  stroke="#ccff00"
                  strokeWidth="2"
                  strokeOpacity={hoveredCard === 'static' ? '0.95' : '0.55'}
                  strokeDasharray="140 460"
                />
              </svg>

              {/* =================================================================
                  OVERSIZED INTEGRATED VECTOR ARTWORK — UPPER-LEFT CORNER (~50% AREA)
                  Faces the outer-left side of the two-card composition
                 ================================================================= */}
              <div
                ref={staticArtworkRef}
                data-testid="service-static-artwork-container"
                className="
                  pointer-events-none absolute
                  -top-2.5 -left-2.5
                  sm:-top-4 sm:-left-3.5
                  md:-top-5 md:-left-5
                  lg:-top-6 lg:-left-6
                  w-[50%] h-[48%]
                  sm:w-[55%] sm:h-[52%]
                  md:w-[64%] md:h-[58%]
                  lg:w-[66%] lg:h-[60%]
                  z-15 will-change-transform
                "
              >
                <StaticDesignVectorArtwork isHovered={hoveredCard === 'static'} />
              </div>

              {/* Upper-Right Number "01" Badge (Inner Side, Closer to Center) */}
              <div
                data-testid="service-static-number"
                className="relative z-20 flex items-center gap-2.5 self-end"
              >
                <span
                  aria-hidden="true"
                  className="w-6 sm:w-8 h-px bg-gradient-to-l from-[#ccff00]/70 to-transparent"
                />
                <span className="font-mono text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-[#ccff00] drop-shadow-[0_0_14px_rgba(204,255,0,0.35)] tabular-nums">
                  {staticCardSpec.number}
                </span>
              </div>

              {/* Bottom Concise Text Block (Clear of Upper-Left Artwork & Inner Overlap Seam) */}
              <div
                dir={isRtl ? 'rtl' : 'ltr'}
                className="relative z-20 mt-auto pt-4 sm:pt-6 md:pt-8 w-full md:pr-7 lg:pr-9 space-y-1 sm:space-y-2 text-start"
              >
                <h2 className="text-base sm:text-xl md:text-2xl lg:text-[26px] font-extrabold text-white tracking-tight leading-snug">
                  {staticTitle}
                </h2>
                <p className="text-[11px] sm:text-sm lg:text-[15px] text-zinc-300 leading-relaxed max-w-[42ch]">
                  {staticDesc}
                </p>

                {/* Subtle Interactive Action Prompt */}
                <div className="pt-0.5 sm:pt-1.5 inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-[#ccff00] group-hover/static:translate-x-0.5 transition-transform">
                  <span>{staticCta}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =======================================================================
            CARD 02: MOTION & AI CREATIVE VIDEO
            - Number "02": UPPER-LEFT corner (inner side)
            - Oversized SVG Artwork: UPPER-RIGHT corner (outer side)
           ======================================================================= */}
        <div
          ref={motionFocusRef}
          data-testid="service-card-motion-wrapper"
          className="
            relative
            w-[92%] max-w-[400px] sm:max-w-[440px]
            md:w-[48%] md:max-w-[465px]
            lg:w-[490px] lg:max-w-[500px]
            xl:w-[530px] xl:max-w-[530px]
            h-[198px] sm:h-[222px] md:h-[365px] lg:h-[405px] xl:h-[428px]
            md:-ml-1.5 lg:-ml-2.5
            will-change-transform
          "
        >
          <div ref={motionFloatRef} className="w-full h-full will-change-transform">
            <div
              role="button"
              tabIndex={0}
              data-testid="service-card-motion"
              aria-label={`${motionCardSpec.number} — ${motionTitle}. ${motionDesc}`}
              onClick={() => onSelectServiceAndContact('motion-ai')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectServiceAndContact('motion-ai');
                }
              }}
              onPointerEnter={() => setHoveredCard('motion-ai')}
              onPointerLeave={() =>
                setHoveredCard((prev) => (prev === 'motion-ai' ? null : prev))
              }
              onFocus={() => setHoveredCard('motion-ai')}
              onBlur={() =>
                setHoveredCard((prev) => (prev === 'motion-ai' ? null : prev))
              }
              style={{
                boxShadow:
                  hoveredCard === 'motion-ai'
                    ? '0 30px 75px -12px rgba(0,0,0,0.95), 0 0 42px rgba(204,255,0,0.28), inset 0 1px 1px rgba(255,255,255,0.18)'
                    : '0 22px 50px -15px rgba(0,0,0,0.88), 0 0 22px rgba(204,255,0,0.10), inset 0 1px 1px rgba(255,255,255,0.08)',
              }}
              className={`
                group/motion relative w-full h-full rounded-[26px] sm:rounded-[32px]
                bg-gradient-to-bl from-[#14161f] via-[#0f1017] to-[#0a0b0f]
                border transition-colors duration-500
                ${
                  hoveredCard === 'motion-ai'
                    ? 'border-[#ccff00]'
                    : 'border-[#ccff00]/35 hover:border-[#ccff00]/80'
                }
                overflow-visible cursor-pointer
                flex flex-col justify-between
                p-4 sm:p-6 md:p-7 lg:p-8
                focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00]
              `}
            >
              {/* Clipped Inner Atmospheric Lighting & Subtle Surface Gradient */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[26px] sm:rounded-[32px] overflow-hidden z-0"
              >
                {/* Upper-Right Radial Glow Under Motion Artwork */}
                <div
                  className="card-ambient-glow absolute -top-16 -right-16 w-64 h-64 sm:w-80 sm:h-80 rounded-full opacity-60"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(204,255,0,0.18) 0%, rgba(204,255,0,0.04) 55%, transparent 75%)',
                  }}
                />
                {/* Bottom Text Legibility Scrim */}
                <div className="absolute inset-x-0 bottom-0 h-[64%] bg-gradient-to-t from-[#090a0f] via-[#0c0d14]/92 to-transparent" />
              </div>

              {/* Animated Thin Neon-Lime Border Light Beam Around Card Edges */}
              <svg
                aria-hidden="true"
                viewBox="0 0 500 440"
                preserveAspectRatio="none"
                className="pointer-events-none absolute inset-0 w-full h-full rounded-[26px] sm:rounded-[32px] z-10 overflow-visible"
              >
                <rect
                  className="card-border-beam"
                  x="1"
                  y="1"
                  width="498"
                  height="438"
                  rx="30"
                  fill="none"
                  stroke="#ccff00"
                  strokeWidth="2"
                  strokeOpacity={hoveredCard === 'motion-ai' ? '0.95' : '0.55'}
                  strokeDasharray="140 460"
                  strokeDashoffset="-240"
                />
              </svg>

              {/* =================================================================
                  OVERSIZED INTEGRATED VECTOR ARTWORK — UPPER-RIGHT CORNER (~50% AREA)
                  Faces the outer-right side of the two-card composition
                 ================================================================= */}
              <div
                ref={motionArtworkRef}
                data-testid="service-motion-artwork-container"
                className="
                  pointer-events-none absolute
                  -top-2.5 -right-2.5
                  sm:-top-4 sm:-right-3.5
                  md:-top-5 md:-right-5
                  lg:-top-6 lg:-right-6
                  w-[50%] h-[48%]
                  sm:w-[55%] sm:h-[52%]
                  md:w-[64%] md:h-[58%]
                  lg:w-[66%] lg:h-[60%]
                  z-15 will-change-transform
                "
              >
                <MotionAiVectorArtwork isHovered={hoveredCard === 'motion-ai'} />
              </div>

              {/* Upper-Left Number "02" Badge (Inner Side, Closer to Center) */}
              <div
                data-testid="service-motion-number"
                className="relative z-20 flex items-center gap-2.5 self-start"
              >
                <span className="font-mono text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-[#ccff00] drop-shadow-[0_0_14px_rgba(204,255,0,0.35)] tabular-nums">
                  {motionCardSpec.number}
                </span>
                <span
                  aria-hidden="true"
                  className="w-6 sm:w-8 h-px bg-gradient-to-r from-[#ccff00]/70 to-transparent"
                />
              </div>

              {/* Bottom Concise Text Block (Clear of Upper-Right Artwork & Inner Overlap Seam) */}
              <div
                dir={isRtl ? 'rtl' : 'ltr'}
                className="relative z-20 mt-auto pt-4 sm:pt-6 md:pt-8 w-full md:pl-7 lg:pl-9 space-y-1 sm:space-y-2 text-start"
              >
                <h2 className="text-base sm:text-xl md:text-2xl lg:text-[26px] font-extrabold text-white tracking-tight leading-snug">
                  {motionTitle}
                </h2>
                <p className="text-[11px] sm:text-sm lg:text-[15px] text-zinc-300 leading-relaxed max-w-[42ch]">
                  {motionDesc}
                </p>

                {/* Subtle Interactive Action Prompt */}
                <div className="pt-0.5 sm:pt-1.5 inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-[#ccff00] group-hover/motion:translate-x-0.5 transition-transform">
                  <span>{motionCta}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Viewport Breathing Spacer */}
      <div aria-hidden="true" className="h-1 sm:h-2 shrink-0" />
    </section>
  );
};
