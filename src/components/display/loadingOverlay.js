import React, { Component } from 'react';
import AnimatingSpinnerBigWhite from '../../svg/animating-spinner-big-white.js';
import './loading-overlay.css';

class LoadingOverlay extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    return (
      <div className="loading-overlay">
        <div className="loading-overlay-container">
          <AnimatingSpinnerBigWhite />
        </div>
      </div>
    )
  }
}

export default LoadingOverlay;