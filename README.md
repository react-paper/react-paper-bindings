# Paper.js bindings for React Fiber

## Demo

http://react-paper.github.io/react-paper-bindings/

## Similar projects

- [react-paperjs](https://github.com/psychobolt/react-paperjs)

## Example with Create React App

Install create-react-app

```bash
npx create-react-app my-app
cd my-app
```

Install react-paper-bindings

```bash
npm install paper react-reconciler react-paper-bindings
```

Edit `src/App.js` and paste:

```jsx
import React, { useCallback, useState } from 'react';
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

export default App;
```

Run app

```bash
npm run start
```

## Development

```
cd react-paper-bindings
npm install
npm run watch
```

## Build

```
npm run build
```

## Test

```
npm run test
```

## Demo

```
cd demo
npm run dev
```
