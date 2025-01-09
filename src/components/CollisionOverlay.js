import React, { useEffect } from "react";
import "../styles/App.css";

const CollisionOverlay = ({ blockName, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === " ") {
        onClose(); // Close the overlay and resume the game
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
        <h1 className="tit1">HURRAY!</h1>
        <p className="tit2">Let's explore {blockName} </p>
      </div>
      <div className="ui-instruct">
        <span className="start-txt">
          <span className="st-btn">SPACEBAR</span> to resume playing
        </span>
      </div>
    </div>
  );
};

export default CollisionOverlay;