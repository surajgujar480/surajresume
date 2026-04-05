import React, { useEffect, useRef } from "react";
import "./About.css";
import aboutImg from "../../assets/aboutpol.jpg";

export default function About() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const container = containerRef.current;

    let dots = [];
    const dotCount = 40;
    const mouse = { x: -1000, y: -1000, radius: 120 };

    const init = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      dots = [];
      for (let i = 0; i < dotCount; i++) {
        dots.push(new Dot());
      }
    };

    class Dot {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = Math.random() * 3 + 1;
        // Movement speed
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
      }

      update() {
        // Constant slow drift
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around screen
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        // Mouse Interaction (Pushing dots away)
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.hypot(dx, dy);
        
        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          const directionX = dx / distance;
          const directionY = dy / distance;
          this.x -= directionX * force * 5;
          this.y -= directionY * force * 5;
        }
      }

      draw() {
        ctx.fillStyle = "rgba(97, 219, 251, 0.4)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add a small glow to some dots
        if(this.size > 3) {
            ctx.shadowBlur = 10;
            ctx.shadowColor = "#61DBFB";
            ctx.fill();
            ctx.shadowBlur = 0;
        }
      }
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach(dot => {
        dot.update();
        dot.draw();
      });
      requestAnimationFrame(animate);
    };

    init();
    animate();
    window.addEventListener("resize", init);
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", init);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section id="about" className="about-section" ref={containerRef}>
      {/* Subtle Drift Canvas */}
      <canvas ref={canvasRef} className="about-canvas"></canvas>

      <div className="about-container">
        <div className="about-image">
           <img src={aboutImg} alt="Suraj Gujar" />
        </div>

        <div className="about-content">
          <h2 className="about-title">About Me</h2>
          <p className="about-description">
            I am a passionate <strong>Full-Stack Developer</strong> from Pune, 
            specializing in the <strong>MERN stack</strong>. I build modern, responsive, and 
            user-friendly web applications with a focus on clean code and performance.
          </p>
          
          <ul className="about-info">
            <li><strong>Location:</strong> Pune, India</li>
            <li><strong>Role:</strong> Web Developer</li>
            <li><strong>Experience:</strong> CyberTrident Systems (CTS)</li>
          </ul>

          <div className="about-action">
            <a href="https://www.cybertrident.in/" target="_blank" rel="noreferrer" className="btn-primary">
              Visit Official Site
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}