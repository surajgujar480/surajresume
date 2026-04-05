import React, { useState, useEffect, useRef } from "react";
import "./Footer.css";

export default function Footer() {
  const [showToast, setShowToast] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSending, setIsSending] = useState(false); // State for the loader
  
  const [formData, setFormData] = useState({ 
    name: "", 
    number: "", 
    email: "", 
    message: "" 
  });
  
  const canvasRef = useRef(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("ya.ssg48@rediffimail.com");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true); // Start loading

    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw4TTwSY4wW5BDRehh1MOAv7Z_7seOPbl6cYLFAt8VoT-W85NMDql2pxh5aVv24M5CR/exec";

    try {
      const apiData = new URLSearchParams();
      apiData.append("name", formData.name);
      apiData.append("number", formData.number);
      apiData.append("email", formData.email);
      apiData.append("message", formData.message);

      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", 
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: apiData.toString(), 
      });

      alert("🤩🤩 Your message has been sent to Suraj's Google Sheet. Thank you so much! I will contact you shortly. 🥰🥰");
      setFormData({ name: "", number: "", email: "", message: "" });
      setIsChatOpen(false);
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Oops! Something went wrong.");
    } finally {
      setIsSending(false); // Stop loading
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let stars = [];

    const initCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = 300;
      stars = Array.from({ length: 50 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        opacity: Math.random(),
        speed: Math.random() * 0.02,
      }));
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        s.opacity += s.speed;
        if (s.opacity > 1 || s.opacity < 0) s.speed *= -1;
        ctx.fillStyle = `rgba(97, 219, 251, ${s.opacity})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(animate);
    };

    const toggleVisibility = () => {
      if (window.scrollY > 300) setIsVisible(true);
      else setIsVisible(false);
    };

    initCanvas();
    animate();
    window.addEventListener("resize", initCanvas);
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("resize", initCanvas);
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <footer className="footer-main" id="footer">
      <canvas ref={canvasRef} className="footer-canvas"></canvas>

      <div className="chat-bot-wrapper">
        {isChatOpen && (
          <div className="chat-window">
            <div className="chat-header">
              <span>◀️CHAT-BOAT▶️🎴🎴🎴🎴🎴</span>
              <button className="close-chat" onClick={() => setIsChatOpen(false)}>×</button>
            </div>
            <form onSubmit={handleSubmit} className="chat-form">
              <input 
                type="text" 
                placeholder="Your Name" 
                required 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
              <input 
                type="tel" 
                placeholder="Mob Number" 
                required 
                value={formData.number}
                onChange={(e) => setFormData({...formData, number: e.target.value})} 
              />
              <input 
                type="email" 
                placeholder="Your Email" 
                required 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              <textarea 
                placeholder="Please type the message?" 
                required 
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              ></textarea>
              
              {/* Updated Button with Loader */}
              <button type="submit" className="send-btn" disabled={isSending}>
                {isSending ? (
                  <div className="btn-loader-content">
                    <div className="btn-spinner"></div>
                    <span>Sending...</span>
                  </div>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>
        )}

        <div 
          className={`ai-cat-bot ${isChatOpen ? "active" : ""}`} 
          onClick={() => setIsChatOpen(!isChatOpen)}
        >
          <span className="cat-tooltip">Click me to Contact ◀️CHAT-BOAT▶️ (💯%)work!🎴</span>
          <div className="cat-ears"></div>
          <div className="cat-eyes">
            <div className="eye"></div>
            <div className="eye"></div>
          </div>
          <div className="ai-glow"></div>
        </div>
      </div>

      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <h2 className="footer-logo">Suraj Gujar</h2>
            <p className="footer-tagline">Building the future of web with MERN Stack.</p>
          </div>
          <div className="footer-socials">
            <a href="https://www.linkedin.com/in/suraj-santosh-gujar-2a8337288/" target="_blank" rel="noreferrer" className="logo-link">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" alt="LinkedIn" />
            </a>
            <a href="https://github.com/surajgujar48" target="_blank" rel="noreferrer" className="logo-link">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" style={{ filter: 'invert(1)' }} />
            </a>
            <a href="https://wa.me/7775812760" target="_blank" rel="noreferrer" className="logo-link">
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" />
            </a>
            <a href="mailto:ya.ssg48@rediffimail.com" className="logo-link">
              <img src="https://cdn-icons-png.flaticon.com/512/732/732200.png" alt="Email" />
            </a>
          </div>
        </div>

        <hr className="footer-divider" />

        <div className="footer-bottom">
          <nav className="footer-links">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <span onClick={handleCopyEmail} className="copy-trigger">Copy Email</span>
          </nav>
          <p className="copyright">
            © {new Date().getFullYear()} • Handcrafted by Suraj • <span className="status-indicator">● System Online</span>
          </p>
        </div>
      </div>

      {showToast && <div className="copy-toast">Email copied to clipboard! 🎉</div>}

      <div className={`scroll-to-top ${isVisible ? "show" : ""}`} onClick={scrollToTop}>
        <div className="arrow-icon-wrapper">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </div>
        <div className="pulse-ring"></div>
      </div>
    </footer>
  );
}