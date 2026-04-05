import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Education from "./components/Education/Education";
import Skills from "./components/Skills/Skills";
import Projects from "./components/Projects/Projects";
import Footer from "./components/Footer/Footer";
import Courses from "./components/Education/Courses";
import Internship from "./components/Education/Internship";
import "./App.css"; // Ensure this file is imported

function App() {
  return (
    <div className="App">
      {/* NAVBAR: Fixed to top */}
      <Navbar />
      
      {/* MAIN CONTENT wrapper to fix the overlap */}
      <main className="main-content-wrapper">
        <Hero />
        <About />
        <Education />
      
      <Courses />
      <Internship />
        <Skills />
        <Projects />
      </main>

      {/* FOOTER: Fixed to bottom */}
      <Footer />
    </div>
  );
}

export default App;