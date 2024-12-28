// Block.js

import React from "react";

const Block = ({ block, blockImage }) => {
  return (
    <div
      className="block"
      style={{
        top: block.top,
        left: block.left,
        backgroundImage: `url(${blockImage})`, // Dynamically set the background image
      }}
    >
      {block.label}
    </div>
  );
};

export default Block;
