import React, { FC } from "react";
import { Circle as PaperCircle } from "react-paper-bindings";

type Props = {
  id?: string;
  active?: boolean;
  pathData?: string;
  selected?: boolean;
  strokeColor?: string;
  strokeScaling?: boolean;
  strokeWidth?: number;
};

/*
const pathProps = {
  data: { type: 'Circle' },
  strokeColor: '#ff0000',
  strokeWidth: 3,
  strokeScaling: false,
}
*/

export const Circle: FC<Props> = (props) => {
  //const ctx = useContext(Context)
  //const hit = useRef<any>(null)

  /*
  const handleMouseEnter = useCallback(() => {
    if (document.body) {
      document.body.style.cursor = 'pointer'
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (document.body) {
      document.body.style.cursor = 'auto'
    }
  }, [])

  const handleMouseDown = useCallback((event: paper.ToolEvent) => {
    const circle = event.target

    hit.current = circle.hitTest(event.point, {
      fill: false,
      stroke: true,
      segments: true,
      tolerance: 5,
    })
  }, [])
  
  const handleMouseDrag = useCallback((event: paper.ToolEvent) => {
    if (!hit.current) return

    if (hit.current.type === 'segment') {
      const circle = event.target
      const center = circle.bounds.center
      const radius = center.getDistance(e.point)
      if (radius < 1) return
      const x = center.x - radius
      const y = center.y - radius
      const size = radius * 2
      circle.fitBounds(x, y, size, size)
    }

    if (hit.current.type === 'stroke') {
      event.target.translate(e.delta)
    }
  }, [])

  const handleMouseUp = useCallback((event: paper.ToolEvent) => {
    if (!hit.current || !e.target) return
    
    const item = ['Path', {
      ...pathProps,
      pathData: event.target.pathData,
    }]
    
    // TODO: fix this!
    // will dispatch every time we mouse up on a circle!!!
    ctx.dispatch({ type: 'updateItem', item })
    
    hit.current = null
  }, [])
  */

  return (
    <PaperCircle
      {...props}
      //onMouseEnter={this.handleMouseEnter}
      //onMouseLeave={this.handleMouseLeave}
      //onMouseDown={this.handleMouseDown}
      //onMouseDrag={this.handleMouseDrag}
      //onMouseUp={this.handleMouseUp}
    />
  );
};
