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
  const [isPaused, setIsPaused] = useState(false); // Track game pause state
  const [distance, setDistance] = useState(0); // Track distance surfed
  const [energy, setEnergy] = useState(3); // Track energy levels (3 blocks)

  const screenHeight = window.innerHeight; // Get the screen height
  const screenWidth = window.innerWidth; // Get the screen width

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
    if (isPaused) return; // Stop the game if paused

    const autoSurfDown = setInterval(() => {
      setSurferPosition((prev) => {
        const newTop = prev.top + 1; // Move downward slowly
        if (newTop < screenHeight - 50) { // Check if surfer is within bounds
          setDistance((d) => {
            const newDistance = d + 1;

            // Save the distance to localStorage
            localStorage.setItem("distance", newDistance);

            // Update energy based on distance
            if (newDistance % 1000 === 0 && energy > 0) {
              setEnergy((prevEnergy) => prevEnergy - 1); // Deplete one energy block
            }

            return newDistance;
          });
          return { ...prev, top: newTop };
        }
        return prev; // Prevent moving below screen
      });
    }, 50); // Adjust speed with interval time

    return () => clearInterval(autoSurfDown); // Cleanup interval on unmount
  }, [screenHeight, isPaused, energy]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === " " && !isPaused) {
        setIsPaused(true); // Pause game on spacebar
      } else if (e.key === " " && isPaused) {
        setIsPaused(false); // Resume game on spacebar if paused
      }

      if (isPaused) return; // Prevent further key events if paused

      setSurferPosition((prev) => {
        let newPosition = { ...prev };

        if (e.key === "ArrowUp") {
          newPosition.top -= 2; // Move up very slowly
        }
        if (e.key === "ArrowDown") {
          if (newPosition.top < screenHeight - 50) {
            newPosition.top += 2; // Move down very slowly
          }
        }
        if (e.key === "ArrowLeft") {
          if (newPosition.left > 0) {
            newPosition.left -= 3;
            newPosition.top += 2; // Move downward while moving left
            setDirection("left");
          }
        }
        if (e.key === "ArrowRight") {
          if (newPosition.left < screenWidth - 50) {
            newPosition.left += 3;
            newPosition.top += 2; // Move downward while moving right
          }
          setDirection("right");
        }

        if (newPosition.top >= screenHeight) {
          newPosition.top = 0; // Reset to top
          newPosition.left = Math.random() * (screenWidth - 50); // Randomize left position within bounds
        }

        if (newPosition.left < 0) {
          newPosition.left = 0; // Prevent moving out of the left edge
        }
        if (newPosition.left >= screenWidth - 50) {
          newPosition.left = screenWidth - 50; // Prevent moving out of the right edge
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
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsPaused(true); // Pause game if tab is hidden
      } else {
        setIsPaused(false); // Resume game when tab is visible again
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

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

  return (
    <div className="game-container">
      {/* Display distance surfed */}
      <div className="dashboard">
        <Life />
        <div className="distance-display">{distance} m</div>
        <Energy energy={energy} />
      </div>
      {collisionBlock && (
        <Modal blockName={collisionBlock} onClose={closeModal} />
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
          blockImage={block.image} // Pass the correct block image
        />
      ))}
      {isPaused && <div className="pause-overlay">Game Paused</div>}
    </div>
  );
};

export default GameContainer;
