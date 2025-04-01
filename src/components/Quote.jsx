import React, { useState, useEffect } from 'react';
import { Image } from './Image';
import { localQuotes } from '../data/quotes.js';
import '../styles/Quote.css';

export const Quote = () => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  const getRandomQuote = () => {
    setLoading(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * localQuotes.length);
      setQuote(localQuotes[randomIndex]);
      setLoading(false);
    }, 500); // Piccolo ritardo per mostrare il caricamento
  };

  useEffect(() => {
    getRandomQuote();
  }, []);

  return (
    <div className="quote-container">
      {loading ? (
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Loading quote...</p>
        </div>
      ) : quote ? (
        <div className="quote-content">
          <div className="quote-with-image">
            {quote.image && (
              <Image quote={quote} />
            )}
            <blockquote>
              <p className="quote-text">{quote.quote}</p>
              <footer className="quote-author">— {quote.author}</footer>
            </blockquote>
          </div>
          <div className="quote-category">Category: {quote.category}</div>
          <button className="new-quote-btn" onClick={getRandomQuote}>
            New Quote
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Quote;