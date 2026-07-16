import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import OpportunityCard from '../components/OpportunityCard';
import OpportunityDataState from '../components/OpportunityDataState';
import { useOpportunities } from '../hooks/useOpportunities';

function getRecentTime(opportunity) {
  const timestamp = opportunity.updated_at
    || opportunity.source_published_at
    || opportunity.last_seen_at;
  const time = timestamp ? new Date(timestamp).getTime() : 0;
  return Number.isNaN(time) ? 0 : time;
}

export default function Landing() {
  const navigate = useNavigate();
  const {
    error,
    isLoading,
    opportunities,
    refresh,
    savedOpportunityIds,
    toggleSaved,
  } = useOpportunities();
  const preview = useMemo(
    () => [...opportunities]
      .sort((a, b) => getRecentTime(b) - getRecentTime(a))
      .slice(0, 4),
    [opportunities]
  );

  async function handleBookmark(id) {
    try {
      await toggleSaved(id);
    } catch (saveError) {
      if (saveError.code === 'AUTH_REQUIRED') navigate('/login');
    }
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar />
      <Hero />

      <section style={{ padding: '56px 48px', background: '#F5F2ED' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
          <div>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: '24px', fontWeight: 600 }}>
              Recent Opportunities
            </h2>
            <p style={{ fontSize: '13px', color: '#7A7A72', marginTop: '3px' }}>
              Current opportunities from verified sources
            </p>
          </div>
          <Link to="/explore" style={{ fontSize: '13px', color: '#C94F1A', fontWeight: 500, textDecoration: 'none' }}>
            View all
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '14px' }}>
          {isLoading || error ? (
            <OpportunityDataState error={error} isLoading={isLoading} onRetry={refresh} />
          ) : preview.length === 0 ? (
            <p style={{ color: '#7A7A72', fontSize: '13px', gridColumn: '1 / -1' }}>
              No active opportunities are available yet.
            </p>
          ) : preview.map(opportunity => (
            <OpportunityCard
              isBookmarked={savedOpportunityIds.includes(opportunity.id)}
              key={opportunity.id}
              onBookmark={handleBookmark}
              opportunity={opportunity}
            />
          ))}
        </div>
      </section>

      <CTA />
      <Footer />
    </div>
  );
}
