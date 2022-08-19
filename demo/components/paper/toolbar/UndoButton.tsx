import React, { useCallback } from 'react';
import { usePaper } from '../context';
import { UndoIcon } from './icons/UndoIcon';
import { IconButton, Props } from './IconButton';

export const UndoButton = (props: Props) => {
  const [{ historyIndex }, dispatch] = usePaper();
  const handleClick = useCallback(() => dispatch({ type: 'undo' }), [dispatch]);
  return (
    <IconButton {...props} disabled={historyIndex === 0} onClick={handleClick}>
      <UndoIcon />
    </IconButton>
  );
};
