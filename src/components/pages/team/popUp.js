import React, { Component } from "react";
import { useWeb3Context } from "../../../web3Context.js";
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom'
import AnimatingSpinnerBigWhite from "../../../svg/animating-spinner-big-white"
import MiniDaiBlack from "../../../svg/miniDaiBlack.js"
import MiniDaiGrey from "../../../svg/miniDaiBlack.js"
import Blockchain from  "../../../blockchain.js"
import SeedPod from "../../actions/seedPod.js"
import LineDelimiterDark from "../../../svg/lineDelimiterDark.js"



let web3;
let account;
let pool;

class PopUp extends Component {
  componentDidMount() {
    web3 = this.context.web3
    account = this.context.account
    pool = this.context.pool
    this.setState({hasLoaded: true})
  }

  constructor(props) {
    super(props);
    this.state = {hasLoaded: false}
  }

  render() {
    return (
      <div style={{display: "flex", justifyContent: "center", marginTop: "90px",
        fontFamily: "WorkSansReg", fontSize: "14px"}}>
        <div style={{width: "200px", height: "150px", padding: "20px",
          display: "flex", flexDirection: "column", background: "#F1F1F1",
          justifyContent: "space-around", alignItems: "center",
          borderRadius: "20px"}}>
          <div style={{display: "flex", justifyContent: "center", textAlign: "center",
        fontFamily: "WorkSansReg", fontSize: "14px"}}>
          {this.props.message}
          </div>
          <div onClick={this.props.action} style={{
            background: "linear-gradient(169.43deg, #3D7A40 35.64%, #8DB601 101.77%)",
            borderRadius: "13.5px", width: "83px", height: "27px", color: "#FFFFFF",
            fontFamily: "SpaceMonoBold", fontSize: "11px", display: "flex",
            alignItems: "center", justifyContent: "center", marginTop: "20px"}}>
            Ok
          </div>
        </div>
      </div>
    )
  }
}

PopUp.contextType = useWeb3Context()

export default PopUp;