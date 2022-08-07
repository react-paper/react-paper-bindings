# Paper.js bindings for React Fiber

## Demo

http://react-paper.github.io/react-paper-bindings/

## Similar projects

- [react-paperjs](https://github.com/psychobolt/react-paperjs)

## Example

```jsx
import React from "react";
import { Canvas, View, Layer, Rectangle } from "react-paper-bindings";

const Example = () => {
  return (
    <Canvas width={400} height={300}>
      <View>
        <Layer>
          <Rectangle
            center={[100, 100]}
            fillColor={"red"}
            size={[50, 50]}
            onClick={() => console.log("onClick")}
          />
        </Layer>
      </View>
    </Canvas>
  );
};

export default Example;
```

## Development

```
cd react-paper-bindings
npm install
npm run dev
```

## Build

```
npm run dev
```

## Watch

```
npm run dev
```

## Test

```
npm run test
```
