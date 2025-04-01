import React from 'react';
import { Background } from './Background';
import { Quote } from './Quote';
import { Image } from './Image';
import '../styles/App.css';

const App = () => {
  return (
    <div className="app">
      <Quote />
      <Background />
    </div>
  );
};

export default App;
