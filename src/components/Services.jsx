import { useEffect, useRef } from 'react';
import './Services.css';

const services = [
  {
    icon: '⚡', title: 'Mini Projects', featured: false,
    desc: 'Quick builds for semester submissions. LED controllers, sensor readers, basic dashboards — delivered fast with full code and circuit diagrams.',
    items: ['Circuit schematic','Component list','Source code','Demo video'],
  },
  {
    icon: '🔬', title: 'Final Year Projects', featured: true,
    desc: 'Full-scope final year projects with report-ready documentation, working prototypes, and presentation support. Hardware + software end-to-end.',
    items: ['End-to-end build','Project report','Presentation slides','Source + firmware'],
  },
  {
    icon: '📡', title: 'IoT Systems', featured: false,
    desc: 'Cloud-connected sensor networks, dashboards, and automation systems. ESP-based with web interfaces and real-time data visualization.',
    items: ['Sensor integration','Web dashboard','Cloud/local server','Mobile responsive'],
  },
];

export default function Services() {
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
    <section id="services" className="services-section">
      <div className="section-wrapper">
        <div className="section-inner">
          <div className="section-header">
            <p className="issue-tag">// CHAPTER 05</p>
            <h2 className="section-title">PROJECT CENTER</h2>
          </div>
          <p className="services-intro">
            I build complete, working projects for engineering students — hardware + software,
            fully documented, demo-ready. No half-done prototypes.
          </p>
          <div className="services-grid">
            {services.map((s, i) => (
              <div
                key={s.title}
                className={`service-card${s.featured ? ' featured' : ''}`}
                ref={el => refs.current[i] = el}
              >
                <div className="service-icon">{s.icon}</div>
                {s.featured && <div className="service-featured-tag">MOST POPULAR</div>}
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <ul>
                  {s.items.map(item => <li key={item}>✔ {item}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="services-cta">
            <a href="#contact" className="btn btn-primary btn-large">
              <span className="btn-sfx">LET'S GO!</span> Get Your Project Built
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
