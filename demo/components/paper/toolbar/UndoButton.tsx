import React, { ComponentProps, useCallback } from 'react';
import { usePaper } from '../context';
import { UndoIcon } from './icons/UndoIcon';
import { Button } from './button';

type Props = ComponentProps<'button'>;

export const UndoButton = (props: Props) => {
  const [{ historyIndex }, dispatch] = usePaper();
  const handleClick = useCallback(() => dispatch({ type: 'undo' }), [dispatch]);
  return (
    <Button {...props} disabled={historyIndex === 0} onClick={handleClick}>
      <UndoIcon />
    </Button>
  );
};
