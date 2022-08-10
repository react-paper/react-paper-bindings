import React, { useState } from 'react';
import type { NextPage } from 'next';
import { Container, Canvas } from 'components/content';
import {
  View,
  Layer,
  Rectangle as PaperRectangle,
  Circle as PaperCircle,
} from 'react-paper-bindings';

type RectangleProps = {
  center: [number, number];
  size: [number, number];
};

const Rectangle = (props: RectangleProps) => {
  const [hovered, set] = useState(false);
  return (
    <PaperRectangle
      {...props}
      onMouseEnter={() => set(true)}
      onMouseLeave={() => set(false)}
      fillColor={hovered ? 'green' : 'red'}
    />
  );
};

type CircleProps = {
  center: [number, number];
  radius: number;
};

const Circle = (props: CircleProps) => {
  const [hovered, set] = useState(false);
  return (
    <PaperCircle
      {...props}
      onMouseEnter={() => set(true)}
      onMouseLeave={() => set(false)}
      fillColor={hovered ? 'orange' : 'blue'}
    />
  );
};

const Events: NextPage = () => {
  return (
    <Container>
      <Canvas>
        <View>
          <Layer>
            <Rectangle center={[75, 75]} size={[100, 100]} />
            <Circle center={[225, 120]} radius={50} />
          </Layer>
        </View>
      </Canvas>
    </Container>
  );
};

export default Events;
