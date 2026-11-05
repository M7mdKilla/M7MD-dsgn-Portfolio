import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { siteConfig } from '../config/siteConfig';

// Disable lagSmoothing cap so orbital motion always runs in true real-time
gsap.ticker.lagSmoothing(0);

export interface OrbitBadgesProps {
  prefersReducedMotion?: boolean;
}

export const OrbitBadges: React.FC<OrbitBadgesProps> = ({
  prefersReducedMotion = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const outerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const innerCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const glowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const getResponsiveScale = () => {
      const width = window.innerWidth;
      if (width < 480) return 0.58;
      if (width < 640) return 0.68;
      if (width < 1024) return 0.85;
      return 1;
    };

    let radiusScale = getResponsiveScale();
    const handleResize = () => {
      radiusScale = getResponsiveScale();
    };
    window.addEventListener('resize', handleResize);

    // Helper to position an icon at a given angle in radians
    const applyOrbitTransform = (index: number, angleRad: number) => {
      const badge = siteConfig.orbitIcons[index];
      const outerEl = outerRefs.current[index];
      const glowEl = glowRefs.current[index];
      if (!badge || !outerEl) return;

      const rx = badge.orbitRadiusX * radiusScale;
      const ry = badge.orbitRadiusY * radiusScale;

      const rawX = Math.cos(angleRad) * rx;
      const rawY = Math.sin(angleRad) * ry;

      // Tilt the elliptical plane in 2D screen space
      const tiltRad = (badge.tiltAngle * Math.PI) / 180;
      const tiltedX = rawX * Math.cos(tiltRad) - rawY * Math.sin(tiltRad);
      // Vertical offset (+38px scaled) centers the orbit around the chest/shoulders
      const tiltedY = rawX * Math.sin(tiltRad) + rawY * Math.cos(tiltRad) + 38 * radiusScale;

      // Normalized depth: 0 = farthest behind portrait (rawY = -ry), 1 = closest in front (rawY = +ry)
      const normalizedDepth = (rawY + ry) / (2 * ry);

      // Perspective scale & opacity based on orbital depth
      const depthScale = 0.72 + normalizedDepth * 0.38; // 0.72 at back -> 1.10 at front
      const depthOpacity = 0.68 + normalizedDepth * 0.32; // 0.68 at back -> 1.00 at front

      // True depth layering relative to Portrait (z-20) and Bottom Wave (z-25):
      // Back half of orbit (sin(angle) < 0) -> zIndex 10 (behind portrait)
      // Front half of orbit (sin(angle) >= 0) -> zIndex 30 (in front of portrait)
      const isFront = rawY >= 0;
      const zIndex = isFront ? 30 : 10;

      gsap.set(outerEl, {
        x: Math.round(tiltedX * 100) / 100,
        y: Math.round(tiltedY * 100) / 100,
        scale: Math.round(depthScale * 1000) / 1000,
        opacity: Math.round(depthOpacity * 1000) / 1000,
        zIndex,
        force3D: true,
      });

      if (glowEl) {
        glowEl.style.opacity = isFront ? '0.85' : '0.25';
      }
    };

    // Place all icons at their initial orbital coordinates immediately
    siteConfig.orbitIcons.forEach((badge, idx) => {
      const startRad = (badge.initialAngle * Math.PI) / 180;
      applyOrbitTransform(idx, startRad);
    });

    if (prefersReducedMotion) {
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }

    const ctx = gsap.context(() => {
      siteConfig.orbitIcons.forEach((badge, idx) => {
        const startRad = (badge.initialAngle * Math.PI) / 180;
        const proxy = { angle: startRad };

        // Continuous linear orbital revolution via GSAP tween
        gsap.to(proxy, {
          angle: startRad + Math.PI * 2,
          duration: badge.orbitPeriod,
          ease: 'none',
          repeat: -1,
          onUpdate: () => {
            applyOrbitTransform(idx, proxy.angle);
          },
        });

        // Subtle independent floating bob on the inner card wrapper
        const cardEl = innerCardRefs.current[idx];
        if (cardEl) {
          gsap.to(cardEl, {
            y: -7,
            duration: 2.2 + (idx % 3) * 0.4,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: idx * 0.25,
          });
        }
      });
    }, container);

    return () => {
      window.removeEventListener('resize', handleResize);
      ctx.revert();
    };
  }, [prefersReducedMotion]);

  const handleMouseEnter = (idx: number) => {
    if (prefersReducedMotion) return;
    const cardEl = innerCardRefs.current[idx];
    if (cardEl) {
      gsap.to(cardEl, {
        scale: 1.18,
        rotate: 4,
        duration: 0.26,
        ease: 'back.out(2)',
        overwrite: 'auto',
      });
    }
  };

  const handleMouseLeave = (idx: number) => {
    if (prefersReducedMotion) return;
    const cardEl = innerCardRefs.current[idx];
    if (cardEl) {
      gsap.to(cardEl, {
        scale: 1,
        rotate: 0,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
  };

  const handleMouseDown = (idx: number) => {
    if (prefersReducedMotion) return;
    const cardEl = innerCardRefs.current[idx];
    if (cardEl) {
      gsap.to(cardEl, {
        scale: 0.94,
        duration: 0.1,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
  };

  const handleMouseUp = (idx: number) => {
    if (prefersReducedMotion) return;
    const cardEl = innerCardRefs.current[idx];
    if (cardEl) {
      gsap.to(cardEl, {
        scale: 1.18,
        duration: 0.18,
        ease: 'back.out(2)',
        overwrite: 'auto',
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none"
      aria-label="Orbiting 3D Creative Tool Icons"
    >
      {siteConfig.orbitIcons.map((badge, index) => (
        <div
          key={badge.id}
          ref={(el) => {
            outerRefs.current[index] = el;
          }}
          data-orbit-id={badge.id}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto will-change-transform"
        >
          {/* Entrance wrapper targeted by HomeHero master entrance timeline */}
          <div className="orbit-entrance-item will-change-transform">
            {/* Inner interactive wrapper for floating bob & hover/press micro-animations */}
            <div
              ref={(el) => {
                innerCardRefs.current[index] = el;
              }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              onMouseDown={() => handleMouseDown(index)}
              onMouseUp={() => handleMouseUp(index)}
              className="relative cursor-pointer group select-none will-change-transform"
            >
              {/* Floating Tooltip with Name & Neon Indicator */}
              <div className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-[#0e0e14]/95 border border-[#ccff00]/40 text-[11px] font-mono font-semibold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg z-50 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00]" />
                <span>{badge.name}</span>
              </div>

              {/* 3D Asset PNG Container with GPU-composited shadow */}
              <div className="w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 flex items-center justify-center p-1">
                <img
                  src={badge.assetPath}
                  alt={badge.name}
                  className="w-full h-full object-contain select-none pointer-events-none"
                  draggable={false}
                  onError={(e) => {
                    e.currentTarget.src = `/images/orbit/${badge.id}.svg`;
                  }}
                />
              </div>

              {/* Luminous Neon-Lime Specular Backglow using zero-blur radial gradient */}
              <div
                ref={(el) => {
                  glowRefs.current[index] = el;
                }}
                style={{
                  background:
                    'radial-gradient(circle, rgba(204,255,0,0.32) 0%, rgba(204,255,0,0.08) 55%, transparent 75%)',
                }}
                className="absolute -inset-3 rounded-full -z-10 pointer-events-none transition-opacity duration-300"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
