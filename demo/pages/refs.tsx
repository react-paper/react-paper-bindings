import React, { useCallback, useRef, useState } from 'react';
import type { NextPage } from 'next';
import { Page, Container, Canvas, Code } from 'components/content';
import { View, Layer, Rectangle, Circle } from 'react-paper-bindings';

const radiusMin = 10;
const radiusMax = 80;

const hueMin = 0;
const hueMax = 360;

const Refs: NextPage = () => {
  const rectangle = useRef<paper.Path.Rectangle | null>(null);
  const [radius, setRadius] = useState(10);
  const radiusForward = useRef(true);
  const [hue, setHue] = useState(0);
  const hueForward = useRef(true);

  const handleFrame = useCallback(() => {
    // you can bypass react by manipulating paper objects directly
    if (rectangle.current && rectangle.current.fillColor) {
      rectangle.current.fillColor.hue += 1;
    }

    // or you can do it react way by setting state

    if (radius <= radiusMin) radiusForward.current = true;
    if (radius >= radiusMax) radiusForward.current = false;
    setRadius(radius + (radiusForward.current ? 1 : -1));

    if (hue <= hueMin) hueForward.current = true;
    if (hue >= hueMax) hueForward.current = false;
    setHue(hue + (hueForward.current ? 1 : -1));
  }, [radius, hue]);

  return (
    <Page title="Refs">
      <Container>
        <Canvas>
          <View onFrame={handleFrame}>
            <Layer>
              <Rectangle
                ref={rectangle}
                center={[75, 75]}
                size={[100, 100]}
                fillColor="red"
              />
              <Circle
                center={[225, 100]}
                radius={radius}
                fillColor={`hsl(${hue}, 100%, 50%)`}
              />
            </Layer>
          </View>
        </Canvas>
        <Code text={code} language="jsx" />
      </Container>
    </Page>
  );
};

export default Refs;

const code = `import React, { useCallback, useRef, useState } from 'react';
import type { NextPage } from 'next';
import { Page, Container, Canvas } from 'components/content';
import { View, Layer, Rectangle, Circle } from 'react-paper-bindings';

const radiusMin = 10;
const radiusMax = 80;

const hueMin = 0;
const hueMax = 360;

const Refs: NextPage = () => {
  const rectangle = useRef<paper.Path.Rectangle | null>(null);
  const [radius, setRadius] = useState(10);
  const radiusForward = useRef(true);
  const [hue, setHue] = useState(0);
  const hueForward = useRef(true);

  const handleFrame = useCallback(() => {
    // you can bypass react by manipulating paper objects directly
    if (rectangle.current && rectangle.current.fillColor) {
      rectangle.current.fillColor.hue += 1;
    }

    // or you can do it react way by setting state

    if (radius <= radiusMin) radiusForward.current = true;
    if (radius >= radiusMax) radiusForward.current = false;
    setRadius(radius + (radiusForward.current ? 1 : -1));

    if (hue <= hueMin) hueForward.current = true;
    if (hue >= hueMax) hueForward.current = false;
    setHue(hue + (hueForward.current ? 1 : -1));
  }, [radius, hue]);

  return (
    <Page title="Refs">
      <Container>
        <Canvas>
          <View onFrame={handleFrame}>
            <Layer>
              <Rectangle
                ref={rectangle}
                center={[75, 75]}
                size={[100, 100]}
                fillColor="red"
              />
              <Circle
                center={[225, 100]}
                radius={radius}
                fillColor={\`hsl(\${hue}, 100%, 50%)\`}
              />
            </Layer>
          </View>
        </Canvas>
      </Container>
    </Page>
  );
};

export default Refs;`;
