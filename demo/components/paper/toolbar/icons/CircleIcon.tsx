import React from 'react';
import { Svg, Props } from './Svg';

export const CircleIcon = (props: Props) => {
  return (
    <Svg {...props}>
      <title>Circle</title>
      <circle
        cx="256"
        cy="256"
        r="192"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
      />
    </Svg>
  );
};
