import { Theme, Rect, Row } from "./types";

const baseColors = {
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

const colors = {
    primary: baseColors.pink,
    background: baseColors.darkPurple,
    white: "#ffffff",
    line: {
        active: baseColors.pink, // "#38616b",
        inactive: baseColors.white
    }
};

const nodeStyles = {
    gap: 15,
    container: {
        fill: baseColors.black,
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

export * from "./types";