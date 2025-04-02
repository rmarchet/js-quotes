import React from 'react';

const DotPattern = ({ shape, commonStyle }) => {
  const { size, color, outlineColor, fillStyle, id } = shape;

  return (
          <div
            key={shape.id}
            className="dot-pattern"
            style={{
              ...commonStyle,
              backgroundColor: 'transparent',
              border: 'none',
              position: 'relative',
            }}
          >
            {[[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]].map((pos, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  width: `${shape.size / 8}px`,
                  height: `${shape.size / 8}px`,
                  borderRadius: '50%',
                  backgroundColor: shape.color,
                  border: `2px solid ${shape.outlineColor}`,
                  left: `${50 + pos[0] * 25}%`,
                  top: `${50 + pos[1] * 25}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              />
            ))}
          </div>
  );
}

export default DotPattern;
