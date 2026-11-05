/**
 * M7MD.dsgn — Complete Internationalization (AR / EN)
 * 
 * DESIGNER NOTE:
 * Full bilingual support. Arabic uses true RTL layout.
 * The Arabic tagline is kept configurable here.
 */

export type Language = 'en' | 'ar';
import { siteContent } from '../config/siteContent';

export interface Translations {
  nav: {
    home: string;
    work: string;
    about: string;
    services: string;
    contact: string;
    talkCTA: string;
    switchLang: string;
  };
  hero: {
    badge: string;
    tagline: string;
    taglineNote?: string;
    headlinePart1: string;
    headlineHighlight: string;
    headlinePart2: string;
    description: string;
    viewWorkCTA: string;
    contactCTA: string;
    portraitAlt: string;
    portraitHint: string;
    orbitHint: string;
  };
  work: {
    title: string;
    subtitle: string;
    tabs: {
      featured: string;
      clients: string;
      all: string;
    };
    categories: {
      all: string;
      static: string;
      motionAi: string;
    };
    clientFilter: string;
    allClients: string;
    staticTitle: string;
    staticDesc: string;
    motionTitle: string;
    motionDesc: string;
    playVideo: string;
    viewProject: string;
    clientLabel: string;
    categoryLabel: string;
    toolsLabel: string;
    aspectRatioLabel: string;
    emptyMessage: string;
    closeModal: string;
    relatedProjects: string;
  };
  about: {
    title: string;
    subtitle: string;
    introTitle: string;
    introP1: string;
    introP2: string;
    philosophyTitle: string;
    philosophyP1: string;
    disciplinesTitle: string;
    disciplines: {
      title: string;
      desc: string;
    }[];
    toolsTitle: string;
    designerNoticeTitle: string;
    designerNoticeDesc: string;
  };
  services: {
    title: string;
    subtitle: string;
    service1: {
      number: string;
      name: string;
      tagline: string;
      description: string;
      deliverables: string[];
      deliverablesTitle: string;
      timeline: string;
      cta: string;
    };
    service2: {
      number: string;
      name: string;
      tagline: string;
      description: string;
      deliverables: string[];
      deliverablesTitle: string;
      timeline: string;
      cta: string;
    };
  };
  contact: {
    title: string;
    subtitle: string;
    directChannelsTitle: string;
    whatsappLabel: string;
    whatsappSub: string;
    emailLabel: string;
    emailSub: string;
    formTitle: string;
    formSubtitle: string;
    fields: {
      name: string;
      namePlaceholder: string;
      company: string;
      companyPlaceholder: string;
      contactInfo: string;
      contactInfoPlaceholder: string;
      service: string;
      serviceOptions: {
        static: string;
        motionAi: string;
        both: string;
      };
      description: string;
      descriptionPlaceholder: string;
      budget: string;
      budgetPlaceholder: string;
      budgetOptions: string[];
      deliveryDate: string;
    };
    submitButton: string;
    submitting: string;
    successTitle: string;
    successMessage: string;
    openInEmailClient: string;
    openInWhatsApp: string;
    disclaimer: string;
    errors: {
      nameRequired: string;
      contactRequired: string;
      descRequired: string;
    };
  };
  dock: {
    quickContact: string;
    whatsapp: string;
    email: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: "Home",
      work: "Work",
      about: "About",
      services: "Services",
      contact: "Contact",
      talkCTA: "Let's Talk",
      switchLang: "العربية",
    },
    hero: {
      badge: siteContent.home.availabilityBadgeEn,
      tagline: siteContent.home.tagline,
      headlinePart1: "Crafting High-Impact",
      headlineHighlight: "Visual Identities",
      headlinePart2: "& Cinematic Motion",
      description: siteContent.home.introductionEn,
      viewWorkCTA: "Explore Work",
      contactCTA: "Get in Touch",
      portraitAlt: "Mohammad Ali — M7MD.dsgn Official Hero Portrait",
      portraitHint: "Official Hero Portrait",
      orbitHint: "Orbital Creative Ecosystem",
    },
    work: {
      title: "Selected Work",
      subtitle: "Commercial design campaigns, kinetic motion, and AI visual synthesis across two core disciplines.",
      tabs: {
        featured: "All Work",
        clients: "Clients Showcase",
        all: "Full Portfolio",
      },
      categories: {
        all: "All Disciplines",
        static: "Static Designs",
        motionAi: "Motion & AI",
      },
      clientFilter: "Filter by Client",
      allClients: "All Clients",
      staticTitle: "Static Designs Gallery",
      staticDesc: "Masonry grid of campaign creatives, carousels, and poster artworks preserving authentic aspect ratios.",
      motionTitle: "Motion & AI Visuals",
      motionDesc: "Sound-synced motion graphics, 3D simulations, and AI-synthesized promotional reels.",
      playVideo: "Watch Motion Reel",
      viewProject: "Inspect Artwork",
      clientLabel: "Client",
      categoryLabel: "Discipline",
      toolsLabel: "Stack",
      aspectRatioLabel: "Ratio",
      emptyMessage: "No projects match the selected criteria.",
      closeModal: "Close Lightbox (Esc)",
      relatedProjects: "Related Projects from this Client",
    },
    about: {
      title: "About M7MD.dsgn",
      subtitle: siteContent.about.specialization,
      introTitle: siteContent.about.nameEn,
      introP1: siteContent.about.bioParagraphsEn[0],
      introP2: siteContent.about.bioParagraphsEn[1],
      philosophyTitle: "Creative Philosophy",
      philosophyP1: siteContent.about.bioParagraphsEn[2],
      disciplinesTitle: "Core Competencies",
      disciplines: [
        {
          title: siteContent.services.staticDesign.titleEn,
          desc: siteContent.services.staticDesign.descriptionEn,
        },
        {
          title: siteContent.services.motionAi.titleEn,
          desc: siteContent.services.motionAi.descriptionEn,
        },
        {
          title: "AI Synthesis & Creative Pipelines",
          desc: "Generative neural imagery, cinematic video extension, frame interpolation, and custom aesthetic models for rapid creative exploration.",
        },
      ],
      toolsTitle: "Ecosystem & Mastered Tools",
      designerNoticeTitle: "Official Personal Profile",
      designerNoticeDesc: "Managed centrally in src/config/siteContent.ts.",
    },
    services: {
      title: "Services & Capabilities",
      subtitle: "Tailored creative partnerships focused strictly on two core domains of visual execution.",
      service1: {
        number: siteContent.services.staticDesign.number,
        name: siteContent.services.staticDesign.titleEn,
        tagline: siteContent.services.staticDesign.descriptionEn,
        description: siteContent.services.staticDesign.descriptionEn,
        deliverablesTitle: "What We Deliver",
        deliverables: [
          "Strategic Multi-Slide Educational & Launch Carousels (4:5 / 1:1)",
          "Hero Campaign Key Visuals & Editorial Master Artwork",
          "Promotional Ad Banners & High-CTR Performance Creatives",
          "Social Design Kit & Cohesive Brand Grid Guidelines",
        ],
        timeline: "Typical sprint: 3–7 business days per campaign package",
        cta: siteContent.services.staticDesign.ctaEn,
      },
      service2: {
        number: siteContent.services.motionAi.number,
        name: siteContent.services.motionAi.titleEn,
        tagline: siteContent.services.motionAi.descriptionEn,
        description: siteContent.services.motionAi.descriptionEn,
        deliverablesTitle: "What We Deliver",
        deliverables: [
          "Kinetic Typography & Brand Motion ID Reels (9:16 / 16:9)",
          "Exploded 3D Product Simulation & High-Impact Reveal Teasers",
          "AI-Synthesized Generative Video Backdrops & Scene Extensions",
          "Sound-Synced Fast-Paced Commercial Social Reels",
        ],
        timeline: "Typical sprint: 5–12 business days per motion package",
        cta: siteContent.services.motionAi.ctaEn,
      },
    },
    contact: {
      title: siteContent.contact.emailSection.headingEn,
      subtitle: siteContent.contact.emailSection.supportingTextEn,
      directChannelsTitle: "Direct Channels",
      whatsappLabel: siteContent.contact.whatsappSection.headingEn,
      whatsappSub: siteContent.contact.whatsappSection.supportingTextEn,
      emailLabel: siteContent.contact.emailSection.headingEn,
      emailSub: siteContent.contact.emailSection.supportingTextEn,
      formTitle: siteContent.contact.emailSection.headingEn,
      formSubtitle: siteContent.contact.emailSection.supportingTextEn,
      fields: {
        name: `${siteContent.contact.form.nameLabelEn} *`,
        namePlaceholder: siteContent.contact.form.namePlaceholderEn,
        company: "Company / Brand Name",
        companyPlaceholder: "e.g. Brand Name",
        contactInfo: `${siteContent.contact.form.contactLabelEn} *`,
        contactInfoPlaceholder: siteContent.contact.form.contactPlaceholderEn,
        service: `${siteContent.contact.form.serviceLabelEn} *`,
        serviceOptions: {
          static: siteContent.services.staticDesign.titleEn,
          motionAi: siteContent.services.motionAi.titleEn,
          both: "Both Disciplines",
        },
        description: `${siteContent.contact.form.briefLabelEn} *`,
        descriptionPlaceholder: siteContent.contact.form.briefPlaceholderEn,
        budget: "Expected Budget Range",
        budgetPlaceholder: "Select estimated budget range",
        budgetOptions: [
          "$1,000 – $2,500 USD (Starter Campaign)",
          "$2,500 – $5,000 USD (Full Campaign / Motion Package)",
          "$5,000 – $10,000+ USD (Comprehensive Identity & Video Series)",
          "Flexible / Open to discussion",
        ],
        deliveryDate: "Desired Delivery Date",
      },
      submitButton: siteContent.contact.form.submitButtonEn,
      submitting: "Preparing Inquiry...",
      successTitle: "Inquiry Prepared Successfully!",
      successMessage: "Your project details have been formatted. Click below to launch your default email client or send via WhatsApp immediately.",
      openInEmailClient: "Send via Email Client",
      openInWhatsApp: "Send via WhatsApp",
      disclaimer: "No backend required: submissions format your email or WhatsApp message directly with zero data loss.",
      errors: {
        nameRequired: "Please enter your full name.",
        contactRequired: "Please provide a valid email or phone number.",
        descRequired: "Please describe your project briefly.",
      },
    },
    dock: {
      quickContact: "Quick Contact",
      whatsapp: "WhatsApp",
      email: "Email",
    },
  },
  ar: {
    nav: {
      home: "الرئيسية",
      work: "الأعمال",
      about: "عن المصمم",
      services: "الخدمات",
      contact: "تواصل",
      talkCTA: "ابدأ مشروعك",
      switchLang: "English",
    },
    hero: {
      badge: siteContent.home.availabilityBadgeAr,
      tagline: siteContent.home.tagline,
      headlinePart1: "صناعة هويات رقمية",
      headlineHighlight: "فائقة التأثير",
      headlinePart2: "وموشن جرافيك سينمائي",
      description: siteContent.home.introductionAr,
      viewWorkCTA: "استعرض الأعمال",
      contactCTA: "تواصل معي",
      portraitAlt: "محمد علي — البورتريه الرسمي M7MD.dsgn",
      portraitHint: "البورتريه الرسمي",
      orbitHint: "المنظومة الإبداعية والأدوات",
    },
    work: {
      title: "أبرز الأعمال والمشاريع",
      subtitle: "حملات تصميم تجارية، موشن جرافيك ديناميكي، وتوليد بصري بالذكاء الاصطناعي في مسارين أساسيين.",
      tabs: {
        featured: "كافة الأعمال",
        clients: "قائمة العملاء",
        all: "كافة المشاريع",
      },
      categories: {
        all: "كافة التخصصات",
        static: "تصاميم ثابتة (Static)",
        motionAi: "موشن وذكاء اصطناعي (Motion & AI)",
      },
      clientFilter: "تصفية حسب العميل",
      allClients: "جميع العملاء",
      staticTitle: "معرض التصاميم الثابتة",
      staticDesc: "شبكة ماسونري تحافظ على أبعاد التصاميم الأصلية للبوسترات والكاروسيل.",
      motionTitle: "موشن جرافيك والذكاء الاصطناعي",
      motionDesc: "مقاطع فيديو متزامنة مع الإيقاع الصوتي، ومحاكاة ثلاثية الأبعاد، ومقاطع ريلز بالذكاء الاصطناعي.",
      playVideo: "تشغيل فيديو الموشن",
      viewProject: "معاينة التصميم",
      clientLabel: "العميل",
      categoryLabel: "المسار",
      toolsLabel: "الأدوات",
      aspectRatioLabel: "الأبعاد",
      emptyMessage: "لا توجد مشاريع تطابق المعايير المحددة.",
      closeModal: "إغلاق المعاينة (Esc)",
      relatedProjects: "مشاريع أخرى لهذا العميل",
    },
    about: {
      title: "عن M7MD.dsgn",
      subtitle: siteContent.about.specialization,
      introTitle: siteContent.about.nameAr,
      introP1: siteContent.about.bioParagraphsAr[0],
      introP2: siteContent.about.bioParagraphsAr[1],
      philosophyTitle: "فلسفة العمل",
      philosophyP1: siteContent.about.bioParagraphsAr[2],
      disciplinesTitle: "المجالات الرئيسية",
      disciplines: [
        {
          title: siteContent.services.staticDesign.titleAr,
          desc: siteContent.services.staticDesign.descriptionAr,
        },
        {
          title: siteContent.services.motionAi.titleAr,
          desc: siteContent.services.motionAi.descriptionAr,
        },
        {
          title: "الذكاء الاصطناعي والحلول التوليدية",
          desc: "توليد مشاهد بصرية سينمائية، وتوسيع الفيديوهات، ومحاكاة المشاهد المعقدة لخدمة الرؤية الفنية بأعلى سرعة.",
        },
      ],
      toolsTitle: "الأدوات والبرمجيات المعتمدة",
      designerNoticeTitle: "الملف التعريفي الرسمي",
      designerNoticeDesc: "يتم إدارة المحتوى مركزياً في ملف src/config/siteContent.ts.",
    },
    services: {
      title: "الخدمات والحلول الإبداعية",
      subtitle: "شراكات إبداعية متخصصة تركز بدقة على مسارين رئيسيين في التصميم الرقمي.",
      service1: {
        number: siteContent.services.staticDesign.number,
        name: siteContent.services.staticDesign.titleAr,
        tagline: siteContent.services.staticDesign.descriptionAr,
        description: siteContent.services.staticDesign.descriptionAr,
        deliverablesTitle: "ما ستحصل عليه",
        deliverables: [
          "سلاسل كاروسيل تفاعلية وإرشادية متعددة الشرائح (4:5 / 1:1)",
          "التصاميم الرئيسية للحملات الإعلانية والهوية البصرية للنشر",
          "بانرات إعلانية رقمية وتصاميم ذات معدل نقر وتحويل مرتفع",
          "دليل بصري وتوجيهي لشبكة النشر ومنصات التواصل",
        ],
        timeline: "مدة الإنجاز التقريبية: 3 إلى 7 أيام عمل لكل حزمة",
        cta: siteContent.services.staticDesign.ctaAr,
      },
      service2: {
        number: siteContent.services.motionAi.number,
        name: siteContent.services.motionAi.titleAr,
        tagline: siteContent.services.motionAi.descriptionAr,
        description: siteContent.services.motionAi.descriptionAr,
        deliverablesTitle: "ما ستحصل عليه",
        deliverables: [
          "فيديوهات تايبوغرافي حركي وهويات بصرية متحركة (9:16 / 16:9)",
          "تفكيك ومحاكاة ثلاثية الأبعاد للمنتجات وإعلانات الإطلاق التشويقية",
          "خلفيات ومشاهد سينمائية مولدة ومعدلة بالذكاء الاصطناعي",
          "مقاطع ريلز وشورتس سريعة الإيقاع متزامنة مع المؤثرات الصوتية",
        ],
        timeline: "مدة الإنجاز التقريبية: 5 إلى 12 يوم عمل لكل حزمة موشن",
        cta: siteContent.services.motionAi.ctaAr,
      },
    },
    contact: {
      title: siteContent.contact.emailSection.headingAr,
      subtitle: siteContent.contact.emailSection.supportingTextAr,
      directChannelsTitle: "قنوات التواصل المباشر",
      whatsappLabel: siteContent.contact.whatsappSection.headingAr,
      whatsappSub: siteContent.contact.whatsappSection.supportingTextAr,
      emailLabel: siteContent.contact.emailSection.headingAr,
      emailSub: siteContent.contact.emailSection.supportingTextAr,
      formTitle: siteContent.contact.emailSection.headingAr,
      formSubtitle: siteContent.contact.emailSection.supportingTextAr,
      fields: {
        name: `${siteContent.contact.form.nameLabelAr} *`,
        namePlaceholder: siteContent.contact.form.namePlaceholderAr,
        company: "اسم الشركة / العلامة التجارية",
        companyPlaceholder: "مثال: اسم العلامة التجارية",
        contactInfo: `${siteContent.contact.form.contactLabelAr} *`,
        contactInfoPlaceholder: siteContent.contact.form.contactPlaceholderAr,
        service: `${siteContent.contact.form.serviceLabelAr} *`,
        serviceOptions: {
          static: siteContent.services.staticDesign.titleAr,
          motionAi: siteContent.services.motionAi.titleAr,
          both: "كلا التخصصين",
        },
        description: `${siteContent.contact.form.briefLabelAr} *`,
        descriptionPlaceholder: siteContent.contact.form.briefPlaceholderAr,
        budget: "الميزانية المتوقعة للمشروع",
        budgetPlaceholder: "اختر النطاق التقديري للميزانية",
        budgetOptions: [
          "1,000$ – 2,500$ دولار (حملة تجريبية أو محتوى أساسي)",
          "2,500$ – 5,000$ دولار (حملة تسويقية كاملة / باقة موشن)",
          "5,000$ – 10,000$+ دولار (هوية بصرية شاملة وسلسلة فيديوهات)",
          "مرن / قابل للنقاش بناءً على نطاق العمل",
        ],
        deliveryDate: "تاريخ التسليم المستهدف",
      },
      submitButton: siteContent.contact.form.submitButtonAr,
      submitting: "جاري تجهيز الطلب...",
      successTitle: "تم تجهيز تفاصيل الاستفسار بنجاح!",
      successMessage: "تم تنسيق تفاصيل مشروعك بشكل احترافي. انقر أدناه لإرسالها عبر بريدك الإلكتروني أو عبر تطبيق واتساب مباشرة.",
      openInEmailClient: "إرسال عبر تطبيق البريد",
      openInWhatsApp: "إرسال عبر الواتساب",
      disclaimer: "لا يتطلب خادم خلفي: يتم توجيه الاستفسار لبريدك أو تطبيق واتساب مباشرة وبأمان كامل دون فقدان البيانات.",
      errors: {
        nameRequired: "يرجى كتابة الاسم الكامل.",
        contactRequired: "يرجى كتابة البريد الإلكتروني أو رقم الهاتف للتواصل.",
        descRequired: "يرجى كتابة وصف موجز عن المشروع.",
      },
    },
    dock: {
      quickContact: "تواصل سريع",
      whatsapp: "واتساب",
      email: "إيميل",
    },
  },
};
