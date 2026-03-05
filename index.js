import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// show runtime errors on the page so we can diagnose white-screen problems
window.onerror = function(message, source, lineno, colno, error) {
  document.body.innerHTML = '';
  const pre = document.createElement('pre');
  pre.style.whiteSpace = 'pre-wrap';
  pre.style.color = 'red';
  pre.textContent = message + ' at ' + source + ':' + lineno + ':' + colno + (error ? '\n' + error.stack : '');
  document.body.appendChild(pre);
};
window.addEventListener('unhandledrejection', evt => {
  document.body.innerHTML = '';
  const pre = document.createElement('pre');
  pre.style.whiteSpace = 'pre-wrap';
  pre.style.color = 'red';
  pre.textContent = 'Unhandled promise rejection: ' + evt.reason;
  document.body.appendChild(pre);
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
