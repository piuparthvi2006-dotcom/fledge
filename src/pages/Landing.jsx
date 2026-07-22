import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import LandingFeatures from '../components/LandingFeatures';
import Navbar from '../components/Navbar';
import OpportunityCard from '../components/OpportunityCard';
import OpportunityDataState from '../components/OpportunityDataState';
import { useOpportunities } from '../hooks/useOpportunities';
import './Landing.css';

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
    <div className="landing-page">
      <Navbar />
      <Hero />
      <LandingFeatures />

      <section className="landing-recent">
        <div className="landing-container">
          <div className="landing-recent__header">
            <div>
              <h2>Recent Opportunities</h2>
              <p>Current opportunities from verified sources</p>
            </div>
            <Link to="/explore">View all</Link>
          </div>

          <div className="landing-opportunity-grid">
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
        </div>
      </section>

      <CTA />
      <Footer />
    </div>
  );
}
