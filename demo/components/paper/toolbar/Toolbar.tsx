import React, { ComponentProps } from 'react';
import { UndoButton } from './UndoButton';
import { RedoButton } from './RedoButton';
import { SaveButton } from './SaveButton';
import { ToolButton } from './ToolButton';
import { ToolName } from '../tools';

type Props = ComponentProps<'div'>;

const Separator = () => <span className="mx-1 pointer-events-none">|</span>;

export const Toolbar = (props: Props) => {
  return (
    <div {...props}>
      <ToolButton tool={ToolName.Move} />
      <ToolButton tool={ToolName.Pen} />
      <ToolButton tool={ToolName.Circle} />
      <ToolButton tool={ToolName.Select} />
      <ToolButton tool={ToolName.Delete} />
      <Separator />
      <UndoButton />
      <RedoButton />
      <Separator />
      <SaveButton />
    </div>
  );
};
