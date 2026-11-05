import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Play } from 'lucide-react';
import { PortfolioItem } from '../data/portfolioData';
import { Language } from '../locales/translations';
import {
  getFeaturedCardTransformConfig,
  getFeaturedCardWidthClasses,
  parseArtworkAspectRatio,
} from '../utils/portfolio';
import { isVideoAssetUrl } from '../utils/clientDiscovery';

interface FeaturedHighlightsGalleryProps {
  items: PortfolioItem[];
  currentLang: Language;
  onSelectArtwork: (item: PortfolioItem) => void;
}

export const FeaturedHighlightsGallery: React.FC<FeaturedHighlightsGalleryProps> = ({
  items,
  currentLang,
  onSelectArtwork,
}) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const hoverWrappersRef = useRef<(HTMLDivElement | null)[]>([]);
  const floatWrappersRef = useRef<(HTMLDivElement | null)[]>([]);
  const floatTweensRef = useRef<(gsap.core.Tween | null)[]>([]);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [naturalRatios, setNaturalRatios] = useState<Record<string, string>>({});

  const isRtl = currentLang === 'ar';

  // Initialize base staggered positions and continuous unsynchronized idle floating animations
  useEffect(() => {
    const stageEl = stageRef.current;
    if (!stageEl) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      floatTweensRef.current = [];

      items.forEach((_, idx) => {
        const hoverEl = hoverWrappersRef.current[idx];
        const floatEl = floatWrappersRef.current[idx];
        const config = getFeaturedCardTransformConfig(idx);

        if (hoverEl) {
          gsap.set(hoverEl, {
            x: 0,
            y: config.baseTranslateY,
            z: config.baseTranslateZ,
            rotationZ: config.baseRotateZ,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            transformPerspective: 1200,
            transformOrigin: '50% 50%',
            force3D: true,
          });
        }

        if (floatEl) {
          gsap.set(floatEl, {
            y: 0,
            z: 0,
            rotationZ: 0,
            rotationX: 0,
            transformPerspective: 1200,
            transformOrigin: '50% 50%',
            force3D: true,
          });

          if (!prefersReducedMotion) {
            const tween = gsap.to(floatEl, {
              y: config.floatAmplitudeY,
              z: config.floatAmplitudeZ,
              rotationZ: config.floatAmplitudeRotate,
              rotationX: indexToTiltX(idx),
              duration: config.floatDuration,
              delay: config.floatDelay,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
            });
            floatTweensRef.current[idx] = tween;
          }
        }
      });
    }, stageEl);

    return () => {
      ctx.revert();
      floatTweensRef.current = [];
    };
  }, [items]);

  // Interactive 3D Hover & Neighbor Recede via GSAP on dedicated outer hoverWrapperRef
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const duration = prefersReducedMotion ? 0.15 : 0.44;

    items.forEach((_, idx) => {
      const hoverEl = hoverWrappersRef.current[idx];
      const floatTween = floatTweensRef.current[idx];
      if (!hoverEl) return;

      const config = getFeaturedCardTransformConfig(idx);

      if (hoveredIndex === null) {
        // Restore all cards smoothly to their staggered resting pose
        gsap.to(hoverEl, {
          scale: 1,
          x: 0,
          y: config.baseTranslateY,
          z: config.baseTranslateZ,
          rotationZ: config.baseRotateZ,
          rotationX: 0,
          rotationY: 0,
          duration,
          ease: 'power3.out',
          overwrite: 'auto',
        });

        if (floatTween) {
          gsap.to(floatTween, { timeScale: 1, duration: 0.35, overwrite: 'auto' });
        }
      } else if (hoveredIndex === idx) {
        // Hovered card enlarges, lifts forward in Y and Z, and straightens rotation
        gsap.to(hoverEl, {
          scale: config.hoverScale,
          x: 0,
          y: config.baseTranslateY - 18,
          z: 72,
          rotationZ: config.hoverRotateZ,
          rotationX: 2.5,
          rotationY: 0,
          duration,
          ease: 'power3.out',
          overwrite: 'auto',
        });

        if (floatTween) {
          gsap.to(floatTween, { timeScale: 0.25, duration: 0.3, overwrite: 'auto' });
        }
      } else {
        // Neighboring cards subtly recede in scale and depth so hovered artwork is the clear focal point
        const distance = Math.abs(idx - hoveredIndex);
        const horizontalNudge =
          distance === 1 ? (idx < hoveredIndex ? -8 : 8) : 0;

        gsap.to(hoverEl, {
          scale: 0.93,
          x: horizontalNudge,
          y: config.baseTranslateY + 5,
          z: -28,
          rotationZ: config.baseRotateZ * 1.06,
          rotationX: 0,
          rotationY: 0,
          duration,
          ease: 'power3.out',
          overwrite: 'auto',
        });

        if (floatTween) {
          gsap.to(floatTween, { timeScale: 0.75, duration: 0.35, overwrite: 'auto' });
        }
      }
    });
  }, [hoveredIndex, items]);

  const handleImageLoad = (itemId: string, e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (img.naturalWidth > 0 && img.naturalHeight > 0) {
      const loadedRatio = `${img.naturalWidth} / ${img.naturalHeight}`;
      setNaturalRatios((prev) =>
        prev[itemId] === loadedRatio ? prev : { ...prev, [itemId]: loadedRatio }
      );
    }
  };

  const handleVideoMetadataLoad = (itemId: string, e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (video.videoWidth > 0 && video.videoHeight > 0) {
      const loadedRatio = `${video.videoWidth} / ${video.videoHeight}`;
      setNaturalRatios((prev) =>
        prev[itemId] === loadedRatio ? prev : { ...prev, [itemId]: loadedRatio }
      );
    }
  };

  return (
    <div
      ref={stageRef}
      data-testid="featured-highlights-gallery"
      dir="ltr"
      className="relative w-full py-6 sm:py-10 lg:py-12 px-2 sm:px-4 overflow-visible select-none transition-stagger-3"
      style={{
        perspective: '1400px',
      }}
    >
      {/* Subtle Ambient Neon Stage Aura Behind the Floating Artworks */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-8 top-1/2 -translate-y-1/2 h-96 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(204,255,0,0.09)_0%,rgba(204,255,0,0.025)_48%,transparent_75%)] blur-2xl"
      />

      {/* Multi-Row Staggered Overlapping 3D Artwork Stage
          - Desktop (lg/xl): ~4 large cards per row
          - Very wide desktop (2xl): up to 5 cards per row maximum
          - Tablet (md): ~3 cards per row
          - Mobile: 2 cards per row where space permits, 1 on narrow screens */}
      <div
        data-testid="featured-gallery-stage"
        className="relative mx-auto flex flex-wrap items-center justify-center gap-y-10 sm:gap-y-12 lg:gap-y-16 px-2 sm:px-4 lg:px-6 overflow-visible"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {items.map((item, idx) => {
          const config = getFeaturedCardTransformConfig(idx);
          const effectiveRatioInput = naturalRatios[item.id]
            ? naturalRatios[item.id].replace(' / ', ':')
            : item.aspectRatio;
          const parsedRatio = parseArtworkAspectRatio(effectiveRatioInput);
          const cssAspectRatio = naturalRatios[item.id] || parsedRatio.cssAspectRatio;
          const isVideo = item.category === 'motion-ai';
          const isHovered = hoveredIndex === idx;
          const isReceded = hoveredIndex !== null && hoveredIndex !== idx;
          const accessibleTitle = isRtl ? item.titleAr : item.title;

          const responsiveWidthClass = getFeaturedCardWidthClasses(
            parsedRatio.orientation,
            items.length,
            parsedRatio.numericRatio
          );

          return (
            <div
              key={item.id}
              ref={(el) => {
                hoverWrappersRef.current[idx] = el;
              }}
              data-testid={`featured-hover-wrapper-${item.id}`}
              data-card-index={idx}
              style={{
                zIndex: isHovered ? 60 : config.baseZIndex,
                transformStyle: 'preserve-3d',
              }}
              className={`
                relative shrink-0
                ${responsiveWidthClass}
                -mx-1.5 sm:-mx-2 lg:-mx-2.5
                will-change-transform
              `}
            >
              {/* Separate Inner Wrapper for Continuous Unsynchronized Idle Floating Motion */}
              <div
                ref={(el) => {
                  floatWrappersRef.current[idx] = el;
                }}
                data-testid={`featured-float-wrapper-${item.id}`}
                style={{
                  transformStyle: 'preserve-3d',
                }}
                className="w-full h-full will-change-transform"
              >
                {/* Artwork-Only Interactive Button Card (Zero text or metadata overlays) */}
                <button
                  type="button"
                  data-testid={`featured-artwork-card-${item.id}`}
                  data-aspect-ratio={item.aspectRatio}
                  data-orientation={parsedRatio.orientation}
                  aria-label={accessibleTitle}
                  onClick={() => onSelectArtwork(item)}
                  onPointerEnter={() => setHoveredIndex(idx)}
                  onPointerLeave={() =>
                    setHoveredIndex((prev) => (prev === idx ? null : prev))
                  }
                  onFocus={() => setHoveredIndex(idx)}
                  onBlur={() =>
                    setHoveredIndex((prev) => (prev === idx ? null : prev))
                  }
                  style={{
                    aspectRatio: cssAspectRatio,
                  }}
                  className={`
                    group/artwork relative block w-full overflow-hidden rounded-2xl
                    bg-[#0b0b10]
                    border transition-colors duration-200
                    cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00]
                    ${
                      isHovered
                        ? 'border-[#ccff00] shadow-[0_32px_68px_-8px_rgba(0,0,0,0.96),0_0_34px_rgba(204,255,0,0.52),0_0_12px_rgba(204,255,0,0.32)] brightness-105'
                        : isReceded
                        ? 'border-[#ccff00]/22 shadow-[0_14px_30px_-8px_rgba(0,0,0,0.85)] brightness-75'
                        : 'border-[#ccff00]/45 shadow-[0_20px_44px_-10px_rgba(0,0,0,0.92),0_0_20px_rgba(204,255,0,0.14)]'
                    }
                  `}
                >
                  {/* Complete Original Artwork — Never cropped, stretched, or distorted */}
                  {isVideoAssetUrl(item.posterUrl) ? (
                    <video
                      src={item.videoUrl || item.posterUrl}
                      muted
                      playsInline
                      preload="metadata"
                      onLoadedMetadata={(e) => handleVideoMetadataLoad(item.id, e)}
                      className="w-full h-full object-contain block bg-[#08080c] select-none pointer-events-none"
                    />
                  ) : (
                    <img
                      src={item.posterUrl}
                      alt={accessibleTitle}
                      loading="lazy"
                      decoding="async"
                      onLoad={(e) => handleImageLoad(item.id, e)}
                      className="w-full h-full object-contain block bg-[#08080c] select-none pointer-events-none"
                    />
                  )}

                  {/* Subtle Inner Rim Reflection */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 group-hover/artwork:ring-[#ccff00]/40"
                  />

                  {/* Subtle Play Indicator for Video/Motion Items ONLY — Hidden at rest, appears ONLY on hover/focus */}
                  {isVideo && (
                    <div
                      aria-hidden="true"
                      data-testid={`featured-video-indicator-${item.id}`}
                      className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/25 opacity-0 group-hover/artwork:opacity-100 group-focus-visible/artwork:opacity-100 transition-opacity duration-200"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#ccff00]/95 text-[#09090b] flex items-center justify-center shadow-[0_0_24px_rgba(204,255,0,0.65)]">
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      </div>
                    </div>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

function indexToTiltX(index: number): number {
  const tilts = [1.2, -1.0, 1.4, -1.2, 0.9, -1.3, 1.1, -0.9, 1.3, -1.1];
  return tilts[index % tilts.length];
}
