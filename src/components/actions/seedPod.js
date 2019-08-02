import React, { Component } from "react";
import { useWeb3Context } from "../../web3Context";
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom'
import AnimatingSpinnerBigWhite from "../../svg/animating-spinner-big-white"
import Blockchain from "../../blockchain.js"


let web3;
let account;
let pool;
let userData

class SeedPod extends Component {
  async componentDidMount() {
    web3 = this.context.web3
    account = this.context.account
    pool = this.context.pool
    let blockchain = new Blockchain(this.context)
    userData = await blockchain.getUserData()
    this.setState({ hasLoaded: true })
  }

  constructor(props) {
    super(props);
    this.state = { hasLoaded: false}
  }

  render() {
    if (this.state.hasLoaded) {
      return (
        <div style={{ display: "flex", flexDirection: "row", fontFamily: "SpaceMonoReg", 
          fontSize: "11px", color: "black", width: "125px", paddingLeft: "15px", paddingRight: "15px",
          paddingTop: "5px", paddingBottom: "5px",
          justifyContent: "space-between", background: "#F1F1F1", borderRadius: "13.5px"}} 
          onClick={this.props.togglePurchase}>
          <div>
            your seeds: 
          </div>
          <div style={{
            fontFamily: "SpaceMonoBold"}}>
            {userData.totalTickets}
          </div>
        </div>
      )
    } else {
      return <AnimatingSpinnerBigWhite/>
    }
  }
}

SeedPod.contextType = useWeb3Context()

export default SeedPod;