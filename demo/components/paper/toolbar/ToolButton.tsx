import React, { ComponentProps, useCallback } from 'react';
import { usePaper } from '../context';
import { ToolName } from '../tools';

import { Button } from './button';
import { MoveIcon } from './icons/MoveIcon';
import { PenIcon } from './icons/PenIcon';
import { CircleIcon } from './icons/CircleIcon';
import { SelectIcon } from './icons/SelectIcon';
import { DeleteIcon } from './icons/DeleteIcon';

const icons = {
  [ToolName.Move]: MoveIcon,
  [ToolName.Pen]: PenIcon,
  [ToolName.Circle]: CircleIcon,
  [ToolName.Select]: SelectIcon,
  [ToolName.Delete]: DeleteIcon,
};

type Props = ComponentProps<'button'> & {
  tool: ToolName;
};

export const ToolButton = ({ tool, ...props }: Props) => {
  const [state, dispatch] = usePaper();
  const Icon = icons[tool];
  const handleClick = useCallback(
    () => dispatch({ type: 'setTool', tool }),
    [dispatch, tool]
  );
  return (
    <Button {...props} active={state.tool === tool} onClick={handleClick}>
      <Icon />
    </Button>
  );
};
