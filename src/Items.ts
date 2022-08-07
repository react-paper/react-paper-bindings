type Component = string | React.ElementType;

export const View: Component = "View";
export const Group: Component = "Group";
export const Layer: Component = "Layer";
export const Path: Component = "Path";
export const CompoundPath: Component = "CompoundPath";
export const Line: Component = "Line";
export const Circle: Component = "Circle";
export const Rectangle: Component = "Rectangle";
export const Ellipse: Component = "Ellipse";
export const Arc: Component = "Arc";
export const RegularPolygon: Component = "RegularPolygon";
export const PointText: Component = "PointText";
export const Raster: Component = "Raster";
export const SymbolItem: Component = "SymbolItem";
export const Tool: Component = "Tool";

/*
type Props<T> = {
  [K in keyof T]?: T[K] extends paper.Color
    ? paper.Color | string
    : T[K] extends paper.Point
    ? paper.Point | [number, number]
    : T[K] extends paper.Size
    ? paper.Size | [number, number]
    : T[K];
};

type ItemProps = Props<paper.Item>;

type RectangleProps = Props<paper.Rectangle>;

type ViewProps = {
  id?: number | string;
  name?: string;
  children?: React.ReactNode;
};

export interface PaperElements {
  View: ViewProps;
  Rectangle: ItemProps & RectangleProps;
}

declare global {
  namespace JSX {
    interface IntrinsicElements extends PaperElements {}
  }
}
*/
