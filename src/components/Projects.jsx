import { useState, useEffect, useRef } from 'react';
import './Projects.css';

const projects = [
  {
    id: 1, cats: ['hardware','iot'], badge: 'HARDWARE', sfx: 'ZAP!',
    title: 'Smart Battery Management System',
    desc: 'Real-time battery health monitoring with temperature sensing, charge cycle tracking, and ML-based degradation predictions. Built for lithium systems with live dashboard.',
    details: 'Monitors cell voltages, current draw, and thermals on custom PCB. Streams telemetry over MQTT to a Python Flask backend with TensorFlow Lite predictive failure alerts.',
    highlights: ['Multi-cell voltage balancing', 'Thermal run-away emergency relay cutoff', 'Live web telemetry dashboard'],
    stack: ['ESP32','Python','Flask','TensorFlow Lite','MQTT'],
  },
  {
    id: 2, cats: ['iot','software'], badge: 'IoT', sfx: 'PING!',
    title: 'IoT Sensor Dashboard',
    desc: 'Multi-sensor monitoring platform aggregating temperature, humidity, light, and motion data. Live charts, threshold alerts, and JSON-based data logging with a Flask backend.',
    details: 'Designed for modular sensor nodes. Captures environmental telemetry every second, stores historical records, and provides interactive WebSocket-fueled real-time charts.',
    highlights: ['Sub-second latency dynamic charts', 'Custom threshold alert webhooks', 'Zero-dependency JSON log rotation'],
    stack: ['ESP8266','Flask','Chart.js','MQTT','REST API'],
  },
  {
    id: 3, cats: ['hardware','software'], badge: 'PROJECT CENTER', sfx: 'BOOM!',
    title: 'Student Project Builds',
    desc: 'Custom hardware + software solutions for final year engineering students. From smart irrigation systems to RFID attendance trackers — full delivery from design to demo.',
    details: 'End-to-end guidance for over 40+ engineering student projects. Includes schematic CAD diagrams, PCB design files, well-structured firmware, and presentation slide templates.',
    highlights: ['100% demo success rate', 'Complete LaTeX project report included', 'Custom circuit design & soldering'],
    stack: ['ESP32','Arduino','Python','HTML/CSS/JS'],
  },
  {
    id: 4, cats: ['software'], badge: 'SOFTWARE', sfx: 'CLICK!',
    title: 'Face Recognition Attendance',
    desc: 'Automated attendance system using OpenCV face recognition. Web dashboard for real-time logs, CSV export, and Flask-based management portal. Deployed on local servers.',
    details: 'Utilizes deep metric learning for face detection even in varying lighting conditions. Features automated CSV attendance exports for university staff.',
    highlights: ['Multi-face recognition in real-time', 'Exportable attendance logs (CSV/Excel)', 'Local edge processing for privacy'],
    stack: ['Python','OpenCV','Flask','SQLite','JS'],
  },
  {
    id: 5, cats: ['hardware','iot'], badge: 'IoT', sfx: 'WHIRR!',
    title: 'Smart Irrigation Controller',
    desc: 'Soil moisture-based auto-irrigation with manual override via mobile. ESP8266 + relay control, soil sensor calibration, and a live web interface for scheduling.',
    details: 'Automates farm and garden watering cycles based on capacitive moisture readings. Prevents over-watering and reduces water consumption by up to 35%.',
    highlights: ['Capacitive non-corrosive soil sensors', 'Automatic rain-delay mode', 'Responsive mobile control web interface'],
    stack: ['ESP8266','Sensors','Flask','HTML/JS'],
  },
  {
    id: 6, cats: ['hardware'], badge: 'HARDWARE', sfx: 'POW!',
    title: 'ESP32 Handheld Game Console',
    desc: 'Dual OLED custom game console with modular firmware. Snake, Breakout, Pong on dual SSD1306 displays with joystick controls, sound, and 2-player mode.',
    details: 'Custom handheld gaming rig built from scratch with dual I2C OLED screens, arcade tactile switches, piezo buzzer audio, and rechargeable LiPo power subsystem.',
    highlights: ['Dual-screen concurrent display driving', 'Low-latency C++ game engine', '3D-printed ergonomic enclosure'],
    stack: ['ESP32','Arduino','SSD1306','C++'],
  },
];

const FILTERS = ['all','hardware','software','iot'];

export default function Projects() {
  const [active, setActive] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const cardRefs = useRef([]);

  const visible = projects.filter(p => active === 'all' || p.cats.includes(active));

  useEffect(() => {
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      el.style.opacity = '0';
      const timer = setTimeout(() => {
        if (!el) return;
        el.style.opacity = '';
        el.classList.remove('animate-in');
        void el.offsetWidth;
        el.classList.add('animate-in');
      }, i * 70);
      return () => clearTimeout(timer);
    });
  }, [active]);

  // Handle modal escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    if (selectedProject) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

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
              aria-label={`Filter by ${f}`}
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
              <button
                type="button"
                className="btn btn-card"
                onClick={() => setSelectedProject(p)}
                aria-label={`View details for ${p.title}`}
              >
                <span style={{ color: 'var(--accent)', fontWeight: 900 }}>→</span> View Details
              </button>
            </div>
          ))}
        </div>

        {/* Project Details Modal */}
        {selectedProject && (
          <div
            className="modal-overlay"
            onClick={() => setSelectedProject(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <button
                className="modal-close"
                onClick={() => setSelectedProject(null)}
                aria-label="Close modal"
              >
                ✕
              </button>
              <div className="card-badge" style={{ marginBottom: '0.5rem' }}>{selectedProject.badge}</div>
              <h2 id="modal-title" className="card-title" style={{ fontSize: '1.8rem', marginTop: '0.25rem' }}>
                {selectedProject.title}
              </h2>
              <p className="card-desc" style={{ fontSize: '1rem', marginTop: '0.75rem' }}>
                {selectedProject.details}
              </p>

              <div style={{ margin: '1.25rem 0' }}>
                <h4 style={{ fontFamily: 'var(--font-label)', letterSpacing: '1px', marginBottom: '0.5rem', color: 'var(--ink)' }}>
                  KEY HIGHLIGHTS:
                </h4>
                <ul style={{ paddingLeft: '1.25rem', color: 'var(--ink2)', fontSize: '0.9rem' }}>
                  {selectedProject.highlights.map((h, idx) => (
                    <li key={idx} style={{ marginBottom: '0.35rem' }}>{h}</li>
                  ))}
                </ul>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontFamily: 'var(--font-label)', letterSpacing: '1px', marginBottom: '0.5rem', color: 'var(--ink)' }}>
                  TECH STACK:
                </h4>
                <div className="card-stack">
                  {selectedProject.stack.map(s => <span key={s}>{s}</span>)}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a
                  href="#contact"
                  className="btn btn-primary"
                  onClick={() => setSelectedProject(null)}
                >
                  <span className="btn-sfx">BOOM!</span> Inquire About This Build
                </a>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setSelectedProject(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
