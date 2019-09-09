export interface Theme {
  gap: number;
  colors: Colors;
  header: Header;
  container: Rect;
  divider: Rect;
  row: Row;
  line: Line;
}

export interface Rect {
  [key: string]: any;
}

export interface Text {
  [key: string]: any;
}

export interface Line {
  [key: string]: any;
  targetMarker: TargetMarker;
}

export interface TargetMarker {
  [key: string]: any;
  type: string;
  d: string;
}

export interface Row {
  [key: string]: any;
  height: number;
  fieldNameLabel: Text;
  fieldTypeLabel: Text;
  body: Rect;
}

export interface Header {
  height: number;
  label: Text;
  subLabel: Text;
  container: Rect;
}

export interface Colors {
  primary: string;
  background: string;
  white: string;
  line: LineColors;
}

export interface LineColors {
  active: string;
  inactive: string;
}
