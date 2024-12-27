import React, { useState, useEffect } from "react";
import "../styles/SplashScreen.css";

import charMain1 from "../images/surfers/CharMain/SurfChar1.png";
import charMain2 from "../images/surfers/CharMain/SurfChar2.png";
import charMain3 from "../images/surfers/CharMain/SurfChar3.png";
import charMain4 from "../images/surfers/CharMain/SurfChar4.png";
import charMain5 from "../images/surfers/CharMain/SurfChar5.png";

const SplashScreen = ({ onStart }) => {
  const surfers = [charMain1, charMain2, charMain3, charMain4, charMain5];
  const [currentSurfer, setCurrentSurfer] = useState(0);

  const handlePrev = () => {
    setCurrentSurfer((prev) => (prev === 0 ? surfers.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSurfer((prev) => (prev === surfers.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === " " || e.code === "Space") {
        onStart(currentSurfer + 1); // Pass selected surfer index (+1 for 1-based indexing)
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onStart, currentSurfer]);

  return (
    <div className="splash-screen">
      <h1>LET'S SURF</h1>
      <p>ENDLESS</p>
      <div className="character-selection">
        <button className="arrow left" onClick={handlePrev}>
          &lt;
        </button>
        <img
          src={surfers[currentSurfer]}
          alt="Surfer Avatar"
          className="surfer-avatar"
        />
        <button className="arrow right" onClick={handleNext}>
          &gt;
        </button>
      </div>
      <button
        className="start-button"
        onClick={() => onStart(currentSurfer + 1)}
      >
        SPACEBAR to start playing
      </button>
    </div>
  );
};

export default SplashScreen;
