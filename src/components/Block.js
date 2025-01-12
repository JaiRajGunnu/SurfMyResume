import React from "react";

const Block = ({ block, blockImage, isNegative, style }) => {
  return (
    <div
      className="block"
      style={{
        ...style,
        top: block.top,
        left: block.left,
        backgroundImage: isNegative ? style.backgroundImage : `url(${blockImage})`, // Use style.backgroundImage for negative blocks
        backgroundColor: isNegative ? "transparent" : "transparent", // Ensure background color is transparent
      }}
    >
      {/* Removed the block-label div */}
      {isNegative && <div className="block-label">{block.label}</div>}

    </div>
  );
};

export default Block;