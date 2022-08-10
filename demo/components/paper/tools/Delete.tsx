import React, { useCallback } from 'react';
import { Tool } from 'react-paper-bindings';
import { usePaper } from '../context';

const NAME = 'Delete';

export const Delete = () => {
  const [state, dispatch] = usePaper();

  const handleMouseDown = useCallback(
    (event: paper.ToolEvent) => {
      if (!state.scope) return;

      const hit = state.scope.project.hitTest(event.point, {
        fill: true,
        segments: true,
        stroke: true,
        tolerance: 15,
      });
      if (!hit || !hit.item) return;

      dispatch({ type: 'removeItem', index: hit.item.index });
    },
    [dispatch, state.scope]
  );

  return (
    <Tool
      name={NAME}
      active={state.tool === NAME}
      onMouseDown={handleMouseDown}
    />
  );
};
