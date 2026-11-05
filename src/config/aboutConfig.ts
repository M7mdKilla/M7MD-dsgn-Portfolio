/**
 * M7MD.dsgn — Central Editable About Section Configuration
 *
 * DESIGNER EDITING NOTE:
 * All portrait settings, 3D contact icon parameters, "Contact Me" label text,
 * biography drafts (Arabic & English), and expertise indicators for the About
 * page are managed centrally in this file.
 *
 * - To replace the portrait placeholder, place your transparent cutout PNG at:
 *   `public/images/profile-portrait.png`
 *   and adjust `scale`, `objectPosition`, `offsetX`, or `offsetY` below if needed.
 * - Contact numbers and emails automatically read from `siteConfig.contact`
 *   (or can be overridden here).
 */

import { siteConfig } from './siteConfig';
import { siteContent } from './siteContent';
import { buildMailtoLink, buildWhatsAppLink } from '../utils/portfolio';
import { Language } from '../locales/translations';

export type ExpertiseIconType = 'social' | 'motion' | 'ai';

export interface AboutPortraitConfig {
  /** Public path to the outstretched-hand portrait PNG asset */
  src: string;
  /** Fallback SVG silhouette if PNG is missing */
  fallbackSrc: string;
  altEn: string;
  altAr: string;
  /** Preserve PNG transparency and original proportions */
  objectFit: 'contain';
  /** Scale multiplier for the portrait cutout (e.g., 1.0 to 1.15) */
  scale: number;
  /** CSS object-position for framing the cutout */
  objectPosition: string;
  /** Responsive width & height classes for the portrait container */
  widthClasses: string;
  heightClasses: string;
  /** Fine-tuning horizontal offset in pixels */
  offsetX: number;
  /** Fine-tuning vertical offset in pixels */
  offsetY: number;
}

export interface AboutContactIconItemConfig {
  id: 'whatsapp' | 'email';
  labelEn: string;
  labelAr: string;
  tooltipEn: string;
  tooltipAr: string;
  /** Path to the standalone 3D PNG icon asset in public/images/about/ */
  assetPath: string;
  /** Optional custom PNG/SVG image path override */
  customImageSrc?: string;
  /** Responsive width & height classes preserving original image proportions */
  sizeClasses: string;
  /** Independent idle floating cycle duration in seconds */
  floatDuration: number;
  /** Phase offset delay in seconds */
  floatDelay: number;
  /** Vertical floating amplitude in pixels */
  floatAmplitudeY: number;
  /** Subtle base 3D Z-axis tilt in degrees */
  baseTiltZ: number;
}

export interface AboutExpertiseIndicator {
  id: string;
  iconType: ExpertiseIconType;
  labelEn: string;
  labelAr: string;
}

export interface AboutConfig {
  portrait: AboutPortraitConfig;
  contactLabel: {
    textArPrimary: string;
    textArAccent: string;
    textEnPrimary: string;
    textEnAccent: string;
    fullTextAr: string;
    fullTextEn: string;
  };
  contactIcons: {
    whatsapp: AboutContactIconItemConfig & {
      phoneNumber: string;
      whatsappUrl: string;
      defaultMessageEn: string;
      defaultMessageAr: string;
    };
    email: AboutContactIconItemConfig & {
      emailAddress: string;
      emailUrl: string;
      subjectEn: string;
      subjectAr: string;
      bodyEn: string;
      bodyAr: string;
    };
  };
  info: {
    sectionLabel: string;
    nameEn: string;
    nameAr: string;
    brandName: string;
    brandSub: string;
    logoSrc: string;
    originalLogoSrc: string;
    professionalTitle: string;
    specialization: string;
    bioParagraphsAr: string[];
    bioParagraphsEn: string[];
    bioAr: string;
    bioEn: string;
    details: {
      experienceEn: string;
      experienceAr: string;
      clientsEn: string;
      clientsAr: string;
      outputEn: string;
      outputAr: string;
      locationEn: string;
      locationAr: string;
    };
    bioNote: string;
  };
  expertiseIndicators: AboutExpertiseIndicator[];
}

export const aboutConfig: AboutConfig = {
  portrait: {
    src: siteConfig.contactPortrait.src,
    fallbackSrc: siteConfig.contactPortrait.fallbackSrc,
    altEn: siteConfig.contactPortrait.alt,
    altAr: siteConfig.contactPortrait.altAr,
    objectFit: siteConfig.contactPortrait.objectFit,
    scale: siteConfig.contactPortrait.scale,
    objectPosition: siteConfig.contactPortrait.objectPosition,
    widthClasses: siteConfig.contactPortrait.widthClasses,
    heightClasses: siteConfig.contactPortrait.heightClasses,
    offsetX: siteConfig.contactPortrait.offsetX,
    offsetY: siteConfig.contactPortrait.offsetY,
  },
  contactLabel: {
    textArPrimary: 'تواصل',
    textArAccent: 'معي',
    textEnPrimary: 'Contact',
    textEnAccent: 'Me',
    fullTextAr: 'تواصل معي',
    fullTextEn: 'Contact Me',
  },
  contactIcons: {
    whatsapp: {
      id: 'whatsapp',
      labelEn: 'WhatsApp',
      labelAr: 'واتساب',
      tooltipEn: 'Chat on WhatsApp',
      tooltipAr: 'تواصل عبر واتساب',
      assetPath: '/images/about/01_WhatsApp_3D.png',
      customImageSrc: '/images/about/01_WhatsApp_3D.png',
      phoneNumber: siteContent.contact.whatsappNumber,
      whatsappUrl: siteContent.contact.whatsappUrl,
      defaultMessageEn: '',
      defaultMessageAr: '',
      sizeClasses:
        'w-[106px] h-[97px] sm:w-[132px] sm:h-[121px] md:w-[152px] md:h-[139px] lg:w-[172px] lg:h-[157px] xl:w-[190px] xl:h-[174px]',
      floatDuration: 4.3,
      floatDelay: 0,
      floatAmplitudeY: -10,
      baseTiltZ: -2,
    },
    email: {
      id: 'email',
      labelEn: 'Email',
      labelAr: 'البريد الإلكتروني',
      tooltipEn: 'Send an Email',
      tooltipAr: 'إرسال بريد إلكتروني',
      assetPath: '/images/about/02_Email_3D.png',
      customImageSrc: '/images/about/02_Email_3D.png',
      emailAddress: siteContent.contact.email,
      emailUrl: siteContent.contact.emailUrl,
      subjectEn: '',
      subjectAr: '',
      bodyEn: '',
      bodyAr: '',
      sizeClasses:
        'w-[100px] h-[100px] sm:w-[124px] sm:h-[124px] md:w-[144px] md:h-[144px] lg:w-[162px] lg:h-[162px] xl:w-[180px] xl:h-[180px]',
      floatDuration: 5.1,
      floatDelay: 0.9,
      floatAmplitudeY: 9.5,
      baseTiltZ: 2.5,
    },
  },
  info: {
    sectionLabel: siteContent.about.sectionLabel,
    nameEn: siteContent.about.nameEn,
    nameAr: siteContent.about.nameAr,
    brandName: siteConfig.brand.name,
    brandSub: siteConfig.brand.subbrand,
    logoSrc: siteConfig.logo.croppedSrc,
    originalLogoSrc: siteConfig.logo.originalSrc,
    professionalTitle: siteContent.about.professionalTitle,
    specialization: siteContent.about.specialization,
    bioParagraphsAr: siteContent.about.bioParagraphsAr,
    bioParagraphsEn: siteContent.about.bioParagraphsEn,
    bioAr: siteContent.about.bioAr,
    bioEn: siteContent.about.bioEn,
    details: siteContent.about.details,
    bioNote: 'Managed centrally in src/config/siteContent.ts',
  },
  expertiseIndicators: [
    {
      id: 'social-media',
      iconType: 'social',
      labelEn: 'Social Media Design',
      labelAr: 'تصميم السوشال ميديا',
    },
    {
      id: 'motion-video',
      iconType: 'motion',
      labelEn: 'Motion & Video',
      labelAr: 'الموشن والفيديو',
    },
    {
      id: 'creative-ai',
      iconType: 'ai',
      labelEn: 'Creative AI',
      labelAr: 'الذكاء الاصطناعي الإبداعي',
    },
  ],
};

/**
 * Resolves localized href links and accessible labels for the About 3D contact icons.
 */
export function getAboutContactLinks(
  lang: Language,
  config: AboutConfig = aboutConfig
): {
  whatsappHref: string;
  emailHref: string;
  whatsappLabel: string;
  emailLabel: string;
  contactMeText: string;
} {
  const isAr = lang === 'ar';
  const waCfg = config.contactIcons.whatsapp;
  const mailCfg = config.contactIcons.email;

  const waMessage = isAr ? waCfg.defaultMessageAr : waCfg.defaultMessageEn;
  const whatsappHref = waMessage
    ? buildWhatsAppLink(waCfg.phoneNumber, waMessage)
    : waCfg.whatsappUrl || buildWhatsAppLink(waCfg.phoneNumber, '');

  const mailSubject = isAr ? mailCfg.subjectAr : mailCfg.subjectEn;
  const mailBody = isAr ? mailCfg.bodyAr : mailCfg.bodyEn;
  const emailHref =
    mailSubject || mailBody
      ? buildMailtoLink(mailCfg.emailAddress, mailSubject, mailBody)
      : mailCfg.emailUrl || `mailto:${mailCfg.emailAddress}`;

  return {
    whatsappHref,
    emailHref,
    whatsappLabel: isAr ? waCfg.tooltipAr : waCfg.tooltipEn,
    emailLabel: isAr ? mailCfg.tooltipAr : mailCfg.tooltipEn,
    contactMeText: isAr
      ? config.contactLabel.fullTextAr
      : config.contactLabel.fullTextEn,
  };
}
