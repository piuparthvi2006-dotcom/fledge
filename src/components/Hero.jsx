// Hero.jsx — for the LANDING PAGE only (the homepage at "/")
// Same as before, just kept here for completeness.

export default function Hero() {
  return (
    <>
      <section style={{ background: '#FEF0E7', padding: '96px 48px 80px', textAlign: 'center' }}>
        <div style={{
          display: 'inline-block', background: 'white', border: '1px solid #f0ddd0',
          borderRadius: '20px', padding: '5px 16px', fontSize: '12px', color: '#C94F1A',
          fontWeight: 500, marginBottom: '28px', fontFamily: "'DM Sans', sans-serif",
        }}>
          ✦ Built by NUS students, for NUS students
        </div>

        <h1 style={{
          fontFamily: "'Fraunces', serif", fontSize: '54px', fontWeight: 600,
          lineHeight: 1.1, maxWidth: '580px', margin: '0 auto 20px', color: '#1a1a18',
        }}>
          Stop missing the things that{' '}
          <em style={{ fontStyle: 'italic', color: '#C94F1A' }}>actually matter.</em>
        </h1>

        <p style={{
          fontSize: '16px', color: '#6e6e64', lineHeight: 1.7,
          maxWidth: '440px', margin: '0 auto 36px', fontFamily: "'DM Sans', sans-serif",
        }}>
          Internships, hackathons, research, exchange, summer programmes —
          filtered for your year and major.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <a href="/explore" style={{
            background: '#C94F1A', color: 'white', textDecoration: 'none',
            padding: '13px 28px', borderRadius: '28px', fontSize: '14px',
            fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
          }}>
            Explore Opportunities
          </a>
          <a href="#" style={{
            background: 'transparent', color: '#C94F1A', textDecoration: 'none',
            border: '1.5px solid #C94F1A', padding: '12px 28px', borderRadius: '28px',
            fontSize: '14px', fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
          }}>
            Learn More
          </a>
        </div>
      </section>

      <div style={{
        display: 'flex', justifyContent: 'center', gap: '48px',
        padding: '28px 48px', borderTop: '1px solid #ecddd3', background: '#FEF0E7',
      }}>
        {[
          { num: '240+', label: 'Live opportunities' },
          { num: '1.2k', label: 'Students onboard' },
          { num: 'Weekly', label: 'Fresh updates' },
          { num: 'Free', label: 'Always' },
        ].map(stat => (
          <div key={stat.label} style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: '26px', fontWeight: 600, color: '#C94F1A' }}>
              {stat.num}
            </div>
            <div style={{ fontSize: '12px', color: '#9a9a8a', marginTop: '2px', fontFamily: "'DM Sans', sans-serif" }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
