import React, { Component } from "react";
import { useWeb3Context } from "../../../web3Context.js";
import ProfileEmpty from "../../../svg/profileEmpty.js"

let web3;
let account;
let pool;

class FeedEntry extends Component {
  componentDidMount() {
    web3 = this.context.web3
    account = this.context.account
    pool = this.context.pool
  }

  constructor(props) {
    super(props);

  }

  render() {
    let feedEntryStyle = {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignContent: "center",
      width: "285px",
      height: "65px",
    }

    if (this.props.isFirst) {
      //add top padding
      feedEntryStyle["paddingTop"] = "7px";
    }

    return (
      <div style={feedEntryStyle}>
        <ProfileEmpty />
        <div style={{ fontFamily: "WorkSansReg", color: "#A5A5A5", fontSize: "9px", 
          paddingTop: "11px", marginLeft: "-4px"}}>
          this is a mock transaction!
        </div>
        <div style={{
          fontFamily: "WorkSansLight", color: "#A5A5A5", fontSize: "9px",
          paddingTop: "11px"
        }}>
          3:33 PM
        </div>
      </div>
    )
  }
}

FeedEntry.contextType = useWeb3Context()

export default FeedEntry;