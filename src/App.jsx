import { useState, useEffect } from 'react';
import './index.css';

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  return (
    <div className="under-dev-page">
      <header className="under-dev-header">
        <div className="under-dev-logo">⚡ <span>THE BUILDER</span></div>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          title="Toggle theme"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </header>

      <main className="under-dev-card" role="main">
        <div className="under-dev-badge">🚧 SYSTEM NOTICE 🚧</div>
        <h1 className="under-dev-title">
          Sorry, this website is currently under Development!
        </h1>
        <p className="under-dev-text">
          I'm currently building and upgrading the platform. In the meantime, feel free to connect with me directly through any of the channels below:
        </p>

        <div className="under-dev-grid">
          <a
            href="https://www.linkedin.com/in/ariknesh05/"
            target="_blank"
            rel="noopener noreferrer"
            className="under-dev-chip"
            aria-label="LinkedIn Profile"
          >
            💼 LinkedIn
          </a>
          <a
            href="https://github.com/riknesh05"
            target="_blank"
            rel="noopener noreferrer"
            className="under-dev-chip"
            aria-label="GitHub Profile"
          >
            🐙 GitHub
          </a>
          <a
            href="mailto:riknesh.dev@gmail.com"
            className="under-dev-chip"
            aria-label="Email Me"
          >
            📬 riknesh.dev@gmail.com
          </a>
          <a
            href="tel:+919488936779"
            className="under-dev-chip"
            aria-label="Call Mobile"
          >
            📞 +91 94889 36779
          </a>
        </div>

        <div className="under-dev-footer">
          ⚡ © 2026 — The Builder | Code & Circuits
        </div>
      </main>
    </div>
  );
}
