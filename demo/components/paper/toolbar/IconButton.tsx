import clsx from 'clsx';
import React from 'react';
import { Button, ButtonProps } from 'react-daisyui';

export type Props = ButtonProps & {
  active?: boolean;
};

export const IconButton = ({
  active = false,
  className,
  children,
  ...props
}: Props) => {
  return (
    <Button
      {...props}
      shape="circle"
      size="sm"
      color={active ? 'secondary' : 'ghost'}
      className={clsx('mx-1', className)}
    >
      {children}
    </Button>
  );
};
