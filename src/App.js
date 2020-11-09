/** @jsxImportSource @emotion/core */

import { css } from '@emotion/core';
import { SecondaryButton } from './components';

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
      <SecondaryButton>Press me</SecondaryButton>
    </div>
  );
}

export default App;
