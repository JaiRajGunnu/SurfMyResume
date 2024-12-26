import React, { useState } from "react";
import SplashScreen from "./components/SplashScreen";
import GameContainer from "./components/GameContainer";

const App = () => {
  const [gameStarted, setGameStarted] = useState(false);

  const handleStart = () => {
    setGameStarted(true);
  };

  return (
    <div>
      {!gameStarted ? (
        <SplashScreen onStart={handleStart} />
      ) : (
        <GameContainer />
      )}
    </div>
  );
};

export default App;
