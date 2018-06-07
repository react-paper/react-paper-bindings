import React from "react";
import {Circle, Ellipse, Group, Rectangle, View} from "../../../../src/index";
import {Point} from "paper";
import {createGridLines} from "../common";
import qs from "query-string";

export default class Case04_React extends React.Component {

  constructor(props) {
    super(props)
    this.parseQueryString(props)
    console.log(`applyMatrix=${this.applyMatrix}`)
    this.state = {
      pivot: new Point(0, 100),
      position: new Point(200,200),
      rotation: 30
    }
  }

  parseQueryString(props) {
    const params =qs.parse(props.location.search)
    this.applyMatrix = (params.applyMatrix == 'false') ? false : true
  }

  componentDidMount() {
    this.setState({
      pivot: new Point(100, 0),
      position: new Point(200,200),
      rotation: 45
    })
  }

  render() {
    const x = 100, y = 100

    return (
      <View width={800}
            height={600}
            settings={{
              applyMatrix: this.applyMatrix
            }}
      >
        {createGridLines(800, 600, 100)}

        <Rectangle
          pivot={new Point(0, 100)}
          position={new Point(500, 200)}
          rotation={30}
          size={[150, 100]}
          fillColor={'black'}
        />

        <Group name={'reactLogo'}
               pivot={this.state.pivot}
               position={this.state.position}
               rotation={this.state.rotation}
        >
          <Ellipse
            position={new Point(x, y)}
            size={[70, 25]}
            strokeWidth={2.5}
            strokeColor={'#61DAFB'}
          />
          <Ellipse
            position={new Point(x, y)}
            rotation={120}
            size={[70, 25]}
            strokeWidth={2.5}
            strokeColor={'#61DAFB'}
          />
          <Ellipse
            position={new Point(x, y)}
            rotation={240}
            size={[70, 25]}
            strokeWidth={2.5}
            strokeColor={'#61DAFB'}
          />
          <Circle
            position={new Point(x, y)}
            fillColor={'#61DAFB'}
            radius={7}
          />
        </Group>
      </View>
    )
  }
}

