/**
 * M7MD.dsgn — Global Typography Settings (الإعدادات المركزية للخطوط)
 *
 * هذا الملف هو المصدر المركزي الوحيد لإدارة جميع الخطوط في الموقع.
 * يمكنك مستقبلاً تغيير أي خط (العناوين العربية، النصوص العربية، العناوين الإنجليزية،
 * أو النصوص الإنجليزية) من هذا الملف فقط دون الحاجة لتعديل أي صفحة أو مكوّن (Component).
 */

export interface TypographyConfig {
  /**
   * رابط تحميل الخطوط من Google Fonts
   * عند استبدال أي خط بخط جديد من Google Fonts، قم بتحديث هذا الرابط فقط.
   */
  googleFontsUrl: string;

  /**
   * إعدادات الخطوط العربية (RTL)
   */
  ar: {
    /** خط العناوين الرئيسية والفرعية العربية (h1 - h6) */
    heading: {
      family: string;
      heroWeight: number | string;
      sectionWeight: number | string;
      heroLineHeight: number | string;
      sectionLineHeight: number | string;
    };
    /** خط النصوص والفقرات والأزرار والقوائم والحقول العربية (Body & UI) */
    body: {
      family: string;
      regularWeight: number | string;
      uiWeight: number | string;
      baseLineHeight: number | string;
      paragraphLineHeight: number | string;
    };
  };

  /**
   * إعدادات الخطوط الإنجليزية (LTR)
   */
  en: {
    /** خط العناوين الرئيسية والفرعية الإنجليزية (h1 - h6) */
    heading: {
      family: string;
    };
    /** خط النصوص والفقرات والأزرار والقوائم الإنجليزية (Body & UI) */
    body: {
      family: string;
    };
    /** خط العناصر التقنية والشارات الإنجليزية (Monospace / Badges) */
    mono: {
      family: string;
    };
  };

  /**
   * خط شعار الهوية (M7MD.dsgn)
   * معزول بشكل مستقل للحفاظ على ثبات الشعار في جميع اللغات
   */
  brand: {
    logoFontFamily: string;
  };
}

export const TYPOGRAPHY_CONFIG: TypographyConfig = {
  googleFontsUrl:
    'https://fonts.googleapis.com/css2?family=Alexandria:wght@800..900&family=IBM+Plex+Sans+Arabic:wght@400;500;600&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap',

  ar: {
    heading: {
      family: "'Alexandria', 'Plus Jakarta Sans', system-ui, sans-serif",
      heroWeight: 900,
      sectionWeight: 800,
      heroLineHeight: 1.42,
      sectionLineHeight: 1.3,
    },
    body: {
      family: "'IBM Plex Sans Arabic', 'Plus Jakarta Sans', system-ui, sans-serif",
      regularWeight: 400,
      uiWeight: 500,
      baseLineHeight: 1.65,
      paragraphLineHeight: 1.7,
    },
  },

  en: {
    heading: {
      family: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
    },
    body: {
      family: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
    },
    mono: {
      family:
        'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    },
  },

  brand: {
    logoFontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
  },
};

/**
 * يحوّل إعدادات الخطوط إلى متغيرات CSS قياسية (CSS Custom Properties)
 * ليتم تطبيقها مركزياً على مستوى جذر المستند (:root).
 */
export function getTypographyCssVariables(
  config: TypographyConfig = TYPOGRAPHY_CONFIG
): Record<string, string> {
  return {
    '--font-ar-heading': config.ar.heading.family,
    '--font-ar-heading-hero-weight': String(config.ar.heading.heroWeight),
    '--font-ar-heading-section-weight': String(config.ar.heading.sectionWeight),
    '--font-ar-heading-hero-lh': String(config.ar.heading.heroLineHeight),
    '--font-ar-heading-section-lh': String(config.ar.heading.sectionLineHeight),

    '--font-ar-body': config.ar.body.family,
    '--font-ar-body-weight': String(config.ar.body.regularWeight),
    '--font-ar-ui-weight': String(config.ar.body.uiWeight),
    '--font-ar-body-lh': String(config.ar.body.baseLineHeight),
    '--font-ar-paragraph-lh': String(config.ar.body.paragraphLineHeight),

    '--font-en-heading': config.en.heading.family,
    '--font-en-body': config.en.body.family,
    '--font-en-mono': config.en.mono.family,

    '--font-brand-logo': config.brand.logoFontFamily,
  };
}

/**
 * يطبّق إعدادات الخطوط المركزية على المتصفح عند تشغيل الموقع
 * ويقوم بمزامنة رابط Google Fonts تلقائياً.
 */
export function applyTypographyConfig(
  config: TypographyConfig = TYPOGRAPHY_CONFIG
): void {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  const cssVars = getTypographyCssVariables(config);

  Object.entries(cssVars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });

  if (config.googleFontsUrl) {
    let fontLink = document.getElementById(
      'global-google-fonts'
    ) as HTMLLinkElement | null;

    if (!fontLink) {
      fontLink = document.querySelector(
        'link[href*="fonts.googleapis.com/css2"]'
      ) as HTMLLinkElement | null;
      if (fontLink) {
        fontLink.id = 'global-google-fonts';
      }
    }

    if (fontLink && fontLink.getAttribute('href') !== config.googleFontsUrl) {
      fontLink.setAttribute('href', config.googleFontsUrl);
    }
  }
}
