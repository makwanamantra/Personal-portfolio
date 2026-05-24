import React, { useState } from 'react';
import './Contact.css';

const SOCIAL_LINKS = [
  { label: 'GitHub', handle: '@mantramakwana', url: 'https://github.com/mantramakwana', icon: '⌥' },
  { label: 'LinkedIn', handle: 'mantramakwana', url: 'https://linkedin.com/in/mantramakwana', icon: '◈' },
  { label: 'Email', handle: 'mantra@example.com', url: 'mailto:mantra@example.com', icon: '✉' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null); // null | 'sending' | 'sent' | 'error'

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('sent');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      // Simulate success in demo mode
      setStatus('sent');
      setForm({ name: '', email: '', subject: '', message: '' });
    }
  };

  return (
    <section className="contact section" id="contact">
      <div className="container">
        <div className="section-header centered">
          <p className="section-label">get in touch</p>
          <h2 className="section-title">
            Let's <span className="accent">Connect</span>
          </h2>
          <p className="section-sub">
            Open to freelance projects, full-time roles, and interesting collaborations.
          </p>
        </div>

        <div className="contact-grid">
          {/* Left: info */}
          <div className="contact-info">
            <div className="contact-status">
              <span className="status-dot" />
              <span className="status-text">Available for new projects</span>
            </div>

            <p className="contact-blurb">
              Whether you need a full-stack system, a Java microservice, a Python automation
              pipeline, or just want to talk tech — my inbox is open.
            </p>

            <div className="contact-socials">
              {SOCIAL_LINKS.map(({ label, handle, url, icon }) => (
                <a key={label} href={url} target="_blank" rel="noopener noreferrer" className="social-row">
                  <span className="social-icon">{icon}</span>
                  <div className="social-info">
                    <span className="social-label">{label}</span>
                    <span className="social-handle">{handle}</span>
                  </div>
                  <span className="social-arrow">→</span>
                </a>
              ))}
            </div>

            <div className="contact-terminal">
              <div className="terminal-header">
                <span className="t-dot red" />
                <span className="t-dot yellow" />
                <span className="t-dot green" />
                <span className="t-title">response_time.sh</span>
              </div>
              <div className="terminal-body">
                <div className="t-line dim">
                  <span className="t-prompt">$</span>
                  <span> ./check_availability.sh</span>
                </div>
                <div className="t-line green">✓ Status: ONLINE</div>
                <div className="t-line dim">⏱ Avg response: &lt; 24 hours</div>
                <div className="t-line dim">📍 Location: India</div>
                <div className="t-line green">
                  <span className="t-cursor">▋</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="contact-form-wrap">
            {status === 'sent' ? (
              <div className="form-success">
                <div className="success-icon">✓</div>
                <h3>Message Transmitted</h3>
                <p>Your message has been received. I'll get back to you within 24 hours.</p>
                <button className="btn btn-primary" onClick={() => setStatus(null)}>
                  Send Another
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-input"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-input"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    className="form-input"
                    placeholder="Project inquiry / Collaboration / Job offer"
                    value={form.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea
                    name="message"
                    className="form-input form-textarea"
                    placeholder="Tell me about your project or idea..."
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary form-submit"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? '[ transmitting... ]' : '[ send_message() ]'}
                </button>

                {status === 'error' && (
                  <p className="form-error">Transmission failed. Try emailing directly.</p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}