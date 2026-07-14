const PUBLIC_WEB_LINK_KEYWORDS = [
  "apply",
  "application",
  "apprenticeship",
  "apprenticeships",
  "changemaker",
  "changemakers",
  "challenge",
  "challenges",
  "civic action",
  "competition",
  "competitions",
  "exchange",
  "fellowship",
  "grant",
  "grants",
  "hackathon",
  "internship",
  "internships",
  "research attachment",
  "research attachments",
  "research internship",
  "scholarship",
  "scholarships",
  "student-exchange",
  "summer",
  "tech-up",
  "undergraduate programme",
  "volunteer",
  "volunteering",
  "winter",
  "young defence scientists",
];

const PUBLIC_WEB_EXCLUDED_PATH_PARTS = [
  "/article/",
  "/articles/",
  "/blog/",
  "/blogs/",
  "/media/",
  "/news/",
  "/past-event",
  "/past-events",
  "/press-release",
  "/press-releases",
  "/who-we-are/awards-and-accolades",
];

const PUBLIC_WEB_EXCLUDED_FILE_EXTENSIONS = [
  ".doc",
  ".docx",
  ".pdf",
  ".ppt",
  ".pptx",
  ".xls",
  ".xlsx",
];

function decodeHtmlEntities(text) {
  return text
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function normalizeWhitespace(text) {
  return text.replace(/\s+/g, " ").trim();
}

function stripHtml(html = "") {
  return normalizeWhitespace(
    decodeHtmlEntities(
      html
        .replace(/<style[\s\S]*?<\/style>/gi, " ")
        .replace(/<script[\s\S]*?<\/script>/gi, " ")
        .replace(/<br\s*\/?>/gi, "\n")
        .replace(/<\/(p|div|li|h1|h2|h3|h4)>/gi, "\n")
        .replace(/<[^>]+>/g, " ")
    )
  );
}

function extractTitle(html, fallback) {
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (h1Match) return stripHtml(h1Match[1]);

  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (titleMatch) return stripHtml(titleMatch[1]);

  return fallback;
}

function extractMetaDescription(html) {
  const match = html.match(
    /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["'][^>]*>/i
  );

  return match ? normalizeWhitespace(decodeHtmlEntities(match[1])) : "";
}

function normalizeUrl(url) {
  const parsed = new URL(url);
  parsed.hash = "";
  return parsed.toString();
}

function isAllowedHost(url, allowedHosts = []) {
  if (!allowedHosts.length) return true;

  const hostname = new URL(url).hostname.toLowerCase();

  return allowedHosts.some((allowedHost) => {
    const normalizedHost = allowedHost.toLowerCase();
    return hostname === normalizedHost || hostname.endsWith(`.${normalizedHost}`);
  });
}

function isExcludedCrawlerUrl(url) {
  const { pathname } = new URL(url);
  const normalizedPath = pathname.toLowerCase();

  if (
    PUBLIC_WEB_EXCLUDED_FILE_EXTENSIONS.some((extension) =>
      normalizedPath.endsWith(extension)
    )
  ) {
    return true;
  }

  return PUBLIC_WEB_EXCLUDED_PATH_PARTS.some((pathPart) =>
    normalizedPath.includes(pathPart)
  );
}

function extractLinks(html, baseUrl, allowedHosts) {
  const links = [];
  const seenUrls = new Set();
  const linkPattern = /<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let match;

  while ((match = linkPattern.exec(html)) !== null) {
    try {
      const url = normalizeUrl(new URL(match[1], baseUrl).toString());
      const text = stripHtml(match[2]);

      if (!text || !isAllowedHost(url, allowedHosts)) continue;
      if (isExcludedCrawlerUrl(url)) continue;
      if (seenUrls.has(url)) continue;

      seenUrls.add(url);
      links.push({ url, text });
    } catch {
      // Ignore invalid links such as mailto:, tel:, javascript:, and malformed URLs.
    }
  }

  return links;
}

function isLikelyOpportunityLink(link) {
  if (isExcludedCrawlerUrl(link.url)) return false;

  const haystack = `${link.text} ${link.url}`.toLowerCase();
  return PUBLIC_WEB_LINK_KEYWORDS.some((keyword) => haystack.includes(keyword));
}

async function fetchHtml(url) {
  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; FledgeCrawler/0.1; +https://fledge.example)",
      Accept: "text/html,application/xhtml+xml",
      "Accept-Language": "en-SG,en;q=0.9",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }

  const html = await response.text();
  const text = stripHtml(html).slice(0, 500).toLowerCase();

  if (text.includes("incapsula incident id") || text.includes("request unsuccessful")) {
    throw new Error(`Blocked by website protection: ${url}`);
  }

  return html;
}

function createWebDocument(source, url, html, fallbackTitle) {
  const title = extractTitle(html, fallbackTitle);
  const text = stripHtml(html);
  const summary = extractMetaDescription(html) || text.slice(0, 700);

  return {
    id: `${source.id}:${normalizeUrl(url)}`,
    school: source.school,
    sourceId: source.id,
    sourceName: source.name,
    url: normalizeUrl(url),
    title,
    summary,
    text,
    defaultCategory: source.defaultCategory,
    minScore: source.minScore,
    sourcePriority: source.sourcePriority ?? 99,
    sourceTrustBoost: source.sourceTrustBoost ?? 0,
    targetAudience: source.targetAudience,
    requiresNusStudentEligibility: source.requiresNusStudentEligibility ?? true,
    trustedForNusStudents: source.trustedForNusStudents || false,
    fetchedAt: new Date().toISOString(),
  };
}

export async function fetchPublicWebSource(source) {
  const rootUrl = normalizeUrl(source.url);
  const rootHtml = await fetchHtml(rootUrl);
  const seenUrls = new Set([rootUrl]);
  const documents = [createWebDocument(source, rootUrl, rootHtml, source.name)];

  const relevantLinks = extractLinks(rootHtml, rootUrl, source.allowedHosts)
    .filter(isLikelyOpportunityLink)
    .filter((link) => !seenUrls.has(link.url))
    .slice(0, source.maxLinkedPages ?? 4);

  for (const link of relevantLinks) {
    try {
      if (seenUrls.has(link.url)) continue;

      const linkedHtml = await fetchHtml(link.url);
      seenUrls.add(link.url);
      documents.push(createWebDocument(source, link.url, linkedHtml, link.text));
    } catch (error) {
      console.warn(`Skipping linked page: ${error.message}`);
    }
  }

  return documents;
}

export async function fetchPublicWebDocuments(sources) {
  const documents = [];

  const crawlOrderedSources = [...sources].sort(
    (a, b) => (a.sourcePriority ?? 99) - (b.sourcePriority ?? 99)
  );

  for (const source of crawlOrderedSources) {
    if (!source.enabled || source.type !== "public_web") continue;

    try {
      const sourceDocuments = await fetchPublicWebSource(source);
      documents.push(...sourceDocuments);
    } catch (error) {
      console.warn(`Skipping source ${source.id}: ${error.message}`);
    }
  }

  return documents;
}
