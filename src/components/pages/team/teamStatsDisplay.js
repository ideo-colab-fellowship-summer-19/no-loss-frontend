import React, { Component } from "react";
import { useWeb3Context } from "../../../web3Context.js";
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom'
import AnimatingSpinnerBigWhite from "../../../svg/animating-spinner-big-white"
import { log } from "util";
import Backend from "../../../backend.js"
import Blockchain from "../../../blockchain.js"
import MiniDaiBlack from "../../../svg/miniDaiBlack"
import SeedPod from "../../actions/seedPod"

let web3;
let account;
let pool;
let yourShare;
let prizePool;
let userData;
let blockchain;
let teamTickets;

class TeamStatsDisplay extends Component {
  async componentDidMount() {
    web3 = this.context.web3
    account = this.context.account
    pool = this.context.pool
    blockchain = new Blockchain(this.context)
    userData = await blockchain.getUserData()
    prizePool = await blockchain.getPoolData()
    prizePool = prizePool.estimatedInterestFixedPoint18
    yourShare = await this.calculateWinShare(userData);
    this.setState({ hasLoaded: true })
  }

  // TODO: implement with live network
  async calculateWinShare(theUser) {
    let userTickets = theUser.totalTickets
    let theGroup = await blockchain.getGroupData(theUser.groupId)
    theGroup = theGroup.members
    console.log("group")
    console.log(theGroup)
    let groupTickets = 0;
    await theGroup.forEach(async (member) => {
      let memberData = await blockchain.getUserDataById(member)
      console.log(memberData.totalTickets)
      groupTickets = groupTickets + memberData.totalTickets
    })
    teamTickets = groupTickets
    let winProportion = userTickets / groupTickets
    let prize = await this.getPrizePool()
    let theShare = winProportion * prize
    return theShare
  }

  async getPrizePool() {
    let thePrize = await blockchain.getPoolData()
    thePrize = thePrize.estimatedInterestFixedPoint18
    return thePrize
  }

  constructor(props) {
    super(props);
    this.state = { hasLoaded: false }
  }

  async tester() {
    console.log("This adsfasdf")
  }

  render() {
    let toRender
    if (this.state.hasLoaded) {
      toRender =
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
          <div className={"left-side"} style={{ display: "flex", flexDirection: "column", 
            alignItems: "center", width: "155px", marginRight: "20px"}}>
            <div style={{display: "flex", flexDirection: "row", fontFamily: "SpaceMonoReg", fontSize: "11px", 
            color: "black", justifyContent: "space-between", width: "125px", paddingLeft: "15px", paddingRight: "15px",
            paddingTop: "5px", paddingBottom: "5px",}}>
              win:
              <div style={{fontFamily: "SpaceMonoBold"}}>
                <MiniDaiBlack /> {yourShare}
              </div> 
            </div>
            <div style={{ display: "flex", flexDirection: "row", fontFamily: "SpaceMonoReg", fontSize: "11px", 
              color: "#C4C4C4", width: "125px", paddingLeft: "15px", paddingRight: "15px",
              justifyContent: "space-between", paddingTop: "5px", paddingBottom: "5px", }}>
              prize pool:
              <div>
                <MiniDaiBlack /> {prizePool}
              </div> 
            </div>
          </div>
          <div className={"right-side"} style={{ display: "flex", flexDirection: "column", 
            alignItems: "center", width: "155px", justifyContent: "space-between" }}>
            <div style={{ display: "flex", flexDirection: "row"}}>
              <SeedPod togglePurchase={(this.props.togglePurchase)}/>
            </div>
            <div style={{ display: "flex", flexDirection: "row", fontFamily: "SpaceMonoReg", 
              fontSize: "11px", color: "#C4C4C4", width: "125px", paddingLeft: "15px", paddingRight: "15px",
              justifyContent: "space-between", paddingTop: "5px", paddingBottom: "5px"}}>
              team total:
              <div>
                <MiniDaiBlack /> {teamTickets}
              </div>
            </div>
          </div>
        </div>
      </div>
    } else {
      toRender = <AnimatingSpinnerBigWhite/>
    }
    return toRender
  }
}

TeamStatsDisplay.contextType = useWeb3Context()

export default TeamStatsDisplay;