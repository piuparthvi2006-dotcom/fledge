export default function OpportunityDataState({ error, isLoading, onRetry }) {
  if (isLoading) {
    return (
      <div role="status" style={containerStyle}>
        Loading opportunities...
      </div>
    );
  }

  if (!error) return null;

  return (
    <div role="alert" style={containerStyle}>
      <p style={{ margin: 0 }}>{error.message || 'Opportunities are temporarily unavailable.'}</p>
      <button onClick={() => onRetry()} style={buttonStyle} type="button">
        Try again
      </button>
    </div>
  );
}

const containerStyle = {
  color: '#6E6E64',
  fontSize: '14px',
  gridColumn: '1 / -1',
  padding: '44px 0',
  textAlign: 'center',
};

const buttonStyle = {
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
