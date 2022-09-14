import React from 'react';
import type { NextPage } from 'next';
import { Page, Container, Canvas, Code } from 'components/content';
import { View, Layer, Circle, CompoundPath } from 'react-paper-bindings';

const CompoundPathPage: NextPage = () => {
  return (
    <Page title="CompoundPath">
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
        <Code text={code} language="jsx" />
      </Container>
    </Page>
  );
};

export default CompoundPathPage;

const code = `import React from 'react';
import type { NextPage } from 'next';
import { Page, Container, Canvas } from 'components/content';
import { View, Layer, Circle, CompoundPath } from 'react-paper-bindings';

const CompoundPathPage: NextPage = () => {
  return (
    <Page title="CompoundPath">
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
    </Page>
  );
};

export default CompoundPathPage;`;
