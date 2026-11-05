/**
 * M7MD.dsgn — Centralized Official Personal, Professional, Service & Contact Content
 * ====================================================================================
 * Edit this single file to update personal details, biographies, service descriptions,
 * WhatsApp number, email address, availability status, or future social profile URLs
 * across the entire website.
 */

export const siteContent = {
  /**
   * 1. OFFICIAL PERSONAL & BRAND INFORMATION
   */
  personal: {
    fullNameEn: 'Mohammad Ali',
    fullNameAr: 'محمد علي',
    brandName: 'M7MD.dsgn',
    brandShort: 'M7MD',
    brandSub: 'dsgn',
    professionalTitle: 'Graphic Designer',
    specialization: 'Social Media Design · Motion · AI',
    experienceEn: '6+ Years Experience',
    experienceAr: '+6 سنوات خبرة',
    clientsLongEn: 'Dozens of Clients Across Different Industries',
    clientsShortEn: 'Dozens of Clients',
    clientsShortAr: 'عشرات العملاء',
    creativeOutputEn: 'Thousands of Designs',
    creativeOutputAr: 'آلاف التصاميم',
    locationEn: 'Syria – Tartus',
    locationAr: 'سوريا – طرطوس',
  },

  /**
   * 2. AVAILABILITY STATUS
   */
  availability: {
    available: true,
    en: 'Available for New Projects',
    ar: 'متاح لاستقبال مشاريع جديدة',
  },

  /**
   * 3. HOME PAGE CONTENT
   */
  home: {
    brand: 'M7MD.dsgn',
    tagline: 'Social Media Design · Motion · AI',
    availabilityBadgeEn: 'Available for New Projects',
    availabilityBadgeAr: 'متاح لاستقبال مشاريع جديدة',
    introductionEn:
      'Graphic designer with 6+ years of experience, specializing in social media design, motion graphics, and AI-powered creative content.',
    introductionAr:
      'مصمم جرافيك بخبرة تتجاوز 6 سنوات، متخصص في تصميم محتوى السوشال ميديا، والموشن جرافيك، وصناعة المحتوى الإبداعي باستخدام الذكاء الاصطناعي.',
  },

  /**
   * 4. ABOUT PAGE CONTENT
   */
  about: {
    sectionLabel: 'ABOUT ME // من أنا',
    nameEn: 'Mohammad Ali',
    nameAr: 'محمد علي',
    brand: 'M7MD.dsgn',
    professionalTitle: 'Graphic Designer',
    specialization: 'Social Media Design · Motion · AI',
    bioParagraphsAr: [
      'أنا محمد علي، مصمم جرافيك متخصص في تصميم محتوى السوشال ميديا، وصناعة الحملات البصرية، والموشن جرافيك، وتحريك المحتوى باستخدام الذكاء الاصطناعي.',
      'أمتلك خبرة تتجاوز 6 سنوات في مجال التصميم والإنتاج البصري، تعاونت خلالها مع عشرات العملاء والعلامات التجارية في مجالات متنوعة، وأنجزت آلاف التصاميم والمشاريع الإبداعية.',
      'أؤمن أن التصميم ليس مجرد صورة جميلة، بل أداة بصرية تصنع الانطباع، وتوصل الرسالة، وتمنح العلامات التجارية حضوراً مميزاً.',
    ],
    bioParagraphsEn: [
      "I'm Mohammad Ali, a graphic designer specializing in social media design, visual campaigns, motion graphics, and AI-powered animation.",
      'With over 6 years of experience in visual design and content production, I have collaborated with dozens of clients and brands across different industries, creating thousands of designs and creative projects.',
      'I believe design is more than creating something visually appealing. It is a powerful visual tool to communicate ideas, shape impressions, and build distinctive brand presence.',
    ],
    bioAr: [
      'أنا محمد علي، مصمم جرافيك متخصص في تصميم محتوى السوشال ميديا، وصناعة الحملات البصرية، والموشن جرافيك، وتحريك المحتوى باستخدام الذكاء الاصطناعي.',
      'أمتلك خبرة تتجاوز 6 سنوات في مجال التصميم والإنتاج البصري، تعاونت خلالها مع عشرات العملاء والعلامات التجارية في مجالات متنوعة، وأنجزت آلاف التصاميم والمشاريع الإبداعية.',
      'أؤمن أن التصميم ليس مجرد صورة جميلة، بل أداة بصرية تصنع الانطباع، وتوصل الرسالة، وتمنح العلامات التجارية حضوراً مميزاً.',
    ].join('\n\n'),
    bioEn: [
      "I'm Mohammad Ali, a graphic designer specializing in social media design, visual campaigns, motion graphics, and AI-powered animation.",
      'With over 6 years of experience in visual design and content production, I have collaborated with dozens of clients and brands across different industries, creating thousands of designs and creative projects.',
      'I believe design is more than creating something visually appealing. It is a powerful visual tool to communicate ideas, shape impressions, and build distinctive brand presence.',
    ].join('\n\n'),
    details: {
      experienceEn: '6+ Years Experience',
      experienceAr: '+6 سنوات خبرة',
      clientsEn: 'Dozens of Clients',
      clientsAr: 'عشرات العملاء',
      outputEn: 'Thousands of Designs',
      outputAr: 'آلاف التصاميم',
      locationEn: 'Syria – Tartus',
      locationAr: 'سوريا – طرطوس',
    },
  },

  /**
   * 5. SERVICES PAGE CONTENT (EXACTLY TWO SERVICES)
   */
  services: {
    staticDesign: {
      id: 'static' as const,
      number: '01' as const,
      titleEn: 'Static Social Media Design',
      descriptionEn:
        'Creative social visuals, engaging campaigns, and cohesive brand communication designed to make every impression count.',
      titleAr: 'تصميم السوشال ميديا',
      descriptionAr:
        'تصاميم بصرية إبداعية وحملات سوشال ميديا متناسقة تمنح العلامات التجارية حضوراً مميزاً.',
      ctaEn: 'Start Static Project',
      ctaAr: 'اطلب تصميم ثابت',
    },
    motionAi: {
      id: 'motion-ai' as const,
      number: '02' as const,
      titleEn: 'Motion & AI Creative Video',
      descriptionEn:
        'Dynamic motion graphics, cinematic visual storytelling, and AI-powered creative video content.',
      titleAr: 'الموشن جرافيك والذكاء الاصطناعي',
      descriptionAr:
        'موشن جرافيك إبداعي ومشاهد سينمائية ومحتوى مرئي متحرك باستخدام تقنيات الذكاء الاصطناعي.',
      ctaEn: 'Start Motion & AI Project',
      ctaAr: 'اطلب موشن وذكاء اصطناعي',
    },
  },

  /**
   * 6. CONTACT INFORMATION & COPY
   */
  contact: {
    whatsappNumber: '+963938810078',
    whatsappDisplay: '+963 938 810 078',
    whatsappUrl: 'https://wa.me/963938810078',
    email: 'm7md.big.dude@gmail.com',
    emailUrl: 'mailto:m7md.big.dude@gmail.com',
    locationEn: 'Syria – Tartus',
    locationAr: 'سوريا – طرطوس',

    whatsappSection: {
      headingEn: "Let's Talk on WhatsApp",
      headingAr: 'لنتحدث عبر واتساب',
      supportingTextEn: "Have a project in mind? Let's discuss your ideas directly.",
      supportingTextAr: 'لديك مشروع أو فكرة؟ تواصل معي مباشرة لمناقشتها.',
      buttonEn: 'Start WhatsApp Chat',
      buttonAr: 'ابدأ المحادثة',
    },

    emailSection: {
      headingEn: "Let's Start a Project",
      headingAr: 'لنبدأ مشروعاً جديداً',
      supportingTextEn:
        "Tell me a little about your project and let's create something great together.",
      supportingTextAr: 'أخبرني قليلاً عن مشروعك، ولنبدأ معاً بصناعة شيء مميز.',
    },

    form: {
      nameLabelEn: 'Full Name',
      nameLabelAr: 'الاسم الكامل',
      namePlaceholderEn: 'Your full name',
      namePlaceholderAr: 'الاسم الكامل',
      contactLabelEn: 'Email Address or Phone Number',
      contactLabelAr: 'البريد الإلكتروني أو رقم الهاتف',
      contactPlaceholderEn: 'name@example.com or +963...',
      contactPlaceholderAr: 'name@example.com أو +963...',
      serviceLabelEn: 'Requested Service',
      serviceLabelAr: 'الخدمة المطلوبة',
      briefLabelEn: 'Project Brief',
      briefLabelAr: 'ملخص المشروع',
      briefPlaceholderEn:
        'Briefly describe your project goals, deliverables, and timeline...',
      briefPlaceholderAr:
        'اكتب نبذة مختصرة عن فكرة المشروع، الأهداف، والمخرجات المطلوبة...',
      submitButtonEn: 'Send Project Inquiry',
      submitButtonAr: 'إرسال طلب المشروع',
    },
  },

  /**
   * 7. OPTIONAL SOCIAL LINKS (Empty until official URLs are provided; never render broken/fake links)
   */
  socials: {
    instagram: '',
    behance: '',
    linkedin: '',
    facebook: '',
  },
};

export type SiteContent = typeof siteContent;
