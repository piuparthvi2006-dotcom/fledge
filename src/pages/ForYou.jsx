import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import OpportunityCard from '../components/OpportunityCard';
import OpportunityDataState from '../components/OpportunityDataState';
import { getMajorLabel } from '../data/opportunityFilters';
import { useOpportunities } from '../hooks/useOpportunities';
import { getOpportunityExpiryTime } from '../utils/formatOpportunity';

function getRecentTime(opportunity) {
  const timestamp = opportunity.updated_at
    || opportunity.source_published_at
    || opportunity.last_seen_at;
  const time = timestamp ? new Date(timestamp).getTime() : 0;
  return Number.isNaN(time) ? 0 : time;
}

function daysUntil(opportunity) {
  const expiryTime = getOpportunityExpiryTime(opportunity);
  if (expiryTime === null) return null;
  return Math.max(0, Math.ceil((expiryTime - Date.now()) / (24 * 60 * 60 * 1000)));
}

export default function ForYou() {
  const navigate = useNavigate();
  const {
    error,
    isLoading,
    opportunities,
    profile,
    refresh,
    savedOpportunityIds,
    savedOpportunities,
    toggleSaved,
    user,
  } = useOpportunities();
  const [actionError, setActionError] = useState('');

  const recentlyAdded = useMemo(
    () => [...opportunities]
      .sort((a, b) => getRecentTime(b) - getRecentTime(a))
      .slice(0, 3),
    [opportunities]
  );

  const savedWithDeadlines = useMemo(
    () => savedOpportunities
      .filter(opportunity => getOpportunityExpiryTime(opportunity) !== null)
      .sort((a, b) => getOpportunityExpiryTime(a) - getOpportunityExpiryTime(b))
      .slice(0, 5),
    [savedOpportunities]
  );

  const displayName = profile?.full_name
    || user?.user_metadata?.full_name
    || user?.email
    || 'Your profile';
  const profileDetails = [
    profile?.year_of_study ? `Year ${profile.year_of_study}` : null,
    getMajorLabel(profile?.major),
    profile?.faculty || null,
  ].filter(Boolean);

  async function handleBookmark(id) {
    setActionError('');
    try {
      await toggleSaved(id);
    } catch (saveError) {
      if (saveError.code === 'AUTH_REQUIRED') {
        navigate('/login');
        return;
      }
      setActionError(saveError.message);
    }
  }

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#F5F2ED', color: '#1a1a18', minHeight: '100vh' }}>
      <Navbar activePage="For You" />

      <div style={{ padding: '40px 48px 8px' }}>
        <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: '36px', fontWeight: 600, marginBottom: '6px' }}>
          For You
        </h1>
        <p style={{ fontSize: '15px', color: '#6e6e64' }}>
          Recently added opportunities and your saved deadlines
        </p>
      </div>

      {user ? (
        <div style={profileStyle}>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 600, marginBottom: '3px' }}>
              {displayName}
            </div>
            <div style={{ fontSize: '12px', color: '#7A7A72' }}>
              {profileDetails.length > 0
                ? profileDetails.join(' · ')
                : 'Complete your profile to keep your student details together.'}
            </div>
          </div>
          <Link to="/profile" style={editProfileLinkStyle}>Edit profile</Link>
        </div>
      ) : (
        <div style={profileStyle}>
          <span style={{ color: '#6E6E64', fontSize: '13px' }}>
            Log in to save opportunities and track their deadlines.
          </span>
          <Link to="/login" style={loginLinkStyle}>Log in</Link>
        </div>
      )}

      {actionError && (
        <div role="alert" style={{ color: '#9A3510', fontSize: '13px', padding: '0 48px 14px' }}>
          {actionError}
        </div>
      )}

      <div style={sectionTitleStyle}>Recently added</div>
      <div style={gridStyle}>
        {isLoading || error ? (
          <OpportunityDataState error={error} isLoading={isLoading} onRetry={refresh} />
        ) : recentlyAdded.length === 0 ? (
          <p style={emptyTextStyle}>No active opportunities are available yet.</p>
        ) : recentlyAdded.map(opportunity => (
          <OpportunityCard
            isBookmarked={savedOpportunityIds.includes(opportunity.id)}
            key={opportunity.id}
            onBookmark={handleBookmark}
            opportunity={opportunity}
          />
        ))}
      </div>

      <div style={{ padding: '0 48px 48px' }}>
        <div style={{ ...sectionTitleStyle, padding: 0, marginBottom: '16px' }}>
          Upcoming deadlines from your saved opportunities
        </div>

        {!user ? (
          <p style={emptyTextStyle}>Log in to see saved deadlines.</p>
        ) : savedWithDeadlines.length === 0 ? (
          <p style={emptyTextStyle}>No saved opportunities have an upcoming deadline.</p>
        ) : savedWithDeadlines.map(opportunity => {
          const days = daysUntil(opportunity);
          const urgent = days !== null && days <= 7;

          return (
            <div key={opportunity.id} style={{
              background: urgent ? '#FEF0E7' : '#ffffff',
              border: urgent ? '2px solid #C94F1A' : '2px solid #C4BDB5',
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '10px',
              padding: '16px 20px',
            }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '2px' }}>
                  {opportunity.title}
                </div>
                <div style={{ fontSize: '12px', color: '#7A7A72' }}>
                  {opportunity.organisation}
                </div>
              </div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#C94F1A', textAlign: 'right' }}>
                <div>{opportunity.deadlineLabel}</div>
                {days !== null && <div>{days} days left</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const profileStyle = {
  alignItems: 'center',
  background: '#FFFFFF',
  borderBottom: '1px solid #D7D1C9',
  borderTop: '1px solid #D7D1C9',
  display: 'flex',
  justifyContent: 'space-between',
  margin: '24px 0',
  padding: '18px 48px',
};

const loginLinkStyle = {
  background: '#C94F1A',
  borderRadius: '6px',
  color: '#FFFFFF',
  fontSize: '13px',
  fontWeight: 600,
  padding: '8px 14px',
  textDecoration: 'none',
};

const editProfileLinkStyle = {
  color: '#C94F1A',
  fontSize: '13px',
  fontWeight: 600,
  textDecoration: 'none',
};

const sectionTitleStyle = {
  fontFamily: "'Fraunces', serif",
  fontSize: '22px',
  fontWeight: 600,
  padding: '0 48px 16px',
};

const gridStyle = {
  display: 'grid',
  gap: '16px',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  padding: '0 48px 36px',
};

const emptyTextStyle = {
  color: '#7A7A72',
  fontSize: '13px',
  gridColumn: '1 / -1',
};
