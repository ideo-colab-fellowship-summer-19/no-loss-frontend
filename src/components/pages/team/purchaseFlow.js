import React, { Component } from "react";
import { useWeb3Context } from "../../../web3Context.js";
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom'
import AnimatingSpinnerBigWhite from "../../../svg/animating-spinner-big-white"
import MiniDaiBlack from "../../../svg/miniDaiBlack.js"
import MiniDaiGrey from "../../../svg/miniDaiBlack.js"
import Blockchain from  "../../../blockchain.js"
import Backend from "../../../backend.js"
import SeedPod from "../../actions/seedPod.js"
import LineDelimiterDark from "../../../svg/lineDelimiterDark.js"
import PopUp from "./popUp.js"


let web3;
let account;
let pool;
let blockchain;

class PurchaseFlow extends Component {
  async componentDidMount() {
    web3 = this.context.web3
    account = this.context.account
    pool = this.context.pool
    blockchain = new Blockchain(this.context)
    let user = await blockchain.getUserDataById(account)
    console.log(user)
    console.log("payer")
    console.log(user)
    this.setState({ hasLoaded: true, user: user })
  }

  constructor(props) {
    super(props);
    this.state = { hasLoaded: false, ticketsToBuy: 0, hasBought: false}
    this.buyTickets = this.buyTickets.bind(this);
    this.setOne = this.setOne.bind(this);
    this.setFive = this.setFive.bind(this);
    this.setTen = this.setTen.bind(this);
    this.setTwenty = this.setTwenty.bind(this);
    this.autoPlant = this.autoPlant.bind(this);
  }

  setOne() {
    this.setState({ticketsToBuy: 1})
  }

  setFive() {
    this.setState({ticketsToBuy: 5})
  }

  setTen() {
    this.setState({ticketsToBuy: 10})
  }

  setTwenty() {
    this.setState({ticketsToBuy: 20})
  }

  buyTickets() {
    if (this.state.ticketsToBuy === 0) {
      this.setState({poppedUp: true, message: "You haven't selected any seeds."})
    } else if (this.state.ticketsToBuy != 1) {
      this.setState({poppedUp: true, message: "You only have enough coins to buy one seed."})
    } else {
      // blockchain.buyTickets(this.state.ticketsToBuy)
      this.setState({hasBought: true})
    }
  }

  async autoPlant() {
    await Backend.registerAutoPlant();
    this.props.togglePurchase();
  }

  render() {
    let purchaseFlowStyle = {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      padding: "20px",
      paddingTop: "27px",
      background: "#F1F1F1",
      width: "282px",
      height: "310px",
      marginTop: "20px",
      alignItems: "center",
      borderRadius: "20px"
    }

    let unclickedStyle = {
      width: "45px", height: "15px", borderRadius: "3px", paddingRight: "7px",
      paddingLeft: "7px", paddingTop: "7px", paddingBottom: "7px",
      background: "#FFFFFF", margin: "7px", display: "flex", flexDirection: "row",
      justifyContent: "center", alignItems: "center", color: "#C4C4C4"
    }

    let clickedStyle = Object.assign({}, unclickedStyle)
    clickedStyle.background = "#3D7A40"
    clickedStyle.color = "#FFFFFF"

    let setOneStyle = Object.assign({}, unclickedStyle)
    setOneStyle.marginLeft = "0px"

    let setFiveStyle = unclickedStyle

    let setTenStyle = unclickedStyle

    let setTwentyStyle = Object.assign({}, unclickedStyle)
    setTwentyStyle.marginRight = "0px"

    if (this.state.ticketsToBuy === 1) {
      setOneStyle = clickedStyle
    } else if (this.state.ticketsToBuy === 5) {
      setFiveStyle = clickedStyle
    } else if (this.state.ticketsToBuy === 10) {
      setTenStyle = clickedStyle
    } else if (this.state.ticketsToBuy === 20) {
      setTwentyStyle = clickedStyle
    }

    let daiStyle = {
      fontFace: "WorkSansReg", color: "#A5A5A5", fontSize: "9px",
      display: "flex", justifyContent: "center", alignItems: "center"
    }
    
    let toReturn;

    if (this.state.poppedUp) {
      return <PopUp message={this.state.message} action={() => {this.setState({poppedUp: false})}} />
    }

    if (!this.state.hasLoaded) {
      toReturn = <AnimatingSpinnerBigWhite />
    } else if (this.state.hasBought) {
      toReturn = 
      <div style={{display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "space-between", padding: "20px",
        paddingTop: "27px",
        background: "#F1F1F1",
        width: "282px",
        height: "310px",
        marginTop: "20px",
        borderRadius: "20px"}}>
        <div style={{
            fontFamily: "WorkSansBold", color: "#C4C4C4", fontSize: "14px",
            borderRadius: "3px", display: "flex", flexDirection: "column"
          }}>
          <div onClick={this.setTen} style = {clickedStyle}>
            +1
          </div>
          <div style = {daiStyle}>
            <MiniDaiGrey style={{marginRight: "2px"}}/> 5 DAI
          </div>
        </div>
        <div style={{
            fontFamily: "WorkSansBold", color: "#A5A5A5", fontSize: "9px",
            borderRadius: "3px", display: "flex", flexDirection: "row",
            textAlign: "center"
          }}>
          (Pending Confirmation. May take a few minutes to register on the interface.)
        </div>
        <div style={{fontFamily: "SpaceMonoReg", fontSize: "11px", lineHeight: "16px"}}>
          <div style={{marginBottom: "16px"}}>
            With automatic planting, you can grow your harvest effortlessly and transfer out
            any time.
          </div>

          <div>
            Would you like to set this as your weekly seed deposit?
          </div>
        </div>

        <div className={"button"} onClick={this.autoPlant} style={{
          background: "linear-gradient(169.43deg, #3D7A40 35.64%, #8DB601 101.77%)",
          borderRadius: "13.5px", width: "269px", height: "27px", color: "#FFFFFF",
          fontFamily: "SpaceMonoBold", fontSize: "11px", display: "flex",
          alignItems: "center", justifyContent: "center"
          }}>
            yes, plant seeds automatically
        </div>

        <div className={"button"} onClick={this.props.togglePurchase} style={{
          background: "rgb(241, 241, 241)", border: "1px solid #A5A5A5",
          borderRadius: "13.5px", width: "105px", height: "27px", color: "#A5A5A5",
          fontFamily: "SpaceMonoReg", fontSize: "11px", display: "flex",
          alignItems: "center", justifyContent: "center"
          }}>
            no thanks!
        </div>

      </div>
    } else {
      toReturn = 
      <div style={purchaseFlowStyle}>
        <div className={"seedCount"} style={{
          display: "flex", flexDirection: "row", marginTop: "-20px", justifyContent: "space-between",
          marginRight: "20px"
        }}>
          <div style={{fontFamily: "SpaceMonoReg", fontSize: "11px"}}>
            your seeds:
          </div>
          <div>
            <div style={{display: "flex", flexDirection: "column", 
              fontFamily: "WorkSansBold", fontSize: "14px", alignItems: "center"}}>
              <div style={{marginBottom: "7px"}}>
                {this.state.user.totalTickets}
              </div>
              <div style={{fontSize:"9px", color: "#A5A5A5", display: "flex", flexDirection: "column", justifyContent: "center", alignItems:"center"}}>
                <div style={{marginBottom: "3px"}}>
                  <MiniDaiGrey/> 5 DAI 
                </div>
                <div>
                  $ 5 USD
                </div>
                
              </div>
            </div>
          </div>
        </div>
        <div className={"plantSeeds"} style={{display: "flex", flexDirection: "column",
          fontFamily: "SpaceMonoReg", fontSize: "11px"}}>
          <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
            <LineDelimiterDark/>
          </div>
          <div style={{marginBottom:"10px", marginTop: "20px"}}>
            plant seeds:
          </div>
          <div className={"plantSeedsOptions"} style={{
            fontFamily: "WorkSansBold", color: "#C4C4C4", fontSize: "14px",
            borderRadius: "3px", display: "flex", flexDirection: "row"
          }}>
            <div>
              <div onClick={this.setOne} style = {setOneStyle}>
                +1
              </div>
              <div style = {daiStyle}>
                <MiniDaiGrey style={{marginRight: "2px"}}/> 5 DAI
              </div>
            </div>
            <div>
              <div onClick={this.setFive} style = {setFiveStyle}>
                +5
              </div>
              <div style = {daiStyle}>
                <MiniDaiGrey style={{marginRight: "2px"}}/> 5 DAI
              </div>
            </div>
            <div>
              <div onClick={this.setTen} style = {setTenStyle}>
                +10
              </div>
              <div style = {daiStyle}>
                <MiniDaiGrey style={{marginRight: "2px"}}/> 10 DAI
              </div>
            </div>
            <div>
              <div onClick={this.setTwenty} style = {setTwentyStyle}>
                +20
              </div>
              <div style = {daiStyle}>
                <MiniDaiGrey style={{marginRight: "2px"}}/> 20 DAI
              </div>
            </div>
          </div>
        </div>
        <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
          <LineDelimiterDark/>
        </div>
          <div className={"Confirm"} onClick={this.buyTickets} style={{
          background: "linear-gradient(169.43deg, #3D7A40 35.64%, #8DB601 101.77%)",
          borderRadius: "13.5px", width: "83px", height: "27px", color: "#FFFFFF",
          fontFamily: "SpaceMonoBold", fontSize: "11px", display: "flex",
          alignItems: "center", justifyContent: "center", bottom: 0, left: "240px",
          top: "300px", marginLeft: "190px", marginTop: "20px"
          }}>
            Confirm
          </div>
      </div>
    }

    return (
      <div style={{display: "flex", justifyContent: "center"}}>
        {toReturn}
      </div>
    )
  }
}

PurchaseFlow.contextType = useWeb3Context()

export default PurchaseFlow;