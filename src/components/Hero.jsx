import React from 'react';

const BASE = import.meta.env.BASE_URL;

export default function Hero() {
  return (
    <section className="hero">
      <div
        className="hero__bg"
        aria-hidden="true"
        style={{ backgroundImage: `url(${BASE}img/hero-client-dog-cat-couch.jpg)` }}
      />
      <div className="wrap hero__inner">
        <h1>Leather Furniture<br />Repair</h1>
        <p className="hero__sub">
          Recoloring&nbsp;•&nbsp;Cushion Refilling&nbsp;•&nbsp;Tear &amp; Scratch Repair
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
