import React, { ComponentProps } from 'react';
import styles from './Button.module.css';

type Props = ComponentProps<'button'> & {
  active?: boolean;
};

export const Button = ({ active = false, className, ...props }: Props) => {
  return (
    <button
      {...props}
      className={[styles.button, active ? styles.active : '', className].join(
        ' '
      )}
    />
  );
};
