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
import lottie from 'lottie-web'

let web3;
let account;
let pool;

const cornAnimation = lottie.loadAnimation({
  container: burger,
  renderer: 'svg',
  loop: true,
  autoplay: true,
  animationData: burgerData,
});

const pepperAnimation = lottie.loadAnimation({
  container: burger,
  renderer: 'svg',
  loop: true,
  autoplay: true,
  animationData: burgerData,
});

const tomatoAnimation = lottie.loadAnimation({
  container: burger,
  renderer: 'svg',
  loop: true,
  autoplay: true,
  animationData: burgerData,
});

const beeAnimation = lottie.loadAnimation({
  container: burger,
  renderer: 'svg',
  loop: true,
  autoplay: true,
  animationData: burgerData,
});

const daiAnimation = lottie.loadAnimation({
  container: burger,
  renderer: 'svg',
  loop: true,
  autoplay: true,
  animationData: burgerData,
});

const seedAnimation = lottie.loadAnimation({
  container: burger,
  renderer: 'svg',
  loop: true,
  autoplay: true,
  animationData: burgerData,
});

let openAnimation;
let winAnimation;
let userData

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
    userData = await Backend.getUserData()
    if (plantType === "corn") {
      openAnimation = cornAnimation
    } else if (plantType === "tomato") {
      openAnimation = tomatoAnimation 
    } else {
      openAnimation = pepperAnimation
    }

    let isWinner = false;

    if (userData.totalWinnings > 0) {
      isWinner = true;
    }

    
    this.setState({ hasLoaded: true, roundStatus: roundStatus, plantType: plantType,
      isWinner: isWinner})
  }

  constructor(props) {
    super(props);
    this.state = { hasLoaded: false, drawingStatus: 0 }
  }

  drawing() {
    //TODO: Drawing logic
    
  }

  // I need to get gameState aka distanceToDrawing (hardcoded for 5 on friday)
  // 

  render() {
    if (!this.state.hasLoaded) {
      return <AnimatingSpinnerBigWhite />
    }

    let drawingFunction = () => {return}
    if (new Date() > new Date(COUNTER_END_DATE) && this.state.drawingStatus < 2) {
      drawingFunction = () => {
        if (this.state.drawingStatus === 1) {
          // animation on click
          if ()
        }
        curStatus = this.state.drawingStatus
        this.setState({drawingStatus: curStatus + 1})
      }
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
    let theDrawing = <div> </div>
    if (this.state.drawingStatus === 1) {
      theDrawing = <DrawingFlow theAccount={account} userData={userData} isWinner={this.state.isWinner}
        plantType={this.state.plantType}/>
    }

    let plantStyle = {
      display: "flex",
      justifyContent: "center",
      marginTop: "90px"
    };
    if (this.props.isBig) {
      plantStyle = {
        display: "flex",
        justifyContent: "center",
        marginTop: "90px"
      };
    } else {
      plantStyle = {
        display: "flex",
        justifyContent: "center"
      };
    }
    
    return (
      <div className={"plantContainer"} style={plantStyle} onClick={this.drawing}>
        {toRender}
        {theDrawing}
      </div>
    )
  }
}

GrowingSeedDisplay.contextType = useWeb3Context()

export default GrowingSeedDisplay;