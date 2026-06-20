// Landing.jsx — the homepage at "/". Uses Navbar (no active page),
// Hero, a small opportunities preview, CTA, and Footer.

import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import OpportunityCard from '../components/OpportunityCard';
import opportunities from '../data/opportunities';

export default function Landing() {
  // Just show the first 4 as a teaser on the homepage
  const preview = opportunities.slice(0, 4);

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
            <p style={{ fontSize: '13px', color: '#9a9a8a', marginTop: '3px' }}>
              Handpicked for your growth
            </p>
          </div>
          <a href="/explore" style={{ fontSize: '13px', color: '#C94F1A', fontWeight: 500, textDecoration: 'none' }}>
            View all →
          </a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
          {preview.map(opp => (
            <OpportunityCard key={opp.id} opportunity={opp} isBookmarked={false} onBookmark={() => {}} />
          ))}
        </div>
      </section>

      <CTA />
      <Footer />
    </div>
  );
}
