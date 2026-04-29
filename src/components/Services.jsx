const base = import.meta.env.BASE_URL;

const services = [
  {
    title: 'Auto Interior Color Restoration',
    text: 'We recolor and restore worn car interiors — seats, armrests, and more. Fixing fading, scuffs, and scratches.',
    img: `${base}img/svc-car.webp`,
    imgAlt: 'Before and after car interior leather color restoration',
  },
  {
    title: 'Leather Couch Recoloring',
    text: 'We recolor and restore worn leather couches. Fixing fading, scratches, and worn areas.',
    img: `${base}img/svc-couch.webp`,
    imgAlt: 'Before and after leather couch recoloring',
  },
  {
    title: 'Cushion Refilling',
    text: 'We refill cushions for sofas and chairs to improve comfort, shape, and support.',
    img: `${base}img/source/work-03.webp`,
    imgAlt: 'Leather cushion and upholstery repair detail',
  },
  {
    title: 'Stitching & Reupholstery',
    text: 'We repair stitching and can reupholster cushions and dining chairs with new material if needed.',
    img: `${base}img/source/work-06.webp`,
    imgAlt: 'Stitching and leather upholstery repair project',
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
              <img
                className="service-card__img"
                src={service.img}
                alt={service.imgAlt}
                loading="lazy"
              />

              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
