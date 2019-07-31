import React, { Component } from "react";
import { useWeb3Context } from "../../../web3Context.js";
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom'
import LoadingOverlay from "../../display/loadingOverlay.js";
import HeaderDisplay from "../../display/headerDisplay.js"
import Backend from "../../../backend.js"
import Blockchain from "../../../blockchain.js";
import ProfileEmpty from "../../../svg/profileEmpty.js"


let web3;
let account;
let pool;
let blockchain;

class Team extends Component {
  componentDidMount() {
    web3 = this.context.web3
    account = this.context.account
    pool = this.context.pool
    blockchain = new Blockchain(this.context)
    this.setState({hasLoaded: true})
  }

  constructor(props) {
    super(props);
    this.state = {
      hasLoaded: false
    }

  }

  render() {
    let textToDisplay;
    let teamInfo;
    let prizeInfo;
    if (account) {
      teamInfo = Backend.getTeamInfo();
      textToDisplay = teamInfo.name
      prizeAmount = blockchain.getPrizeAmount().estimatedPrize;
    }
    return (
      <div>
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
      </div>
    )
  }
}

//TODO:
Team.contextType = useWeb3Context()

//TODO:
export default Team;