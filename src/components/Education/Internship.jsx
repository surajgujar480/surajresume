import React, { useEffect, useRef } from "react";
import "./Internship.css";

export default function Internship() {
  const canvasRef = useRef(null);

  const internship = {
    company: "Makryto Innovation Private Limited.",
    location: "Amravati, MH",
    role: "Web Development Intern",
    date: "Feb 2022 – May 2022",
    description: "Developed web applications and core Full Stack modules focusing on responsive UI and backend integration.",
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Data stream lines - Initialized once
    const lines = Array.from({ length: 20 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      speed: Math.random() * 1.5 + 0.5,
      length: Math.random() * 80 + 40,
      opacity: Math.random() * 0.3 + 0.1
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      lines.forEach(line => {
        // Gradient for the individual line to make it look like a "comet"
        const lineGrad = ctx.createLinearGradient(0, line.y, 0, line.y + line.length);
        lineGrad.addColorStop(0, `rgba(97, 219, 251, 0)`);
        lineGrad.addColorStop(1, `rgba(97, 219, 251, ${line.opacity})`);

        ctx.strokeStyle = lineGrad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(line.x, line.y + line.length);
        ctx.stroke();

        line.y += line.speed;
        
        // Reset line when it goes off screen
        if (line.y > canvas.height) {
          line.y = -line.length;
          line.x = Math.random() * canvas.width;
        }
      });
      animationFrameId = requestAnimationFrame(draw);
    };

    handleResize();
    draw();
    window.addEventListener("resize", handleResize);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="intern-section" id="experience">
      {/* Background Data Stream */}
      <canvas ref={canvasRef} className="intern-canvas"></canvas>
      
      <div className="intern-container">
        {/* Using the standard 'title' class for your signature gradient */}
        <h2 className="title">Intern Experience</h2>
        
        <div className="intern-card">
          <div className="intern-glass-glow"></div>
          
          <header className="intern-header">
            <div className="intern-brand">
              <h3 className="company-name">{internship.company}</h3>
              <span className="intern-loc">{internship.location}</span>
            </div>
            <div className="intern-date-badge">{internship.date}</div>
          </header>

          <div className="intern-content">
            <div className="intern-role-line">
              <span className="role-text">{internship.role}</span>
              <span className="intern-verify">Verified ✓</span>
            </div>
            
            <p className="intern-desc">{internship.description}</p>
            
            <div className="intern-tags">
              <span className="tag">Full Stack </span>
              <span className="tag">React</span>
              <span className="tag">Modules</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}