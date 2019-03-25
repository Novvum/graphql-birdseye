export interface Theme {
    gap: number;
    colors: Colors;
    header: Header;
    container: Rect;
    divider: Rect;
    row: Row;
    line: Line;
}

interface Rect {
    [key: string]: any;
}

interface Text {
    [key: string]: any;
}

interface Line {
    [key: string]: any;
    targetMarker: TargetMarker;
}

interface TargetMarker {
    [key: string]: any;
    type: string;
    d: string;
}

interface Row {
    [key: string]: any;
    height: number;
    fieldNameLabel: Text;
    fieldTypeLabel: Text;
    body: Rect;
}

interface Header {
    height: number;
    label: Text;
    container: Rect;
}

export interface Colors {
    primary: string;
    background: string;
    white: string;
    line: LineColors;
}

interface LineColors {
    active: string;
    inactive: string;
}
