import React from "react";
import "../styles/GamePage.css";

const GamePage = ({ selectedSurfer }) => {
  return (
    <div className="game-page">
      <h1>Game Started!</h1>
      <div className="surfer-container">
        <img
          src={selectedSurfer}
          alt="Selected Surfer"
          className="game-surfer"
        />
      </div>
      {/* Add game logic here */}
    </div>
  );
};

export default GamePage;
