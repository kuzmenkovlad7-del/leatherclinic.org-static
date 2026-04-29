import React from 'react';

const services = [
  {
    icon: '🚗',
    title: 'Auto Interior Color Restoration',
    desc: 'We recolor and restore worn car interiors — seats, armrests, and more. Fixing fading, scuffs, and scratches.',
  },
  {
    icon: '🛋️',
    title: 'Leather Couch Recoloring',
    desc: 'We recolor and restore worn leather couches. Fixing fading, scratches, and worn areas.',
  },
  {
    icon: '💺',
    title: 'Cushion Refilling',
    desc: 'We refill cushions for sofas and chairs to improve comfort, shape, and support.',
  },
  {
    icon: '🪡',
    title: 'Stitching & Reupholstery',
    desc: 'We repair stitching and can reupholster cushions and dining chairs with new material if needed.',
  },
];

export default function Services() {
  return (
    <section id="services" className="section section--dark">
      <div className="wrap">
        <p className="eyebrow">What We Do</p>
        <h2>Our Services</h2>
        <div className="services-grid">
          {services.map((s) => (
            <div className="service-card" key={s.title}>
              <div className="service-card__icon">{s.icon}</div>
              <h3 className="service-card__title">{s.title}</h3>
              <p className="service-card__desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
