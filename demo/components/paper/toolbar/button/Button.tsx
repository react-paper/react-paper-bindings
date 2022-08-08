import React, { ComponentProps, FC } from "react";
import styles from "./Button.module.css";

type Props = ComponentProps<"button"> & {
  active?: boolean;
};

export const Button: FC<Props> = ({ active = false, className, ...props }) => {
  return (
    <button
      {...props}
      className={[styles.button, active ? styles.active : "", className].join(
        " "
      )}
    />
  );
};
