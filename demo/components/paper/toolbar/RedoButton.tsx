import React, { ComponentProps } from 'react';
import { usePaper } from '../context';
import { RedoIcon } from './icons/RedoIcon';
import { Button } from './button';

type Props = ComponentProps<'button'>;

export const RedoButton = (props: Props) => {
  const [{ history, historyIndex }, dispatch] = usePaper();
  return (
    <Button
      {...props}
      disabled={historyIndex >= history.length - 1}
      onClick={() => dispatch({ type: 'redo' })}
    >
      <RedoIcon />
    </Button>
  );
};
