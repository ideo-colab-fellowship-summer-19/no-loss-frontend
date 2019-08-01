import React, { Component } from "react";
import { useWeb3Context } from "../../web3Context.js";
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom'
import AnimatingSpinnerBigWhite from "../../svg/animating-spinner-big-white"
import Backend from "../../backend.js"
import CornBearingFruit from "../../svg/corn/cornBearingFruit.js";
import CornBig from "../../svg/corn/cornBig.js";
import CornMedium from "../../svg/corn/cornMedium.js";
import CornSmall from "../../svg/corn/cornSmall.js";
import PepperBearingFruit from "../../svg/pepper/pepperBearingFruit.js"
import PepperBig from "../../svg/pepper/pepperBig.js"
import PepperMedium from "../../svg/pepper/pepperMedium.js"
import PepperSmall from "../../svg/pepper/pepperSmall.js"
import TomatoBearingFruit from "../../svg/tomato/tomatoBearingFruit.js"
import TomatoBig from "../../svg/tomato/tomatoBig.js"
import TomatoMedium from "../../svg/tomato/tomatoMedium.js"
import TomatoSmall from "../../svg/tomato/tomatoSmall"
import { COUNTER_END_DATE } from "../../config.js"

let web3;
let account;
let pool;

class GrowingSeedDisplay extends Component {
  async componentDidMount() {
    web3 = this.context.web3
    account = this.context.account
    pool = this.context.pool
    let drawingDate = new Date(COUNTER_END_DATE)
    let currentDate = new Date()
    let timeDiff = drawingDate - currentDate
    let timeDiffMinutes = Math.floor(timeDiff / 1000 / 60 / 60 / 60);
    let roundStatus = "unset";
    if (currentDate > drawingDate) {
      roundStatus = "finished"
    } else if (timeDiffMinutes < 30) {
      roundStatus = "late"
    } else if (timeDiffMinutes < 60) {
      roundStatus = "middle"
    } else {
      roundStatus = "early"
    }

    let plantType = Backend.getPlantType(account)
    this.setState({ hasLoaded: true, roundStatus: roundStatus, plantType: plantType})
  }

  constructor(props) {
    super(props);
    this.state = { hasLoaded: false }
  }

  // I need to get gameState aka distanceToDrawing (hardcoded for 5 on friday)
  // 

  render() {
    if (!this.hasLoaded) {
      return <AnimatingSpinnerBigWhite/>
    }

    let toRender;
    let plantType = this.state.plantType
    switch(this.state.roundStatus) {
      case "early":
        if (plantType == "tomatoe") {
          toRender = <TomatoSmall />
        } else if (plantType === "pepper") {
          toRender = <PepperSmall />
        } else if (plantType === "corn") {
          toRender = <CornSmall />
        }
      case "middle":
        if (plantType == "tomatoe") {
          toRender = <TomatoMedium />
        } else if (plantType === "pepper") {
          toRender = <PepperMedium />
        } else if (plantType === "corn") {
          toRender = <CornMedium />
        }

      case "late":
        if (plantType == "tomatoe") {
          toRender = <TomatoBig />
        } else if (plantType === "pepper") {
          toRender = <PepperBig />
        } else if (plantType === "corn") {
          toRender = <CornBig />
        }

      case "finished":
        if (plantType == "tomatoe") {
          toRender = <TomatoBearingFruit />
        } else if (plantType === "pepper") {
          toRender = <PepperBearingFruit />
        } else if (plantType === "corn") {
          toRender = <CornBearingFruit />
        }

      default:
        console.log("Error Loading the Growing Seed")

    }
    
    return (
      <div>
        {toRender}
      </div>
    )
  }
}

GrowingSeedDisplay.contextType = useWeb3Context()

export default GrowingSeedDisplay;