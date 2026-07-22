import { Link } from 'react-router-dom';

export default function CTA() {
  return (
    <div className="landing-cta-wrap">
      <div className="landing-cta">
        <span className="landing-cta__eyebrow">START WITH FLEDGE</span>
        <h2>Find what matters. Study what matters.</h2>
        <p>
          Keep opportunities and AI-generated study materials in one student workspace.
        </p>
        <div className="landing-cta__actions">
          <Link className="landing-button landing-button--light" to="/signup">
            Get started for free
          </Link>
          <Link className="landing-button landing-button--light-outline" to="/study">
            Try Study
          </Link>
        </div>
      </div>
    </div>
  );
}
