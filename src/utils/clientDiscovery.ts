/**
 * M7MD.dsgn — Automatic Build-Time Client & Project Discovery
 *
 * Scans `src/content/clients/<client-slug>/` at build time:
 *   - `client.json` (bilingual name, industry, description, sort order)
 *   - `logo.<ext>` (client brand logo)
 *   - `projects/*` (project images & videos sorted naturally: 01, 02, 03...)
 */

import type { ClientInfo, PortfolioItem, ProjectCategory } from '../data/portfolioData';

export interface RawBilingualField {
  en?: string;
  ar?: string;
}

export interface RawClientManifest {
  id?: string;
  name?: string | RawBilingualField;
  nameEn?: string;
  nameAr?: string;
  industry?: string | RawBilingualField;
  industryEn?: string;
  industryAr?: string;
  description?: string | RawBilingualField;
  descriptionEn?: string;
  descriptionAr?: string;
  order?: number;
  sortOrder?: number;
  logoSvgType?: ClientInfo['logoSvgType'];
  confidential?: boolean;
  isTemporaryDemoContent?: boolean;
}

export interface ClientDiscoveryGlobMaps {
  manifests: Record<string, unknown>;
  logos: Record<string, string>;
  projectMedia: Record<string, string>;
}

const naturalCollator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: 'base',
});

/**
 * Natural filename / identifier comparison (e.g. "01.jpg" < "02.jpg" < "10.jpg").
 */
export function naturalCompare(a: string, b: string): number {
  return naturalCollator.compare(a, b);
}

const IMAGE_EXTENSIONS = new Set(['jpg', 'jpeg', 'png', 'webp', 'avif', 'gif', 'svg']);
const VIDEO_EXTENSIONS = new Set(['mp4', 'webm', 'mov']);
const LOGO_PRIORITY = ['png', 'svg', 'webp', 'jpg', 'jpeg', 'avif'];

/**
 * Checks whether a resolved URL points directly to a video media file (.mp4, .webm, .mov).
 */
export function isVideoAssetUrl(url: string | undefined): boolean {
  if (!url) return false;
  const cleanUrl = url.split('?')[0].split('#')[0];
  const ext = cleanUrl.split('.').pop()?.toLowerCase() || '';
  return VIDEO_EXTENSIONS.has(ext);
}

function resolveBilingualPair(
  field: string | RawBilingualField | undefined,
  explicitEn: string | undefined,
  explicitAr: string | undefined,
  fallbackEn: string = ''
): { en: string; ar: string } {
  let en = '';
  let ar = '';

  if (field && typeof field === 'object') {
    en = typeof field.en === 'string' ? field.en.trim() : '';
    ar = typeof field.ar === 'string' ? field.ar.trim() : '';
  } else if (typeof field === 'string') {
    en = field.trim();
  }

  if (!en && typeof explicitEn === 'string') {
    en = explicitEn.trim();
  }
  if (!ar && typeof explicitAr === 'string') {
    ar = explicitAr.trim();
  }

  if (!en && ar) en = ar;
  if (!en) en = fallbackEn;
  if (!ar) ar = en;

  return { en, ar };
}

function parseFilenameParts(filename: string): {
  stem: string;
  ext: string;
  posterTargetStem: string | null;
} {
  const lastDot = filename.lastIndexOf('.');
  if (lastDot <= 0) {
    return { stem: filename, ext: '', posterTargetStem: null };
  }
  const stem = filename.slice(0, lastDot);
  const ext = filename.slice(lastDot + 1).toLowerCase();

  // Detect optional companion poster files such as "04-poster.png", "04_poster.jpg", "04.poster.webp", "04-thumb.png"
  const posterMatch = stem.match(/^(.+?)(?:[-_.]poster|[-_.]thumb)$/i);
  const posterTargetStem =
    posterMatch && IMAGE_EXTENSIONS.has(ext) ? posterMatch[1] : null;

  return { stem, ext, posterTargetStem };
}

/**
 * Pure discovery engine transforming build-time glob maps into sorted ClientInfo[] and PortfolioItem[].
 */
export function discoverClientsFromGlobMaps(
  maps: ClientDiscoveryGlobMaps
): {
  clients: ClientInfo[];
  projects: PortfolioItem[];
} {
  interface DiscoveredClientEntry {
    folderSlug: string;
    order: number;
    client: ClientInfo;
    projects: PortfolioItem[];
  }

  const entriesByFolder = new Map<
    string,
    {
      manifest?: RawClientManifest;
      logos: Array<{ ext: string; url: string }>;
      projectFiles: Array<{ filename: string; url: string }>;
    }
  >();

  const ensureFolder = (folderSlug: string) => {
    let record = entriesByFolder.get(folderSlug);
    if (!record) {
      record = { logos: [], projectFiles: [] };
      entriesByFolder.set(folderSlug, record);
    }
    return record;
  };

  // 1. Collect client.json manifests
  for (const [rawPath, rawModule] of Object.entries(maps.manifests)) {
    const normalizedPath = rawPath.replace(/\\/g, '/');
    const match = normalizedPath.match(/(?:^|\/)content\/clients\/([^/]+)\/client\.json$/i);
    if (!match) continue;

    const folderSlug = match[1];
    const manifestObj =
      rawModule &&
      typeof rawModule === 'object' &&
      'default' in (rawModule as Record<string, unknown>) &&
      typeof (rawModule as Record<string, unknown>).default === 'object'
        ? ((rawModule as Record<string, unknown>).default as RawClientManifest)
        : (rawModule as RawClientManifest);

    if (!manifestObj || typeof manifestObj !== 'object') continue;
    ensureFolder(folderSlug).manifest = manifestObj;
  }

  // 2. Collect client logos
  for (const [rawPath, url] of Object.entries(maps.logos)) {
    if (typeof url !== 'string' || !url) continue;
    const normalizedPath = rawPath.replace(/\\/g, '/');
    const match = normalizedPath.match(/(?:^|\/)content\/clients\/([^/]+)\/logo\.([a-z0-9]+)$/i);
    if (!match) continue;

    const folderSlug = match[1];
    const ext = match[2].toLowerCase();
    if (!IMAGE_EXTENSIONS.has(ext)) continue;

    ensureFolder(folderSlug).logos.push({ ext, url });
  }

  // 3. Collect project media files
  for (const [rawPath, url] of Object.entries(maps.projectMedia)) {
    if (typeof url !== 'string' || !url) continue;
    const normalizedPath = rawPath.replace(/\\/g, '/');
    const match = normalizedPath.match(/(?:^|\/)content\/clients\/([^/]+)\/projects\/([^/]+)$/i);
    if (!match) continue;

    const folderSlug = match[1];
    const filename = match[2];
    ensureFolder(folderSlug).projectFiles.push({ filename, url });
  }

  const discoveredEntries: DiscoveredClientEntry[] = [];

  for (const [folderSlug, folderData] of entriesByFolder.entries()) {
    const manifest = folderData.manifest;
    // Only valid client folders containing a client.json manifest are registered
    if (!manifest) continue;

    const clientId = (manifest.id || folderSlug).trim().toLowerCase();
    const namePair = resolveBilingualPair(
      manifest.name,
      manifest.nameEn,
      manifest.nameAr,
      folderSlug.toUpperCase()
    );
    const industryPair = resolveBilingualPair(
      manifest.industry,
      manifest.industryEn,
      manifest.industryAr,
      ''
    );
    const descriptionPair = resolveBilingualPair(
      manifest.description,
      manifest.descriptionEn,
      manifest.descriptionAr,
      ''
    );

    const order =
      typeof manifest.order === 'number' && Number.isFinite(manifest.order)
        ? manifest.order
        : typeof manifest.sortOrder === 'number' && Number.isFinite(manifest.sortOrder)
        ? manifest.sortOrder
        : 999;

    // Pick best logo according to extension priority
    const sortedLogos = [...folderData.logos].sort((a, b) => {
      const idxA = LOGO_PRIORITY.indexOf(a.ext);
      const idxB = LOGO_PRIORITY.indexOf(b.ext);
      return (idxA === -1 ? 99 : idxA) - (idxB === -1 ? 99 : idxB);
    });
    const logoUrl = sortedLogos[0]?.url;

    const clientInfo: ClientInfo = {
      id: clientId,
      name: namePair.en,
      nameAr: namePair.ar,
      industry: industryPair.en,
      industryAr: industryPair.ar,
      description: descriptionPair.en,
      descriptionAr: descriptionPair.ar,
      logoSvgType: manifest.logoSvgType || 'beverage',
      logoUrl,
      order,
      confidential: Boolean(manifest.confidential),
      isTemporaryDemoContent:
        manifest.isTemporaryDemoContent !== undefined
          ? Boolean(manifest.isTemporaryDemoContent)
          : true,
    };

    // Separate companion poster images (e.g. "04-poster.png") from primary media items
    const explicitPosterByStem = new Map<string, string>();
    const candidateFiles: Array<{ filename: string; stem: string; ext: string; url: string }> = [];

    for (const file of folderData.projectFiles) {
      const { stem, ext, posterTargetStem } = parseFilenameParts(file.filename);
      if (!IMAGE_EXTENSIONS.has(ext) && !VIDEO_EXTENSIONS.has(ext)) {
        continue;
      }

      if (posterTargetStem) {
        explicitPosterByStem.set(posterTargetStem.toLowerCase(), file.url);
      } else {
        candidateFiles.push({
          filename: file.filename,
          stem,
          ext,
          url: file.url,
        });
      }
    }

    // Also support same-stem image+video pairs (e.g., if a user places both "03.mp4" and "03.jpg")
    const videoStems = new Set(
      candidateFiles
        .filter((f) => VIDEO_EXTENSIONS.has(f.ext))
        .map((f) => f.stem.toLowerCase())
    );

    const primaryMediaFiles: Array<{ filename: string; stem: string; ext: string; url: string }> = [];
    for (const file of candidateFiles) {
      const stemLower = file.stem.toLowerCase();
      if (IMAGE_EXTENSIONS.has(file.ext) && videoStems.has(stemLower)) {
        if (!explicitPosterByStem.has(stemLower)) {
          explicitPosterByStem.set(stemLower, file.url);
        }
        continue;
      }
      primaryMediaFiles.push(file);
    }

    // Sort projects naturally by filename order (01, 02, 03, etc.)
    primaryMediaFiles.sort((a, b) => naturalCompare(a.filename, b.filename));

    const clientProjects: PortfolioItem[] = primaryMediaFiles.map((file) => {
      const isVideo = VIDEO_EXTENSIONS.has(file.ext);
      const category: ProjectCategory = isVideo ? 'motion-ai' : 'static';
      const stemLower = file.stem.toLowerCase();
      const matchedPoster = explicitPosterByStem.get(stemLower);

      const displayNumber = file.stem;
      const titleEn = isVideo
        ? `${clientInfo.name} — Motion & AI Video ${displayNumber}`
        : `${clientInfo.name} — Static Social Design ${displayNumber}`;
      const titleAr = isVideo
        ? `${clientInfo.nameAr || clientInfo.name} — فيديو موشن وذكاء اصطناعي ${displayNumber}`
        : `${clientInfo.nameAr || clientInfo.name} — تصميم سوشيال ميديا ثابت ${displayNumber}`;

      return {
        id: `${clientId}-${isVideo ? 'motion' : 'static'}-${stemLower}`,
        title: titleEn,
        titleAr,
        clientId,
        clientName: clientInfo.name,
        category,
        aspectRatio: isVideo ? '9:16' : '4:5',
        tagline: isVideo ? 'Motion & AI Creative Video' : 'Static Social Media Design',
        taglineAr: isVideo
          ? 'موشن وفيديو إبداعي بالذكاء الاصطناعي'
          : 'تصميم سوشيال ميديا ثابت',
        description: clientInfo.description,
        descriptionAr: clientInfo.descriptionAr,
        tools: isVideo ? ['Motion & AI'] : ['Static Design'],
        year: '2026',
        featured: true,
        confidential: clientInfo.confidential,
        isTemporaryDemoContent: clientInfo.isTemporaryDemoContent,
        posterUrl: isVideo ? matchedPoster || file.url : file.url,
        videoUrl: isVideo ? file.url : undefined,
        mediaType: isVideo ? 'video' : 'image',
        accentColor: '#ccff00',
      };
    });

    discoveredEntries.push({
      folderSlug,
      order,
      client: clientInfo,
      projects: clientProjects,
    });
  }

  // Sort clients by order ascending, then natural folder/id order
  discoveredEntries.sort((a, b) => {
    if (a.order !== b.order) {
      return a.order - b.order;
    }
    return naturalCompare(a.folderSlug, b.folderSlug);
  });

  return {
    clients: discoveredEntries.map((entry) => entry.client),
    projects: discoveredEntries.flatMap((entry) => entry.projects),
  };
}

/**
 * Fallback reader for Node.js test environments (`npx tsx --test`) where Vite's
 * compile-time `import.meta.glob` transform is not running.
 * Uses `globalThis.process.getBuiltinModule` so Vite never bundles Node built-ins in browser builds.
 */
export function readClientGlobMapsFromNodeFs(
  clientsRootDir?: string
): ClientDiscoveryGlobMaps {
  const maps: ClientDiscoveryGlobMaps = {
    manifests: {},
    logos: {},
    projectMedia: {},
  };

  const getBuiltin = (
    globalThis as unknown as {
      process?: {
        cwd?: () => string;
        getBuiltinModule?: (moduleName: string) => unknown;
      };
    }
  ).process?.getBuiltinModule;

  if (typeof getBuiltin !== 'function') {
    return maps;
  }

  const fs = getBuiltin('fs') as {
    existsSync: (p: string) => boolean;
    readdirSync: (
      p: string,
      opts: { withFileTypes: true }
    ) => Array<{ name: string; isDirectory: () => boolean; isFile: () => boolean }>;
    readFileSync: (p: string, encoding: string) => string;
  };
  const path = getBuiltin('path') as {
    resolve: (...segments: string[]) => string;
    join: (...segments: string[]) => string;
  };

  const cwd =
    (globalThis as unknown as { process?: { cwd?: () => string } }).process?.cwd?.() || '.';
  const rootDir = clientsRootDir || path.resolve(cwd, 'src/content/clients');

  if (!fs.existsSync(rootDir)) {
    return maps;
  }

  const clientDirs = fs.readdirSync(rootDir, { withFileTypes: true });
  for (const dirent of clientDirs) {
    if (!dirent.isDirectory()) continue;
    const slug = dirent.name;
    const clientDirPath = path.join(rootDir, slug);

    // 1. Read client.json if present
    const manifestPath = path.join(clientDirPath, 'client.json');
    if (fs.existsSync(manifestPath)) {
      try {
        const rawJson = fs.readFileSync(manifestPath, 'utf-8');
        maps.manifests[`../content/clients/${slug}/client.json`] = JSON.parse(rawJson);
      } catch {
        // Ignore malformed JSON
      }
    }

    // 2. Scan top-level files for logo.<ext>
    const clientFiles = fs.readdirSync(clientDirPath, { withFileTypes: true });
    for (const fileEntry of clientFiles) {
      if (!fileEntry.isFile()) continue;
      if (/^logo\.[a-z0-9]+$/i.test(fileEntry.name)) {
        const virtualKey = `../content/clients/${slug}/${fileEntry.name}`;
        maps.logos[virtualKey] = `/src/content/clients/${slug}/${fileEntry.name}`;
      }
    }

    // 3. Scan projects/ subfolder
    const projectsDirPath = path.join(clientDirPath, 'projects');
    if (fs.existsSync(projectsDirPath)) {
      const projectFiles = fs.readdirSync(projectsDirPath, { withFileTypes: true });
      for (const projEntry of projectFiles) {
        if (!projEntry.isFile()) continue;
        const virtualKey = `../content/clients/${slug}/projects/${projEntry.name}`;
        maps.projectMedia[virtualKey] = `/src/content/clients/${slug}/projects/${projEntry.name}`;
      }
    }
  }

  return maps;
}

/**
 * Loads all discovered clients and projects at build time via Vite's `import.meta.glob`
 * (with automatic Node filesystem fallback for `tsx --test`).
 */
export function loadDiscoveredClientsAndProjects(): {
  clients: ClientInfo[];
  projects: PortfolioItem[];
} {
  let globMaps: ClientDiscoveryGlobMaps | null = null;

  try {
    const manifests = import.meta.glob('../content/clients/*/client.json', {
      eager: true,
      import: 'default',
    });
    const logos = import.meta.glob(
      '../content/clients/*/logo.{png,jpg,jpeg,webp,svg,avif,PNG,JPG,JPEG,WEBP,SVG,AVIF}',
      {
        eager: true,
        query: '?url',
        import: 'default',
      }
    ) as Record<string, string>;
    const projectMedia = import.meta.glob(
      '../content/clients/*/projects/*.{jpg,jpeg,png,webp,avif,gif,svg,mp4,webm,mov,JPG,JPEG,PNG,WEBP,AVIF,GIF,SVG,MP4,WEBM,MOV}',
      {
        eager: true,
        query: '?url',
        import: 'default',
      }
    ) as Record<string, string>;

    globMaps = { manifests, logos, projectMedia };
  } catch {
    globMaps = readClientGlobMapsFromNodeFs();
  }

  return discoverClientsFromGlobMaps(globMaps);
}
