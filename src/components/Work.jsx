import React from 'react';

const projects = [
  {
    label: 'Car Interior',
    title: 'Auto Seat Recoloring',
    desc: 'Worn leather car seats recolored and restored to a uniform, like-new finish.',
    tag: 'Auto',
  },
  {
    label: 'Furniture',
    title: 'Leather Couch Restoration',
    desc: 'Faded leather sofa recolored and conditioned — scratches and worn areas fully repaired.',
    tag: 'Furniture',
  },
  {
    label: 'Cushion',
    title: 'Cushion Refilling',
    desc: 'Flat sofa cushions refilled with new foam to restore comfort and shape.',
    tag: 'Cushion',
  },
  {
    label: 'Stitching',
    title: 'Stitching & Reupholstery',
    desc: 'Broken seams repaired and dining chairs reupholstered with fresh material.',
    tag: 'Repair',
  },
  {
    label: 'Recliner',
    title: 'Recliner Leather Repair',
    desc: 'Peeling and cracked recliner arms and back recolored and sealed.',
    tag: 'Furniture',
  },
  {
    label: 'Car Armrest',
    title: 'Car Armrest Restoration',
    desc: 'Scuffed and faded car armrests restored to match original interior color.',
    tag: 'Auto',
  },
];

const tagColors = {
  Auto: '#e9042a',
  Furniture: '#6c47ff',
  Cushion: '#0070f3',
  Repair: '#00b37e',
};

export default function Work() {
  return (
    <section id="work" className="section section--light">
      <div className="wrap">
        <p className="eyebrow eyebrow--dark">Our Work</p>
        <h2 className="h2--dark">Repair &amp; Restoration Projects</h2>
        <p className="section-sub">
          Each project restored by hand — color matched, stitched, and finished on-site.
        </p>
        <div className="work-grid">
          {projects.map((p) => (
            <div className="work-card" key={p.title}>
              <div className="work-card__visual">
                <div className="work-card__tag" style={{ background: tagColors[p.tag] ?? '#e9042a' }}>
                  {p.tag}
                </div>
                <div className="work-card__icon-wrap">
                  <span className="work-card__icon">✦</span>
                </div>
              </div>
              <div className="work-card__body">
                <p className="work-card__label">{p.label}</p>
                <h3 className="work-card__title">{p.title}</h3>
                <p className="work-card__desc">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="work-cta">
          <a href="#book" className="btn btn--primary btn--lg">Get a Free Quote</a>
        </div>
      </div>
    </section>
  );
}
