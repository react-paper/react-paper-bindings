# Paper.js bindings for React Fiber

## Demo

https://hribb.github.io/react-paper-bindings/

## Development

Start watching `src` with babel
```
cd react-paper-bindings
npm start
```

Link the library to the demo
```
# npm link the library
cd react-paper-bindings
npm link

cd demo
npm link react-paper-bindings
```

Start demo with `create-react-app`
```
cd demo
npm start
```

If someone knows a better way, please let me know ;)

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
