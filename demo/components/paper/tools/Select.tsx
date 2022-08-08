import React, { useCallback, useRef } from "react";
//import { Path, PathItem } from "paper/dist/paper-core";
import { Tool } from "react-paper-bindings";
import { usePaper } from "../context";

const NAME = "Select";

export const Select = () => {
  const [state, dispatch] = usePaper();
  const item = useRef<paper.Item>();
  const point = useRef<paper.Point>();
  const changed = useRef<boolean>(false);

  const handleMouseDown = useCallback(
    (event: paper.ToolEvent) => {
      if (state.scope) {
        const hit = state.scope.project.hitTest(event.point, {
          fill: true,
          segments: true,
          stroke: true,
          tolerance: 10,
        });
        if (hit && hit.item) {
          hit.item.layer.selected = false;
          hit.item.selected = true;
          //hit.item.bringToFront();
          item.current = hit.item;
          point.current = event.point;
        } else {
          item.current = undefined;
          point.current = undefined;
          dispatch({ type: "setSelection", selection: undefined });
        }
      }
    },
    [state.scope, dispatch]
  );

  const handleMouseDrag = useCallback((event: paper.ToolEvent) => {
    if (item.current && point.current) {
      item.current.translate(event.point.subtract(point.current));
      changed.current = true;
      point.current = event.point;
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    if (item.current && changed.current) {
      dispatch({ type: "setSelection", selection: item.current.props.id });
      dispatch({
        type: "updateItem",
        index: item.current.index,
        item: {
          pathData: item.current.pathData,
        },
      });
    }
    changed.current = false;
    point.current = undefined;
  }, [dispatch]);

  /*
  const handleKeyDown = useCallback((event: paper.ToolEvent) => {
    if (!item.current) return

    const { key, modifiers: { shift } } = event
    switch (key) {
      case 'delete':
        actions.item.remove(item.current)
        changed.current = false
        item.current = null
        point.current = null
        break
      case 'up':
        item.current.translate(0, shift ? -10 : -1)
        changed.current = true
        break
      case 'down':
        item.current.translate(0, shift ? 10 : 1)
        changed.current = true
        break
      case 'left':
        item.current.translate(shift ? -10 : -1, 0)
        changed.current = true
        break
      case 'right':
        item.current.translate(shift ? 10 : 1, 0)
        changed.current = true
        break
      default:
        break
    }
  }, []);

  const handleKeyUp = useCallback((event: paper.ToolEvent) => {
    if (!item.current || !changed.current || event.key === 'shift') return

    // debounce history update
    // when user preses some key multiple times
    // we don't immediately record history change
    // because we would end up with many small changes

    const { current } = item
    const { pathData } = current

    setTimeout(() => {
      actions.item.update(current, { pathData })
      changed.current = false
    }, 350)
  }, []);
  */

  return (
    <Tool
      name={NAME}
      active={state.tool === NAME}
      //onKeyUp={handleKeyUp}
      //onKeyDown={handleKeyDown}
      onMouseDown={handleMouseDown}
      onMouseDrag={handleMouseDrag}
      onMouseUp={handleMouseUp}
    />
  );
};
