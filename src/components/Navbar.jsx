import { useState, useEffect } from 'react';
import './Navbar.css';

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Intersection observer for active nav
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { rootMargin: '-40% 0px -50% 0px' }
    );
    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const links = ['hero','about','projects','skills','services','contact'];
  const labels = ['Home','About','Projects','Skills','Services','Contact'];

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} aria-label="Main Navigation">
        <a href="#hero" className="nav-logo">⚡ <span>THE BUILDER</span></a>
        <ul className="nav-links">
          {links.map((l,i) => (
            <li key={l}>
              <a href={`#${l}`} className={activeSection === l ? 'active-link' : ''}>
                {labels[i]}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-actions">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            title="Toggle theme"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(o => !o)}
            aria-expanded={menuOpen}
            aria-label="Toggle mobile menu"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="mobile-menu" onClick={() => setMenuOpen(false)}>
          <ul>
            {links.map((l,i) => (
              <li key={l}>
                <a href={`#${l}`} onClick={() => setMenuOpen(false)}>{labels[i]}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
