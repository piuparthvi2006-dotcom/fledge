export const DEFAULT_SCHOOL = "nus";

export const OUTLOOK_SEARCH_KEYWORDS = [
  "internship",
  "research assistant",
  "summer programme",
  "summer program",
  "winter programme",
  "exchange",
  "competition",
  "hackathon",
  "scholarship",
  "fellowship",
  "mentorship",
  "networking",
  "volunteer",
  "startup",
  "entrepreneurship",
  "applications open",
  "apply now",
  "registration open",
  "deadline",
];

export const crawlerSources = [
  {
    id: "nus-outlook-user-mailbox",
    school: DEFAULT_SCHOOL,
    type: "outlook_mailbox",
    name: "Connected NUS Outlook mailbox",
    enabled: true,
    searchKeywords: OUTLOOK_SEARCH_KEYWORDS,
    defaultCategory: "other",
  },
  {
    id: "nus-cfg-students",
    school: DEFAULT_SCHOOL,
    type: "public_web",
    name: "NUS Centre for Future-ready Graduates",
    url: "https://nus.edu.sg/cfg/students#find-jobs-&-internships",
    enabled: true,
    defaultCategory: "internship",
  },
  {
    id: "nus-gro-student-exchange",
    school: DEFAULT_SCHOOL,
    type: "public_web",
    name: "NUS Global Relations - Student Exchange",
    url: "https://www.nus.edu.sg/gro/global-programmes/student-exchange",
    enabled: true,
    defaultCategory: "exchange",
  },
  {
    id: "nus-gro-summer-winter",
    school: DEFAULT_SCHOOL,
    type: "public_web",
    name: "NUS Global Relations - Summer and Winter Programmes",
    url: "https://www.nus.edu.sg/gro/global-programmes/summer-and-winter-programmes",
    enabled: true,
    defaultCategory: "summer_programme",
  },
  {
    id: "nus-gro-research-attachments",
    school: DEFAULT_SCHOOL,
    type: "public_web",
    name: "NUS Global Relations - Research Attachments",
    url: "https://www.nus.edu.sg/gro/global-programmes/research-attachments",
    enabled: true,
    defaultCategory: "research",
  },
];

export const sources = crawlerSources;
