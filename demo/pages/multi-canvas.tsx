import React, { useState } from 'react';
import type { NextPage } from 'next';
import { Form, Toggle } from 'react-daisyui';
import { Page, Container, Toolbar, Canvas, Code } from 'components/content';
import { View, Layer, Rectangle } from 'react-paper-bindings';

const MultiCanvas: NextPage = () => {
  const [visible1, setVisible1] = useState(true);
  const [visible2, setVisible2] = useState(true);
  const [color1, setColor1] = useState('blue');
  const [color2, setColor2] = useState('red');
  return (
    <Page title="Multi Canvas">
      <Container>
        <Toolbar>
          <Form.Label title="Canvas 1">
            <Toggle
              className="ml-1"
              checked={visible1}
              onChange={() => setVisible1(!visible1)}
            />
          </Form.Label>
          <Form.Label title="Canvas 2">
            <Toggle
              className="ml-1"
              checked={visible2}
              onChange={() => setVisible2(!visible2)}
            />
          </Form.Label>
        </Toolbar>
        {visible1 && (
          <Canvas>
            <View>
              <Layer>
                <Rectangle
                  center={[100, 100]}
                  fillColor={color1}
                  size={[50, 50]}
                  onClick={() => setColor1(color1 === 'blue' ? 'cyan' : 'blue')}
                />
              </Layer>
            </View>
          </Canvas>
        )}
        {visible2 && (
          <Canvas>
            <View>
              <Layer>
                <Rectangle
                  center={[200, 100]}
                  fillColor={color2}
                  size={[75, 75]}
                  onClick={() => setColor2(color2 === 'red' ? 'gray' : 'red')}
                />
              </Layer>
            </View>
          </Canvas>
        )}
        <Code text={code} language="jsx" />
      </Container>
    </Page>
  );
};

export default MultiCanvas;

const code = `import React, { useState } from 'react';
import type { NextPage } from 'next';
import { Form, Toggle } from 'react-daisyui';
import { Page, Container, Toolbar, Canvas } from 'components/content';
import { View, Layer, Rectangle } from 'react-paper-bindings';

const MultiCanvas: NextPage = () => {
  const [visible1, setVisible1] = useState(true);
  const [visible2, setVisible2] = useState(true);
  const [color1, setColor1] = useState('blue');
  const [color2, setColor2] = useState('red');
  return (
    <Page title="Multi Canvas">
      <Container>
        <Toolbar>
          <Form.Label title="Canvas 1">
            <Toggle
              className="ml-1"
              checked={visible1}
              onChange={() => setVisible1(!visible1)}
            />
          </Form.Label>
          <Form.Label title="Canvas 2">
            <Toggle
              className="ml-1"
              checked={visible2}
              onChange={() => setVisible2(!visible2)}
            />
          </Form.Label>
        </Toolbar>
        {visible1 && (
          <Canvas>
            <View>
              <Layer>
                <Rectangle
                  center={[100, 100]}
                  fillColor={color1}
                  size={[50, 50]}
                  onClick={() => setColor1(color1 === 'blue' ? 'cyan' : 'blue')}
                />
              </Layer>
            </View>
          </Canvas>
        )}
        {visible2 && (
          <Canvas>
            <View>
              <Layer>
                <Rectangle
                  center={[200, 100]}
                  fillColor={color2}
                  size={[75, 75]}
                  onClick={() => setColor2(color2 === 'red' ? 'gray' : 'red')}
                />
              </Layer>
            </View>
          </Canvas>
        )}
      </Container>
    </Page>
  );
};

export default MultiCanvas;`;
