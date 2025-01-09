import React, { useEffect } from "react";
import "../styles/App.css";

const CollisionOverlay = ({ blockName, onClose, customMessage, showRefillInstruction }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === " ") {
        onClose(); // Close the overlay and refill energy
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="collision-overlay">
      <div className="titles">
        <h1 className="tit1">{blockName === "Energy" ? "ENERGY RUINED!" : "HURRAY!"}</h1>
        <p className="tit2">
          {customMessage || `Start exploring ${blockName}.`}
        </p>
      </div>
      <div className="ui-instruct">
        {showRefillInstruction ? (
          <span className="start-txt">
             <span className="st-btn">SPACEBAR</span> to refill energy
          </span>
        ) : (
          <span className="start-txt">
             <span className="st-btn">SPACEBAR</span> to resume playing
          </span>
        )}
      </div>
    </div>
  );
};

export default CollisionOverlay;