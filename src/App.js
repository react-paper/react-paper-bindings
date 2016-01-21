import React, { Component, PropTypes } from 'react';
import paper from 'paper';

class Paper extends Component {
  constructor(props) {
    super(props);
    this.paper = null;
  }
  getChildContext() {
    return {
      paper: this.paper
    };
  }
  getDefaultState() {
    return {
      ready: false
    }
  }
  componentDidMount() {
    console.log('componentDidMount paper');
    if (!this.paper) {
      console.log('create paper');
      const { canvas } = this.refs;
      this.paper = new paper.PaperScope();
      this.paper.setup(canvas);
      this.paper.view.play();
      this.setState({
        ready: true
      });
    }
  }
  componentDidUpdate() {
    console.log('componentDidUpdate paper');
  }
  render() {
    console.log('render paper');
    return (
      <canvas ref="canvas">{this.props.children}</canvas>
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
  getDefaultState() {
    return {
      ready: false
    }
  }
  componentDidMount() {
    //console.log('componentDidMount layer');
  }
  componentDidUpdate() {
    console.log('componentDidUpdate layer');
    if (!this.layer) {
      console.log('create layer');
      this.layer = new this.context.paper.Layer();
      this.setState({
        ready: true
      });
    }
  }
  render() {
    //console.log('render layer');
    return this.props.children || false;
  }
}

class Circle extends Component {
  constructor(props) {
    super(props);
    this.circle = null;
  }
  getDefaultState() {
    return {
      ready: false
    }
  }
  componentDidMount() {
    //console.log('componentDidMount circle');
  }
  componentDidUpdate() {
    console.log('componentDidUpdate circle');
    if (this.context.paper && this.context.layer && !this.circle) {
      console.log('create circle');
      this.circle = new this.context.paper.Path.Circle(this.props);
      this.setState({
        ready: true
      });
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
  render() {
    return (
      <div>
        <h1>Hello world</h1>
        <Paper>
          <Layer>
            <Circle
              center={[80, 50]}
              radius={30}
              strokeColor={'red'} />
          </Layer>
        </Paper>
      </div>
    );
  }
}
