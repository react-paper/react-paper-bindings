import React, { Component, PropTypes } from 'react';
import paperjs from 'paper';

class Paper extends Component {
  constructor(props) {
    super(props);
    this.paper = null;
    //this.state = { ready: false };
  }
  getChildContext() {
    return { paper: this.paper };
  }
  componentDidMount() {
    //console.log('componentDidMount paper');
    if (!this.paper) {
      //console.log('create paper');
      const { canvas } = this.refs;
      this.paper = new paperjs.PaperScope();
      this.paper.setup(canvas);
      this.paper.view.play();
      this.forceUpdate();
      //this.setState({ ready: true });
    }
  }
  componentDidUpdate() {
    //console.log('componentDidUpdate paper');
  }
  render() {
    //console.log('render paper');
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
    //this.state = { ready: false };
  }
  getChildContext() {
    return {
      paper: this.context.paper,
      layer: this.layer
    };
  }
  componentDidMount() {
    //console.log('componentDidMount layer');
    if (!this.layer) {
      const { paper } = this.context;
      //console.log('create layer');
      this.layer = new paper.Layer();
      this.forceUpdate();
      //this.setState({ ready: true });
    }
  }
  componentDidUpdate() {
    //console.log('componentDidUpdate layer');
  }
  render() {
    //console.log('render layer');
    return (
      this.layer ? this.props.children : false
    );
  }
}

class Circle extends Component {
  constructor(props) {
    super(props);
    this.circle = null;
    //this.state = { ready: false };
  }
  componentDidMount() {
    //console.log('componentDidMount circle');
    const { paper, layer } = this.context;
    if (paper && layer && !this.circle) {
      //console.log('create circle');
      this.circle = new paper.Path.Circle(this.props);
      console.log(this.circle);
      this.forceUpdate();
      //this.setState({ ready: true });
    }
  }
  componentDidUpdate() {
    //console.log('componentDidUpdate circle');
    if (this.circle) {
      this.circle.center = new this.context.paper.Point(this.props.center);
    }
  }
  render() {
    //console.log('render circle');
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
    this.state = { x: 0, y: 0 };
    this.interval = setInterval(this.tick.bind(this), 10);
  }
  tick() {
    this.setState({
      x: this.state.x + 0.1,
      y: this.state.y + 0.1
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
              radius={30}
              fillColor={'red'} />
          </Layer>
        </Paper>
      </div>
    );
  }
}
