import React, { useState, useEffect } from "react";
import Block from "./Block";
import Surfer from "./Surfer";
import Modal from "./Modal";
import "../styles/App.css";

const GameContainer = ({ selectedSurfer }) => {
  const [surferPosition, setSurferPosition] = useState({ top: 200, left: 50 });
  const [blocks, setBlocks] = useState([]);
  const [collisionBlock, setCollisionBlock] = useState(null);
  const [flip, setFlip] = useState(false); // Track flipping state

  useEffect(() => {
    const initialBlocks = [
      { id: 1, label: "About Me", top: 100, left: 300 },
      { id: 2, label: "Projects", top: 300, left: 500 },
      { id: 3, label: "Skills", top: 200, left: 700 },
      { id: 4, label: "Experience", top: 400, left: 900 },
    ];
    setBlocks(initialBlocks);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      setSurferPosition((prev) => {
        let newPosition = { ...prev };
        if (e.key === "ArrowUp") newPosition.top -= 20;
        if (e.key === "ArrowDown") newPosition.top += 20;
        if (e.key === "ArrowLeft") {
          newPosition.left -= 20;
          setFlip(true); // Flip the surfer to the left
        }
        if (e.key === "ArrowRight") {
          newPosition.left += 20;
          setFlip(false); // Set the surfer to default (right-facing)
        }
        return newPosition;
      });
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
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
          setCollisionBlock(block.label); // Set the block label on collision
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
      <Surfer position={surferPosition} flip={flip} surferImage={selectedSurfer} />
      {blocks.map((block) => (
        <Block key={block.id} block={block} />
      ))}
    </div>
  );
};

export default GameContainer;
