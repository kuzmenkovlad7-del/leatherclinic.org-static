import React from 'react';

export default function About() {
  return (
    <section className="section section--light">
      <div className="wrap about-layout">
        <div className="about-badge">
          <span>LC</span>
        </div>
        <div className="about-text">
          <p className="eyebrow eyebrow--dark">About Us</p>
          <h2 className="h2--dark">Your furniture and interior deserve a fresh look.</h2>
          <p>
            Welcome to Leather Clinic LLC — your go-to for leather recoloring and restoration.
          </p>
          <p>
            We restore color on worn leather furniture and car interiors. We work on couches and car seats,
            fixing fading, scratches, and worn areas to bring the color back and even everything out.
          </p>
          <p>
            We also offer cushion refilling to improve comfort and shape, and can reupholster cushions
            and dining chairs with new material if needed.
          </p>
          <p className="about-tagline">Simple, clean work — done right.</p>
          <div className="about-contact">
            <a href="tel:+18438558272" className="btn btn--primary btn--md">Call (843) 855-8272</a>
            <a href="#book" className="btn btn--ghost btn--md">Get a Quote</a>
          </div>
        </div>
      </div>
    </section>
  );
}
