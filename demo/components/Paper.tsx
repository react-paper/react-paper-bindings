import React, { FC } from "react";
import useMeasure from "react-use-measure";

import { Image } from "./image";
import { Toolbar } from "./toolbar";
import { Canvas } from "./Canvas";

import styles from "./Paper.module.css";

type Props = {
  image: Image;
};

export const Paper: FC<Props> = ({ image }) => {
  const [ref, { width, height }] = useMeasure({ debounce: 150 });
  return (
    <div className={styles.container}>
      <Toolbar className={styles.toolbar} />
      <div className={styles.routes}>Routes</div>
      <div className={styles.paper} ref={ref}>
        {width > 0 && height > 0 && (
          <Canvas image={image} width={width} height={height} />
        )}
      </div>
    </div>
  );
};
