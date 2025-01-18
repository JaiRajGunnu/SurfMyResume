import React, { useState, useEffect } from "react";
import Block from "./Block";
import Surfer from "./Surfer";
import CollisionOverlay from "./CollisionOverlay";
import DefaultOverlay from "./DefaultOverlay";
import "../styles/App.css";
import block1 from "../images/islands/islblock1.png";
import block2 from "../images/islands/islblock2.png";
import block3 from "../images/islands/islblock3.png";
import block4 from "../images/islands/islblock4.png";
import block5 from "../images/islands/islblock5.png";
import block6 from "../images/islands/islblock6.png";
import ranblk1 from "../images/random/islbkl1.png";
import ranblk2 from "../images/random/islbkl2.png";
import ranblk3 from "../images/random/islbkl3.png";
import ranblk4 from "../images/random/islbkl4.png";
import ranblk5 from "../images/random/islbkl5.png";
import ranblk6 from "../images/random/islbkl6.png";
import ranblk7 from "../images/random/islbkl7.png";
import RocksImage from "../images/objects.png"; // Import the objects image
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

  // Initialize blocks (including negative blocks)
  useEffect(() => {
    const initialBlocks = [
      { id: 1, label: "About Me", top: 125, left: 15, image: block1 },
      { id: 2, label: "Education", top: 125, left: 850, image: block2 },
      { id: 3, label: "Skills", top: 652, left: 80, image: block3 },
      { id: 4, label: "Projects", top: 542, left: 900, image: block4 },
      { id: 5, label: "Certifications", top: 1080, left: 50, image: block5 },
      { id: 6, label: "Volunteer Exp.", top: 1010, left: 880, image: block6 },
      // Negative blocks
      {
        id: 7,
        label: "No.1",
        top: 320,
        left: 785,
        backgroundPosition: "-318px 435px",
        backgroundImage: `url(${RocksImage})`,
        marginInlineEnd: "2px",
        backgroundSize: "1920px 512px",
        isNegative: true,
      },
      {
        id: 8,
        label: "No.2",
        top: 650,
        left: 550,
        height: 70,
        backgroundPosition: "-130px 445px",
        backgroundImage: `url(${RocksImage})`,
        marginInlineEnd: "2px",
        backgroundSize: "1920px 512px",
        isNegative: true,
      },
      {
        id: 9,
        label: "No.3",
        top: 576,
        left: 234,
        backgroundPosition: "-448px 445px",
        backgroundImage: `url(${RocksImage})`,
        marginInlineEnd: "2px",
        backgroundSize: "1920px 504px",
        isNegative: true,
      },
      // Additional negative blocks
      {
        id: 10,
        label: "No.4",
        top: 760,
        left: 874,
        backgroundPosition: "-770px 435px",
        backgroundImage: `url(${RocksImage})`,
        marginInlineEnd: "2px",
        backgroundSize: "1920px 500px",
        isNegative: true,
      },
      {
        id: 11,
        label: "No.5",
        top: 990,
        left: 850,
        backgroundPosition: "-700px 445px",
        backgroundImage: `url(${RocksImage})`,
        marginInlineEnd: "2px",
        backgroundSize: "1920px 500px",
        isNegative: true,
      },
      {
        id: 12,
        label: "No.6",
        top: 950,
        left: 1200,
        height: 75,
        backgroundPosition: "-832px 448px",
        backgroundImage: `url(${RocksImage})`,
        marginInlineEnd: "2px",
        backgroundSize: "1920px 512px",
        isNegative: true,
      },
      {
        id: 13,
        label: "No.7",
        top: 1060,
        left: 580,
        backgroundPosition: "-510px 505px",
        backgroundImage: `url(${RocksImage})`,
        marginInlineEnd: "2px",
        backgroundSize: "1920px 512px",
        isNegative: true,
      },
      {
        id: 14,
        label: "No.8",
        top: 980,
        left: 1550,
        backgroundPosition: "-190px 435px",
        backgroundImage: `url(${RocksImage})`,
        marginInlineEnd: "2px",
        backgroundSize: "1920px 512px",
        isNegative: true,
      },
      {
        id: 15,
        label: "No.9",
        top: 1050,
        left: 167,
        backgroundPosition: "-700px 500px",
        backgroundImage: `url(${RocksImage})`,
        marginInlineEnd: "2px",
        backgroundSize: "1920px 512px",
        isNegative: true,
      },
      {
        id: 16,
        label: "No.10",
        top: 1300,
        left: 870,
        backgroundPosition: "-835px 500px",
        backgroundImage: `url(${RocksImage})`,
        marginInlineEnd: "2px",
        backgroundSize: "1920px 512px",
        isNegative: true,
      },
      {
        id: 17,
        label: "No.11",
        top: 700,
        left: 1800,
        backgroundPosition: "-383px 496px",
        backgroundImage: `url(${RocksImage})`,
        marginInlineEnd: "2px",
        backgroundSize: "1920px 512px",
        isNegative: true,
      },
      {
        id: 18,
        label: "No.12",
        top: 840,
        left: 7,
        width: 134,
        height: 75,
        backgroundPosition: "-253px 450px",
        backgroundImage: `url(${RocksImage})`,
        marginInlineEnd: "2px",
        backgroundSize: "1920px 512px",
        isNegative: true,
      },
      {
        id: 19,
        label: "No.13",
        top: 1156,
        left: 1782,
        backgroundPosition: "-383px 435px",
        backgroundImage: `url(${RocksImage})`,
        marginInlineEnd: "2px",
        backgroundSize: "1920px 512px",
        isNegative: true,
      },
    ];
    setBlocks(initialBlocks);
  }, []);

  // Function to generate random blocks
  const generateRandomBlocks = (lastBlockTop) => {
    const newBlocks = [];
    const blockImages = [ranblk1, ranblk2, ranblk3, ranblk4, ranblk5, ranblk6, ranblk7]; // Use random block images
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
            setLifeLevel((prevLife) => {
              const updatedLife = Math.max(prevLife - 1, 0);
              if (updatedLife === 0) {
                setIsPaused(true); // game over if lives are out
              }
              return updatedLife;
            });
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
  }, [screenHeight, isPaused, highestDistance, surferSpeed, blocks, prevPosition]);

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

    const handleKeyUp = (e) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        setDirection("main"); // Reset direction to "main" when arrow keys are released
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [screenHeight, screenWidth, isPaused, collisionBlock, showRefillPrompt]);

  // Handle collisions
  useEffect(() => {
    const checkCollisions = () => {
      blocks.forEach((block) => {
        const blockWidth = block.isNegative ? 50 : block.id === 1 || block.id === 2 ? 600 : 500;
        const blockHeight = block.isNegative ? 50 : block.id === 1 || block.id === 2 ? 350 : 233;

        if (
          surferPosition.left + 50 > block.left &&
          surferPosition.left < block.left + blockWidth &&
          surferPosition.top + 50 > block.top &&
          surferPosition.top < block.top + blockHeight
        ) {
          if (block.isNegative) {
            setIsBlinking(true); // Start blinking for negative blocks
            setIsPaused(true); // Pause the game immediately

            setTimeout(() => {
              setIsBlinking(false); // Stop blinking after 2-3 seconds

              // Reset the game state
              setSurferPosition({ top: 15, left: 735 }); // Reset surfer position
              setCameraOffset({ top: 0, left: 0 }); // Reset camera offset
              setDistance(0); // Reset distance
              setEnergyLevel(3); // Reset energy level
              setLifeLevel(3); // Reset life level
              setCollisionBlock(null); // Clear collision block
              setShowRefillPrompt(false); // Clear refill prompt
              setIsPaused(false); // Resume the game
            }, 3000); // Blinking lasts for 3 seconds
          } else {
            setIsBlinking(true); // Start blinking
            setIsPaused(true); // Pause the game immediately

            // Reset direction to "main" (default direction)
            setDirection("main");

            // Only reset surfer position for non-random blocks
            if (!block.isRandom) {
              setSurferPosition((prev) => ({ ...prev, left: 735 }));
            }

            // Delay the display of the collision overlay until blinking is complete
            setTimeout(() => {
              setIsBlinking(false); // Stop blinking
              if (!block.isRandom) {
                setCollisionBlock(block.label); // Show collision overlay for non-random blocks
                setEscapeDistance(distance + 100);
              } else {
                setIsPaused(false); // Resume the game for random blocks
              }
            }, 3000); // Blinking lasts for 3 seconds
          }
        }
      });
    };

    checkCollisions();
  }, [surferPosition, blocks, distance]);

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
        const isNegative = block.isNegative;
        const blockStyles = {
          width: isNegative ? "68px" : block.width || "500px", // Default width for random blocks
          height: isNegative ? "62px" : block.height || "233px", // Default height for random blocks
          marginInlineEnd: isNegative ? "2px" : "0",
          backgroundSize: isNegative ? "1920px 512px" : "cover",
          zoom: isNegative ? "0.80" : "1",
          backgroundPosition: isNegative ? block.backgroundPosition : "center",
          backgroundImage: isNegative ? block.backgroundImage : `url(${RocksImage})`,
        };

        // Apply specific widths and heights for non-random blocks
        if (!block.isRandom && !isNegative) {
          switch (block.id) {
            case 1:
              blockStyles.width = "600px";
              blockStyles.height = "400px";
              break;
            case 2:
              blockStyles.width = "600px";
              blockStyles.height = "385px";
              break;
            case 3:
              blockStyles.width = "500px";
              blockStyles.height = "330px";
              break;
            case 4:
              blockStyles.width = "445px";
              blockStyles.height = "295px";
              break;
            case 5:
              blockStyles.width = "600px";
              blockStyles.height = "400px";
              break;
            case 6:
              blockStyles.width = "500px";
              blockStyles.height = "350px";
              break;
            default:
              break;
          }
        }

        return (
          <Block
            key={block.id}
            block={{
              ...block,
              top: block.top - cameraOffset.top,
              left: block.left - cameraOffset.left,
            }}
            blockImage={block.image}
            isNegative={isNegative}
            style={blockStyles}
          />
        );
      })}
    </div>
  );
};

export default GameContainer;