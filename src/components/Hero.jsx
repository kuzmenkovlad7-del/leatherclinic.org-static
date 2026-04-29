import React from 'react';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__bg" aria-hidden="true" />
      <div className="wrap hero__inner">
        <p className="eyebrow">Leather Clinic Raleigh, NC</p>
        <h1>Leather Recoloring<br />&amp; Restoration</h1>
        <p className="lead">
          Mobile leather repair, furniture recoloring, car interior restoration,
          cushion refilling and upholstery services.
        </p>
        <div className="actions">
          <a className="btn btn--primary btn--lg" href="#book">Request Now</a>
          <a className="btn btn--outline btn--lg" href="tel:+18438558272">Call Us</a>
        </div>
        <p className="hero__location">
          Based in Raleigh, NC 27605<br />
          Mobile Service – We Come to You<br />
          Proudly Serving Raleigh and surrounding areas
        </p>
      </div>
    </section>
  );
}
