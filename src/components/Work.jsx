import { useEffect, useMemo, useState } from 'react';

const BASE = import.meta.env.BASE_URL;

// 14 client photos near the start, grouped by project
const clientPhotos = [
  // brown leather sofa / chair set
  { src: `${BASE}img/client/lc-client-extra-01.jpg`, alt: 'Brown leather sofa set restoration — photo 1' },
  { src: `${BASE}img/client/lc-client-extra-02.jpg`, alt: 'Brown leather sofa set restoration — photo 2' },
  { src: `${BASE}img/client/lc-client-extra-03.jpg`, alt: 'Brown leather sofa set restoration — photo 3' },
  { src: `${BASE}img/client/lc-client-extra-04.jpg`, alt: 'Brown leather chair set restoration' },
  // white sectional before/after
  { src: `${BASE}img/client/lc-client-extra-05.jpg`, alt: 'White sectional couch — before recoloring' },
  { src: `${BASE}img/client/lc-client-extra-06.jpg`, alt: 'White sectional couch — after recoloring' },
  // car interior before/after
  { src: `${BASE}img/client/lc-client-extra-07.jpg`, alt: 'Car interior seat — before color restoration' },
  { src: `${BASE}img/client/lc-client-extra-08.jpg`, alt: 'Car interior seat — after color restoration' },
  // green sofa before/after
  { src: `${BASE}img/client/lc-client-extra-09.jpg`, alt: 'Green sofa — before restoration' },
  { src: `${BASE}img/client/lc-client-extra-10.jpg`, alt: 'Green sofa — after restoration' },
  // recliner before/after
  { src: `${BASE}img/client/lc-client-extra-11.jpg`, alt: 'Recliner — before cushion refilling' },
  { src: `${BASE}img/client/lc-client-extra-12.jpg`, alt: 'Recliner — after cushion refilling' },
  // dining chair before/after
  { src: `${BASE}img/client/lc-client-extra-13.jpg`, alt: 'Dining chair — before reupholstery' },
  { src: `${BASE}img/client/lc-client-extra-14.jpg`, alt: 'Dining chair — after reupholstery' },
];

// 110 source photos (curated 47 + 63 additional = 110 total)
const PHOTO_SEQUENCE = [
  // curated 47
    1,   2,   3,   4,  20,   6,   7, 118, 123,   8,
  125, 132, 131, 120, 119,   9,  36,  37,  35,  38,
  148, 134, 149, 137, 143, 145, 150,  54, 173, 170,
  163, 162, 157, 155, 154, 152, 176, 185, 100, 102,
  103, 108, 107, 113, 111, 110, 114,
  // additional 63
    5,  10,  11,  12,  13,  14,  15,  16,  17,  18,
   19,  21,  22,  23,  24,  25,  26,  27,  28,  29,
   30,  31,  32,  33,  34,  39,  40,  41,  42,  43,
   44,  45,  46,  47,  48,  49,  50,  51,  52,  53,
   55,  56,  57,  58,  59,  60,  61,  62,  63,  64,
   65,  66,  67,  68,  69,  70,  71,  72,  73,  74,
   75,  76,  77,
];

const projectPhotos = PHOTO_SEQUENCE.map((n) => ({
  src: `${BASE}img/source/work-${String(n).padStart(2, '0')}.webp`,
  alt: `Leather Clinic project photo ${n}`,
}));

// client photos first, then source photos — total 124
const allPhotos = [...clientPhotos, ...projectPhotos];

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

  const goPrev = () => {
    setActiveIndex((current) => Math.max(0, current - visibleCount));
  };

  const goNext = () => {
    setActiveIndex((current) => Math.min(maxStart, current + visibleCount));
  };

  const openLightbox = (index) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const showPrevPhoto = () => {
    setLightboxIndex((current) => {
      if (current === null) return null;
      return current === 0 ? photos.length - 1 : current - 1;
    });
  };

  const showNextPhoto = () => {
    setLightboxIndex((current) => {
      if (current === null) return null;
      return current === photos.length - 1 ? 0 : current + 1;
    });
  };

  useEffect(() => {
    if (lightboxIndex === null) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowLeft') showPrevPhoto();
      if (event.key === 'ArrowRight') showNextPhoto();
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
          <button className="lc-lightbox-close" type="button" onClick={closeLightbox}>
            ×
          </button>

          <button
            className="lc-lightbox-arrow lc-lightbox-prev"
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showPrevPhoto();
            }}
            aria-label="Previous photo"
          >
            ‹
          </button>

          <img
            src={photos[lightboxIndex].src}
            alt={photos[lightboxIndex].alt}
            onClick={(event) => event.stopPropagation()}
          />

          <button
            className="lc-lightbox-arrow lc-lightbox-next"
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showNextPhoto();
            }}
            aria-label="Next photo"
          >
            ›
          </button>

          <div className="lc-lightbox-counter">
            {lightboxIndex + 1} / {photos.length}
          </div>
        </div>
      )}
    </section>
  );
}
