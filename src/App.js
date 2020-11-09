/** @jsxImportSource @emotion/core */

import { css } from '@emotion/core';

function App() {
  const color = 'white';
  return (
    <div>
      <button
        css={css`
          padding: 32px;
          background-color: hotpink;
          font-size: 24px;
          border-radius: 4px;
          cursor: pointer;
          &:hover {
            color: ${color};
          }
        `}
      >
        Hover to change color
      </button>
    </div>
  );
}

export default App;
