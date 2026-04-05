import React, { useEffect, useRef } from "react";
import "./Courses.css";

const courses = [
  { name: "Data Structures in JAVA", category: "Fundamentals", link: "https://certificate.codingninjas.com/view/c482a4359ece4315" },
  { name: "Operating Systems", category: "Fundamentals", link: "https://certificate.codingninjas.com/view/1bf62baf09024dd2" },
  { name: "System Design", category: "Advanced", link: "https://certificate.codingninjas.com/view/947fd60102c61550" },
  { name: "Frontend Development", category: "Full Stack", link: "https://certificate.codingninjas.com/view/c079dd054b56294e" },
  { name: "React Development", category: "Full Stack", link: "https://certificate.codingninjas.com/view/13fe15853c260a1b" },
  { name: "Backend with Node.js", category: "Full Stack", link: "https://certificate.codingninjas.com/view/1b12923351c68d26" },
  { name: "Generative AI", category: "Emerging Tech", link: "https://certificate.codingninjas.com/view/8820d42d0df84565" }
];

export default function Courses() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Glow spots initialized once
    const dots = Array.from({ length: 3 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 200 + 150,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // 1. Grid lines (Blueprint style)
      ctx.strokeStyle = "rgba(97, 219, 251, 0.04)";
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 60) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
      }
      for (let i = 0; i < canvas.height; i += 60) {
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke();
      }

      // 2. Floating Glows
      dots.forEach(dot => {
        const gradient = ctx.createRadialGradient(dot.x, dot.y, 0, dot.x, dot.y, dot.radius);
        gradient.addColorStop(0, "rgba(97, 219, 251, 0.1)");
        gradient.addColorStop(1, "transparent");
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fill();

        dot.x += dot.vx;
        dot.y += dot.vy;

        if (dot.x < 0 || dot.x > canvas.width) dot.vx *= -1;
        if (dot.y < 0 || dot.y > canvas.height) dot.vy *= -1;
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
    <section id="courses" className="courses-section">
      <canvas ref={canvasRef} className="courses-canvas"></canvas>
      
      <div className="inner-container">
        <header className="courses-header">
          <h2 className="title">Certifications</h2>
          <p className="subtitle">Verified technical credentials from industry-leading platforms.</p>
        </header>

        <div className="course-grid">
          {courses.map((course, index) => (
            <div 
              className="course-glass-card" 
              key={index}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="card-top">
                <span className="category-tag">{course.category}</span>
                <div className="status-dot"></div>
              </div>
              
              <div className="card-body">
                <h4>{course.name}</h4>
                <div className="provider">Coding Ninjas Certified</div>
              </div>

              <div className="card-footer">
                <a 
                  href={course.link} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="cert-link"
                >
                  Verify Certificate
                  <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M7 17L17 7M17 7H7M17 7V17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}