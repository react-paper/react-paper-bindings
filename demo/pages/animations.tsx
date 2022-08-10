import React, { useCallback, useState } from 'react';
import type { NextPage } from 'next';
import { Form, Toggle } from 'react-daisyui';
import { Container, Toolbar, Canvas } from 'components/content';
import { View, Layer, Rectangle } from 'react-paper-bindings';

const Animations: NextPage = () => {
  const [animating, setAnimating] = useState(true);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState([75, 50]);
  const [forward, setForward] = useState(true);

  const handleFrame = useCallback(() => {
    const [x, y] = position;
    if (y >= 150) setForward(false);
    if (y <= 50) setForward(true);
    setPosition([x, y + (forward ? 3 : -3)]);
    setRotation(rotation < 360 ? rotation + 3 : 0);
  }, [position, rotation, forward]);

  return (
    <>
      <Toolbar>
        <Form.Label title="Animate">
          <Toggle
            className="ml-1"
            checked={animating}
            onChange={() => setAnimating(!animating)}
          />
        </Form.Label>
      </Toolbar>
      <Container>
        <Canvas>
          <View onFrame={animating ? handleFrame : null}>
            <Layer>
              <Rectangle
                center={position}
                fillColor={'orange'}
                size={[50, 50]}
              />
              <Rectangle
                center={[225, 100]}
                fillColor={'blue'}
                size={[75, 75]}
                rotation={rotation}
              />
            </Layer>
          </View>
        </Canvas>
      </Container>
    </>
  );
};

export default Animations;
