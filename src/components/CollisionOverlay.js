import React, { useEffect } from "react";
import "../styles/App.css";
import "../styles/CollisionOverlay.css";

const CollisionOverlay = ({
  blockName,
  onClose,
  customMessage,
  showRefillInstruction,
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === " ") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Sample Data
  const blockData = {
    "About Me": `
🔭 Currently working on Java-based projects, exploring new architectures and problem-solving techniques.
🌱 Currently learning Docker, Kubernetes, and cloud deployment strategies to enhance my development workflow.
👯 Looking to collaborate on innovative projects, especially those involving creative design and backend integration.
👨‍💻 Check out my portfolio and projects at Surf My Resume
💬 Feel free to ask me about creative designs, Java development, and software architecture.
📫 You can reach me at jairajgsklm@gmail.com
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
    if (blockData[blockName]) {
      return (
        <>
         
          <div className="linux-window-bar">
            <div className="linux-controls">
              <div className="linux-control-button linux-close"></div>
              <div className="linux-control-button linux-minimize"></div>
              <div className="linux-control-button linux-maximize"></div>
            </div>
          </div>
          <div className="terminal-content">
            <p className="terminal-prompt">user@localhost:~$</p>
            <pre className="terminal-text">{blockData[blockName]}</pre>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="linux-window-bar">
            <div className="linux-controls">
              <div className="linux-control-button linux-close"></div>
              <div className="linux-control-button linux-minimize"></div>
              <div className="linux-control-button linux-maximize"></div>
            </div>
          </div>
          <div className="terminal-content">
            <p className="terminal-prompt">user@localhost:~$</p>
            <pre className="terminal-text">{`Start exploring ${blockName}, as already indicated in the below code.`}</pre>
          </div>
        </>
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
          <div className="terminal-container">
            <div className="terminal">
                {displayContent()}
            </div>
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