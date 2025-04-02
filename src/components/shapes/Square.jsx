import React from 'react';

const Square = ({ shape, commonStyle }) => {
  const { color, outlineColor, isSquare, fillStyle, id } = shape;
  
  const rotation = React.useRef(Math.random() * 360)
  
  // Stile per il pattern di riempimento
  let backgroundColor = color;
  if (fillStyle === 'striped') {
    backgroundColor = `repeating-linear-gradient(
      45deg,
      ${color},
      ${color} 4px,
      transparent 4px,
      transparent 8px
    )`;
  } else if (fillStyle === 'dotted') {
    backgroundColor = `radial-gradient(
      circle at 5px 5px,
      ${color} 3px,
      transparent 4px
    )`;
    backgroundColor = `${backgroundColor}, radial-gradient(
      circle at 15px 15px,
      ${color} 3px,
      transparent 4px
    )`;
    backgroundColor = `${backgroundColor}, transparent`;
  } 
  return isSquare ? (
    <div
      className="square"
      key={id}
      style={{
        ...commonStyle,
        backgroundColor,
        backgroundSize: fillStyle === 'dotted' ? '20px 20px' : 'auto',
        backgroundRepeat: fillStyle === 'dotted' ? 'repeat' : 'no-repeat',
        border: `3px solid ${outlineColor}`,
      }}
    />
  ) : (
    <div
      className="diamond"
      key={id}
      style={{
        ...commonStyle,
        backgroundColor: 'transparent',
        border: 'none',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: '0',
          backgroundColor,
          borderRadius: '10px',
          backgroundSize: fillStyle === 'dotted' ? '20px 20px' : 'auto',
          backgroundRepeat: fillStyle === 'dotted' ? 'repeat' : 'no-repeat',
          border: `3px ${fillStyle === 'solid' ? 'solid' : 'dashed'} ${outlineColor}`,
        }}
      />
    </div>
  )
}

export default Square;