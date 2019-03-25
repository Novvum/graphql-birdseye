import React from "react";

import { styled, ThemeProvider, theme as styledTheme } from "../styled";

interface LayoutProps {
  children: any;
}

const Content = styled.div`
  height: 100%;
  width: 100%;
`;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Layout = ({ children }) => (
  <Wrapper>
    <Content>{children}</Content>
  </Wrapper>
);
console;
const WithTheme: React.SFC<LayoutProps> = ({ children, ...rest }) => (
  <ThemeProvider theme={styledTheme}>
    <Layout {...rest}>{children}</Layout>
  </ThemeProvider>
);

export default WithTheme;
