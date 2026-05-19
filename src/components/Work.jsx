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

// 110 canonical source photos — curated order from commit f42f227.
// work-118..213 are all duplicates of work-01..117; excluded here.
const SOURCE_SEQ = [
    2,  1,  3, 16,  4, 20,  6, 18,  7, 21,
   25,  8, 30, 26, 29, 27, 33, 28, 32, 31,
   24, 23, 22,  9, 36, 34, 37, 35, 38, 39,
   51, 40, 10, 11, 52, 41, 42, 43, 44, 46,
   45, 48, 53, 47, 49, 50, 54, 78, 77, 76,
   75, 74, 73, 72, 71, 70, 69, 68, 67, 66,
   65, 64, 63, 62, 61, 60, 59, 58, 57, 56,
   55, 80, 79, 81, 82, 84, 83, 85, 86, 88,
   87, 89, 90, 91, 95, 92, 93, 94, 96, 97,
   98, 100, 101,  99, 102, 103, 105, 104, 106, 108,
  107, 112, 109, 113, 111, 110, 115, 114, 116, 117,
];

const sourcePhotos = SOURCE_SEQ.map((n) => ({
  src: `${BASE}img/source/work-${String(n).padStart(2, '0')}.webp`,
  alt: `Leather Clinic project photo ${n}`,
}));

// Total: 124 photos (14 client + 110 source)
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
            Every job done on-site in Myrtle Beach, SC and surrounding areas.
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
