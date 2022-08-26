import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { ConcurrentRoot } from 'react-reconciler/constants';
import { FiberRoot } from 'react-reconciler';
import { PaperScope } from 'paper/dist/paper-core';
import { Renderer } from './Renderer';

export type PaperScopeSettings = {
  insertItems?: boolean;
  applyMatrix?: boolean;
  handleSize?: number;
  hitTolerance?: number;
};

export type Props = React.ComponentProps<'canvas'> & {
  width: number;
  height: number;
  settings?: PaperScopeSettings;
  onScopeReady?: (scope: paper.PaperScope) => void;
};

export type CanvasRef = HTMLCanvasElement | null;
export type ScopeRef = paper.PaperScope | null;
export type FiberRef = FiberRoot | null;

export const Canvas = forwardRef<CanvasRef, Props>(function Canvas(
  props,
  forwardedRef
) {
  const { children, width, height, settings, onScopeReady, ...other } = props;
  const [canvas, setCanvas] = useState<CanvasRef>(null);
  const canvasRef = useRef<CanvasRef>(null);
  const scopeRef = useRef<ScopeRef>(null);
  const fiberRef = useRef<FiberRef>(null);

  useImperativeHandle<CanvasRef, CanvasRef>(forwardedRef, () => canvasRef.current);

  // create
  useEffect(() => {
    if (canvas instanceof HTMLCanvasElement) {
      if (!scopeRef.current) {
        scopeRef.current = new PaperScope();
      }
      Object.assign(scopeRef.current.settings, {
        ...settings,
        insertItems: false,
      });
      scopeRef.current.setup(canvas);
      fiberRef.current = Renderer.createContainer(
        scopeRef.current,
        ConcurrentRoot,
        null,
        false,
        null,
        '',
        console.error,
        null
      );
      Renderer.updateContainer(null, fiberRef.current, null, () => null);
      if (typeof onScopeReady === 'function') {
        onScopeReady(scopeRef.current);
      }
    } else if (canvasRef.current) {
      setCanvas(canvasRef.current);
    }

    // destroy
    return () => {
      if (canvas) {
        if (fiberRef.current) {
          Renderer.updateContainer(null, fiberRef.current, null, () => null);
        }
        scopeRef.current = null;
        canvasRef.current = null;
        fiberRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvas]);

  // update
  useEffect(() => {
    if (fiberRef.current) {
      Renderer.updateContainer(children, fiberRef.current, null, () => null);
    }
  }, [canvas, children]);

  // resize
  useEffect(() => {
    if (scopeRef.current) {
      scopeRef.current.view.viewSize = new scopeRef.current.Size(width, height);
    }
  }, [canvas, width, height]);

  return <canvas {...other} ref={canvasRef} />;
});
