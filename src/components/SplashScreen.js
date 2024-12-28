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
  const [distance, setDistance] = useState(0); // Track the distance
  const [highestDistance, setHighestDistance] = useState(0); // Track the highest distance

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
    // Retrieve saved distance from localStorage and set it
    const savedDistance = localStorage.getItem("distance") || 0;
    setDistance(parseInt(savedDistance, 10));

    // Retrieve the highest distance from localStorage and set it
    const savedHighestDistance = localStorage.getItem("highestDistance") || 0;
    setHighestDistance(parseInt(savedHighestDistance, 10));

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

  // Update the highest distance if the current distance is greater
  useEffect(() => {
    if (distance > highestDistance) {
      setHighestDistance(distance);
      localStorage.setItem("highestDistance", distance); // Save the highest distance
    }
  }, [distance, highestDistance]);

  return (
    <div className="splash-screen" onDoubleClick={handleDoubleClick}>
      <h1 className="tit1">LET'S SURF</h1>
      <p className="tit2">ENDLESS</p>
      {/* <div className="highest-distance-display">
        Highest Distance: {highestDistance} m
      </div> */}

<div className="distance-display">
  {/* Star icon */}
  <span id="score-icon" className="icon-container">
    <svg className="icon-star" width="20px" height="20px" viewBox="0 0 20 20">
      <path className="icon-fill" d="M9.10433 2.89874C9.47114 2.15549 10.531 2.1555 10.8978 
    2.89874L12.8282 6.81024L17.1448 7.43748C17.9651 7.55666 18.2926 8.56464 17.699 
    9.14317L14.5755 12.1878L15.3129 16.487C15.453 17.3039 14.5956 17.9269 13.8619 
    17.5412L10.0011 15.5114L6.14018 17.5412C5.40655 17.9269 4.54913 17.3039 
    4.68924 16.487L5.4266 12.1878L2.30308 9.14317C1.70956 8.56463
     2.03708 7.55666 2.8573 7.43748L7.17389 6.81024L9.10433
      2.89874Z"> </path>
    </svg>
  </span>

  {/* Highest distance */}
  <span className="distance-text"> {highestDistance} m </span>
</div>

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
      <span className="start-button">
        <span className="st-btn">{buttonText}</span> to start playing
      </span>
    </div>
  );
};

export default SplashScreen;
