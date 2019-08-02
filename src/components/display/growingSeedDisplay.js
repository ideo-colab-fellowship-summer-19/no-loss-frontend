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

    let plantType = await Backend.getPlantType(this.props.user)
    this.setState({ hasLoaded: true, roundStatus: roundStatus, plantType: plantType})
  }

  constructor(props) {
    super(props);
    this.state = { hasLoaded: false }
  }

  // I need to get gameState aka distanceToDrawing (hardcoded for 5 on friday)
  // 

  render() {
    if (!this.state.hasLoaded) {
      return <AnimatingSpinnerBigWhite />
    }

    let toRender;
    let plantType = this.state.plantType
    console.log("the round")
    console.log(this.state.roundStatus)
    switch(this.state.roundStatus) {
      case "early":
        if (plantType == "tomato") {
          toRender = <TomatoSmall />
        } else if (plantType === "pepper") {
          toRender = <PepperSmall />
        } else if (plantType === "corn") {
          toRender = <CornSmall />
        }
        break;
      case "middle":
        if (plantType == "tomato") {
          toRender = <TomatoMedium />
        } else if (plantType === "pepper") {
          toRender = <PepperMedium />
        } else if (plantType === "corn") {
          toRender = <CornMedium />
        }
        break;

      case "late":
        if (plantType == "tomato") {
          toRender = <TomatoBig />
        } else if (plantType === "pepper") {
          toRender = <PepperBig />
        } else if (plantType === "corn") {
          toRender = <CornBig />
        }
        break;

      case "finished":
        if (plantType == "tomato") {
          toRender = <TomatoBearingFruit />
        } else if (plantType === "pepper") {
          toRender = <PepperBearingFruit />
        } else if (plantType === "corn") {
          toRender = <CornBearingFruit />
        }
        break;

      default:
        console.log("Error Loading the Growing Seed")
        throw("growing seed error")

    }
    let plantStyle = {
      display: "flex",
      justifyContent: "center",
      marginTop: "122px"
    };
    if (this.props.isBig) {
      plantStyle = {
        display: "flex",
        justifyContent: "center",
        marginTop: "122px"
      };
    } else {
      plantStyle = {
        display: "flex",
        justifyContent: "center"
      };
    }
    
    return (
      <div className={"plantContainer"} style={plantStyle}>
        {toRender}
      </div>
    )
  }
}

GrowingSeedDisplay.contextType = useWeb3Context()

export default GrowingSeedDisplay;