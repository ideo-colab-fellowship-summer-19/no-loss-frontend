import React, { Component } from "react";
import { useWeb3Context } from "../../../web3Context.js";
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom'
import AnimatingSpinnerBigWhite from "../../../svg/animating-spinner-big-white"
import StepOne from "../../../svg/onboarding/stepOne.js"
import StepTwo from "../../../svg/onboarding/stepTwo.js"
import StepThree from "../../../svg/onboarding/stepThree.js"
import StepFour from "../../../svg/onboarding/stepFour.js"
import StepFive from "../../../svg/onboarding/stepFive.js"
import LeftArrow from "../../../svg/leftArrow.js"


let web3;
let account;
let pool;

class Onboarding extends Component {
  componentDidMount() {
    web3 = this.context.web3
    account = this.context.account
    pool = this.context.pool
    this.setState({hasLoaded: true})
    this.decrement = this.decrement.bind(this)
    this.increment = this.increment.bind(this)
  }

  constructor(props) {
    super(props);
    this.state = {stepNumber: 1}
  }

  decrement() {
    let cur = this.state.stepNumber
    this.setState({stepNumber: cur - 1})
  }

  increment() {
    let cur = this.state.stepNumber
    this.setState({stepNumber: cur + 1})
  }

  render() {
  let startStyle = {
      display: "flex",
      flexDirection: "column",
      marginTop: "50px"
    }

    let onboardingStyle = {
      display: "flex",
      flexDirection: "column",
      marginTop: "60px",
      bottom: "0"
    }
    let arrowStyle = {
      position: "fixed",
      top: "10px",
      left: "10px"
    }
    let toRender

    if (this.state.stepNumber === 1) {
      toRender = <StepOne onClick={this.increment} style={startStyle}/>
    } else if (this.state.stepNumber === 2) {
      toRender =
      <div>
      <LeftArrow onClick={this.decrement} style={arrowStyle}/>
      <div style={onboardingStyle}>
        <StepTwo onClick={this.increment}/>
      </div>
      </div>
    } else if (this.state.stepNumber === 3) {
      toRender =
      <div>
      <LeftArrow onClick={this.decrement} style={arrowStyle}/>
      <div style={onboardingStyle}>
        
        <StepThree onClick={this.increment}/>
      </div>
      </div>
    } else if (this.state.stepNumber === 4) {
      toRender =
      <div style={onboardingStyle}>
        <LeftArrow onClick={this.decrement} style={arrowStyle}/>
        <StepFour onClick={this.increment}/>
      </div>
    } else if (this.state.stepNumber === 5) {
      toRender =
      <div>
      <LeftArrow onClick={this.decrement} style={arrowStyle}/>
      <div style={onboardingStyle}>
        <Link to="/home" >
          <StepFive/>
        </Link>
      </div>
      </div>
    }
    return (
      <div style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
        {toRender}
      </div>
    )
  }
}

Onboarding.contextType = useWeb3Context()

export default Onboarding;