// Life.js

import React from "react";
import "../styles/SplashScreen.css";

const Life = ({ lifeLevel }) => {
  const lifeBlocks = Array.from({ length: 3 }, (_, i) =>
    i < lifeLevel ? "life-full" : "life-empty"
  );

  return (
    <div className="stats-icons">
      {lifeBlocks.map((block, index) => (
        <div key={index} className={block}></div>
      ))}
    </div>
  );
};

export default Life;