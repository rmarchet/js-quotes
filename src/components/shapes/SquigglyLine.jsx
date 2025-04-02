import React from 'react';

const SquigglyLine = ({ shape, commonStyle }) => {
  const { size, color, outlineColor, fillStyle, id } = shape;
  
  return (
    <div
      key={shape.id}
      className="squiggly-line"
      style={{
        ...commonStyle,
        height: `${shape.size / 4}px`,
        backgroundColor: 'transparent',
        border: 'none',
      }}
    >
      <svg 
        width={shape.size} 
        height={shape.size/4} 
        viewBox={`0 0 ${shape.size} ${shape.size/4}`}
      >
        <path 
          d={`M0,${shape.size/8} 
              C${shape.size/6},${shape.size/20} 
              ${shape.size/6},${shape.size/5} 
              ${shape.size/3},${shape.size/8} 
              C${shape.size/2},${shape.size/20} 
              ${shape.size/2},${shape.size/5} 
              ${(shape.size/3)*2},${shape.size/8}
              C${(shape.size/6)*5},${shape.size/20} 
              ${(shape.size/6)*5},${shape.size/5} 
              ${shape.size},${shape.size/8}`}
          fill="none"
          stroke={shape.color}
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path 
          d={`M0,${shape.size/8} 
              C${shape.size/6},${shape.size/20} 
              ${shape.size/6},${shape.size/5} 
              ${shape.size/3},${shape.size/8} 
              C${shape.size/2},${shape.size/20} 
              ${shape.size/2},${shape.size/5} 
              ${(shape.size/3)*2},${shape.size/8}
              C${(shape.size/6)*5},${shape.size/20} 
              ${(shape.size/6)*5},${shape.size/5} 
              ${shape.size},${shape.size/8}`}
          fill="none"
          stroke={shape.outlineColor}
          strokeWidth="6"
          strokeLinecap="round"
          strokeOpacity="0.5"
          style={{ strokeDasharray: '0 1000'}}
        />
      </svg>
    </div>
  );
}

export default SquigglyLine;
