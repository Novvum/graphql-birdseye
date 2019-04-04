import React from "react";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
} from "styled-dropdown-component";
import { Button } from "./Buttons";
import { styled } from "../styled";
const DownArrow = require("../images/svg-icons/nav-down.svg");
const UpArrow = require("../images/svg-icons/nav-up.svg");

const CustomDropdownItem = styled(DropdownItem)`
  cursor: pointer;
  border: ${(props) => props.theme.themeColors.buttonBorder};
  background-color: transparent;
  color: white;
`;

export class SchemaDropdown extends React.Component<
  { onSelect: any; options: Array<string> },
  { hidden: boolean }
> {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true,
    };
  }

  handleSelect(value: string, token?: string) {
    if (value) {
      this.props.onSelect(value, token);
    }
    this.setState({
      hidden: !this.state.hidden,
    });
  }

  handleOpenCloseDropdown(event) {
    event.preventDefault();
    this.setState({
      hidden: !this.state.hidden,
    });
  }

  render() {
    const { hidden } = this.state;

    return (
      <Dropdown style={{ marginLeft: "15px" }}>
        <Button
          secondary={true}
          // dropdownToggle
          onClick={(e) => this.handleOpenCloseDropdown(e)}
        >
          Visualize using <span>{hidden ? <DownArrow /> : <UpArrow />}</span>
        </Button>
        <DropdownMenu
          hidden={hidden}
          style={{ backgroundColor: "#18122E", margin: "0px" }}
        >
          {this.props.options.map((preset, key) => {
            return (
              <CustomDropdownItem
                style={{ cursor: "pointer" }}
                key={key}
                onClick={() => this.handleSelect(preset)}
              >
                {preset}
              </CustomDropdownItem>
            );
          })}
        </DropdownMenu>
      </Dropdown>
    );
  }
}
