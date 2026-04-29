import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

function App() {
  return (
    <main className="page">
      <section className="hero">
        <div className="wrap">
          <p className="eyebrow">Leather Clinic Raleigh, NC</p>
          <h1>Leather Recoloring & Restoration</h1>
          <p className="lead">
            Mobile leather repair, furniture recoloring, car interior restoration,
            cushion refilling and upholstery services.
          </p>
          <div className="actions">
            <a className="btn primary" href="#book">Request Now</a>
            <a className="btn secondary" href="tel:+18438558272">Call Us</a>
          </div>
          <p className="location">
            Based in Raleigh, NC 27605<br />
            Mobile Service – We Come to You<br />
            Proudly Serving Raleigh and surrounding areas
          </p>
        </div>
      </section>

      <section id="book" className="section">
        <div className="wrap">
          <h2>Get a Free Quote</h2>
          <p>Send photos and details. We will contact you shortly.</p>
          <p className="note">Claude Code will replace this scaffold with the full rebuilt site.</p>
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
