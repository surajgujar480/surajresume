import React, { useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDancing, setIsDancing] = useState(false);

  const navItems = [
    { name: "Home", href: "#home", color: "theme-color-one" },
    { name: "About", href: "#about", color: "theme-color-two" },
    { name: "Education", href: "#edu", color: "theme-color-three" },
    { name: "Skills", href: "#skills", color: "theme-color-four" },
    { name: "Projects", href: "#project", color: "theme-color-five" },
  ];

  const handleLogoClick = () => {
    setIsDancing(true);
    setTimeout(() => setIsDancing(false), 1000);
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const navbarOffset = 80; // adjust this if your navbar is taller
      const topPosition =
        target.getBoundingClientRect().top + window.pageYOffset - navbarOffset;
      window.scrollTo({ top: topPosition, behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <h2
          className={`logo ${isDancing ? "dance-active" : ""}`}
          onClick={handleLogoClick}
        >
          suraj<span>.me</span>

          {isDancing && <span className="welcome-symbol">👋</span>}

          {isDancing && (
            <div className="hearts-container">
              {[...Array(10)].map((_, i) => (
                <span key={i} className={`heart heart-${i}`}>❤️</span>
              ))}
            </div>
          )}
        </h2>

        <i
          className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"}`}
          id="hum"
          onClick={() => setMenuOpen(!menuOpen)}
        ></i>

        <ul className={menuOpen ? "nav-links active" : "nav-links"}>
          {navItems.map((item, index) => (
            <li key={index} className="nav-item-wrapper">
              <div className={`light-bulb ${item.color}`}></div>
              <a href={item.href} onClick={(e) => handleNavClick(e, item.href)}>
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}