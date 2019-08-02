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
import Blockchain from "../../blockchain.js"
import DrawingFlow from "./drawingFlow.js"

let web3;
let account;
let pool;
let burger = 0;
let burgerData = 0;
let curStatus;

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
let blockchain;

class GrowingSeedDisplay extends Component {
  async componentDidMount() {
    web3 = this.context.web3
    account = this.context.account
    pool = this.context.pool
    blockchain = new Blockchain(this.context)
    let drawingDate = new Date(COUNTER_END_DATE)
    let currentDate = new Date()
    let timeDiff = drawingDate.getTime() - currentDate.getTime()
    let timeDiffMinutes = Math.floor(timeDiff / 1000 / 60);
    let roundStatus = "unset";
    console.log("upupupup")
    console.log(timeDiffMinutes)
    console.log(this.state.drawingFinished)
    if (this.state.drawingFinished) {
      roundStatus = "early"
    } else if (currentDate > drawingDate) {
      console.log("FINISH HIM")
      roundStatus = "finished"
    } else if (timeDiffMinutes < 30) {
      roundStatus = "late"
    } else if (timeDiffMinutes < 60) {
      roundStatus = "middle"
    } else {
      roundStatus = "early"
    }


    let plantType = await Backend.getPlantType(this.props.user)
    console.log("the plant type")
    console.log(plantType)
    userData = await blockchain.getUserData()
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
      isWinner: isWinner, drawingFinished: false})
  }

  constructor(props) {
    super(props);
    this.state = { hasLoaded: false, drawingStatus: 0 }
    this.endDrawing = this.endDrawing.bind(this)
  }

  endDrawing() {
    this.setState({drawingFinished: true})
    this.setState({roundStatus: "early"})
  }

  // I need to get gameState aka distanceToDrawing (hardcoded for 5 on friday)
  // 

  render() {
    console.log('rendering')
    console.log(this.state.drawingFinished)
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
          console.log("DA LITTLE ONE")
          toRender = <TomatoSmall />
        } else if (plantType === "pepper") {
          toRender = <PepperSmall />
        } else if (plantType === "corn") {
          toRender = <CornSmall />
        }
        break;
      case "middle":
        if (plantType == "tomato") {
          toRender = <TomatoMedium/>
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
          toRender = 
          <DrawingFlow endDrawing={this.endDrawing} fruit={"tomato"}>
            <TomatoBearingFruit/>
          </DrawingFlow>
        } else if (plantType === "pepper") {
          toRender = 
          <DrawingFlow endDrawing={this.endDrawing} fruit={"pepper"}>
            <PepperBearingFruit/>
          </DrawingFlow>
        } else if (plantType === "corn") {
          toRender = 
          <DrawingFlow endDrawing={this.endDrawing} fruit={"corn"}>
            <CornBearingFruit/>
          </DrawingFlow>
        }
        break;

      default:
        console.log("Error Loading the Growing Seed")
        throw("growing seed error")

    }

    let plantStyle = {
      display: "flex",
      justifyContent: "center",
      marginTop: "40px"
    };
    if (this.props.isBig) {
      plantStyle = {
        display: "flex",
        justifyContent: "center",
        position: "absolute",
        bottom: "225px",
        left: "82px"
      };
    } else {
      plantStyle = {
        display: "flex",
        justifyContent: "center",
        position: "absolute",
        bottom: "225px",
        left: "82px"
      };
    }

    if (this.state.roundStatus === "finished") {
      plantStyle = {
        display: "flex",
        justifyContent: "center",
        marginTop: "40px"
      };
    } 
    
    return (
      <div className={"plantContainer"} style={plantStyle} onClick={this.drawing}>
        {toRender}
      </div>
    )
  }
}

GrowingSeedDisplay.contextType = useWeb3Context()

export default GrowingSeedDisplay;