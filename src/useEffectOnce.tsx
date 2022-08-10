/**
 * Enable pre React 18 useEffect behavior.
 *
 * https://blog.ag-grid.com/avoiding-react-18-double-mount/
 */

import { EffectCallback, useEffect, useRef, useState } from 'react';

export const useEffectOnce = (effect: EffectCallback) => {
  const effectFn = useRef<EffectCallback>(effect);
  const destroyFn = useRef<void | (() => void)>();
  const effectCalled = useRef<boolean>(false);
  const rendered = useRef<boolean>(false);
  const [, refresh] = useState<number>(0);

  if (effectCalled.current) {
    rendered.current = true;
  }

  useEffect(() => {
    if (!effectCalled.current) {
      destroyFn.current = effectFn.current();
      effectCalled.current = true;
    }

    refresh(1);

    return () => {
      if (!rendered.current) return;
      if (destroyFn.current) destroyFn.current();
    };
  }, []);
};
