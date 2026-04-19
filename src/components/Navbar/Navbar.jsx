import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDancing, setIsDancing] = useState(false);
  const [dateTime, setDateTime] = useState(new Date());
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);
  const logoRef = useRef(null);
  
  const navigate = useNavigate();
  const location = useLocation();

  // 1. Clock & Scroll Progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(currentProgress);
    };

    const timer = setInterval(() => setDateTime(new Date()), 1000);
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 2. Parallax Logo Effect
  const handleMouseMove = (e) => {
    if (!logoRef.current || window.innerWidth < 992) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = logoRef.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) / 10;
    const y = (clientY - (top + height / 2)) / 5;
    logoRef.current.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
  };

  const resetLogo = () => {
    if (logoRef.current) logoRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
  };

  // 3. Section Observer
  useEffect(() => {
    const options = { root: null, rootMargin: "-20% 0px -70% 0px", threshold: 0 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, options);

    const sections = ["home", "about", "edu", "skills", "project"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [location]);

  const triggerDance = () => {
    if (isDancing) return;
    setIsDancing(true);
    setTimeout(() => setIsDancing(false), 2000);
  };

  const handleNavAction = (e, href) => {
    e.preventDefault();
    const targetId = href.replace("#", "");

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const elem = document.getElementById(targetId);
      if (elem) window.scrollTo({ top: elem.offsetTop - 80, behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }}></div>

      <div className="nav-container">
        <div className="logo-group" onMouseMove={handleMouseMove} onMouseLeave={resetLogo}>
          <i className="fa-brands fa-react react-spin-icon"></i>
          <h2
            ref={logoRef}
            className={`logo ${isDancing ? "dance-active" : ""}`}
            onClick={triggerDance}
          >
            suraj<span>.me</span>
            {isDancing && (
              <div className="hearts-box">
                {[...Array(12)].map((_, i) => (
                  <span 
                    key={i} 
                    className="heart" 
                    style={{ 
                      "--x": `${Math.random() * 200 - 100}px`, 
                      "--y": `${Math.random() * -150 - 50}px`,
                      "--delay": `${Math.random() * 0.4}s` 
                    }}
                  >❤️</span>
                ))}
                <span className="welcome-pop">👋</span>
              </div>
            )}
          </h2>
        </div>

        <div className={`hamburger-box ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          {[
            { name: "Home", href: "#home", id: "home", color: "theme-color-one" },
            { name: "About", href: "#about", id: "about", color: "theme-color-two" },
            { name: "Education", href: "#edu", id: "edu", color: "theme-color-three" },
            { name: "Skills", href: "#skills", id: "skills", color: "theme-color-four" },
            { name: "Projects", href: "#project", id: "project", color: "theme-color-five" }
          ].map((item, index) => (
            <li key={index} className="nav-item-wrapper">
              <div className={`light-bulb ${item.color} ${activeSection === item.id ? "active-glow" : ""}`}></div>
              <a
                href={item.href}
                className={activeSection === item.id ? "active-link" : ""}
                onClick={(e) => handleNavAction(e, item.href)}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-meta-group">
          <button className="special-game-btn" onClick={() => { navigate("/game"); setMenuOpen(false); }}>
            PLAY 🎮
          </button>

          <div className="digital-time-box">
            <span className="live-dot"></span>
            {dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </div>
        </div>
      </div>
    </nav>
  );
}