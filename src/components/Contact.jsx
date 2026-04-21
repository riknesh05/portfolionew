import { useState } from 'react';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name:'', email:'', project:'', message:'' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setForm({ name:'', email:'', project:'', message:'' });
      setTimeout(() => setSent(false), 5000);
    }, 1200);
  };

  return (
    <section id="contact" className="section-wrapper contact-section">
      <div className="section-inner">
        <div className="section-header">
          <p className="issue-tag">// CHAPTER 06</p>
          <h2 className="section-title">CONTACT</h2>
        </div>

        <div className="contact-grid">
          {/* Info */}
          <div className="contact-info">
            {[
              { icon:'📬', label:'Email',    val:'builder@example.com', href:'mailto:builder@example.com' },
              { icon:'📞', label:'Phone',    val:'+91 98765 43210',     href:'tel:+919876543210' },
              { icon:'📍', label:'Location', val:'Tamil Nadu, India',   href: null },
            ].map(row => (
              <div key={row.label} className="contact-item">
                <span className="contact-icon">{row.icon}</span>
                <div>
                  <strong>{row.label}</strong>
                  {row.href
                    ? <a href={row.href}>{row.val}</a>
                    : <span>{row.val}</span>
                  }
                </div>
              </div>
            ))}
            <div className="contact-socials">
              <a href="#" className="social-btn">GitHub</a>
              <a href="#" className="social-btn">LinkedIn</a>
            </div>
          </div>

          {/* Form */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" type="text" placeholder="Your name..." required
                value={form.name} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" placeholder="your@email.com" required
                value={form.email} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="project">Project Type</label>
              <select id="project" name="project" value={form.project} onChange={handleChange}>
                <option value="">Select type...</option>
                <option>Mini Project</option>
                <option>Final Year Project</option>
                <option>IoT System</option>
                <option>General Inquiry</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows={4} placeholder="Describe your project idea..." required
                value={form.message} onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
              <span className="btn-sfx">SEND!</span>
              {loading ? 'Sending...' : 'Submit Message'}
            </button>
            {sent && (
              <div className="form-success">
                ✅ Message sent! I'll get back to you soon.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
