import React from 'react';
import useMeasure from 'react-use-measure';

import { Provider } from './context';
import { Toolbar } from './toolbar';
import { Canvas } from './Canvas';
import { Image } from './image';

type Props = {
  image: Image;
};

export const Paper = ({ image }: Props) => {
  const [ref, { width, height }] = useMeasure({ debounce: 150 });
  return (
    <Provider>
      <div className="relative flex flex-1 flex-col w-full h-full">
        <Toolbar className="flex w-full h-12 justify-center items-center" />
        <div className="flex-1 overflow-hidden" ref={ref}>
          {width > 0 && height > 0 && (
            <Canvas image={image} width={width} height={height} />
          )}
        </div>
      </div>
    </Provider>
  );
};
