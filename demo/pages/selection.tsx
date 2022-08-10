import React, { useCallback, useState } from 'react';
import type { NextPage } from 'next';
import { Container, Canvas } from 'components/content';
import { View, Layer, Rectangle, Circle } from 'react-paper-bindings';

const Selection: NextPage = () => {
  const [selection, setSelection] = useState<number | undefined>();

  const handleClick = useCallback((e: paper.MouseEvent) => {
    setSelection(e.target.props.id);
    console.log('target.id', e.target.id);
    console.log('target.props.id', e.target.props.id);
    console.log('target.data.id', e.target.props.id);
    console.log('target.selectionKey', e.target.selectionKey);
  }, []);

  return (
    <Container>
      <Canvas>
        <View>
          <Layer>
            <Rectangle
              id={1}
              data={{ id: 1 }}
              selectionKey={1}
              center={[100, 55]}
              size={[80, 80]}
              fillColor={'red'}
              selected={selection === 1}
              onClick={handleClick}
            />
            <Circle
              id={2}
              data={{ id: 2 }}
              selectionKey={2}
              center={[200, 55]}
              radius={40}
              fillColor={'green'}
              selected={selection === 2}
              onClick={handleClick}
            />
            <Circle
              id={3}
              data={{ id: 3 }}
              selectionKey={3}
              center={[100, 150]}
              radius={40}
              fillColor={'blue'}
              selected={selection === 3}
              onClick={handleClick}
            />
            <Circle
              id={4}
              data={{ id: 4 }}
              selectionKey={4}
              center={[200, 150]}
              radius={40}
              fillColor={'purple'}
              selected={selection === 4}
              onClick={handleClick}
            />
          </Layer>
        </View>
      </Canvas>
    </Container>
  );
};

export default Selection;
