// import { init, setContext } from '@sentry/react';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

console.log(import.meta.env);

// const isProd = import.meta.env.PROD;

// if (isProd) {
//   init({
//     dsn: <dsn key>
//   });
//   setContext('extra', {
//     product: 'clinical',
//     environment: import.meta.env.MODE,
//   });
// }

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
