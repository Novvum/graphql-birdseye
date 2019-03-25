import styled from "styled-components";

export const Container = styled.div`
  @media (min-width: 576px) {
    max-width: 540px;
  }
  @media (min-width: 768px) {
    max-width: 720px;
  }

  @media (min-width: 992px) {
    max-width: 960px;
  }
  @media (min-width: 1200px) {
    max-width: 1140px;
  }
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  color: white;
  margin-left: auto;
  width: 100%;
`;

export const FullWidthContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

export const GridItem = styled(Container)`
  flex: 1;
  display: flex;
  height: 100%;
  flex-wrap: wrap;
  flex-direction: column;
  padding: 0 15px 0 15px;
  justify-content: center;
`;

export const Caption = styled.p`
  color: white;
`;
