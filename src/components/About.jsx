import { useEffect, useRef } from 'react';
import './About.css';

const panels = [
  { num: '01', title: 'The Origin', body: <>Started with a curiosity for <strong>how things work</strong> — pulled apart circuits before writing a single line of code. Today I bridge both worlds: building full&#8209;stack web apps and embedded hardware systems that actually solve problems.</> },
  { num: '02', title: 'The Workshop', body: <>I run a <strong>project center</strong> where students bring half-baked ideas and leave with working prototypes. From IoT dashboards to battery management systems — every project ships with documentation and a demo.</> },
  { num: '03', title: 'The Hardware', body: <>Deep in the stack: <strong>ESP8266, ESP32</strong>, temperature &amp; humidity sensors, current sensors, battery chemistries, and everything in between. I design circuits, write firmware, and connect it all to the cloud.</> },
  { num: '04', title: 'The Code', body: <><strong>Full-stack by necessity.</strong> Flask APIs, vanilla JS dashboards, JSON-driven data stores, RESTful endpoints — whatever it takes to make the hardware readable by humans on any screen.</> },
];

export default function About() {
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
    <section id="about" className="about-section">
      <div className="section-wrapper">
        <div className="section-inner">
          <div className="section-header">
            <p className="issue-tag">// CHAPTER 02</p>
            <h2 className="section-title">ABOUT ME</h2>
          </div>
          <div className="about-grid">
            {panels.map((p, i) => (
              <div key={p.num} className="about-panel" ref={el => refs.current[i] = el}>
                <div className="panel-number">{p.num}</div>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
