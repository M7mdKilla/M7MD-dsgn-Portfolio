import React, { useState } from 'react';
import { siteConfig } from '../config/siteConfig';
import { Language, translations } from '../locales/translations';
import { buildWhatsAppLink } from '../utils/portfolio';
import { Mail } from 'lucide-react';

interface ContactDockProps {
  currentLang: Language;
}

export const ContactDock: React.FC<ContactDockProps> = ({ currentLang }) => {
  const [hoveredButton, setHoveredButton] = useState<'whatsapp' | 'email' | null>(null);
  const t = translations[currentLang];
  const isRtl = currentLang === 'ar';

  const defaultGreeting =
    currentLang === 'ar'
      ? siteConfig.contact.whatsappDefaultMessageAr
      : siteConfig.contact.whatsappDefaultMessageEn;

  const whatsappLink = defaultGreeting
    ? buildWhatsAppLink(siteConfig.contact.whatsappNumber, defaultGreeting)
    : siteConfig.contact.whatsappUrl;

  const emailLink = siteConfig.contact.emailUrl;

  return (
    <aside
      className={`fixed bottom-5 z-40 flex flex-col gap-3 transition-all ${
        isRtl ? 'right-4 sm:right-6' : 'left-4 sm:left-6'
      }`}
      aria-label="Direct Contact Shortcuts"
    >
      {/* 1. WhatsApp Icon Button */}
      <div
        className="group relative flex items-center"
        onMouseEnter={() => setHoveredButton('whatsapp')}
        onMouseLeave={() => setHoveredButton(null)}
      >
        {/* Compact Tooltip */}
        <div
          role="tooltip"
          className={`absolute top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-200 z-50 whitespace-nowrap ${
            isRtl ? 'right-full mr-3' : 'left-full ml-3'
          } ${
            hoveredButton === 'whatsapp'
              ? 'opacity-100 translate-x-0 scale-100'
              : `opacity-0 ${isRtl ? 'translate-x-1.5' : '-translate-x-1.5'} scale-95 group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-100 group-focus-within:opacity-100 group-focus-within:translate-x-0 group-focus-within:scale-100`
          }`}
        >
          <div className="px-2.5 py-1 rounded-lg bg-[#14141c]/95 backdrop-blur-md border border-[#ccff00]/45 shadow-[0_4px_18px_rgba(0,0,0,0.85),0_0_12px_rgba(204,255,0,0.18)] text-xs font-medium text-[#f4f4f5]">
            {t.dock.whatsapp}
          </div>
        </div>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setHoveredButton('whatsapp')}
          onMouseLeave={() => setHoveredButton(null)}
          onFocus={() => setHoveredButton('whatsapp')}
          onBlur={() => setHoveredButton(null)}
          className="flex items-center justify-center w-11 h-11 rounded-full bg-[#14141c]/95 backdrop-blur-md border border-[#ccff00]/45 text-[#ccff00] shadow-[0_4px_16px_rgba(0,0,0,0.8),0_0_10px_rgba(204,255,0,0.14)] hover:text-[#d9ff33] hover:bg-[#1a1a26] hover:border-[#ccff00] hover:scale-110 hover:shadow-[0_0_24px_rgba(204,255,0,0.55),0_0_8px_rgba(204,255,0,0.35)] active:scale-95 transition-all duration-200 ease-out cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00]"
          aria-label={t.dock.whatsapp}
        >
          {/* Recognizable WhatsApp Vector Icon with lime-green foreground */}
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 fill-current drop-shadow-[0_0_5px_rgba(204,255,0,0.3)]"
            aria-hidden="true"
          >
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.24 8.24-1.45 0-2.88-.38-4.13-1.12l-.3-.18-3.12.82.83-3.04-.2-.31a8.17 8.17 0 0 1-1.26-4.41c0-4.54 3.7-8.24 8.24-8.24m4.52 11.53c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08s.89 2.42 1.01 2.59c.13.17 1.75 2.67 4.24 3.75.59.26 1.05.41 1.41.53.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.11-.23-.17-.48-.29z" />
          </svg>
        </a>
      </div>

      {/* 2. Direct Email Icon Button */}
      <div
        className="group relative flex items-center"
        onMouseEnter={() => setHoveredButton('email')}
        onMouseLeave={() => setHoveredButton(null)}
      >
        {/* Compact Tooltip */}
        <div
          role="tooltip"
          className={`absolute top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-200 z-50 whitespace-nowrap ${
            isRtl ? 'right-full mr-3' : 'left-full ml-3'
          } ${
            hoveredButton === 'email'
              ? 'opacity-100 translate-x-0 scale-100'
              : `opacity-0 ${isRtl ? 'translate-x-1.5' : '-translate-x-1.5'} scale-95 group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-100 group-focus-within:opacity-100 group-focus-within:translate-x-0 group-focus-within:scale-100`
          }`}
        >
          <div className="px-2.5 py-1 rounded-lg bg-[#14141c]/95 backdrop-blur-md border border-[#ccff00]/45 shadow-[0_4px_18px_rgba(0,0,0,0.85),0_0_12px_rgba(204,255,0,0.18)] text-xs font-medium text-[#f4f4f5]">
            {t.dock.email}
          </div>
        </div>

        <a
          href={emailLink}
          onMouseEnter={() => setHoveredButton('email')}
          onMouseLeave={() => setHoveredButton(null)}
          onFocus={() => setHoveredButton('email')}
          onBlur={() => setHoveredButton(null)}
          className="flex items-center justify-center w-11 h-11 rounded-full bg-[#14141c]/95 backdrop-blur-md border border-[#ccff00]/45 text-[#ccff00] shadow-[0_4px_16px_rgba(0,0,0,0.8),0_0_10px_rgba(204,255,0,0.14)] hover:text-[#d9ff33] hover:bg-[#1a1a26] hover:border-[#ccff00] hover:scale-110 hover:shadow-[0_0_24px_rgba(204,255,0,0.55),0_0_8px_rgba(204,255,0,0.35)] active:scale-95 transition-all duration-200 ease-out cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00]"
          aria-label={t.dock.email}
        >
          <Mail
            className="w-5 h-5 stroke-[2] drop-shadow-[0_0_5px_rgba(204,255,0,0.3)]"
            aria-hidden="true"
          />
        </a>
      </div>
    </aside>
  );
};
