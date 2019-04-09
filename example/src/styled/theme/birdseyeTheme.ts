import { Theme, Rect, Row } from "graphql-birdseye/src/theme/index.d";
import { theme as styledTheme } from "../styled";

const colors = {
  primary: styledTheme.colors.pink,
  background: styledTheme.colors.darkPurple,
  white: "#ffffff",
  line: {
    active: styledTheme.colors.pink, // "#38616b",
    inactive: styledTheme.colors.white
  }
};

const nodeStyles = {
  gap: 15,
  container: {
    fill: styledTheme.colors.black,
    rx: 15
  },
  header: {
    height: 36,
    label: {
      "font-size": 22,
      "text-anchor": "middle",
      fill: "#ffffff",
      "font-weight": "bold"
    },
    container: {
      fill: "transparent" // colors.primary,
      // stroke: colors.primary
    }
  },
  divider: {
    height: 0,
    stroke: colors.background,
    fill: colors.background
  } as Rect,
  row: {
    height: 35,
    fieldNameLabel: {
      "font-size": 20,
      fill: "#f6f8fa",
      "font-weight": "bold"
    },
    fieldTypeLabel: {
      "font-size": 18,
      fill: "#959da5"
    },
    body: {
      fill: "transparent",
      stroke: "transparent", // colors.primary,
      height: 25,
      cursor: "pointer"
    }
  } as Row
};
export default {
  colors,
  ...nodeStyles,
  line: {
    stroke: colors.line.inactive,
    fill: "transparent",
    strokeWidth: 3,
    strokeLinejoin: "round",
    targetMarker: {
      type: "path",
      d: "M 10 -5 0 0 10 5 z"
    }
  }
} as Theme;
