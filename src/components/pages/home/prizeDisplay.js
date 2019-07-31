import React, { Component } from "react";
import { Web3Context } from "../../../web3Context.js";
import Countdown from 'react-countdown-now';
import DrawingInfo from './drawingInfo';

class PrizeDisplay extends Component {

  constructor(props) {
    super(props)
  }
  render() {
    let countdownContainerStyle = {
      display: "flex",
      fontFamily: "SpaceMonoReg",
      fontSize: "12",
      paddingBottom: "10px",
      alignItems: "center",
      justifyContent: "center"
    }
    // TODO: Customize the countdown
    let oneSecond = 1000
    // 46 hours from now
    let countdownDummy = oneSecond * 60 * 60 * 46
    console.log("prize display")
    console.log(this.context)
    return(
      <div style={{paddingTop: "25px"}}>
        <div className="countdown-container" style={countdownContainerStyle}>
          <Countdown date={Date.now() + countdownDummy} /> 
          <div style={{paddingLeft: "7px"}}>
            to Harvest
          </div>
        </div>
        <DrawingInfo />
      </div>
    )
  }
}

PrizeDisplay.contextType = Web3Context

export default PrizeDisplay;