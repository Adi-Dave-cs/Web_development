import React, { useState } from "react";
import styles from "./CircularHamburgerMenu.module.css";
import { NavLink } from "react-router-dom";

const CircularHamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.menuContainer}>
      <button
        className={`${styles.hamburger} ${isOpen ? styles.open : ""}`}
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      {isOpen && (
        <nav className={styles.menu}>
          <ul onClick={toggleMenu}>
            <li>
              <NavLink to="/app"> Home </NavLink>
            </li>
            <li>
              <NavLink to="/app/product"> Products </NavLink>
            </li>
            <li>
              <NavLink to="/app/contact"> Contact </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default CircularHamburgerMenu;
