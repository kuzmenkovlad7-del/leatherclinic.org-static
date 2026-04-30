import React from 'react';

const BASE = import.meta.env.BASE_URL;

const services = [
  {
    img: `${BASE}img/svc-car.webp`,
    imgAlt: 'Car interior leather color restoration',
    title: 'Auto Interior Color Restoration',
    desc: 'We recolor and restore worn car interiors — seats, armrests, and more. Fixing fading, scuffs, and scratches.',
  },
  {
    img: `${BASE}img/svc-couch.webp`,
    imgAlt: 'Leather couch recoloring result',
    title: 'Leather Couch Recoloring',
    desc: 'We recolor and restore worn leather couches. Fixing fading, scratches, and worn areas.',
  },
  {
    img: `${BASE}img/svc-cushion.webp`,
    imgAlt: 'Cushion refilling for sofas and chairs',
    title: 'Cushion Refilling',
    desc: 'We refill cushions for sofas and chairs to improve comfort, shape, and support.',
  },
  {
    img: `${BASE}img/svc-stitch.webp`,
    imgAlt: 'Stitching and reupholstery service',
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
              {s.img
                ? <img src={s.img} alt={s.imgAlt} className="service-card__img" loading="lazy" />
                : <span className="service-card__icon">{s.icon}</span>
              }
              <h3 className="service-card__title">{s.title}</h3>
              <p className="service-card__desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
