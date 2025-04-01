import { useEffect, useRef } from 'react';

export const useBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    // Tracciamento posizione del mouse
    const mouse = {
      x: 0,
      y: 0,
      radius: 120 // Raggio di influenza del mouse
    };
    
    // Cache per i pattern, per evitare di ricrearli ad ogni frame
    const patternCache = {};

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Quando si ridimensiona, svuotiamo la cache dei pattern
      // perché il contesto del canvas cambia
      Object.keys(patternCache).forEach(key => delete patternCache[key]);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Aggiorniamo la posizione del mouse
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Allontaniamo il mouse quando esce dalla finestra
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };
    
    window.addEventListener('mouseleave', handleMouseLeave);

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

    // Create dark background
    const createBackground = () => {
      ctx.fillStyle = '#000033'; // Dark navy blue
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add subtle grid pattern
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      
      const gridSize = 40;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    // Create shapes array
    const shapes = [];
    const patternElements = [];
    
    // Function to draw a striped pattern in a shape
    const createStripes = (color) => {
      // Verifichiamo se abbiamo già creato questo pattern
      const cacheKey = `stripes_${color}`;
      if (patternCache[cacheKey]) {
        return patternCache[cacheKey];
      }
      
      const stripePattern = document.createElement('canvas');
      const patternCtx = stripePattern.getContext('2d');
      stripePattern.width = 20;
      stripePattern.height = 20;
      
      patternCtx.fillStyle = 'rgba(0, 0, 0, 0)';
      patternCtx.fillRect(0, 0, 20, 20);
      
      patternCtx.strokeStyle = color;
      patternCtx.lineWidth = 2;
      
      patternCtx.beginPath();
      for (let i = -20; i < 40; i += 6) {
        patternCtx.moveTo(i, 0);
        patternCtx.lineTo(i + 20, 20);
      }
      patternCtx.stroke();
      
      const pattern = ctx.createPattern(stripePattern, 'repeat');
      patternCache[cacheKey] = pattern;
      return pattern;
    };
    
    // Function to create a dotted pattern
    const createDots = (color) => {
      // Verifichiamo se abbiamo già creato questo pattern
      const cacheKey = `dots_${color}`;
      if (patternCache[cacheKey]) {
        return patternCache[cacheKey];
      }
      
      const dotPattern = document.createElement('canvas');
      const patternCtx = dotPattern.getContext('2d');
      dotPattern.width = 20;
      dotPattern.height = 20;
      
      patternCtx.fillStyle = 'rgba(0, 0, 0, 0)';
      patternCtx.fillRect(0, 0, 20, 20);
      
      patternCtx.fillStyle = color;
      patternCtx.beginPath();
      patternCtx.arc(5, 5, 2, 0, Math.PI * 2);
      patternCtx.arc(15, 15, 2, 0, Math.PI * 2);
      patternCtx.fill();
      
      const pattern = ctx.createPattern(dotPattern, 'repeat');
      patternCache[cacheKey] = pattern;
      return pattern;
    };
    
    // Create different types of shapes
    const createShapes = () => {
      const shapeCount = 50; // Ridotto per evitare sovraccarico
      
      for (let i = 0; i < shapeCount; i++) {
        // Random shape type (0-7)
        // 0: square, 1: circle, 2: triangle, 3: zigzag line
        // 4: semicircle, 5: squiggly line, 6: dots pattern, 7: stripes
        const type = Math.floor(Math.random() * 8);
        
        const size = Math.random() * 60 + 40;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Per il bordo, scegliamo un colore diverso da quello del riempimento
        let outlineColor;
        do {
          outlineColor = colors[Math.floor(Math.random() * colors.length)];
        } while (outlineColor === color); // Assicuriamoci che il bordo sia di colore diverso
        
        const speed = Math.random() * 0.2 + 0.05; // Velocità ridotta
        const angle = Math.random() * Math.PI * 2;
        const rotationSpeed = (Math.random() - 0.5) * 0.005; // Rotazione più lenta
        
        // Predeterminare il tipo di riempimento e mantenerlo costante
        const fillStyleOpts = ['solid', 'striped', 'dotted'];
        const fillStyle = fillStyleOpts[Math.floor(Math.random() * fillStyleOpts.length)];
        
        // Genera un identificatore unico per questa forma
        const id = `shape_${i}`;
        
        shapes.push({
          id,
          type,
          x,
          y,
          size,
          originalSize: size, // Memorizziamo la dimensione originale
          color,
          outlineColor,
          speed,
          angle,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed,
          fillStyle,
          // Predetermina se è un quadrato o un diamante
          isSquare: Math.random() > 0.5,
          // Fattore di scala per effetto mouse hover
          scale: 1
        });
      }
      
      // Add some fixed pattern elements in the background
      const patternCount = 10; // Ridotto per evitare sovraccarico
      for (let i = 0; i < patternCount; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        let outlineColor;
        do {
          outlineColor = colors[Math.floor(Math.random() * colors.length)];
        } while (outlineColor === color);
        
        patternElements.push({
          id: `pattern_${i}`,
          type: Math.floor(Math.random() * 5),
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 100 + 80,
          originalSize: Math.random() * 100 + 80, // Memorizziamo la dimensione originale
          color,
          outlineColor,
          rotation: Math.random() * Math.PI * 2,
          fillStyle: Math.random() > 0.5 ? 'striped' : 'dotted',
          isSquare: Math.random() > 0.5,
          // Fattore di scala per effetto mouse hover
          scale: 1
        });
      }
    };
    
    // Funzione per calcolare la distanza tra due punti
    const getDistance = (x1, y1, x2, y2) => {
      const xDistance = x2 - x1;
      const yDistance = y2 - y1;
      return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
    };
    
    // Draw a shape based on its type
    const drawShape = (shape) => {
      ctx.save();
      ctx.translate(shape.x, shape.y);
      ctx.rotate(shape.rotation);
      
      // Scaliamo tutto in base all'hover
      ctx.scale(shape.scale, shape.scale);
      
      // Set fill style based on pattern
      let fillStyle;
      if (shape.fillStyle === 'solid') {
        fillStyle = shape.color;
      } else if (shape.fillStyle === 'striped') {
        fillStyle = createStripes(shape.color);
      } else {
        fillStyle = createDots(shape.color);
      }
      
      ctx.fillStyle = fillStyle;
      ctx.strokeStyle = shape.outlineColor;
      ctx.lineWidth = 3;
      
      const halfSize = shape.size / 2;
      
      switch (shape.type) {
        case 0: // Square
          if (shape.isSquare) {
            // Regular square
            ctx.fillRect(-halfSize, -halfSize, shape.size, shape.size);
            ctx.strokeRect(-halfSize, -halfSize, shape.size, shape.size);
          } else {
            // Diamond
            ctx.beginPath();
            ctx.moveTo(0, -halfSize);
            ctx.lineTo(halfSize, 0);
            ctx.lineTo(0, halfSize);
            ctx.lineTo(-halfSize, 0);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
          }
          break;
          
        case 1: // Circle
          ctx.beginPath();
          ctx.arc(0, 0, halfSize, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          break;
          
        case 2: // Triangle
          ctx.beginPath();
          ctx.moveTo(0, -halfSize);
          ctx.lineTo(halfSize, halfSize);
          ctx.lineTo(-halfSize, halfSize);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          break;
          
        case 3: // Zigzag line
          ctx.beginPath();
          ctx.moveTo(-halfSize, -halfSize / 3);
          
          // Create zigzag pattern
          const zigzagCount = 4;
          const segmentWidth = shape.size / zigzagCount;
          
          for (let i = 0; i < zigzagCount; i++) {
            const x1 = -halfSize + (i + 0.5) * segmentWidth;
            const x2 = -halfSize + (i + 1) * segmentWidth;
            const y = (i % 2 === 0) ? halfSize / 3 : -halfSize / 3;
            
            ctx.lineTo(x1, y);
            ctx.lineTo(x2, -y);
          }
          
          ctx.lineWidth = 4;
          ctx.stroke();
          break;
          
        case 4: // Semicircle
          ctx.beginPath();
          ctx.arc(0, 0, halfSize, 0, Math.PI);
          ctx.fill();
          ctx.stroke();
          break;
          
        case 5: // Squiggly line
          ctx.beginPath();
          ctx.moveTo(-halfSize, 0);
          
          // Create squiggly pattern
          const waveCount = 3;
          const waveWidth = shape.size / waveCount;
          const waveHeight = halfSize / 2;
          
          for (let i = 0; i <= waveCount * 2; i++) {
            const x = -halfSize + (i * waveWidth / 2);
            const y = Math.sin(i * Math.PI) * waveHeight;
            
            ctx.lineTo(x, y);
          }
          
          ctx.lineWidth = 4;
          ctx.stroke();
          break;
          
        case 6: // Dots pattern
          for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
              if (i === 0 && j === 0) continue; // Skip center
              
              ctx.beginPath();
              ctx.arc(i * halfSize / 2, j * halfSize / 2, halfSize / 6, 0, Math.PI * 2);
              ctx.fill();
              ctx.stroke();
            }
          }
          break;
          
        case 7: // Stripes
          const stripesCount = 5;
          const stripeWidth = shape.size / stripesCount;
          
          for (let i = 0; i < stripesCount; i += 2) {
            ctx.fillRect(-halfSize + i * stripeWidth, -halfSize, stripeWidth, shape.size);
            ctx.strokeRect(-halfSize + i * stripeWidth, -halfSize, stripeWidth, shape.size);
          }
          break;
      }
      
      ctx.restore();
    };

    // Create initial shapes
    createShapes();

    // Animation loop
    const render = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create background
      createBackground();
      
      // Aggiorna tutte le forme in base alla posizione del mouse
      const allShapes = [...patternElements, ...shapes];
      
      allShapes.forEach(shape => {
        // Calcola la distanza tra il mouse e la forma
        const distance = getDistance(mouse.x, mouse.y, shape.x, shape.y);
        
        // Se il mouse è abbastanza vicino, ingrandiamo la forma
        if (distance < mouse.radius) {
          // Calcoliamo un fattore di scala in base alla distanza
          // Più il mouse è vicino, più grande diventa la forma
          const scaleFactor = 1 + (1 - distance / mouse.radius) * 0.5; // Max 1.5x della dimensione originale
          
          // Transizione fluida del fattore di scala
          shape.scale += (scaleFactor - shape.scale) * 0.1;
          
          // Aggiorniamo la dimensione attuale in base alla scala
          shape.size = shape.originalSize * shape.scale;
        } else {
          // Se il mouse è lontano, riportiamo gradualmente la forma alla dimensione originale
          shape.scale += (1 - shape.scale) * 0.1;
          shape.size = shape.originalSize * shape.scale;
        }
      });
      
      // Draw static pattern elements first (in background)
      patternElements.forEach(drawShape);
      
      // Draw and update moving shapes
      shapes.forEach(shape => {
        drawShape(shape);
        
        // Update position
        shape.x += Math.cos(shape.angle) * shape.speed;
        shape.y += Math.sin(shape.angle) * shape.speed;
        shape.rotation += shape.rotationSpeed;
        
        // Wrap around screen edges
        if (shape.x < -shape.originalSize) shape.x = canvas.width + shape.originalSize;
        else if (shape.x > canvas.width + shape.originalSize) shape.x = -shape.originalSize;
        
        if (shape.y < -shape.originalSize) shape.y = canvas.height + shape.originalSize;
        else if (shape.y > canvas.height + shape.originalSize) shape.y = -shape.originalSize;
      });
      
      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return canvasRef;
};

export default useBackground;