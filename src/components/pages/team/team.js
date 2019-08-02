import React, { Component } from "react";
import { useWeb3Context } from "../../../web3Context.js";
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom'
import AnimatingSpinnerBigWhite from "../../../svg/animating-spinner-big-white.js";
import HeaderDisplay from "../../display/headerDisplay.js"
import Backend from "../../../backend.js"
import Blockchain from "../../../blockchain.js";
import ProfileEmpty from "../../../svg/profileEmpty.js"
import GrowingSeedDisplay from "../../display/growingSeedDisplay.js"
import TeamStatsDisplay from "./teamStatsDisplay.js"
import TrophyCase from "./tropyCase.js"
import TeamDisplay from "../../display/teamDisplay.js"
import PurchaseFlow from "./purchaseFlow.js"
import "./team.css"

let web3;
let account;
let pool;
let blockchain;
let teamInfo;
let prizeAmount;

class Team extends Component {
  async componentDidMount() {
    web3 = this.context.web3
    account = this.context.account
    pool = this.context.pool
    blockchain = new Blockchain(this.context)
    teamInfo = await Backend.getTeamInfo(account);
    prizeAmount = await blockchain.getPrizeAmount().estimatedPrize;
    console.log("info mounted")
    console.log(teamInfo)
    this.setState({hasLoaded: true, isPurchasing: false})
  }

  constructor(props) {
    super(props);
    this.state = {
      hasLoaded: false
    }
    this.togglePurchase = this.togglePurchase.bind(this)
  }

  togglePurchase() {
    console.log("toggled asfdsaf")
    let theSwitch = this.state.isPurchasing
    this.setState({isPurchasing: !theSwitch})
  }

  render() {
    let textToDisplay;
    console.log("Loaded")
    console.log(this.state.hasLoaded)
    let toReturn;
    if (!this.state.hasLoaded) {
      toReturn = <AnimatingSpinnerBigWhite/>
    } else if (this.state.isPurchasing) {
      toReturn = 
        <div>
          <div>
            <HeaderDisplay displayText={teamInfo.name}>
              <ProfileEmpty />
            </HeaderDisplay>
            <div className="mainContent">
              <TrophyCase numTrophies={1} />
              <PurchaseFlow />
              <div style={{ paddingTop: "30px" }}>
              <TeamStatsDisplay teamInfo={teamInfo} prizeInfo={prizeAmount} 
                togglePurchase={this.togglePurchase}/>
              </div>
            </div>
            <div className="teamTab">
              <TeamDisplay />
            </div>
          </div>
        </div>
    } else {
      toReturn = 
        <div>
          <div>
            <HeaderDisplay displayText={teamInfo.name}>
              <ProfileEmpty />
            </HeaderDisplay>
            <div className="mainContent">
              <TrophyCase numTrophies={1} />
              <GrowingSeedDisplay isBig={true} user={account} />
              <div style={{ paddingTop: "30px" }}>
                <TeamStatsDisplay teamInfo={teamInfo} prizeInfo={prizeAmount} 
                  togglePurchase={this.togglePurchase}/>
              </div>
            </div>
            <div className="teamTab">
              <TeamDisplay />
            </div>
          </div>
        </div>
    }
    return (
      toReturn
    )
  }
}

/*
{
          this.state.hasLoaded ?
            <div>
              <HeaderDisplay displayText={textToDisplay}>
                <ProfileEmpty />
              </HeaderDisplay>
              <div className="mainContent">
                <TrophyCase numTrophies={1}/>
                <GrowingSeed user={account} />
                <TeamStats teamInfo={teamInfo} prizeInfo={prizeAmount}/>
              </div>
              <div className="teamTab">
                <TeamDisplay/>
              </div>
            </div> :
            <LoadingOverlay />
        }
*/

//TODO:
Team.contextType = useWeb3Context()

//TODO:
export default Team;