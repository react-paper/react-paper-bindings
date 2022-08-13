import React, { useEffect, useRef, useState } from 'react';
import { ConcurrentRoot } from 'react-reconciler/constants';
import { FiberRoot } from 'react-reconciler';
import { PaperScope } from 'paper/dist/paper-core';
import { Renderer } from './Renderer';

type PaperScopeSettings = {
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

export const Canvas = ({
  children,
  width,
  height,
  settings,
  onScopeReady,
  ...other
}: Props) => {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const scopeRef = useRef<paper.PaperScope | null>(null);
  const fiberRef = useRef<FiberRoot | null>(null);

  useEffect(() => {
    // create
    if (canvas instanceof HTMLCanvasElement) {
      scopeRef.current = new PaperScope();
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
    if (scopeRef.current && fiberRef.current) {
      Renderer.updateContainer(children, fiberRef.current, null, () => null);
    }
  }, [canvas, children]);

  // resize
  useEffect(() => {
    if (scopeRef.current) {
      scopeRef.current.view.viewSize = new scopeRef.current.Size(width, height);
    }
  }, [canvas, width, height]);

  // mounted
  useEffect(() => {
    setCanvas(canvasRef.current);
  }, []);

  return <canvas {...other} ref={canvasRef} />;
};
