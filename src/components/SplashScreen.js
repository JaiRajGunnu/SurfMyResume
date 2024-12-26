import React, { useState, useEffect } from "react";
import "../styles/SplashScreen.css";

const SplashScreen = ({ onStart }) => {
  const surfers = [
    "https://i.pinimg.com/originals/03/20/16/032016a0f9e75ec9c5f729c6b29ea990.png", // Replace with your actual image URLs
    "https://i.pinimg.com/originals/03/20/16/032016a0f9e75ec9c5f729c6b29ea990.png",
    "https://i.pinimg.com/originals/03/20/16/032016a0f9e75ec9c5f729c6b29ea990.png",
  ];
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
        onStart(); // Trigger the onStart function
      }
    };

    // Add event listener for spacebar
    window.addEventListener("keydown", handleKeyDown);

    // Clean up event listener
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onStart]);

  const handleDoubleClick = () => {
    onStart(); // Trigger the onStart function on double-click
  };

  return (
    <div
      className="splash-screen"
      onDoubleClick={handleDoubleClick} // Add double-click functionality
    >
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
      <button className="start-button" onClick={onStart}>
        SPACEBAR to start playing
      </button>
    </div>
  );
};

export default SplashScreen;
