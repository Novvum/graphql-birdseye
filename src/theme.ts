const colors = {
  primary: "#548f9e",
  background: "#ffffff",
  white: "#ffffff",
  line: {
    active: "#38616b",
    inactive: "#E8E8E8"
  }
};

const nodeStyles = {
  header: {
    label: {
      "font-size": 18,
      "text-anchor": "middle",
      fill: "white"
    },
    container: {
      height: 36,
      fill: colors.primary,
      stroke: colors.primary
    }
  },
  body: {
    stroke: colors.primary
  },
  row: {
    height: 36,
    label: {
      fill: "#000"
    },
    body: {
      fill: "transparent",
      stroke: colors.primary,
      height: 40
    }
  }
};
export default {
  colors,
  ...nodeStyles,
  line: {
    stroke: colors.line.inactive,
    fill: "transparent",
    strokeWidth: 2,
    strokeLinejoin: "round",
    targetMarker: {
      type: "path",
      d: "M 10 -5 0 0 10 5 z"
    }
  }
};
