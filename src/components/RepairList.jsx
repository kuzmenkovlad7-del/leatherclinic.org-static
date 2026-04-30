import React from 'react';

const bullets = [
  'Leather furniture repair and recoloring',
  'Fixing scratches, tears, and worn areas',
  'Cushion refilling for sofas and chairs',
  'Stitching and reupholstery',
  'Car interior repair and recoloring',
];

const stats = [
  { value: '500+', label: 'Projects Completed' },
  { value: '4', label: 'Years of Experience' },
];

export default function RepairList() {
  return (
    <section className="section section--dark">
      <div className="wrap repair-layout">
        <div className="repair-text">
          <p className="eyebrow">What We Repair</p>
          <h2>Upholstery and Leather Repair</h2>
          <p className="repair-intro">
            Rely on our restoration services to maintain the beauty and comfort of your furniture and car interiors.
          </p>
          <ul className="check-list">
            {bullets.map(b => (
              <li key={b}>
                <span className="check-icon">✅</span>
                {b}
              </li>
            ))}
          </ul>
        </div>
        <div className="repair-stats">
          {stats.map(s => (
            <div className="stat-card" key={s.label}>
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
          <a href="#book" className="btn btn--primary btn--lg repair-cta-btn">Book a Repair</a>
        </div>
      </div>
    </section>
  );
}
