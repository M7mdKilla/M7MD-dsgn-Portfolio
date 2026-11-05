import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Language } from '../locales/translations';
import { siteConfig, siteContent } from '../config/siteConfig';
import { aboutConfig } from '../config/aboutConfig';
import {
  validateInquiryForm,
  formatInquirySummary,
  buildInquiryEmailSubject,
  buildWhatsAppLink,
  buildMailtoLink,
  InquiryFormData,
} from '../utils/portfolio';
import { Send, ArrowUpRight, CheckCircle2, Mail, RotateCcw } from 'lucide-react';

interface ContactSectionProps {
  currentLang: Language;
  preselectedService?: 'static' | 'motion-ai' | null;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  currentLang,
  preselectedService,
}) => {
  const isRtl = currentLang === 'ar';

  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const whatsappPanelRef = useRef<HTMLDivElement | null>(null);
  const emailPanelRef = useRef<HTMLDivElement | null>(null);
  const whatsappIconRef = useRef<HTMLDivElement | null>(null);
  const emailIconRef = useRef<HTMLDivElement | null>(null);

  const [activePanel, setActivePanel] = useState<'whatsapp' | 'email' | null>(null);

  const [formData, setFormData] = useState<InquiryFormData>({
    name: '',
    contactInfo: '',
    service: preselectedService === 'motion-ai' ? 'motion-ai' : 'static',
    description: '',
  });

  const [errors, setErrors] = useState<{
    name?: string;
    contactInfo?: string;
    service?: string;
    description?: string;
  }>({});
  const [submitted, setSubmitted] = useState(false);
  const [mailtoUrl, setMailtoUrl] = useState('');
  const [preparedSubject, setPreparedSubject] = useState('');

  useEffect(() => {
    if (preselectedService === 'static' || preselectedService === 'motion-ai') {
      setFormData((prev) => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  // Entrance, idle 3D icon float, and slow neon border illumination
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (!prefersReducedMotion) {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        if (headerRef.current) {
          tl.fromTo(
            headerRef.current,
            { opacity: 0, y: -14 },
            { opacity: 1, y: 0, duration: 0.55 },
            0
          );
        }

        const panels = [whatsappPanelRef.current, emailPanelRef.current].filter(Boolean);
        if (panels.length > 0) {
          tl.fromTo(
            panels,
            { opacity: 0, y: 24, scale: 0.975 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.68,
              stagger: 0.12,
              clearProps: 'opacity,transform',
            },
            0.1
          );
        }

        // Independent floating motion for 3D WhatsApp PNG
        if (whatsappIconRef.current) {
          gsap.to(whatsappIconRef.current, {
            y: -9,
            rotationZ: -2.2,
            duration: 4.2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        }

        // Independent floating motion for 3D Email PNG
        if (emailIconRef.current) {
          gsap.to(emailIconRef.current, {
            y: 8.5,
            rotationZ: 2.4,
            duration: 4.9,
            delay: 0.75,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        }

        // Subtle continuous neon border illumination around both panels
        gsap.to('.contact-border-beam', {
          strokeDashoffset: -260,
          duration: 9,
          repeat: -1,
          ease: 'none',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Coordinated GSAP hover emphasis between Left (WhatsApp) and Right (Email & Inquiry) panels
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const waEl = whatsappPanelRef.current;
    const mailEl = emailPanelRef.current;
    if (!waEl || !mailEl) return;

    if (activePanel === null) {
      gsap.to([waEl, mailEl], {
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 0.45,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    } else if (activePanel === 'whatsapp') {
      gsap.to(waEl, {
        y: -5,
        scale: 1.012,
        opacity: 1,
        duration: 0.45,
        ease: 'power3.out',
        overwrite: 'auto',
      });
      gsap.to(mailEl, {
        y: 2,
        scale: 0.992,
        opacity: 0.88,
        duration: 0.45,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    } else {
      gsap.to(mailEl, {
        y: -5,
        scale: 1.008,
        opacity: 1,
        duration: 0.45,
        ease: 'power3.out',
        overwrite: 'auto',
      });
      gsap.to(waEl, {
        y: 2,
        scale: 0.992,
        opacity: 0.88,
        duration: 0.45,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    }
  }, [activePanel]);

  const copy = {
    kicker: isRtl ? '05 · التواصل وطلب مشروع' : '05 · CONTACT & INQUIRY',
    pageHeading: isRtl
      ? siteContent.contact.emailSection.headingAr
      : siteContent.contact.emailSection.headingEn,
    // Left Section — WhatsApp Panel
    whatsappHeading: isRtl
      ? siteContent.contact.whatsappSection.headingAr
      : siteContent.contact.whatsappSection.headingEn,
    whatsappDescription: isRtl
      ? siteContent.contact.whatsappSection.supportingTextAr
      : siteContent.contact.whatsappSection.supportingTextEn,
    whatsappButton: isRtl
      ? siteContent.contact.whatsappSection.buttonAr
      : siteContent.contact.whatsappSection.buttonEn,
    whatsappAlt: isRtl ? 'أيقونة واتساب ثلاثية الأبعاد' : '3D WhatsApp Contact Icon',
    // Right Section — Email & Project Inquiry Panel
    emailHeading: isRtl
      ? siteContent.contact.emailSection.headingAr
      : siteContent.contact.emailSection.headingEn,
    emailSupportingText: isRtl
      ? siteContent.contact.emailSection.supportingTextAr
      : siteContent.contact.emailSection.supportingTextEn,
    emailAlt: isRtl ? 'أيقونة البريد الإلكتروني ثلاثية الأبعاد' : '3D Email Contact Icon',
    fields: {
      nameLabel: isRtl
        ? siteContent.contact.form.nameLabelAr
        : siteContent.contact.form.nameLabelEn,
      namePlaceholder: isRtl
        ? siteContent.contact.form.namePlaceholderAr
        : siteContent.contact.form.namePlaceholderEn,
      contactLabel: isRtl
        ? siteContent.contact.form.contactLabelAr
        : siteContent.contact.form.contactLabelEn,
      contactPlaceholder: isRtl
        ? siteContent.contact.form.contactPlaceholderAr
        : siteContent.contact.form.contactPlaceholderEn,
      serviceLabel: isRtl
        ? siteContent.contact.form.serviceLabelAr
        : siteContent.contact.form.serviceLabelEn,
      serviceStatic: isRtl
        ? siteContent.services.staticDesign.titleAr
        : siteContent.services.staticDesign.titleEn,
      serviceMotionAi: isRtl
        ? siteContent.services.motionAi.titleAr
        : siteContent.services.motionAi.titleEn,
      briefLabel: isRtl
        ? siteContent.contact.form.briefLabelAr
        : siteContent.contact.form.briefLabelEn,
      briefPlaceholder: isRtl
        ? siteContent.contact.form.briefPlaceholderAr
        : siteContent.contact.form.briefPlaceholderEn,
    },
    submitButton: isRtl
      ? siteContent.contact.form.submitButtonAr
      : siteContent.contact.form.submitButtonEn,
    errors: {
      name: isRtl ? 'يرجى إدخال الاسم الكامل.' : 'Please enter your full name.',
      contactInfo: isRtl
        ? 'يرجى إدخال بريد إلكتروني أو رقم هاتف صحيح.'
        : 'Please enter a valid email or phone number.',
      service: isRtl ? 'يرجى اختيار الخدمة المطلوبة.' : 'Please select a requested service.',
      description: isRtl
        ? 'يرجى كتابة ملخص قصير للمشروع (5 أحرف على الأقل).'
        : 'Please provide a brief project description (at least 5 characters).',
    },
    draftReadyTitle: isRtl
      ? 'تم تجهيز مسودة طلب المشروع في تطبيق البريد'
      : 'Project Inquiry Draft Prepared for Your Email App',
    draftReadyDesc: isRtl
      ? `سيفتح تطبيق البريد الإلكتروني الافتراضي لديك مع تفاصيل مشروعك منسقة وجاهزة للإرسال إلى ${siteConfig.contact.email}.`
      : `Your configured email client opens with your formatted inquiry addressed to ${siteConfig.contact.email}, ready for you to review and send.`,
    openEmailClientBtn: isRtl ? 'فتح مسودة البريد الإلكتروني' : 'Open in Email App',
    editInquiryBtn: isRtl ? 'تعديل بيانات الطلب' : 'Edit Inquiry Details',
  };

  const defaultWaGreeting = isRtl
    ? siteConfig.contact.whatsappDefaultMessageAr
    : siteConfig.contact.whatsappDefaultMessageEn;

  const directWaUrl = defaultWaGreeting
    ? buildWhatsAppLink(siteConfig.contact.whatsappNumber, defaultWaGreeting)
    : siteConfig.contact.whatsappUrl;

  const directEmailHref = siteConfig.contact.emailUrl;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name as keyof typeof errors];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateInquiryForm(formData);

    if (!validation.isValid) {
      setErrors({
        name: validation.errors.name ? copy.errors.name : undefined,
        contactInfo: validation.errors.contactInfo ? copy.errors.contactInfo : undefined,
        service: validation.errors.service ? copy.errors.service : undefined,
        description: validation.errors.description ? copy.errors.description : undefined,
      });
      return;
    }

    const subject = buildInquiryEmailSubject(formData, currentLang);
    const body = formatInquirySummary(formData, currentLang);
    const encodedMailto = buildMailtoLink(siteConfig.contact.email, subject, body);

    setPreparedSubject(subject);
    setMailtoUrl(encodedMailto);
    setSubmitted(true);

    // Trigger visitor's configured email client with the formatted mailto link
    if (typeof document !== 'undefined') {
      const tempAnchor = document.createElement('a');
      tempAnchor.href = encodedMailto;
      tempAnchor.style.display = 'none';
      document.body.appendChild(tempAnchor);
      tempAnchor.click();
      document.body.removeChild(tempAnchor);
    }
  };

  return (
    <section
      ref={sectionRef}
      dir={isRtl ? 'rtl' : 'ltr'}
      aria-label={copy.pageHeading}
      data-testid="contact-fullscreen-section"
      className="relative w-full h-[calc(100dvh-4rem)] sm:h-[calc(100dvh-4.5rem)] overflow-hidden bg-[#09090b] select-none flex flex-col justify-between px-4 sm:px-8 md:px-12 lg:px-20 xl:px-24 py-2 sm:py-3.5 lg:py-5"
    >
      {/* Subtle Ambient Studio Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden z-0"
      >
        <div
          className="absolute -left-24 top-1/4 w-[440px] h-[440px] rounded-full opacity-25"
          style={{
            background:
              'radial-gradient(circle, rgba(37,211,102,0.35) 0%, rgba(204,255,0,0.12) 45%, transparent 72%)',
          }}
        />
        <div
          className="absolute -right-24 bottom-1/4 w-[480px] h-[480px] rounded-full opacity-25"
          style={{
            background:
              'radial-gradient(circle, rgba(204,255,0,0.28) 0%, rgba(239,68,68,0.12) 50%, transparent 72%)',
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-[1320px] mx-auto h-full flex flex-col justify-between gap-2 sm:gap-3.5 lg:gap-5 min-h-0">
        {/* Top Reserved Page Heading */}
        <div
          ref={headerRef}
          data-testid="contact-heading-block"
          className="shrink-0 text-center space-y-0.5 sm:space-y-1"
        >
          <p className="text-[10px] sm:text-xs font-mono tracking-[0.2em] uppercase text-[#ccff00]">
            {copy.kicker}
          </p>
          <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-[34px] font-extrabold text-white tracking-tight leading-tight">
            {copy.pageHeading}
          </h1>
        </div>

        {/* Two Side-by-Side Contact Panels — Left is always WhatsApp, Right is always Email & Inquiry */}
        <div
          dir="ltr"
          className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-12 gap-2.5 sm:gap-4 lg:gap-6 items-stretch"
        >
          {/* LEFT SECTION: WhatsApp Contact Panel */}
          <div
            ref={whatsappPanelRef}
            dir={isRtl ? 'rtl' : 'ltr'}
            data-testid="contact-whatsapp-panel"
            onMouseEnter={() => setActivePanel('whatsapp')}
            onMouseLeave={() => setActivePanel(null)}
            className={`md:col-span-5 relative rounded-2xl sm:rounded-3xl bg-[#111217]/95 border transition-colors duration-300 overflow-hidden flex flex-col justify-between p-3.5 sm:p-5 lg:p-7 xl:p-8 ${
              activePanel === 'whatsapp'
                ? 'border-[#ccff00]/80 shadow-[0_18px_55px_-15px_rgba(37,211,102,0.35),0_0_28px_rgba(204,255,0,0.2)]'
                : 'border-[#ccff00]/25 shadow-[0_14px_40px_-15px_rgba(0,0,0,0.75)]'
            }`}
          >
            {/* Animated SVG Neon Border Illumination */}
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 w-full h-full z-0"
              preserveAspectRatio="none"
            >
              <rect
                x="1"
                y="1"
                width="calc(100% - 2px)"
                height="calc(100% - 2px)"
                rx="22"
                ry="22"
                fill="none"
                stroke="#ccff00"
                strokeWidth="1.5"
                strokeDasharray="90 220"
                className="contact-border-beam opacity-35"
              />
            </svg>

            {/* Atmospheric Green/Lime Radial Glow behind 3D WhatsApp Icon */}
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 sm:w-72 sm:h-72 rounded-full transition-opacity duration-500 ${
                activePanel === 'whatsapp' ? 'opacity-65' : 'opacity-35'
              }`}
              style={{
                background:
                  'radial-gradient(circle, rgba(37,211,102,0.42) 0%, rgba(204,255,0,0.18) 50%, transparent 72%)',
              }}
            />

            {/* Main Content Layout: Horizontal compact on small mobile, centered vertical hero on tablet/desktop */}
            <div className="relative z-10 flex-1 min-h-0 flex flex-row md:flex-col items-center md:justify-center gap-3.5 sm:gap-5 md:text-center my-auto">
              {/* 3D WhatsApp PNG Asset */}
              <div
                ref={whatsappIconRef}
                className={`shrink-0 relative flex items-center justify-center transition-transform duration-500 ${
                  activePanel === 'whatsapp' ? 'scale-105' : 'scale-100'
                }`}
              >
                <img
                  src={aboutConfig.contactIcons.whatsapp.assetPath}
                  alt={copy.whatsappAlt}
                  referrerPolicy="no-referrer"
                  draggable={false}
                  data-testid="contact-whatsapp-3d-img"
                  className="w-[72px] h-[66px] sm:w-[98px] sm:h-[90px] md:w-[152px] md:h-[139px] lg:w-[188px] lg:h-[172px] xl:w-[208px] xl:h-[190px] object-contain select-none pointer-events-none"
                />
              </div>

              {/* Text & Details */}
              <div className="flex-1 min-w-0 space-y-1 sm:space-y-2 md:space-y-2.5">
                <h2 className="text-base sm:text-xl lg:text-2xl xl:text-[26px] font-extrabold text-white tracking-tight leading-snug">
                  {copy.whatsappHeading}
                </h2>

                {/* Configured WhatsApp Number */}
                <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-semibold text-[#ccff00] tracking-wide">
                  <span dir="ltr" data-testid="contact-whatsapp-number">
                    {siteConfig.contact.whatsappDisplay}
                  </span>
                </div>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-zinc-300/90 max-w-xs md:mx-auto leading-relaxed line-clamp-2">
                  {copy.whatsappDescription}
                </p>
              </div>
            </div>

            {/* Prominent WhatsApp CTA Button */}
            <div className="relative z-10 pt-2 sm:pt-4 md:pt-5 shrink-0">
              <a
                href={directWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="contact-whatsapp-cta"
                className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-2.5 sm:py-3.5 rounded-xl bg-[#ccff00] hover:bg-[#d8ff33] active:scale-[0.99] text-[#09090b] font-extrabold text-xs sm:text-sm tracking-tight transition-all duration-200 shadow-[0_0_24px_rgba(204,255,0,0.32)] hover:shadow-[0_0_32px_rgba(204,255,0,0.52)] whitespace-nowrap"
              >
                <span>{copy.whatsappButton}</span>
                <ArrowUpRight className="w-4 h-4 shrink-0" />
              </a>
            </div>
          </div>

          {/* RIGHT SECTION: Email & Project Inquiry Panel */}
          <div
            ref={emailPanelRef}
            dir={isRtl ? 'rtl' : 'ltr'}
            data-testid="contact-email-panel"
            onMouseEnter={() => setActivePanel('email')}
            onMouseLeave={() => setActivePanel(null)}
            className={`md:col-span-7 relative rounded-2xl sm:rounded-3xl bg-[#111217]/95 border transition-colors duration-300 overflow-hidden flex flex-col justify-between p-3.5 sm:p-5 lg:p-7 xl:p-8 ${
              activePanel === 'email'
                ? 'border-[#ccff00]/80 shadow-[0_18px_55px_-15px_rgba(204,255,0,0.28),0_0_28px_rgba(204,255,0,0.18)]'
                : 'border-zinc-800/90 shadow-[0_14px_40px_-15px_rgba(0,0,0,0.75)]'
            }`}
          >
            {/* Animated SVG Neon Border Illumination */}
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 w-full h-full z-0"
              preserveAspectRatio="none"
            >
              <rect
                x="1"
                y="1"
                width="calc(100% - 2px)"
                height="calc(100% - 2px)"
                rx="22"
                ry="22"
                fill="none"
                stroke="#ccff00"
                strokeWidth="1.5"
                strokeDasharray="90 240"
                className="contact-border-beam opacity-30"
              />
            </svg>

            {/* Subtle Atmospheric Glow behind the 3D Email Icon */}
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute -top-10 ${
                isRtl ? '-left-10' : '-right-10'
              } w-56 h-56 sm:w-68 sm:h-68 rounded-full transition-opacity duration-500 ${
                activePanel === 'email' ? 'opacity-55' : 'opacity-30'
              }`}
              style={{
                background:
                  'radial-gradient(circle, rgba(239,68,68,0.28) 0%, rgba(204,255,0,0.18) 52%, transparent 72%)',
              }}
            />

            {/* Top Header Row inside Right Panel: Heading + Supporting Text + Configured Email + Prominent 3D Email PNG */}
            <div className="relative z-10 shrink-0 flex items-center justify-between gap-3 sm:gap-4 pb-2 sm:pb-3 border-b border-zinc-800/80">
              <div className="min-w-0 space-y-0.5 sm:space-y-1">
                <h2 className="text-base sm:text-xl lg:text-2xl font-extrabold text-white tracking-tight leading-snug">
                  {copy.emailHeading}
                </h2>
                <p
                  data-testid="contact-email-supporting-text"
                  className="text-[11px] sm:text-xs text-zinc-300/90 leading-snug"
                >
                  {copy.emailSupportingText}
                </p>
                <a
                  href={directEmailHref}
                  data-testid="contact-email-address"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono font-medium text-[#ccff00] hover:underline truncate"
                >
                  <span dir="ltr">{siteConfig.contact.email}</span>
                </a>
              </div>

              {/* 3D Email PNG Asset */}
              <div
                ref={emailIconRef}
                className={`shrink-0 relative flex items-center justify-center transition-transform duration-500 ${
                  activePanel === 'email' ? 'scale-105' : 'scale-100'
                }`}
              >
                <img
                  src={aboutConfig.contactIcons.email.assetPath}
                  alt={copy.emailAlt}
                  referrerPolicy="no-referrer"
                  draggable={false}
                  data-testid="contact-email-3d-img"
                  className="w-[54px] h-[54px] sm:w-[74px] sm:h-[74px] md:w-[94px] md:h-[94px] lg:w-[112px] lg:h-[112px] xl:w-[122px] xl:h-[122px] object-contain select-none pointer-events-none"
                />
              </div>
            </div>

            {/* Form or Prepared Mailto Confirmation State */}
            <div className="relative z-10 flex-1 min-h-0 flex flex-col justify-center pt-2 sm:pt-3">
              {submitted ? (
                <div
                  data-testid="contact-mailto-ready-state"
                  className="rounded-2xl bg-[#161821]/95 border border-[#ccff00]/45 p-4 sm:p-6 space-y-3 sm:space-y-4 text-center my-auto"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#ccff00]/15 border border-[#ccff00]/60 flex items-center justify-center text-[#ccff00] mx-auto">
                    <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>

                  <div className="space-y-1 max-w-md mx-auto">
                    <h3 className="text-sm sm:text-base lg:text-lg font-bold text-white">
                      {copy.draftReadyTitle}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      {copy.draftReadyDesc}
                    </p>
                    {preparedSubject && (
                      <p className="text-[11px] font-mono text-zinc-400 pt-1 truncate">
                        {preparedSubject}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 pt-1">
                    <a
                      href={mailtoUrl}
                      data-testid="contact-open-mailto-link"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#ccff00] hover:bg-[#d8ff33] text-[#09090b] font-extrabold text-xs sm:text-sm transition-all shadow-[0_0_20px_rgba(204,255,0,0.3)] whitespace-nowrap"
                    >
                      <Mail className="w-4 h-4 shrink-0" />
                      <span>{copy.openEmailClientBtn}</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      data-testid="contact-edit-inquiry-btn"
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-zinc-800/90 hover:bg-zinc-700 text-zinc-200 font-semibold text-xs sm:text-sm transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <RotateCcw className="w-3.5 h-3.5 shrink-0" />
                      <span>{copy.editInquiryBtn}</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  data-testid="contact-inquiry-form"
                  className="flex flex-col justify-between h-full gap-2 sm:gap-3 lg:gap-3.5"
                >
                  {/* Row 1: A. Your Name & B. Email Address or Phone Number */}
                  <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5 items-start">
                    {/* A. Your Name */}
                    <div className="min-w-0">
                      <label
                        htmlFor="contact-field-name"
                        className="block text-[11px] sm:text-xs font-medium text-zinc-300 mb-1 whitespace-nowrap truncate"
                      >
                        {copy.fields.nameLabel} <span className="text-[#ccff00]">*</span>
                      </label>
                      <input
                        id="contact-field-name"
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={copy.fields.namePlaceholder}
                        className={`w-full px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl bg-[#171821] border text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none transition-colors ${
                          errors.name
                            ? 'border-rose-500/80 focus:border-rose-400'
                            : 'border-zinc-800 focus:border-[#ccff00]'
                        }`}
                      />
                      {errors.name && (
                        <span
                          role="alert"
                          data-testid="contact-error-name"
                          className="text-[10px] sm:text-[11px] text-rose-400 mt-0.5 block leading-tight"
                        >
                          {errors.name}
                        </span>
                      )}
                    </div>

                    {/* B. Email Address or Phone Number */}
                    <div className="min-w-0">
                      <label
                        htmlFor="contact-field-contactInfo"
                        className="block text-[11px] sm:text-xs font-medium text-zinc-300 mb-1 whitespace-nowrap truncate"
                      >
                        {copy.fields.contactLabel} <span className="text-[#ccff00]">*</span>
                      </label>
                      <input
                        id="contact-field-contactInfo"
                        type="text"
                        name="contactInfo"
                        required
                        value={formData.contactInfo}
                        onChange={handleChange}
                        placeholder={copy.fields.contactPlaceholder}
                        className={`w-full px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl bg-[#171821] border text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none transition-colors ${
                          errors.contactInfo
                            ? 'border-rose-500/80 focus:border-rose-400'
                            : 'border-zinc-800 focus:border-[#ccff00]'
                        }`}
                      />
                      {errors.contactInfo && (
                        <span
                          role="alert"
                          data-testid="contact-error-contactInfo"
                          className="text-[10px] sm:text-[11px] text-rose-400 mt-0.5 block leading-tight"
                        >
                          {errors.contactInfo}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Row 2: C. Requested Service (Dropdown with ONLY the 2 approved services) */}
                  <div>
                    <label
                      htmlFor="contact-field-service"
                      className="block text-[11px] sm:text-xs font-medium text-zinc-300 mb-1"
                    >
                      {copy.fields.serviceLabel} <span className="text-[#ccff00]">*</span>
                    </label>
                    <select
                      id="contact-field-service"
                      name="service"
                      required
                      value={formData.service === 'motion-ai' ? 'motion-ai' : 'static'}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl bg-[#171821] border border-zinc-800 text-xs sm:text-sm text-white focus:outline-none focus:border-[#ccff00] transition-colors cursor-pointer"
                    >
                      <option value="static">{copy.fields.serviceStatic}</option>
                      <option value="motion-ai">{copy.fields.serviceMotionAi}</option>
                    </select>
                  </div>

                  {/* Row 3: D. Project Brief (Concise textarea) */}
                  <div className="flex-1 min-h-0 flex flex-col">
                    <label
                      htmlFor="contact-field-description"
                      className="block text-[11px] sm:text-xs font-medium text-zinc-300 mb-1"
                    >
                      {copy.fields.briefLabel} <span className="text-[#ccff00]">*</span>
                    </label>
                    <textarea
                      id="contact-field-description"
                      name="description"
                      required
                      rows={2}
                      value={formData.description}
                      onChange={handleChange}
                      placeholder={copy.fields.briefPlaceholder}
                      className={`w-full flex-1 min-h-[48px] sm:min-h-[64px] max-h-[110px] resize-none px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl bg-[#171821] border text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none transition-colors ${
                        errors.description
                          ? 'border-rose-500/80 focus:border-rose-400'
                          : 'border-zinc-800 focus:border-[#ccff00]'
                      }`}
                    />
                    {errors.description && (
                      <span
                        role="alert"
                        data-testid="contact-error-description"
                        className="text-[10px] sm:text-[11px] text-rose-400 mt-0.5 block leading-tight"
                      >
                        {errors.description}
                      </span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-1 shrink-0">
                    <button
                      type="submit"
                      data-testid="contact-submit-btn"
                      className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-2.5 sm:py-3.5 rounded-xl bg-[#ccff00] hover:bg-[#d8ff33] active:scale-[0.99] text-[#09090b] font-extrabold text-xs sm:text-sm tracking-tight transition-all duration-200 shadow-[0_0_24px_rgba(204,255,0,0.3)] hover:shadow-[0_0_32px_rgba(204,255,0,0.5)] cursor-pointer whitespace-nowrap"
                    >
                      <Send className="w-4 h-4 shrink-0" />
                      <span>{copy.submitButton}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
