// LogIn.jsx
// Same layout as SignUp but simpler — just email/password, no name field.

import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  sendPasswordResetEmail,
  signInWithEmail,
} from '../utils/auth';

export default function LogIn() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const requestedNext = searchParams.get('next') || '/explore';
  const nextPath = requestedNext.startsWith('/') && !requestedNext.startsWith('//')
    ? requestedNext
    : '/explore';

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setErrorMessage('');
    setStatusMessage('');

    try {
      await signInWithEmail({ email, password });
      navigate(nextPath);
    } catch (error) {
      setSubmitting(false);
      setErrorMessage(error.message);
    }
  }

  async function handleForgotPassword() {
    setErrorMessage('');
    setStatusMessage('');

    if (!email.trim()) {
      setErrorMessage('Enter your email address first.');
      return;
    }

    setSubmitting(true);
    try {
      await sendPasswordResetEmail(email);
      setStatusMessage('Check your email for a password reset link.');
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{
      fontFamily: "'DM Sans', sans-serif",
      background: '#F5F2ED',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
    }}>
      <div style={{
        background: 'white',
        borderRadius: '24px',
        padding: '44px 40px',
        width: '100%',
        maxWidth: '420px',
        border: '1px solid #e2ddd6',
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
      }}>

        <Link to="/" style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          fontFamily: "'Fraunces', serif", fontSize: '20px', fontWeight: 600,
          color: '#C94F1A', justifyContent: 'center', marginBottom: '32px',
          textDecoration: 'none',
        }}>
          <svg width="24" height="18" viewBox="0 0 28 22" fill="none">
            <path d="M2 14 C6 10,10 6,16 8 C18 4,22 2,26 3 C24 6,20 8,18 9 C22 9,25 11,26 14 C22 12,18 11,14 13 C10 15,6 18,4 20 C3 18,2 16,2 14Z" fill="#C94F1A"/>
            <path d="M14 13 C12 16,9 19,6 21" stroke="#C94F1A" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
            <circle cx="22" cy="4.5" r="1.2" fill="#1a1a18"/>
          </svg>
          Fledge
        </Link>

        <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: '26px', fontWeight: 600, textAlign: 'center', marginBottom: '6px' }}>
          Welcome back
        </h1>
        <p style={{ fontSize: '14px', color: '#9a9a8a', textAlign: 'center', marginBottom: '32px' }}>
          Use the email address you registered with.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '6px' }}>Email</label>
            <input
              autoComplete="email"
              onChange={event => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
              style={inputStyle}
              type="email"
              value={email}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '6px' }}>Password</label>
            <input
              autoComplete="current-password"
              onChange={event => setPassword(event.target.value)}
              placeholder="Your password"
              required
              style={inputStyle}
              type="password"
              value={password}
            />
          </div>

          <button
            disabled={submitting}
            onClick={handleForgotPassword}
            style={forgotPasswordStyle}
            type="button"
          >
            Forgot password?
          </button>

          {statusMessage && (
            <p role="status" style={{
              background: '#E8F5E9', borderRadius: '6px', color: '#2A6E2A',
              fontSize: '12px', lineHeight: 1.45, marginBottom: '16px',
              padding: '10px 12px',
            }}>
              {statusMessage}
            </p>
          )}

          {errorMessage && (
            <p
              role="alert"
              style={{
                background: '#FFF1ED', borderRadius: '6px', color: '#713217',
                fontSize: '12px', lineHeight: 1.45, marginBottom: '16px',
                padding: '10px 12px',
              }}
            >
              {errorMessage}
            </p>
          )}

          <button disabled={submitting} type="submit" style={{
            width: '100%', padding: '13px', background: '#C94F1A', color: 'white',
            border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: 500,
            fontFamily: "'DM Sans', sans-serif", cursor: submitting ? 'wait' : 'pointer', marginBottom: '20px',
          }}>
            {submitting ? 'Logging in...' : 'Log in'}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: '13px', color: '#9a9a8a' }}>
          Don't have an account? <Link to={`/signup?next=${encodeURIComponent(nextPath)}`} style={{ color: '#C94F1A', fontWeight: 500, textDecoration: 'none' }}>Sign up</Link>
        </p>

      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%', padding: '11px 14px', border: '1px solid #e2ddd6',
  borderRadius: '10px', fontSize: '14px', fontFamily: "'DM Sans', sans-serif",
  color: '#1a1a18', outline: 'none', background: '#FAFAF7',
};

const forgotPasswordStyle = {
  background: 'transparent',
  border: 'none',
  color: '#C94F1A',
  cursor: 'pointer',
  fontFamily: "'DM Sans', sans-serif",
  fontSize: '12px',
  marginBottom: '20px',
  padding: 0,
};
