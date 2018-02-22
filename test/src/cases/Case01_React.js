import React from "react";
import {View, Rectangle} from "../../../src";


export default class Case01_React extends React.Component {

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
    return (
      <View width={800}
            height={600}
            matrix={matrix}
      >
        <Rectangle
          point={[100, 100]}
          size={[100, 100]}
          fillColor={'black'}
        />
      </View>
    )
  }
}

