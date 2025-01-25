import React, { useEffect } from "react";
import "../styles/App.css";
import "../styles/CollisionOverlay.css"; // Import the new CSS file

const CollisionOverlay = ({
  blockName,
  onClose,
  customMessage,
  showRefillInstruction,
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === " ") {
        onClose(); // Close the overlay
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Sample Data (Replace with your actual data)
  const blockData = {
    "About Me": `
        Name: Your Name
        Position: Your Role
        Description: A brief description about you.
    `,
    Education: `
        University: Your University Name
        Degree: Your Degree
        Year: Graduation Year
    `,
    Skills: `
        Programming Languages: JavaScript, Python, React
        Other Skills: UI/UX, Problem Solving
    `,
    Projects: `
        Project 1: Project Description - Link if applicable
        Project 2: Another Project - Link if applicable
    `,
    Certifications: `
       Certification 1: Name of Certification - Issuing Authority
       Certification 2: Another Certification - Issuing Authority
    `,
    "Volunteer Experience": `
        Organization: Name of Organization
        Role: Your role at the organization
        Description: A description of your work
    `,
  };

  const displayContent = () => {
      if(blockData[blockName]) {
            return (
                <div className="terminal-content">
                  <p className="terminal-prompt">user@localhost:~$</p>
                  <pre className="terminal-text">{blockData[blockName]}</pre>
                </div>
            );

      } else {
            return (
                <div className="terminal-content">
                  <p className="terminal-prompt">user@localhost:~$</p>
                  <pre className="terminal-text">{`Start exploring ${blockName}, as already indicated in the below code.`}</pre>
                </div>
            );

      }
  };

  return (
    <div className="collision-overlay">
      <div className="titles">
        <h1 className="tit1">
          {blockName === "Energy" ? "ENERGY RUINED!" : "HURRAY!"}
        </h1>
        <p className="tit2">{customMessage || `Start exploring ${blockName}`}</p>
      </div>

      <div className="terminal">
        {displayContent()}
      </div>

      <div className="ui-instruct">
        {showRefillInstruction ? (
          <span className="start-txt">
            <span className="st-btn">SPACEBAR</span> to refill energy
          </span>
        ) : (
          <span className="start-txt">
            <span className="st-btn">SPACEBAR</span> to resume surfing
          </span>
        )}
      </div>
    </div>
  );
};

export default CollisionOverlay;