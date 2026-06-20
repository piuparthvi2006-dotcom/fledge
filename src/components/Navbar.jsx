// Navbar.jsx
// Now uses React Router's Link (instead of plain <a>) so clicking
// nav items changes the page WITHOUT a full browser reload.
// `activePage` prop tells the navbar which link to highlight orange.

import { Link } from 'react-router-dom';

export default function Navbar({ activePage }) {
  const navLinks = [
    { label: 'Explore', path: '/explore' },
    { label: 'Saved', path: '/saved' },
    { label: 'For You', path: '/for-you' },
  ];

  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '18px 48px',
      borderBottom: '1px solid #e2ddd6',
      background: '#FAFAF7',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>

      {/* Logo links back to landing page */}
      <Link to="/" style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        fontFamily: "'Fraunces', serif", fontSize: '21px', fontWeight: 600,
        color: '#C94F1A', textDecoration: 'none',
      }}>
        <svg width="26" height="20" viewBox="0 0 28 22" fill="none">
          <path d="M2 14 C6 10,10 6,16 8 C18 4,22 2,26 3 C24 6,20 8,18 9 C22 9,25 11,26 14 C22 12,18 11,14 13 C10 15,6 18,4 20 C3 18,2 16,2 14Z" fill="#C94F1A"/>
          <path d="M14 13 C12 16,9 19,6 21" stroke="#C94F1A" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
          <circle cx="22" cy="4.5" r="1.2" fill="#1a1a18"/>
        </svg>
        Fledge
      </Link>

      {/* Nav links — highlights orange + underline when active */}
      <ul style={{ display: 'flex', gap: '32px', listStyle: 'none', margin: 0, padding: 0 }}>
        {navLinks.map(link => {
          const isActive = activePage === link.label;
          return (
            <li key={link.label}>
              <Link to={link.path} style={{
                textDecoration: 'none',
                fontSize: '14px',
                fontFamily: "'DM Sans', sans-serif",
                color: isActive ? '#C94F1A' : '#5a5a52',
                fontWeight: isActive ? 600 : 400,
                borderBottom: isActive ? '2px solid #C94F1A' : '2px solid transparent',
                paddingBottom: '2px',
              }}>
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Auth buttons */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <Link to="/login" style={{
          background: '#2C2C2A', color: 'white', textDecoration: 'none',
          padding: '9px 20px', borderRadius: '20px', fontSize: '14px',
          fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
        }}>
          Log in
        </Link>
        <Link to="/signup" style={{
          background: '#C94F1A', color: 'white', textDecoration: 'none',
          padding: '9px 20px', borderRadius: '20px', fontSize: '14px',
          fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
        }}>
          Sign up
        </Link>
      </div>

    </nav>
  );
}
