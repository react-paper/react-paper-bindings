import React, { forwardRef, useCallback, useContext } from 'react';
import { Canvas as PaperCanvas, CanvasProps, View } from 'react-paper-bindings';

import { Context } from './context';
import { Image, ImageLayer } from './image';
import { RouteLayer } from './route';
import { Tool } from './tools';

type Props = CanvasProps & {
  image: Image;
  width: number;
  height: number;
};

export const Canvas = forwardRef<HTMLCanvasElement | null, Props>(function Canvas(
  { image, width, height, ...other },
  forwardedRef
) {
  const value = useContext(Context);
  const [state, dispatch] = value;
  const img = state.history[state.historyIndex];

  const handleScopeReady = useCallback(
    (scope: paper.PaperScope) => dispatch({ type: 'setScope', scope: scope }),
    [dispatch]
  );

  return (
    <PaperCanvas
      {...other}
      ref={forwardedRef}
      width={width}
      height={height}
      onScopeReady={handleScopeReady}
    >
      {/**
       * Create a context bridge between renderers
       * @see https://github.com/konvajs/react-konva/issues/188#issuecomment-478302062
       */}
      <Context.Provider value={value}>
        <View>
          <ImageLayer image={image} />
          {img?.routes.map((route, index) => (
            <RouteLayer key={route.id} route={route} index={index} />
          ))}
        </View>
        <Tool.Move />
        <Tool.Pen />
        <Tool.Circle />
        <Tool.Select />
        <Tool.Delete />
      </Context.Provider>
    </PaperCanvas>
  );
});
