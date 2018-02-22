import React from "react";
import paper, {Path} from "paper";

export default class Case01_Paper extends React.Component {

  componentDidMount() {
    paper.install(window);
    paper.setup('myCanvas')

    new Path.Rectangle({
      point: [100, 100],
      size: [100, 100],
      fillColor: 'black'
    })
  }


  render() {
    return (
      <canvas id="myCanvas"></canvas>
    )
  }
}

