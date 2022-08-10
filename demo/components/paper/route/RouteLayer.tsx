import React from 'react';
import { Layer } from 'react-paper-bindings';
import { Route } from './types';
import { usePaper } from '../context';
import { Items } from '../items';

type Props = {
  route: Route;
  index: number;
};

export const RouteLayer = ({ route, index }: Props) => {
  const [state] = usePaper();
  return (
    <Layer
      id={route.id}
      key={route.id}
      active={state.routeIndex === index}
      visible={!!state.image}
    >
      {route.items.map((item) => {
        const Item = Items[item.type];
        return (
          <Item
            {...item}
            id={item.id}
            key={item.id}
            selected={state.selection === item.id}
          />
        );
      })}
    </Layer>
  );
};
