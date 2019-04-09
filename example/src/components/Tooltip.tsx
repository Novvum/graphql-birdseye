import React, { useState } from "react";
import { styled, css } from "../styled";
const Eye = require("../images/svg-icons/eye.svg");

const StyledTooltip = styled.div<{
  startPosition: "right" | "left";
  open: Boolean;
}>`
  color: white;
  position: absolute;
  ${(props) => `${props.startPosition}: 0px`};
  top: 40%;
  height: auto;
  width: ${(props) => (props.open ? "300px" : "60px")};
  z-index: 200;
  background-color: ${(props) => props.theme.colors.pink};
  padding: 15px;
  height: 80px;
  transition: width 0.5s;
`;

const HideOnClose = styled.div<{ open: Boolean }>`
  display: none;
  ${(props) => props.open && `display:  block`};
  ${(props) =>
    props.open &&
    css`
      opacity: 1;
    `};
  -webkit-animation: 0.5s ease 0s normal forwards 1 fadein;
  animation: 0.5s ease 0s normal forwards 1 fadein;

  @keyframes fadein {
    0% {
      opacity: 0;
    }
    66% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @-webkit-keyframes fadein {
    0% {
      opacity: 0;
    }
    66% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const IconContainer = styled.div`
  margin-left: -30px;
  height: 50px;
  min-width: 50px;
  margin-right: 15px;
  float: left;
  padding: 5px;
  padding-top: 8px;
  border: 1px solid ${(props) => props.theme.colors.pink};
  display: inline-block;
  background-color: ${(props) => props.theme.colors.darkPurple};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
`;

export default ({ content, startPosition }) => {
  const [open, setOpen] = useState(false);
  return (
    <div onClick={() => setOpen(!open)}>
      <StyledTooltip open={open} startPosition={startPosition}>
        <IconContainer>
          <Eye />
        </IconContainer>
        <HideOnClose open={open}>{content}</HideOnClose>
      </StyledTooltip>
    </div>
  );
};
