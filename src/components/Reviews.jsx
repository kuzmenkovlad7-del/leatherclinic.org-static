import React from 'react';

const reviews = [
  {
    name: 'Ann Vetter',
    stars: 5,
    text: 'Leather Clinic did a fantastic job! My furniture looks like new. They were respectful, pleasant and honest. I was comfortable with them being in my home. I would recommend them.',
  },
  {
    name: 'Shawn Handfinger',
    stars: 5,
    text: 'I have a large sectional leather sofa that is 23 years old. He was able to correct all issues, polished and cleaned the entire sofa, and it really looks like a brand new sofa. Highly recommend.',
  },
  {
    name: 'Mz. Copeland',
    stars: 5,
    text: 'I had a great experience with The Leather Clinic. They repaired the leather inside my car, and it looks brand new again. They came right to my home and finished everything in about two hours.',
  },
  {
    name: 'Laura Barbur',
    stars: 5,
    text: 'Andy did an amazing job refinishing deep cat scratches on our white leather couch. He worked quickly and diligently onsite, and our couch looks like new.',
  },
  {
    name: 'Vaishali Deshpande',
    stars: 5,
    text: 'Good service, they fixed our sofa and made it firm. They also polished the sofa at no extra cost. I highly recommend.',
  },
  {
    name: 'Gina K',
    stars: 5,
    text: 'Andy repaired and recolored a couch and recliner for me. He was extremely kind, helpful, and efficient. My pieces now look and feel brand new.',
  },
];

function Stars({ count }) {
  return (
    <div className="stars" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} aria-hidden="true">★</span>
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" className="section section--dark">
      <div className="wrap">
        <p className="eyebrow">Testimonials</p>
        <h2>What Our Customers Say</h2>
        <div className="reviews-grid">
          {reviews.map((r) => (
            <div className="review-card" key={r.name}>
              <Stars count={r.stars} />
              <p className="review-text">"{r.text}"</p>
              <p className="review-author">— {r.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
