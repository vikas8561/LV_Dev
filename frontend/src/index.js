import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Performance mark for React app start
if (window.performance && window.performance.mark) {
  window.performance.mark('react-app-start');
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Performance mark for React app end
if (window.performance && window.performance.mark) {
  window.performance.mark('react-app-end');
  window.performance.measure('react-app-render', 'react-app-start', 'react-app-end');
}
