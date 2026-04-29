import React, { useState } from 'react';

const BASE = import.meta.env.BASE_URL;

const photos = [
  { src: `${BASE}img/source/work-01.webp`, alt: 'Leather seat recoloring — car interior restoration' },
  { src: `${BASE}img/source/work-02.webp`, alt: 'Leather couch repair and recoloring' },
  { src: `${BASE}img/source/work-03.webp`, alt: 'Auto interior leather restoration' },
  { src: `${BASE}img/source/work-04.webp`, alt: 'Car seat leather color restoration' },
  { src: `${BASE}img/source/work-05.webp`, alt: 'Furniture leather recoloring result' },
  { src: `${BASE}img/source/work-06.webp`, alt: 'Leather repair — sofa restoration' },
  { src: `${BASE}img/source/work-07.webp`, alt: 'Cushion refilling and upholstery repair' },
  { src: `${BASE}img/source/work-08.webp`, alt: 'Leather furniture scratch repair' },
  { src: `${BASE}img/source/work-09.webp`, alt: 'Car interior color restoration complete' },
  { src: `${BASE}img/source/work-10.webp`, alt: 'Leather couch restoration' },
  { src: `${BASE}img/source/work-11.webp`, alt: 'Sofa leather recoloring' },
  { src: `${BASE}img/source/work-12.webp`, alt: 'Stitching and reupholstery work' },
  { src: `${BASE}img/source/work-13.webp`, alt: 'Auto interior leather restoration' },
  { src: `${BASE}img/source/work-14.webp`, alt: 'Leather couch color restoration' },
  { src: `${BASE}img/source/work-15.webp`, alt: 'Car seat recoloring project' },
  { src: `${BASE}img/source/work-16.webp`, alt: 'Leather furniture repair' },
  { src: `${BASE}img/source/work-17.webp`, alt: 'Sofa leather restoration' },
  { src: `${BASE}img/source/work-18.webp`, alt: 'Leather repair project' },
  { src: `${BASE}img/source/work-19.webp`, alt: 'Car interior restoration' },
  { src: `${BASE}img/source/work-20.webp`, alt: 'Leather couch recoloring' },
  { src: `${BASE}img/source/work-21.webp`, alt: 'Furniture leather repair and recoloring' },
  { src: `${BASE}img/source/work-22.webp`, alt: 'Leather restoration work' },
  { src: `${BASE}img/source/work-23.webp`, alt: 'Car seat leather repair' },
  { src: `${BASE}img/source/work-24.webp`, alt: 'Leather furniture restoration result' },
  { src: `${BASE}img/source/work-25.webp`, alt: 'Sofa repair and recoloring' },
  { src: `${BASE}img/source/work-26.webp`, alt: 'Car interior color restoration' },
  { src: `${BASE}img/source/work-27.webp`, alt: 'Leather couch scratch repair' },
  { src: `${BASE}img/source/work-28.webp`, alt: 'Furniture leather recoloring' },
  { src: `${BASE}img/source/work-29.webp`, alt: 'Car seat restoration complete' },
  { src: `${BASE}img/source/work-30.webp`, alt: 'Leather furniture repair project' },
  { src: `${BASE}img/source/work-31.webp`, alt: 'Auto interior leather restoration' },
  { src: `${BASE}img/source/work-32.webp`, alt: 'Sofa leather repair and recoloring' },
  { src: `${BASE}img/source/work-33.webp`, alt: 'Car seat leather color restoration' },
  { src: `${BASE}img/source/work-34.webp`, alt: 'Leather couch restoration project' },
  { src: `${BASE}img/source/work-35.webp`, alt: 'Cushion refilling and repair' },
  { src: `${BASE}img/source/work-36.webp`, alt: 'Leather furniture recoloring' },
  { src: `${BASE}img/source/work-37.webp`, alt: 'Car interior leather repair' },
  { src: `${BASE}img/source/work-38.webp`, alt: 'Sofa leather color restoration' },
  { src: `${BASE}img/source/work-39.webp`, alt: 'Leather repair project complete' },
  { src: `${BASE}img/source/work-40.webp`, alt: 'Furniture leather restoration' },
  { src: `${BASE}img/source/work-41.webp`, alt: 'Car seat recoloring and repair' },
  { src: `${BASE}img/source/work-42.webp`, alt: 'Leather couch recoloring project' },
  { src: `${BASE}img/source/work-43.webp`, alt: 'Sofa repair and restoration' },
  { src: `${BASE}img/source/work-44.webp`, alt: 'Car interior restoration project' },
  { src: `${BASE}img/source/work-45.webp`, alt: 'Leather furniture scratch repair' },
  { src: `${BASE}img/source/work-46.webp`, alt: 'Upholstery and leather repair' },
  { src: `${BASE}img/source/work-47.webp`, alt: 'Leather recoloring result' },
  { src: `${BASE}img/source/work-48.webp`, alt: 'Car seat leather restoration' },
  { src: `${BASE}img/source/work-49.webp`, alt: 'Sofa leather recoloring complete' },
  { src: `${BASE}img/source/work-50.webp`, alt: 'Furniture repair and recoloring' },
  { src: `${BASE}img/source/work-51.webp`, alt: 'Leather repair and restoration' },
  { src: `${BASE}img/source/work-52.webp`, alt: 'Car interior color restoration' },
  { src: `${BASE}img/source/work-53.webp`, alt: 'Leather couch restoration complete' },
  { src: `${BASE}img/source/work-54.webp`, alt: 'Sofa leather color restoration' },
  { src: `${BASE}img/source/work-55.webp`, alt: 'Leather furniture repair project' },
  { src: `${BASE}img/source/work-56.webp`, alt: 'Car seat leather recoloring' },
  { src: `${BASE}img/source/work-57.webp`, alt: 'Leather couch repair project' },
  { src: `${BASE}img/source/work-58.webp`, alt: 'Furniture leather restoration result' },
  { src: `${BASE}img/source/work-59.webp`, alt: 'Auto interior leather repair' },
  { src: `${BASE}img/source/work-60.webp`, alt: 'Sofa recoloring and repair' },
  { src: `${BASE}img/source/work-61.webp`, alt: 'Leather restoration project' },
  { src: `${BASE}img/source/work-62.webp`, alt: 'Car interior leather restoration' },
  { src: `${BASE}img/source/work-63.webp`, alt: 'Leather furniture recoloring project' },
  { src: `${BASE}img/source/work-64.webp`, alt: 'Sofa leather repair complete' },
  { src: `${BASE}img/source/work-65.webp`, alt: 'Cushion refilling service' },
  { src: `${BASE}img/source/work-66.webp`, alt: 'Leather couch color repair' },
  { src: `${BASE}img/source/work-67.webp`, alt: 'Car seat restoration result' },
  { src: `${BASE}img/source/work-68.webp`, alt: 'Leather furniture color restoration' },
  { src: `${BASE}img/source/work-69.webp`, alt: 'Sofa restoration project' },
  { src: `${BASE}img/source/work-70.webp`, alt: 'Car interior repair and recoloring' },
  { src: `${BASE}img/source/work-71.webp`, alt: 'Leather couch recoloring complete' },
  { src: `${BASE}img/source/work-72.webp`, alt: 'Furniture leather repair result' },
  { src: `${BASE}img/source/work-73.webp`, alt: 'Sofa leather restoration complete' },
  { src: `${BASE}img/source/work-74.webp`, alt: 'Car seat leather color repair' },
  { src: `${BASE}img/source/work-75.webp`, alt: 'Leather restoration service' },
  { src: `${BASE}img/source/work-76.webp`, alt: 'Furniture leather recoloring result' },
  { src: `${BASE}img/source/work-77.webp`, alt: 'Car interior restoration complete' },
  { src: `${BASE}img/source/work-78.webp`, alt: 'Sofa leather recoloring project' },
  { src: `${BASE}img/source/work-79.webp`, alt: 'Leather couch repair and restoration' },
  { src: `${BASE}img/source/work-80.webp`, alt: 'Auto leather restoration result' },
  { src: `${BASE}img/source/work-81.webp`, alt: 'Leather furniture repair complete' },
  { src: `${BASE}img/source/work-82.webp`, alt: 'Car seat recoloring result' },
  { src: `${BASE}img/source/work-83.webp`, alt: 'Sofa leather repair project' },
  { src: `${BASE}img/source/work-84.webp`, alt: 'Leather restoration and recoloring' },
  { src: `${BASE}img/source/work-85.webp`, alt: 'Car interior leather recoloring' },
  { src: `${BASE}img/source/work-86.webp`, alt: 'Leather couch restoration result' },
  { src: `${BASE}img/source/work-87.webp`, alt: 'Sofa leather color repair complete' },
  { src: `${BASE}img/source/work-88.webp`, alt: 'Furniture recoloring and repair' },
  { src: `${BASE}img/source/work-89.webp`, alt: 'Car seat leather restoration result' },
  { src: `${BASE}img/source/work-90.webp`, alt: 'Leather repair service complete' },
  { src: `${BASE}img/source/work-91.webp`, alt: 'Sofa leather restoration project' },
  { src: `${BASE}img/source/work-92.webp`, alt: 'Furniture leather color restoration' },
  { src: `${BASE}img/source/work-93.webp`, alt: 'Car interior recoloring complete' },
  { src: `${BASE}img/source/work-94.webp`, alt: 'Leather couch repair result' },
  { src: `${BASE}img/source/work-95.webp`, alt: 'Sofa leather repair and recoloring' },
  { src: `${BASE}img/source/work-96.webp`, alt: 'Leather furniture restoration project' },
  { src: `${BASE}img/source/work-97.webp`, alt: 'Car seat color restoration complete' },
  { src: `${BASE}img/source/work-98.webp`, alt: 'Leather recoloring service result' },
  { src: `${BASE}img/source/work-99.webp`, alt: 'Sofa and furniture leather repair' },
  { src: `${BASE}img/source/work-100.webp`, alt: 'Car interior restoration project' },
  { src: `${BASE}img/source/work-101.webp`, alt: 'Leather couch recoloring result' },
  { src: `${BASE}img/source/work-102.webp`, alt: 'Furniture leather repair and restoration' },
  { src: `${BASE}img/source/work-103.webp`, alt: 'Car seat leather repair complete' },
  { src: `${BASE}img/source/work-104.webp`, alt: 'Sofa restoration and recoloring' },
  { src: `${BASE}img/source/work-105.webp`, alt: 'Leather furniture color restoration' },
  { src: `${BASE}img/source/work-106.webp`, alt: 'Car interior leather repair project' },
  { src: `${BASE}img/source/work-107.webp`, alt: 'Leather couch restoration and repair' },
  { src: `${BASE}img/source/work-108.webp`, alt: 'Sofa leather recoloring result' },
  { src: `${BASE}img/source/work-109.webp`, alt: 'Furniture leather restoration complete' },
  { src: `${BASE}img/source/work-110.webp`, alt: 'Car seat leather color repair' },
  { src: `${BASE}img/source/work-111.webp`, alt: 'Leather repair and recoloring complete' },
  { src: `${BASE}img/source/work-112.webp`, alt: 'Sofa leather restoration service' },
  { src: `${BASE}img/source/work-113.webp`, alt: 'Leather furniture recoloring complete' },
  { src: `${BASE}img/source/work-114.webp`, alt: 'Car interior color restoration result' },
  { src: `${BASE}img/source/work-115.webp`, alt: 'Leather couch repair service' },
  { src: `${BASE}img/source/work-116.webp`, alt: 'Sofa leather color restoration result' },
  { src: `${BASE}img/source/work-117.webp`, alt: 'Leather restoration and repair complete' },
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
              <img src={p.src} alt={p.alt} loading="lazy" decoding="async" />
              <span className="photo-tile__overlay" aria-hidden="true">
                <span className="photo-tile__zoom">⊕</span>
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
