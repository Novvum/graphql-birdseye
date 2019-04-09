import shadows from "../shadows";
import { ThemeInterface } from "./interface";

import transitions from "../transitions";

export interface Shape {
  borderRadius: number;
}
const shape: Shape = {
  borderRadius: 4,
};

export interface ZIndex {
  mobileStepper: number;
  appBar: number;
  drawer: number;
  modal: number;
  snackbar: number;
  tooltip: number;
}

const zIndex: ZIndex = {
  mobileStepper: 1000,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500,
};

export interface Colors {
  green: string;
  pink: string;
  palePink: string;
  white80: string;
  white70: string;
  white60: string;
  white30: string;
  white20: string;
  white10: string;
  white: string;
  black02: string;
  black04: string;
  black07: string;
  black10: string;
  black30: string;
  black40: string;
  black50: string;
  black: string;
  paleText: string;
  paleGrey: string;
  red: string;
  blue: string;
  orange: string;
  darkPurple: string;
  lightGrey: string;
  lighterGrey: string;
  // New dynamic styles
  tint: string;
}

export interface ThemeColors {
  link: string;
  selection: string;
  cursorColor: string;
  lightText: string;
  errorText: string;
  darkText: string;
  textInactive: string;
  background: string;
  tab: string;
  tabInactive: string;
  tabText: string;
  navigationBar: string;
  navigationBarText: string;
  icon: string;
  iconHover: string;
  inputBackgroundColor: string;
  inputBoxShadow: string;
  inputBorder: string;
  button: string;
  buttonBackground: string;
  buttonBackgroundSecondary: string;
  buttonBorder: string;
  buttonHover: string;
  buttonText: string;
}

export const colors: Colors = {
  green: "#27ae60",
  pink: "#AD255F",
  palePink: "#f5009a87",
  white10: "rgba(255, 255, 255, 0.1)",
  white20: "rgba(255, 255, 255, 0.2)",
  white30: "rgba(255, 255, 255, 0.3)",
  white60: "rgba(255, 255, 255, 0.6)",
  white70: "rgba(255, 255, 255, 0.7)",
  white80: "rgba(255, 255, 255, 0.8)",
  white: "rgba(255, 255, 255, 1)",
  black02: "rgba(0, 0, 0, 0.02)",
  black07: "rgba(0, 0, 0, 0.07)",
  black04: "rgba(0, 0, 0, 0.04)",
  black10: "rgba(0, 0, 0, 0.1)",
  black30: "rgba(0, 0, 0, 0.3)",
  black40: "rgba(0, 0, 0, 0.4)",
  black50: "rgba(0, 0, 0, 0.5)",
  black: "rgba(0, 0, 0)",
  red: "#f25c54",
  orange: "rgba(241, 143, 1, 1)",
  blue: "#41B2FF",
  darkPurple: "#140f2a",

  paleText: "rgba(0, 0, 0, 0.5)",
  paleGrey: "#f3f4f4", // use for bgs, borders, etc
  lightGrey: "#eeeff0",
  lighterGrey: "#f6f7f7",
  tint: "#474747",
};

export const themeColors: ThemeColors = {
  link: colors.blue,
  selection: "rgba(255, 255, 255, 0.1)",
  cursorColor: "rgba(255, 255, 255, 0.4)",
  lightText: colors.white,
  darkText: colors.black,
  errorText: colors.pink,
  textInactive: colors.white60,
  background: "#09141c",
  tab: "#172b3a",
  tabInactive: "#0f202d",
  tabText: "#fff",
  navigationBar: "#000000",
  navigationBarText: "white",
  icon: "rgb(74, 85, 95)",
  iconHover: "rgba(255, 255, 255, 0.6)",
  inputBackgroundColor: colors.darkPurple,
  inputBoxShadow:
    "0px 0px 40px 1px #41b2ffc2, inset 0px 0px 40px 1px #41b2ffc4",
  inputBorder: `2px solid ${colors.pink}`,
  button: colors.white,
  buttonBackground: colors.pink,
  buttonBackgroundSecondary: colors.darkPurple,
  buttonBorder: `2px solid ${colors.pink}`,
  buttonHover: colors.palePink,
  buttonText: colors.white,
};

export interface Sizes {
  small6: string;
  small10: string;
  small12: string;
  small16: string;
  medium25: string;
  smallRadius: string;
  fontLight: string;
  fontSemiBold: string;
  fontTiny: string;
  fontSmall: string;
  fontMedium: string;
}

export const sizes: Sizes = {
  small6: "6px",
  small10: "10px",
  small12: "12px",
  small16: "16px",
  medium25: "25px",

  // font weights
  fontLight: "300",
  fontSemiBold: "600",

  // font sizes
  fontTiny: "12px",
  fontSmall: "14px",
  fontMedium: "20px",

  // others
  smallRadius: "2px",
};

export interface Shorthands {
  [x: string]: any;
}

export const shorthands: Shorthands = {};

export const theme: ThemeInterface = {
  colors,
  sizes,
  shape,
  shadows,
  zIndex,
  shorthands,
  transitions,
  themeColors,
};

export { ThemeInterface };
