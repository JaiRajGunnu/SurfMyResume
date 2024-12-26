import React from "react";
import "../styles/App.css"; // Create a CSS file if needed

const Modal = ({ blockName, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Block Hit!</h2>
        <p>You hit the <strong>{blockName}</strong> block!</p>
        <div className="modal-buttons">
          <button
            onClick={() => alert(`Details about ${blockName} will be displayed here.`)}
          >
            Check {blockName}
          </button>
          <button onClick={onClose}>Close & Play</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
