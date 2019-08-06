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
let isJoined
let teamId
let teamError = "The user's who you tried to join doesn't exist";

class Team extends Component {
  async componentDidMount() {
    web3 = this.context.web3
    account = this.context.account
    pool = this.context.pool
    blockchain = new Blockchain(this.context)
    teamInfo = await blockchain.getTeamInfo(account);
    console.log("Da info")
    console.log(teamInfo)
    console.log(teamInfo.id)
    if (teamInfo.teamId === "-1") {
      teamId = "Riding Solo"
    } else {
      teamId = "Team " + teamInfo.teamId
    }

    prizeAmount = await blockchain.getPrizeAmount().estimatedPrize;
    isPlanted = await Backend.isPlanted(account);
    isJoined = await Backend.isJoined(account);
    let totalSeeds = await Backend.getTotalSeeds(account);
    let bees = await this.getBees()

    console.log("plantingstatus")
    console.log(isPlanted)
    console.log("info mounted")
    console.log(teamInfo)
    this.setState({hasLoaded: true, isPurchasing: false, isPlanted: isPlanted,
      isJoined: isJoined, value: "" , teamId: teamId, failedJoin: false,
      totalSeeds: totalSeeds, beeList: bees})
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
    this.setTeam = this.setTeam.bind(this);
    this.skipTeam = this.skipTeam.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateSeeds = this.updateSeeds.bind(this)
    this.reloadBees = this.reloadBees.bind(this);
  }

  async getBees() {
    console.log("the account")
    console.log(account)
    let theBees = await Backend.getBees(account)
    console.log("running")
    console.log(theBees)
    return theBees
  }

  togglePurchase() {
    console.log("toggled asfdsaf")
    let theSwitch = this.state.isPurchasing
    this.setState({isPurchasing: !theSwitch})
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  async setTeam() {
    if (this.state.value === 0) {

    } else {
      
      // let result = await blockchain.joinTeam(account, this.state.value)
      let result = await Backend.joinTeam(account, this.state.value)
      this.setState({isJoined: true})
      return
      /*
      if (result === "success") {
        this.setState({isJoined: true})
      } else {
        this.setState({failedJoin: true})
      }
      */
    }
  }

  async updateSeeds() {
    let totalSeeds;
    totalSeeds = await Backend.getTotalSeeds(account);
    this.setState({totalSeeds: totalSeeds})
  }

  async reloadBees() {
    let bees;
    bees = await Backend.getBees(account);
    this.setState({ beeList: bees })
  }

  skipTeam() {
    this.setState({isJoined: true})
  }

  render() {
    let statsDisplayPosition = {
      position: "absolute", left: "225px", top: "420px"
    }

    let teamPosition = {
      position: "absolute", top: "520px"
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
            <HeaderDisplay displayText={teamId}>
              <ProfileEmpty />
            </HeaderDisplay>
          <div className="mainContent" style={{
            display: "flex", flexDirection: "column", justifyContent: "space-between",
            height: "315px", alignItems: "center"}}>
              <TrophyCase numTrophies={1} beeList={this.state.beeList} />
              <PurchaseFlow togglePurchase={this.togglePurchase} updateSeeds={this.updateSeeds}/>
              <div style={{ paddingTop: "30px", position: "absolute", left: "17px", top: "420px"}}>
              <TeamStatsDisplay teamInfo={teamInfo} prizeInfo={prizeAmount} 
                togglePurchase={this.togglePurchase} style={statsDisplayPosition}
                totalSeeds={this.state.totalSeeds} updateSeeds={this.updateSeeds}
                />
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
            <HeaderDisplay displayText={teamId}>
              <ProfileEmpty />
            </HeaderDisplay>
          <div className="mainContent" style={{
            display: "flex", flexDirection: "column", justifyContent: "space-between",
            height: "315px", alignItems: "center"
          }}>
              <TrophyCase numTrophies={1} beeList={this.state.beeList} />
              <div className="ChooseYourFighter" style={{
                paddingLeft: "50px", paddingRight: "50px",
                paddingTop: "30px", paddingBottom: "30px",
                height: "113px", width: "217px",
                display: "flex", flexDirection: "column",
                justifyContent: "space-between", alignItems: "center",
                left: "29px", top: "210px", background: "#F1F1F1",
                borderRadius: "20px", position: "absolute"
              }}>
                <div style={{fontFamily: "SpaceMonoBold", fontSize:"11px",
                  }}>
                  Choose your crop?
                </div>
                <div style={{display: "flex", flexDirection: "row",
                  justifyContent: "space-between", fontFamily: "SpaceMonoReg",
                  fontSize: "11px", width: "200px"}}>
                  <div onClick={async () => {
                    await Backend.setPlantType(account, "corn")
                    await Backend.justPlanted(account)
                    this.props.afterPlanting()
                    this.setState({isPlanted: true})

                    console.log("planted!")
                  }} style={{
                    display: "flex", flexDirection: "column",
                  justifyContent: "center", alignItems: "center"}}>
            
                    <CornLogo/>   
                    Corn                 
                  </div>
                  <div onClick={async () => {
                    await Backend.setPlantType(account, "pepper")
                    await Backend.justPlanted(account)
                    this.props.afterPlanting()
                    this.setState({isPlanted: true})
                    console.log("planted!")
                    }} style={{marginLeft: "10px",
                      display: "flex", flexDirection: "column",
                      justifyContent: "center", alignItems: "center"
                    }}>
                    <PepperLogo/> 
                    Pepper                   
                  </div>
                  <div onClick={async () => {
                    await Backend.setPlantType(account, "tomato")
                    await Backend.justPlanted(account)
                    this.props.afterPlanting()
                    this.setState({isPlanted: true})
                    console.log("planted!")
                  }} style={{ marginLeft: "10px",
                    display: "flex", flexDirection: "column",
                    justifyContent: "center", alignItems: "center"
                  }}>
                    <TomatoLogo/>     
                    Tomato               
                  </div>
                </div>
              </div>
              <div style={{ paddingTop: "30px", position: "absolute", left: "17px", top: "420px"}}>
                <TeamStatsDisplay teamInfo={teamInfo} prizeInfo={prizeAmount} 
                togglePurchase={this.togglePurchase} style={statsDisplayPosition}
                totalSeeds={this.state.totalSeeds} updateSeeds={this.updateSeeds}/>
              </div>
            </div>
            <div className="teamTab" style={teamPosition}>
              <TeamDisplay />
            </div>
          </div>
        </div>
    } else if (!this.state.isJoined) {
      let foodLogoStyle = {
        display: "flex", flexDirection: "column", fontFamiliy: "SpaceMonoReg",
        fontSize: "11px", alignItems: "center"
      }
      toReturn = 
        <div>
          <div>
            <HeaderDisplay displayText={teamId}>
              <ProfileEmpty />
            </HeaderDisplay>
          <div className="mainContent" style={{
            display: "flex", flexDirection: "column", justifyContent: "space-between",
            height: "315px", alignItems: "center"
          }}>
              <TrophyCase numTrophies={1} beeList={this.state.beeList} />
              <div className="ChooseYourFighter" style={{
                paddingLeft: "50px", paddingRight: "50px",
                paddingTop: "30px", paddingBottom: "30px",
                height: "160px", width: "217px",
                display: "flex", flexDirection: "column",
                justifyContent: "space-between", alignItems: "center",
                left: "29px", top: "190px", background: "#F1F1F1",
                borderRadius: "20px", position: "absolute", fontFamily: "SpaceMonoBold",
                fontSize: "14px"
              }}>
              <div style={{paddingBottom: "10px"}}>
                Join a team?
                <div style={{fontSize: "9px", fontColor: "#A5A5A5", paddingBottom: "10px"}}>
                </div>
              </div>
                {this.state.failedJoin && teamError}
                <div className={"username-input"} style={{display: "flex",
                  flexDirection: "column",
                  marginTop: "60px",
                  bottom: "0"}}>
                  <input type="text" value={this.state.value} onChange={this.handleChange}
                      style={{borderRadius: "13.5px", width: "240px", height: "20px", border: "white",
                        marginTop: "-55px", cursor: "pointer", paddingLeft: "11px"}} />
                </div>
                <div className={"button"} onClick={this.setTeam} style={{
                  background: "linear-gradient(169.43deg, #3D7A40 35.64%, #8DB601 101.77%)",
                  borderRadius: "13.5px", width: "200px", height: "25px", color: "#FFFFFF",
                  fontFamily: "SpaceMonoBold", fontSize: "11px", display: "flex",
                  alignItems: "center", justifyContent: "center", marginBottom: "10px"
                  }}>
                    Submit
                </div>
                <div className={"button"} onClick={this.skipTeam} style={{
                  background: "#F1F1F1", border: "1px solid #A5A5A5",
                  borderRadius: "13.5px", width: "200px", height: "25px", color: "#A5A5A5",
                  fontFamily: "SpaceMonoBold", fontSize: "11px", display: "flex",
                  alignItems: "center", justifyContent: "center"
                  }}>
                    Nah
                </div>
              </div>
              <div style={{ paddingTop: "30px", position: "absolute", left: "17px", top: "420px"}}>
                <TeamStatsDisplay teamInfo={teamInfo} prizeInfo={prizeAmount} 
                togglePurchase={this.togglePurchase} style={statsDisplayPosition}
                totalSeeds={this.state.totalSeeds} updateSeeds={this.updateSeeds}/>
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
            <HeaderDisplay displayText={teamId}>
              <ProfileEmpty />
            </HeaderDisplay>
          <div className="mainContent" style={{
            display: "flex", flexDirection: "column", justifyContent: "space-between",
            height: "315px", alignItems: "center"
          }}>
              <TrophyCase numTrophies={1} beeList={this.state.beeList} />
              <GrowingSeedDisplay isBig={true} user={account} reloadBees={this.reloadBees}/>
              <div style={{ paddingTop: "30px", position: "absolute", left: "17px", top: "420px"}}>
                <TeamStatsDisplay teamInfo={teamInfo} prizeInfo={prizeAmount} 
                togglePurchase={this.togglePurchase} style={statsDisplayPosition}
                totalSeeds={this.state.totalSeeds} updateSeeds={this.updateSeeds}/>
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