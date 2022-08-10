/**
 * Add custom paper.js attributes to <canvas> element
 *
 * @see http://paperjs.org/tutorials/getting-started/working-with-paper-js/#canvas-configuration
 */
declare namespace react {
  interface CanvasHTMLAttributes<T> extends React.HTMLAttributes<T> {
    height?: number | string;
    width?: number | string;
    resize?: 'true';
    hidpi?: 'off';
    keepalive?: 'true';
  }
}

/**
 * Add custom paper.js types related to renderer
 *
 * @see http://paperjs.org/reference/paperscope/
 */
declare namespace paper {
  type Props = {
    [key: string]: any;
  };
  interface PaperScope {
    symbols?: { [key: string]: SymbolDefinition };
  }
  interface View {
    props: Props;
    type: string;
    project: Project;
    scale(scale: number, center?: Point): void;
    scale(scale: number, center?: number[]): void;
    scale(hor: number, ver: number, center?: Point): void;
    translate(delta: Point): void;
    translate(dx: number, dy: number): void;
    projectToView(point: Point): Point;
    projectToView(point: number[]): Point;
    viewToProject(point: Point): Point;
    viewToProject(point: number[]): Point;
  }
  interface Raster {
    fitBounds(rectangle: Rectangle, fill?: boolean): void;
    fitBounds(x: number, y: number, width: number, height: number): void;
  }
  interface Tool {
    props: Props;
    type: string;
    view: View;
  }
  interface ToolEvent {
    tool: Tool;
    event: PointerEvent;
  }
  interface Item {
    props: Props;
    type: string;
    pathData?: string;
    selectionKey?: string | number;
    translate(delta: Point): void;
    translate(delta: [number, number]): void;
    fitBounds(rectangle: Rectangle, fill?: boolean): void;
    fitBounds(x: number, y: number, width: number, height: number): void;
  }
}
