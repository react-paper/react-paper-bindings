import React, { useState } from 'react';
import type { NextPage } from 'next';
import { Page, Container, Canvas, Code } from 'components/content';
import { View, Layer, Rectangle } from 'react-paper-bindings';

function move(arr: any[], from: number, to: number) {
  return arr.reduce((prev, current, idx, self) => {
    if (from === to) prev.push(current);
    if (idx === from) return prev;
    if (from < to) prev.push(current);
    if (idx === to) prev.push(self[from]);
    if (from > to) prev.push(current);
    return prev;
  }, []);
}

const Reorder: NextPage = () => {
  const [rects, setRects] = useState([
    { id: 1, center: [100, 50], size: [50, 50], fillColor: 'red' },
    { id: 2, center: [125, 75], size: [50, 50], fillColor: 'green' },
    { id: 3, center: [150, 100], size: [50, 50], fillColor: 'orange' },
    { id: 4, center: [175, 125], size: [50, 50], fillColor: 'blue' },
  ]);
  return (
    <Page title="Reorder">
      <Container>
        <Canvas>
          <View onClick={() => setRects(move(rects, 0, rects.length - 1))}>
            <Layer>
              {rects.map((rect) => (
                <Rectangle key={rect.id} {...rect} />
              ))}
            </Layer>
          </View>
        </Canvas>
        <Code text={code} language="jsx" />
      </Container>
    </Page>
  );
};

export default Reorder;

const code = `import React, { useState } from 'react';
import type { NextPage } from 'next';
import { Page, Container, Canvas } from 'components/content';
import { View, Layer, Rectangle } from 'react-paper-bindings';

function move(arr: any[], from: number, to: number) {
  return arr.reduce((prev, current, idx, self) => {
    if (from === to) prev.push(current);
    if (idx === from) return prev;
    if (from < to) prev.push(current);
    if (idx === to) prev.push(self[from]);
    if (from > to) prev.push(current);
    return prev;
  }, []);
}

const Reorder: NextPage = () => {
  const [rects, setRects] = useState([
    { id: 1, center: [100, 50], size: [50, 50], fillColor: 'red' },
    { id: 2, center: [125, 75], size: [50, 50], fillColor: 'green' },
    { id: 3, center: [150, 100], size: [50, 50], fillColor: 'orange' },
    { id: 4, center: [175, 125], size: [50, 50], fillColor: 'blue' },
  ]);
  return (
    <Page title="Reorder">
      <Container>
        <Canvas>
          <View onClick={() => setRects(move(rects, 0, rects.length - 1))}>
            <Layer>
              {rects.map((rect) => (
                <Rectangle key={rect.id} {...rect} />
              ))}
            </Layer>
          </View>
        </Canvas>
      </Container>
    </Page>
  );
};

export default Reorder;`;
