import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { updatePassword } from '../utils/auth';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('idle');

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage('');

    if (password !== confirmPassword) {
      setMessage('The passwords do not match.');
      return;
    }

    setStatus('submitting');
    try {
      await updatePassword(password);
      setStatus('success');
      setMessage('Your password has been updated.');
    } catch (error) {
      setStatus('idle');
      setMessage(
        error.message || 'This reset link is invalid or has expired. Request a new one.'
      );
    }
  }

  return (
    <main style={pageStyle}>
      <section style={panelStyle}>
        <Link to="/" style={logoStyle}>Fledge</Link>
        <h1 style={headingStyle}>Choose a new password</h1>
        <p style={subheadingStyle}>
          Use at least eight characters for your new password.
        </p>

        {status === 'success' ? (
          <div>
            <p role="status" style={successStyle}>{message}</p>
            <button
              onClick={() => navigate('/explore')}
              style={submitButtonStyle}
              type="button"
            >
              Continue to Explore
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label htmlFor="new-password" style={labelStyle}>New password</label>
            <input
              autoComplete="new-password"
              id="new-password"
              minLength={8}
              onChange={event => setPassword(event.target.value)}
              required
              style={inputStyle}
              type="password"
              value={password}
            />

            <label htmlFor="confirm-password" style={labelStyle}>Confirm password</label>
            <input
              autoComplete="new-password"
              id="confirm-password"
              minLength={8}
              onChange={event => setConfirmPassword(event.target.value)}
              required
              style={inputStyle}
              type="password"
              value={confirmPassword}
            />

            {message && <p role="alert" style={errorStyle}>{message}</p>}

            <button
              disabled={status === 'submitting'}
              style={submitButtonStyle}
              type="submit"
            >
              {status === 'submitting' ? 'Updating...' : 'Update password'}
            </button>
          </form>
        )}

        <Link to="/login" style={loginLinkStyle}>Back to log in</Link>
      </section>
    </main>
  );
}

const pageStyle = {
  alignItems: 'center',
  background: '#F5F2ED',
  display: 'flex',
  fontFamily: "'DM Sans', sans-serif",
  justifyContent: 'center',
  minHeight: '100vh',
  padding: '40px 20px',
};

const panelStyle = {
  background: '#FFFFFF',
  border: '1px solid #D7D1C9',
  borderRadius: '8px',
  maxWidth: '410px',
  padding: '36px',
  width: '100%',
};

const logoStyle = {
  color: '#C94F1A',
  display: 'block',
  fontFamily: "'Fraunces', serif",
  fontSize: '20px',
  fontWeight: 600,
  marginBottom: '28px',
  textAlign: 'center',
  textDecoration: 'none',
};

const headingStyle = {
  fontFamily: "'Fraunces', serif",
  fontSize: '26px',
  margin: '0 0 7px',
  textAlign: 'center',
};

const subheadingStyle = {
  color: '#6E6E64',
  fontSize: '14px',
  lineHeight: 1.5,
  margin: '0 0 26px',
  textAlign: 'center',
};

const labelStyle = {
  display: 'block',
  fontSize: '13px',
  fontWeight: 600,
  marginBottom: '6px',
};

const inputStyle = {
  background: '#FAFAF7',
  border: '1px solid #D7D1C9',
  borderRadius: '6px',
  boxSizing: 'border-box',
  fontFamily: "'DM Sans', sans-serif",
  fontSize: '14px',
  marginBottom: '17px',
  padding: '11px 12px',
  width: '100%',
};

const submitButtonStyle = {
  background: '#C94F1A',
  border: 'none',
  borderRadius: '6px',
  color: '#FFFFFF',
  cursor: 'pointer',
  fontFamily: "'DM Sans', sans-serif",
  fontSize: '14px',
  fontWeight: 600,
  padding: '12px',
  width: '100%',
};

const errorStyle = {
  background: '#FFF1ED',
  borderRadius: '6px',
  color: '#713217',
  fontSize: '12px',
  lineHeight: 1.45,
  margin: '0 0 16px',
  padding: '10px 12px',
};

const successStyle = {
  ...errorStyle,
  background: '#E8F5E9',
  color: '#2A6E2A',
};

const loginLinkStyle = {
  color: '#C94F1A',
  display: 'block',
  fontSize: '13px',
  fontWeight: 600,
  marginTop: '20px',
  textAlign: 'center',
  textDecoration: 'none',
};
