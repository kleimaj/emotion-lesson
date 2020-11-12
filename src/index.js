import React from 'react';
import ReactDOM from 'react-dom';
import { Global, css } from '@emotion/core';

import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Global
      styles={css`
        html {
          font-size: 16px;
          box-sizing: border-box;
        }

        *,
        *:before,
        *:after {
          box-sizing: inherit;
        }

        body {
          margin: 0;
          font-family: 'Menlo', monospace;
        }

        main {
          width: 90%;
          margin: 0 auto;
        }
      `}
    />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
