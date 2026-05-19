const base = import.meta.env.BASE_URL;

const services = [
  {
    title: 'Auto Interior Color Restoration',
    text: 'We recolor and restore worn car interiors — seats, armrests, and more. Fixing fading, scuffs, and scratches.',
    img: `${base}img/client/lc-client-extra-07.jpg`,
    img2: `${base}img/client/lc-client-extra-08.jpg`,
    imgAlt: 'Car interior seat before color restoration',
    img2Alt: 'Car interior seat after color restoration',
  },
  {
    title: 'Leather Couch Recoloring',
    text: 'We recolor and restore worn leather couches. Fixing fading, scratches, and worn areas.',
    img: `${base}img/client/lc-client-extra-05.jpg`,
    img2: `${base}img/client/lc-client-extra-06.jpg`,
    imgAlt: 'White sectional couch before recoloring',
    img2Alt: 'White sectional couch after recoloring',
  },
  {
    title: 'Cushion Refilling',
    text: 'We refill cushions for sofas and chairs to improve comfort, shape, and support.',
    img: `${base}img/client/lc-client-extra-11.jpg`,
    img2: `${base}img/client/lc-client-extra-12.jpg`,
    imgAlt: 'Recliner before cushion refilling',
    img2Alt: 'Recliner after cushion refilling',
  },
  {
    title: 'Stitching & Reupholstery',
    text: 'We repair stitching and can reupholster cushions and dining chairs with new material if needed.',
    img: `${base}img/client/lc-client-extra-13.jpg`,
    img2: `${base}img/client/lc-client-extra-14.jpg`,
    imgAlt: 'Dining chair before reupholstery',
    img2Alt: 'Dining chair after reupholstery',
  },
];

export default function Services() {
  return (
    <section className="section section--dark" id="services">
      <div className="container">
        <p className="eyebrow">What We Do</p>
        <h2>Our Services</h2>

        <div className="services-grid">
          {services.map((service) => (
            <article className="service-card" key={service.title}>
              {service.img2 ? (
                <div className="service-card__img-pair">
                  <img src={service.img} alt={service.imgAlt} loading="lazy" />
                  <img src={service.img2} alt={service.img2Alt} loading="lazy" />
                </div>
              ) : (
                <img
                  className="service-card__img"
                  src={service.img}
                  alt={service.imgAlt}
                  loading="lazy"
                />
              )}

              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
