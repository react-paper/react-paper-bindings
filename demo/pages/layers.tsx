import React, { useState } from 'react';
import type { NextPage } from 'next';
import { Page, Container, Canvas, Code } from 'components/content';
import { View, Layer, Rectangle, Circle } from 'react-paper-bindings';

type First = 'rectangle' | 'circle';
type LayerProps = { set(value: First): void };

const RectangleLayer = ({ set }: LayerProps) => {
  return (
    <Layer onClick={() => set('rectangle')}>
      <Rectangle center={[75, 75]} size={[50, 50]} fillColor="orange" />
      <Rectangle center={[175, 75]} size={[80, 80]} fillColor="red" />
      <Rectangle center={[245, 105]} size={[30, 30]} fillColor="yellow" />
      <Rectangle center={[105, 155]} size={[60, 60]} fillColor="brown" />
    </Layer>
  );
};

const CircleLayer = ({ set }: LayerProps) => (
  <Layer onClick={() => set('circle')}>
    <Circle center={[55, 50]} radius={20} fillColor="blue" />
    <Circle center={[140, 100]} radius={33} fillColor="cyan" />
    <Circle center={[235, 100]} radius={50} fillColor="teal" />
    <Circle center={[205, 200]} radius={22} fillColor="darkblue" />
    <Circle center={[70, 150]} radius={44} fillColor="lightblue" />
    <Circle center={[160, 10]} radius={44} fillColor="purple" />
  </Layer>
);

const LayersPage: NextPage = () => {
  const [first, set] = useState<First>('rectangle');
  return (
    <Page title="Layers">
      <Container>
        <Canvas>
          <View>
            {first === 'rectangle' ? (
              <CircleLayer set={set} />
            ) : (
              <RectangleLayer set={set} />
            )}
            {first === 'rectangle' ? (
              <RectangleLayer set={set} />
            ) : (
              <CircleLayer set={set} />
            )}
          </View>
        </Canvas>
        <Code text={code} language="jsx" />
      </Container>
    </Page>
  );
};

export default LayersPage;

const code = `import React, { useState } from 'react';
import type { NextPage } from 'next';
import { Page, Container, Canvas } from 'components/content';
import { View, Layer, Rectangle, Circle } from 'react-paper-bindings';

type First = 'rectangle' | 'circle';
type LayerProps = { set(value: First): void };

const RectangleLayer = ({ set }: LayerProps) => {
  return (
    <Layer onClick={() => set('rectangle')}>
      <Rectangle center={[75, 75]} size={[50, 50]} fillColor="orange" />
      <Rectangle center={[175, 75]} size={[80, 80]} fillColor="red" />
      <Rectangle center={[245, 105]} size={[30, 30]} fillColor="yellow" />
      <Rectangle center={[105, 155]} size={[60, 60]} fillColor="brown" />
    </Layer>
  );
};

const CircleLayer = ({ set }: LayerProps) => (
  <Layer onClick={() => set('circle')}>
    <Circle center={[55, 50]} radius={20} fillColor="blue" />
    <Circle center={[140, 100]} radius={33} fillColor="cyan" />
    <Circle center={[235, 100]} radius={50} fillColor="teal" />
    <Circle center={[205, 200]} radius={22} fillColor="darkblue" />
    <Circle center={[70, 150]} radius={44} fillColor="lightblue" />
    <Circle center={[160, 10]} radius={44} fillColor="purple" />
  </Layer>
);

const LayersPage: NextPage = () => {
  const [first, set] = useState<First>('rectangle');
  return (
    <Page title="Layers">
      <Container>
        <Canvas>
          <View>
            {first === 'rectangle' ? (
              <CircleLayer set={set} />
            ) : (
              <RectangleLayer set={set} />
            )}
            {first === 'rectangle' ? (
              <RectangleLayer set={set} />
            ) : (
              <CircleLayer set={set} />
            )}
          </View>
        </Canvas>
      </Container>
    </Page>
  );
};

export default LayersPage;`;
