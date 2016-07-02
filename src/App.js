import React, { Component, PropTypes } from 'react';
import Paper from './paper';
import Circle from './circle';
import Layer from './layer';


export class App extends Component {
  constructor(props) {
    super(props);
    this.color = ['violet', 'indigo', 'blue', 'green', 'yellow', 'orange', 'red'];
    this.state = { x: 100, y: 100, color: 0 };
  }
  componentDidMount() {
    this.interval = setInterval(this.tick.bind(this), 1000);
  }
  tick() {
    this.setState({
      x: this.state.x + 0.1,
      y: this.state.y + 0.1,
      color: this.state.color + 1
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    return (
      <div>
        <h1>Hello world</h1>
          <Paper>
            <Layer>
              <Circle
                center={[this.state.x, this.state.y]}
                radius={50}
                fillColor={this.color[this.state.color % 7] }/>
            </Layer>
          </Paper>
      </div>
    );
  }
}
