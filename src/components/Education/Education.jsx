import React, { useState, useRef, useEffect } from "react";
import "./Education.css";

export default function Education() {
  const [showTooltip, setShowTooltip] = useState(false);
  const canvasRef = useRef(null);
  
  // Logic: 7.91 out of 10 mapped to percentage
  const cgpaPercentage = (7.91 / 10) * 100;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let particles = [];
    let animationFrameId;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      // Dynamic count based on screen width
      const particleCount = Math.min(Math.floor(window.innerWidth / 20), 60);
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 2 + 1,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        // Boundary bounce
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.fillStyle = "rgba(97, 219, 251, 0.4)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Neural Network "Web" effect
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 150) {
            ctx.strokeStyle = `rgba(97, 219, 251, ${0.15 - dist/1000})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
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
    <section id="edu" className="edu-section">
      <canvas ref={canvasRef} className="edu-canvas"></canvas>

      <div className="edu-container">
        <h2 className="title">Education</h2>

        <div className="edu-card">
          <div className="edu-glass-overlay"></div>
          
          <header className="edu-header">
            <div className="edu-titles">
              <h3>Bachelor of Engineering</h3>
              <p className="sub-title">Computer Science & Engineering</p>
            </div>
            <span className="edu-badge">2020 - 2024</span>
          </header>

          <div className="cgpa-wrapper">
            <div className="cgpa-info">
              <span>Cumulative Performance (CGPA)</span>
              <strong className="cgpa-number">7.91 / 10</strong>
            </div>
            <div className="progress-track">
              <div
                className="progress-bar"
                style={{ width: `${cgpaPercentage}%` }}
              >
                <div className="progress-glow"></div>
              </div>
            </div>
          </div>

          <p className="institute-text">
            Alumni of{" "}
            <span
              className="tooltip-anchor"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              Dr. Rajendra Gode Institute Of Technology & Research
              {showTooltip && (
                <span className="edu-tooltip">
                   Visit: drgitr.com
                  <span className="tooltip-arrow"></span>
                </span>
              )}
            </span>
          </p>

          <div className="edu-footer">
            <span className="verified-tag">
              <span className="check-icon">✓</span> Degree Verified
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}