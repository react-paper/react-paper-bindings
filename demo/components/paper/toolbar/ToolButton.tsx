import React, { useCallback } from 'react';
import { usePaper } from '../context';
import { ToolName } from '../tools';

import { IconButton, Props as IconButtonProps } from './IconButton';
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

type Props = IconButtonProps & {
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
    <IconButton {...props} active={state.tool === tool} onClick={handleClick}>
      <Icon />
    </IconButton>
  );
};
