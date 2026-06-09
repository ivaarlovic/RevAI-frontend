import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <span className="rev">REV</span>
        <span className="ai">AI</span>
      </div>
      <ul className="nav-links">
        <li>
          <NavLink to="/home">HOME</NavLink>
        </li>
        <li>
          <NavLink to="/garage">GARAŽA</NavLink>
        </li>
        <li>
          <NavLink to="/contact">KONTAKT</NavLink>
        </li>
        <li>
          <NavLink to="/about">O NAMA</NavLink>
        </li>
      </ul>
      <button className="login-btn">Prijava</button>
    </nav>
  );
};

export default Navbar;
