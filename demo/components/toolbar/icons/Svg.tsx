import React, { ComponentProps, FC, ReactNode } from "react";

export type Props = ComponentProps<"svg"> & {
  size?: number;
};

export const Svg: FC<Props> = ({ size = 24, ...props }) => {
  return (
    <svg
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      width={size}
      height={size}
    />
  );
};
