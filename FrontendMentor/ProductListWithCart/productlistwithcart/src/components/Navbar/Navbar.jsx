import { NavLink, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";
import CircularHamburgerMenu from "./CircularHamburgerMenu";

export default function Navbar() {
  const location = useLocation();
  return (
    <>
      <div className={`${styles.navbar}`}>
        <div className={`${styles.listStyle}`}>
          <NavLink to="/app" style={{ textDecoration: "none" }}>
            <div
              className={`${styles.listItem} ${
                location.pathname === "/app" ? styles.active : ""
              }`}
            >
              <p>Home</p>
            </div>
          </NavLink>
          <NavLink to="/app/product" style={{ textDecoration: "none" }}>
            <div
              className={`${styles.listItem} ${
                location.pathname === "/app/product" ? styles.active : ""
              }`}
            >
              <p>Products</p>
            </div>
          </NavLink>
          <NavLink to="/app/contact" style={{ textDecoration: "none" }}>
            <div
              className={`${styles.listItem} ${
                location.pathname === "/app/contact" ? styles.active : ""
              }`}
            >
              <p>Contact</p>
            </div>
          </NavLink>
        </div>
      </div>
      <div className={`${styles.hamburger}`}>
        <CircularHamburgerMenu />
      </div>
    </>
  );
}
