import React, { useState, useEffect, useRef } from 'react'
import Square from '../components/shapes/Square';
import Circle from '../components/shapes/Circle';
import Triangle from '../components/shapes/Triangle';
import ZigzagLine from '../components/shapes/ZigzagLine';
import Semicircle from '../components/shapes/Semicircle';
import SquigglyLine from '../components/shapes/SquigglyLine';
import DotPattern from '../components/shapes/DotPattern';
import Stripes from '../components/shapes/Stripes';
import { lightenColor } from '../utils/colorUtils';

export const useBackground = (shapeCount = 50, patternCount = 10) => {
  // Stato per memorizzare le forme
  const [shapes, setShapes] = useState([]);
  const [patternElements, setPatternElements] = useState([]);
  
  // Ref per tracciare la posizione del mouse
  const mouseRef = useRef({ x: 0, y: 0 });
  
  // Ref per il container, per ottenere dimensioni
  const containerRef = useRef(null);
  
  // Ref per l'animation frame
  const animationFrameIdRef = useRef(null);

  // Memphis style 80s colors
  const colors = [
    '#FF00FF', // Magenta
    '#00FFFF', // Cyan
    '#FFFF00', // Yellow
    '#FF1493', // Deep Pink
    '#00FF00', // Lime
    '#FF4500', // Orange Red
    '#14F0F0', // Light Blue
    '#FFA500', // Orange
  ];

  let nextId = 0;

  // Funzione per generare un ID unico
  const generateUniqueId = (prefix) => {
    return `${prefix}_${nextId++}`;
  };

  // Genera una forma random
  const generateShape = (isPattern = false, index) => {
    // Random shape type (0-7)
    // 0: square, 1: circle, 2: triangle, 3: zigzag line
    // 4: semicircle, 5: squiggly line, 6: dots pattern, 7: stripes
    const type = isPattern ? Math.floor(Math.random() * 5) : Math.floor(Math.random() * 8);
    
    const size = isPattern ? Math.random() * 100 + 80 : Math.random() * 60 + 40;
    let x, y;
    
    if (containerRef.current) {
      x = Math.random() * containerRef.current.offsetWidth;
      y = Math.random() * containerRef.current.offsetHeight;
    } else {
      x = Math.random() * window.innerWidth;
      y = Math.random() * window.innerHeight;
    }
    
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    const speed = Math.random() * 0.4 + 0.1;
    const angle = Math.random() * Math.PI * 2;
    const rotationSpeed = (Math.random() - 0.5) * 0.5;
    
    // Predeterminare il tipo di riempimento e mantenerlo costante
    const fillStyleOpts = ['solid', 'striped', 'dotted'];
    const fillStyle = fillStyleOpts[Math.floor(Math.random() * fillStyleOpts.length)];
    
    
    // Per il bordo, scegliamo un colore diverso da quello del riempimento
    const outlineColor = lightenColor(color, fillStyle === 'solid' ? 80 : 0);
    return {
      id: generateUniqueId(isPattern ? 'pattern' : 'shape'),
      type,
      x,
      y,
      size,
      originalSize: size,
      color,
      outlineColor,
      speed,
      angle,
      rotation: Math.random() * 360, // Per CSS useremmo gradi anziché radianti
      rotationSpeed, // Rotazione più lenta
      fillStyle,
      isSquare: Math.random() > 0.5,
      scale: 1,
      isPattern
    };
  };

  // Calcola la distanza tra due punti
  const getDistance = (x1, y1, x2, y2) => {
    const xDistance = x2 - x1;
    const yDistance = y2 - y1;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
  };

  // Genera le forme iniziali
  useEffect(() => {
    const initShapes = [];
    const initPatterns = [];
    
    for (let i = 0; i < shapeCount; i++) {
      initShapes.push(generateShape(false, i));
    }
    
    for (let i = 0; i < patternCount; i++) {
      initPatterns.push(generateShape(true, i));
    }
    
    setShapes(initShapes);
    setPatternElements(initPatterns);
    
    // Aggiorniamo il container ref in fase di init
    if (containerRef.current) {
      const observeResize = new ResizeObserver(() => {
        // Reimpostiamo le coordinate quando il container cambia dimensione
        setShapes(prevShapes => prevShapes.map(shape => ({
          ...shape, 
          x: Math.random() * containerRef.current.offsetWidth,
          y: Math.random() * containerRef.current.offsetHeight
        })));
        
        setPatternElements(prevPatterns => prevPatterns.map(pattern => ({
          ...pattern, 
          x: Math.random() * containerRef.current.offsetWidth,
          y: Math.random() * containerRef.current.offsetHeight
        })));
      });
      
      observeResize.observe(containerRef.current);
      
      return () => observeResize.disconnect();
    }
  }, [shapeCount, patternCount]);

  // Aggiornamento della posizione del mouse
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    
    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Animation frame per aggiornare le posizioni
  useEffect(() => {
    const updateAnimations = () => {
      // Aggiorna tutte le forme in base alla posizione del mouse
      const mouseRadius = 120;
      
      setShapes(prevShapes => prevShapes.map(shape => {
        // Calcola la distanza tra il mouse e la forma
        const distance = getDistance(mouseRef.current.x, mouseRef.current.y, shape.x, shape.y);
        
        // Calcola il nuovo fattore di scala
        let newScale = shape.scale;
        if (distance < mouseRadius) {
          // Più il mouse è vicino, più grande diventa la forma
          const targetScale = 1 + (1 - distance / mouseRadius) * 0.5;
          newScale = shape.scale + (targetScale - shape.scale) * 0.1;
        } else {
          newScale = shape.scale + (1 - shape.scale) * 0.1;
        }
        
        // Aggiorna la posizione
        let newX = shape.x + Math.cos(shape.angle) * shape.speed;
        let newY = shape.y + Math.sin(shape.angle) * shape.speed;
        
        // Avvolgi attorno ai bordi dello schermo
        const maxWidth = containerRef.current?.offsetWidth || window.innerWidth;
        const maxHeight = containerRef.current?.offsetHeight || window.innerHeight;
        
        if (newX < -shape.originalSize) newX = maxWidth + shape.originalSize;
        else if (newX > maxWidth + shape.originalSize) newX = -shape.originalSize;
        
        if (newY < -shape.originalSize) newY = maxHeight + shape.originalSize;
        else if (newY > maxHeight + shape.originalSize) newY = -shape.originalSize;
        
        return {
          ...shape,
          x: newX,
          y: newY,
          rotation: (shape.rotation + shape.rotationSpeed) % 360,
          scale: newScale,
          size: shape.originalSize * newScale
        };
      }));
      
      // Aggiorna le pattern elements solo per lo scale effect
      setPatternElements(prevPatterns => prevPatterns.map(pattern => {
        const distance = getDistance(mouseRef.current.x, mouseRef.current.y, pattern.x, pattern.y);
        
        let newScale = pattern.scale;
        if (distance < mouseRadius) {
          const targetScale = 1 + (1 - distance / mouseRadius) * 0.5;
          newScale = pattern.scale + (targetScale - pattern.scale) * 0.1;
        } else {
          newScale = pattern.scale + (1 - pattern.scale) * 0.1;
        }
        
        return {
          ...pattern,
          scale: newScale,
          size: pattern.originalSize * newScale
        };
      }));
      
      try {
        // Usando il ref invece di una variabile locale
        animationFrameIdRef.current = requestAnimationFrame(updateAnimations);
      } catch (error) {
        console.error("Animation error:", error);
      }
    };
    
    // Iniziamo l'animazione e salviamo l'ID nel ref
    animationFrameIdRef.current = requestAnimationFrame(updateAnimations);
    
    // Cleanup: cancelliamo l'animation frame usando il ref
    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, []);

  // Render della forma basato sul tipo
  const renderShape = (shape) => {
    // Stilizzazione comune
    const commonStyle = {
      position: 'absolute',
      left: `${shape.x}px`,
      top: `${shape.y}px`,
      width: `${shape.size}px`,
      height: `${shape.size}px`,
      transform: `translate(-50%, -50%) rotate(${shape.rotation}deg) scale(${shape.scale})`,
      transition: 'transform 0.1s ease',
      zIndex: shape.isPattern ? 0 : 1,
    };
    
    // Stile per il pattern di riempimento
    let backgroundColor = shape.color;
    if (shape.fillStyle === 'striped') {
      backgroundColor = `repeating-linear-gradient(
        45deg,
        ${shape.color},
        ${shape.color} 4px,
        transparent 4px,
        transparent 8px
      )`;
    } else if (shape.fillStyle === 'dotted') {
      backgroundColor = `radial-gradient(
        circle at 5px 5px,
        ${shape.color} 3px,
        transparent 4px
      )`;
      backgroundColor = `${backgroundColor}, radial-gradient(
        circle at 15px 15px,
        ${shape.color} 3px,
        transparent 4px
      )`;
      backgroundColor = `${backgroundColor}, transparent`;
      commonStyle.backgroundSize = '20px 20px';
      commonStyle.backgroundRepeat = 'repeat';
    }
    
    switch (shape.type) {
      case 0: // Square o Diamond
        return <Square key={shape.id} shape={shape} commonStyle={commonStyle} />
        
      case 1: // Circle
        return <Circle key={shape.id} shape={shape} commonStyle={commonStyle} />
        
      case 2: // Triangle
        // Per i triangoli, usiamo un SVG che permette migliore controllo dei bordi
        return <Triangle key={shape.id} shape={shape} commonStyle={commonStyle} />
        
      case 3: // Zigzag line
        return <ZigzagLine key={shape.id} shape={shape} commonStyle={commonStyle} />
        
      case 4: // Semicircle
        return <Semicircle key={shape.id} shape={shape} commonStyle={commonStyle} />
        
      case 5: // Squiggly line
        return <SquigglyLine key={shape.id} shape={shape} commonStyle={commonStyle} />
        
      case 6: // Dots pattern
        return <DotPattern key={shape.id} shape={shape} commonStyle={commonStyle} />
        
      case 7: // Stripes 
        return <Stripes key={shape.id} shape={shape} commonStyle={commonStyle} />
        
      default:
        return null;
    }
  };

  return {
    containerRef,
    shapes: [...patternElements, ...shapes],
    renderShape
  };
};
