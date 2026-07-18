import { observer } from "mobx-react-lite";
import {
  IoCarSportOutline,
  IoCloseOutline,
  IoMenuOutline,
} from "react-icons/io5";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { userStore } from "../../stores/UserStore";
import "./Navbar.scss";

const Navbar = observer(() => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();

  const closeMenus = () => {
    setIsProfileOpen(false);
    setIsMobileOpen(false);
  };

  const handleLogout = () => {
    userStore.logout();
    closeMenus();
    navigate("/login", { replace: true });
  };

  const navItems = [
    ["/home", "HOME"],
    ["/garage", "GARAŽA"],
    ["/recommendation", "PRONAĐI AUTO"],
    ["/contact", "KONTAKT"],
    ["/search", "PRETRAŽI"],
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link
          to={userStore.isAuthenticated ? "/home" : "/login"}
          className="logo"
          onClick={closeMenus}
        >
          <IoCarSportOutline className="logo-icon" />
          <span className="rev">REV</span>
          <span className="ai">AI</span>
        </Link>

        <button
          type="button"
          className="mobile-menu-button"
          onClick={() => setIsMobileOpen((value) => !value)}
          aria-label="Otvori navigaciju"
          aria-expanded={isMobileOpen}
        >
          {isMobileOpen ? <IoCloseOutline /> : <IoMenuOutline />}
        </button>

        <div className={`navbar-content ${isMobileOpen ? "is-open" : ""}`}>
          <ul className="nav-links">
            {navItems.map(([path, label]) => (
              <li key={path}>
                <NavLink to={path} onClick={closeMenus}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {userStore.isAuthenticated ? (
            <div className="user-profile">
              <button
                type="button"
                className="user-pill"
                onClick={() => setIsProfileOpen((value) => !value)}
                aria-expanded={isProfileOpen}
              >
                {userStore.user?.username || "Korisnik"}
              </button>

              {isProfileOpen && (
                <div className="dropdown-menu">
                  <Link
                    to="/profile"
                    className="menu-item"
                    onClick={closeMenus}
                  >
                    👤 Moj profil
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="menu-item logout-btn"
                  >
                    ⬅️ Odjava
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="login-btn" onClick={closeMenus}>
              PRIJAVA
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
});

export default Navbar;
