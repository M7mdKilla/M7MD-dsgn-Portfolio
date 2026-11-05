import React, { useEffect, useRef } from 'react';
import { PortfolioItem } from '../data/portfolioData';
import { Language, translations } from '../locales/translations';
import { X, Play, Maximize2, Tag, Layers, User, Calendar, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

interface MediaLightboxProps {
  item: PortfolioItem | null;
  onClose: () => void;
  currentLang: Language;
  onSelectClient?: (clientId: string) => void;
  items?: PortfolioItem[];
  onNavigate?: (item: PortfolioItem) => void;
}

export const MediaLightbox: React.FC<MediaLightboxProps> = ({
  item,
  onClose,
  currentLang,
  onSelectClient,
  items = [],
  onNavigate,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const t = translations[currentLang];
  const isRtl = currentLang === 'ar';

  const currentIndex = item && items.length > 0 ? items.findIndex((i) => i.id === item.id) : -1;
  const hasNavigation = Boolean(onNavigate && items.length > 1 && currentIndex !== -1);

  const handlePrev = () => {
    if (!hasNavigation || !onNavigate) return;
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    onNavigate(items[prevIndex]);
  };

  const handleNext = () => {
    if (!hasNavigation || !onNavigate) return;
    const nextIndex = (currentIndex + 1) % items.length;
    onNavigate(items[nextIndex]);
  };

  // Handle ESC and Arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && hasNavigation) {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight' && hasNavigation) {
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, hasNavigation, currentIndex, items]);

  if (!item) return null;

  const isVideo = item.category === 'motion-ai' && item.videoUrl;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#050507]/90 backdrop-blur-xl animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Lightbox Card */}
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-[#101016] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row z-10">
        {/* Top-Right / Top-Left Close Button */}
        <button
          onClick={onClose}
          data-testid="lightbox-close-btn"
          className={`absolute top-4 z-20 p-2.5 rounded-full bg-[#09090b]/80 border border-zinc-700 hover:border-[#ccff00] text-zinc-300 hover:text-white transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00] ${
            isRtl ? 'left-4' : 'right-4'
          }`}
          aria-label={t.work.closeModal}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Media Canvas Area */}
        <div className="lg:w-7/12 bg-[#08080c] flex items-center justify-center p-4 sm:p-6 relative min-h-[300px] lg:min-h-[500px]">
          {hasNavigation && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                data-testid="lightbox-prev-btn"
                aria-label={isRtl ? 'المشروع السابق' : 'Previous project'}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-[#09090b]/85 border border-zinc-700/90 hover:border-[#ccff00] text-zinc-200 hover:text-[#ccff00] shadow-lg transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00]"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                data-testid="lightbox-next-btn"
                aria-label={isRtl ? 'المشروع التالي' : 'Next project'}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-[#09090b]/85 border border-zinc-700/90 hover:border-[#ccff00] text-zinc-200 hover:text-[#ccff00] shadow-lg transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00]"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {isVideo ? (
            <div className="relative w-full h-full flex items-center justify-center">
              <video
                key={item.id}
                ref={videoRef}
                src={item.videoUrl}
                poster={item.posterUrl !== item.videoUrl ? item.posterUrl : undefined}
                controls
                autoPlay
                playsInline
                className="max-h-[75vh] w-auto max-w-full rounded-xl shadow-lg border border-zinc-800/80"
              />
            </div>
          ) : (
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                key={item.id}
                src={item.posterUrl}
                alt={item.title}
                className="max-h-[75vh] w-auto max-w-full object-contain rounded-xl shadow-lg border border-zinc-800/80"
              />
            </div>
          )}
        </div>

        {/* Details & Metadata Panel */}
        <div className="lg:w-5/12 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[50vh] lg:max-h-[85vh] bg-[#121219]">
          <div className="space-y-6">
            {/* Category & Year Tag */}
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 border-b border-zinc-800 pb-3">
              <span className="text-[#ccff00] font-semibold uppercase tracking-wider">
                {item.category === 'static' ? t.work.categories.static : t.work.categories.motionAi}
              </span>
              <span>{item.year}</span>
            </div>

            {/* Title & Client */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-tight">
                {currentLang === 'ar' ? item.titleAr : item.title}
              </h2>
              <div className="flex items-center gap-2 text-sm text-zinc-300">
                <User className="w-4 h-4 text-[#ccff00]" />
                <span className="font-medium">{item.clientName}</span>
                {onSelectClient && (
                  <button
                    onClick={() => {
                      onSelectClient(item.clientId);
                      onClose();
                    }}
                    className="text-xs text-[#ccff00] hover:underline ml-2"
                  >
                    (View all work)
                  </button>
                )}
              </div>
            </div>

            {/* Tagline / Subtitle */}
            <p className="text-xs font-mono text-zinc-400">
              {currentLang === 'ar' ? item.taglineAr : item.tagline}
            </p>

            {/* Comprehensive Description */}
            <p className="text-sm text-zinc-300 leading-relaxed">
              {currentLang === 'ar' ? item.descriptionAr : item.description}
            </p>

            {/* Key Metric Stat (if any) */}
            {item.stats && (
              <div className="p-3.5 rounded-xl bg-[#181824] border border-zinc-800 flex items-center justify-between">
                <span className="text-xs text-zinc-400">
                  {currentLang === 'ar' ? item.stats.labelAr : item.stats.label}
                </span>
                <span className="text-lg font-bold font-mono text-[#ccff00]">
                  {item.stats.value}
                </span>
              </div>
            )}

            {/* Tools Used (Unboxed text with dots) */}
            <div>
              <span className="text-xs font-mono text-zinc-500 uppercase block mb-1.5">
                {t.work.toolsLabel}
              </span>
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-zinc-300">
                {item.tools.map((tool, idx) => (
                  <React.Fragment key={tool}>
                    <span className="px-2 py-1 rounded bg-[#1c1c28] border border-zinc-800 text-zinc-200">
                      {tool}
                    </span>
                    {idx < item.tools.length - 1 && (
                      <span className="text-zinc-700">·</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="pt-6 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-500 font-mono">
            <span>Ratio: {item.aspectRatio}</span>
            <span>M7MD.DSGN ARCHIVE</span>
          </div>
        </div>
      </div>
    </div>
  );
};
