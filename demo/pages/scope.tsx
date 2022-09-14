import React, { useState } from 'react';
import type { NextPage } from 'next';
import { Page, Container, Canvas, Code } from 'components/content';
import { PaperScope, View, Layer, Circle } from 'react-paper-bindings';

// PaperScope needs to be imported from react-paper-bindings
// for the instanceof checks to work properly in renderer

const ScopePage: NextPage = () => {
  const [scope] = useState(new PaperScope());
  return (
    <Page title="Scope">
      <Container>
        <Canvas scope={scope}>
          <View>
            <Layer>
              <Circle fillColor="red" center={[75, 75]} radius={30} />
            </Layer>
          </View>
        </Canvas>
        <Code text={code} language="jsx" />
      </Container>
    </Page>
  );
};

export default ScopePage;

const code = `import React, { useState } from 'react';
import type { NextPage } from 'next';
import { Page, Container, Canvas, Code } from 'components/content';
import { PaperScope, View, Layer, Circle } from 'react-paper-bindings';

// PaperScope needs to be imported from react-paper-bindings
// for the instanceof checks to work properly in renderer

const ScopePage: NextPage = () => {
  const [scope] = useState(new PaperScope());
  return (
    <Page title="Scope">
      <Container>
        <Canvas scope={scope}>
          <View>
            <Layer>
              <Circle fillColor="red" center={[75, 75]} radius={30} />
            </Layer>
          </View>
        </Canvas>
      </Container>
    </Page>
  );
};

export default ScopePage;`;
