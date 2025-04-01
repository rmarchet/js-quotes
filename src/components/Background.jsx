import React, { useEffect, useRef } from 'react';
import { useBackground } from '../hooks/useBackground';
import '../styles/Background.css';

export const Background = () => { 
  const canvasRef = useBackground();

  return (
    <div className="background-container">
      <canvas ref={canvasRef} className="background-canvas" />
    </div>
  );
};
