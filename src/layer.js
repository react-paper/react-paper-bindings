import React, { Component, PropTypes } from 'react';
import paperjs from 'paper';

export default class Layer extends Component {
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

Layer.contextTypes = {
  paper: PropTypes.object
};

Layer.childContextTypes = {
  paper: PropTypes.object,
  layer: PropTypes.object
};
