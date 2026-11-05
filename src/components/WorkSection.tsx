import React, { useState } from 'react';
import { PORTFOLIO_ITEMS, CLIENTS, PortfolioItem, ClientInfo } from '../data/portfolioData';
import { Language, translations } from '../locales/translations';
import { filterPortfolio, getClientShowcaseProjects } from '../utils/portfolio';
import { isVideoAssetUrl } from '../utils/clientDiscovery';
import { MediaLightbox } from './MediaLightbox';
import { FeaturedHighlightsGallery } from './FeaturedHighlightsGallery';
import { ArrowUpRight, X } from 'lucide-react';

interface WorkSectionProps {
  currentLang: Language;
}

/**
 * Renders the client's distinctive vector brand mark inside the oversized circular corner badge.
 * Uses the client's existing logoSvgType or falls back cleanly to client initials.
 */
const ClientCornerLogoMark: React.FC<{ client: ClientInfo }> = ({ client }) => {
  if (client.logoUrl) {
    return (
      <img
        src={client.logoUrl}
        alt={`${client.name} logo`}
        data-testid={`client-logo-img-${client.id}`}
        className="w-[78%] h-[78%] object-contain select-none pointer-events-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]"
      />
    );
  }

  const initials = client.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();

  switch (client.logoSvgType) {
    case 'beverage':
      return (
        <div className="flex flex-col items-center justify-center gap-0.5 select-none">
          <svg className="w-9 h-9 sm:w-10 sm:h-10 text-[#ccff00]" viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <path
              d="M20 5C13.5 11.5 11 17.5 11 23.5C11 28.7467 15.0294 33 20 33C24.9706 33 29 28.7467 29 23.5C29 17.5 26.5 11.5 20 5Z"
              stroke="currentColor"
              strokeWidth="2.2"
              fill="rgba(204,255,0,0.1)"
            />
            <path
              d="M20 11C17.5 16.5 17.5 23.5 20 30"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <circle cx="20" cy="21" r="2.2" fill="currentColor" />
          </svg>
          <span className="text-[10px] font-mono font-extrabold tracking-[0.2em] text-zinc-200">{initials}</span>
        </div>
      );
    case 'tech':
      return (
        <div className="flex flex-col items-center justify-center gap-0.5 select-none">
          <svg className="w-9 h-9 sm:w-10 sm:h-10 text-[#ccff00]" viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <path
              d="M7 20H12L15.5 11L20 29L24.5 14L28 20H33"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="20" cy="20" r="14" stroke="currentColor" strokeOpacity="0.28" strokeWidth="1.5" />
          </svg>
          <span className="text-[10px] font-mono font-extrabold tracking-[0.2em] text-zinc-200">{initials}</span>
        </div>
      );
    case 'fashion':
      return (
        <div className="flex flex-col items-center justify-center gap-0.5 select-none">
          <svg className="w-9 h-9 sm:w-10 sm:h-10 text-[#ccff00]" viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <ellipse cx="20" cy="20" rx="14" ry="7.5" transform="rotate(-28 20 20)" stroke="currentColor" strokeWidth="2.2" />
            <ellipse cx="20" cy="20" rx="14" ry="7.5" transform="rotate(28 20 20)" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.6" />
            <circle cx="20" cy="20" r="3" fill="currentColor" />
          </svg>
          <span className="text-[10px] font-mono font-extrabold tracking-[0.2em] text-zinc-200">{initials}</span>
        </div>
      );
    case 'retail':
      return (
        <div className="flex flex-col items-center justify-center gap-0.5 select-none">
          <svg className="w-9 h-9 sm:w-10 sm:h-10 text-[#ccff00]" viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <path
              d="M10 29V15L20 8L30 15V29H10Z"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinejoin="round"
              fill="rgba(204,255,0,0.08)"
            />
            <path d="M16 29V19H24V29" stroke="currentColor" strokeWidth="1.8" />
          </svg>
          <span className="text-[10px] font-mono font-extrabold tracking-[0.2em] text-zinc-200">{initials}</span>
        </div>
      );
    case 'crypto':
      return (
        <div className="flex flex-col items-center justify-center gap-0.5 select-none">
          <svg className="w-9 h-9 sm:w-10 sm:h-10 text-[#ccff00]" viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <polygon
              points="20,6 32,13 32,27 20,34 8,27 8,13"
              stroke="currentColor"
              strokeWidth="2.2"
              fill="rgba(204,255,0,0.09)"
            />
            <path d="M20 6V20M20 20L32 13M20 20L8 13M20 20V34" stroke="currentColor" strokeOpacity="0.6" strokeWidth="1.5" />
            <circle cx="20" cy="20" r="2.6" fill="currentColor" />
          </svg>
          <span className="text-[10px] font-mono font-extrabold tracking-[0.2em] text-zinc-200">{initials}</span>
        </div>
      );
    case 'fitness':
      return (
        <div className="flex flex-col items-center justify-center gap-0.5 select-none">
          <svg className="w-9 h-9 sm:w-10 sm:h-10 text-[#ccff00]" viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <path
              d="M9 24L18 11H24L19 19H29L17 31L20 24H9Z"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinejoin="round"
              fill="rgba(204,255,0,0.12)"
            />
          </svg>
          <span className="text-[10px] font-mono font-extrabold tracking-[0.2em] text-zinc-200">{initials}</span>
        </div>
      );
    default:
      return (
        <span className="text-xl sm:text-2xl font-extrabold font-mono tracking-wider text-[#ccff00] select-none">
          {initials}
        </span>
      );
  }
};

export const WorkSection: React.FC<WorkSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const [activeTab, setActiveTab] = useState<'all-work' | 'clients'>('all-work');
  const [selectedClientId, setSelectedClientId] = useState<string>('all');
  const [activeLightboxItem, setActiveLightboxItem] = useState<PortfolioItem | null>(null);

  // All non-confidential portfolio items in their original order (or filtered by client when navigated from Clients Showcase)
  const allWorkItems = filterPortfolio(PORTFOLIO_ITEMS, 'all', selectedClientId);

  // Public clients
  const publicClients = CLIENTS.filter((c) => !c.confidential);

  const handleSelectClientFromModal = (clientId: string) => {
    setSelectedClientId(clientId);
    setActiveTab('all-work');
  };

  const activeClient =
    selectedClientId !== 'all'
      ? publicClients.find((c) => c.id === selectedClientId)
      : undefined;
  const activeClientName = activeClient
    ? currentLang === 'ar' && activeClient.nameAr
      ? activeClient.nameAr
      : activeClient.name
    : undefined;

  return (
    <div className="w-full h-[calc(100svh-4.5rem)] overflow-y-auto px-4 sm:px-6 lg:px-12 py-8 bg-[#09090b]">
      <div className="max-w-7xl mx-auto space-y-8 pb-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-800/80 pb-6 transition-stagger-1">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-medium text-[#ccff00]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00]" />
              <span>02 // PORTFOLIO</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {t.work.title}
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 max-w-2xl">
              {t.work.subtitle}
            </p>
          </div>

          {/* Sub-Tabs: All Work / Clients Showcase (Strictly Two Tabs) */}
          <div
            data-testid="work-tabs-nav"
            className="inline-flex items-center gap-1 p-1 bg-[#121218] border border-zinc-800 rounded-xl shrink-0 transition-stagger-2"
          >
            <button
              type="button"
              data-testid="work-tab-all-work"
              onClick={() => {
                setSelectedClientId('all');
                setActiveTab('all-work');
              }}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                activeTab === 'all-work'
                  ? 'bg-[#ccff00] text-[#09090b] font-bold shadow-[0_0_12px_rgba(204,255,0,0.2)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {t.work.tabs.featured}
            </button>
            <button
              type="button"
              data-testid="work-tab-clients"
              onClick={() => setActiveTab('clients')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                activeTab === 'clients'
                  ? 'bg-[#ccff00] text-[#09090b] font-bold shadow-[0_0_12px_rgba(204,255,0,0.2)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {t.work.tabs.clients}
            </button>
          </div>
        </div>

        {/* =========================================================================
            TAB 1: ALL WORK (RESTORED FEATURED HIGHLIGHTS 3D ARTWORK-ONLY GALLERY)
           ========================================================================= */}
        {activeTab === 'all-work' && (
          <div className="space-y-4 transition-stagger-3" data-testid="all-work-panel">
            {selectedClientId !== 'all' && activeClientName && (
              <div className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-[#121218]/90 border border-[#ccff00]/35">
                <span className="text-xs font-mono text-zinc-300">
                  {currentLang === 'ar'
                    ? `عرض أعمال العميل: ${activeClientName}`
                    : `Showing projects for: ${activeClientName}`}
                </span>
                <button
                  type="button"
                  data-testid="all-work-client-reset"
                  onClick={() => setSelectedClientId('all')}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#181824] hover:bg-[#ccff00] text-xs font-semibold text-[#ccff00] hover:text-[#09090b] transition-colors cursor-pointer"
                >
                  <span>{currentLang === 'ar' ? 'عرض كافة الأعمال' : 'Show All Work'}</span>
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <FeaturedHighlightsGallery
              items={allWorkItems}
              currentLang={currentLang}
              onSelectArtwork={(item) => setActiveLightboxItem(item)}
            />
          </div>
        )}

        {/* =========================================================================
            TAB 2: CLIENTS SHOWCASE (CREATIVE CLIENT SHOWCASE CARDS)
           ========================================================================= */}
        {activeTab === 'clients' && (
          <div className="pt-10 pb-8 px-4 sm:px-7 overflow-visible transition-stagger-3">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-12 gap-y-16 overflow-visible">
              {publicClients.map((client) => {
                const { visibleProjects } = getClientShowcaseProjects(
                  PORTFOLIO_ITEMS,
                  client.id,
                  5
                );

                const isRtl = currentLang === 'ar';
                const clientDisplayName = isRtl && client.nameAr ? client.nameAr : client.name;
                const industryLabel = isRtl ? client.industryAr : client.industry;
                const descriptionText = isRtl ? client.descriptionAr : client.description;
                const viewClientWorkText = isRtl ? 'استعراض أعمال العميل' : 'View Client Work';

                const handleOpenClientProjects = () => {
                  setSelectedClientId(client.id);
                  setActiveTab('all-work');
                };

                return (
                  <article
                    key={client.id}
                    onClick={handleOpenClientProjects}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleOpenClientProjects();
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={`${client.name} — ${viewClientWorkText}`}
                    data-testid={`client-showcase-card-${client.id}`}
                    className="group/card relative overflow-visible rounded-3xl bg-gradient-to-br from-[#14141d] via-[#101017] to-[#0b0b10] border border-zinc-800/90 hover:border-[#ccff00]/50 p-6 sm:p-8 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:shadow-[0_24px_60px_-15px_rgba(0,0,0,0.85),0_0_35px_rgba(204,255,0,0.1)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00]"
                  >
                    {/* Subtle Ambient Card Surface Glow on Hover */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_top_left,rgba(204,255,0,0.07),transparent_55%)] opacity-60 group-hover/card:opacity-100 transition-opacity duration-500"
                    />

                    {/* 1. OVERSIZED CLIENT LOGO CORNER BADGE (Protruding Upper Corner, ~10% area) */}
                    <div
                      data-testid={`client-corner-badge-${client.id}`}
                      className={`
                        absolute -top-10 sm:-top-12 z-20
                        ${isRtl ? '-right-6 sm:-right-7' : '-left-6 sm:-left-7'}
                        w-28 h-28 sm:w-32 sm:h-32 rounded-full
                        bg-[radial-gradient(circle_at_30%_25%,#20202e_0%,#111118_65%,#09090b_100%)]
                        border-2 border-[#ccff00]/85
                        shadow-[0_14px_32px_rgba(0,0,0,0.85),0_0_24px_rgba(204,255,0,0.24),inset_0_1px_2px_rgba(255,255,255,0.15)]
                        group-hover/card:border-[#ccff00]
                        group-hover/card:shadow-[0_16px_36px_rgba(0,0,0,0.9),0_0_32px_rgba(204,255,0,0.38),inset_0_1px_2px_rgba(255,255,255,0.2)]
                        transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                        flex items-center justify-center
                      `}
                    >
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-1.5 rounded-full border border-[#ccff00]/20 group-hover/card:border-[#ccff00]/40 transition-colors duration-500"
                      />
                      <ClientCornerLogoMark client={client} />
                    </div>

                    {/* 2 & 3. CLIENT NAME & SINGLE CLIENT INDUSTRY LABEL (Beside the oversized badge) */}
                    <header
                      className={`relative z-10 pb-5 border-b border-zinc-800/75 ${
                        isRtl ? 'pr-24 sm:pr-28 text-right' : 'pl-24 sm:pl-28 text-left'
                      }`}
                    >
                      <span
                        data-testid={`client-industry-${client.id}`}
                        className="inline-flex items-center gap-1.5 text-[11px] font-mono font-medium text-[#ccff00]/90 tracking-wide"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00]" />
                        {industryLabel}
                      </span>

                      <h3 className="text-2xl sm:text-[26px] font-extrabold text-white tracking-tight mt-1 group-hover/card:text-[#ccff00] transition-colors duration-300">
                        {clientDisplayName}
                      </h3>
                    </header>

                    {/* 4, 5 & 6. TWO-SIDED CARD BODY: Project Thumbnail Stack + Client Description & View Client Work CTA */}
                    <div
                      dir="ltr"
                      className="relative z-10 pt-6 grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-center overflow-visible"
                    >
                      {/* PROJECT THUMBNAIL STACK (Up to first 5 available projects in existing order) */}
                      <div className="md:col-span-7 overflow-visible flex items-center justify-center md:justify-start">
                        {visibleProjects.length > 0 && (
                          <div
                            data-testid={`client-thumbnail-stack-${client.id}`}
                            className="relative flex items-center py-3 px-1 overflow-visible max-w-full"
                          >
                            <div className="flex items-center overflow-visible">
                              {visibleProjects.map((project, idx) => {
                                const projectTitle = isRtl ? project.titleAr : project.title;
                                const baseZClasses = ['z-[1]', 'z-[2]', 'z-[3]', 'z-[4]', 'z-[5]'];
                                const baseZClass = baseZClasses[idx] || 'z-[5]';
                                const isDenseStack = visibleProjects.length >= 4;

                                return (
                                  <button
                                    key={project.id}
                                    type="button"
                                    data-testid={`client-thumb-${client.id}-${idx}`}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setActiveLightboxItem(project);
                                    }}
                                    aria-label={`${projectTitle} — ${client.name}`}
                                    className={`
                                      group/thumb relative shrink-0
                                      ${
                                        isDenseStack
                                          ? 'w-[72px] h-[100px] sm:w-[82px] sm:h-[114px]'
                                          : 'w-24 h-32 sm:w-28 sm:h-36'
                                      }
                                      ${
                                        idx > 0
                                          ? isDenseStack
                                            ? '-ml-6 sm:-ml-7'
                                            : '-ml-7 sm:-ml-8'
                                          : ''
                                      }
                                      ${baseZClass}
                                      rounded-xl overflow-hidden
                                      bg-zinc-950 border border-zinc-700/85
                                      shadow-[0_10px_24px_-4px_rgba(0,0,0,0.85)]
                                      transition-all duration-[380ms] ease-[cubic-bezier(0.16,1,0.3,1)]
                                      will-change-transform
                                      hover:z-40 focus-visible:z-40 active:z-40
                                      hover:scale-[1.16] focus-visible:scale-[1.16] active:scale-[1.14]
                                      hover:-translate-y-3.5 focus-visible:-translate-y-3.5 active:-translate-y-2.5
                                      hover:border-[#ccff00] focus-visible:border-[#ccff00]
                                      hover:shadow-[0_22px_42px_-6px_rgba(0,0,0,0.96),0_0_24px_rgba(204,255,0,0.5)]
                                      focus-visible:shadow-[0_22px_42px_-6px_rgba(0,0,0,0.96),0_0_24px_rgba(204,255,0,0.5)]
                                      focus-visible:outline-none
                                      cursor-pointer
                                    `}
                                  >
                                    {isVideoAssetUrl(project.posterUrl) ? (
                                      <video
                                        src={project.videoUrl || project.posterUrl}
                                        muted
                                        playsInline
                                        preload="metadata"
                                        className="w-full h-full object-cover object-center brightness-95 contrast-100 group-hover/thumb:brightness-110 group-hover/thumb:contrast-105 transition-all duration-[380ms] pointer-events-none"
                                      />
                                    ) : (
                                      <img
                                        src={project.posterUrl}
                                        alt={projectTitle}
                                        className="w-full h-full object-cover object-center brightness-95 contrast-100 group-hover/thumb:brightness-110 group-hover/thumb:contrast-105 transition-all duration-[380ms]"
                                      />
                                    )}
                                    <div
                                      aria-hidden="true"
                                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-white/5 opacity-80 group-hover/thumb:opacity-40 transition-opacity duration-[380ms]"
                                    />
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* CLIENT DESCRIPTION & VIEW CLIENT WORK BUTTON */}
                      <div
                        dir={isRtl ? 'rtl' : 'ltr'}
                        className={`md:col-span-5 relative z-20 flex flex-col justify-between space-y-5 md:border-l md:border-zinc-800/75 md:pl-5 ${
                          isRtl ? 'text-right' : 'text-left'
                        }`}
                      >
                        <p
                          data-testid={`client-description-${client.id}`}
                          className="text-sm text-zinc-300 leading-relaxed"
                        >
                          {descriptionText}
                        </p>

                        <div
                          className={`pt-2 flex items-center ${
                            isRtl ? 'justify-start' : 'justify-start'
                          }`}
                        >
                          <button
                            type="button"
                            data-testid={`client-view-work-btn-${client.id}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenClientProjects();
                            }}
                            className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#161621] hover:bg-[#ccff00] border border-[#ccff00]/45 hover:border-[#ccff00] text-xs sm:text-sm font-bold text-[#ccff00] hover:text-[#09090b] shadow-[0_6px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_22px_rgba(204,255,0,0.4)] transition-all duration-300 cursor-pointer group/btn"
                          >
                            <span>{viewClientWorkText}</span>
                            <ArrowUpRight
                              className={`w-4 h-4 transition-transform duration-300 ${
                                isRtl
                                  ? '-scale-x-100 group-hover/btn:-translate-x-0.5 group-hover/btn:-translate-y-0.5'
                                  : 'group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Media Lightbox Viewer Modal */}
      {activeLightboxItem && (
        <MediaLightbox
          item={activeLightboxItem}
          onClose={() => setActiveLightboxItem(null)}
          currentLang={currentLang}
          onSelectClient={handleSelectClientFromModal}
          items={allWorkItems}
          onNavigate={(nextItem) => setActiveLightboxItem(nextItem)}
        />
      )}
    </div>
  );
};

