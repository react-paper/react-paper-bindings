import React from "react";
import {Circle, Ellipse, Group, View} from "../../../../src/index";
import {createGridLines} from "../common";


export default class Case01_React extends React.Component {

  render() {
    const x = 100, y = 100, rotation = 0

    return (
      <View width={800}
            height={600}
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

