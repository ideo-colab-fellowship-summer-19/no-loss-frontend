import React, { Component } from "react";
import { useWeb3Context } from "../../web3Context.js";
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom'


let web3;
let account;
let pool;
let teamName

class HeaderDisplay extends Component {
  componentDidMount() {
    web3 = this.context.web3
    account = this.context.account
    pool = this.context.pool
  }

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div style={{display: "flex", flexDirection: "column", fontFamily: "SpaceMonoBold",
        color: "#A5A5A5", fontSize: "14px", paddingBottom: "16px", alignItems: "center",
        paddingTop: "15px"}}>
        {this.props.children}
        <div>
          {this.props.displayText}
        </div>
      </div>
    )
  }
}

HeaderDisplay.contextType = useWeb3Context()

export default HeaderDisplay;