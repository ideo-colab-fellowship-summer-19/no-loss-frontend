import React, { Component } from "react";
import { Web3Context } from "../../../web3Context.js";
import Feed from "../feed/feed.js"
import Backend from "../../../backend.js";
import { ENV_API } from "../../../config.js"
import PrizeDisplay from "./prizeDisplay.js"
import ProfileEmpty from "../../../svg/profileEmpty.js"
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom'


let API = ENV_API

class Home extends Component {
  // returns result = {teamName: string, memberList: array[string (address)]}
  async getTeamInfo() {
    // TODO: return Backend.getTeamInfo(this.context.address)
    return {}
  }

  async getTeamId() {
    // TODO:
    return 0
  }

  render() {
    console.log("rendering!")
    console.log(this.context)
    let prizeDisplayStyle = {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }

    let teamCardStyle = {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "left",
      padding: "10px",
      paddingLeft: "17px",
      width: "305px",
      height: "58px",
      background: "#F1F1F1",
      borderRadius: "7px",
      position: "absolute",
      left: "12.5px",
      top: "367px",
      marginLeft: "7px",
      cursor: "pointer"
    }

    let aboveFeedStyle = {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center"
    }

    return(
        <div >
          <div className="aboveFeed">
            <div style={prizeDisplayStyle}>
              <PrizeDisplay />
            </div>
            <Link to={"/team/" + this.context.account }>
              <div className="team-card" style={teamCardStyle}>
                <div className="team-pic" style={{ paddingRight: "10px" }}>
                  {/*<img src={
                  // TODO: API + "/images/" + this.context.address + ".jpg" 
                  "../../../images/placeholder.jpg"
                } />*/}
                  <ProfileEmpty />
                </div>
                <div className="team-description" style={{
                  display: "flex",
                  flexDirection: "column", position: "relative", top: "-5px",
                  paddingLeft: "10px"
                }}>
                  <div style={{ fontFamily: "SpaceMonoBold", fontSize: "14px", color: "#000000" }}>
                    Your Team (default)
                </div>
                  <div style={{ fontFamily: "SpaceMonoReg", fontSize: "11px", color: "#A5A5A5" }}>
                    1 member
                </div>
                  {// TODO: getTeamInfo()
                  }
                </div>
              </div>
            </Link>
          </div>
          <Feed />
        </div>
      
    );
  }
}

Home.contextType = Web3Context

export default Home;