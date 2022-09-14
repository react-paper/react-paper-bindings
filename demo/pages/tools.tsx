import React, { useCallback, useState } from 'react';
import type { NextPage } from 'next';
import { Page, Container, Canvas, Code, Toolbar } from 'components/content';
import { View, Layer, Circle, Rectangle, Tool } from 'react-paper-bindings';
import { Color } from 'paper/dist/paper-core';
import { Button } from 'react-daisyui';

function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function randomColor() {
  const rgb = `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
  return new Color(rgb).toCSS(true);
}

type CircleItem = {
  id: number;
  type: 'Circle';
  center: paper.Point | [number, number];
  radius: number;
  fillColor: any;
};

type RectangleItem = {
  id: number;
  type: 'Rectangle';
  center: paper.Point | [number, number];
  size: [number, number] | number;
  fillColor: any;
};

type Item = CircleItem | RectangleItem;
type Tool = 'Rectangle' | 'Circle';

const ToolsPage: NextPage = () => {
  const [activeTool, setActiveTool] = useState<Tool>('Rectangle');
  const [items, setItems] = useState<Item[]>([]);

  const handleCircleMouseDown = useCallback(
    (e: paper.ToolEvent) => {
      setItems([
        ...items,
        {
          id: items.length + 1,
          type: 'Circle',
          center: [e.point.x, e.point.y],
          radius: random(3, 30),
          fillColor: randomColor(),
        },
      ]);
    },
    [items]
  );

  const handleRectangleMouseDown = useCallback(
    (e: paper.ToolEvent) => {
      setItems([
        ...items,
        {
          id: items.length + 1,
          type: 'Rectangle',
          center: [e.point.x, e.point.y],
          size: random(10, 40),
          fillColor: randomColor(),
        },
      ]);
    },
    [items]
  );

  return (
    <Page title="Tools">
      <Container>
        <Toolbar>
          <Button
            size="sm"
            className="mr-2"
            color={activeTool === 'Rectangle' ? 'primary' : 'ghost'}
            onClick={() => setActiveTool('Rectangle')}
          >
            Rectangle
          </Button>
          <Button
            size="sm"
            className="mr-2"
            color={activeTool === 'Circle' ? 'primary' : 'ghost'}
            onClick={() => setActiveTool('Circle')}
          >
            Circle
          </Button>
        </Toolbar>
        <Canvas>
          <View>
            <Layer>
              {items.map((props) =>
                props.type === 'Rectangle' ? (
                  <Rectangle key={props.id} {...props} />
                ) : (
                  <Circle key={props.id} {...props} />
                )
              )}
            </Layer>
          </View>
          <Tool
            name="Rectangle"
            active={activeTool === 'Rectangle'}
            onMouseDown={handleRectangleMouseDown}
          />
          <Tool
            name="Circle"
            active={activeTool === 'Circle'}
            onMouseDown={handleCircleMouseDown}
          />
        </Canvas>
        <Code text={code} language="jsx" />
      </Container>
    </Page>
  );
};

export default ToolsPage;

const code = `import React, { useCallback, useState } from 'react';
import type { NextPage } from 'next';
import { Page, Container, Canvas, Toolbar } from 'components/content';
import { View, Layer, Circle, Rectangle, Tool } from 'react-paper-bindings';
import { Color } from 'paper/dist/paper-core';
import { Button } from 'react-daisyui';

function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function randomColor() {
  const rgb = \`rgb(\${random(0, 255)},\${random(0, 255)},\${random(0, 255)})\`;
  return new Color(rgb).toCSS(true);
}

type ICircle = {
  id: number;
  type: 'Circle';
  center: paper.Point | [number, number];
  radius: number;
  fillColor: any;
};

type IRectangle = {
  id: number;
  type: 'Rectangle';
  center: paper.Point | [number, number];
  size: [number, number] | number;
  fillColor: any;
};

type Item = ICircle | IRectangle;
type Tool = 'Rectangle' | 'Circle';

const ToolsPage: NextPage = () => {
  const [activeTool, setActiveTool] = useState<Tool>('Rectangle');
  const [items, setItems] = useState<Item[]>([]);

  const handleCircleMouseDown = useCallback(
    (e: paper.ToolEvent) => {
      setItems([
        ...items,
        {
          id: items.length + 1,
          type: 'Circle',
          center: [e.point.x, e.point.y],
          radius: random(3, 30),
          fillColor: randomColor(),
        },
      ]);
    },
    [items]
  );

  const handleRectangleMouseDown = useCallback(
    (e: paper.ToolEvent) => {
      setItems([
        ...items,
        {
          id: items.length + 1,
          type: 'Rectangle',
          center: [e.point.x, e.point.y],
          size: random(10, 40),
          fillColor: randomColor(),
        },
      ]);
    },
    [items]
  );

  return (
    <Page title="Tools">
      <Container>
        <Toolbar>
          <Button
            size="sm"
            color={activeTool === 'Rectangle' ? 'primary' : 'ghost'}
            className="mr-2"
            onClick={() => setActiveTool('Rectangle')}
          >
            Rectangle
          </Button>
          <Button
            size="sm"
            className="mr-2"
            color={activeTool === 'Circle' ? 'primary' : 'ghost'}
            onClick={() => setActiveTool('Circle')}
          >
            Circle
          </Button>
        </Toolbar>
        <Canvas>
          <View>
            <Layer>
              {items.map((props) =>
                props.type === 'Rectangle' ? (
                  <Rectangle key={props.id} {...props} />
                ) : (
                  <Circle key={props.id} {...props} />
                )
              )}
            </Layer>
          </View>
          <Tool
            name="Rectangle"
            active={activeTool === 'Rectangle'}
            onMouseDown={handleRectangleMouseDown}
          />
          <Tool
            name="Circle"
            active={activeTool === 'Circle'}
            onMouseDown={handleCircleMouseDown}
          />
        </Canvas>
      </Container>
    </Page>
  );
};

export default ToolsPage;`;
