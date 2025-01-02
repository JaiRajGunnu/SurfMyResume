// Energy.js

import React from "react";
import "../styles/SplashScreen.css";

const Energy = ({ energyLevel }) => {
  const energyBlocks = Array.from({ length: 3 }, (_, i) =>
    i < energyLevel ? "energy-full" : "energy-empty"
  );

  return (
    <div className="stats-icons">
      {energyBlocks.map((block, index) => (
        <div key={index} className={block}></div>
      ))}
    </div>
  );
};

export default Energy;
