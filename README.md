# Paper.js bindings for React Fiber

## Demo

http://hribb.github.io/react-paper-bindings/

## Installation

Until Facebook [releases](https://github.com/facebook/react/issues/9103) `ReactFiberReconciler`, a custom version of `react` and `react-dom` is needed.

Clone [react](https://github.com/facebook/react) repo
```bash
git clone https://github.com/facebook/react.git
cd react
npm install
```

Change `src/renderers/dom/fiber/ReactDOMFiberEntry.js` to export `ReactFiberReconciler` through `react-dom`
```diff
--- a/src/renderers/dom/fiber/ReactDOMFiberEntry.js
+++ b/src/renderers/dom/fiber/ReactDOMFiberEntry.js
@@ -729,6 +729,8 @@ var ReactDOMFiber = {

   findDOMNode: findDOMNode,

+  ReactFiberReconciler: ReactFiberReconciler,
+
   unstable_createPortal(
     children: ReactNodeList,
     container: DOMContainer,
```

Build and link `react` and `react-dom`
```bash
npm run build
cd build/packages/react
npm link
cd ../react-dom
npm link
```

Clone `react-paper-bindings`
```bash
git clone https://github.com/HriBB/react-paper-bindings.git
cd react-paper-bindings
npm install
npm link react react-dom
```

## Development

Start watching `src` with babel
```
cd react-paper-bindings
npm start
```

Start demo with `create-react-app`
```
cd react-paper-bindings/demo
npm install

# cra does not like sources from outside its root
# we need to symlink dist folder in development
ln -s /path/to/react-paper-bindings/dist /path/to/react-paper-bindings/demo/src/node_modules/react-paper-bindings

npm start
```

## Example

```jsx
import React, { Component } from 'react'

import {
  View,
  Layer,
  Group,
  Path,
  Circle,
  Ellipse,
  Rectangle,
  PointText,
  Tool,
} from 'react-paper-bindings'

const ReactLogo = ({ rotation, x, y }) => {
  return (
    <Group name={'reactLogo'} rotation={rotation}>
      <Ellipse
        center={[x, y]}
        size={[70, 25]}
        strokeWidth={2.5}
        strokeColor={'#61DAFB'}
      />
      <Ellipse
        center={[x, y]}
        rotation={120}
        size={[70, 25]}
        strokeWidth={2.5}
        strokeColor={'#61DAFB'}
      />
      <Ellipse
        center={[x, y]}
        rotation={240}
        size={[70, 25]}
        strokeWidth={2.5}
        strokeColor={'#61DAFB'}
      />
      <Circle
        center={[x, y]}
        fillColor={'#61DAFB'}
        radius={7}
      />
    </Group>
  )
}

const Paper = ({ activeTool, circles, rectangles, width, height }) => {
  return (
    <View activeTool={activeTool} width={width} height={height}>
      <Layer>
        {circles.map(circle => <Circle {...circle} />)}
      </Layer>
      <Layer>
        {rectangles.map(rectangle => <Rectangle {...rectangle} />)}
      </Layer>
      <Layer>
        <Rectangle
          center={[width/2, height/2]}
          fillColor={'#222222'}
          opacity={0.8}
          size={[320, 120]}
        />
        <PointText
          content={'Paper.js'}
          fillColor={'white'}
          fontFamily={'Courier New'}
          fontSize={30}
          fontWeight={'bold'}
          justification={'center'}
          point={[(width/2)+40, (height/2)+10]}
        />
        <ReactLogo
          rotation={rotation}
          x={(width/2)-100}
          y={(height/2)}
        />
      </Layer>
      <Tool
        active={activeTool === 'move'}
        name={'move'}
        onMouseDown={props.moveToolMouseDown}
        onMouseDrag={props.moveToolMouseDrag}
        onMouseUp={props.moveToolMouseUp}
      />
      <Tool
        active={activeTool === 'pen'}
        name={'pen'}
        onMouseDown={props.penToolMouseDown}
        onMouseDrag={props.penToolMouseDrag}
        onMouseUp={props.penToolMouseUp}
      />
      <Tool
        active={activeTool === 'circle'}
        name={'circle'}
        onMouseDown={props.addCircle}
      />
      <Tool
        active={activeTool === 'rectangle'}
        name={'rectangle'}
        onMouseDown={props.addRectangle}
      />
    </View>
  )
}
```
