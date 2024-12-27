import React, { useState } from "react";
import SplashScreen from "./components/SplashScreen";
import GameContainer from "./components/GameContainer";

const App = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [selectedSurfer, setSelectedSurfer] = useState(null);

  const handleStartGame = (surfer) => {
    setSelectedSurfer(surfer); // Set the selected surfer
    setIsGameStarted(true);
  };

  return (
    <div>
      {!isGameStarted ? (
        <SplashScreen onStart={handleStartGame} />
      ) : (
        <GameContainer selectedSurfer={selectedSurfer} />
      )}
    </div>
  );
};

export default App;
