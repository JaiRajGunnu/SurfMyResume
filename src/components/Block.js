import React from 'react';

const Block = ({ title, onClick, style }) => {
  return (
    <div
      className="w-24 h-24 bg-yellow-500 rounded-lg absolute flex justify-center items-center cursor-pointer"
      style={style}
      onClick={onClick}
    >
      <span className="text-white font-bold">{title}</span>
    </div>
  );
};

export default Block;
