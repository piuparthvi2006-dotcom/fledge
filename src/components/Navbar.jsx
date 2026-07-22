// Navbar.jsx
// Now uses React Router's Link (instead of plain <a>) so clicking
// nav items changes the page WITHOUT a full browser reload.
// `activePage` prop tells the navbar which link to highlight orange.

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useOpportunities } from '../hooks/useOpportunities';
import { signOut } from '../utils/auth';
import './Navbar.css';

export default function Navbar({ activePage }) {
  const navigate = useNavigate();
  const { profile, user } = useOpportunities();
  const [signOutError, setSignOutError] = useState('');
  const [signingOut, setSigningOut] = useState(false);
  const navLinks = [
    { label: 'Explore', path: '/explore' },
    { label: 'Saved', path: '/saved' },
    ...(user ? [{ label: 'Study', path: '/study' }] : []),
    { label: 'For You', path: '/for-you' },
    ...(user ? [{ label: 'Outlook', path: '/outlook' }] : []),
  ];

  async function handleSignOut() {
    setSignOutError('');
    setSigningOut(true);

    try {
      await signOut();
      navigate('/');
    } catch (error) {
      setSigningOut(false);
      setSignOutError(error.message);
    }
  }

  return (
    <nav className="site-navbar">

      {/* Logo links back to landing page */}
      <Link className="site-navbar__logo" to="/">
        <svg width="26" height="20" viewBox="0 0 28 22" fill="none">
          <path d="M2 14 C6 10,10 6,16 8 C18 4,22 2,26 3 C24 6,20 8,18 9 C22 9,25 11,26 14 C22 12,18 11,14 13 C10 15,6 18,4 20 C3 18,2 16,2 14Z" fill="#C94F1A"/>
          <path d="M14 13 C12 16,9 19,6 21" stroke="#C94F1A" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
          <circle cx="22" cy="4.5" r="1.2" fill="#1a1a18"/>
        </svg>
        Fledge
      </Link>

      {/* Nav links — highlights orange + underline when active */}
      <ul className="site-navbar__links">
        {navLinks.map(link => {
          const isActive = activePage === link.label;
          return (
            <li key={link.label}>
              <Link
                className={`site-navbar__link${isActive ? ' is-active' : ''}`}
                to={link.path}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Account actions */}
      <div className="site-navbar__account">
        <div className="site-navbar__account-row">
          {user ? (
            <>
              <Link className="site-navbar__profile" to="/profile">
                {profile?.full_name || user.email || 'Profile'}
              </Link>
              <button
                className="site-navbar__button site-navbar__button--dark"
                disabled={signingOut}
                onClick={handleSignOut}
                type="button"
              >
                {signingOut ? 'Signing out...' : 'Sign out'}
              </button>
            </>
          ) : (
            <>
              <Link className="site-navbar__button site-navbar__button--dark" to="/login">
                Log in
              </Link>
              <Link className="site-navbar__button site-navbar__button--orange" to="/signup">
                Sign up
              </Link>
            </>
          )}
        </div>

        {signOutError && (
          <span className="site-navbar__error" role="alert">
            {signOutError}
          </span>
        )}
      </div>

    </nav>
  );
}
