import React, { useState, useEffect } from 'react';

const Surfer = ({ onCollide }) => {
  const [position, setPosition] = useState({ x: 50, y: 50 });

  const moveSurfer = (e) => {
    if (e.key === 'ArrowUp') {
      setPosition((prev) => ({ ...prev, y: prev.y - 10 }));
    } else if (e.key === 'ArrowDown') {
      setPosition((prev) => ({ ...prev, y: prev.y + 10 }));
    } else if (e.key === 'ArrowLeft') {
      setPosition((prev) => ({ ...prev, x: prev.x - 10 }));
    } else if (e.key === 'ArrowRight') {
      setPosition((prev) => ({ ...prev, x: prev.x + 10 }));
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', moveSurfer);

    return () => {
      window.removeEventListener('keydown', moveSurfer);
    };
  }, []);

  useEffect(() => {
    onCollide(position);
  }, [position, onCollide]);

  return (
    <div
      className="w-12 h-12 bg-blue-500 rounded-full absolute"
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    />
  );
};

export default Surfer;
