import { useEffect, useRef } from 'react';
import './Hero.css';

export default function Hero() {
  const titleRef = useRef(null);
  const bgTextRef = useRef(null);

  useEffect(() => {
    // Fade in title
    if (titleRef.current) {
      titleRef.current.style.opacity = '0';
      titleRef.current.style.transform = 'translateY(20px)';
      const timer = setTimeout(() => {
        if (titleRef.current) {
          titleRef.current.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
          titleRef.current.style.opacity = '1';
          titleRef.current.style.transform = 'translateY(0)';
        }
      }, 200);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (bgTextRef.current) {
            bgTextRef.current.style.transform =
              `translate(-50%, calc(-50% + ${window.scrollY * 0.3}px))`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="hero" className="hero">
      <div className="hero-bg-text" ref={bgTextRef}>POW!</div>
      <div className="hero-dots" />
      <div className="hero-container">
        <div className="hero-text">
          <div className="speech-bubble">
            <span className="sfx">ZAP!</span> System status...
          </div>

          <div className="dev-notice-card">
            <div className="dev-notice-header">
              <span>⚠️</span> UNDER DEVELOPMENT
            </div>
            <p className="dev-notice-text">
              <strong>Sorry, this website is currently under Development!</strong> You can reach out directly via my links below:
            </p>
            <div className="dev-contacts-grid">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="dev-contact-chip" aria-label="LinkedIn Profile">
                💼 LinkedIn
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="dev-contact-chip" aria-label="GitHub Profile">
                🐙 GitHub
              </a>
              <a href="mailto:builder@example.com" className="dev-contact-chip" aria-label="Email Builder">
                📬 Email
              </a>
              <a href="tel:+919876543210" className="dev-contact-chip" aria-label="Call Mobile">
                📞 +91 98765 43210
              </a>
            </div>
          </div>

          <p className="hero-label">// ISSUE #01 — ORIGIN STORY</p>
          <h1 className="hero-title" ref={titleRef}>
            Builder.<br />Developer.<br />
            <span className="accent">Hardware Innovator.</span>
          </h1>
          <p className="hero-tagline">
            "Turning ideas into working systems —<br />from code to circuits."
          </p>
          <div className="hero-btns">
            <a href="#projects" className="btn btn-primary">
              <span className="btn-sfx">BOOM!</span> View Projects
            </a>
            <a href="#contact" className="btn btn-outline">Hire Me</a>
          </div>
        </div>

        <div className="hero-image">
          <div className="panel-frame hero-panel">
            <img src="/hero_avatar.png" alt="Developer Avatar" />
            <div className="panel-caption">our hero</div>
          </div>
        </div>
      </div>
    </section>
  );
}
