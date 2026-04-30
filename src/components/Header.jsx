import React, { useState, useEffect } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '#services', label: 'Services' },
    { href: '#work', label: 'Work' },
    { href: '#reviews', label: 'Reviews' },
    { href: '#book', label: 'Book' },
  ];

  return (
    <header className={`header${scrolled ? ' header--scrolled' : ''}`}>
      <div className="header__inner wrap">
        <a href="#" className="logo">
          <span className="logo__clinic">Leather Clinic</span>
          <span className="logo__loc"> Raleigh, NC</span>
        </a>

        <nav className={`nav${menuOpen ? ' nav--open' : ''}`}>
          {navLinks.map(l => (
            <a key={l.href} href={l.href} className="nav__link" onClick={() => setMenuOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href="tel:+18438558272" className="btn btn--sm btn--primary nav__cta">
            (843) 855-8272
          </a>
        </nav>

        <button
          className={`burger${menuOpen ? ' burger--open' : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
