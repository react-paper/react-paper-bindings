import React from "react";
import paper, {Group, Path, Point, Size} from "paper";
import {drawGridLines} from "../common";
import qs from "query-string";

export default class Case03_Paper extends React.Component {

  constructor(props) {
    super(props)
    this.parseQueryString(props)
  }

  parseQueryString(props) {
    const params =qs.parse(props.location.search)
    this.applyMatrix = (params.applyMatrix == 'false') ? false : true
  }

  drawPath() {
    let path = new Path.Rectangle({
      pivot: new Point(0, 100),
      position: new Point(500, 200),
      size: new Size(150, 100),
      fillColor: 'black'
    })
  }

  drawGroup() {
    // Drawing sequence should be the same as PaperRenderer.

    // 1. Child components are firstly rendered.
    const x = 100, y = 100
    let paths = [
      Path.Ellipse({
        position: new Point(x, y),
        size: [70, 25],
        strokeWidth: 2.5,
        strokeColor: '#61DAFB'
      }),
      Path.Ellipse({
        position: new Point(x, y),
        rotation: 120,
        size: [70, 25],
        strokeWidth: 2.5,
        strokeColor: '#61DAFB'
      }),
      Path.Ellipse({
        position: new Point(x, y),
        rotation: 240,
        size: [70, 25],
        strokeWidth: 2.5,
        strokeColor: '#61DAFB'
      }),
      Path.Circle({
        position: new Point(x, y),
        fillColor: '#61DAFB',
        radius: 7
      })
    ]

    // 2. Next, group component is rendered without children
    // If applyMatrix=true, setting initial position has no effect.
    //   For each child, new global position is calculated and re-rendered when the group's position is set later.
    // If applyMatrix=false, children are to be positioned to the group's local coordination space.
    //   For each child, new local position is calculated and re-rendered immediately when it is added to the group.
    let group = new Group({
      pivot: new Point(0, 100),
      position: new Point(200, 200),
    })

    // 3. Initial child components are added to group
    group.addChildren(paths)

    // 4. If applyMatrix=true, All group's props are applied just after children added.
    if (this.applyMatrix) {
      group.pivot = new Point(0, 100)
      group.position = new Point(200,200)
    }
  }

  componentDidMount() {
    paper.install(window);
    paper.setup('myCanvas')
    paper.settings.applyMatrix = this.applyMatrix
    console.log(`applyMatrix=${this.applyMatrix}`)

    drawGridLines(800, 600, 100)

    this.drawPath()
    this.drawGroup()
  }


  render() {
    return (
      <canvas id="myCanvas"></canvas>
    )
  }
}

