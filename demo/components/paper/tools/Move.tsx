import React, { FC, useCallback } from "react";
import { Tool } from "react-paper-bindings";
import { usePaper } from "../context";
import { usePan, usePinch, useMouseWheel } from "./utils";
import { ToolName } from "./types";

const NAME = ToolName.Move;

export const Move: FC = () => {
  const [state] = usePaper();
  const pinch = usePinch();
  const pan = usePan();

  useMouseWheel(NAME);

  const handleMouseDown = useCallback(
    (/*event: paper.ToolEvent*/) => {
      /*
    if (doubleTap(event.event)) {
      // TODO reset image
    }
    */
    },
    []
  );

  const handleMouseDrag = useCallback(
    (event: paper.ToolEvent) => {
      const { event: e } = event;
      if (e instanceof TouchEvent && e.touches.length === 2) {
        pinch.mouseDrag(event);
      } else {
        pan.mouseDrag(event);
      }
    },
    [pan, pinch]
  );

  const handleMouseUp = useCallback(() => {
    pan.mouseUp();
    pinch.mouseUp();
  }, [pan, pinch]);

  return (
    <Tool
      name={NAME}
      active={state.tool === NAME}
      onMouseDown={handleMouseDown}
      onMouseDrag={handleMouseDrag}
      onMouseUp={handleMouseUp}
    />
  );
};
