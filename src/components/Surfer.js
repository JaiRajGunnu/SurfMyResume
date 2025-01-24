// Surfer.js

import React, { useEffect, useState } from "react";
import "../styles/App.css";

import charLeft1 from "../images/surfers/CharLeft/SurfChar3.png";
import charLeft2 from "../images/surfers/CharLeft/SurfChar2.png";
import charLeft3 from "../images/surfers/CharLeft/SurfChar1.png";
import charLeft4 from "../images/surfers/CharLeft/SurfChar4.png";
import charLeft5 from "../images/surfers/CharLeft/SurfChar5.png";

import charMain1 from "../images/surfers/CharMain/SurfChar3.png";
import charMain2 from "../images/surfers/CharMain/SurfChar2.png";
import charMain3 from "../images/surfers/CharMain/SurfChar1.png";
import charMain4 from "../images/surfers/CharMain/SurfChar4.png";
import charMain5 from "../images/surfers/CharMain/SurfChar5.png";

import charRight1 from "../images/surfers/CharRight/SurfChar3.png";
import charRight2 from "../images/surfers/CharRight/SurfChar2.png";
import charRight3 from "../images/surfers/CharRight/SurfChar1.png";
import charRight4 from "../images/surfers/CharRight/SurfChar4.png";
import charRight5 from "../images/surfers/CharRight/SurfChar5.png";

const Surfer = ({ position, selectedSurfer, direction, isBlinking }) => {
  const [isVisible, setIsVisible] = useState(true); // State for visibility during blinking

  // Blinking effect logic
  useEffect(() => {
    if (isBlinking) {
      const interval = setInterval(() => {
        setIsVisible((prev) => !prev); // Toggle visibility
      }, 200); // Blink every 200ms

      return () => clearInterval(interval); // Cleanup interval
    } else {
      setIsVisible(true); // Ensure surfer is visible when not blinking
    }
  }, [isBlinking]);

  const surferImages = {
    left: [charLeft1, charLeft2, charLeft3, charLeft4, charLeft5],
    main: [charMain1, charMain2, charMain3, charMain4, charMain5],
    right: [charRight1, charRight2, charRight3, charRight4, charRight5],
  };

  const validSurfer = selectedSurfer >= 1 && selectedSurfer <= 5 ? selectedSurfer : 1;
  const surferImage = surferImages[direction]?.[validSurfer - 1] || surferImages.main[0];

  return (
    <div
      className="surfer"
      style={{
        top: position.top,
        left: position.left,
        backgroundImage: `url(${surferImage})`,
        opacity: isVisible ? 1 : 0, // Toggle opacity for blinking effect
        transition: "opacity 0.2s ease", // Smooth transition
      }}
    ></div>
  );
};

export default Surfer;