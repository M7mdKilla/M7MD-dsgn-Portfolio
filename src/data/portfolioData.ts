/**
 * M7MD.dsgn — Portfolio & Client Data
 * 
 * CONTENT WORKFLOW:
 * This is the central catalog of all projects and clients.
 * To add or edit a project, modify this list.
 * Two approved categories: 'static' (Static Designs) and 'motion-ai' (Motion & AI).
 */

import { loadDiscoveredClientsAndProjects } from '../utils/clientDiscovery';

export type ProjectCategory = 'static' | 'motion-ai';

export interface ClientInfo {
  id: string;
  name: string;
  nameAr?: string;
  industry: string;
  industryAr: string;
  description: string;
  descriptionAr: string;
  logoSvgType: 'tech' | 'beverage' | 'fashion' | 'crypto' | 'fitness' | 'retail';
  logoUrl?: string;
  order?: number;
  confidential?: boolean;
  isTemporaryDemoContent?: boolean;
}

export interface PortfolioItem {
  id: string;
  title: string;
  titleAr: string;
  clientId: string;
  clientName: string;
  category: ProjectCategory;
  aspectRatio: '4:5' | '1:1' | '16:9' | '9:16' | '3:4';
  tagline: string;
  taglineAr: string;
  description: string;
  descriptionAr: string;
  tools: string[];
  year: string;
  featured: boolean;
  confidential?: boolean;
  isTemporaryDemoContent?: boolean;
  // Media details
  posterUrl: string; // fallback or poster image
  videoUrl?: string; // for motion & AI projects (e.g. sample interactive video stream or canvas loop)
  mediaType: 'image' | 'video';
  accentColor: string;
  stats?: {
    label: string;
    labelAr: string;
    value: string;
  };
}

const LEGACY_CLIENTS: ClientInfo[] = [
  {
    id: "zenith",
    name: "Zenith Specialty Coffee",
    industry: "Food & Beverage / Lifestyle",
    industryAr: "مشروبات وأسلوب حياة",
    description: "Artisanal roastery and specialty café chain across the GCC with a minimalist, high-end visual tone.",
    descriptionAr: "سلسلة محامص ومقاهٍ متخصصة في الخليج بطابع بصري معاصر ومينيمال.",
    logoSvgType: "beverage",
    confidential: false,
  },
  {
    id: "pulse",
    name: "Pulse Audio & Tech",
    industry: "Consumer Electronics & Sound",
    industryAr: "إلكترونيات وصوتيات",
    description: "Next-gen spatial audio headphones and smart wireless soundbars designed for creators.",
    descriptionAr: "سماعات رأس ذكية وأنظمة صوت محيطي للجيل الجديد وصناع المحتوى.",
    logoSvgType: "tech",
    confidential: false,
  },
  {
    id: "orbit",
    name: "Orbit Urban Apparel",
    industry: "Streetwear & Fashion",
    industryAr: "أزياء عصرية وستريت وير",
    description: "Futuristic oversized streetwear brand pairing functional cyberpunk aesthetics with sustainable fabrics.",
    descriptionAr: "علامة أزياء شبابية تجمع بين الطابع المستقبلي والأقمشة المستدامة.",
    logoSvgType: "fashion",
    confidential: false,
  },
  {
    id: "kayan",
    name: "Kayan Real Estate",
    industry: "Architecture & Luxury Living",
    industryAr: "عقارات وتطوير عمراني فاخر",
    description: "Boutique architectural developers specializing in high-concept desert villas and coastal penthouses.",
    descriptionAr: "مطور عقاري بوتيك للفلل الصحراوية المعمارية والشقق الساحلية الفاخرة.",
    logoSvgType: "retail",
    confidential: false,
  },
  {
    id: "nexus",
    name: "Nexus AI Labs",
    industry: "Artificial Intelligence & SaaS",
    industryAr: "ذكاء اصطناعي وبرمجيات",
    description: "Enterprise foundation models and automated visual synthesis pipelines for commercial studios.",
    descriptionAr: "أنظمة توليد ذكاء اصطناعي وحلول رقمية لمؤسسات واستوديوهات الإبداع.",
    logoSvgType: "crypto",
    confidential: false,
  },
  {
    id: "stride",
    name: "Stride Athletic Performance",
    industry: "Sports & Fitness",
    industryAr: "أداء رياضي ولياقة بدنية",
    description: "Elite endurance training programs and bio-metric athletic gear for marathon and HYROX competitors.",
    descriptionAr: "برامج تدريب نخبوية ومعدات رياضية بيومترية للرياضيين والماراثونات.",
    logoSvgType: "fitness",
    confidential: false,
  },
];

const LEGACY_PORTFOLIO_ITEMS: PortfolioItem[] = [
  // 1. Static Design - Zenith
  {
    id: "zenith-coldbrew-campaign",
    title: "Zenith Nitro Cold Brew Campaign",
    titleAr: "حملة زينيث للقهوة الباردة نايترو",
    clientId: "zenith",
    clientName: "Zenith Specialty Coffee",
    category: "static",
    aspectRatio: "4:5",
    tagline: "Social Campaign Visuals · Organic Reach",
    taglineAr: "تصاميم حملة تواصل · انتشار وتفاعل",
    description: "A series of 8 atmospheric social media hero graphics contrasting dark textured glass with golden amber coffee droplets and bold typography.",
    descriptionAr: "سلسلة من 8 تصاميم تسويقية بارزة تبرز تباين الزجاج المعتم مع قطرات القهوة الذهبية وخطوط عريضة ملفتة.",
    tools: ["Photoshop", "Illustrator"],
    year: "2026",
    featured: true,
    posterUrl: "/images/portfolio/zenith_coldbrew.svg",
    mediaType: "image",
    accentColor: "#D97706",
    stats: {
      label: "Campaign Engagement",
      labelAr: "تفاعل الحملة",
      value: "+184%",
    },
  },
  // 2. Motion & AI - Pulse Tech
  {
    id: "pulse-spatial-audio-reveal",
    title: "Pulse One 3D Spatial Audio Teaser",
    titleAr: "إعلان تشويقي ثلاثي الأبعاد لسماعات بلس ون",
    clientId: "pulse",
    clientName: "Pulse Audio & Tech",
    category: "motion-ai",
    aspectRatio: "16:9",
    tagline: "Dynamic Motion · 3D Product Simulation",
    taglineAr: "موشن جرافيك ديناميكي وتجسيم ثلاثي الأبعاد",
    description: "High-octane product reveal animation featuring exploded component physics, soundwave kinetic typography, and fluid chromatic lighting.",
    descriptionAr: "فيديو كشف منتج عالي الطاقة يتضمن تفكيك المكونات فيزيائياً وموجات صوتية وحركة طباعية لونية.",
    tools: ["After Effects", "Midjourney AI", "Photoshop"],
    year: "2026",
    featured: true,
    posterUrl: "/images/portfolio/pulse_headphones.svg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    mediaType: "video",
    accentColor: "#ccff00",
    stats: {
      label: "Video Views",
      labelAr: "مشاهدات الفيديو",
      value: "420K",
    },
  },
  // 3. Static Design - Orbit
  {
    id: "orbit-cyber-drop-editorial",
    title: "Orbit Cyber Drop 04 Lookbook",
    titleAr: "كتالوج إطلاق أوربت سايبر 04",
    clientId: "orbit",
    clientName: "Orbit Urban Apparel",
    category: "static",
    aspectRatio: "3:4",
    tagline: "Editorial Layout · Streetwear Carousel",
    taglineAr: "تنسيق تحريري وتصاميم كاروسيل ستريت وير",
    description: "Multi-slide Instagram carousel series fusing industrial architectural overlays, metallic chrome text, and street photography.",
    descriptionAr: "سلسلة كاروسيل إنستغرام تجمع بين عناصر الهندسة المعمارية الصناعية، النصوص الكرومية، والتصوير الواقعي.",
    tools: ["Photoshop", "Illustrator"],
    year: "2026",
    featured: true,
    posterUrl: "/images/portfolio/orbit_streetwear.svg",
    mediaType: "image",
    accentColor: "#a855f7",
  },
  // 4. Motion & AI - Nexus Labs
  {
    id: "nexus-synthetic-neural-loop",
    title: "Nexus Neural Intelligence Kinetic ID",
    titleAr: "هوية بصرية متحركة لنظام نكسس الذكي",
    clientId: "nexus",
    clientName: "Nexus AI Labs",
    category: "motion-ai",
    aspectRatio: "9:16",
    tagline: "AI Generative Reel · Kinetic Typography",
    taglineAr: "ريلز مولد بالذكاء الاصطناعي مع حركة نصوص",
    description: "Vertical 9:16 high-impact reel for TikTok and Instagram Reels blending AI-synthesized cybernetic vectors with kinetic Arabic and Latin typography.",
    descriptionAr: "ريلز رأسي 9:16 مصمم لمنصات تيك توك وإنستغرام يدمج بين تصاميم مولدة بالذكاء الاصطناعي وحركة نصوص عربية وإنجليزية.",
    tools: ["Runway Gen-3", "Gemini", "After Effects"],
    year: "2026",
    featured: true,
    posterUrl: "/images/portfolio/nexus_ai.svg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
    mediaType: "video",
    accentColor: "#06b6d4",
  },
  // 5. Static Design - Kayan
  {
    id: "kayan-oasis-residences",
    title: "Kayan Desert Oasis Architecture Grid",
    titleAr: "شبكة تصاميم مشروع كايان واحة الصحراء",
    clientId: "kayan",
    clientName: "Kayan Real Estate",
    category: "static",
    aspectRatio: "1:1",
    tagline: "Luxury Brand Showcase · Grid Synergy",
    taglineAr: "عرض العلامات الفاخرة وتنسيق الشبكة",
    description: "Clean monolithic post designs emphasizing stone textures, desert golden hour shadows, and architectural golden ratio lines.",
    descriptionAr: "تصاميم مربعة فائقة الأناقة تركز على ملمس الحجر، ظلال غروب الصحراء، وخطوط النسبة الذهبية المعمارية.",
    tools: ["Photoshop", "Illustrator"],
    year: "2025",
    featured: false,
    posterUrl: "/images/portfolio/kayan_oasis.svg",
    mediaType: "image",
    accentColor: "#eab308",
  },
  // 6. Motion & AI - Stride
  {
    id: "stride-hyrox-championship",
    title: "Stride HYROX World Tour Launch Film",
    titleAr: "فيلم إطلاق بطولة سترايد هايروكس العالمية",
    clientId: "stride",
    clientName: "Stride Athletic Performance",
    category: "motion-ai",
    aspectRatio: "16:9",
    tagline: "Dynamic Sports Promo · Sound Design Sync",
    taglineAr: "برومو رياضي تفاعلي متزامن مع الإيقاع",
    description: "Aggressive, high-tempo athletic montage matching beat-drops with AI-enhanced motion stabilization and glowing biometric metrics.",
    descriptionAr: "مونتاج رياضي سريع الوتيرة يتزامن مع الإيقاعات الموسيقية وتقنيات تثبيت الحركة ومؤشرات الأداء المتوهجة.",
    tools: ["After Effects", "Premiere Pro", "AI Frame Interpolation"],
    year: "2025",
    featured: true,
    posterUrl: "/images/portfolio/stride_promo.svg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
    mediaType: "video",
    accentColor: "#ef4444",
  },
  // 7. Static Design - Zenith Special Beans
  {
    id: "zenith-beans-single-origin",
    title: "Zenith Single Origin Geisha Series",
    titleAr: "سلسلة بن زيناث الفاخر سِينغل أوريجين",
    clientId: "zenith",
    clientName: "Zenith Specialty Coffee",
    category: "static",
    aspectRatio: "4:5",
    tagline: "Packaging & Social Launch Graphics",
    taglineAr: "تصاميم التغليف وحملة الإطلاق الرقمي",
    description: "Striking black and copper poster and carousel creatives highlighting tasting notes, altitude meters, and brewing rituals.",
    descriptionAr: "بوسترات وكاروسيل بالأسود والنحاسي تستعرض درجات التحميص والارتفاع وإرشادات الاستخلاص المثالية.",
    tools: ["Photoshop", "Illustrator"],
    year: "2025",
    featured: false,
    posterUrl: "/images/portfolio/zenith_beans.svg",
    mediaType: "image",
    accentColor: "#b45309",
  },
  // 8. Motion & AI - Orbit Hologram
  {
    id: "orbit-holographic-capsule",
    title: "Orbit Neo-Tokyo Capsule Teaser",
    titleAr: "إعلان تشويقي لمجموعة أوربت نيو-طوكيو",
    clientId: "orbit",
    clientName: "Orbit Urban Apparel",
    category: "motion-ai",
    aspectRatio: "9:16",
    tagline: "AI Visual Synthesizer · 3D Fashion Rig",
    taglineAr: "توليد بصري بالذكاء الاصطناعي وموشن للأزياء",
    description: "3D virtual cloth simulation and neon hologram rain effects creating a memorable viral Instagram Stories campaign.",
    descriptionAr: "محاكاة ثلاثية الأبعاد للأقمشة وتأثيرات أمطار هولوغرام نيون مخصصة لحملات الستوري ذات الانتشار السريع.",
    tools: ["Midjourney v6", "After Effects", "Luma Dream Machine"],
    year: "2026",
    featured: false,
    posterUrl: "/images/portfolio/orbit_capsule.svg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    mediaType: "video",
    accentColor: "#ec4899",
  },
];

const discoveredContent = loadDiscoveredClientsAndProjects();
const discoveredClientIds = new Set(discoveredContent.clients.map((c) => c.id));

export const CLIENTS: ClientInfo[] = [
  ...discoveredContent.clients,
  ...LEGACY_CLIENTS.filter((c) => !discoveredClientIds.has(c.id)),
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  ...discoveredContent.projects,
  ...LEGACY_PORTFOLIO_ITEMS.filter((item) => !discoveredClientIds.has(item.clientId)),
];

