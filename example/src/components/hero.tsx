import React from "react";
import { StaticQuery, graphql } from "gatsby";

import { Container } from "./generic";
import { styled, mobile, css } from "../styled";
import Img from "gatsby-image";

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
  color: white;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
`;

const BgImage = styled(Img)`
  position: absolute !important;
  top: 0;
  left: 0;
  width: 100%;
  z-index: -1;
  background-color: ${p => p.theme.colors.black};
  height: 100%;
  ${mobile(css`
    display: none;
  `)}
`;

const MobileBgImage = styled(BgImage)`
  display: none;
  ${mobile(css`
    display: block;
    & > picture > img {
      object-position: top !important;
    }
  `)}
`;

interface StaticQueryProps {
  backgroundImage: {
    childImageSharp: {
      fluid: object;
    };
  };
  mobileBackgroundImage: {
    childImageSharp: {
      fluid: object;
    };
  };
}

const BACKGROUND_IMAGES = graphql`
  query SiteMetaDataQueryandBackground {
    backgroundImage: file(relativePath: { eq: "background.png" }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    mobileBackgroundImage: file(relativePath: { eq: "mobilebackground.png" }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

const Hero = ({ childRef, children, height = "80vh" }) => {
  return (
    <StaticQuery
      // tslint:disable-next-line:jsx-no-multiline-js
      query={BACKGROUND_IMAGES}
      render={(data: StaticQueryProps) => {
        const background = data.backgroundImage.childImageSharp.fluid;
        const mobileBackground =
          data.mobileBackgroundImage.childImageSharp.fluid;
        return (
          <HeroWrapper height={height} ref={childRef}>
            <BgImage fluid={background} />
            <MobileBgImage fluid={mobileBackground} />
            <Container>{children}</Container>
          </HeroWrapper>
        );
      }}
    />
  );
};

export default Hero;
