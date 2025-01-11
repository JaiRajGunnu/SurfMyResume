// DefaultOverlay.js

import React, { useEffect } from "react";
import "../styles/App.css";

const DefaultOverlay = ({ onClose, buttonText, isTabVisible }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === " ") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="pause-overlay">
      <div className="titles">
        <h1 className="tit1">LET'S SURF</h1>
        <p className="tit2">MY RESUME</p>
      </div>
      <div className="ui-instruct">
        <span className="start-txt">
          {!isTabVisible ? (
            <span>
              You switched tabs! Press <span className="st-btn">{buttonText}</span> to resume.
            </span>
          ) : (
            <span>
              <span className="st-btn">{buttonText}</span> to resume playing
            </span>
          )}
        </span>
      </div>
    </div>
  );
};

export default DefaultOverlay;