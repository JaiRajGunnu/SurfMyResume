import React, { useState, useEffect } from "react";
import Block from "./Block";
import Surfer from "./Surfer";
import Modal from "./Modal";
import "../styles/App.css";
import block1 from "../images/islands/block1.png";
import block2 from "../images/islands/block2.png";
import block3 from "../images/islands/block3.png";
import block4 from "../images/islands/block4.png";
import block5 from "../images/islands/block5.png";
import block6 from "../images/islands/block6.png";
import Life from "./Life";
import Energy from "./Energy";

const GameContainer = ({ selectedSurfer }) => {
  const [surferPosition, setSurferPosition] = useState({ top: 15, left: 735 });
  const [cameraOffset, setCameraOffset] = useState({ top: 0, left: 0 });
  const [blocks, setBlocks] = useState([]);
  const [collisionBlock, setCollisionBlock] = useState(null);
  const [direction, setDirection] = useState("main");
  const [isPaused, setIsPaused] = useState(false);
  const [distance, setDistance] = useState(0);
  const [highestDistance, setHighestDistance] = useState(() => {
    return parseInt(localStorage.getItem("highestDistance"), 10) || 0;
  });
  const [energyLevel, setEnergyLevel] = useState(3);
  const [lifeLevel, setLifeLevel] = useState(3);
  const [showRefillPrompt, setShowRefillPrompt] = useState(false);
  const [buttonText, setButtonText] = useState("SPACEBAR");

  const screenHeight = window.innerHeight;
  const screenWidth = window.innerWidth;

  // Track surfer speed (distance moved per frame)
  const [surferSpeed, setSurferSpeed] = useState(1); // Default speed
  const [prevPosition, setPrevPosition] = useState({ top: 15, left: 735 });

  useEffect(() => {
    const initialBlocks = [
      { id: 1, label: "About Me", top: 115, left: 18, image: block3 },
      { id: 2, label: "Education", top: 117, left: 843, image: block4 },
      { id: 3, label: "Skills", top: 650, left: 75, image: block1 },
      { id: 4, label: "Projects", top: 540, left: 910, image: block2 },
      { id: 5, label: "Certifications", top: 1070, left: 47, image: block5 },
      { id: 6, label: "Volunteer Exp.", top: 1013, left: 876, image: block6 },
    ];
    setBlocks(initialBlocks);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const autoSurfDown = setInterval(() => {
      setSurferPosition((prev) => {
        const newTop = prev.top + surferSpeed;

        // Calculate the speed change based on surfer's movement
        const speedChange = Math.abs(prev.top - prevPosition.top);
        setPrevPosition({ top: prev.top, left: prev.left });

        // Update surfer speed based on movement
        setSurferSpeed((prevSpeed) => {
          const newSpeed = speedChange / 10; // Increase this value to make the surfer faster
          return Math.max(newSpeed, 1); // Ensure speed doesn't go below 1
        });

        // Adjust camera offset speed based on surfer's speed
        setCameraOffset((prevOffset) => ({
          top: prevOffset.top + surferSpeed * 0.5, // Increase multiplier to move camera faster
          left: prevOffset.left,
        }));

        setDistance((prevDistance) => {
          const newDistance = prevDistance + 1;

          if (newDistance > highestDistance) {
            setHighestDistance(newDistance);
            localStorage.setItem("highestDistance", newDistance);
          }

          if (newDistance === 1000) {
            setEnergyLevel(2);
          } else if (newDistance === 2000) {
            setEnergyLevel(1);
          } else if (newDistance === 3000) {
            setEnergyLevel(0);
            setShowRefillPrompt(true);
            setIsPaused(true);
          }

          if (newDistance % 60000 === 0) {
            setLifeLevel((prevLife) => Math.max(prevLife - 1, 0));
          }

          return newDistance;
        });

        return { ...prev, top: newTop };
      });
    }, 50);

    return () => clearInterval(autoSurfDown);
  }, [screenHeight, isPaused, highestDistance, surferSpeed]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === " " && !isPaused) {
        setIsPaused(true);
      } else if (e.key === " " && isPaused) {
        setIsPaused(false);
      }

      if (isPaused) return;

      setSurferPosition((prev) => {
        let newPosition = { ...prev };

        if (e.key === "ArrowUp") {
          newPosition.top -= 2;
        }
        if (e.key === "ArrowDown") {
          newPosition.top += 2;
        }
        if (e.key === "ArrowLeft") {
          if (newPosition.left > 0) {
            newPosition.left -= 3;
            setDirection("left");
          }
        }
        if (e.key === "ArrowRight") {
          if (newPosition.left < screenWidth - 50) {
            newPosition.left += 3;
          }
          setDirection("right");
        }

        return newPosition;
      });
    };

    const handleKeyUp = (e) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        setDirection("main");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [screenHeight, screenWidth, isPaused]);

  useEffect(() => {
    const checkCollisions = () => {
      blocks.forEach((block) => {
        if (
          surferPosition.left < block.left + 80 &&
          surferPosition.left + 50 > block.left &&
          surferPosition.top < block.top + 80 &&
          surferPosition.top + 50 > block.top
        ) {
          setCollisionBlock(block.label);
        }
      });
    };
    checkCollisions();
  }, [surferPosition, blocks]);

  const closeModal = () => setCollisionBlock(null);

  const handleRefill = () => {
    setEnergyLevel(3);
    setShowRefillPrompt(false);
    setIsPaused(false);
  };

  useEffect(() => {
    const lifeDecrement = setInterval(() => {
      if (lifeLevel > 0) {
        setLifeLevel((prevLife) => Math.max(prevLife - 1, 0));
      }
    }, 120000);

    return () => clearInterval(lifeDecrement);
  }, [lifeLevel]);

  return (
    <div className="game-container">
      <div id="game-gradient"></div>
      <div id="game-bg"></div>
      <div className="dashboard">
        <Life lifeLevel={lifeLevel} />
        <div className="distance-display">{distance} m</div>
        <Energy energyLevel={energyLevel} />
      </div>
      {collisionBlock && (
        <Modal blockName={collisionBlock} onClose={closeModal} />
      )}
      {showRefillPrompt && (
        <Modal
          blockName="Energy"
          onClose={handleRefill}
          customMessage="Your Energy Levels Were Dropped Down. Refill the Energy Level to Continue Game."
        />
      )}
      <Surfer
        position={{
          top: surferPosition.top - cameraOffset.top,
          left: surferPosition.left - cameraOffset.left,
        }}
        direction={direction}
        selectedSurfer={selectedSurfer}
      />


{blocks.map((block) => {
  const isBlock1Or2 = block.id === 1 || block.id === 2;
  return (
    <Block
      key={block.id}
      block={{
        ...block,
        top: block.top - cameraOffset.top,
        left: block.left - cameraOffset.left,
      }}
      blockImage={block.image}
      style={{
        width: isBlock1Or2 ? '600px' : '500px',
        height: isBlock1Or2 ? '350px' : '233px',
      }}
    />
  );
})}


      {isPaused && (
        <div className="pause-overlay">
          <div className="titles">
            <h1 className="tit1">LET'S SURF</h1>
            <p className="tit2">MY RESUME</p>
          </div>
          <div className="ui-instruct">
            <span className="start-txt">
              <span className="st-btn">{buttonText}</span> to resume playing
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameContainer;
