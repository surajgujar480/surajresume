import React, { useEffect, useRef, useState } from "react";
import "./About.css";
import aboutImg from "../../assets/aboutpol.jpg";

const EXPERIENCES = [
  { id: 1, emoji: '⚛️', tag: 'Internship React ', company: 'Makryto Innovation Solution', location: 'Amravati, MH  |Feb 2022 – May 2022', current: false },
  { id: 2, emoji: '🌐', tag: 'Web Developer', company: 'NISA Industrial Services Pvt Ltd.', location: 'Pune | Feb 2025 – Nov 2025', current: false },
  { id: 3, emoji: '👨‍💻', tag: 'MERN Stack Developer', company: 'CyberTrident Solution Pvt Ltd.', location: 'Pune | Jan 2026  Present', current: true }
];

export default function About() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate cards
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % EXPERIENCES.length);
    }, 4000); // Increased time for readability
    return () => clearInterval(interval);
  }, []);

  // Particle Canvas Logic
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;
    let layers = [];

    const initCanvas = () => {
      const { width, height } = containerRef.current.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      
      const createLayer = (count, size, speed, opacity) => 
        Array.from({ length: count }, () => ({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * size + 0.5,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          opacity
        }));

      layers = [
        createLayer(30, 1.2, 0.2, 0.2),
        createLayer(20, 2, 0.4, 0.4),
        createLayer(10, 3, 0.6, 0.6)
      ];
    };

    const animate = () => {
      const { width, height } = containerRef.current.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);

      layers.forEach(layer => {
        layer.forEach(dot => {
          dot.x += dot.vx;
          dot.y += dot.vy;
          if (dot.x < 0 || dot.x > width) dot.vx *= -1;
          if (dot.y < 0 || dot.y > height) dot.vy *= -1;

          ctx.beginPath();
          ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(97, 219, 251, ${dot.opacity})`;
          ctx.fill();
        });
      });
      animationId = requestAnimationFrame(animate);
    };

    initCanvas();
    animate();
    window.addEventListener("resize", initCanvas);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", initCanvas);
    };
  }, []);

  return (
    <section id="about" className="about-section" ref={containerRef}>
      <canvas ref={canvasRef} className="about-canvas" />
      
      <div className="about-container">
        <div className="about-image-wrapper">
          <img src={aboutImg} alt="Suraj Gujar" className="about-img" />
          <div className="image-blob"></div>
        </div>

        <div className="about-content">
          <h2 className="about-title">About Me</h2>
          <p className="about-description">
            I am a <strong>Full-Stack Developer</strong> based in Pune, specialized in crafting high-performance web applications using the <strong>MERN</strong> stack. I bridge the gap between complex backend logic and intuitive frontend design.
          </p>

          <div className="exp-carousel">
            {EXPERIENCES.map((exp, index) => (
              <div
                key={exp.id}
                className={`exp-card ${index === currentIndex ? "active" : "inactive"} ${exp.current ? "current-job" : ""}`}
              >
                <div className="exp-header">
                  <span className="exp-emoji">{exp.emoji}</span>
                  <span className="exp-tag">
                    {exp.current && <span className="pulse-dot"></span>}
                    {exp.tag}
                  </span>
                </div>
                <h3 className="exp-company">{exp.company}</h3>
                <p className="exp-location">{exp.location}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}