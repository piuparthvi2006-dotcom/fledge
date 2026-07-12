const CATEGORY_RULES = [
  {
    category: "internship",
    keywords: ["internship", "intern", "traineeship", "attachment"],
  },
  {
    category: "competition",
    keywords: ["competition", "hackathon", "challenge", "case competition", "contest"],
  },
  {
    category: "research",
    keywords: ["research", "research assistant", "urop", "lab assistant"],
  },
  {
    category: "exchange",
    keywords: ["exchange", "study abroad", "overseas exchange", "semester abroad"],
  },
  {
    category: "summer_programme",
    keywords: ["summer programme", "summer program", "summer school", "summer course"],
  },
  {
    category: "winter_programme",
    keywords: ["winter programme", "winter program", "winter school", "winter course"],
  },
  {
    category: "volunteer",
    keywords: ["volunteer", "volunteering", "community service", "social impact"],
  },
  {
    category: "mentorship",
    keywords: ["mentor", "mentorship", "mentoring"],
  },
  {
    category: "networking",
    keywords: ["networking", "career talk", "panel discussion", "industry panel"],
  },
  {
    category: "entrepreneurship",
    keywords: ["startup", "entrepreneurship", "incubator", "accelerator", "founder"],
  },
];

const MAJOR_RULES = [
  {
    major: "anthropology",
    keywords: [
      "anthropology",
      "anthropological",
      "ethnography",
      "ethnographic",
      "cultural studies",
      "human culture",
    ],
  },
  {
    major: "architecture",
    keywords: [
      "architecture",
      "architectural",
      "architect",
      "built environment",
      "building design",
      "urban design",
    ],
  },
  {
    major: "artificial_intelligence",
    keywords: [
      "artificial intelligence",
      "generative ai",
      "machine learning",
      "deep learning",
      "neural network",
      "ai research",
    ],
  },
  {
    major: "business_administration",
    keywords: [
      "business administration",
      "business",
      "management",
      "marketing",
      "consulting",
      "strategy",
      "operations",
      "sales",
    ],
  },
  {
    major: "business_analytics",
    keywords: [
      "business analytics",
      "business intelligence",
      "data analytics",
      "analytics",
      "dashboard",
      "market analysis",
    ],
  },
  {
    major: "business_artificial_intelligence_systems",
    keywords: [
      "business artificial intelligence",
      "ai systems",
      "business ai",
      "intelligent systems",
      "enterprise ai",
    ],
  },
  {
    major: "chemistry",
    keywords: [
      "chemistry",
      "chemical",
      "laboratory",
      "materials chemistry",
      "analytical chemistry",
      "organic chemistry",
    ],
  },
  {
    major: "chinese_languages_and_cultures",
    keywords: [
      "chinese language",
      "chinese languages",
      "chinese culture",
      "mandarin",
      "chinese literature",
      "sinology",
    ],
  },
  {
    major: "chinese_studies_bilingual",
    keywords: [
      "chinese studies",
      "bilingual chinese",
      "china studies",
      "chinese society",
      "chinese history",
    ],
  },
  {
    major: "common_computer_science_programmes",
    keywords: [
      "common computer science",
      "computing programme",
      "computing program",
      "computer science programme",
      "computer science program",
    ],
  },
  {
    major: "communications_and_new_media",
    keywords: [
      "communications",
      "communication",
      "new media",
      "media",
      "content",
      "journalism",
      "social media",
      "public relations",
      "digital marketing",
    ],
  },
  {
    major: "computer_science",
    keywords: [
      "computer science",
      "software",
      "software engineering",
      "programming",
      "developer",
      "web development",
      "frontend",
      "backend",
      "full-stack",
      "full stack",
      "algorithm",
    ],
  },
  {
    major: "data_science_and_analytics",
    keywords: [
      "data science",
      "data analytics",
      "data analysis",
      "machine learning",
      "data visualization",
      "data visualisation",
      "big data",
    ],
  },
  {
    major: "data_science_and_economics",
    keywords: [
      "data science and economics",
      "economic data",
      "econometrics",
      "quantitative economics",
      "economic modelling",
      "economic modeling",
    ],
  },
  {
    major: "economics",
    keywords: [
      "economics",
      "economic policy",
      "economist",
      "econometrics",
      "macroeconomics",
      "microeconomics",
      "market research",
    ],
  },
  {
    major: "engineering",
    keywords: [
      "engineering",
      "engineer",
      "robotics",
      "hardware",
      "mechanical",
      "electrical",
      "civil engineering",
      "chemical engineering",
      "biomedical engineering",
      "environmental engineering",
      "materials engineering",
      "industrial engineering",
    ],
  },
  {
    major: "english_language_and_linguistics",
    keywords: [
      "english language",
      "linguistics",
      "language research",
      "discourse analysis",
      "phonetics",
      "syntax",
      "semantics",
    ],
  },
  {
    major: "english_literature",
    keywords: [
      "english literature",
      "literature",
      "literary",
      "creative writing",
      "poetry",
      "fiction",
      "drama studies",
    ],
  },
  {
    major: "environmental_studies",
    keywords: [
      "environmental studies",
      "environment",
      "sustainability",
      "climate",
      "biodiversity",
      "conservation",
      "ecology",
      "green",
    ],
  },
  {
    major: "food_science_and_technology",
    keywords: [
      "food science",
      "food technology",
      "food safety",
      "nutrition",
      "food innovation",
      "food systems",
    ],
  },
  {
    major: "geography",
    keywords: [
      "geography",
      "geographical",
      "urban studies",
      "urban planning",
      "spatial analysis",
      "human geography",
      "physical geography",
    ],
  },
  {
    major: "geospatial_intelligence",
    keywords: [
      "geospatial",
      "gis",
      "remote sensing",
      "mapping",
      "satellite imagery",
      "spatial data",
    ],
  },
  {
    major: "global_studies",
    keywords: [
      "global studies",
      "international relations",
      "global affairs",
      "global policy",
      "development studies",
      "international development",
    ],
  },
  {
    major: "history",
    keywords: [
      "history",
      "historical",
      "archive",
      "archives",
      "heritage",
      "museum",
      "public history",
    ],
  },
  {
    major: "humanities_and_sciences",
    keywords: [
      "humanities and sciences",
      "interdisciplinary",
      "liberal arts",
      "humanities",
      "science communication",
    ],
  },
  {
    major: "industrial_design",
    keywords: [
      "industrial design",
      "product design",
      "design thinking",
      "user experience",
      "ux design",
      "prototype",
      "prototyping",
    ],
  },
  {
    major: "information_security",
    keywords: [
      "information security",
      "cybersecurity",
      "cyber security",
      "network security",
      "cryptography",
      "security engineering",
      "penetration testing",
    ],
  },
  {
    major: "infrastructure_and_project_management",
    keywords: [
      "infrastructure",
      "project management",
      "construction management",
      "facilities management",
      "real estate development",
      "built assets",
    ],
  },
  {
    major: "japanese_studies",
    keywords: [
      "japanese studies",
      "japan",
      "japanese language",
      "japanese culture",
      "japanese society",
    ],
  },
  {
    major: "landscape_architecture",
    keywords: [
      "landscape architecture",
      "landscape design",
      "urban greenery",
      "parks",
      "public space design",
    ],
  },
  {
    major: "life_sciences",
    keywords: [
      "life sciences",
      "biology",
      "biological",
      "biotech",
      "biotechnology",
      "genetics",
      "molecular biology",
      "ecology",
    ],
  },
  {
    major: "mathematics",
    keywords: [
      "mathematics",
      "math",
      "quantitative",
      "quant",
      "mathematical modelling",
      "mathematical modeling",
      "applied mathematics",
    ],
  },
  {
    major: "malay_studies",
    keywords: [
      "malay studies",
      "malay language",
      "malay culture",
      "malay world",
      "southeast asian malay",
    ],
  },
  {
    major: "philosophy",
    keywords: [
      "philosophy",
      "ethics",
      "moral philosophy",
      "logic",
      "political philosophy",
      "philosophical",
    ],
  },
  {
    major: "philosophy_politics_and_economics",
    keywords: [
      "philosophy politics and economics",
      "ppe",
      "political economy",
      "public policy",
      "governance",
      "ethics and policy",
    ],
  },
  {
    major: "physics",
    keywords: [
      "physics",
      "quantum",
      "astronomy",
      "astrophysics",
      "optics",
      "materials physics",
      "particle physics",
    ],
  },
  {
    major: "political_science",
    keywords: [
      "political science",
      "politics",
      "public policy",
      "government",
      "governance",
      "international relations",
      "policy research",
    ],
  },
  {
    major: "psychology",
    keywords: [
      "psychology",
      "psychological",
      "behavioural",
      "behavioral",
      "cognitive science",
      "mental health",
      "human behaviour",
      "human behavior",
    ],
  },
  {
    major: "quantitative_finance",
    keywords: [
      "quantitative finance",
      "quant finance",
      "financial modelling",
      "financial modeling",
      "risk modelling",
      "risk modeling",
      "trading",
      "investment analytics",
    ],
  },
  {
    major: "social_work",
    keywords: [
      "social work",
      "community care",
      "casework",
      "social service",
      "family service",
      "youth work",
    ],
  },
  {
    major: "sociology",
    keywords: [
      "sociology",
      "sociological",
      "society",
      "social research",
      "social inequality",
      "migration",
    ],
  },
  {
    major: "south_asian_studies",
    keywords: [
      "south asian studies",
      "south asia",
      "india",
      "indian society",
      "south asian culture",
    ],
  },
  {
    major: "southeast_asian_studies",
    keywords: [
      "southeast asian studies",
      "southeast asia",
      "asean",
      "indonesia",
      "malaysia",
      "thailand",
      "vietnam",
    ],
  },
  {
    major: "statistics",
    keywords: [
      "statistics",
      "statistical",
      "statistician",
      "probability",
      "statistical modelling",
      "statistical modeling",
      "biostatistics",
    ],
  },
  {
    major: "theatre_and_performance_studies",
    keywords: [
      "theatre",
      "theater",
      "performance studies",
      "performance",
      "drama",
      "stage production",
    ],
  },
];

const MONTHS =
  "jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:t(?:ember)?)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?";

function normalizeWhitespace(text) {
  return text.replace(/\s+/g, " ").trim();
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function stripHtml(html = "") {
  return normalizeWhitespace(
    html
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/p>/gi, "\n")
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
  );
}

function getEmailText(email) {
  const bodyText =
    email.body?.contentType?.toLowerCase() === "html"
      ? stripHtml(email.body.content)
      : email.body?.content || "";

  return normalizeWhitespace(
    [email.subject, email.bodyPreview, bodyText].filter(Boolean).join(" ")
  );
}

function getEmailBodyText(email) {
  const bodyText =
    email.body?.contentType?.toLowerCase() === "html"
      ? stripHtml(email.body.content)
      : email.body?.content || "";

  return normalizeWhitespace(bodyText || email.bodyPreview || "");
}

function keywordMatches(text, keyword) {
  if (keyword.length <= 3 && /^[a-z0-9]+$/i.test(keyword)) {
    return new RegExp(`\\b${escapeRegExp(keyword)}\\b`).test(text);
  }

  return text.includes(keyword);
}

function includesAny(text, keywords) {
  return keywords.some((keyword) => keywordMatches(text, keyword));
}

function scoreEmail(text) {
  const lowerText = text.toLowerCase();
  let score = 0;

  const strongSignals = [
    "apply now",
    "applications open",
    "registration open",
    "deadline",
    "internship",
    "research assistant",
    "exchange programme",
    "summer programme",
    "competition",
    "hackathon",
  ];

  const weakSignals = [
    "join us",
    "sign up",
    "register",
    "opportunity",
    "programme",
    "program",
    "career",
    "student",
  ];

  for (const signal of strongSignals) {
    if (lowerText.includes(signal)) score += 2;
  }

  for (const signal of weakSignals) {
    if (lowerText.includes(signal)) score += 1;
  }

  if (extractDeadline(text)) score += 2;
  if (extractFirstUrl(text)) score += 1;

  return score;
}

function detectCategory(text) {
  const lowerText = text.toLowerCase();

  for (const rule of CATEGORY_RULES) {
    if (includesAny(lowerText, rule.keywords)) return rule.category;
  }

  return "other";
}

function detectEligibleMajors(text) {
  const lowerText = text.toLowerCase();
  const majors = new Set();

  for (const rule of MAJOR_RULES) {
    if (includesAny(lowerText, rule.keywords)) {
      majors.add(rule.major);
    }
  }

  return [...majors];
}

function detectYearRange(text) {
  const lowerText = text.toLowerCase();

  if (/year\s*1\s*(?:-|to|and|&)\s*2/.test(lowerText)) {
    return { year_min: 1, year_max: 2 };
  }

  if (/year\s*2\s*(?:-|to|and|&)\s*3/.test(lowerText)) {
    return { year_min: 2, year_max: 3 };
  }

  if (/year\s*3\s*(?:-|to|and|&)\s*4/.test(lowerText)) {
    return { year_min: 3, year_max: 4 };
  }

  const singleYearMatch = lowerText.match(/year\s*([1-4])/);
  if (singleYearMatch) {
    const year = Number(singleYearMatch[1]);
    return { year_min: year, year_max: year };
  }

  if (lowerText.includes("final year")) {
    return { year_min: 4, year_max: 4 };
  }

  return { year_min: 1, year_max: 4 };
}

function detectDeliveryMode(text) {
  const lowerText = text.toLowerCase();

  if (lowerText.includes("hybrid")) return "hybrid";
  if (lowerText.includes("online") || lowerText.includes("zoom") || lowerText.includes("webinar")) {
    return "online";
  }
  if (
    lowerText.includes("in-person") ||
    lowerText.includes("in person") ||
    lowerText.includes("on campus") ||
    lowerText.includes("venue:")
  ) {
    return "in_person";
  }

  return "unspecified";
}

function detectLocation(text, deliveryMode) {
  if (deliveryMode === "online") return null;

  const locationMatch = text.match(/(?:venue|location):\s*([^.\n]+)/i);
  if (locationMatch) return normalizeWhitespace(locationMatch[1]).slice(0, 120);

  if (/nus|on campus|campus/i.test(text)) return "On campus";
  if (/singapore/i.test(text)) return "Singapore";
  if (/overseas|abroad|global|exchange/i.test(text)) return "Overseas";

  return null;
}

function extractDeadline(text) {
  const patterns = [
    new RegExp(`(?:deadline|apply by|register by|closes on)[:\\s]*(\\d{1,2}\\s+(?:${MONTHS})\\s+\\d{4})`, "i"),
    new RegExp(`(?:deadline|apply by|register by|closes on)[:\\s]*((?:${MONTHS})\\s+\\d{1,2},?\\s+\\d{4})`, "i"),
    /(?:deadline|apply by|register by|closes on)[:\s]*(\d{4}-\d{2}-\d{2})/i,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (!match) continue;

    const date = new Date(match[1]);
    if (!Number.isNaN(date.valueOf())) return date.toISOString();
  }

  return null;
}

function extractFirstUrl(text) {
  const match = text.match(/https?:\/\/[^\s)"'<>]+/i);
  return match ? match[0] : null;
}

function inferOrganisation(email) {
  const senderName = email.from?.emailAddress?.name;
  const senderEmail = email.from?.emailAddress?.address;

  if (senderName) return senderName;
  if (!senderEmail) return "Unknown organisation";

  return senderEmail.split("@")[1]?.split(".")[0] || senderEmail;
}

function buildDescription(text) {
  const cleaned = normalizeWhitespace(text);
  if (cleaned.length <= 260) return cleaned;

  return `${cleaned.slice(0, 257).trim()}...`;
}

function cleanTitle(subject) {
  return normalizeWhitespace(
    subject
      .replace(/^(fw|fwd|re):\s*/i, "")
      .replace(/\[[^\]]+\]/g, "")
  );
}

export function parseEmailToOpportunityCandidate(email) {
  const text = getEmailText(email);
  const candidateScore = scoreEmail(text);

  if (candidateScore < 4) {
    return null;
  }

  const category = detectCategory(text);
  const deliveryMode = detectDeliveryMode(text);
  const yearRange = detectYearRange(text);

  return {
    source_type: "outlook_email",
    source_message_id: email.id || email.internetMessageId || null,
    source_url: email.webLink || extractFirstUrl(text),
    raw_subject: email.subject || "",
    raw_sender: email.from?.emailAddress?.address || "",
    received_at: email.receivedDateTime || null,
    candidate_score: candidateScore,
    status: "pending",
    opportunity: {
      title: cleanTitle(email.subject || "Untitled opportunity"),
      description: buildDescription(getEmailBodyText(email) || text),
      category,
      organisation: inferOrganisation(email),
      source_url: email.webLink || extractFirstUrl(text),
      eligibility: null,
      ...yearRange,
      eligible_majors: detectEligibleMajors(text),
      delivery_mode: deliveryMode,
      location: detectLocation(text, deliveryMode),
      deadline: extractDeadline(text),
    },
  };
}

export function parseEmailsToOpportunityCandidates(emails) {
  return emails
    .map((email) => parseEmailToOpportunityCandidate(email))
    .filter(Boolean);
}
