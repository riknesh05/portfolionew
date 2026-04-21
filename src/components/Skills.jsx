import { useEffect, useRef } from 'react';
import './Skills.css';

const categories = [
  {
    label: 'WEB', stampClass: '', 
    badges: ['HTML5','CSS3','JavaScript','Flask','REST APIs','Chart.js'],
  },
  {
    label: 'HARDWARE', stampClass: 'stamp-red',
    badges: ['ESP8266','ESP32','Arduino','Sensors','Circuit Design','Battery Systems'],
  },
  {
    label: 'TOOLS', stampClass: 'stamp-green',
    badges: ['Git','JSON Systems','MQTT','Python','OpenCV','SQLite'],
  },
];

export default function Skills() {
  const refs = useRef([]);

  useEffect(() => {
    refs.current.forEach(el => { if (el) el.style.opacity = '0'; });
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('animate-in'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.15 });
    refs.current.forEach(el => { if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" className="skills-section">
      <div className="section-wrapper">
        <div className="section-inner-md">
          <div className="section-header">
            <p className="issue-tag">// CHAPTER 04</p>
            <h2 className="section-title skills-title">SKILLS</h2>
          </div>
          <div className="skills-grid">
            {categories.map((cat, i) => (
              <div key={cat.label} className="skill-category" ref={el => refs.current[i] = el}>
                <div className="skill-cat-label">
                  <span className={`stamp ${cat.stampClass}`}>{cat.label}</span>
                </div>
                <div className="skill-badges">
                  {cat.badges.map(b => (
                    <span key={b} className="badge">{b}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
