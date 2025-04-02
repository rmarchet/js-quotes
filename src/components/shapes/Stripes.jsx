import React from 'react';

export const Stripes = ({ shape, commonStyle }) => {
  // Utilizziamo div separati per le strisce
  const stripes = [];
  const stripeCount = 7;
  const stripeWidth = shape.size / stripeCount;
  
  for (let i = 0; i < stripeCount; i++) {
    stripes.push(
      <div
        key={i}
        style={{
          position: 'absolute',
          left: `${(i * stripeWidth)}px`,
          top: '0',
          width: `${stripeWidth}px`,
          height: '100%',
          backgroundColor: i === 0 || i === stripeCount -1 || i === 3
            ? shape.color
            : 'transparent',
        }}
      />
    );
  }
  
  return (
    <div
      className="stripes"
      key={shape.id}
      style={{
        ...commonStyle,
        background: 'transparent',
        border: 'none',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {stripes}
    </div>
  );

}

export default Stripes;
