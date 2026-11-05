/**
 * M7MD.dsgn — Central Site Configuration
 * 
 * DESIGNER EDITING NOTE:
 * You can customize the portfolio settings, social links, contact info,
 * and portrait path right here without touching any React code.
 * For Global Typography Settings (Arabic & English fonts), see `./typography.ts`.
 */

export { TYPOGRAPHY_CONFIG, applyTypographyConfig, getTypographyCssVariables } from './typography';
export type { TypographyConfig } from './typography';
export { siteContent } from './siteContent';
export type { SiteContent } from './siteContent';
import { siteContent } from './siteContent';


export interface OrbitIconConfig {
  id: string;
  name: string;
  shortName: string;
  category: 'design' | 'ai' | 'social';
  orbitRadiusX: number; // in pixels on desktop
  orbitRadiusY: number; // in pixels on desktop
  orbitPeriod: number; // orbital period in seconds (18-30s)
  initialAngle: number; // in degrees
  accentColor: string;
  assetPath: string; // Standalone transparent 3D badge asset
  tiltAngle: number; // orbital plane tilt in degrees
}

export interface BrandLogoAssetConfig {
  /** Cropped official logo for normal header & UI display (minimal transparent margins) */
  croppedSrc: string;
  /** Original uncropped official logo preserved in public assets */
  originalSrc: string;
  alt: string;
  objectFit: 'contain';
  heights: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

export interface PortraitPlacementConfig {
  /** Public path to the transparent portrait PNG asset */
  src: string;
  /** Fallback SVG silhouette if PNG fails to load */
  fallbackSrc: string;
  fallbackType: 'transparent-silhouette';
  alt: string;
  altAr: string;
  /** Preserve PNG transparency and original proportions */
  objectFit: 'contain';
  /** Independent scale multiplier (e.g., 1.0 to 1.15) */
  scale: number;
  /** CSS object-position for framing */
  objectPosition: string;
  /** Fine-tuning horizontal offset in pixels */
  offsetX: number;
  /** Fine-tuning vertical offset in pixels */
  offsetY: number;
  /** Responsive width classes for the portrait container */
  widthClasses: string;
  /** Responsive height classes for the portrait container */
  heightClasses: string;
  /** Combined container sizing classes */
  containerWidth: string;
}

export interface SiteConfig {
  brand: {
    name: string;
    subbrand: string;
    englishTagline: string;
    arabicTagline: string;
    arabicTaglineNote: string;
    logo: BrandLogoAssetConfig;
  };
  /** Official M7MD.dsgn logo asset configuration (cropped & original) */
  logo: BrandLogoAssetConfig;
  /**
   * HOME HERO PORTRAIT CONFIGURATION (Independent scale, position, and sizing):
   * Uses 01_HOME_PORTRAIT_Arms_Crossed.png
   */
  portrait: PortraitPlacementConfig;
  /**
   * CONTACT / PERSONAL VISUAL COMPOSITION PORTRAIT CONFIGURATION (Independent scale, position, and sizing):
   * Uses 02_CONTACT_PORTRAIT_Outstretched_Hand.png with outstretched hand and floating WhatsApp/Email icons
   */
  contactPortrait: PortraitPlacementConfig;
  contact: {
    whatsappNumber: string;
    whatsappDisplay: string;
    whatsappUrl: string;
    whatsappDefaultMessageEn: string;
    whatsappDefaultMessageAr: string;
    email: string;
    emailUrl: string;
    location: string;
    locationAr: string;
    availableForFreelance: boolean;
    inquiryEndpoint: string;
  };
  socials: {
    instagram: string;
    behance: string;
    linkedin: string;
    facebook?: string;
  };
  orbitIcons: OrbitIconConfig[];
}

const OFFICIAL_LOGO_CONFIG: BrandLogoAssetConfig = {
  croppedSrc: "/assets/identity/03_OFFICIAL_LOGO_Cropped.png",
  originalSrc: "/assets/identity/03_OFFICIAL_LOGO_Original.png",
  alt: "M7MD.dsgn Official Brand Logo",
  objectFit: "contain",
  heights: {
    sm: "h-5 sm:h-6",
    md: "h-6 sm:h-7 md:h-8",
    lg: "h-9 sm:h-11",
    xl: "h-10 sm:h-12 md:h-14 lg:h-[60px] xl:h-[68px]",
  },
};

export const siteConfig: SiteConfig = {
  brand: {
    name: siteContent.personal.brandShort,
    subbrand: siteContent.personal.brandSub,
    englishTagline: siteContent.home.tagline,
    arabicTagline: siteContent.home.tagline,
    arabicTaglineNote: "",
    logo: OFFICIAL_LOGO_CONFIG,
  },
  logo: OFFICIAL_LOGO_CONFIG,
  portrait: {
    src: "/assets/identity/01_HOME_PORTRAIT_Arms_Crossed.png",
    fallbackSrc: "/images/profile-portrait.svg",
    fallbackType: "transparent-silhouette",
    alt: "Mohammad Ali — M7MD.dsgn Official Hero Portrait",
    altAr: "محمد علي — البورتريه الرسمي M7MD.dsgn",
    objectFit: "contain",
    scale: 1.05,
    objectPosition: "center bottom",
    offsetX: 0,
    offsetY: 8,
    widthClasses: "w-64 sm:w-88 md:w-[400px]",
    heightClasses: "h-88 sm:h-[460px] md:h-[510px]",
    containerWidth: "w-64 h-88 sm:w-88 sm:h-[460px] md:w-[400px] md:h-[510px]",
  },
  contactPortrait: {
    src: "/assets/identity/02_CONTACT_PORTRAIT_Outstretched_Hand.png",
    fallbackSrc: "/images/profile-portrait.svg",
    fallbackType: "transparent-silhouette",
    alt: "Mohammad Ali — M7MD.dsgn Personal Portrait",
    altAr: "محمد علي — صورة شخصية تعريفية M7MD.dsgn",
    objectFit: "contain",
    scale: 1.08,
    objectPosition: "left bottom",
    offsetX: -16,
    offsetY: 0,
    widthClasses:
      "w-[240px] sm:w-[320px] md:w-[390px] lg:w-[495px] xl:w-[565px] 2xl:w-[615px]",
    heightClasses:
      "h-[265px] sm:h-[355px] md:h-[435px] lg:h-[555px] xl:h-[635px] 2xl:h-[690px]",
    containerWidth:
      "w-[240px] h-[265px] sm:w-[320px] sm:h-[355px] md:w-[390px] md:h-[435px] lg:w-[495px] lg:h-[555px] xl:w-[565px] xl:h-[635px] 2xl:w-[615px] 2xl:h-[690px]",
  },
  contact: {
    whatsappNumber: siteContent.contact.whatsappNumber,
    whatsappDisplay: siteContent.contact.whatsappDisplay,
    whatsappUrl: siteContent.contact.whatsappUrl,
    whatsappDefaultMessageEn: "",
    whatsappDefaultMessageAr: "",
    email: siteContent.contact.email,
    emailUrl: siteContent.contact.emailUrl,
    location: siteContent.contact.locationEn,
    locationAr: siteContent.contact.locationAr,
    availableForFreelance: siteContent.availability.available,
    inquiryEndpoint: "",
  },
  socials: {
    instagram: siteContent.socials.instagram,
    behance: siteContent.socials.behance,
    linkedin: siteContent.socials.linkedin,
    facebook: siteContent.socials.facebook,
  },
  orbitIcons: [
    {
      id: "ps",
      name: "Adobe Photoshop",
      shortName: "Ps",
      category: "design",
      orbitRadiusX: 255,
      orbitRadiusY: 125,
      orbitPeriod: 20,
      initialAngle: 162, // Upper-left; crosses into back arc behind portrait after ~1s
      accentColor: "#31A8FF",
      assetPath: "/images/orbit/01_Photoshop.png",
      tiltAngle: -14,
    },
    {
      id: "ai",
      name: "Adobe Illustrator",
      shortName: "Ai",
      category: "design",
      orbitRadiusX: 280,
      orbitRadiusY: 145,
      orbitPeriod: 23,
      initialAngle: 132, // Mid-left; crosses behind portrait after ~3s
      accentColor: "#FF9A00",
      assetPath: "/images/orbit/02_Illustrator.png",
      tiltAngle: -10,
    },
    {
      id: "instagram",
      name: "Instagram",
      shortName: "Instagram",
      category: "social",
      orbitRadiusX: 250,
      orbitRadiusY: 125,
      orbitPeriod: 21,
      initialAngle: 88, // Lower-left foreground
      accentColor: "#E1306C",
      assetPath: "/images/orbit/05_Instagram.png",
      tiltAngle: -14,
    },
    {
      id: "chatgpt",
      name: "ChatGPT / OpenAI",
      shortName: "ChatGPT",
      category: "ai",
      orbitRadiusX: 268,
      orbitRadiusY: 132,
      orbitPeriod: 24,
      initialAngle: 295, // Upper-right back arc
      accentColor: "#10A37F",
      assetPath: "/images/orbit/03_ChatGPT.png",
      tiltAngle: -14,
    },
    {
      id: "gemini",
      name: "Google Gemini",
      shortName: "Gemini",
      category: "ai",
      orbitRadiusX: 285,
      orbitRadiusY: 148,
      orbitPeriod: 20,
      initialAngle: 342, // Mid-right back arc; crosses in front of portrait after ~1s
      accentColor: "#9B72CF",
      assetPath: "/images/orbit/04_Gemini.png",
      tiltAngle: -10,
    },
    {
      id: "facebook",
      name: "Facebook",
      shortName: "Facebook",
      category: "social",
      orbitRadiusX: 262,
      orbitRadiusY: 130,
      orbitPeriod: 25,
      initialAngle: 28, // Lower-right foreground
      accentColor: "#1877F2",
      assetPath: "/images/orbit/06_Facebook.png",
      tiltAngle: -14,
    },
  ],
};
