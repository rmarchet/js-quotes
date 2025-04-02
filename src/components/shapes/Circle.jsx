import React from 'react';

const Circle = ({ shape, commonStyle }) => {
  const { color, outlineColor, fillStyle, id } = shape;
  
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
  
  return (
    <div
      key={id}
      style={{
        ...commonStyle,
        backgroundColor,
        backgroundSize: fillStyle === 'dotted' ? '20px 20px' : 'auto',
        backgroundRepeat: fillStyle === 'dotted' ? 'repeat' : 'no-repeat',
        borderRadius: '50%',
        border: `3px solid ${outlineColor}`,
      }}
    />
  );
};

export default Circle;