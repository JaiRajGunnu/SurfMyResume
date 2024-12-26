import React from "react";
import "../styles/App.css"; // Create a CSS file if needed

const Block = ({ block }) => {
  return (
    <div
      className="block"
      style={{ top: block.top, left: block.left }}
    >
      {block.label}
    </div>
  );
};

export default Block;
