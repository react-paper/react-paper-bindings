import { useRef } from 'react';
import { PaperScope } from 'paper/dist/paper-core';

export const usePaperScope = () => {
  const scopeRef = useRef(new PaperScope());
  return scopeRef.current;
};
