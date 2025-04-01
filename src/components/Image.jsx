import React, { useState } from 'react';
import '../styles/Image.css';

export const Image = ({ quote }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  const handleImageLoaded = () => {
    setLoading(false);
  };
  
  const handleImageError = () => {
    setLoading(false);
    setError(true);
  };
  
  // Funzione per generare avatar placeholder con le iniziali dell'autore
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  // Funzione per generare un colore in base al nome dell'autore
  const getColorFromName = (name) => {
    const colors = [
      '#ff00ff', // Magenta
      '#00ffff', // Cyan
      '#ffff00', // Yellow
      '#ff8080', // Coral
      '#80ff80', // Neon Green
      '#8080ff'  // Purple
    ];
    
    // Somma semplice dei valori ASCII delle lettere del nome
    const sum = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    // Usa la somma per scegliere un colore dall'array
    return colors[sum % colors.length];
  };
  
  return (
    <div className="author-image-container">
      {loading && (
        <div className="image-loading-spinner"></div>
      )}
      
      {error ? (
        <div 
          className="author-image-placeholder" 
          style={{ backgroundColor: getColorFromName(quote.author) }}
        >
          {getInitials(quote.author)}
        </div>
      ) : (
        <img 
          src={quote.image} 
          alt={quote.author} 
          className={`author-image ${loading ? 'loading' : 'loaded'}`}
          onLoad={handleImageLoaded}
          onError={handleImageError} 
        />
      )}
    </div>
  );
};

export default Image;