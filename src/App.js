import { useState } from 'react';
import styled from '@emotion/styled';
import { SecondaryButton, PrimaryButton } from './components';
import { SignUpModal } from './components';
import { ThemeProvider } from 'emotion-theming';

const Container = styled.div`
  background: ${(props) => props.theme.background};
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
`;
const themeLight = {
  text: '#000',
  background: '#fff',
  modalBg: '#fff',
  buttonText: '#000',
  buttonTextHover: '#fff',
  buttonBorder: '#000',
  buttonBg: 'rgba(0, 0, 0, 0)',
  buttonBgHover: 'rgba(0, 0, 0, 1)',
};

const themeDark = {
  text: '#fff',
  background: '#121212',
  modalBg: '#202023',
  buttonText: '#fff',
  buttonTextHover: '#000',
  buttonBorder: '#fff',
  buttonBg: 'rgba(255, 255, 255, 0)',
  buttonBgHover: 'rgba(255, 255, 255, 1)',
};
function App() {
  const [showModal, setShowModal] = useState(false);
  const [isDark, setIsDark] = useState(false);
  return (
    <ThemeProvider theme={isDark ? themeDark : themeLight}>
      <Container>
        <SignUpModal showModal={showModal} setShowModal={setShowModal} />
        <SecondaryButton onClick={() => setShowModal(!showModal)}>
          Press me
        </SecondaryButton>
        <PrimaryButton onClick={() => setIsDark(!isDark)}>
          Change to {isDark ? 'light' : 'dark'} mode
        </PrimaryButton>
      </Container>
    </ThemeProvider>
  );
}

export default App;
