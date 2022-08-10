import React, { useCallback, useState } from 'react';
import type { NextPage } from 'next';
import { Container, Canvas } from 'components/content';
import { View, Layer, Circle, Tool } from 'react-paper-bindings';
import { Color } from 'paper/dist/paper-core';

function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function randomColor() {
  const rgb = `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
  return new Color(rgb).toCSS(true);
}

type ICircle = {
  id: number;
  center: paper.Point | [number, number];
  radius: number;
  fillColor: any;
};

const Selection: NextPage = () => {
  const [circles, setCircles] = useState<ICircle[]>([]);

  const handleMouseDown = useCallback(
    (e: paper.ToolEvent) => {
      setCircles([
        ...circles,
        {
          id: circles.length + 1,
          center: [e.point.x, e.point.y],
          radius: random(3, 30),
          fillColor: randomColor(),
        },
      ]);
    },
    [circles]
  );

  return (
    <Container>
      <Canvas>
        <View>
          <Layer>
            {circles.map((props) => (
              <Circle key={props.id} {...props} />
            ))}
          </Layer>
        </View>
        <Tool onMouseDown={handleMouseDown} />
      </Canvas>
    </Container>
  );
};

export default Selection;
