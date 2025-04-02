import React from 'react';

const Triangle = ({ shape, commonStyle }) => {
  const { size, color, outlineColor, fillStyle, id } = shape;
  
  return (
    <div
      key={id}
      style={{
        ...commonStyle,
        backgroundColor: 'transparent',
        border: 'none',
      }}
    >
      <svg 
        width={size} 
        height={size} 
        viewBox={`0 0 ${size} ${size}`}
        style={{
          display: 'block',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <polygon 
          points={`${size/2},0 ${size},${size} 0,${size}`}
          fill={fillStyle === 'solid' ? color : `url(#pattern-${id})`}
          stroke={outlineColor}
          strokeWidth="3"
        />
        {fillStyle !== 'solid' && (
          <defs>
            <pattern 
              id={`pattern-${id}`}
              patternUnits="userSpaceOnUse"
              width="10"
              height="10"
              patternTransform="rotate(45)"
            >
              {fillStyle === 'striped' ? (
                <line 
                  x1="0" y1="0" x2="0" y2="10" 
                  stroke={color} 
                  strokeWidth="4"
                />
              ) : (
                <circle cx="5" cy="5" r="2" fill={color} />
              )}
            </pattern>
          </defs>
        )}
      </svg>
    </div>
  );
};

export default Triangle;