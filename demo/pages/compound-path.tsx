import React from 'react';
import type { NextPage } from 'next';
import { Container, Canvas } from 'components/content';
import { View, Layer, Circle, CompoundPath } from 'react-paper-bindings';

const Compound: NextPage = () => {
  return (
    <Container>
      <Canvas>
        <View>
          <Layer>
            <CompoundPath selected fillColor="black">
              <Circle center={[75, 75]} radius={30} />
              <Circle center={[75, 75]} radius={10} />
            </CompoundPath>
          </Layer>
        </View>
      </Canvas>
    </Container>
  );
};

export default Compound;
