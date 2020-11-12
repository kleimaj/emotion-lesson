import styled from '@emotion/styled';
import { SecondaryButton } from './components';

const Container = styled.div`
  background: white;
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
      <SecondaryButton large>Press me</SecondaryButton>
    </Container>
  );
}

export default App;
