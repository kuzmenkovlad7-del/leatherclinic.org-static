import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <div className="footer__brand">
          <p className="footer__logo">Leather Clinic</p>
          <p className="footer__tagline">Myrtle Beach, SC — Mobile Service</p>
        </div>

        <div className="footer__cols">
          <div className="footer__col">
            <p className="footer__heading">Contact</p>
            <a href="tel:+18438558272" className="footer__link">+1 843-855-8272</a>
            <a href="mailto:info@leatherclinic.org" className="footer__link">info@leatherclinic.org</a>
          </div>

          <div className="footer__col">
            <p className="footer__heading">Address</p>
            <p className="footer__text">Myrtle Beach, SC 29577</p>
            <p className="footer__text">United States</p>
          </div>

          <div className="footer__col">
            <p className="footer__heading">Hours</p>
            <p className="footer__text">Mon – Fri: 8:00 AM – 7:00 PM</p>
            <p className="footer__text">Saturday: 9:00 AM – 5:00 PM</p>
          </div>
        </div>
      </div>

      <div className="footer__bottom wrap">
        <p>© {new Date().getFullYear()} Leather Clinic LLC. All rights reserved.</p>
        <p>Serving Myrtle Beach, SC and surrounding areas.</p>
      </div>
    </footer>
  );
}
