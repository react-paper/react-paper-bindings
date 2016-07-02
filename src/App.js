import React, { Component, PropTypes } from 'react';
import paperjs from 'paper';

class Paper extends Component {
  constructor(props) {
    super(props);
    this.paper = null;
  }
  getChildContext() {
    return { paper: this.paper };
  }
  componentDidMount() {
    if (!this.paper) {
      const { canvas } = this.refs;
      this.paper = new paperjs.PaperScope();
      this.paper.setup(canvas);
      this.paper.view.play();
      this.forceUpdate();
    }
  }
  render() {
    return (
      <canvas ref="canvas">
        {this.paper ? this.props.children : false}
      </canvas>
    );
  }
}

class Layer extends Component {
  constructor(props) {
    super(props);
    this.layer = null;
  }
  getChildContext() {
    return {
      paper: this.context.paper,
      layer: this.layer
    };
  }
  componentDidMount() {
    if (!this.layer) {
      const { paper } = this.context;
      this.layer = new paper.Layer();
      this.forceUpdate();
    }
  }

  render() {
    return (
      this.layer ? this.props.children : false
    );
  }
}

class Circle extends Component {
  constructor(props) {
    super(props);
    this.circle = null;
  }
  componentDidMount() {
    const { paper, layer } = this.context;
    if (paper && layer && !this.circle) {
      this.circle = new paper.Path.Circle(this.props);
      this.forceUpdate();
    }
  }
  componentDidUpdate() {
    if (this.circle) {
      //this.circle.center = new this.context.paper.Point(this.props.center);
      this.circle.fillColor = this.props.fillColor;
    }
  }
  render() {
    return false;
  }
}

Paper.childContextTypes = {
  paper: PropTypes.object
};

Layer.contextTypes = {
  paper: PropTypes.object
};

Layer.childContextTypes = {
  paper: PropTypes.object,
  layer: PropTypes.object
};

Circle.contextTypes = {
  paper: PropTypes.object,
  layer: PropTypes.object
};

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
