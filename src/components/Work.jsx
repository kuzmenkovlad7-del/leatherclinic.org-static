import { useEffect, useMemo, useState } from 'react';

const BASE = import.meta.env.BASE_URL;

// 14 client photos first (client-approved, in order)
const clientPhotos = [
  { src: `${BASE}img/client/lc-client-extra-01.jpg`, alt: 'Brown leather sofa set restoration — photo 1' },
  { src: `${BASE}img/client/lc-client-extra-02.jpg`, alt: 'Brown leather sofa set restoration — photo 2' },
  { src: `${BASE}img/client/lc-client-extra-03.jpg`, alt: 'Brown leather sofa set restoration — photo 3' },
  { src: `${BASE}img/client/lc-client-extra-04.jpg`, alt: 'Brown leather chair set restoration' },
  { src: `${BASE}img/client/lc-client-extra-05.jpg`, alt: 'White sectional couch — before recoloring' },
  { src: `${BASE}img/client/lc-client-extra-06.jpg`, alt: 'White sectional couch — after recoloring' },
  { src: `${BASE}img/client/lc-client-extra-07.jpg`, alt: 'Car interior seat — before color restoration' },
  { src: `${BASE}img/client/lc-client-extra-08.jpg`, alt: 'Car interior seat — after color restoration' },
  { src: `${BASE}img/client/lc-client-extra-09.jpg`, alt: 'Green sofa — before restoration' },
  { src: `${BASE}img/client/lc-client-extra-10.jpg`, alt: 'Green sofa — after restoration' },
  { src: `${BASE}img/client/lc-client-extra-11.jpg`, alt: 'Recliner — before cushion refilling' },
  { src: `${BASE}img/client/lc-client-extra-12.jpg`, alt: 'Recliner — after cushion refilling' },
  { src: `${BASE}img/client/lc-client-extra-13.jpg`, alt: 'Dining chair — before reupholstery' },
  { src: `${BASE}img/client/lc-client-extra-14.jpg`, alt: 'Dining chair — after reupholstery' },
];

// 4 verified good source photos (curated top picks)
const sourcePhotos = [1, 2, 3, 4].map((n) => ({
  src: `${BASE}img/source/work-${String(n).padStart(2, '0')}.webp`,
  alt: `Leather Clinic project photo ${n}`,
}));

// Total: 18 gallery photos
const allPhotos = [...clientPhotos, ...sourcePhotos];

function getVisibleCount() {
  if (typeof window === 'undefined') return 2;
  if (window.innerWidth < 640) return 1;
  return 2;
}

function useVisibleCount() {
  const [visibleCount, setVisibleCount] = useState(getVisibleCount);

  useEffect(() => {
    const handleResize = () => setVisibleCount(getVisibleCount());
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return visibleCount;
}

export default function Work() {
  const photos = useMemo(() => allPhotos, []);
  const visibleCount = useVisibleCount();
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const maxStart = Math.max(0, photos.length - visibleCount);
  const visibleEnd = Math.min(activeIndex + visibleCount, photos.length);
  const visiblePhotos = photos.slice(activeIndex, visibleEnd);

  useEffect(() => {
    setActiveIndex((current) => Math.min(current, maxStart));
  }, [maxStart]);

  const goPrev = () => setActiveIndex((c) => Math.max(0, c - visibleCount));
  const goNext = () => setActiveIndex((c) => Math.min(maxStart, c + visibleCount));

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const showPrevPhoto = () => {
    setLightboxIndex((c) => (c === null ? null : c === 0 ? photos.length - 1 : c - 1));
  };

  const showNextPhoto = () => {
    setLightboxIndex((c) => (c === null ? null : c === photos.length - 1 ? 0 : c + 1));
  };

  useEffect(() => {
    if (lightboxIndex === null) return undefined;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrevPhoto();
      if (e.key === 'ArrowRight') showNextPhoto();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, photos.length]);

  const rangeLabel =
    visibleCount === 1
      ? `${activeIndex + 1} / ${photos.length}`
      : `${activeIndex + 1}–${visibleEnd} / ${photos.length}`;

  const progress = `${(visibleEnd / photos.length) * 100}%`;

  return (
    <section id="work" className="lc-work-section">
      <div className="lc-work-shell">
        <div className="lc-work-heading">
          <p className="lc-work-eyebrow">OUR WORK</p>
          <h2 className="lc-work-title">Before &amp; After Work</h2>
          <p className="lc-work-subtitle">
            Every job done on-site in Raleigh, NC and surrounding areas.
          </p>
        </div>

        <div className="lc-work-carousel" aria-label="Leather Clinic project photo carousel">
          <div className={`lc-work-track lc-work-track-${visibleCount}`}>
            {visiblePhotos.map((photo, index) => {
              const realIndex = activeIndex + index;
              return (
                <button
                  key={photo.src}
                  className="lc-work-photo"
                  type="button"
                  onClick={() => openLightbox(realIndex)}
                  aria-label={`Open project photo ${realIndex + 1}`}
                >
                  <img src={photo.src} alt={photo.alt} loading="lazy" />
                </button>
              );
            })}
          </div>

          <div className="lc-work-controls">
            <button
              className="lc-work-arrow"
              type="button"
              onClick={goPrev}
              disabled={activeIndex === 0}
              aria-label="Previous photos"
            >
              ‹
            </button>

            <div className="lc-work-counter">
              <span>{rangeLabel}</span>
              <div className="lc-work-progress" aria-hidden="true">
                <i style={{ width: progress }} />
              </div>
            </div>

            <button
              className="lc-work-arrow"
              type="button"
              onClick={goNext}
              disabled={activeIndex >= maxStart}
              aria-label="Next photos"
            >
              ›
            </button>
          </div>

          <a className="lc-work-cta" href="#book">
            Get a Free Quote
          </a>
        </div>
      </div>

      {lightboxIndex !== null && (
        <div className="lc-lightbox" role="dialog" aria-modal="true" onClick={closeLightbox}>
          <button className="lc-lightbox-close" type="button" onClick={closeLightbox}>×</button>

          <button
            className="lc-lightbox-arrow lc-lightbox-prev"
            type="button"
            onClick={(e) => { e.stopPropagation(); showPrevPhoto(); }}
            aria-label="Previous photo"
          >‹</button>

          <img
            src={photos[lightboxIndex].src}
            alt={photos[lightboxIndex].alt}
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="lc-lightbox-arrow lc-lightbox-next"
            type="button"
            onClick={(e) => { e.stopPropagation(); showNextPhoto(); }}
            aria-label="Next photo"
          >›</button>

          <div className="lc-lightbox-counter">
            {lightboxIndex + 1} / {photos.length}
          </div>
        </div>
      )}
    </section>
  );
}
