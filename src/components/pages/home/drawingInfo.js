import React, { Component } from "react";
import { Web3Context } from "../../../web3Context.js";
import Blockchain from "../../../blockchain.js";
import Backend from "../../../backend.js";

import AnimatingSpinnerBigWhite from "../../../svg/animating-spinner-big-white.js"

let poolData;
let totalSeeds;
let blockchain;
let userData;
let web3;
let account;
let pool;
let seedCount;

class DrawingInfo extends Component {
  async componentDidMount() {
    console.log("lesss")
    console.log(this.context)
    this.web3 = this.context.web3
    this.account = this.context.account
    this.pool = this.context.pool
    this.blockchain = new Blockchain(this.context)
    poolData = await this.blockchain.getPoolData()
    userData = await this.blockchain.getUserData()
    console.log("account man")
    console.log(account)
    totalSeeds = await Backend.getTotalSeeds(this.account)
    console.log("seed man")
    console.log(totalSeeds)
    console.log("Drawing did mount")
    console.log(poolData)
    console.log(userData)
    seedCount = this.blockchain.getSeedCountSync(poolData)

    this.setState({hasLoaded: true})
  }

  constructor(props) {
    super(props);
    this.state = {hasLoaded: false}
  }

  render() {
    let drawingInfoStyle = {
      width: "294px",
      height: "137px",
      left: "42px",
      top: "94px",
      paddingTop: "15px",
      paddingBottom: "23px",
      paddingLeft: "10px",
      paddingRight: "10px",
      background: "linear-gradient(162.46deg, #F05025 9.77%, #FEC600 101.77%)",
      borderRadius: "7px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      color: "white",
      fontFamily: "SpaceMonoReg",
      fontSize: "12px"
    }


    let toReturn;
    
    console.log("drawing render")
    console.log(this.state.hasLoaded)
    console.log(this.context)
    if (this.state.hasLoaded) {
      toReturn = 
      <div style={drawingInfoStyle}>
        <div className="prize-pool-title">
          Prize Pool
        </div>
        <div className="prize-amount" style={{fontFamily: "CircularStdReg", fontSize: "64px", paddingBottom: "6px"}}>
          {poolData.estimatedInterestFixedPoint18}
        </div>
        <div className="prize-pool-copy" style={{fontFamily: "SpaceMonoReg", fontSize: "12px" }}>
          <div style={{display: "flex", flexDirection: "row", fontFamily: "SpaceMonoReg", fontSize: "12px"}}>
            you have 
            <div style={{fontFamily: "SpaceMonoBold", paddingLeft: "7px", paddingBottom: "3px"}}>
              {
                totalSeeds === 1 ?
                totalSeeds + " seed" :
                totalSeeds + " seeds"
              }
            </div>
          </div>
          <div>
            {totalSeeds} seeds planted
          </div>
        </div>
      </div>
    } else {
      toReturn =
        <div>
          <div className="prize-pool-title">
            Prize Pool
        </div>
          <div className="prize-amount">
            poolData.estimatedInterestFixedPoint18;
        </div>
          <div className="prize-pool-copy">
            <div>
              You have
              <AnimatingSpinnerBigWhite/>
              seeds planted
            </div>
            <div>
              {totalSeeds} seeds planted
          </div>
          </div>
        </div>
    }
    return (
      toReturn
    )
  }
}

DrawingInfo.contextType = Web3Context;

export default DrawingInfo;