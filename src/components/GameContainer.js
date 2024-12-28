import React, { useState, useEffect } from "react";
import Block from "./Block";
import Surfer from "./Surfer";
import Modal from "./Modal";
import "../styles/App.css";
import block1 from "../images/blocks/block1.png";
import block2 from "../images/blocks/block2.png";
import block3 from "../images/blocks/block3.png";
import block4 from "../images/blocks/block4.png";

const GameContainer = ({ selectedSurfer }) => {
  const [surferPosition, setSurferPosition] = useState({ top: 200, left: 50 });
  const [blocks, setBlocks] = useState([]);
  const [collisionBlock, setCollisionBlock] = useState(null);
  const [direction, setDirection] = useState("main");

  const screenHeight = window.innerHeight; // Get the screen height

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

  // Automatic downward surfing
  useEffect(() => {
    const autoSurfDown = setInterval(() => {
      setSurferPosition((prev) => {
        const newTop = prev.top + 1; // Move downward slowly
        if (newTop < screenHeight - 50) { // Check if surfer is within bounds
          return { ...prev, top: newTop };
        }
        return prev; // Prevent moving below screen
      });
    }, 50); // Adjust speed with interval time

    return () => clearInterval(autoSurfDown); // Cleanup interval on unmount
  }, [screenHeight]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      setSurferPosition((prev) => {
        let newPosition = { ...prev };

        if (e.key === "ArrowUp") {
          newPosition.top -= 2; // Move up very slowly
        }
        if (e.key === "ArrowDown") {
          const newTop = newPosition.top + 2;
          if (newTop < screenHeight - 50) { // Ensure surfer doesn't go below screen
            newPosition.top = newTop;
          }
        }
        if (e.key === "ArrowLeft") {
          newPosition.left -= 5;
          newPosition.top += 2; // Move downward while moving left
          setDirection("left");
        }
        if (e.key === "ArrowRight") {
          newPosition.left += 5;
          newPosition.top += 2; // Move downward while moving right
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
  }, [screenHeight]);

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
    </div>
  );
};

export default GameContainer;
