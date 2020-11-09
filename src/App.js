import styled from '@emotion/styled';
import { Global, css } from '@emotion/core';
import { SecondaryButton } from './components';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
`;
function App() {
  return (
    <Container>
      <SecondaryButton>Press me</SecondaryButton>
    </Container>
  );
}

export default App;
