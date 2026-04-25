import React, { useRef, useEffect, useState } from "react";
import './Hero.css';
import homeImg from "../../assets/homepol.jpg";
import recapImg from "../../assets/recap.png"; 
import { 
  SiReact, 
  SiNodedotjs, 
  SiMongodb, 
  SiExpress, 
  SiJavascript, 
  SiTailwindcss, 
  SiBootstrap, 
  SiTypescript 
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

// Constants
const TECH_STACK = [
  "React JS", "Node.js", "MongoDB", "Express", 
  "JavaScript", "Java", "Tailwind", "Bootstrap", "TypeScript"
];
const ICON_MAP = {
  "React JS": <SiReact />,
  "Node.js": <SiNodedotjs />,
  "MongoDB": <SiMongodb />,
  "Express": <SiExpress />,
  "JavaScript": <SiJavascript />,
  "Java": <FaJava />,
  "Tailwind": <SiTailwindcss />,
  "Bootstrap": <SiBootstrap />,
  "TypeScript": <SiTypescript />
};

const ROLES = [
  "Suraj (Happy to say.)",
  "MERN Stack Developer.",
  "Web Developer.",
    "Problem Solver."
];

export default function Hero() {
  const cardRef = useRef(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // Typewriter States
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  // Typewriter Effect
  useEffect(() => {
    const handleTyping = () => {
      const currentRole = ROLES[index];
      if (isDeleting) {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
        setTypingSpeed(50);
      } else {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        setTypingSpeed(150);
      }

      if (!isDeleting && displayText === currentRole) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % ROLES.length);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, index, typingSpeed]);

  // Canvas Animation + 3D Card Tilt
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const container = containerRef.current;
    const card = cardRef.current;

    let width, height, rows, cols;
    const hexSize = 22;
    const mouse = { x: -1000, y: -1000 };

    const init = () => {
      if (!container) return;
      width = canvas.width = container.offsetWidth;
      height = canvas.height = container.offsetHeight;
      cols = Math.ceil(width / (hexSize * 1.5)) + 1;
      rows = Math.ceil(height / (hexSize * Math.sqrt(3))) + 1;
    };

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;

      const cardRect = card.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2;
      const cardCenterY = cardRect.top + cardRect.height / 2;
      const rotateX = (e.clientY - cardCenterY) / 15;
      const rotateY = (cardCenterX - e.clientX) / 15;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = `rotateX(0deg) rotateY(0deg)`;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const drawHex = (x, y, size, alpha) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        ctx.lineTo(x + size * Math.cos(angle), y + size * Math.sin(angle));
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(97, 219, 251, ${alpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * hexSize * 1.5;
          const y = r * hexSize * Math.sqrt(3) + (c % 2 === 0 ? 0 : (hexSize * Math.sqrt(3)) / 2);
          const dist = Math.hypot(mouse.x - x, mouse.y - y);
          let alpha = 0.04;
          if (dist < 150) alpha = 1 - (dist / 150);
          drawHex(x, y, hexSize - 2, alpha);
        }
      }
      requestAnimationFrame(animate);
    };

    init();
    animate();
    window.addEventListener('resize', init);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', init);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const createConfetti = () => {
    const card = cardRef.current;
    if (!card) return;

    card.classList.add("show-tooltip");
    const colors = ["#61DBFB", "#FFCA28", "#FF5C5C", "#8BC34A", "#FF4081"];

    for (let i = 0; i < 30; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti-piece";
      confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.setProperty("--x", `${Math.random() * 300 - 150}px`);
      confetti.style.setProperty("--y", `${Math.random() * -300}px`);
      confetti.style.setProperty("--rotate", `${Math.random() * 360}deg`);
      card.appendChild(confetti);
      setTimeout(() => confetti.remove(), 1500);
    }
    setTimeout(() => card.classList.remove("show-tooltip"), 1500);
  };

  return (
    <section className="hero" id="home">
      <div className="hero-bg-glow"></div>

      <div className="hero-content">
        <div className="badge-wrapper">
          <span className="status-badge">
            <span className="dot-blink">•</span> Available for Projects
          </span>
        </div>

        <h1 className="hero-title">Suraj Santosh Gujar</h1>

        <h3 className="typewriter-container">
          I am a <span className="highlight">{displayText}</span>
          <span className="cursor">|</span>
        </h3>

        <p className="hero-desc">
          Aspiring <strong>MERN Stack</strong> Developer. Building seamless, 
          user-centric web applications with modern tech.
        </p>

      <div className="hero-icons-container">
  {TECH_STACK.slice(0, 6).map((tech) => (
    <div key={tech} className="icon-wrapper">
      <span className="tech-icon">{ICON_MAP[tech]}</span>
      <span className="tech-label">{tech}</span>
    </div>
  ))}
</div>

        <div className="hero-btns">
          <a href="/Suraj_Gujar_Resume.pdf" download className="btn-hero btn-main">
            Download CV
          </a>
          <a href="#projects" className="btn-hero btn-outline">
            My Work
          </a>
        </div>
      </div>

      <div className="hero-img-container" ref={containerRef}>
        <canvas id="hexCanvas" ref={canvasRef}></canvas>

        <a 
          href="https://certificate.codingninjas.com/coding_recap/5853834a4462a4b4" 
          target="_blank" 
          rel="noopener noreferrer"
          className="coding-recap-button"
        >
          <img src={recapImg} alt="Coding Recap" />
          <span>Coding Recap 2023 🎉</span>
        </a>

        <div
          className="card-3d"
          ref={cardRef}
          onMouseEnter={createConfetti}
        >
          <img src={homeImg} alt="Suraj Gujar" />
          <div className="card-tooltip">🎉 Happy !</div>

          <a href="#about" className="about-btn-wrapper">
            <button className="btn-hero btn-about">
              About Me
              <span className="tooltip">Explore my profile</span>
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}

// Exporting as a named function since Hero is the Default export
export function Skills() {
  return (
    <section id="skills" className="skills-section">
      <div className="skills-container">
        <header className="skills-header">
          <h2 className="title">Technical Skills</h2>
          <p className="subtitle">My current stack and tools.</p>
        </header>

        <div className="skills-grid">
          {TECH_STACK.map((tech, index) => (
            <span 
              key={tech} 
              className="skill-badge"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}