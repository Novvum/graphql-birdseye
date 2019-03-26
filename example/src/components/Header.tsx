import React from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import { styled, css } from "../styled";
import { rhythm } from "../styled/typography";
import { mobile } from "../styled";
const Github = require("../images/svg-icons/github.svg");

const AppBar = styled.header`
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  width: 100%;
  box-sizing: border-box;
  z-index: ${p => p.theme.zIndex.appBar};
  flex-shrink: 0;
  padding: 2rem;
  position: relative;
  z-index: 10;
  background: transparent;
  transition: all 150ms ease 0s;
  justify-content: space-between;
`;

const HeaderWrapper = styled.div`
  height: 0px;
  width: 100%;
  background: transparent;
`;

const Toolbar = styled.div`
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  @media (min-width: 576px) {
    maxwidth: 540px;
  }
  @media (min-width: 768px) {
    maxwidth: 720px;
  }
  @media (min-width: 992px) {
    maxwidth: 960px;
  }
  @media (min-width: 1200px) {
    maxwidth: 1140px;
  }
`;

const Brand = styled(Link)`
  text-decoration: none !important;
  align-items: center;
  display: flex;
  color: inherit;
  margin-right: ${rhythm(1 / 2)};
  span {
    margin-left: 8px;
  }
`;

const LinksContainer = styled.nav`
  display: flex;
  align-items: center;
  align-self: center;
  justify-content: flex-end;
`;

const NavExternalLink = styled.a`
  padding: 5px 15px;
  margin: 5px;
  font-weight: 300;
  font-size: 16px;
  outline: solid 2px ${p => p.theme.themeColors.lightText};
  transition: outline-width 0.1s linear;
  color: ${p => p.theme.themeColors.lightText};
  &:hover {
    color: ${p => p.theme.themeColors.lightText};
    outline-width: 4px;
  }
  ${mobile(css`
    width: 100%;
  `)};
`;

interface HeaderProps {
  siteTitle?: string;
}

export interface ILink {
  title: string;
  path: string;
}
class Header extends React.PureComponent<HeaderProps, {}> {
  public render() {
    return (
      <StaticQuery
        query={graphql`
          {
            site {
              siteMetadata {
                title
              }
            }
          }
        `}
        render={() => {
          return (
            <HeaderWrapper>
              <AppBar>
                <Toolbar>
                  <Brand to="/" aria-label="JustGraphQL Homepage" />
                  <LinksContainer>
                    <NavExternalLink
                      href="https://github.com/Novvum/graphql-birdseye"
                      target="_blank"
                    >
                      See on Github
                      <Github height="11px" />
                    </NavExternalLink>
                  </LinksContainer>
                </Toolbar>
              </AppBar>
            </HeaderWrapper>
          );
        }}
      />
    );
  }
}

export default Header;
