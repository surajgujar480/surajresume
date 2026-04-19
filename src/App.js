import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Education from "./components/Education/Education";
import Skills from "./components/Skills/Skills";
import Projects from "./components/Projects/Projects";
import Footer from "./components/Footer/Footer";
import Courses from "./components/Education/Courses";
import Internship from "./components/Education/Internship";
import SnakeGame from "./components/Game/SnakeGame"; // ✅ Import Game
import "./App.css";

function App() {
  return (
    // ✅ Router must wrap everything to allow useNavigate() to work
    <Router basename="/surajresume">
      <div className="App">
        <Navbar />
        
        <main className="main-content-wrapper">
          <Routes>
            {/* ✅ Main Portfolio Route */}
            <Route path="/" element={
              <>
                <Hero />
                <About />
                <section id="edu">
                  <Education />
                  <Courses />
                  <Internship />
                </section>
                <Skills />
                <Projects />
              </>
            } />

            {/* ✅ Snake Game Route */}
            <Route path="/game" element={<SnakeGame />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;