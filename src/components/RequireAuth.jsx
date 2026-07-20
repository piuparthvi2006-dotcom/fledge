import { Navigate, useLocation } from 'react-router-dom';
import { useOpportunities } from '../hooks/useOpportunities';

export default function RequireAuth({ children }) {
  const location = useLocation();
  const { error, isLoading, refresh, user } = useOpportunities();

  if (isLoading || error) {
    return (
      <div style={statePageStyle}>
        <div
          role={error ? 'alert' : 'status'}
          style={statePanelStyle}
        >
          <p style={stateTextStyle}>
            {error?.message || 'Loading your account...'}
          </p>
          {error && (
            <button onClick={() => refresh()} style={retryButtonStyle} type="button">
              Try again
            </button>
          )}
        </div>
      </div>
    );
  }

  if (!user) {
    const nextPath = `${location.pathname}${location.search}`;
    return (
      <Navigate
        replace
        to={`/login?next=${encodeURIComponent(nextPath)}`}
      />
    );
  }

  return children;
}

const statePageStyle = {
  alignItems: 'center',
  background: '#F5F2ED',
  display: 'flex',
  fontFamily: "'DM Sans', sans-serif",
  justifyContent: 'center',
  minHeight: '100vh',
  padding: '24px',
};

const statePanelStyle = {
  color: '#6E6E64',
  fontSize: '14px',
  textAlign: 'center',
};

const stateTextStyle = {
  margin: 0,
};

const retryButtonStyle = {
  background: '#C94F1A',
  border: 'none',
  borderRadius: '6px',
  color: '#FFFFFF',
  cursor: 'pointer',
  fontFamily: "'DM Sans', sans-serif",
  fontSize: '13px',
  fontWeight: 600,
  marginTop: '14px',
  padding: '8px 14px',
};
