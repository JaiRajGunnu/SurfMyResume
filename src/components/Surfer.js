// Surfer.js


import React from "react";
import "../styles/App.css";

const Surfer = ({ position, surferImage }) => {
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
