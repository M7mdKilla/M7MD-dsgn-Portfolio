import React from 'react';
import { aboutConfig } from '../config/aboutConfig';

interface Badge3DProps {
  customImageSrc?: string;
  alt: string;
  isHovered?: boolean;
}

/**
 * Independent 3D WhatsApp contact icon image element.
 * Renders the exact uploaded `/images/about/01_WhatsApp_3D.png` asset
 * with `object-fit: contain`, preserving full PNG transparency and original proportions.
 */
export const WhatsApp3DBadge: React.FC<Badge3DProps> = ({
  customImageSrc,
  alt,
  isHovered = false,
}) => {
  const src = customImageSrc || aboutConfig.contactIcons.whatsapp.assetPath;

  return (
    <img
      data-testid="about-whatsapp-img"
      src={src}
      alt={alt}
      draggable={false}
      decoding="async"
      style={{ objectFit: 'contain' }}
      className={`w-full h-full block object-contain bg-transparent select-none pointer-events-none transition-transform duration-300 ${
        isHovered ? 'brightness-105' : ''
      }`}
    />
  );
};

/**
 * Independent 3D Email contact icon image element.
 * Renders the exact uploaded `/images/about/02_Email_3D.png` asset
 * with `object-fit: contain`, preserving full PNG transparency and original proportions.
 */
export const Email3DBadge: React.FC<Badge3DProps> = ({
  customImageSrc,
  alt,
  isHovered = false,
}) => {
  const src = customImageSrc || aboutConfig.contactIcons.email.assetPath;

  return (
    <img
      data-testid="about-email-img"
      src={src}
      alt={alt}
      draggable={false}
      decoding="async"
      style={{ objectFit: 'contain' }}
      className={`w-full h-full block object-contain bg-transparent select-none pointer-events-none transition-transform duration-300 ${
        isHovered ? 'brightness-105' : ''
      }`}
    />
  );
};
