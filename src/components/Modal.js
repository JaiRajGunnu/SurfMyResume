import React from "react";
import "../styles/App.css";

const Modal = ({ blockName, onClose, customMessage }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{blockName === "Energy" ? "Energy Refill Needed!" : "Block Hit!"}</h2>
        <p>{customMessage || `You hit the ${blockName} block!`}</p>
        <div className="modal-buttons">
          {blockName === "Energy" ? (
            <btn className="refill-btn" onClick={onClose}>REFILL ENERGY</btn>
          ) : (
            <>
              <button
                onClick={() =>
                  alert(`Details about ${blockName} will be displayed here.`)
                }
              >
                Check {blockName}
              </button>
              <button onClick={onClose}>Close & Play</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
