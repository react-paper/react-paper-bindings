import React, { useState } from 'react';
import type { NextPage } from 'next';
import { Page, Container, Canvas, Code } from 'components/content';
import {
  View,
  Layer,
  Rectangle as Rect,
  Circle as Circ,
} from 'react-paper-bindings';

type RectangleProps = {
  center: [number, number];
  size: [number, number];
};

const Rectangle = (props: RectangleProps) => {
  const [hovered, set] = useState(false);
  return (
    <Rect
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
    <Circ
      {...props}
      onMouseEnter={() => set(true)}
      onMouseLeave={() => set(false)}
      fillColor={hovered ? 'orange' : 'blue'}
    />
  );
};

const Events: NextPage = () => {
  return (
    <Page title="Events">
      <Container>
        <Canvas>
          <View>
            <Layer>
              <Rectangle center={[75, 75]} size={[100, 100]} />
              <Circle center={[225, 120]} radius={50} />
            </Layer>
          </View>
        </Canvas>
        <Code text={code} language="jsx" />
      </Container>
    </Page>
  );
};

export default Events;

const code = `import React, { useState } from 'react';
import type { NextPage } from 'next';
import { Page, Container, Canvas } from 'components/content';
import {
  View,
  Layer,
  Rectangle as Rect,
  Circle as Circ,
} from 'react-paper-bindings';

type RectangleProps = {
  center: [number, number];
  size: [number, number];
};

const Rectangle = (props: RectangleProps) => {
  const [hovered, set] = useState(false);
  return (
    <Rect
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
    <Circ
      {...props}
      onMouseEnter={() => set(true)}
      onMouseLeave={() => set(false)}
      fillColor={hovered ? 'orange' : 'blue'}
    />
  );
};

const Events: NextPage = () => {
  return (
    <Page title="Events">
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
    </Page>
  );
};

export default Events;`;