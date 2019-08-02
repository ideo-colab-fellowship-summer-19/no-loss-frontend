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
import CornLogo from "../../../svg/corn/cornLogo.js"
import PepperLogo from "../../../svg/pepper/pepperLogo.js"
import TomatoLogo from "../../../svg/tomato/tomatoLogo.js"
import "./team.css"

let web3;
let account;
let pool;
let blockchain;
let teamInfo;
let prizeAmount;
let isPlanted;

class Team extends Component {
  async componentDidMount() {
    web3 = this.context.web3
    account = this.context.account
    pool = this.context.pool
    blockchain = new Blockchain(this.context)
    teamInfo = await Backend.getTeamInfo(account);
    prizeAmount = await blockchain.getPrizeAmount().estimatedPrize;
    isPlanted = await Backend.isPlanted(account);
    console.log("plantingstatus")
    console.log(isPlanted)
    console.log("info mounted")
    console.log(teamInfo)
    this.setState({hasLoaded: true, isPurchasing: false, isPlanted: isPlanted })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ isPlanted: nextProps.isPlanted }); 
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
    let statsDisplayPosition = {
      position: "absolute", left: "225px", top: "579px"
    }

    let teamPosition = {
      position: "absolute", top: "657px"
    }
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
              <PurchaseFlow togglePurchase={this.togglePurchase}/>
              <div style={{ paddingTop: "30px", position: "absolute", left: "17px", top: "579px"}}>
              <TeamStatsDisplay teamInfo={teamInfo} prizeInfo={prizeAmount} 
                togglePurchase={this.togglePurchase} style={statsDisplayPosition}/>
              </div>
            </div>
            <div className="teamTab" style={teamPosition}>
              <TeamDisplay />
            </div>
          </div>
        </div>
    } else if (!this.state.isPlanted) {
      let foodLogoStyle = {
        display: "flex", flexDirection: "column", fontFamiliy: "SpaceMonoReg",
        fontSize: "11px", alignItems: "center"
      }
      toReturn = 
        <div>
          <div>
            <HeaderDisplay displayText={teamInfo.name}>
              <ProfileEmpty />
            </HeaderDisplay>
            <div className="mainContent">
              <TrophyCase numTrophies={1} />
              <div className="ChooseYourFighter" style={{
                paddingLeft: "50px", paddingRight: "50px",
                paddingTop: "30px", paddingBottom: "30px",
                height: "113px", width: "217px",
                display: "flex", flexDirection: "column",
                justifyContent: "space-between", alignItems: "center",
                left: "29px", top: "291px", background: "#F1F1F1",
                borderRadius: "20px", position: "absolute"
              }}>
                <div style={{fontFamily: "SpaceMonoBold", fontSize:"11px",
                  }}>
                  Choose your crop?
                </div>
                <div style={{display: "flex", flexDirection: "row",
                  justifyContent: "space-between", fontFamily: "SpaceMonoReg",
                  fontSize: "11px"}}>
                  <div onClick={async () => {
                    await Backend.setPlantType(account, "tomato")
                    await Backend.justPlanted(account)
                    this.setState({isPlanted: true})
                    console.log("planted!")
                    }}>
                    <CornLogo/>   
                    Corn                 
                  </div>
                  <div onClick={async () => {
                    await Backend.setPlantType(account, "tomato")
                    await Backend.justPlanted(account)
                    this.props.afterPlanting()
                    this.setState({isPlanted: true})
                    console.log("planted!")
                    }} style={{marginLeft: "10px"}}>
                    <PepperLogo/> 
                    Pepper                   
                  </div>
                  <div onClick={async () => {
                    await Backend.setPlantType(account, "tomato")
                    await Backend.justPlanted(account)
                    this.props.afterPlanting()
                    this.setState({isPlanted: true})
                    console.log("planted!")
                    }}>
                    <TomatoLogo/>     
                    Tomato               
                  </div>
                </div>
              </div>
              <div style={{ paddingTop: "30px", position: "absolute", left: "17px", top: "579px"}}>
                <TeamStatsDisplay teamInfo={teamInfo} prizeInfo={prizeAmount} 
                  togglePurchase={this.togglePurchase} style={statsDisplayPosition}/>
              </div>
            </div>
            <div className="teamTab" style={teamPosition}>
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
              <div style={{ paddingTop: "30px", position: "absolute", left: "17px", top: "579px"}}>
                <TeamStatsDisplay teamInfo={teamInfo} prizeInfo={prizeAmount} 
                  togglePurchase={this.togglePurchase} style={statsDisplayPosition}/>
              </div>
            </div>
            <div className="teamTab" style={teamPosition}>
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

Team.contextType = useWeb3Context()

export default Team;