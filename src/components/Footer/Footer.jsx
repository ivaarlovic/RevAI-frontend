import { Link } from "react-router-dom";
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
              <Link to="/home">Početna</Link>
              <Link to="/garage">Garaža</Link>
              <Link to="/search">Pretraga</Link>
            </div>

            <div className="links-column">
              <h4>RevAI</h4>
              <Link to="/recommendation">Pronađi auto</Link>
              <Link to="/about">O aplikaciji</Link>
              <Link to="/contact">Kontakt</Link>
            </div>

            <div className="links-column">
              <h4>Pravno</h4>
              <Link to="/terms">Uvjeti korištenja</Link>
              <Link to="/privacy">Politika privatnosti</Link>
            </div>
          </div>
        </div>

        {/* Donji dio */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            <span>© 2026 RevAI • Sva prava pridržana.</span>
            <span>Izrađeno u sklopu diplomskog rada.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
