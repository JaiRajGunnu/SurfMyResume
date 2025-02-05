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

  const blockData = {  
    "About Me": `  
        🔭 Working on Java-based projects, exploring problem-solving techniques.  
        🌱 Learning Docker, Kubernetes, and cloud deployment strategies.  
        👯 Collaborating on innovative projects, especially in design & new tech.  
        👨‍💻 Explore my work at Surf My Resume.  
        💬 Ask me about Java, creative design, and software architecture.  
        📫 Contact: jairajgsklm@gmail.com  
    `,  
    "Education": `  
        🎓 University: SRM Institute Of Science & Technology
        📖 Degree: Bachelor of Technology
        🤖 Stream: Computer Science & Engineering
        📅 Graduation: 2024 
    `,  
    "Skills": `  
        🖥️ Programming: Java, Python, SQL  
        🎨 Frontend: React.js, TypeScript, JavaScript, Tailwind, Bootstrap  
        🛠️ Backend: Node.js, Express.js, REST APIs  
        📱 App Development: React Native  
        🗄️ Databases: MongoDB, MySQL  
        🚀 DevOps: Docker, GitHub Actions, CI/CD  
        ☁️ Cloud: AWS (Amazon Web Services)  
        🖥️ OS: Windows, Linux  
        🔄 Version Control: Git, GitHub  
        🎨 UI/UX: Figma, Adobe Photoshop  
    `,  
    "Projects": `  
        🚖 MWS - Ride Booking App
         Connects passengers with drivers efficiently.  

        🎮 Surf My Resume Game
         Interactive resume game inspired by Microsoft Surf. 

        🖥️ Dockerized Web Server with CI/CD
         Scalable web server with automated deployments. 

        🚗 Social Vehicle Management App
         Tracks and manages rented vehicles efficiently.  
    `,  
    "Certifications": `  
        🏆  Java Full Stack Development (Nov 2024)
             by Besant Technologies
        🏆  AWS Academy Graduate (May 2022)
             by AWS Cloud Operations
    `,  
    "Volunteer Experience": `  
        🏅 Organization: IEI Students’ Chapter  
        📌 Role: Organizer  
        📋 Managed & coordinated events for 650+ participants.  
    `  
  };  

  const displayContent = () => (
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

  return (
    <div className="collision-overlay">
      <div className="titles">
        <h1 className="tit1">
          {blockName === "Energy" ? "ENERGY RUINED!" : "HURRAY!"}
        </h1>
        <p className="tit2">{customMessage || `Start exploring ${blockName}`}</p>
      </div>
      {blockData[blockName] && (
        <div className="terminal-container">
          <div className="terminal">{displayContent()}</div>
        </div>
      )}
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