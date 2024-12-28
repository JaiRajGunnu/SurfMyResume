// SplashScreen.js

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
  const [buttonText, setButtonText] = useState("SPACEBAR");

  const handlePrev = () => {
    setCurrentSurfer((prev) => (prev === 0 ? surfers.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSurfer((prev) => (prev === surfers.length - 1 ? 0 : prev + 1));
  };

  const handleDoubleClick = () => {
    onStart(currentSurfer + 1); // Start the game when double-clicked
  };

  const handleClick = () => {
    setButtonText("DOUBLE CLICK"); // Change button text to DOUBLE CLICK when clicked
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === " " || e.code === "Space") {
        onStart(currentSurfer + 1); // Start the game when spacebar is pressed
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("click", handleClick); // Change text when clicked anywhere

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("click", handleClick);
    };
  }, [onStart, currentSurfer]);

  return (
    <div className="splash-screen" onDoubleClick={handleDoubleClick}>
      <h1 className="tit1">LET'S SURF</h1>
      <p className="tit2">ENDLESS</p>
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
      <span
        className="start-button"
      >
        <span className="st-btn">{buttonText}</span> to start playing
      </span>
    </div>
  );
};

export default SplashScreen;
