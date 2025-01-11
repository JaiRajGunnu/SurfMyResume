import React, { useState, useEffect } from "react";
import Block from "./Block";
import Surfer from "./Surfer";
import CollisionOverlay from "./CollisionOverlay";
import DefaultOverlay from "./DefaultOverlay";
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
  const [direction, setDirection] = useState("main"); // Default direction
  const [isPaused, setIsPaused] = useState(false);
  const [distance, setDistance] = useState(0);
  const [highestDistance, setHighestDistance] = useState(() => {
    return parseInt(localStorage.getItem("highestDistance"), 10) || 0;
  });
  const [energyLevel, setEnergyLevel] = useState(3);
  const [lifeLevel, setLifeLevel] = useState(3);
  const [showRefillPrompt, setShowRefillPrompt] = useState(false);
  const [buttonText, setButtonText] = useState("SPACEBAR");
  const [escapeDistance, setEscapeDistance] = useState(0);
  const [isTabVisible, setIsTabVisible] = useState(true);
  const [isBlinking, setIsBlinking] = useState(false);

  const screenHeight = window.innerHeight;
  const screenWidth = window.innerWidth;

  const [surferSpeed, setSurferSpeed] = useState(1);
  const [prevPosition, setPrevPosition] = useState({ top: 15, left: 735 });

  // Initialize blocks
  useEffect(() => {
    const initialBlocks = [
      { id: 1, label: "About Me", top: 125, left: 15, image: block3 },
      { id: 2, label: "Education", top: 125, left: 850, image: block4 },
      { id: 3, label: "Skills", top: 652, left: 80, image: block1 },
      { id: 4, label: "Projects", top: 542, left: 900, image: block2 },
      { id: 5, label: "Certifications", top: 1080, left: 50, image: block5 },
      { id: 6, label: "Volunteer Exp.", top: 1010, left: 880, image: block6 },
    ];
    setBlocks(initialBlocks);
  }, []);

  // Function to generate random blocks
  const generateRandomBlocks = (lastBlockTop) => {
    const newBlocks = [];
    const blockImages = [block1, block2, block3, block4, block5, block6];
    const labels = ["Random Block 1", "Random Block 2", "Random Block 3", "Random Block 4", "Random Block 5"];
    const minimumGap = 200;

    for (let i = 0; i < 3; i++) {
      let validPosition = false;
      let randomTop, randomLeft;

      while (!validPosition) {
        randomLeft = Math.random() * (screenWidth - 100);
        randomTop = lastBlockTop + 300 + i * 200;

        validPosition = newBlocks.every((block) => {
          return (
            Math.abs(randomTop - block.top) >= minimumGap &&
            Math.abs(randomLeft - block.left) >= minimumGap
          );
        });
      }

      const randomImage = blockImages[Math.floor(Math.random() * blockImages.length)];
      const randomLabel = labels[Math.floor(Math.random() * labels.length)];

      newBlocks.push({
        id: Date.now() + i,
        label: randomLabel,
        top: randomTop,
        left: randomLeft,
        image: randomImage,
        isRandom: true, // Mark as random block
      });
    }

    return newBlocks;
  };

  // Handle auto-surfing
  useEffect(() => {
    if (isPaused) return;

    const autoSurfDown = setInterval(() => {
      setSurferPosition((prev) => {
        const newTop = prev.top + surferSpeed;

        const speedChange = Math.abs(prev.top - prevPosition.top);
        setPrevPosition({ top: prev.top, left: prev.left });

        setSurferSpeed((prevSpeed) => {
          const newSpeed = speedChange / 10;
          return Math.max(newSpeed, 1);
        });

        setCameraOffset((prevOffset) => ({
          top: prevOffset.top + surferSpeed * 0.5,
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

          if (newDistance % 500 === 0) {
            const lastBlock = blocks[blocks.length - 1];
            const newBlocks = generateRandomBlocks(lastBlock.top);
            setBlocks((prevBlocks) => [...prevBlocks, ...newBlocks]);
          }

          return newDistance;
        });

        return { ...prev, top: newTop };
      });
    }, 50);

    return () => clearInterval(autoSurfDown);
  }, [screenHeight, isPaused, highestDistance, surferSpeed, blocks]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === " ") {
        if (collisionBlock || showRefillPrompt) {
          return; // Do not toggle pause state if collision or refill overlay is active
        }
        setIsPaused((prev) => !prev); // Toggle pause state
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

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [screenHeight, screenWidth, isPaused, collisionBlock, showRefillPrompt]);

  // Handle collisions
  useEffect(() => {
    const checkCollisions = () => {
      blocks.forEach((block) => {
        const blockWidth = block.id === 1 || block.id === 2 ? 600 : 500;
        const blockHeight = block.id === 1 || block.id === 2 ? 350 : 233;

        if (
          surferPosition.left + 50 > block.left &&
          surferPosition.left < block.left + blockWidth &&
          surferPosition.top + 50 > block.top &&
          surferPosition.top < block.top + blockHeight
        ) {
          setIsBlinking(true); // Start blinking
          setIsPaused(true); // Pause the game immediately

          // Immediately shift the surfer to the default left position
          setSurferPosition((prev) => ({ ...prev, left: 735 }));

          // Reset direction to "main" (default direction)
          setDirection("main");

          // Delay the display of the collision overlay until blinking is complete
          setTimeout(() => {
            setIsBlinking(false); // Stop blinking
            if (!block.isRandom) {
              setCollisionBlock(block.label); // Show collision overlay for non-random blocks
              setEscapeDistance(distance + 100);
            }
          }, 3000); // Blinking lasts for 3 seconds
        }
      });
    };

    checkCollisions();
  }, [surferPosition, blocks]);

  // Handle escape distance
  useEffect(() => {
    if (escapeDistance > 0 && distance >= escapeDistance) {
      setIsPaused(false); // Resume the game
      setEscapeDistance(0);
    }
  }, [distance, escapeDistance]);

  // Close collision overlay
  const closeCollisionOverlay = () => {
    setCollisionBlock(null);
    setIsPaused(false); // Resume the game after closing the collision overlay
  };

  // Handle energy refill
  const handleRefill = () => {
    setEnergyLevel(3);
    setShowRefillPrompt(false);
    setIsPaused(false);
  };

  // Handle tab visibility
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsTabVisible(false);
        setIsPaused(true); // Pause the game when the tab is hidden
      } else {
        setIsTabVisible(true);
        // Do not unpause automatically when the tab becomes visible
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [collisionBlock, showRefillPrompt]);

  return (
    <div className={`game-container ${isPaused ? "paused" : ""}`}>
      <div id="game-gradient"></div>
      <div id="game-bg"></div>
      <div className="dashboard">
        <Life lifeLevel={lifeLevel} />
        <div className="distance-display">{distance} m</div>
        <Energy energyLevel={energyLevel} />
      </div>
      {collisionBlock && (
        <CollisionOverlay blockName={collisionBlock} onClose={closeCollisionOverlay} />
      )}
      {showRefillPrompt && (
        <CollisionOverlay
          blockName="Energy"
          onClose={handleRefill}
          customMessage="Your energy is ruined out. So, refill now."
          showRefillInstruction={true}
        />
      )}
      {isPaused && !collisionBlock && !showRefillPrompt && !isBlinking && (
        <DefaultOverlay
          onClose={() => setIsPaused(false)} // Resume the game when spacebar is pressed
          buttonText={buttonText}
          isTabVisible={isTabVisible}
        />
      )}
      <Surfer
        position={{
          top: surferPosition.top - cameraOffset.top,
          left: surferPosition.left - cameraOffset.left,
        }}
        direction={direction}
        selectedSurfer={selectedSurfer}
        isBlinking={isBlinking}
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
              width: isBlock1Or2 ? "600px" : "500px",
              height: isBlock1Or2 ? "350px" : "233px",
            }}
          />
        );
      })}
    </div>
  );
};

export default GameContainer;