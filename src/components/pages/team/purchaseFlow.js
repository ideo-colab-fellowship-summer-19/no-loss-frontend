import React, { Component } from "react";
import { useWeb3Context } from "../../../web3Context.js";
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom'
import AnimatingSpinnerBigWhite from "../../../svg/animating-spinner-big-white"
import MiniDaiBlack from "../../../svg/miniDaiBlack.js"
import Blockchain from  "../../../blockchain.js"
import SeedPod from "../../actions/seedPod.js"

let web3;
let account;
let pool;

class PurchaseFlow extends Component {
  async componentDidMount() {
    web3 = this.context.web3
    account = this.context.account
    pool = this.context.pool
    let blockchain = new Blockchain(this.context)
    let user = await blockchain.getUserDataById(account)
    console.log("payer")
    console.log(user)
    this.setState({ hasLoaded: true, user: user })
    this.setState({ hasLoaded: true })
    this.handleChange = this.handleChange.bind(this);
  }

  constructor(props) {
    super(props);
    this.state = { hasLoaded: false }
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    let purchaseFlowStyle = {

    }
    
    let toReturn;
    if (!this.state.hasLoaded) {
      toReturn = <AnimatingSpinnerBigWhite/>
    } else {
      toReturn = 
      <div>
        <div className={"seedHeader"}>
          <div>
            <SeedPod/>
            <div>
              $5.00 USD
              <div>
              (<MiniDaiBlack/> 5.00 Dai)
              </div>
            </div>
          </div>
        </div>
        <div className={"seedCount"}>
          <div>
            your seeds:
          </div>
          <div>
            <div>
              {this.state.user.ticketCount}
            </div>
          </div>
        </div>
        <div className={"plantSeeds"}>
          plant seeds:
          <div className={"plantSeedsOptions"}/>
            <div>
              +1
            </div>
            <div>
              +5
            </div>
            <div>
              +10
            </div>
            <div>
              +20
            </div>
        </div>
        <div className={"Confirm"}>
          Confirm
        </div>

      </div>
    }

    return (
      toReturn
    )
  }
}

PurchaseFlow.contextType = useWeb3Context()

export default PurchaseFlow;