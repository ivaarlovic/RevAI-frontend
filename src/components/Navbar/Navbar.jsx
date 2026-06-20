import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.scss";
import { IoCarSportOutline } from "react-icons/io5";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="logo">
          <IoCarSportOutline className="logo-icon" />
          <span className="rev">REV</span>
          <span className="ai">AI</span>
        </div>

        {/* Navigacija */}
        <ul className="nav-links">
          <li>
            <NavLink to="/home" end>
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink to="/garage">GARAŽA</NavLink>
          </li>
          <li>
            <NavLink to="/">PRONAĐI AUTO</NavLink>
          </li>
          <li>
            <NavLink to="/contact">KONTAKT</NavLink>
          </li>
        </ul>

        {/* Prijava dugme */}
        <button className="login-btn">Prijava</button>
      </div>
    </nav>
  );
};

export default Navbar;
