import React, { useState, useEffect } from "react";
import Block from "./Block";
import Surfer from "./Surfer";
import Modal from "./Modal";
import "../styles/App.css";
import block1 from "../images/blocks/block1.png";
import block2 from "../images/blocks/block2.png";
import block3 from "../images/blocks/block3.png";
import block4 from "../images/blocks/block4.png";
import Life from "./Life";
import Energy from "./Energy";

const GameContainer = ({ selectedSurfer }) => {
  const [surferPosition, setSurferPosition] = useState({ top: 50, left: 735 });
  const [blocks, setBlocks] = useState([]);
  const [collisionBlock, setCollisionBlock] = useState(null);
  const [direction, setDirection] = useState("main");
  const [isPaused, setIsPaused] = useState(false);
  const [distance, setDistance] = useState(0);
  const [highestDistance, setHighestDistance] = useState(() => {
    // Retrieve the highest distance from localStorage on initial render
    return parseInt(localStorage.getItem("highestDistance"), 10) || 0;
  });
  const [energyLevel, setEnergyLevel] = useState(3);
  const [lifeLevel, setLifeLevel] = useState(3);
  const [showRefillPrompt, setShowRefillPrompt] = useState(false);
  const [processedThresholds, setProcessedThresholds] = useState([]);

  const screenHeight = window.innerHeight;
  const screenWidth = window.innerWidth;

  useEffect(() => {
    const initialBlocks = [
      { id: 1, label: "About Me", top: 100, left: 300, image: block1 },
      { id: 2, label: "Education", top: 200, left: 500, image: block2 },
      { id: 3, label: "Skills", top: 300, left: 700, image: block3 },
      { id: 4, label: "Projects", top: 400, left: 900, image: block4 },
      { id: 5, label: "Certifications", top: 500, left: 1100, image: block1 },
      { id: 6, label: "Volunteer Experience", top: 600, left: 1300, image: block2 },
    ];
    setBlocks(initialBlocks);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const autoSurfDown = setInterval(() => {
      setSurferPosition((prev) => {
        const newTop = prev.top + 1;
        if (newTop < screenHeight - 50) {
          setDistance((prevDistance) => {
            const newDistance = prevDistance + 1;

            // Update highest distance if necessary
            if (newDistance > highestDistance) {
              setHighestDistance(newDistance);
              localStorage.setItem("highestDistance", newDistance); // Save to localStorage
            }

            // Adjust energy level logic
            if (newDistance === 1000) {
              setEnergyLevel(2);
            } else if (newDistance === 2000) {
              setEnergyLevel(1);
            } else if (newDistance === 3000) {
              setEnergyLevel(0);
              setShowRefillPrompt(true);
              setIsPaused(true);
            }

            // Decrease life every 60000 units of distance
            if (newDistance % 60000 === 0) {
              setLifeLevel((prevLife) => Math.max(prevLife - 1, 0));
            }

            return newDistance;
          });
          return { ...prev, top: newTop };
        }
        return prev;
      });
    }, 50);

    return () => clearInterval(autoSurfDown);
  }, [screenHeight, isPaused, highestDistance]);

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
          if (newPosition.top < screenHeight - 50) {
            newPosition.top += 2;
          }
        }
        if (e.key === "ArrowLeft") {
          if (newPosition.left > 0) {
            newPosition.left -= 3;
            newPosition.top += 2;
            setDirection("left");
          }
        }
        if (e.key === "ArrowRight") {
          if (newPosition.left < screenWidth - 50) {
            newPosition.left += 3;
            newPosition.top += 2;
          }
          setDirection("right");
        }

        if (newPosition.top >= screenHeight) {
          newPosition.top = 0;
          newPosition.left = Math.random() * (screenWidth - 50);
        }

        if (newPosition.left < 0) {
          newPosition.left = 0;
        }
        if (newPosition.left >= screenWidth - 50) {
          newPosition.left = screenWidth - 50;
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
    setProcessedThresholds([]); // Reset thresholds when refilled
    setShowRefillPrompt(false);
    setIsPaused(false);
  };

  useEffect(() => {
    // Decrease life level every 2 minutes (120 seconds = 120000 ms)
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
      {/* Add your game elements here */}

      <div className="dashboard">
        <Life lifeLevel={lifeLevel} />
        <div className="distance-display">
          {distance} m
        </div>
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
        position={surferPosition}
        direction={direction}
        selectedSurfer={selectedSurfer}
      />
      {blocks.map((block) => (
        <Block
          key={block.id}
          block={block}
          blockImage={block.image}
        />
      ))}
      {isPaused && !showRefillPrompt && <div className="pause-overlay">Game Paused</div>}
    </div>
  );
};

export default GameContainer;
