import { useCallback, useRef } from "react";

type Data = {
  center: number[];
  distance: number;
};

const getData = ({ touches }: TouchEvent, view: paper.View): Data => {
  const { top, left } = view.element.getBoundingClientRect();
  // touch points
  const x0 = touches[0].pageX - left;
  const y0 = touches[0].pageY - top;
  const x1 = touches[1].pageX - left;
  const y1 = touches[1].pageY - top;
  // center point between fingers
  const center = [(x0 + x1) / 2, (y0 + y1) / 2];
  // distance between fingers
  const distance = Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2));
  // return object describing touch state
  return { center, distance };
};

type State = {
  tx: number;
  ty: number;
  sx: number;
  sy: number;
  x: number;
  y: number;
  zoom: number;
};

const getState = (view: paper.View, prev: Data, next: Data): State => {
  // convert next center to view project space
  const center = view.viewToProject(next.center);
  // calculate distance between next and previous center
  const t = center.subtract(view.viewToProject(prev.center));
  // calculate next transformation scale
  const scale = next.distance / prev.distance;
  // return object describing the touch transformation
  return {
    tx: t.x,
    ty: t.y,
    sx: center.x,
    sy: center.y,
    x: t.x,
    y: t.y,
    zoom: scale,
  };
};

export const usePinch = () => {
  const pinch = useRef<Data | null>(null);

  const mouseDrag = useCallback(({ event, tool }: paper.ToolEvent) => {
    const touchEvent = event as unknown as TouchEvent;
    const next = getData(touchEvent, tool.view);
    if (pinch.current) {
      const state = getState(tool.view, pinch.current, next);
      tool.view.scale(state.zoom, [state.sx, state.sy]);
      tool.view.translate(state.tx, state.ty);
    }
    pinch.current = next;
  }, []);

  const mouseUp = useCallback(() => {
    pinch.current = null;
  }, []);

  return {
    mouseDrag,
    mouseUp,
  };
};
