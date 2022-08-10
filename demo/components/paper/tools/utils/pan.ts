import { useCallback, useRef } from 'react';

type Data = {
  point: paper.Point;
  x: number;
  y: number;
};

const getData = ({ point, event, tool }: paper.ToolEvent): Data => {
  if (event instanceof TouchEvent) {
    return {
      point: tool.view.projectToView(point),
      x: event.touches[0].pageX,
      y: event.touches[0].pageY,
    };
  } else {
    return {
      point: tool.view.projectToView(point),
      x: event.pageX,
      y: event.pageY,
    };
  }
};

type State = {
  tx: number;
  ty: number;
  x: number;
  y: number;
};

const getState = ({ point, tool }: paper.ToolEvent, prev: Data): State => {
  const t = point.subtract(tool.view.viewToProject(prev.point));
  return {
    tx: t.x,
    ty: t.y,
    x: t.x,
    y: t.y,
  };
};

export const usePan = () => {
  const pan = useRef<Data | null>(null);

  const mouseDrag = useCallback((event: paper.ToolEvent) => {
    const next = getData(event);
    if (pan.current) {
      const state = getState(event, pan.current);
      event.tool.view.translate(state.tx, state.ty);
    }
    pan.current = next;
  }, []);

  const mouseUp = useCallback(() => {
    pan.current = null;
  }, []);

  return {
    mouseDrag,
    mouseUp,
  };
};
