import React, { Component } from "react";
import { Web3Context } from "../../../web3Context.js";
import LineDelimiter from "../../../svg/lineDelimiter.js"
import FeedEntry from "./feedEntry.js"
// Likely gonna fake this one for now

let web3;
let account;
let pool;

class Feed extends Component {
  componentDidMount() {
    web3 = this.context.web3
    account = this.context.account
    pool = this.context.pool
  }

  constructor(props) {
    super(props);
  }


  render() {
    let feedStyle = {
      display: "flex",
      flexDirection: "column",
      position: "absolute",
      width: "375px", 
      height: "170px",
      top: "425px",
      background: "#FFFFFF",
      boxShadow: "0px -1px 4px rgba(0, 0, 0, 0.15)",
      borderTopLeftRadius: "30px",
      borderTopRightRadius: "30px",
      overflow: "scroll"
    }

    let feedContentStyle = {
      marginLeft: "42px"
    }
    return (
      <div style={feedStyle}>
        <div style={feedContentStyle}>
          <div className="header" style={{
            display: "flex", flexDirection: "column", justifyContent: "left",
            marginTop: "30px", fontFamily: "WorkSansBold"
          }}>
            July 24th
          <LineDelimiter style={{ justifySelf: "center", color: "F1F1F1", marginTop: "6px"}} />
          </div>
          <div>
            <FeedEntry isFirst={true}/>
            <FeedEntry />
            <FeedEntry />
            <FeedEntry />
            <FeedEntry />
            <FeedEntry />
          </div>
        </div>
      </div>
    )
  }
}

Feed.contextType = Web3Context

export default Feed;