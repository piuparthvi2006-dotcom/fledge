function formatYearTag(yearMin, yearMax) {
  if (!yearMin || !yearMax) return "👤 Check requirements";
  if (yearMin === yearMax) return `👤 Year ${yearMin}`;
  return `👤 Year ${yearMin}-${yearMax}`;
}

function formatDeadline(deadline) {
  if (!deadline) return "Open year-round";

  const date = new Date(deadline);
  return `Deadline: ${date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })}`;
}

function getCategoryIcon(category) {
  const icons = {
    internship: "💼",
    competition: "⚡",
    scholarship: "🏅",
    research: "🔬",
    exchange: "✈️",
    summer_programme: "☀️",
    winter_programme: "❄️",
    mentorship: "🎯",
    networking: "🎤",
    entrepreneurship: "🚀",
    volunteer: "🤝",
    community: "🌱",
    other: "✨",
  };

  return icons[category] || "✨";
}

function formatLocation(row) {
  if (row.delivery_mode === "online") return "💻 Online";
  if (row.delivery_mode === "hybrid") return "🌐 Hybrid";
  if (row.delivery_mode === "in_person") {
    return row.location ? `📍 ${row.location}` : "📍 On-site";
  }

  return row.location || "Location TBC";
}

export function formatOpportunity(row) {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    category: row.category,
    organisation: row.organisation,

    location: formatLocation(row),
    yearTag: formatYearTag(row.year_min, row.year_max),
    deadline: row.deadline,
    deadlineLabel: formatDeadline(row.deadline),
    icon: getCategoryIcon(row.category),
    badge: row.eligibility ? "Requirements listed" : "Open to all",
    source_priority: row.source_priority ?? 99,

    year_min: row.year_min,
    year_max: row.year_max,
    eligible_majors: row.eligible_majors || [],
    eligibility: row.eligibility || "",
  };
}
