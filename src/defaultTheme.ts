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
    stroke: colors.line.active,
    fill: "transparent",
    strokeWidth: 2,
    strokeLinejoin: "round",
    targetMarker: {
      type: "path",
      d: "M 10 -5 0 0 10 5 z"
    }
  }
};

export interface Theme {
  colors: Colors;
  header: Header;
  body: Body;
  row: Row;
  line: Line2;
}

interface Line2 {
  stroke: string;
  fill: string;
  strokeWidth: number;
  strokeLinejoin: string;
  targetMarker: TargetMarker;
}

interface TargetMarker {
  type: string;
  d: string;
}

interface Row {
  height: number;
  label: Label2;
  body: Container;
}

interface Label2 {
  fill: string;
}

interface Body {
  stroke: string;
}

interface Header {
  label: Label;
  container: Container;
}

interface Container {
  height: number;
  fill: string;
  stroke: string;
}

interface Label {
  "font-size": number;
  "text-anchor": string;
  fill: string;
}

interface Colors {
  primary: string;
  background: string;
  white: string;
  line: Line;
}

interface Line {
  active: string;
  inactive: string;
}
