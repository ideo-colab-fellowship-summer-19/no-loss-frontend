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
import Backend from "../../../backend.js"

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
    this.handleChange = this.handleChange.bind(this)
    this.setUsername = this.setUsername.bind(this)
  }

  constructor(props) {
    super(props);
    this.state = {stepNumber: 1, value: "", isRedirected: false}
  }

  decrement() {
    let cur = this.state.stepNumber
    this.setState({stepNumber: cur - 1})
  }

  increment() {
    let cur = this.state.stepNumber
    this.setState({stepNumber: cur + 1})
  }

  setUsername() {
    if (this.state.value === "") {
      return
    }
    // TODO: Send eth transaction
    // pool.setUsername.call(this.state.value, {from: account});
    Backend.setUsername(account, this.state.value)
    console.log(this.props)
    this.props.doneOnboarding()
    this.setState({isRedirected: true})
  }

  handleChange(event) {
    this.setState({value: event.target.value});
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
      top: "20px",
      left: "25px",
      marginBottom: "10px"
    }
    let toRender

    if (this.state.isRedirected) {
      return <Redirect to="/home"/>
    }

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
      <div style={onboardingStyle} onClick={this.increment}>
          <StepFive/>
      </div>
      </div>
    } else if (this.state.stepNumber === 6) {
      toRender =
      <div style={{marginTop: "100px", textAlign: "center"}}>
        <LeftArrow onClick={this.decrement} style={arrowStyle}/>
        <div style={{display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          padding: "20px",
          paddingTop: "27px",
          background: "#F1F1F1",
          width: "282px",
          height: "230px",
          marginTop: "20px",
          alignItmes: "center",
          borderRadius: "20px",
          alignItems: "center"
        }}>
          <div style={{fontFamily: "SpaceMonoBold", fontSize: "24px" }}>
            Play and Grow!
            <div style={{fontFamily: "WorkSansReg", fontSize: "11px", color: "#A5A5A5",
              marginTop: "10px" }}>
              Choose a username and start growing your prizes. You don't need
              a password because your private key (in your wallet) verifies
              your identity for you.
            </div>
          </div>
          
          <div className={"username-input"} style={onboardingStyle}>
            <input type="text" value={this.state.value} onChange={this.handleChange}
              style={{borderRadius: "13.5px", width: "240px", height: "20px", border: "white",
                marginTop: "-55px", cursor: "pointer"}} />
          </div>
          <div className={"button"} onClick={this.setUsername} style={{
          background: "linear-gradient(169.43deg, #3D7A40 35.64%, #8DB601 101.77%)",
          borderRadius: "13.5px", width: "200px", height: "27px", color: "#FFFFFF",
          fontFamily: "SpaceMonoBold", fontSize: "11px", display: "flex",
          alignItems: "center", justifyContent: "center"
          }}>
            Submit
          </div>
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