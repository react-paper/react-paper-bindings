import React from 'react';
import { Svg, Props } from './Svg';

export const MoveIcon = (props: Props) => {
  return (
    <Svg {...props}>
      <title>Move</title>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        d="M176 112l80-80 80 80M255.98 32l.02 448M176 400l80 80 80-80M400 176l80 80-80 80M112 176l-80 80 80 80M32 256h448"
      />
    </Svg>
  );
};
