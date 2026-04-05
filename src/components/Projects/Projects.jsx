import React from "react";
import "./Projects.css";

import surajmusicImg from "../../assets/surajmusic.gif"; 
import shopImg from "../../assets/shop.png";
import attImg from "../../assets/ATT.png";

const projects = [
  {
    title: "Music Player",
    tech: "HTML, CSS, JS",
    img: surajmusicImg,
    url: "https://surajgujar48.github.io/Suraj-Music-Player/",
    description: "A sleek, responsive web-based music player with custom controls and playlist management.",
    isLive: true
  },
  {
    title: "Attendance App",
    tech: "HTML, JavaScript",
    img: attImg,
    url: "https://surajgujar48.github.io/Atteendance-Book/",
    description: "Digital record-keeping system for tracking daily attendance with local storage integration.",
    isLive: true
  },
  {
    title: "E-Commerce Store",
    tech: "MERN Stack, Redux",
    img: shopImg,
    url: "#", 
    description: "Full-stack digital storefront with advanced product filtering, search, and responsive UI.",
    isLive: false 
  }
];

export default function Projects() {
  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <header className="projects-header">
          <h2 className="title">Featured Projects</h2>
          <p className="subtitle">Selected works showcasing full-stack expertise and clean UI/UX.</p>
        </header>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <article 
              className="project-card" 
              key={index}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="card-image-wrapper">
                <img
                  src={project.img}
                  alt={project.title}
                  className="card-img"
                  onError={(e) => { 
                    e.target.src = "https://via.placeholder.com/400x250/00000a/61DBFB?text=Project+Preview"; 
                  }}
                />
                <div className="image-overlay"></div>
              </div>

              <div className="card-content">
                <div className="card-title-row">
                  <h3>{project.title}</h3>
                  <div className={`status-indicator ${project.isLive ? 'live' : 'dev'}`}>
                    <span className="pulse-dot"></span>
                    {project.isLive ? 'Live' : 'In Dev'}
                  </div>
                </div>
                
                <p className="card-desc">{project.description}</p>

                <div className="tags-container">
                  {project.tech.split(",").map((item, i) => (
                    <span key={i} className="tech-tag">{item.trim()}</span>
                  ))}
                </div>

                <div className="card-footer">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="live-demo-link"
                  >
                    {project.isLive ? 'Explore Live' : 'Source Code'} 
                    <span className="arrow"> →</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}