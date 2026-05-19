import React, { useState } from 'react';

const items = [
  {
    q: 'Where do you serve?',
    a: 'We primarily serve Myrtle Beach, SC and the surrounding South Carolina area. We come to you: home, office, or dealership.',
  },
  {
    q: 'Do I need to bring my furniture or car to a shop?',
    a: 'No. Leather Clinic is a fully mobile service. We travel to your location and perform all repairs on-site, so you never need to haul your sofa or vehicle anywhere.',
  },
  {
    q: 'How do I get a quote?',
    a: 'The fastest way is to send photos. Use the Free Quote form on this page, attach up to 3 photos of the damage, and we will contact you with a price estimate.',
  },
  {
    q: 'What does leather recoloring involve?',
    a: 'We clean the leather, apply a color-matched dye or pigment coating, and seal it with a protective finish. The result restores the original color and covers fading, scuffs, and worn areas — without replacing the leather.',
  },
  {
    q: 'Can you restore car seats and dashboards?',
    a: 'Yes. We repair and recolor leather and vinyl car interiors — seats, door panels, armrests, and steering wheels — using products safe for automotive surfaces.',
  },
  {
    q: 'How long does a typical repair take?',
    a: 'Most jobs are completed in a single visit of 2–4 hours. Larger projects such as full sofa recoloring may require a follow-up visit.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  const toggle = (i) => setOpen(open === i ? null : i);

  return (
    <section id="faq" className="section section--dark2">
      <div className="wrap">
        <p className="eyebrow">FAQ</p>
        <h2>Common Questions</h2>
        <div className="faq-list">
          {items.map((item, i) => (
            <div key={i} className={`faq-item${open === i ? ' faq-item--open' : ''}`}>
              <button
                className="faq-question"
                onClick={() => toggle(i)}
                aria-expanded={open === i}
              >
                <span>{item.q}</span>
                <span className="faq-chevron" aria-hidden="true">{open === i ? '−' : '+'}</span>
              </button>
              {open === i && <p className="faq-answer">{item.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
