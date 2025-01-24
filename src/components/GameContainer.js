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
import RocksImage from "../images/objects.png"; // Import the objects image
import Life from "./Life";
import Energy from "./Energy";

const GameContainer = ({ selectedSurfer }) => {
  const [surferPosition, setSurferPosition] = useState({ top: 30, left: 730 });
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
  const [showBorders, setShowBorders] = useState(false);

  const screenHeight = window.innerHeight;
  const screenWidth = window.innerWidth;

  const [surferSpeed, setSurferSpeed] = useState(1);
  const [prevPosition, setPrevPosition] = useState({ top: 30, left: 730 });

  // Initialize blocks (including negative blocks)
  useEffect(() => {
    const initialBlocks = [
        { id: 1, label: "About Me", top: 125, left: 15, image: block1 },
      { id: 2, label: "Education", top: 125, left: 850, image: block2 },
      { id: 3, label: "Skills", top: 652, left: 80, image: block3 },
      { id: 4, label: "Projects", top: 542, left: 900, image: block4 },
      { id: 5, label: "Certifications", top: 1080, left: 50, image: block5 },
      { id: 6, label: "Volunteer Experience", top: 1010, left: 880, image: block6 },
      // Negative blocks
      {
        id: 7,
        label: "No.1",
        top: 170,
        left: 685,
        backgroundPosition: "-700px 445px",
        backgroundImage: `url(${RocksImage})`,
        marginInlineEnd: "2px",
        backgroundSize: "1920px 512px",
        opacity: 10,
        isNegative: true,
        width: 68,
        height: 62,
      },
      {
        id: 8,
        label: "No.2",
        top: 650,
        left: 600,
        height: 70,
        backgroundPosition: "-123px 445px",
        backgroundImage: `url(${RocksImage})`,
        marginInlineEnd: "2px",
        backgroundSize: "1920px 512px",
        isNegative: true,
        width: 60,
        height: 65,
      },
      {
        id: 9,
        label: "No.3",
        top: 656,
        left: 234,
        backgroundPosition: "-448px 445px",
        backgroundImage: `url(${RocksImage})`,
        marginInlineEnd: "2px",
        backgroundSize: "1920px 504px",
        isNegative: true,
        width: 60,
        height: 65,
      },
      // Additional negative blocks
      {
        id: 10,
        label: "No.4",
        top: 860,
        left: 874,
        backgroundPosition: "-318px 435px",
        backgroundImage: `url(${RocksImage})`,
        marginInlineEnd: "2px",
        backgroundSize: "1920px 500px",
        isNegative: true,
        width: 70,
        height: 70,
      },
      {
        id: 11,
        label: "No.5",
        top: 1090,
        left: 650,
        backgroundPosition: "-765px 436px",
        backgroundImage: `url(${RocksImage})`,
        marginInlineEnd: "2px",
        backgroundSize: "1920px 500px",
        isNegative: true,
        width: 68,
        height: 62,
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
        width: 68,
        height: 62,
      },
      {
        id: 13,
        label: "No.7",
        top: 1400,
        left: 1680,
        backgroundPosition: "-510px 505px",
        backgroundImage: `url(${RocksImage})`,
        marginInlineEnd: "2px",
        backgroundSize: "1920px 509px",
        isNegative: true,
        width: 68,
        height: 62,
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
        width: 68,
        height: 62,
      },
      {
        id: 15,
        label: "No.9",
        top: 1100,
        left: 167,
        backgroundPosition: "-700px 506px",
        backgroundImage: `url(${RocksImage})`,
        marginInlineEnd: "2px",
        backgroundSize: "1920px 512px",
        isNegative: true,
        width: 68,
        height: 62,
      },
      {
        id: 16,
        label: "No.10",
        top: 1300,
        left: 870,
        backgroundPosition: "-835px 509px",
        backgroundImage: `url(${RocksImage})`,
        marginInlineEnd: "2px",
        backgroundSize: "1920px 512px",
        isNegative: true,
        width: 68,
        height: 62,
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
        width: 68,
        height: 62,
      },
      {
        id: 18,
        label: "No.12",
        top: 840,
        left: 7,
        width: 134,
        height: 75,
        backgroundPosition: "-251px 450px",
        backgroundImage: `url(${RocksImage})`,
        marginInlineEnd: "2px",
        backgroundSize: "1920px 512px",
        isNegative: true,
        width: 60,
        height: 62,
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
        width: 60,
        height: 62,
      },
    ];
    setBlocks(initialBlocks);
  }, []);

      // Check if surfer has crossed all six default blocks
    useEffect(() => {
        const lastDefaultBlock = blocks.find((block) => block.id === 6); // Volunteer Exp. block
        if (lastDefaultBlock && surferPosition.top > lastDefaultBlock.top + 350) {
            // Reset surfer position to the top
            setSurferPosition({ top: 30, left: 730 });
            setCameraOffset({ top: 0, left: 0 });
        }
    }, [surferPosition, blocks]);

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
                setIsPaused(true);
              }
              return updatedLife;
            });
          }

          return newDistance;
        });

        return { ...prev, top: newTop };
      });
    }, 50);

    return () => clearInterval(autoSurfDown);
  }, [screenHeight, isPaused, highestDistance, surferSpeed, prevPosition]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === " ") {
        if (collisionBlock || showRefillPrompt) {
          return;
        }
        setIsPaused((prev) => !prev);
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
  }, [screenHeight, screenWidth, isPaused, collisionBlock, showRefillPrompt]);

  // Handle collisions
  useEffect(() => {
    const checkCollisions = () => {
      blocks.forEach((block) => {
           const blockWidth = block.isNegative ? block.width : (block.id === 1 || block.id === 2 ? 600 : 500);
            const blockHeight = block.isNegative ? block.height : (block.id === 1 || block.id === 2 ? 350 : 233);
        if (
          surferPosition.left + 50 > block.left &&
          surferPosition.left < block.left + blockWidth &&
          surferPosition.top + 50 > block.top &&
          surferPosition.top < block.top + blockHeight
        ) {
          if(block.isNegative) {
              setIsBlinking(true);
              setTimeout(() => {
                  setIsBlinking(false);
              }, 3000);
          } else {
               setIsBlinking(true);
               setIsPaused(true);

                 setDirection("main");
                setSurferPosition((prev) => ({ ...prev, left: 730 }));

                setTimeout(() => {
                    setIsBlinking(false);
                    setCollisionBlock(block.label);
                    setEscapeDistance(distance + 100);
                }, 3000);
          }
        }
      });
    };

    checkCollisions();
  }, [surferPosition, blocks, distance]);

  // Handle escape distance
  useEffect(() => {
    if (escapeDistance > 0 && distance >= escapeDistance) {
      setIsPaused(false);
      setEscapeDistance(0);
    }
  }, [distance, escapeDistance]);

  // Close collision overlay
  const closeCollisionOverlay = () => {
    setCollisionBlock(null);
    setIsPaused(false);
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
        setIsPaused(true);
      } else {
        setIsTabVisible(true);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [collisionBlock, showRefillPrompt]);

    const toggleBorders = () => {
        setShowBorders(prev => !prev);
    };

  return (
    <div className={`game-container ${isPaused ? "paused" : ""} ${showBorders ? " show-borders" : ""}`}>
      <div id="game-gradient"></div>
      <div id="game-bg"></div>
        <div className="toggle-container">
            <label className="switch small-switch">
                <input type="checkbox" checked={showBorders} onChange={toggleBorders} />
                <span className="slider round"></span>
            </label>
            <span className="toggle-text">High Visibility</span>
        </div>
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
          onClose={() => setIsPaused(false)}
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
            width: isNegative ? "68px" : block.width || "500px",
            height: isNegative ? "62px" : block.height || "233px",
            marginInlineEnd: isNegative ? "2px" : "0",
            backgroundSize: isNegative ? "1920px 512px" : "cover",
            zoom: isNegative ? "0.80" : "1",
            opacity: isNegative ? 0.9 : undefined,
            backgroundPosition: isNegative ? block.backgroundPosition : "center",
            backgroundImage: isNegative ? block.backgroundImage : `url(${RocksImage})`,
        };

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