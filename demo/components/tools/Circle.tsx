import React, { FC, useCallback, useRef } from "react";
import { Tool } from "react-paper-renderer";
import { ItemName } from "../items";
import { usePaper } from "../context";
import { createItem, defaultProps } from "./utils";

const NAME = "Circle";

export const Circle: FC = () => {
  const [state, dispatch] = usePaper();
  const circle = useRef<paper.Path.Circle | null>(null);

  const handleMouseDown = useCallback(
    (event: paper.ToolEvent) => {
      if (state.scope) {
        circle.current = new state.scope.Path.Circle({
          ...defaultProps,
          insert: true,
          center: event.point,
          radius: 10,
        });
        state.scope.project.activeLayer.addChild(circle.current);
      }
    },
    [state.scope]
  );

  const handleMouseDrag = useCallback(
    (event: paper.ToolEvent) => {
      if (state.scope && circle.current) {
        const center = event.downPoint;
        const radius = center.getDistance(event.point);
        if (radius > 0) {
          const x = center.x - radius;
          const y = center.y - radius;
          const size = radius * 2;
          circle.current.fitBounds(x, y, size, size);
        }
      }
    },
    [state.scope]
  );

  const handleMouseUp = useCallback(() => {
    if (state.image && circle.current) {
      dispatch({
        type: "addItem",
        item: createItem(ItemName.Circle, {
          pathData: circle.current.pathData,
        }),
      });
      circle.current.remove();
      circle.current = null;
    }
  }, [dispatch, state.image]);

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
