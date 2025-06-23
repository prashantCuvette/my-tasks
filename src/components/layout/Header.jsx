import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import styles from "./Header.module.css";

const Header = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <NavLink to="/dashboard">My-Project</NavLink>
      </div>

      {/* Desktop Navigation */}
      <nav className={styles.navLinks}>
        <NavLink
          to="/tasks"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          Tasks
        </NavLink>
        <NavLink
          to="/notes"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          Notes
        </NavLink>
      </nav>

      {user && (
        <div className={styles.userInfo}>
          <span className={styles.userEmail}>{user.email}</span>
          <button onClick={logout} className={styles.logoutButton}>
            Logout
          </button>
        </div>
      )}

      {/* Hamburger Button */}
      <button
        className={styles.hamburger}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? "✖️" : "☰"}
      </button>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className={styles.mobileNav}>
          <NavLink
            to="/tasks"
            className={({ isActive }) => (isActive ? styles.active : "")}
            onClick={closeMenu}
          >
            Tasks
          </NavLink>
          <NavLink
            to="/notes"
            className={({ isActive }) => (isActive ? styles.active : "")}
            onClick={closeMenu}
          >
            Notes
          </NavLink>
          {user && (
            <div className={styles.mobileUserInfo}>
              <span className={styles.userEmail}>{user.email}</span>
              <button
                onClick={() => {
                  logout();
                  closeMenu();
                }}
                className={styles.logoutButton}
              >
                Logout
              </button>
            </div>
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;
