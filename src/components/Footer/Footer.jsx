import React from "react";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <a href="/contact">Kontakt</a>
          <a href="/about">O nama</a>
          <a href="/terms">Uvjeti korištenja</a>
        </div>
        <div className="footer-copyright">© 2026 RevAI Project</div>
      </div>
    </footer>
  );
};

export default Footer;
