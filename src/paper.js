import React, { Component, PropTypes } from 'react';
import paperjs from 'paper';

export default class Paper extends Component {
  constructor(props) {
    super(props);
    this.paper = null;
  }
  getChildContext() {
    return { paper: this.paper };
  }
  componentDidMount() {
    /*if (!this.paper) {
      const { canvas } = this.refs;
      this.paper = new paperjs.PaperScope();
      this.paper.setup(canvas);
      this.paper.view.play();
      this.forceUpdate();
    }*/
  }
  render() {
    return (
      <div ref="canvas">
        {this.paper ? this.props.children : false}
      </div>
    );
  }
}

Paper.childContextTypes = {
  paper: PropTypes.object
};
