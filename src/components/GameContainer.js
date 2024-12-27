import React, { useState, useEffect } from "react";
import Block from "./Block";
import Surfer from "./Surfer";
import Modal from "./Modal";
import "../styles/App.css";

const GameContainer = ({ selectedSurfer }) => {
  const [surferPosition, setSurferPosition] = useState({ top: 200, left: 50 });
  const [blocks, setBlocks] = useState([]);
  const [collisionBlock, setCollisionBlock] = useState(null);
  const [direction, setDirection] = useState("main");

  useEffect(() => {
    const initialBlocks = [
      { id: 1, label: "About Me", top: 100, left: 300 },
      { id: 2, label: "Projects", top: 300, left: 500 },
      { id: 3, label: "Skills", top: 200, left: 700 },
      { id: 4, label: "Experience", top: 400, left: 900 },
    ];
    setBlocks(initialBlocks);
  }, []);

  // Automatic downward surfing
  useEffect(() => {
    const autoSurfDown = setInterval(() => {
      setSurferPosition((prev) => ({
        ...prev,
        top: prev.top + 1, // Move downward slowly
      }));
    }, 50); // Adjust speed with interval time

    return () => clearInterval(autoSurfDown); // Cleanup interval on unmount
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      setSurferPosition((prev) => {
        let newPosition = { ...prev };

        if (e.key === "ArrowUp") {
          newPosition.top -= 2; // Move up very slowly
        }
        if (e.key === "ArrowDown") {
          newPosition.top += 2; // Move down
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
      {collisionBlock && (
        <Modal blockName={collisionBlock} onClose={closeModal} />
      )}
      <Surfer
        position={surferPosition}
        direction={direction}
        selectedSurfer={selectedSurfer}
      />
      {blocks.map((block) => (
        <Block key={block.id} block={block} />
      ))}
    </div>
  );
};

export default GameContainer;
