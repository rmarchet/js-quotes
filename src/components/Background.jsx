import React, { useEffect, useRef } from 'react';
import '../styles/Background.css';

export const Background = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 80s style colors
    const colors = [
      '#ff00ff', // Magenta
      '#00ffff', // Cyan
      '#ffff00', // Yellow
      '#ff8080', // Coral
      '#80ff80', // Neon Green
      '#8080ff', // Purple
      '#ff8000', // Orange
    ];

    // Create shapes array
    const shapes = [];
    const shapeCount = 30;

    for (let i = 0; i < shapeCount; i++) {
      const type = Math.floor(Math.random() * 3); // 0: triangle, 1: square, 2: line
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = Math.random() * 60 + 20;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const speed = Math.random() * 0.5 + 0.1;
      const angle = Math.random() * Math.PI * 2;
      const rotationSpeed = (Math.random() - 0.5) * 0.02;

      shapes.push({ type, x, y, size, color, speed, angle, rotationSpeed, rotation: 0 });
    }

    // Animation loop
    const render = () => {
      ctx.fillStyle = '#111133'; // Dark blue background
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add grid pattern
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      
      // Horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      // Vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Draw and update shapes
      shapes.forEach(shape => {
        ctx.save();
        ctx.translate(shape.x, shape.y);
        ctx.rotate(shape.rotation);
        ctx.fillStyle = shape.color;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 2;

        switch (shape.type) {
          case 0: // Triangle
            ctx.beginPath();
            ctx.moveTo(0, -shape.size / 2);
            ctx.lineTo(shape.size / 2, shape.size / 2);
            ctx.lineTo(-shape.size / 2, shape.size / 2);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            break;
          case 1: // Square/Rectangle
            ctx.fillRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size);
            ctx.strokeRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size);
            break;
          case 2: // Line
            ctx.beginPath();
            ctx.moveTo(-shape.size / 2, 0);
            ctx.lineTo(shape.size / 2, 0);
            ctx.lineWidth = 8;
            ctx.stroke();
            break;
        }

        ctx.restore();

        // Update position
        shape.x += Math.cos(shape.angle) * shape.speed;
        shape.y += Math.sin(shape.angle) * shape.speed;
        shape.rotation += shape.rotationSpeed;

        // Bounce off edges
        if (shape.x < -shape.size || shape.x > canvas.width + shape.size) {
          shape.angle = Math.PI - shape.angle;
        }
        if (shape.y < -shape.size || shape.y > canvas.height + shape.size) {
          shape.angle = -shape.angle;
        }
      });

      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="background-container">
      <canvas ref={canvasRef} className="background-canvas" />
    </div>
  );
};

export default Background;
