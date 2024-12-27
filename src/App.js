import React, { useState } from "react";
import SplashScreen from "./components/SplashScreen";
import GameContainer from "./components/GameContainer";

const App = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [selectedSurfer, setSelectedSurfer] = useState(null);

  const handleStart = (surfer) => {
    setSelectedSurfer(surfer); // Save the selected surfer
    setIsGameStarted(true); // Start the game
  };

  return (
    <div className="app">
      {!isGameStarted ? (
        <SplashScreen onStart={handleStart} />
      ) : (
        <GameContainer selectedSurfer={selectedSurfer} />
      )}
    </div>
  );
};

export default App;
