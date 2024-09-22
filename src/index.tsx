/*
 * @Date: 2023-05-28 23:06:16
 * @LastEditors: 曾逸超
 * @LastEditTime: 2024-09-20 17:26:32
 * @FilePath: /react-learn/huanlegou/src/index.tsx
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

document.documentElement.style.fontSize = document.documentElement.clientWidth / 375 * 100 + 'px';

window.addEventListener('resize', () => {
  document.documentElement.style.fontSize = document.documentElement.clientWidth / 375 * 100 + 'px';
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);