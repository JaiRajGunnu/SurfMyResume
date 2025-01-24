import React, { useState, useEffect } from "react";
import SplashScreen from "./components/SplashScreen";
import GameContainer from "./components/GameContainer";
import { SpeedInsights } from "@vercel/speed-insights/react"

const App = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [selectedSurfer, setSelectedSurfer] = useState(null);

  const handleStartGame = (surfer) => {
    setSelectedSurfer(surfer);
    setIsGameStarted(true);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && (event.key === '+' || event.key === '=' || event.key === '-')) {
        event.preventDefault();
         document.body.style.zoom = "100%";
         document.documentElement.style.zoom = "100%";
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div>
      {!isGameStarted ? (
        <SplashScreen onStart={handleStartGame} />
      ) : (
        <GameContainer selectedSurfer={selectedSurfer} />
      )}
       <SpeedInsights />
    </div>
  );
};

export default App;