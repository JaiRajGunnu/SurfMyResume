import React from "react";
import "../styles/App.css"; // Create a CSS file if needed

const Surfer = ({ position, flip }) => {
  return (
    <div
      className={`surfer ${flip ? "flipped" : ""}`}
      style={{
        top: position.top,
        left: position.left,
      }}
    ></div>
  );
};

export default Surfer;
