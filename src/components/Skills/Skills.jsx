import React, { useEffect, useRef } from "react";
import './Skills.css';

export default function Skills() {
  const canvasRef = useRef(null);
  
  const skills = [
    { name: "React JS", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Node.js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "MongoDB", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "Express", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
    { name: "JavaScript", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "Java", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    { name: "Tailwind", img: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" },
    { name: "Bootstrap", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-plain.svg" },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const hexParticles = Array.from({ length: 12 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 30 + 20,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.4,
      rotation: Math.random() * Math.PI,
      spin: (Math.random() - 0.5) * 0.005
    }));

    const drawHexagon = (x, y, size, rotation) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = rotation + (Math.PI / 3) * i;
        ctx.lineTo(x + size * Math.cos(angle), y + size * Math.sin(angle));
      }
      ctx.closePath();
      ctx.strokeStyle = "rgba(97, 219, 251, 0.12)";
      ctx.lineWidth = 1.5;
      ctx.lineJoin = "round";
      ctx.stroke();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      hexParticles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.spin;

        if (p.x < -60) p.x = canvas.width + 60;
        if (p.x > canvas.width + 60) p.x = -60;
        if (p.y < -60) p.y = canvas.height + 60;
        if (p.y > canvas.height + 60) p.y = -60;

        drawHexagon(p.x, p.y, p.size, p.rotation);
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    handleResize();
    animate();
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    // ID ADDED HERE for Navbar smooth-scroll to work
    <section id="skills" className="skills-section">
      <canvas ref={canvasRef} className="skills-canvas"></canvas>

      <div className="skills-container">
        <header className="skills-header">
          <h2 className="title">Technical Skills</h2>
          <p className="subtitle">Tools and technologies I use to build robust web applications.</p>
        </header>

        <div className="honeycomb-grid">
          {skills.map((skill, index) => (
            <div 
              key={index} 
              className="hex-wrapper" 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="skill-hex-card">
                <div className="hex-inner">
                  <img src={skill.img} alt={skill.name} className="skill-icon" />
                  <span className="skill-name">{skill.name}</span>
                </div>
                <div className="hex-glow"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}