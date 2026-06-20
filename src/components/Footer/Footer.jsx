import React from "react";
import { IoCarSportOutline } from "react-icons/io5";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-main">
          {/* Logo + opis */}
          <div className="footer-brand">
            <div className="logo">
              <IoCarSportOutline className="car-icon" />
              <span>REVAI</span>
            </div>
            <p>Pametni AI koji ti pronalazi automobil savršen za tvoj stil.</p>
          </div>

          {/* Linkovi */}
          <div className="footer-links">
            <div className="links-column">
              <h4>Navigacija</h4>
              <a href="/">Početna</a>
              <a href="/garaza">Garaža</a>
              <a href="/kategorije">Kategorije</a>
            </div>

            <div className="links-column">
              <h4>Kompanija</h4>
              <a href="/about">O nama</a>
              <a href="/contact">Kontakt</a>
              <a href="/blog">Blog</a>
            </div>

            <div className="links-column">
              <h4>Pravno</h4>
              <a href="/terms">Uvjeti korištenja</a>
              <a href="/privacy">Politika privatnosti</a>
            </div>
          </div>
        </div>

        {/* Donji dio */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            © 2026 RevAI • Sva prava pridržana.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
