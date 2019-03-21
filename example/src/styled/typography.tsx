/* tslint:disable */
import Typography, { TypographyOptions } from "typography";
import { theme as styledTheme } from "./theme";

const options: TypographyOptions = {
  baseFontSize: "16px",
  baseLineHeight: "26px",
  headerFontFamily: [
    "Source Code Pro",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Helvetica",
    "Arial",
    "sans-serif",
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol"
  ],
  bodyFontFamily: [
    "Open Sans",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Helvetica",
    "Arial",
    "sans-serif",
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol"
  ],
  googleFonts: [
    {
      name: "Open Sans",
      styles: ["300", "400", "600", "700"]
    },
    {
      name: "Source Code Pro",
      styles: ["300", "400", "600", "700"]
    }
  ],
  scaleRatio: 2,
  bodyColor: styledTheme.themeColors.text,
  headerWeight: 600,
  bodyWeight: "normal",
  boldWeight: 600,
  // Github has all block elements use 1/2 rhythm not a full rhythm.
  blockMarginBottom: 1 / 2,
  overrideStyles: ({ rhythm }) => ({
    h1: {
      paddingBottom: `calc(${rhythm(1 / 4)} - 1px)`,
      marginBottom: rhythm(3 / 4),
      marginTop: rhythm(1.5)
    },
    h2: {
      paddingBottom: `calc(${rhythm(1 / 3)} - 1px)`,
      marginBottom: rhythm(1 / 3),
      marginTop: rhythm(1.3),
      color: styledTheme.themeColors.text
    },
    h3: {
      color: styledTheme.themeColors.text
    },
    h4: {
      color: styledTheme.themeColors.text
    },
    h5: {
      color: styledTheme.themeColors.text
    },
    h6: {
      color: styledTheme.themeColors.text
    },
    "h2,h3,h4,h5": {
      fontFamily:
        '"Source Code Pro", "SFMono-Regular", Consolas,"Roboto Mono","Droid Sans Mono","Liberation Mono",Menlo,Courier,monospace',
      fontWeight: "400"
    },
    "h3,h4,h5,h6": {
      marginBottom: rhythm(1 / 2),
      marginTop: rhythm(1)
    },
    "ol,ul": {
      marginLeft: rhythm(1.25)
    },
    // children ol, ul
    "li>ol,li>ul": {
      marginLeft: rhythm(1.25)
    },
    a: {
      color: styledTheme.themeColors.link,
      textDecoration: "none"
    },
    "a:hover,a:active": {
      color: styledTheme.colors.white
    },
    blockquote: {
      color: styledTheme.themeColors.text,
      marginTop: 0,
      marginRight: 0,
      marginLeft: 0,
      paddingLeft: `calc(${rhythm(1 / 2)} - 1px)`
    },
    "tt,code": {
      borderRadius: "3px",
      fontFamily:
        '"Source Code Pro", "SFMono-Regular", Consolas,"Roboto Mono","Droid Sans Mono","Liberation Mono",Menlo,Courier,monospace',
      padding: "0.12em 0.35em 0.16em"
    },
    pre: {
      borderRadius: "3px",
      lineHeight: 1.42,
      overflow: "auto",
      wordWrap: "normal", // So code will scroll on Safari.
      padding: "1rem 1.5rem 1rem 1.5rem",
      margin: "25px 0px"
    },
    "pre code": {
      background: "none",
      lineHeight: 1.42
    },
    // Add space before and after code/tt elements.
    "code:before,code:after,tt:before,tt:after": {
      letterSpacing: "-0.2em",
      content: '"\u00A0"'
    },
    // But don't add spaces if the code is inside a pre.
    "pre code:before,pre code:after,pre tt:before,pre tt:after": {
      content: "none"
    }
  })
};

const typography = new Typography(options);

export const { scale, rhythm } = typography;

export default typography;
