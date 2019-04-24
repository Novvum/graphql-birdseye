import { Row, Rect, Theme } from "./types";

const colors = {
  primary: "#548f9e",
  background: "#212C32",
  white: "#ffffff",
  line: {
    active: "#8F9599", // "#38616b",
    inactive: "#31424B",
  },
};

const nodeStyles = {
  gap: 15,
  container: {
    fill: "#31424B",
    rx: 15,
  },
  header: {
    height: 36,
    label: {
      "font-size": 18,
      "text-anchor": "middle",
      fill: "#ffffff",
    },
    container: {
      fill: "transparent", // colors.primary,
      // stroke: colors.primary
    },
  },
  divider: {
    height: 1,
    stroke: colors.background,
    fill: colors.background,
  } as Rect,
  row: {
    height: 26,
    fieldNameLabel: {
      fill: "#f6f8fa",
      "font-weight": "lighter",
    },
    fieldTypeLabel: {
      fill: "#959da5",
      weight: "lighter",
    },
    body: {
      fill: "transparent",
      stroke: "transparent", // colors.primary,
      height: 25,
      cursor: "pointer",
    },
  } as Row,
};
export default {
  colors,
  ...nodeStyles,
  line: {
    stroke: colors.line.inactive,
    fill: "transparent",
    strokeWidth: 4,
    strokeLinejoin: "round",
    targetMarker: {
      type: "path",
      d: "M 10 -5 0 0 10 5 z",
    },
  },
} as Theme;

export * from "./types";
