import React from 'react';

const ZigzagLine = ({ shape, commonStyle }) => {
  const { size, color, outlineColor, fillStyle, id } = shape;
  
  // Creiamo più segmenti di zigzag
  const segmentCount = 4; // Numero di "W" affiancate
  const segmentWidth = size / segmentCount;
  
  // Costruiamo i punti per un zigzag più lungo
  let points = `0,${size/6}`; // Punto iniziale
  
  // Per ogni segmento, aggiungiamo due punti che formano una "V"
  for (let i = 0; i < segmentCount; i++) {
    const startX = i * segmentWidth;
    const midX = startX + segmentWidth / 2;
    const endX = startX + segmentWidth;
    
    // Aggiungiamo un punto in basso (picco verso l'alto)
    points += ` ${midX},${size/12}`;
    
    // Se non è l'ultimo segmento, aggiungiamo un punto in alto (picco verso il basso)
    if (i < segmentCount - 1) {
      points += ` ${endX},${size/6}`;
    } else {
      // Per l'ultimo segmento, terminiamo alla stessa altezza di partenza
      points += ` ${endX},${size/6}`;
    }
  }

  const rotation = React.useRef(Math.random() * 360)
  
  return (
    <div
      className="zigzag-line"
      key={id}
      style={{
        ...commonStyle,
        backgroundColor: 'transparent',
        border: 'none',
        transform: `scaleX(.95) rotate(${rotation.current}deg)`, // compress the shape horizontally to make the angle of the zigzag more evident
      }}
    >
      <svg 
        width={size} 
        height={size/3} 
        viewBox={`0 0 ${size} ${size/3}`}
        style={{
          display: 'block',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <polyline 
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polyline 
          points={points}
          fill="none"
          stroke={outlineColor}
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.5"
          style={{ strokeDasharray: fillStyle === 'solid' ? '0' : (fillStyle === 'striped' ? '10 5' : '2 8') }}
        />
      </svg>
    </div>
  );
}

export default ZigzagLine;