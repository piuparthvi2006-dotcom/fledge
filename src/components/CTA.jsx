// CTA.jsx — orange gradient banner, used on landing page only.

export default function CTA() {
  return (
    <div style={{ padding: '0 48px 56px', background: '#F5F2ED' }}>
      <div style={{
        borderRadius: '24px', padding: '64px 48px', textAlign: 'center',
        position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(135deg, #9B2D08 0%, #C94F1A 40%, #E07828 75%, #C8820A 100%)',
      }}>
        <div style={{ position: 'absolute', width: '280px', height: '280px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', top: '-100px', right: '-80px' }} />
        <div style={{ position: 'absolute', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', bottom: '-80px', left: '-50px' }} />

        <div style={{ position: 'relative' }}>
          <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '14px', fontFamily: "'DM Sans', sans-serif" }}>
            Build your nest today
          </p>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: '32px', fontWeight: 600, color: 'white', lineHeight: 1.2, marginBottom: '12px' }}>
            Join 50,000+ students taking<br />flight together.
          </h2>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.75)', marginBottom: '32px', fontFamily: "'DM Sans', sans-serif" }}>
            Because your inbox shouldn't be your career advisor.
          </p>
          <a href="/signup" style={{
            background: 'white', color: '#C94F1A', textDecoration: 'none',
            padding: '14px 36px', borderRadius: '32px', fontSize: '15px', fontWeight: 600,
            fontFamily: "'DM Sans', sans-serif", display: 'inline-block',
          }}>
            Get Started for Free
          </a>
        </div>
      </div>
    </div>
  );
}
