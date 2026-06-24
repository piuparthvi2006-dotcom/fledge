// OpportunityCard.jsx
// One card. Used by Explore, Saved, and For You pages.
// Footer is now a full-width button with the deadline centred below it
// (fixed the spacing issue from the mockup).

const iconBg = {
  internship: '#FEF0E7',
  competition: '#FFF8E1',
  research: '#E8F0FE',
  exchange: '#F3E8FF',
  summer_programme: '#E8F5E9',
  winter_programme: '#E8F5E9',
  volunteer: '#E8F5E9',
  mentorship: '#E8F0FE',
  networking: '#FFF8E1',
  entrepreneurship: '#FEF0E7',
  other: '#F5F0EA',
  default: '#F5F0EA',
};

const badgeStyles = {
  'Open to all': { background: '#e8f5e9', color: '#2a6e2a' },
  'Closing soon': { background: '#fde8d8', color: '#C94F1A' },
  'Year 1+': { background: '#e8eaf6', color: '#3949ab' },
  'Year 2+': { background: '#e8eaf6', color: '#3949ab' },
  'New': { background: '#fce4ec', color: '#b5175e' },
  'Free': { background: '#e8f5e9', color: '#2a6e2a' },
};

export default function OpportunityCard({ opportunity, isBookmarked, onBookmark, highlight, topPick }) {
  const {
    id, title, category, organisation, description,
    location, yearTag, badge, icon, deadlineLabel,
  } = opportunity;

  return (
    <div style={{
      background: '#ffffff',
      border: highlight ? '2px solid #C94F1A' : '2px solid #C4BDB5',
      borderRadius: '16px',
      padding: '20px',
      position: 'relative',
      fontFamily: "'DM Sans', sans-serif",
    }}>

      {/* Top pick badge — only shown on For You page for recommended items */}
      {topPick && (
        <span style={{
          position: 'absolute', top: '14px', right: '14px',
          background: '#C94F1A', color: 'white', fontSize: '10px',
          fontWeight: 700, padding: '3px 8px', borderRadius: '10px',
        }}>
          ⭐ Top Pick
        </span>
      )}

      {/* Icon + bookmark row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <div style={{
          width: '38px', height: '38px', borderRadius: '10px',
          background: iconBg[category] || iconBg.default,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px',
        }}>
          {icon}
        </div>

        {!topPick && (
          <button
            onClick={() => onBookmark && onBookmark(id)}
            style={{
              width: '30px', height: '30px', borderRadius: '8px',
              background: isBookmarked ? '#fde8d8' : '#EDEAE5',
              border: isBookmarked ? '2px solid #C94F1A' : '2px solid #C4BDB5',
              fontSize: '14px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: isBookmarked ? '#C94F1A' : '#5a5a52',
            }}
          >
            {isBookmarked ? '★' : '☆'}
          </button>
        )}
      </div>

      {/* Badge */}
      <span style={{
        display: 'inline-block', fontSize: '10px', padding: '3px 9px',
        borderRadius: '10px', fontWeight: 600, marginBottom: '10px',
        ...(badgeStyles[badge] || { background: '#EDEAE5', color: '#5a5a52' }),
      }}>
        {badge}
      </span>

      {/* Title + org */}
      <div style={{ fontSize: '15px', fontWeight: 600, color: '#1a1a18', marginBottom: '3px' }}>
        {title}
      </div>
      <div style={{ fontSize: '12px', color: '#7a7a72', marginBottom: '8px' }}>
        {organisation}
      </div>

      {/* Description */}
      <div style={{ fontSize: '13px', color: '#5a5a52', lineHeight: 1.5, marginBottom: '12px' }}>
        {description}
      </div>

      {/* Meta tags — standardized location + year/pay tags */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '11px', color: '#5a5a52', background: '#EDEAE5', padding: '3px 8px', borderRadius: '6px', fontWeight: 500 }}>
          {location}
        </span>
        <span style={{ fontSize: '11px', color: '#5a5a52', background: '#EDEAE5', padding: '3px 8px', borderRadius: '6px', fontWeight: 500 }}>
          {yearTag}
        </span>
      </div>

      {/* Footer — full width button, deadline centred below */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <button style={{
          width: '100%', background: '#C94F1A', color: '#ffffff', border: 'none',
          borderRadius: '8px', padding: '9px 16px', fontSize: '13px', fontWeight: 500,
          cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", textAlign: 'center',
        }}>
          View Details
        </button>
        <span style={{ fontSize: '11px', color: '#7a7a72', textAlign: 'center' }}>
          ⏰ {deadlineLabel}
        </span>
      </div>

    </div>
  );
}
