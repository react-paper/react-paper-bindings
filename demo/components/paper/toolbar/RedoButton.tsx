import React, { ComponentProps, useCallback } from 'react';
import { usePaper } from '../context';
import { RedoIcon } from './icons/RedoIcon';
import { Button } from './button';

type Props = ComponentProps<'button'>;

export const RedoButton = (props: Props) => {
  const [{ history, historyIndex }, dispatch] = usePaper();
  const handleClick = useCallback(() => dispatch({ type: 'redo' }), [dispatch]);
  return (
    <Button
      {...props}
      disabled={historyIndex >= history.length - 1}
      onClick={handleClick}
    >
      <RedoIcon />
    </Button>
  );
};
