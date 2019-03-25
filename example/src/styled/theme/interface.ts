import { Colors, Sizes, ZIndex, Shorthands, Shape, ThemeColors } from "./index";
import { Theme } from "graphql-birdseye/dist/defaultTheme";
export interface ThemeInterface {
  colors: Colors;
  sizes: Sizes;
  shape: Shape;
  shadows: any;
  zIndex: ZIndex;
  shorthands: Shorthands;
  transitions;
  themeColors: ThemeColors;
  customBirdseyeTheme: Theme;
}
