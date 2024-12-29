import React from "react";
import "../styles/SplashScreen.css";

const Energy = ({ energy }) => {
  return (
    <div className="stats-icons">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className={index < energy ? "energy-full" : "energy-empty"}
        ></div>
      ))}
    </div>
  );
};

export default Energy;
