import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
 // Import głównego komponentu aplikacji

// Renderowanie głównego komponentu aplikacji w DOM
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // Element w pliku public/index.html
);
