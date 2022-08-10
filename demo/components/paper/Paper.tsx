import React from 'react';
import useMeasure from 'react-use-measure';

import { Provider } from './context';
import { Toolbar } from './toolbar';
import { Canvas } from './Canvas';
import { Image } from './image';

import styles from './Paper.module.css';

type Props = {
  image: Image;
};

export const Paper = ({ image }: Props) => {
  const [ref, { width, height }] = useMeasure({ debounce: 150 });
  return (
    <Provider>
      <div className={styles.container}>
        <Toolbar className={styles.toolbar} />
        <div className={styles.paper} ref={ref}>
          {width > 0 && height > 0 && (
            <Canvas image={image} width={width} height={height} />
          )}
        </div>
      </div>
    </Provider>
  );
};
