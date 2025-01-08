import React, { useState, useEffect } from "react";
import "../styles/App.css";

const Modal = ({ blockName, onClose, customMessage }) => {
  const [timer, setTimer] = useState(5); // Set initial timer to 10 seconds
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    let interval;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 500);
    } else {
      setIsButtonDisabled(false); // Enable button after timer reaches 0
    }

    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{blockName === "Energy" ? "Energy Refill Needed!" : "Block Hit!"}</h2>
        <p>{customMessage || `You hit the ${blockName} block!`}</p>
        <div className="modal-buttons">
          {blockName === "Energy" ? (
            <button className="refill-btn" onClick={onClose}>
              REFILL ENERGY
            </button>
          ) : (
            <>
              <button
                onClick={() =>
                  alert(`Details about ${blockName} will be displayed here.`)
                }
              >
                Check {blockName}
              </button>
              <button className="continue"
                onClick={onClose}
                style={{ opacity: isButtonDisabled ? "50%" : "100%" }}
                disabled={isButtonDisabled}
              >
                Close & Play ({isButtonDisabled ? `${timer} sec` : "Ready"})
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
