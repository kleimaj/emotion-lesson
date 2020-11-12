import styled from '@emotion/styled';

export const Button = styled.button`
  padding: ${(props) => (props.large ? `16px 25px` : `12px 24px`)};
  font-size: ${(props) => (props.large ? `1.5rem` : `1rem`)};
  border-radius: 2px;
  min-width: 100px;
  cursor: pointer;
  font-family: 'Menlo', monospace;
`;

export const PrimaryButton = styled(Button)`
  background-color: red;
  border: none;
  color: white;
`;

export const SecondaryButton = styled(Button)`
  background: none;
  border: 1px solid ${(props) => props.theme.buttonBorder};
  color: ${(props) => props.theme.text};
  transition: background-color 0.2s linear, color 0.2s linear;

  &:hover {
    background-color: red;
    color: white;
  }
`;
