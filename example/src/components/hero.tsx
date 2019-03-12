import React from "react";

import styled from "styled-components";
import { Container } from "./generic";

const HeroWrapper = styled.div<{ height: string; image?: string }>`
  flex: 1;
	width: auto;
	height: ${p => p.height};
	overflow: hidden;
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	justify-content: center;
  padding: 2.5rem;
  color: whitee;
  background-color:  black; 
	/* background-image: url("${p => p.image || "/assets/graphqlEngine.svg"}");
	background-size: cover; 	
  background-repeat: no-repeat;
  background-blend-mode: darken; */
`;

const Hero = ({ children, height = "80vh" }) => (
  <HeroWrapper height={height}>
    <Container>{children}</Container>
  </HeroWrapper>
);

export default Hero;
