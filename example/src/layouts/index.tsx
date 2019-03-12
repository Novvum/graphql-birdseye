import React from "react";

import styled from "styled-components";

const Content = styled.div`
  height: 100%;
  width: 100%;
  .tp {
    padding-top: 1rem;
  }
  .wp {
    padding: 1rem 2.5rem 1rem 2.5rem;
  }
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

export default Layout;
