/**
 * Pure utility functions for M7MD.dsgn
 */

import { PortfolioItem, ProjectCategory } from '../data/portfolioData';
import { siteContent } from '../config/siteContent';

export interface InquiryFormData {
  name: string;
  company?: string;
  contactInfo: string;
  service: 'static' | 'motion-ai' | 'both';
  description: string;
  budget?: string;
  deliveryDate?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: {
    name?: string;
    contactInfo?: string;
    service?: string;
    description?: string;
  };
}

/**
 * Filters portfolio items based on category and optional client ID.
 * Automatically respects project confidentiality.
 */
export function filterPortfolio(
  items: PortfolioItem[],
  selectedCategory: 'all' | ProjectCategory,
  selectedClientId: string = 'all'
): PortfolioItem[] {
  return items.filter((item) => {
    if (item.confidential) return false;
    
    const categoryMatches =
      selectedCategory === 'all' || item.category === selectedCategory;
      
    const clientMatches =
      selectedClientId === 'all' || item.clientId === selectedClientId;

    return categoryMatches && clientMatches;
  });
}

export interface ClientShowcaseProjectsResult {
  visibleProjects: PortfolioItem[];
  totalCount: number;
  overflowCount: number;
  staticCount: number;
  motionCount: number;
}

/**
 * Selects up to `maxVisible` (default 5) non-confidential projects for a given client
 * preserving the original portfolio order, and calculates overflow (+N more) and discipline counts.
 */
export function getClientShowcaseProjects(
  items: PortfolioItem[],
  clientId: string,
  maxVisible: number = 5
): ClientShowcaseProjectsResult {
  const clientProjects = filterPortfolio(items, 'all', clientId);
  const safeMax = Math.max(1, maxVisible);
  const visibleProjects = clientProjects.slice(0, safeMax);
  const totalCount = clientProjects.length;
  const overflowCount = Math.max(0, totalCount - visibleProjects.length);
  const staticCount = clientProjects.filter((p) => p.category === 'static').length;
  const motionCount = clientProjects.filter((p) => p.category === 'motion-ai').length;

  return {
    visibleProjects,
    totalCount,
    overflowCount,
    staticCount,
    motionCount,
  };
}

/**
 * Validates the project inquiry form (Name, Email/Phone, Requested Service, Project Brief).
 */
export function validateInquiryForm(data: Partial<InquiryFormData>): ValidationResult {
  const errors: ValidationResult['errors'] = {};

  if (!data.name || data.name.trim().length === 0) {
    errors.name = 'Name is required';
  }

  if (!data.contactInfo || data.contactInfo.trim().length === 0) {
    errors.contactInfo = 'Email or phone number is required';
  } else if (
    !data.contactInfo.includes('@') &&
    !data.contactInfo.replace(/[^0-9+]/g, '').length
  ) {
    errors.contactInfo = 'Please provide a valid email or phone number';
  }

  if (data.service !== undefined && !['static', 'motion-ai', 'both'].includes(data.service)) {
    errors.service = 'Requested service is required';
  }

  if (!data.description || data.description.trim().length < 5) {
    errors.description = 'Please provide at least 5 characters describing the project';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Calculates (x, y) coordinates on an elliptical orbital path.
 * Returns pixel offsets from the center of the orbit.
 */
export function calculateOrbitCoordinates(
  angleInDegrees: number,
  radiusX: number,
  radiusY: number = radiusX * 0.72
): { x: number; y: number } {
  const radians = (angleInDegrees * Math.PI) / 180;
  return {
    x: Math.round(Math.cos(radians) * radiusX * 10) / 10,
    y: Math.round(Math.sin(radians) * radiusY * 10) / 10,
  };
}

/**
 * Maps a service key ('static' | 'motion-ai' | 'both') to its human-readable label.
 */
export function getInquiryServiceLabel(
  service: InquiryFormData['service'],
  lang: 'en' | 'ar'
): string {
  if (lang === 'ar') {
    if (service === 'static') return `${siteContent.services.staticDesign.titleAr} (${siteContent.services.staticDesign.titleEn})`;
    if (service === 'motion-ai') return `${siteContent.services.motionAi.titleAr} (motion-ai)`;
    return 'كلا التخصصين (both)';
  }
  if (service === 'static') return `${siteContent.services.staticDesign.titleEn} (static)`;
  if (service === 'motion-ai') return `${siteContent.services.motionAi.titleEn} (motion-ai)`;
  return 'Both Disciplines (both)';
}

/**
 * Builds a clean, professional email subject line for a project inquiry.
 */
export function buildInquiryEmailSubject(data: InquiryFormData, lang: 'en' | 'ar'): string {
  const serviceTitleEn =
    data.service === 'motion-ai'
      ? siteContent.services.motionAi.titleEn
      : siteContent.services.staticDesign.titleEn;
  const serviceTitleAr =
    data.service === 'motion-ai'
      ? siteContent.services.motionAi.titleAr
      : siteContent.services.staticDesign.titleAr;

  if (lang === 'ar') {
    return `طلب مشروع جديد — ${data.name} | ${serviceTitleAr}`;
  }
  return `Project Inquiry — ${data.name} | ${serviceTitleEn}`;
}

/**
 * Formats a clean inquiry summary for mailto or WhatsApp.
 */
export function formatInquirySummary(data: InquiryFormData, lang: 'en' | 'ar'): string {
  const serviceLabel = getInquiryServiceLabel(data.service, lang);

  if (lang === 'ar') {
    const lines = [
      `طلب مشروع جديد عبر موقع M7MD.dsgn:`,
      `• الاسم الكامل: ${data.name}`,
    ];
    if (data.company && data.company.trim().length > 0) {
      lines.push(`• الشركة / البراند: ${data.company}`);
    }
    lines.push(`• البريد الإلكتروني أو رقم الهاتف: ${data.contactInfo}`);
    lines.push(`• الخدمة المطلوبة: ${serviceLabel}`);
    if (data.budget && data.budget.trim().length > 0) {
      lines.push(`• الميزانية المتوقعة: ${data.budget}`);
    }
    if (data.deliveryDate && data.deliveryDate.trim().length > 0) {
      lines.push(`• تاريخ التسليم المستهدف: ${data.deliveryDate}`);
    }
    lines.push(`• ملخص المشروع:`);
    lines.push(data.description);
    return lines.join('\n');
  }

  const lines = [
    `New Project Inquiry from M7MD.dsgn Portfolio:`,
    `• Full Name: ${data.name}`,
  ];
  if (data.company && data.company.trim().length > 0) {
    lines.push(`• Company / Brand: ${data.company}`);
  }
  lines.push(`• Email or Phone: ${data.contactInfo}`);
  lines.push(`• Requested Service: ${serviceLabel}`);
  if (data.budget && data.budget.trim().length > 0) {
    lines.push(`• Expected Budget: ${data.budget}`);
  }
  if (data.deliveryDate && data.deliveryDate.trim().length > 0) {
    lines.push(`• Desired Delivery: ${data.deliveryDate}`);
  }
  lines.push(`• Project Brief:`);
  lines.push(data.description);
  return lines.join('\n');
}

/**
 * Builds a direct WhatsApp URL with optional prefilled message.
 */
export function buildWhatsAppLink(phoneNumber: string, messageText: string = ''): string {
  const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
  if (!messageText || messageText.trim().length === 0) {
    return `https://wa.me/${cleanNumber}`;
  }
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(messageText)}`;
}

/**
 * Builds a mailto link with encoded subject and body.
 */
export function buildMailtoLink(
  email: string,
  subject: string = '',
  body: string = ''
): string {
  if (!subject && !body) {
    return `mailto:${email}`;
  }
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Returns all non-confidential featured portfolio items in their original order.
 * Does not duplicate or invent records.
 */
export function getFeaturedPortfolioItems(items: PortfolioItem[]): PortfolioItem[] {
  return items.filter((item) => item.featured && !item.confidential);
}

/**
 * Converts a portfolio aspect ratio string (e.g. '4:5', '16:9', '9:16', '3:4', '1:1')
 * into a valid CSS aspect-ratio string (e.g. '4 / 5') and numeric width/height ratio.
 */
export function parseArtworkAspectRatio(aspectRatio: string): {
  cssAspectRatio: string;
  numericRatio: number;
  orientation: 'portrait' | 'square' | 'landscape';
} {
  const parts = aspectRatio.split(':').map((p) => Number(p.trim()));
  if (parts.length === 2 && parts[0] > 0 && parts[1] > 0 && Number.isFinite(parts[0]) && Number.isFinite(parts[1])) {
    const [w, h] = parts;
    const numericRatio = Math.round((w / h) * 1000) / 1000;
    const orientation =
      Math.abs(numericRatio - 1) < 0.05
        ? 'square'
        : numericRatio < 1
        ? 'portrait'
        : 'landscape';
    return {
      cssAspectRatio: `${w} / ${h}`,
      numericRatio,
      orientation,
    };
  }

  return {
    cssAspectRatio: '4 / 5',
    numericRatio: 0.8,
    orientation: 'portrait',
  };
}

export interface FeaturedCardTransformConfig {
  /** Base alternating rotation in degrees (negative = counter-clockwise, positive = clockwise) */
  baseRotateZ: number;
  /** Base vertical stagger offset in pixels */
  baseTranslateY: number;
  /** Base subtle 3D depth offset in pixels */
  baseTranslateZ: number;
  /** Base z-index for overlapping stacking order (10..29) */
  baseZIndex: number;
  /** Idle floating cycle duration in seconds (between 5.2 and 7.8s) */
  floatDuration: number;
  /** Idle floating phase offset delay in seconds */
  floatDelay: number;
  /** Idle floating vertical amplitude in pixels */
  floatAmplitudeY: number;
  /** Idle floating depth (Z) amplitude in pixels */
  floatAmplitudeZ: number;
  /** Idle floating micro-rotation amplitude in degrees */
  floatAmplitudeRotate: number;
  /** Hovered target scale (between 1.12 and 1.20) */
  hoverScale: number;
  /** Hovered target rotation (straightened toward 0 deg) */
  hoverRotateZ: number;
}

/**
 * Computes deterministic, organic staggered placement and unsynchronized idle floating
 * parameters for any number of Featured Highlights cards (5, 10, 20, 50, 100+).
 */
export function getFeaturedCardTransformConfig(index: number): FeaturedCardTransformConfig {
  // Alternating clockwise (+) and counter-clockwise (-) subtle tilt angles
  const tiltMagnitudes = [3.2, 2.6, 3.8, 2.2, 3.5, 2.8, 3.1, 2.4, 3.6, 2.9];
  const sign = index % 2 === 0 ? -1 : 1;
  const baseRotateZ = sign * tiltMagnitudes[index % tiltMagnitudes.length];

  // Staggered vertical offsets across a 10-card rhythm so neighbors never align flatly
  const verticalOffsets = [-10, 12, -6, 16, -14, 10, -8, 14, -12, 8];
  const baseTranslateY = verticalOffsets[index % verticalOffsets.length];

  // Subtle base depth layering so adjacent cards sit at slightly different planes
  const depthOffsets = [4, -4, 8, -2, 6, -6, 5, -3, 7, -5];
  const baseTranslateZ = depthOffsets[index % depthOffsets.length];

  // Base z-index between 10 and 24 so overlapping edges layer cleanly
  const zIndexCycle = [14, 12, 16, 11, 15, 13, 17, 12, 16, 14];
  const baseZIndex = zIndexCycle[index % zIndexCycle.length];

  // Unsynchronized floating cycle durations between 5.2s and 7.8s
  const durations = [5.4, 6.7, 5.9, 7.4, 6.2, 7.8, 5.2, 6.9, 6.4, 7.2];
  const floatDuration = durations[index % durations.length];

  // Phase delay offset so cards start at different points of their wave
  const floatDelay = Number(((index * 0.63) % 4.5).toFixed(2));

  // Subtle idle float amplitudes
  const yAmplitudes = [6.5, -7.5, 8.0, -6.0, 7.2, -8.2, 6.8, -7.0, 7.6, -6.4];
  const floatAmplitudeY = yAmplitudes[index % yAmplitudes.length];

  const zAmplitudes = [10, 14, 12, 9, 13, 11, 15, 10, 12, 14];
  const floatAmplitudeZ = zAmplitudes[index % zAmplitudes.length];

  const rotAmplitudes = [0.9, -1.1, 1.2, -0.8, 1.0, -1.2, 0.85, -1.05, 1.15, -0.95];
  const floatAmplitudeRotate = rotAmplitudes[index % rotAmplitudes.length];

  return {
    baseRotateZ,
    baseTranslateY,
    baseTranslateZ,
    baseZIndex,
    floatDuration,
    floatDelay,
    floatAmplitudeY,
    floatAmplitudeZ,
    floatAmplitudeRotate,
    hoverScale: 1.12,
    hoverRotateZ: Number((baseRotateZ * 0.18).toFixed(2)),
  };
}

/**
 * Returns responsive sizing classes for All Work floating gallery cards.
 * - Narrow mobile (<420px): 1 card per row
 * - Mobile (420px–767px): 2 cards per row where space permits
 * - Tablet (md: 768px–1023px): ~3 cards per row
 * - Desktop (lg/xl: 1024px–1535px): ~4 large cards per row
 * - Very wide desktop (2xl: 1536px+): up to 5 cards per row maximum
 * Balances visual area across Story (9:16), Portrait (4:5, 3:4), Square (1:1), and Landscape (16:9).
 */
export function getFeaturedCardWidthClasses(
  orientation: 'portrait' | 'square' | 'landscape',
  _totalFeaturedCount: number = 8,
  numericRatio?: number
): string {
  if (orientation === 'landscape') {
    return [
      'w-[90%] max-w-[310px]',
      'min-[420px]:w-[49%] min-[420px]:max-w-[245px]',
      'sm:w-[48%] sm:max-w-[285px]',
      'md:w-[34.5%] md:max-w-[290px]',
      'lg:w-[27.5%] lg:max-w-[325px]',
      'xl:w-[27.5%] xl:max-w-[345px]',
      '2xl:w-[21.5%] 2xl:max-w-[320px]',
    ].join(' ');
  }

  if (orientation === 'square') {
    return [
      'w-[84%] max-w-[280px]',
      'min-[420px]:w-[47.5%] min-[420px]:max-w-[225px]',
      'sm:w-[46.5%] sm:max-w-[260px]',
      'md:w-[32.5%] md:max-w-[260px]',
      'lg:w-[25%] lg:max-w-[285px]',
      'xl:w-[25%] xl:max-w-[300px]',
      '2xl:w-[20%] 2xl:max-w-[285px]',
    ].join(' ');
  }

  // Tall vertical story (e.g., 9:16 where width/height <= 0.62) uses a slightly slimmer width
  // so its height stays harmonious alongside 4:5 posters and 16:9 landscapes
  const isTallStory = numericRatio !== undefined && numericRatio <= 0.62;
  if (isTallStory) {
    return [
      'w-[74%] max-w-[240px]',
      'min-[420px]:w-[44%] min-[420px]:max-w-[195px]',
      'sm:w-[43%] sm:max-w-[225px]',
      'md:w-[29.5%] md:max-w-[225px]',
      'lg:w-[21.5%] lg:max-w-[235px]',
      'xl:w-[21.5%] xl:max-w-[248px]',
      '2xl:w-[18%] 2xl:max-w-[235px]',
    ].join(' ');
  }

  // Standard portrait (4:5, 3:4)
  return [
    'w-[82%] max-w-[270px]',
    'min-[420px]:w-[46.5%] min-[420px]:max-w-[215px]',
    'sm:w-[45.5%] sm:max-w-[245px]',
    'md:w-[31.5%] md:max-w-[250px]',
    'lg:w-[24%] lg:max-w-[275px]',
    'xl:w-[24%] xl:max-w-[290px]',
    '2xl:w-[19.5%] 2xl:max-w-[275px]',
  ].join(' ');
}

export type ServiceCardId = 'static' | 'motion-ai';

export interface ServiceShowcaseCardSpec {
  id: ServiceCardId;
  number: '01' | '02';
  artworkCorner: 'top-left' | 'top-right';
  numberCorner: 'top-right' | 'top-left';
  artworkFootprintRatio: number;
  baseRotateZ: number;
  mobileRotateZ: number;
  floatDuration: number;
  floatDelay: number;
  floatAmplitudeY: number;
  floatAmplitudeRotate: number;
  titleEn: string;
  descriptionEn: string;
  ctaEn: string;
  titleAr: string;
  descriptionAr: string;
  ctaAr: string;
}

export const SERVICES_SHOWCASE_CARDS: Record<ServiceCardId, ServiceShowcaseCardSpec> = {
  static: {
    id: 'static',
    number: '01',
    artworkCorner: 'top-left',
    numberCorner: 'top-right',
    artworkFootprintRatio: 0.5,
    baseRotateZ: -2.4,
    mobileRotateZ: -1.25,
    floatDuration: 4.7,
    floatDelay: 0,
    floatAmplitudeY: -6.5,
    floatAmplitudeRotate: -0.5,
    titleEn: siteContent.services.staticDesign.titleEn,
    descriptionEn: siteContent.services.staticDesign.descriptionEn,
    ctaEn: siteContent.services.staticDesign.ctaEn,
    titleAr: siteContent.services.staticDesign.titleAr,
    descriptionAr: siteContent.services.staticDesign.descriptionAr,
    ctaAr: siteContent.services.staticDesign.ctaAr,
  },
  'motion-ai': {
    id: 'motion-ai',
    number: '02',
    artworkCorner: 'top-right',
    numberCorner: 'top-left',
    artworkFootprintRatio: 0.5,
    baseRotateZ: 2.4,
    mobileRotateZ: 1.25,
    floatDuration: 5.4,
    floatDelay: 0.85,
    floatAmplitudeY: 7.0,
    floatAmplitudeRotate: 0.55,
    titleEn: siteContent.services.motionAi.titleEn,
    descriptionEn: siteContent.services.motionAi.descriptionEn,
    ctaEn: siteContent.services.motionAi.ctaEn,
    titleAr: siteContent.services.motionAi.titleAr,
    descriptionAr: siteContent.services.motionAi.descriptionAr,
    ctaAr: siteContent.services.motionAi.ctaAr,
  },
};

export interface ServiceCardInteractionTarget {
  scale: number;
  y: number;
  rotationZ: number;
  zIndex: number;
  opacity: number;
  brightness: number;
  artworkScale: number;
  artworkShiftX: number;
  artworkShiftY: number;
  transitionDuration: number;
}

/**
 * Computes the target GSAP transform/lighting state for a service card when
 * idle (`hoveredCardId === null`), hovered (`hoveredCardId === cardId`),
 * or receding (`hoveredCardId !== cardId`).
 */
export function getServiceCardInteractionState(
  cardId: ServiceCardId,
  hoveredCardId: ServiceCardId | null,
  isMobile: boolean = false
): ServiceCardInteractionTarget {
  const spec = SERVICES_SHOWCASE_CARDS[cardId];
  const restingRotate = isMobile ? spec.mobileRotateZ : spec.baseRotateZ;

  if (hoveredCardId === null) {
    return {
      scale: 1,
      y: 0,
      rotationZ: restingRotate,
      zIndex: cardId === 'static' ? 22 : 20,
      opacity: 1,
      brightness: 1,
      artworkScale: 1,
      artworkShiftX: 0,
      artworkShiftY: 0,
      transitionDuration: 0.56,
    };
  }

  if (hoveredCardId === cardId) {
    return {
      scale: isMobile ? 1.025 : 1.05,
      y: isMobile ? -4 : -10,
      rotationZ: Number((restingRotate * 0.25).toFixed(2)),
      zIndex: 40,
      opacity: 1,
      brightness: 1.06,
      artworkScale: 1.045,
      artworkShiftX: spec.artworkCorner === 'top-left' ? -5 : 5,
      artworkShiftY: -4,
      transitionDuration: 0.54,
    };
  }

  // Receding state when the opposite card is focused
  return {
    scale: isMobile ? 0.98 : 0.962,
    y: isMobile ? 3 : 7,
    rotationZ: Number((restingRotate * 1.18).toFixed(2)),
    zIndex: 14,
    opacity: 0.72,
    brightness: 0.78,
    artworkScale: 0.97,
    artworkShiftX: 0,
    artworkShiftY: 2,
    transitionDuration: 0.54,
  };
}



