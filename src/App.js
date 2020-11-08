/** @jsxImportSource @emotion/core */

import { css } from "@emotion/core";

function App() {
  return (
    <div>
      <button
        css={css`
          padding: 32px;
          background-color: hotpink;
          font-size: 24px;
          border-radius: 4px;
          &:hover {
            color: white;
          }
        `}
      >
        Hover to change color
      </button>
    </div>
  );
}

export default App;
