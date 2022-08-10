import React, { useEffect, useRef } from 'react';
import { FiberRoot } from 'react-reconciler';
import { ConcurrentRoot } from 'react-reconciler/constants';
import { PaperScope } from 'paper/dist/paper-core';

import { Renderer } from './Renderer';
import { useEffectOnce } from './useEffectOnce';

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
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const scope = useRef<paper.PaperScope | null>(null);
  const fiber = useRef<FiberRoot | null>(null);

  useEffectOnce(() => {
    // create
    if (canvas.current instanceof HTMLCanvasElement) {
      scope.current = new PaperScope();
      Object.assign(scope.current.settings, {
        ...settings,
        insertItems: false,
      });
      scope.current.setup(canvas.current);
      fiber.current = Renderer.createContainer(
        scope.current,
        ConcurrentRoot,
        null,
        false,
        null,
        '',
        console.error,
        null
      );
      Renderer.updateContainer(null, fiber.current, null, () => null);
      if (typeof onScopeReady === 'function') {
        onScopeReady(scope.current);
      }
    }

    // destroy
    return () => {
      if (fiber.current) {
        Renderer.updateContainer(null, fiber.current, null, () => null);
      }
      canvas.current = null;
      scope.current = null;
      fiber.current = null;
    };
  });

  // update
  useEffect(() => {
    if (scope.current && fiber.current) {
      Renderer.updateContainer(children, fiber.current, null, () => null);
    }
  }, [children]);

  // resize
  useEffect(() => {
    if (scope.current) {
      scope.current.view.viewSize = new scope.current.Size(width, height);
    }
  }, [width, height]);

  return <canvas {...other} ref={canvas} />;
};
