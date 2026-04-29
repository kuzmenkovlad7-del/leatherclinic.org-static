import React, { useState } from 'react';

const photos = [
  { src: '/img/source/work-01.webp', alt: 'Leather seat recoloring — car interior restoration' },
  { src: '/img/source/work-02.webp', alt: 'Leather couch repair and recoloring' },
  { src: '/img/source/work-03.webp', alt: 'Auto interior leather restoration' },
  { src: '/img/source/work-04.webp', alt: 'Car seat leather color restoration' },
  { src: '/img/source/work-05.webp', alt: 'Furniture leather recoloring result' },
  { src: '/img/source/work-06.webp', alt: 'Leather repair — sofa restoration' },
  { src: '/img/source/work-07.webp', alt: 'Cushion refilling and upholstery repair' },
  { src: '/img/source/work-08.webp', alt: 'Leather furniture scratch repair' },
  { src: '/img/source/work-09.webp', alt: 'Car interior color restoration complete' },
  { src: '/img/source/work-10.webp', alt: 'Leather couch restoration' },
  { src: '/img/source/work-11.webp', alt: 'Sofa leather recoloring' },
  { src: '/img/source/work-12.webp', alt: 'Stitching and reupholstery work' },
];

export default function Work() {
  const [lightbox, setLightbox] = useState(null);

  const close = () => setLightbox(null);
  const prev = () => setLightbox(i => (i - 1 + photos.length) % photos.length);
  const next = () => setLightbox(i => (i + 1) % photos.length);

  const onKey = (e) => {
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  };

  return (
    <section id="work" className="section section--light">
      <div className="wrap">
        <p className="eyebrow eyebrow--dark">Our Work</p>
        <h2 className="h2--dark">Real Project Photos</h2>
        <p className="section-sub">
          Every job done on-site in Raleigh, NC and surrounding areas.
        </p>

        <div className="photo-grid">
          {photos.map((p, i) => (
            <button
              key={p.src}
              className="photo-tile"
              onClick={() => setLightbox(i)}
              aria-label={`View photo: ${p.alt}`}
            >
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                decoding="async"
              />
              <span className="photo-tile__overlay" aria-hidden="true">
                <span className="photo-tile__zoom">&#9654;</span>
              </span>
            </button>
          ))}
        </div>

        <div className="work-cta">
          <a href="#book" className="btn btn--primary btn--lg">Get a Free Quote</a>
        </div>
      </div>

      {lightbox !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onKeyDown={onKey}
          tabIndex={-1}
          ref={el => el && el.focus()}
        >
          <button className="lightbox__close" onClick={close} aria-label="Close">✕</button>
          <button className="lightbox__prev" onClick={prev} aria-label="Previous photo">&#8249;</button>
          <div className="lightbox__img-wrap">
            <img src={photos[lightbox].src} alt={photos[lightbox].alt} />
          </div>
          <button className="lightbox__next" onClick={next} aria-label="Next photo">&#8250;</button>
          <p className="lightbox__caption">{lightbox + 1} / {photos.length}</p>
        </div>
      )}
    </section>
  );
}
