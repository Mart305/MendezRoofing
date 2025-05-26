import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM content loaded, initializing React...');
  
  const container = document.getElementById('root');
  if (!container) {
    console.error('Root element not found!');
    return;
  }
  
  try {
    // Create a root
    const root = createRoot(container);
    
    // Initial render
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    
    console.log('React app rendered successfully');
    
    // Remove loading class
    document.body.classList.remove('js-loading');
  } catch (error) {
    console.error('Error rendering React app:', error);
  }
});
