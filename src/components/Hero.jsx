import { Link } from 'react-router-dom';

export default function Hero() {
  const stats = [
    { value: 'Live', label: 'Opportunity discovery' },
    { value: '3', label: 'AI study formats' },
    { value: '2-day', label: 'Fresh discovery' },
    { value: 'Free', label: 'During beta' },
  ];

  return (
    <>
      <section className="landing-hero">
        <div className="landing-hero__badge">
          ✦ Built by NUS students, for NUS students
        </div>

        <h1>
          Stop missing the things that{' '}
          <em>actually matter.</em>
        </h1>

        <p className="landing-hero__description">
          Discover opportunities filtered for your year and major, then turn
          your own notes into summaries, quizzes and mock exams.
        </p>

        <div className="landing-hero__actions">
          <Link className="landing-button landing-button--primary" to="/explore">
            Explore Opportunities
          </Link>
          <a className="landing-button landing-button--secondary" href="#learn-more">
            Learn More
          </a>
        </div>
      </section>

      <div className="landing-stats">
        {stats.map(stat => (
          <div className="landing-stat" key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </>
  );
}
