import React, { useState } from 'react';
import Surfer from './Surfer';
import Block from './Block';

const GameContainer = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [blockTitle, setBlockTitle] = useState('');

  // Blocks with positions
  const blocks = [
    { title: 'About Me', x: 100, y: 100 },
    { title: 'Projects', x: 300, y: 100 },
    { title: 'Skills', x: 500, y: 100 },
    // Add more blocks as needed
  ];

  const handleBlockClick = (title) => {
    setBlockTitle(title);
    setShowDetails(true);
  };

  const closeDetails = () => {
    setShowDetails(false);
  };

  // Collision detection: Check if surfer is close to a block
  const checkCollision = (surferPos) => {
    blocks.forEach((block) => {
      const distanceX = Math.abs(surferPos.x - block.x);
      const distanceY = Math.abs(surferPos.y - block.y);

      // If the surfer is within 40px of the block, show the block's details
      if (distanceX < 40 && distanceY < 40) {
        handleBlockClick(block.title);
      }
    });
  };

  return (
    <div className="relative w-full h-screen bg-green-200 overflow-hidden">
      <Surfer onCollide={checkCollision} />

      {blocks.map((block, index) => (
        <Block
          key={index}
          title={block.title}
          onClick={() => handleBlockClick(block.title)}
          style={{ left: `${block.x}px`, top: `${block.y}px` }}
        />
      ))}

      {showDetails && (
        <div className="absolute top-1/4 left-1/4 w-1/2 bg-white p-6 shadow-lg z-10">
          <h2 className="text-xl font-bold">{blockTitle}</h2>
          <p>
            {/* Detailed content for each block */}
            This is where details for {blockTitle} will go.
          </p>
          <button
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            onClick={closeDetails}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default GameContainer;
