import React, { FC } from "react";
import { Svg, Props } from "./Svg";

export const SelectIcon: FC<Props> = (props) => {
  return (
    <Svg {...props}>
      <title>Select</title>
      <path
        fill="currentColor"
        d="M267.024 282.48l84.976 197.52-64 32-74.336-202.848-117.664 106.848v-416l320 256-148.976 26.48z"
      ></path>
    </Svg>
  );
};
