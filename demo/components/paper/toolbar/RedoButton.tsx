import React, { useCallback } from 'react';
import { usePaper } from '../context';
import { RedoIcon } from './icons/RedoIcon';
import { IconButton, Props } from './IconButton';

export const RedoButton = (props: Props) => {
  const [{ history, historyIndex }, dispatch] = usePaper();
  const handleClick = useCallback(() => dispatch({ type: 'redo' }), [dispatch]);
  return (
    <IconButton
      {...props}
      disabled={historyIndex >= history.length - 1}
      onClick={handleClick}
    >
      <RedoIcon />
    </IconButton>
  );
};
