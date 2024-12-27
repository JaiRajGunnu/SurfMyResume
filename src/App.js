import React, { useState } from "react";
import SplashScreen from "./components/SplashScreen";
import GameContainer from "./components/GameContainer";

const App = () => {
  const [selectedSurfer, setSelectedSurfer] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = (surfer) => {
    setSelectedSurfer(surfer); // Store the selected surfer
    setGameStarted(true); // Move to the game page
  };

  return (
    <div>
      {!gameStarted ? (
        <SplashScreen onStart={handleStartGame} />
      ) : (
        <GameContainer selectedSurfer={selectedSurfer} />
      )}
    </div>
  );
};

export default App;
