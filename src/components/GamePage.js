import React, { useState } from "react";
import SplashScreen from "./SplashScreen";
import Surfer from "./Surfer";
import "../styles/Game.css";

const Game = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedSurfer, setSelectedSurfer] = useState(1); // Default to 1

  const handleStart = (surfer) => {
    setSelectedSurfer(surfer); // Update selected surfer
    setGameStarted(true);
  };

  return (
    <div className="game-container">
      {!gameStarted ? (
        <SplashScreen onStart={handleStart} />
      ) : (
        <div className="game">
          <Surfer
            position={{ top: "50%", left: "50%" }}
            selectedSurfer={selectedSurfer}
            direction="main"
          />
          {/* Add other game components like obstacles, score, etc. */}
        </div>
      )}
    </div>
  );
};

export default Game;
