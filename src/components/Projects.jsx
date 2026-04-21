import { useState, useEffect, useRef } from 'react';
import './Projects.css';

const projects = [
  {
    id: 1, cats: ['hardware','iot'], badge: 'HARDWARE', sfx: 'ZAP!',
    title: 'Smart Battery Management System',
    desc: 'Real-time battery health monitoring with temperature sensing, charge cycle tracking, and ML-based degradation predictions. Built for lithium systems with live dashboard.',
    stack: ['ESP32','Python','Flask','TensorFlow Lite','MQTT'],
  },
  {
    id: 2, cats: ['iot','software'], badge: 'IoT', sfx: 'PING!',
    title: 'IoT Sensor Dashboard',
    desc: 'Multi-sensor monitoring platform aggregating temperature, humidity, light, and motion data. Live charts, threshold alerts, and JSON-based data logging with a Flask backend.',
    stack: ['ESP8266','Flask','Chart.js','MQTT','REST API'],
  },
  {
    id: 3, cats: ['hardware','software'], badge: 'PROJECT CENTER', sfx: 'BOOM!',
    title: 'Student Project Builds',
    desc: 'Custom hardware + software solutions for final year engineering students. From smart irrigation systems to RFID attendance trackers — full delivery from design to demo.',
    stack: ['ESP32','Arduino','Python','HTML/CSS/JS'],
  },
  {
    id: 4, cats: ['software'], badge: 'SOFTWARE', sfx: 'CLICK!',
    title: 'Face Recognition Attendance',
    desc: 'Automated attendance system using OpenCV face recognition. Web dashboard for real-time logs, CSV export, and Flask-based management portal. Deployed on local servers.',
    stack: ['Python','OpenCV','Flask','SQLite','JS'],
  },
  {
    id: 5, cats: ['hardware','iot'], badge: 'IoT', sfx: 'WHIRR!',
    title: 'Smart Irrigation Controller',
    desc: 'Soil moisture-based auto-irrigation with manual override via mobile. ESP8266 + relay control, soil sensor calibration, and a live web interface for scheduling.',
    stack: ['ESP8266','Sensors','Flask','HTML/JS'],
  },
  {
    id: 6, cats: ['hardware'], badge: 'HARDWARE', sfx: 'POW!',
    title: 'ESP32 Handheld Game Console',
    desc: 'Dual OLED custom game console with modular firmware. Snake, Breakout, Pong on dual SSD1306 displays with joystick controls, sound, and 2-player mode.',
    stack: ['ESP32','Arduino','SSD1306','C++'],
  },
];

const FILTERS = ['all','hardware','software','iot'];

export default function Projects() {
  const [active, setActive] = useState('all');
  const cardRefs = useRef([]);

  const visible = projects.filter(p => active === 'all' || p.cats.includes(active));

  useEffect(() => {
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      el.style.opacity = '0';
      setTimeout(() => {
        el.style.animation = 'none';
        el.offsetHeight; // reflow
        el.style.opacity = '';
        el.classList.remove('animate-in');
        void el.offsetWidth;
        el.classList.add('animate-in');
      }, i * 70);
    });
  }, [active]);

  return (
    <section id="projects" className="section-wrapper projects-section">
      <div className="section-inner">
        <div className="section-header">
          <p className="issue-tag">// CHAPTER 03</p>
          <h2 className="section-title">PROJECTS</h2>
        </div>

        <div className="projects-filter">
          {FILTERS.map(f => (
            <button
              key={f}
              className={`filter-btn${active === f ? ' active' : ''}`}
              onClick={() => setActive(f)}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {visible.map((p, i) => (
            <div
              key={p.id}
              className="project-card"
              ref={el => cardRefs.current[i] = el}
            >
              <div className="card-badge">{p.badge}</div>
              <div className="card-sfx">{p.sfx}</div>
              <h3 className="card-title">{p.title}</h3>
              <p className="card-desc">{p.desc}</p>
              <div className="card-stack">
                {p.stack.map(s => <span key={s}>{s}</span>)}
              </div>
              <a href="#contact" className="btn btn-card">
                <span style={{ color: 'var(--accent)', fontWeight: 900 }}>→</span> View Details
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
