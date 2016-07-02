import React, { Component, PropTypes } from 'react';
import paperjs from 'paper';

export default class Circle extends Component {
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
      this.circle.fillColor = this.props.fillColor;
    }
  }
  render() {
    return false;
  }
}

Circle.contextTypes = {
  paper: PropTypes.object,
  layer: PropTypes.object
};
