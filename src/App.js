/** @jsxImportSource @emotion/core */

import { css } from '@emotion/core';
import { Button } from './components';

function App() {
  return (
    <div
      css={css`
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: space-around;
        flex-direction: column;
      `}
    >
      <Button>Press me</Button>
    </div>
  );
}

export default App;
