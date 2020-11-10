import { useState } from 'react';
import styled from '@emotion/styled';
import { SecondaryButton } from './components';
import { SignUpModal } from './components';
import { ThemeProvider } from 'emotion-theming';

const Container = styled.div`
  background: ${(props) => props.theme.colors.background};
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
`;
const theme = {
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#07c',
    modes: {
      dark: {
        text: '#fff',
        background: '#000',
        primary: '#0cf',
      },
    },
  },
};
function App() {
  const [showModal, setShowModal] = useState(false);
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <SignUpModal showModal={showModal} setShowModal={setShowModal} />
        <SecondaryButton onClick={() => setShowModal(!showModal)}>
          Press me
        </SecondaryButton>
      </Container>
    </ThemeProvider>
  );
}

export default App;
