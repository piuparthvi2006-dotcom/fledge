import assert from "node:assert/strict";
import test from "node:test";
import { buildCandidateSummary } from "./reviewCandidates.js";

test("builds a concise candidate summary for review", () => {
  const summary = buildCandidateSummary({
    id: "candidate-id",
    candidate_score: 12,
    source_url: "https://example.edu/programme",
    raw_subject: "Applications open",
    extracted_opportunity: {
      title: "Example Winter Programme",
      category: "winter_programme",
      organisation: "Example University",
      deadline_source_text: "18 October 2026 at 11:59 PM EDT",
    },
  });

  assert.deepEqual(summary, {
    id: "candidate-id",
    score: 12,
    title: "Example Winter Programme",
    category: "winter_programme",
    organisation: "Example University",
    deadline: "18 October 2026 at 11:59 PM EDT",
    source: "https://example.edu/programme",
  });
});
