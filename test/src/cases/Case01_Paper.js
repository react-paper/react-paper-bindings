import React from "react";
import paper, {Path, Group} from "paper";
import {drawGridLines} from "./common";

export default class Case01_Paper extends React.Component {

  componentDidMount() {
    paper.install(window);
    paper.setup('myCanvas')
    drawGridLines(800, 600, 100)

    let group = new Group()
    const x = 100, y = 100

    let paths = [
      Path.Ellipse({
        center: [x, y],
        size: [70, 25],
        strokeWidth: 2.5,
        strokeColor: '#61DAFB'
      }),
      Path.Ellipse({
        center: [x, y],
        rotation: 120,
        size: [70, 25],
        strokeWidth: 2.5,
        strokeColor: '#61DAFB'
      }),
      Path.Ellipse({
        center: [x, y],
        rotation: 240,
        size: [70, 25],
        strokeWidth: 2.5,
        strokeColor: '#61DAFB'
      }),
      Path.Circle({
        center: [x, y],
        fillColor: '#61DAFB',
        radius: 7
      })
    ]

    group.addChildren(paths)
  }


  render() {
    return (
      <canvas id="myCanvas"></canvas>
    )
  }
}

