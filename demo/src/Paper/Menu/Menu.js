import React, { Component } from 'react';
import { Motion, StaggeredMotion, spring } from 'react-motion';
import range from 'lodash.range';

import './Menu.css'

// Diameter of the main button in pixels
const MAIN_BUTTON_DIAM = 64;
const CHILD_BUTTON_DIAM = 48;

// The number of child buttons that fly out from the main button
const NUM_CHILDREN = 6;

// should be between 0 and 0.5 (its maximum value is difference between scale in
// finalChildButtonStyles and initialChildButtonStyles)
const OFFSET = 0.05;

const SPRING_CONFIG = { stiffness: 400, damping: 28 };

// How far away from the main button does the child buttons go
const FLY_OUT_RADIUS = 90,
      SEPARATION_ANGLE = 42, //degrees
      FAN_ANGLE = (NUM_CHILDREN - 1) * SEPARATION_ANGLE, //degrees
      BASE_ANGLE = ((180 - FAN_ANGLE) / 2); // degrees

// Utility functions

function toRadians(degrees) {
  return degrees * (Math.PI / 180)
}

function finalChildDeltaPositions(index) {
  let angle = BASE_ANGLE + (index * SEPARATION_ANGLE);
  return {
    deltaX: FLY_OUT_RADIUS * Math.cos(toRadians(angle)) - (CHILD_BUTTON_DIAM / 2),
    deltaY: FLY_OUT_RADIUS * Math.sin(toRadians(angle)) + (CHILD_BUTTON_DIAM / 2)
  };
}


export default class Menu extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      childButtons: []
    };

    // Bind this to the functions
    this.toggleMenu = this.toggleMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.setTool = this.setTool.bind(this);
  }

  componentDidMount() {
    window.addEventListener('click', this.closeMenu);
    let childButtons = [];

    this.setState({ childButtons: childButtons.slice(0) });
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.closeMenu);
  }

  mainButtonStyles() {
    return {
      width: MAIN_BUTTON_DIAM,
      height: MAIN_BUTTON_DIAM,
      top: this.props.y - (MAIN_BUTTON_DIAM / 2),
      left: this.props.x - (MAIN_BUTTON_DIAM / 2)
    };
  }

  initialChildButtonStyles() {
    return {
      width: CHILD_BUTTON_DIAM,
      height: CHILD_BUTTON_DIAM,
      top: spring(this.props.y - (CHILD_BUTTON_DIAM / 2), SPRING_CONFIG),
      left: spring(this.props.x - (CHILD_BUTTON_DIAM / 2), SPRING_CONFIG),
      rotate: spring(-180, SPRING_CONFIG),
      scale: spring(0.5, SPRING_CONFIG)
    };
  }

  initialChildButtonStylesInit() {
    return {
      width: CHILD_BUTTON_DIAM,
      height: CHILD_BUTTON_DIAM,
      top: this.props.y - (CHILD_BUTTON_DIAM / 2),
      left: this.props.x - (CHILD_BUTTON_DIAM / 2),
      rotate: -180,
      scale: 0.5
    };
  }

  finalChildButtonStylesInit(childIndex) {
    let { deltaX, deltaY } = finalChildDeltaPositions(childIndex);
    return {
      width: CHILD_BUTTON_DIAM,
      height: CHILD_BUTTON_DIAM,
      top: this.props.y - deltaY,
      left: this.props.x + deltaX,
      rotate: 0,
      scale: 1
    };
  }

  finalChildButtonStyles(childIndex) {
    let { deltaX, deltaY } = finalChildDeltaPositions(childIndex);
    return {
      width: CHILD_BUTTON_DIAM,
      height: CHILD_BUTTON_DIAM,
      top: spring(this.props.y - deltaY, SPRING_CONFIG),
      left: spring(this.props.x + deltaX, SPRING_CONFIG),
      rotate: spring(0, SPRING_CONFIG),
      scale: spring(1, SPRING_CONFIG)
    };
  }

  toggleMenu(e) {
    e.stopPropagation();
    let { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen
    });
  }

  closeMenu() {
    this.setState({ isOpen: false });
  }

  renderChildButtons() {
    const { isOpen } = this.state;
    const { tools } = this.props
    const targetButtonStylesInitObject = range(tools.length).map(i => {
      return isOpen
        ? this.finalChildButtonStylesInit(i)
        : this.initialChildButtonStylesInit();
    });

    //StaggeredMotion now takes an Array of object
    const targetButtonStylesInit = Object.keys(targetButtonStylesInitObject).map(
      key => targetButtonStylesInitObject[key]
    );

    const targetButtonStyles = range(tools.length).map(i => {
      return isOpen
        ? this.finalChildButtonStyles(i)
        : this.initialChildButtonStyles();
    });

    const scaleMin = this.initialChildButtonStyles().scale.val;
    const scaleMax = this.finalChildButtonStyles(0).scale.val;

    //This function returns target styles for each child button in current animation frame
    //according to actual styles in previous animation frame.
    //Each button could have one of two target styles
    // - defined in initialChildButtonStyles (for collapsed buttons)
    // - defined in finalChildButtonStyles (for expanded buttons)
    // To decide which target style should be applied function uses css 'scale' property
    // for previous button in previous animation frame.
    // When 'scale' for previous button passes some 'border' which is a simple combination one of
    // two 'scale' values and some OFFSET the target style for next button should be changed.
    //
    // For example let's set the OFFSET for 0.3 - it this case border's value for closed buttons will be 0.8.
    //
    // All buttons are closed
    //                INITIAL-BUTTON-SCALE-(0.5)-----------BORDER-(0.8)------FINAL-BUTTON-SCALE-(1)
    //                |------------------------------------------|--------------------------------|
    // BUTTON NO 1    o------------------------------------------|---------------------------------
    // BUTTON NO 2    o------------------------------------------|---------------------------------
    //
    // When user clicks on menu button no 1 changes its target style according to finalChildButtonStyles method
    // and starts growing up. In this frame this button doesn't pass the border so target style for button no 2
    // stays as it was in previous animation frame
    // BUTTON NO 1    -----------------------------------o-------|---------------------------------
    // BUTTON NO 2    o------------------------------------------|---------------------------------
    //
    //
    //
    // (...few frames later)
    // In previous frame button no 1 passes the border so target style for button no 2 could be changed.
    // BUTTON NO 1    -------------------------------------------|-o-------------------------------
    // BUTTON NO 2    -----o-------------------------------------|---------------------------------
    //
    //
    // All buttons are expanded - in this case border value is 0.7 (OFFSET = 0.3)
    //                INITIAL-BUTTON-SCALE-(0.5)---BORDER-(0.7)--------------FINAL-BUTTON-SCALE-(1)
    //                |------------------------------|--------------------------------------------|
    // BUTTON NO 1    -------------------------------|--------------------------------------------O
    // BUTTON NO 2    -------------------------------|--------------------------------------------O
    //
    // When user clicks on menu button no 1 changes its target style according to initialChildButtonStyles method
    // and starts shrinking down. In this frame this button doesn't pass the border so target style for button no 2
    // stays as it was defined in finalChildButtonStyles method
    // BUTTON NO 1    -------------------------------|------------------------------------O--------
    // BUTTON NO 2    -------------------------------|--------------------------------------------O
    //
    //
    //
    // (...few frames later)
    // In previous frame button no 1 passes the border so target style for button no 2 could be changed
    // and this button starts to animate to its default state.
    // BUTTON NO 1    -----------------------------o-|---------------------------------------------
    // BUTTON NO 2    -------------------------------|------------------------------------O--------
    let calculateStylesForNextFrame = prevFrameStyles => {
      prevFrameStyles = isOpen ? prevFrameStyles : prevFrameStyles.reverse();

      let nextFrameTargetStyles = prevFrameStyles.map((buttonStyleInPreviousFrame, i) => {
        //animation always starts from first button
        if (i === 0) {
          return targetButtonStyles[i];
        }

        const prevButtonScale = prevFrameStyles[i - 1].scale;
        const shouldApplyTargetStyle = () => {
          if (isOpen) {
            return prevButtonScale >= scaleMin + OFFSET;
          } else {
            return prevButtonScale <= scaleMax - OFFSET;
          }
        };

        return shouldApplyTargetStyle() ? targetButtonStyles[i] : buttonStyleInPreviousFrame;
      });

      return isOpen ? nextFrameTargetStyles : nextFrameTargetStyles.reverse();
    };

    return (
      <StaggeredMotion
				defaultStyles={targetButtonStylesInit}
				styles={calculateStylesForNextFrame}>
				{interpolatedStyles =>
					<div>
						{interpolatedStyles.map(({height, left, rotate, scale, top, width}, index) =>
							<div
								className="Menu__ChildButton"
								key={index}
								style={{
									left,
									height,
									top,
									transform: `rotate(${rotate}deg) scale(${scale})`,
									width
								}}
							>
								<i
                  className={'material-icons'}
                  title={tools[index].title}
                  data-tool={tools[index].tool}
                  onClick={this.setTool}
                >
                  {tools[index].icon}
                </i>
							</div>
						)}
					</div>
				}
			</StaggeredMotion>
    );
  }

  setTool(e) {
    if (this.props.setTool) {
      this.props.setTool(e.target.dataset.tool)
    }
  }

  render() {
    const { activeTool, tools } = this.props
    const { isOpen } = this.state;
    const tool = tools.find(t => t.tool === activeTool)
    const mainButtonRotation = isOpen
      ? { rotate: spring(-135, { stiffness: 500, damping: 30 }) }
      : { rotate: spring(0, { stiffness: 500, damping: 30 }) }
    return (
      <div className={'Menu'}>
				{this.renderChildButtons()}
				<Motion style={mainButtonRotation}>
					{({rotate}) =>
						<div
              title={tool.title}
							className={'Menu__MainButton'}
							style={{...this.mainButtonStyles(), transform: `rotate(${rotate}deg)`}}
							onClick={this.toggleMenu}
            >
							<i className={'material-icons'} title={tool.title}>{tool.icon}</i>
						</div>
					}
				</Motion>
			</div>
    );
  }
};
