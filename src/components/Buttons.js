import styled from '@emotion/styled';

const primaryColor = `hotpink`;

export const Button = styled.button`
  padding: 12px 24px;
  font-size: 1rem;
  border-radius: 2px;
  min-width: 100px;
  cursor: pointer;
  font-family: 'Menlo', monospace;
`;

export const PrimaryButton = styled(Button)`
  background-color: ${primaryColor};
  border: none;
  color: white;
`;

export const SecondaryButton = styled(Button)`
  background: none;
  border: 1px solid black;
  color: black;
  transition: background-color 0.2s linear, color 0.2s linear;

  &:hover {
    background-color: ${primaryColor};
    color: black;
  }
`;
