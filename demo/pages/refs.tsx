import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { NextPage } from 'next';
import { Page, Container, Canvas, Code } from 'components/content';
import { View, Layer, Rectangle, Circle } from 'react-paper-bindings';

const radiusMin = 10;
const radiusMax = 80;

const hueMin = 0;
const hueMax = 360;

const MyRectangle = () => {
  const myRectangleRef = useRef<paper.Path.Rectangle | null>(null);
  useEffect(() => {
    console.log('myRectangleRef', myRectangleRef.current);
  }, []);
  return (
    <Rectangle
      ref={myRectangleRef}
      center={[125, 125]}
      size={[100, 100]}
      fillColor="green"
    />
  );
};

const RefsPage: NextPage = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rectangleRef = useRef<paper.Path.Rectangle | null>(null);
  const [radius, setRadius] = useState(10);
  const radiusForward = useRef(true);
  const [hue, setHue] = useState(0);
  const hueForward = useRef(true);

  const handleFrame = useCallback(() => {
    // you can bypass react by manipulating paper objects directly
    if (rectangleRef.current && rectangleRef.current.fillColor) {
      rectangleRef.current.fillColor.hue += 1;
    }

    // or you can do it react way by setting state
    if (radius <= radiusMin) radiusForward.current = true;
    if (radius >= radiusMax) radiusForward.current = false;
    setRadius(radius + (radiusForward.current ? 1 : -1));

    if (hue <= hueMin) hueForward.current = true;
    if (hue >= hueMax) hueForward.current = false;
    setHue(hue + (hueForward.current ? 1 : -1));
  }, [radius, hue]);

  useEffect(() => {
    console.log('canvasRef', canvasRef.current);
    console.log('rectangleRef', rectangleRef.current);
  }, []);

  return (
    <Page title="Refs">
      <Container>
        <Canvas ref={canvasRef}>
          <View onFrame={handleFrame}>
            <Layer>
              <Rectangle
                ref={rectangleRef}
                center={[75, 75]}
                size={[100, 100]}
                fillColor="red"
              />
              <MyRectangle />
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

export default RefsPage;

const code = `import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { NextPage } from 'next';
import { Page, Container, Canvas } from 'components/content';
import { View, Layer, Rectangle, Circle } from 'react-paper-bindings';

const radiusMin = 10;
const radiusMax = 80;

const hueMin = 0;
const hueMax = 360;

const RefsPage: NextPage = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rectangleRef = useRef<paper.Path.Rectangle | null>(null);
  const [radius, setRadius] = useState(10);
  const radiusForward = useRef(true);
  const [hue, setHue] = useState(0);
  const hueForward = useRef(true);

  const handleFrame = useCallback(() => {
    // you can bypass react by manipulating paper objects directly
    if (rectangleRef.current && rectangleRef.current.fillColor) {
      rectangleRef.current.fillColor.hue += 1;
    }

    // or you can do it react way by setting state

    if (radius <= radiusMin) radiusForward.current = true;
    if (radius >= radiusMax) radiusForward.current = false;
    setRadius(radius + (radiusForward.current ? 1 : -1));

    if (hue <= hueMin) hueForward.current = true;
    if (hue >= hueMax) hueForward.current = false;
    setHue(hue + (hueForward.current ? 1 : -1));
  }, [radius, hue]);

  useEffect(() => {
    console.log(canvasRef);
    console.log(rectangleRef);
  }, []);

  return (
    <Page title="Refs">
      <Container>
        <Canvas ref={canvasRef}>
          <View onFrame={handleFrame}>
            <Layer>
              <Rectangle
                ref={rectangleRef}
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

export default RefsPage;`;
