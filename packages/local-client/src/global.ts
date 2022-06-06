import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    /* BODY */
    body {
      background: ${({ theme }) => theme.colors.background.primary};
      color: ${({ theme }) => theme.colors.text.primary};
      font-size: 0.875rem;
      height: 100vh;
      width: 100%;
    }
`;
