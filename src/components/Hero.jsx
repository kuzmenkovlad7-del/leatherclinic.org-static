import React from 'react';

const BASE = import.meta.env.BASE_URL;

export default function Hero() {
  return (
    <section className="hero">
      <div
        className="hero__bg"
        aria-hidden="true"
        style={{ backgroundImage: `url(${BASE}img/hero-bg.webp)` }}
      />
      <div className="wrap hero__inner">
        <p className="eyebrow">Leather Clinic Raleigh, NC</p>
        <h1>Leather Furniture Repair<br />&amp; Car Interiors<br />Upholstery Services</h1>
        <p className="lead">
          Mobile leather repair, furniture recoloring, car interior restoration,
          cushion refilling and upholstery services.
        </p>
        <div className="actions">
          <a className="btn btn--primary btn--lg" href="#book">Request Now</a>
          <a className="btn btn--outline btn--lg" href="tel:+18438558272">Call Us</a>
        </div>
        <p className="hero__location">
          Based in Raleigh, NC 27605
        </p>
      </div>
    </section>
  );
}
