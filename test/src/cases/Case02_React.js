import React from "react";
import {View, Rectangle, Group, Ellipse, Circle} from "../../../src";
import {createGridLines} from "./common";


export default class Case02_React extends React.Component {

  render() {
    const matrix = {
      sx: 0, // scale center x
      sy: 0, // scale center y
      tx: 0, // translate x
      ty: 0, // translate y
      x: 0,
      y: 0,
      zoom: 1
    };

    const x = 100, y = 100, rotation = 30

    return (
      <View width={800}
            height={600}
            matrix={matrix}
      >
        {createGridLines(800, 600, 100)}
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
      </View>
    )
  }
}

