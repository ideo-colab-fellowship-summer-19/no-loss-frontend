import React, { Component } from "react";
import { useWeb3Context } from "../../web3Context.js";
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom'
import AnimatingSpinnerBigWhite from "../../svg/animating-spinner-big-white"
import lottie from 'lottie-web'
import BeeWin from "../../svg/beeWin.js"
import YourSeeds from "../../svg/yourSeeds.js"
import DaiBig from "../../svg/daiBig.js"
import ExplodeChile from "../../animations/explode_chiles.json"
import ExplodeCorn from "../../animations/explode_corn.json"
import ExplodeTomato from "../../animations/explode_tomato.json"
import WinBee from "../../animations/win_bee.json"
import WinDai from "../../animations/win_dai.json"
import WinSeed from "../../animations/win_seed.json"
import Blockchain from "../../blockchain.js"
import Backend from "../../backend.js"

let web3;
let account;
let pool;
let animationBox = "animationBox"

let burgerData = 0

const cornAnimation = lottie.loadAnimation({
  container: animationBox,
  renderer: 'svg',
  loop: true,
  autoplay: true,
  animationData: burgerData,
});

const pepperAnimation = lottie.loadAnimation({
  container: animationBox,
  renderer: 'svg',
  loop: true,
  autoplay: true,
  animationData: burgerData,
});

const tomatoAnimation = lottie.loadAnimation({
  container: animationBox,
  renderer: 'svg',
  loop: true,
  autoplay: true,
  animationData: burgerData,
});

const beeAnimation = lottie.loadAnimation({
  container: animationBox,
  renderer: 'svg',
  loop: true,
  autoplay: true,
  animationData: burgerData,
});

const daiAnimation = lottie.loadAnimation({
  container: animationBox,
  renderer: 'svg',
  loop: true,
  autoplay: true,
  animationData: burgerData,
});

const seedAnimation = lottie.loadAnimation({
  container: animationBox,
  renderer: 'svg',
  loop: true,
  autoplay: true,
  animationData: burgerData,
});

let openAnimation;
let winAnimation;
let user;
let isWinner;
let blockchain;

class DrawingFlow extends Component {

  async componentDidMount() {
    web3 = this.context.web3
    account = this.context.account
    pool = this.context.pool
    blockchain = new Blockchain(this.context)
    user = await blockchain.getUserData()
    isWinner = (user.totalWinnings > 0)

    this.setState({hasLoaded: true, drawingStatus: 0, isWinner: isWinner})
  }

  constructor(props) {
    super(props);
    this.state = {hasLoaded: false, drawingStatus: 0}
    this.increment = this.increment.bind(this);

  }

  increment() {
    // TODO: Change if animations added
    console.log(this.state)
    if (this.state.drawingStatus === 1) {
      console.log(this.props.endDrawing)
      let beeRandom = Math.floor((Math.random() * 10) + 1);
      Backend.addBee(account, beeRandom)
      this.props.endDrawing()
    }

    let status = this.state.drawingStatus
    this.setState({drawingStatus: status + 1})
  }

  render() {
    let toRender;
    
    if (!this.state.hasLoaded) {
      return <div> </div>
    }

    if (this.state.isWinner) {
      if (this.state.drawingStatus === 0) {
        toRender = 
        <div style={{position: "absolute", width: "375px", height: "700px", zIndex: "999"}} id={"animationBox"} 
          onClick={() => {
            // startAnimation
            /*
            if (this.props.fruit === "tomato") {

            } else if (this.props.fruit === "corn") {

            } else if (this.props.fruit === "pepper") {

            }
            */
            this.increment()
          }}>
          
        </div>
      } else if (this.state.drawingStatus === 1) {
        toRender = 
        <div style={{zIndex: "999", display: "flex", justifyContent: "center", 
          alignItems: "center", flexDirection: "column", position: "absolute", 
          top: "150px", left: "24px", zIndex: "999"}} onClick={this.increment}>
          <div style={{fontFamily: "SpaceMonoBold", fontSize: "12px",
            background:"#F1F1F1", borderRadius: "20px", display: "flex",
            flexDirection: "column", alignItems: "center", marginBottom: "15px"}}>
            <DaiBig/>
            <div>
              {user.totalWinnings} DAI! Withdraw whenever.
            </div>
          </div>
          <BeeWin style = {{marginBottom: "15px"}}/>
          <YourSeeds/>
        </div>
      }
    } else {
      if (this.state.drawingStatus === 0) {
        toRender = 
        <div style={{position: "absolute", width: "375px", zIndex: "999"}} 
        id={"animationBox"} 
          onClick={() => {
            // startAnimation
            if (this.props.fruit === "tomato") {

            } else if (this.props.fruit === "corn") {

            } else if (this.props.fruit === "pepper") {

            }
            this.increment()
          }}>
          
        </div>
      } else {
        toRender = 
        <div style={{zIndex: "999", display: "flex", flexDirection: "column",
          justifyContent: "center", 
          alignItems: "center", position: "absolute", top: "150px", left: "24px",
          zIndex: "999"}} onClick={this.increment}>
          <BeeWin style={{marginBottom: "15px"}}/>
          <YourSeeds style={{marginBottom: "15px"}}/>
        </div>
      }
    }

    return (
      <div className={"drawing"}
        style={{marginBottom: "15px"}}>
        {toRender}
        {this.props.children}
      </div>
    )
  }
}

DrawingFlow.contextType = useWeb3Context()

export default DrawingFlow;