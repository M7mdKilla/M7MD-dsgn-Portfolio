import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterPortfolio,
  getClientShowcaseProjects,
  getFeaturedPortfolioItems,
  parseArtworkAspectRatio,
  getFeaturedCardTransformConfig,
  getFeaturedCardWidthClasses,
  validateInquiryForm,
  calculateOrbitCoordinates,
  formatInquirySummary,
  buildWhatsAppLink,
  buildMailtoLink,
} from './portfolio';
import { PORTFOLIO_ITEMS, PortfolioItem } from '../data/portfolioData';

test('filterPortfolio correctly filters by category', () => {
  const allItems = filterPortfolio(PORTFOLIO_ITEMS, 'all', 'all');
  assert.equal(allItems.length, PORTFOLIO_ITEMS.length);

  const staticItems = filterPortfolio(PORTFOLIO_ITEMS, 'static', 'all');
  assert.ok(staticItems.length > 0);
  assert.ok(staticItems.every((item) => item.category === 'static'));

  const motionItems = filterPortfolio(PORTFOLIO_ITEMS, 'motion-ai', 'all');
  assert.ok(motionItems.length > 0);
  assert.ok(motionItems.every((item) => item.category === 'motion-ai'));

  // Ensure categories sum up correctly
  assert.equal(staticItems.length + motionItems.length, allItems.length);
});

test('filterPortfolio correctly filters by client ID', () => {
  const zenithItems = filterPortfolio(PORTFOLIO_ITEMS, 'all', 'zenith');
  assert.ok(zenithItems.length >= 2);
  assert.ok(zenithItems.every((item) => item.clientId === 'zenith'));

  const pulseItems = filterPortfolio(PORTFOLIO_ITEMS, 'motion-ai', 'pulse');
  assert.ok(pulseItems.length >= 1);
  assert.ok(pulseItems.every((item) => item.clientId === 'pulse' && item.category === 'motion-ai'));
});

test('validateInquiryForm validates mandatory fields', () => {
  const emptyForm = validateInquiryForm({});
  assert.equal(emptyForm.isValid, false);
  assert.ok(emptyForm.errors.name);
  assert.ok(emptyForm.errors.contactInfo);
  assert.ok(emptyForm.errors.description);

  const validForm = validateInquiryForm({
    name: 'Sultan Al-Nuaimi',
    company: 'Zenith Roastery',
    contactInfo: 'sultan@zenith.ae',
    service: 'static',
    description: 'We need 10 campaign visuals for our upcoming product launch.',
    budget: '$2,500 – $5,000 USD',
    deliveryDate: '2026-12-15',
  });

  assert.equal(validForm.isValid, true);
  assert.deepEqual(validForm.errors, {});
});

test('calculateOrbitCoordinates returns expected trigonometric offsets', () => {
  // At 0 degrees, x = radiusX, y = 0
  const pos0 = calculateOrbitCoordinates(0, 200, 100);
  assert.equal(pos0.x, 200);
  assert.equal(pos0.y, 0);

  // At 90 degrees, x = 0, y = radiusY
  const pos90 = calculateOrbitCoordinates(90, 200, 100);
  assert.equal(pos90.x, 0);
  assert.equal(pos90.y, 100);

  // At 180 degrees, x = -200, y = 0
  const pos180 = calculateOrbitCoordinates(180, 200, 100);
  assert.equal(pos180.x, -200);
  assert.equal(pos180.y, 0);
});

test('buildWhatsAppLink and buildMailtoLink generate clean URLs', () => {
  const wa = buildWhatsAppLink('+123-456-7890', 'Hello M7MD');
  assert.equal(wa, 'https://wa.me/1234567890?text=Hello%20M7MD');

  const mail = buildMailtoLink('hello@m7mddsgn.com', 'Project Inquiry', 'Name: Salim');
  assert.equal(mail, 'mailto:hello@m7mddsgn.com?subject=Project%20Inquiry&body=Name%3A%20Salim');
});

test('formatInquirySummary builds bilingual summaries', () => {
  const summaryEn = formatInquirySummary(
    {
      name: 'Nora',
      company: 'Orbit',
      contactInfo: 'nora@orbit.com',
      service: 'motion-ai',
      description: 'Need a 3D teaser',
      budget: '$5,000',
      deliveryDate: '2026-11-20',
    },
    'en'
  );
  assert.ok(summaryEn.includes('Nora'));
  assert.ok(summaryEn.includes('Orbit'));
  assert.ok(summaryEn.includes('motion-ai'));

  const summaryAr = formatInquirySummary(
    {
      name: 'نورة',
      company: 'أوربت',
      contactInfo: 'nora@orbit.com',
      service: 'motion-ai',
      description: 'فيديو تشويقي ثلاثي الأبعاد',
      budget: '$5,000',
      deliveryDate: '2026-11-20',
    },
    'ar'
  );
  assert.ok(summaryAr.includes('نورة'));
  assert.ok(summaryAr.includes('أوربت'));
});

test('getTypographyCssVariables maps independent Arabic and English font settings', async () => {
  const { TYPOGRAPHY_CONFIG, getTypographyCssVariables } = await import('../config/typography');

  const defaultVars = getTypographyCssVariables(TYPOGRAPHY_CONFIG);
  assert.ok(defaultVars['--font-ar-heading'].includes('Alexandria'));
  assert.ok(defaultVars['--font-ar-body'].includes('IBM Plex Sans Arabic'));
  assert.ok(defaultVars['--font-en-heading'].includes('Plus Jakarta Sans'));
  assert.ok(defaultVars['--font-en-body'].includes('Plus Jakarta Sans'));
  assert.ok(defaultVars['--font-brand-logo'].includes('Plus Jakarta Sans'));

  // Verify independent override of any single font role
  const customVars = getTypographyCssVariables({
    ...TYPOGRAPHY_CONFIG,
    ar: {
      ...TYPOGRAPHY_CONFIG.ar,
      heading: { ...TYPOGRAPHY_CONFIG.ar.heading, family: "'Cairo', sans-serif" },
    },
  });
  assert.equal(customVars['--font-ar-heading'], "'Cairo', sans-serif");
  assert.ok(customVars['--font-ar-body'].includes('IBM Plex Sans Arabic'));
});

test('getClientShowcaseProjects limits visible projects to 5, preserves order, and computes overflow', () => {
  const zenithShowcase = getClientShowcaseProjects(PORTFOLIO_ITEMS, 'zenith', 5);
  assert.equal(zenithShowcase.totalCount, 2);
  assert.equal(zenithShowcase.visibleProjects.length, 2);
  assert.equal(zenithShowcase.overflowCount, 0);
  assert.equal(zenithShowcase.staticCount, 2);
  assert.equal(zenithShowcase.motionCount, 0);
  assert.equal(zenithShowcase.visibleProjects[0].id, 'zenith-coldbrew-campaign');
  assert.equal(zenithShowcase.visibleProjects[1].id, 'zenith-beans-single-origin');

  // Verify > 5 projects case computes exact overflowCount and caps visibleProjects at 5
  const baseItem = PORTFOLIO_ITEMS[0];
  const sevenMockItems: PortfolioItem[] = Array.from({ length: 7 }, (_, idx) => ({
    ...baseItem,
    id: `zenith-item-${idx + 1}`,
    clientId: 'zenith',
    category: idx % 2 === 0 ? 'static' : 'motion-ai',
    confidential: false,
  }));

  const manyShowcase = getClientShowcaseProjects(sevenMockItems, 'zenith', 5);
  assert.equal(manyShowcase.totalCount, 7);
  assert.equal(manyShowcase.visibleProjects.length, 5);
  assert.equal(manyShowcase.overflowCount, 2);
  assert.equal(manyShowcase.staticCount, 4);
  assert.equal(manyShowcase.motionCount, 3);
  assert.deepEqual(
    manyShowcase.visibleProjects.map((p) => p.id),
    ['zenith-item-1', 'zenith-item-2', 'zenith-item-3', 'zenith-item-4', 'zenith-item-5']
  );
});

test('getFeaturedPortfolioItems returns only non-confidential featured records without duplication', () => {
  const featured = getFeaturedPortfolioItems(PORTFOLIO_ITEMS);
  assert.equal(featured.length, 10);
  assert.ok(featured.every((item) => item.featured && !item.confidential));
});

test('ROVAN is discovered once as the first client record with 5 associated projects in natural order (3 static, 2 motion-ai)', async () => {
  const { CLIENTS } = await import('../data/portfolioData');
  const rovanClients = CLIENTS.filter((c) => c.id === 'rovan');
  assert.equal(rovanClients.length, 1);

  const firstClient = CLIENTS[0];
  assert.equal(firstClient.id, 'rovan');
  assert.equal(firstClient.name, 'ROVAN');
  assert.equal(firstClient.nameAr, 'ROVAN');
  assert.equal(firstClient.industry, 'Food Industry');
  assert.equal(firstClient.industryAr, 'قطاع الأغذية');
  assert.ok(firstClient.logoUrl?.endsWith('logo.png'));
  assert.equal(firstClient.order, 1);

  const rovanProjects = filterPortfolio(PORTFOLIO_ITEMS, 'all', 'rovan');
  assert.equal(rovanProjects.length, 5);
  assert.ok(rovanProjects.every((p) => p.clientId === 'rovan' && p.clientName === 'ROVAN'));

  // Natural filename order: 01, 02, 03 (static) then 04, 05 (motion-ai)
  assert.deepEqual(
    rovanProjects.map((p) => p.id),
    [
      'rovan-static-01',
      'rovan-static-02',
      'rovan-static-03',
      'rovan-motion-04',
      'rovan-motion-05',
    ]
  );

  const rovanStatic = filterPortfolio(PORTFOLIO_ITEMS, 'static', 'rovan');
  const rovanMotion = filterPortfolio(PORTFOLIO_ITEMS, 'motion-ai', 'rovan');
  assert.equal(rovanStatic.length, 3);
  assert.equal(rovanMotion.length, 2);
  assert.ok(
    rovanMotion.every(
      (p) =>
        p.mediaType === 'video' &&
        p.videoUrl?.endsWith('.mp4') &&
        p.posterUrl.endsWith('.png') &&
        p.posterUrl !== p.videoUrl
    )
  );

  const rovanShowcase = getClientShowcaseProjects(PORTFOLIO_ITEMS, 'rovan', 5);
  assert.equal(rovanShowcase.visibleProjects.length, 5);
  assert.equal(rovanShowcase.totalCount, 5);
  assert.equal(rovanShowcase.overflowCount, 0);
});

test('parseArtworkAspectRatio preserves authentic aspect ratios for portrait, square, and landscape', () => {
  const p45 = parseArtworkAspectRatio('4:5');
  assert.equal(p45.cssAspectRatio, '4 / 5');
  assert.equal(p45.numericRatio, 0.8);
  assert.equal(p45.orientation, 'portrait');

  const p916 = parseArtworkAspectRatio('9:16');
  assert.equal(p916.cssAspectRatio, '9 / 16');
  assert.equal(p916.orientation, 'portrait');

  const s11 = parseArtworkAspectRatio('1:1');
  assert.equal(s11.cssAspectRatio, '1 / 1');
  assert.equal(s11.orientation, 'square');

  const l169 = parseArtworkAspectRatio('16:9');
  assert.equal(l169.cssAspectRatio, '16 / 9');
  assert.equal(l169.orientation, 'landscape');
});

test('getFeaturedCardTransformConfig computes alternating rotations, varied vertical offsets, and unsynchronized float timings', () => {
  const c0 = getFeaturedCardTransformConfig(0);
  const c1 = getFeaturedCardTransformConfig(1);
  const c2 = getFeaturedCardTransformConfig(2);

  // Alternating clockwise (+) and counter-clockwise (-) rotations
  assert.ok(c0.baseRotateZ < 0);
  assert.ok(c1.baseRotateZ > 0);
  assert.ok(c2.baseRotateZ < 0);

  // Varied vertical offsets
  assert.notEqual(c0.baseTranslateY, c1.baseTranslateY);

  // Floating cycle duration in [5.0, 8.0] seconds and unsynchronized
  assert.ok(c0.floatDuration >= 5.0 && c0.floatDuration <= 8.0);
  assert.ok(c1.floatDuration >= 5.0 && c1.floatDuration <= 8.0);
  assert.notEqual(c0.floatDuration, c1.floatDuration);
  assert.notEqual(c0.floatDelay, c1.floatDelay);

  // Hover scale in [1.08, 1.15] and straightened rotation
  assert.ok(c0.hoverScale >= 1.08 && c0.hoverScale <= 1.15);
  assert.ok(Math.abs(c0.hoverRotateZ) < Math.abs(c0.baseRotateZ));
});

test('getFeaturedCardWidthClasses targets ~4 large cards per row on desktop, up to 5 on 2xl, 3 on tablet, and 2/1 on mobile', () => {
  const portraitClasses = getFeaturedCardWidthClasses('portrait', 8, 0.8);
  assert.ok(portraitClasses.includes('lg:w-[24%]'));
  assert.ok(portraitClasses.includes('2xl:w-[19.5%]'));
  assert.ok(portraitClasses.includes('md:w-[31.5%]'));
  assert.ok(portraitClasses.includes('min-[420px]:w-[46.5%]'));

  const storyClasses = getFeaturedCardWidthClasses('portrait', 8, 0.563);
  assert.ok(storyClasses.includes('lg:w-[21.5%]'));
  assert.ok(storyClasses.includes('2xl:w-[18%]'));

  const landscapeClasses = getFeaturedCardWidthClasses('landscape', 8, 1.778);
  assert.ok(landscapeClasses.includes('lg:w-[27.5%]'));
  assert.ok(landscapeClasses.includes('2xl:w-[21.5%]'));
});

test('getAboutContactLinks resolves localized WhatsApp and mailto links and Contact Me labels from aboutConfig', async () => {
  const { aboutConfig, getAboutContactLinks } = await import('../config/aboutConfig');

  assert.equal(
    aboutConfig.portrait.src,
    '/assets/identity/02_CONTACT_PORTRAIT_Outstretched_Hand.png'
  );
  assert.equal(
    aboutConfig.info.logoSrc,
    '/assets/identity/03_OFFICIAL_LOGO_Cropped.png'
  );
  assert.equal(
    aboutConfig.info.originalLogoSrc,
    '/assets/identity/03_OFFICIAL_LOGO_Original.png'
  );
  assert.equal(aboutConfig.contactIcons.whatsapp.assetPath, '/images/about/01_WhatsApp_3D.png');
  assert.equal(aboutConfig.contactIcons.email.assetPath, '/images/about/02_Email_3D.png');
  assert.equal(aboutConfig.info.sectionLabel, 'ABOUT ME // من أنا');
  assert.equal(aboutConfig.info.nameEn, 'Mohammad Ali');
  assert.equal(aboutConfig.info.nameAr, 'محمد علي');
  assert.equal(aboutConfig.info.professionalTitle, 'Graphic Designer');
  assert.equal(aboutConfig.info.specialization, 'Social Media Design · Motion · AI');
  assert.equal(aboutConfig.info.bioParagraphsEn.length, 3);
  assert.equal(aboutConfig.info.bioParagraphsAr.length, 3);
  assert.equal(aboutConfig.expertiseIndicators.length, 3);

  const enLinks = getAboutContactLinks('en');
  assert.equal(enLinks.whatsappHref, 'https://wa.me/963938810078');
  assert.equal(enLinks.emailHref, 'mailto:m7md.big.dude@gmail.com');
  assert.equal(enLinks.contactMeText, 'Contact Me');

  const arLinks = getAboutContactLinks('ar');
  assert.equal(arLinks.whatsappHref, 'https://wa.me/963938810078');
  assert.equal(arLinks.emailHref, 'mailto:m7md.big.dude@gmail.com');
  assert.equal(arLinks.contactMeText, 'تواصل معي');
});

test('siteConfig and siteContent store official personal info, logo, portraits, and contact links without fake socials', async () => {
  const { siteConfig, siteContent } = await import('../config/siteConfig');

  assert.equal(siteContent.personal.fullNameEn, 'Mohammad Ali');
  assert.equal(siteContent.personal.fullNameAr, 'محمد علي');
  assert.equal(siteContent.personal.brandName, 'M7MD.dsgn');
  assert.equal(siteContent.personal.professionalTitle, 'Graphic Designer');
  assert.equal(siteContent.personal.specialization, 'Social Media Design · Motion · AI');
  assert.equal(siteContent.personal.locationEn, 'Syria – Tartus');

  assert.equal(siteConfig.contact.whatsappNumber, '+963938810078');
  assert.equal(siteConfig.contact.whatsappDisplay, '+963 938 810 078');
  assert.equal(siteConfig.contact.whatsappUrl, 'https://wa.me/963938810078');
  assert.equal(siteConfig.contact.email, 'm7md.big.dude@gmail.com');
  assert.equal(siteConfig.contact.emailUrl, 'mailto:m7md.big.dude@gmail.com');

  // Ensure no fake social URLs are configured
  assert.equal(siteConfig.socials.instagram, '');
  assert.equal(siteConfig.socials.behance, '');
  assert.equal(siteConfig.socials.linkedin, '');

  assert.equal(siteConfig.logo.croppedSrc, '/assets/identity/03_OFFICIAL_LOGO_Cropped.png');
  assert.equal(siteConfig.logo.originalSrc, '/assets/identity/03_OFFICIAL_LOGO_Original.png');
  assert.equal(siteConfig.logo.objectFit, 'contain');

  assert.equal(siteConfig.portrait.src, '/assets/identity/01_HOME_PORTRAIT_Arms_Crossed.png');
  assert.equal(siteConfig.portrait.objectFit, 'contain');
  assert.equal(typeof siteConfig.portrait.scale, 'number');
  assert.equal(typeof siteConfig.portrait.offsetX, 'number');
  assert.equal(typeof siteConfig.portrait.offsetY, 'number');
  assert.ok(siteConfig.portrait.widthClasses.length > 0);
  assert.ok(siteConfig.portrait.heightClasses.length > 0);

  assert.equal(
    siteConfig.contactPortrait.src,
    '/assets/identity/02_CONTACT_PORTRAIT_Outstretched_Hand.png'
  );
  assert.equal(siteConfig.contactPortrait.objectFit, 'contain');
  assert.equal(typeof siteConfig.contactPortrait.scale, 'number');
  assert.equal(typeof siteConfig.contactPortrait.offsetX, 'number');
  assert.equal(typeof siteConfig.contactPortrait.offsetY, 'number');
  assert.ok(siteConfig.contactPortrait.widthClasses.length > 0);
  assert.ok(siteConfig.contactPortrait.heightClasses.length > 0);

  // Home and Contact portraits have independent paths and independent sizing/positioning settings
  assert.notEqual(siteConfig.portrait.src, siteConfig.contactPortrait.src);
  assert.notEqual(siteConfig.portrait.widthClasses, siteConfig.contactPortrait.widthClasses);
});

test('SERVICES_SHOWCASE_CARDS and getServiceCardInteractionState enforce opposite rotations, corner artwork placement, official bilingual copy, and focus/recede hover states', async () => {
  const { SERVICES_SHOWCASE_CARDS, getServiceCardInteractionState } = await import('./portfolio');

  const staticCard = SERVICES_SHOWCASE_CARDS.static;
  const motionCard = SERVICES_SHOWCASE_CARDS['motion-ai'];

  // Opposite rotations & swapped outer-corner artwork / inner-corner number placement
  assert.equal(staticCard.artworkCorner, 'top-left');
  assert.equal(staticCard.numberCorner, 'top-right');
  assert.equal(motionCard.artworkCorner, 'top-right');
  assert.equal(motionCard.numberCorner, 'top-left');
  assert.equal(staticCard.artworkFootprintRatio, 0.5);
  assert.equal(motionCard.artworkFootprintRatio, 0.5);
  assert.ok(staticCard.baseRotateZ < 0 && motionCard.baseRotateZ > 0);
  assert.notEqual(staticCard.floatDuration, motionCard.floatDuration);
  assert.notEqual(staticCard.floatDelay, motionCard.floatDelay);

  // Exact official English & Arabic titles and descriptions
  assert.equal(staticCard.titleEn, 'Static Social Media Design');
  assert.equal(
    staticCard.descriptionEn,
    'Creative social visuals, engaging campaigns, and cohesive brand communication designed to make every impression count.'
  );
  assert.equal(staticCard.titleAr, 'تصميم السوشال ميديا');
  assert.equal(
    staticCard.descriptionAr,
    'تصاميم بصرية إبداعية وحملات سوشال ميديا متناسقة تمنح العلامات التجارية حضوراً مميزاً.'
  );

  assert.equal(motionCard.titleEn, 'Motion & AI Creative Video');
  assert.equal(
    motionCard.descriptionEn,
    'Dynamic motion graphics, cinematic visual storytelling, and AI-powered creative video content.'
  );
  assert.equal(motionCard.titleAr, 'الموشن جرافيك والذكاء الاصطناعي');
  assert.equal(
    motionCard.descriptionAr,
    'موشن جرافيك إبداعي ومشاهد سينمائية ومحتوى مرئي متحرك باستخدام تقنيات الذكاء الاصطناعي.'
  );

  // Hover focus & recede states (450–650ms transition range)
  const staticHovered = getServiceCardInteractionState('static', 'static', false);
  const motionReceding = getServiceCardInteractionState('motion-ai', 'static', false);

  assert.ok(staticHovered.scale >= 1.04 && staticHovered.scale <= 1.07);
  assert.ok(staticHovered.zIndex > motionReceding.zIndex);
  assert.ok(Math.abs(staticHovered.rotationZ) < Math.abs(staticCard.baseRotateZ));
  assert.ok(staticHovered.transitionDuration >= 0.45 && staticHovered.transitionDuration <= 0.65);

  assert.ok(motionReceding.scale < 1);
  assert.ok(motionReceding.opacity < 1);
  assert.ok(motionReceding.brightness < 1);
});

test('4-field Contact inquiry form validates and formats mailto subject and body addressed to m7md.big.dude@gmail.com', async () => {
  const {
    validateInquiryForm,
    formatInquirySummary,
    buildInquiryEmailSubject,
    buildMailtoLink,
  } = await import('./portfolio');
  const { siteContent } = await import('../config/siteContent');

  const fourFieldData = {
    name: 'Tariq Al-Mansoor',
    contactInfo: 'tariq@creative.ae',
    service: 'static' as const,
    description: 'Need a cohesive 12-post social media campaign for our Q2 launch.',
  };

  const validation = validateInquiryForm(fourFieldData);
  assert.equal(validation.isValid, true);

  const subjectEn = buildInquiryEmailSubject(fourFieldData, 'en');
  assert.equal(subjectEn, 'Project Inquiry — Tariq Al-Mansoor | Static Social Media Design');

  const bodyEn = formatInquirySummary(fourFieldData, 'en');
  assert.ok(bodyEn.includes('Tariq Al-Mansoor'));
  assert.ok(bodyEn.includes('tariq@creative.ae'));
  assert.ok(bodyEn.includes('Static Social Media Design'));
  assert.ok(bodyEn.includes('Need a cohesive 12-post social media campaign'));
  assert.ok(!bodyEn.includes('Company / Brand'));
  assert.ok(!bodyEn.includes('Expected Budget'));
  assert.ok(!bodyEn.includes('Desired Delivery'));

  const mailto = buildMailtoLink(siteContent.contact.email, subjectEn, bodyEn);
  assert.ok(mailto.startsWith('mailto:m7md.big.dude@gmail.com?subject='));
});

test('discoverClientsFromGlobMaps discovers client folders, sorts by order, and sorts projects naturally (01, 02, 03, 10)', async () => {
  const { discoverClientsFromGlobMaps, isVideoAssetUrl } = await import('./clientDiscovery');

  const result = discoverClientsFromGlobMaps({
    manifests: {
      '../content/clients/client-b/client.json': {
        name: { en: 'Client B', ar: 'العميل ب' },
        industry: { en: 'Retail', ar: 'التجزئة' },
        description: { en: 'Retail brand description', ar: 'وصف قطاع التجزئة' },
        order: 2,
      },
      '../content/clients/client-a/client.json': {
        name: { en: 'Client A', ar: 'العميل أ' },
        industry: { en: 'Tech', ar: 'التقنية' },
        description: { en: 'Tech brand description', ar: 'وصف قطاع التقنية' },
        order: 1,
      },
    },
    logos: {
      '../content/clients/client-a/logo.png': '/assets/client-a-logo.png',
      '../content/clients/client-b/logo.png': '/assets/client-b-logo.png',
      // Unregistered folder without client.json should be ignored
      '../content/clients/orphan-folder/logo.png': '/assets/orphan-logo.png',
    },
    projectMedia: {
      '../content/clients/client-a/projects/10.jpg': '/assets/client-a/10.jpg',
      '../content/clients/client-a/projects/02.mp4': '/assets/client-a/02.mp4',
      '../content/clients/client-a/projects/01.jpg': '/assets/client-a/01.jpg',
      '../content/clients/client-b/projects/01.png': '/assets/client-b/01.png',
      '../content/clients/orphan-folder/projects/01.jpg': '/assets/orphan/01.jpg',
    },
  });

  // Sorted by order: client-a (order 1) then client-b (order 2); orphan-folder ignored
  assert.deepEqual(
    result.clients.map((c) => c.id),
    ['client-a', 'client-b']
  );
  assert.equal(result.clients[0].name, 'Client A');
  assert.equal(result.clients[0].nameAr, 'العميل أ');
  assert.equal(result.clients[0].logoUrl, '/assets/client-a-logo.png');

  // Client A projects sorted naturally: 01.jpg, 02.mp4, 10.jpg
  const clientAProjects = result.projects.filter((p) => p.clientId === 'client-a');
  assert.deepEqual(
    clientAProjects.map((p) => p.id),
    ['client-a-static-01', 'client-a-motion-02', 'client-a-static-10']
  );
  assert.equal(clientAProjects[1].category, 'motion-ai');
  assert.equal(clientAProjects[1].mediaType, 'video');
  assert.equal(clientAProjects[1].videoUrl, '/assets/client-a/02.mp4');
  assert.equal(isVideoAssetUrl(clientAProjects[1].posterUrl), true);
});




