// opportunities.js
// Central data file — both Explore and Saved/ForYou pull from this.
// Once Supabase is connected, this whole file gets replaced by a database fetch,
// but the shape of each object (the keys) should stay exactly the same.

// STANDARDIZED LOCATION TAGS — always use these exact labels + icons
// so the same kind of thing always reads the same way across the site:
//   🏛 On-campus   → anything happening at NUS
//   💻 Online      → virtual / webcast / remote
//   🌏 Overseas    → exchange, study abroad
//   📍 On-site     → a company's office, not NUS

const opportunities = [
  {
    id: 1,
    title: "Google STEP Internship",
    category: "internship",
    organisation: "Google",
    description: "Software engineering internship for first and second year students.",
    location: "📍 On-site",
    yearTag: "👤 Year 1–2",
    badge: "Open to all",
    icon: "💼",
    deadline: "2026-10-15",
    deadlineLabel: "Deadline: Oct 15",
  },
  {
    id: 2,
    title: "Hackomania 2026",
    category: "competition",
    organisation: "GovTech Singapore",
    description: "Annual hackathon open to all NUS students. Build something real in 24hrs.",
    location: "💻 Online",
    yearTag: "👤 All years",
    badge: "Closing soon",
    icon: "⚡",
    deadline: "2026-02-01",
    deadlineLabel: "Deadline: Feb 1",
  },
  {
    id: 3,
    title: "NUS UROP Research",
    category: "research",
    organisation: "NUS Faculty of Science",
    description: "Work with professors on real research projects. Paid opportunity.",
    location: "🏛 On-campus",
    yearTag: "💰 Paid",
    badge: "Year 1+",
    icon: "🔬",
    deadline: null,
    deadlineLabel: "Open year-round",
  },
  {
    id: 4,
    title: "NUS Summer School",
    category: "summer_programme",
    organisation: "NUS Global Relations",
    description: "Short intensive courses over summer, open to all years.",
    location: "🏛 On-campus",
    yearTag: "👤 All years",
    badge: "New",
    icon: "☀️",
    deadline: "2026-03-30",
    deadlineLabel: "Deadline: Mar 30",
  },
  {
    id: 5,
    title: "NUS Student Exchange",
    category: "exchange",
    organisation: "NUS Global Relations",
    description: "Study abroad for one semester at a partner university worldwide.",
    location: "🌏 Overseas",
    yearTag: "👤 Year 2–3",
    badge: "Year 2+",
    icon: "✈️",
    deadline: "2026-09-30",
    deadlineLabel: "Deadline: Sep 30",
  },
  {
    id: 6,
    title: "MAS Financial Scholarship",
    category: "other",
    organisation: "Monetary Authority of Singapore",
    description: "Scholarship for finance-oriented students with strong academics.",
    location: "💰 Scholarship",
    yearTag: "👤 Year 1–2",
    badge: "New",
    icon: "🏅",
    deadline: "2026-02-28",
    deadlineLabel: "Deadline: Feb 28",
  },
  {
    id: 7,
    title: "Career Wing-up Panel",
    category: "networking",
    organisation: "Tech Leaders Hub",
    description: "Panel discussion with industry leaders on breaking into tech careers.",
    location: "💻 Online",
    yearTag: "👤 All years",
    badge: "Free",
    icon: "🎤",
    deadline: "2026-07-20",
    deadlineLabel: "Deadline: Jul 20",
  },
  {
    id: 8,
    title: "Shopee PM Internship",
    category: "internship",
    organisation: "Shopee",
    description: "Work with Shopee's product team on features used by millions.",
    location: "📍 On-site",
    yearTag: "👤 Year 2–3",
    badge: "Open to all",
    icon: "🛍️",
    deadline: "2026-11-01",
    deadlineLabel: "Deadline: Nov 1",
  },
];

export default opportunities;

// All category filters used across Explore + Saved pages — keep in sync
export const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "internship", label: "Internships" },
  { key: "competition", label: "Competitions" },
  { key: "research", label: "Research" },
  { key: "exchange", label: "Exchange" },
  { key: "summer_programme", label: "Summer Programmes" },
  { key: "winter_programme", label: "Winter Programmes" },
  { key: "volunteer", label: "Volunteer" },
  { key: "mentorship", label: "Mentorship" },
  { key: "networking", label: "Networking" },
  { key: "entrepreneurship", label: "Entrepreneurship" },
  { key: "other", label: "Other" },
];
