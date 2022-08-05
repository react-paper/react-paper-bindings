import { useCallback, useEffect } from "react";
import { usePaper } from "../../context";
import { ToolName } from "../types";

const ZOOM_RATIO = 1.1;

export const useMouseWheel = (tool: ToolName) => {
  const [state, dispatch] = usePaper();

  const handleMouseWheel = useCallback(
    (event: WheelEvent) => {
      if (!state.scope) return;
      const { view, Point } = state.scope;
      // wheel target is not canvas
      if (view.element !== event.target) return;
      // stop wheel event to prevent browser scroll
      //event.preventDefault();
      event.stopPropagation();
      // calculate new zoom from wheel delta
      const newZoom = -event.deltaY > 0 ? 1 * ZOOM_RATIO : 1 / ZOOM_RATIO;
      // get view bounding rectangle
      const { left, top } = view.element.getBoundingClientRect();
      // convert mouse point to project space
      const center = view.viewToProject(
        new Point(event.clientX - left, event.clientY - top)
      );
      // transform view
      view.scale(newZoom, center);
      // dispatch new zoom
      dispatch({ type: "setZoom", zoom: view.zoom });
    },
    [dispatch, state.scope]
  );

  useEffect(() => {
    if (state.scope && state.tool === tool) {
      document.addEventListener("wheel", handleMouseWheel);
    }
    return () => {
      if (state.tool === tool) {
        document.removeEventListener("wheel", handleMouseWheel);
      }
    };
  }, [handleMouseWheel, state.scope, state.tool, tool]);
};
