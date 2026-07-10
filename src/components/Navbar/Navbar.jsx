import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "./Navbar.scss";
import { IoCarSportOutline } from "react-icons/io5";
import { userStore } from "../../stores/UserStore";
import { observer } from "mobx-react-lite";
const Navbar = observer(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <NavLink to="/recommendation">PRONAĐI AUTO</NavLink>
          </li>
          <li>
            <NavLink to="/contact">KONTAKT</NavLink>
          </li>
          <li>
            <NavLink to="/search">PRETRAŽI</NavLink>
          </li>
        </ul>

        {userStore.isAuthenticated ? (
          <div
            className="user-profile"
            onMouseEnter={() => setIsMenuOpen(true)}
            onMouseLeave={() => setIsMenuOpen(false)}
          >
            <div className="user-pill">
              <span className="user-name">{userStore.user.username}</span>
            </div>

            {isMenuOpen && (
              <div className="dropdown-menu">
                <Link to="/profile" className="menu-item">
                  👤 Moj profil
                </Link>
                <Link to="/settings" className="menu-item">
                  ⚙️ Postavke
                </Link>
                <button
                  onClick={() => userStore.logout()}
                  className="menu-item logout-btn"
                >
                  ⬅️ Odjava
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="login-btn">
            PRIJAVA
          </Link>
        )}
      </div>
    </nav>
  );
});

export default Navbar;
