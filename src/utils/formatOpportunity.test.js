import assert from "node:assert/strict";
import test from "node:test";
import { formatOpportunity } from "./formatOpportunity.js";

test("shows explicitly zoned deadlines in Singapore time", () => {
  const opportunity = formatOpportunity({
    id: "timezone-test",
    title: "International Design Competition",
    description: "",
    category: "competition",
    organisation: "Example University",
    deadline: "2026-10-19T03:59:00.000Z",
    deadline_has_time: true,
    deadline_source_timezone: "EDT",
  });

  assert.match(opportunity.deadlineLabel, /(Oct 19|19 Oct)/);
  assert.match(opportunity.deadlineLabel, /11:59/);
  assert.match(opportunity.deadlineLabel, /SGT$/);
});

test("warns when a source gives a time without a timezone", () => {
  const opportunity = formatOpportunity({
    id: "timezone-not-stated",
    title: "Global Student Competition",
    description: "",
    category: "competition",
    organisation: "Example University",
    deadline: "2026-10-18T00:00:00.000Z",
    deadline_has_time: true,
    deadline_source_text: "18 October 2026 at 11:59 PM",
  });

  assert.match(opportunity.deadlineLabel, /time zone not stated/i);
});
