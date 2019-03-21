import { styled } from "../styled";

export const Button = styled.button`
  text-transform: uppercase;
  font-family: "Source Code Pro";
  font-weight: 600;
  color: ${p => p.theme.themeColors.button};
  background: ${p => p.theme.themeColors.buttonBackground};
  flex: 0 0 auto;
  letter-spacing: 0.53px;
  font-size: 14px;
  padding: 6px 9px 7px 10px;
  border: ${p => p.theme.themeColors.buttonBorder};
  outline: none;
  cursor: pointer;
  transition: 0.1s linear background-color;
  &:first-child {
    margin-left: 0;
  }
  &:hover {
    background-color: ${p => p.theme.themeColors.buttonHover};
  }
`;
