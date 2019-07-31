import React, { Component } from "react";
import { Web3Context } from "../../../web3Context.js";
import Feed from "../feed/feed.js"
import Backend from "../../../backend.js";
import { ENV_API } from "../../../config.js"
import PrizeDisplay from "./prizeDisplay.js"

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

    return(
      <div>
        <div className="aboveFeed">
          <div style={prizeDisplayStyle}>
            <PrizeDisplay/>
          </div>
          <div className="team-card">
            <div className="team-pic">
              <img src={
                // TODO: API + "/images/" + this.context.address + ".jpg" 
                "../../../images/placeholder.jpg"
              } />
            </div>
            <div className="team-description">
              Your Team (default)
              1 member
            {// TODO: getTeamInfo()
              }
            </div>
          </div>
        </div>
        <Feed />
      </div>
    );
  }
}

Home.contextType = Web3Context

export default Home;