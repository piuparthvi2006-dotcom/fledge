// FilterBar.jsx
// The row of category pill buttons (All, Internships, Competitions, etc).
// Reused on both Explore and Saved pages so the look stays identical.
//
// Props:
//   categories     — array of {key, label} objects
//   activeCategories — selected category keys; empty means all
//   onToggle       — function called with the key when a pill is clicked
//   counts         — optional object like {internship: 3, competition: 1} to show counts (used on Saved page)

export default function FilterBar({ categories, activeCategories = [], onToggle, counts }) {
  return (
    <div style={{ padding: '0 48px 16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      {categories.map(cat => {
        const isActive = cat.key === 'all' ? activeCategories.length === 0 : activeCategories.includes(cat.key);
        const count = counts ? counts[cat.key] : null;

        return (
          <button
            key={cat.key}
            onClick={() => onToggle(cat.key)}
            style={{
              padding: '9px 20px',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              border: isActive ? '2px solid #C94F1A' : '2px solid #8a8880',
              background: isActive ? '#C94F1A' : '#EDEAE5',
              color: isActive ? '#ffffff' : '#1a1a18',
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {cat.label}{count !== null && count !== undefined ? ` (${count})` : ''}
          </button>
        );
      })}
    </div>
  );
}
