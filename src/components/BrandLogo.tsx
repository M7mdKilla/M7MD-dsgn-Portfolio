import React from 'react';
import { siteConfig } from '../config/siteConfig';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withSubtext?: boolean;
  variant?: 'cropped' | 'original';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  withSubtext = false,
  variant = 'cropped',
}) => {
  const heightClass = siteConfig.logo.heights[size] || siteConfig.logo.heights.md;
  const logoSrc =
    variant === 'original'
      ? siteConfig.logo.originalSrc
      : siteConfig.logo.croppedSrc;

  return (
    <div dir="ltr" className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <img
        data-testid={`brand-logo-img-${size}`}
        src={logoSrc}
        alt={siteConfig.logo.alt}
        draggable={false}
        decoding="async"
        style={{ objectFit: siteConfig.logo.objectFit }}
        className={`${heightClass} w-auto object-contain bg-transparent select-none pointer-events-none block`}
      />

      {withSubtext && (
        <span className="hidden sm:inline-block text-[11px] font-mono tracking-widest uppercase text-zinc-500 border-l border-zinc-800 pl-2.5">
          Motion &amp; AI
        </span>
      )}
    </div>
  );
};

