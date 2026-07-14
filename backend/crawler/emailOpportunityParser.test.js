import assert from "node:assert/strict";
import test from "node:test";
import { parseWebDocumentToOpportunityCandidate } from "./emailOpportunityParser.js";

test("parses an NUS partner winter-programme PDF as a specific opportunity", () => {
  const candidate = parseWebDocumentToOpportunityCandidate({
    id: "nus-gro-winter-partner-universities:hanyang",
    school: "nus",
    sourceId: "nus-gro-winter-partner-universities",
    sourceName: "NUS Global Relations - Winter Partner Universities",
    url: "https://nus.edu.sg/gro/docs/default-source/prog/isp/kr/swp_hanyang_winter.pdf",
    title: "Hanyang University International Winter School (Session A)",
    summary: "",
    text: `
      SUMMER/WINTER PROGRAMMES (SWP)
      Hanyang University International Winter School (Session A)
      Host University Website: https://hanyangwinter.com
      Programme Location: Seoul, South Korea
      Programme Dates: 26 December 2026 to 9 January 2027
      Application Period: 1 September to 18 October 2026
      No. of Placements: To be determined by host university
      Information on this page is for on-site programme only.
      NUS generic eligibility requirements apply. NUS students should apply for in-person course(s) if course mapping is needed.
      All majors / disciplines.
    `,
    documentFormat: "pdf",
    programmeDetails: true,
    defaultCategory: "winter_programme",
    minScore: 3,
    sourcePriority: 1,
    sourceTrustBoost: 3,
    requiresNusStudentEligibility: true,
    trustedForNusStudents: true,
    fetchedAt: "2026-07-14T00:00:00.000Z",
  });

  assert.ok(candidate);
  assert.equal(candidate.opportunity.title, "Hanyang University International Winter School (Session A)");
  assert.equal(candidate.opportunity.organisation, "Hanyang University");
  assert.equal(candidate.opportunity.category, "winter_programme");
  assert.equal(candidate.opportunity.location, "Seoul, South Korea");
  assert.equal(candidate.opportunity.delivery_mode, "in_person");
  assert.equal(candidate.opportunity.deadline, "2026-10-18T00:00:00.000Z");
  assert.equal(candidate.opportunity.year_min, null);
  assert.equal(candidate.opportunity.year_max, null);
  assert.deepEqual(candidate.opportunity.eligible_majors, []);
  assert.match(candidate.opportunity.eligibility, /generic eligibility requirements/i);
});
