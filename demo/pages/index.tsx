import React from 'react';
import type { NextPage } from 'next';
import { Page, Container, Title, Code } from 'components/content';

const code = {
  install: `npm install paper react-reconciler react-paper-bindings`,
  usage: `import React, { useCallback, useState } from "react";
  import { Canvas, View, Layer, Rectangle } from 'react-paper-bindings';

function App() {
  const [color, setColor] = useState('red');

  const toggleColor = useCallback(() => {
    setColor(color === 'red' ? 'blue' : 'red');
  }, [color]);

  return (
    <Canvas width={400} height={300}>
      <View>
        <Layer>
          <Rectangle
            center={[100, 100]}
            fillColor={color}
            size={[50, 50]}
            onClick={toggleColor}
          />
        </Layer>
      </View>
    </Canvas>
  );
}

export default App;`,
};

const HomePage: NextPage = () => {
  return (
    <Page title="Documentation">
      <Container className="pb-8">
        <Title>Installation</Title>
        <Code text={code.install} language="bash" />
        <Title>Usage</Title>
        <Code text={code.usage} language="jsx" />
      </Container>
    </Page>
  );
};

export default HomePage;
