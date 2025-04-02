import React, { useEffect, useRef } from 'react'
import { useBackground } from '../hooks/useBackground'
import '../styles/Background.css'

export const Background = () => {
  const { containerRef, shapes, renderShape } = useBackground(50, 10)

  return (
    <div ref={containerRef} className="background-jsx-container">
      <div className="grid-overlay"></div>
      {shapes.map(shape => renderShape(shape))}
    </div>
  )
}
