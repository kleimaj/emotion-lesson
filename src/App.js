import { useState } from 'react';
import styled from '@emotion/styled';
import { SecondaryButton } from './components';
import { SignUpModal } from './components';
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
`;
function App() {
  const [showModal, setShowModal] = useState(false);
  return (
    <Container>
      <SignUpModal showModal={showModal} setShowModal={setShowModal} />
      <SecondaryButton onClick={() => setShowModal(!showModal)}>
        Press me
      </SecondaryButton>
    </Container>
  );
}

export default App;
