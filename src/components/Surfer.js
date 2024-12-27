import React from "react";
import "../styles/App.css";

import charLeft1 from "../images/surfers/CharLeft/SurfChar1.png";
import charLeft2 from "../images/surfers/CharLeft/SurfChar2.png";
import charLeft3 from "../images/surfers/CharLeft/SurfChar3.png";
import charLeft4 from "../images/surfers/CharLeft/SurfChar4.png";
import charLeft5 from "../images/surfers/CharLeft/SurfChar5.png";

import charMain1 from "../images/surfers/CharMain/SurfChar1.png";
import charMain2 from "../images/surfers/CharMain/SurfChar2.png";
import charMain3 from "../images/surfers/CharMain/SurfChar3.png";
import charMain4 from "../images/surfers/CharMain/SurfChar4.png";
import charMain5 from "../images/surfers/CharMain/SurfChar5.png";

import charRight1 from "../images/surfers/CharRight/SurfChar1.png";
import charRight2 from "../images/surfers/CharRight/SurfChar2.png";
import charRight3 from "../images/surfers/CharRight/SurfChar3.png";
import charRight4 from "../images/surfers/CharRight/SurfChar4.png";
import charRight5 from "../images/surfers/CharRight/SurfChar5.png";

const Surfer = ({ position, selectedSurfer, direction }) => {
  // Map to select the correct image based on selectedSurfer and direction
  const surferImages = {
    left: [charLeft1, charLeft2, charLeft3, charLeft4, charLeft5],
    main: [charMain1, charMain2, charMain3, charMain4, charMain5],
    right: [charRight1, charRight2, charRight3, charRight4, charRight5],
  };

  // Validate selectedSurfer and fallback if needed
  const validSurfer = selectedSurfer >= 1 && selectedSurfer <= 5 ? selectedSurfer : 1; // Default to 1 if invalid
  const surferImage = surferImages[direction]?.[validSurfer - 1] || surferImages.main[0]; // Default to main if not found

  return (
    <div
      className="surfer"
      style={{
        top: position.top,
        left: position.left,
        backgroundImage: `url(${surferImage})`,
      }}
    ></div>
  );
};

export default Surfer;
