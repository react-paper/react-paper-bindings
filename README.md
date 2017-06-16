# Paper.js bindings for React Fiber

## Demo

http://hribb.github.io/react-paper-bindings/

## Development

Clone repo
```
git clone https://github.com/HriBB/react-paper-bindings.git
```

Start watching `src` with babel
```
cd react-paper-bindings
npm install
npm start
```

Start demo with `create-react-app`
```
cd react-paper-bindings/demo
npm install

# cra does not like sources from outside its root
# we need to symlink build folder in development
ln -s /path/to/react-paper-bindings/build /path/to/react-paper-bindings/demo/src/node_modules/react-paper-bindings

npm start
```

## Example

```
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
