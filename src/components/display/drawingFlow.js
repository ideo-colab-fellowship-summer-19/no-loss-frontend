import React, { Component } from "react";
import { useWeb3Context } from "../../web3Context.js";
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom'
import AnimatingSpinnerBigWhite from "./svg/animating-spinner-big-white"
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

class DrawingFlow extends Component {
  componentDidMount() {
    web3 = this.context.web3
    account = this.context.account
    pool = this.context.pool
    this.setState({hasLoaded: true})
  }

  constructor(props) {
    super(props);
    this.state = {hasLoaded: false, drawingStatus: 1}
  }

  render() {
    let toRender;
    if (this.state.isWinner) {
      toRender = 
        <div>

        </div>
    } else {
      toRender = 
        <div>

        </div>
    }

    return (
      <div style={{zIndex: "999"}}>
        {toRender}
      </div>
    )
  }
}

//TODO:
DrawingComplete.contextType = useWeb3Context()

//TODO:
export default DrawingFlow;