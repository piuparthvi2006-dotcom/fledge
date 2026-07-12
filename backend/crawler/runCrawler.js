import { loadLocalEnv, getRequiredEnv } from "./env.js";
import { OUTLOOK_SEARCH_KEYWORDS } from "./sources.js";
import {
  getAccessTokenFromRefreshToken,
  listRecentMessages,
  searchMessages,
} from "./outlookClient.js";
import { parseEmailsToOpportunityCandidates } from "./emailOpportunityParser.js";
import { insertRows } from "./supabaseRest.js";

loadLocalEnv();

const demoEmails = [
  {
    id: "demo-1",
    subject: "Applications open: Summer Data Science Programme",
    from: {
      emailAddress: {
        name: "NUS Data Science Club",
        address: "datascience@example.edu",
      },
    },
    receivedDateTime: "2026-07-11T08:00:00Z",
    bodyPreview:
      "Join our summer programme for students interested in data analytics and machine learning. Deadline: 30 Aug 2026. Venue: On campus.",
    body: {
      contentType: "text",
      content:
        "Join our summer programme for students interested in data analytics and machine learning. Deadline: 30 Aug 2026. Venue: On campus. Register at https://example.edu/summer-data.",
    },
    webLink: "https://outlook.office.com/mail/demo-1",
  },
  {
    id: "demo-2",
    subject: "Weekly cafeteria menu",
    from: {
      emailAddress: {
        name: "Campus Dining",
        address: "dining@example.edu",
      },
    },
    receivedDateTime: "2026-07-10T08:00:00Z",
    bodyPreview: "Here is this week's cafeteria menu.",
    body: {
      contentType: "text",
      content: "Here is this week's cafeteria menu.",
    },
    webLink: "https://outlook.office.com/mail/demo-2",
  },
];

function getFlag(name) {
  return process.argv.includes(name);
}

async function getOutlookMessages() {
  const refreshToken = getRequiredEnv("OUTLOOK_REFRESH_TOKEN");
  const accessToken = await getAccessTokenFromRefreshToken(refreshToken);
  const messagesById = new Map();

  const recentMessages = await listRecentMessages(accessToken, { top: 50 });
  for (const message of recentMessages) {
    messagesById.set(message.id, message);
  }

  for (const keyword of OUTLOOK_SEARCH_KEYWORDS.slice(0, 8)) {
    const searchResults = await searchMessages(accessToken, keyword, { top: 15 });
    for (const message of searchResults) {
      messagesById.set(message.id, message);
    }
  }

  return [...messagesById.values()];
}

function toCandidateRows(candidates) {
  return candidates.map((candidate) => ({
    source_type: candidate.source_type,
    source_message_id: candidate.source_message_id,
    source_url: candidate.source_url,
    raw_subject: candidate.raw_subject,
    raw_sender: candidate.raw_sender,
    received_at: candidate.received_at,
    candidate_score: candidate.candidate_score,
    status: candidate.status,
    extracted_opportunity: candidate.opportunity,
  }));
}

async function main() {
  const useOutlook = getFlag("--outlook");
  const saveToSupabase = getFlag("--save");

  const emails = useOutlook ? await getOutlookMessages() : demoEmails;
  const candidates = parseEmailsToOpportunityCandidates(emails);

  console.log(`Scanned ${emails.length} emails.`);
  console.log(`Found ${candidates.length} possible opportunities.`);
  console.log(JSON.stringify(candidates, null, 2));

  if (saveToSupabase) {
    const rows = toCandidateRows(candidates);
    const savedRows = await insertRows("opportunity_candidates", rows);
    console.log(`Saved ${savedRows.length} candidates to Supabase.`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
