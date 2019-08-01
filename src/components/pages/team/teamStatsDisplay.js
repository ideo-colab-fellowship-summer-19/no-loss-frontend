import React, { Component } from "react";
import { useWeb3Context } from "../../../web3Context.js";
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom'
import AnimatingSpinnerBigWhite from "../../../svg/animating-spinner-big-white"



let web3;
let account;
let pool;

class TeamStatsDisplay extends Component {
  componentDidMount() {
    web3 = this.context.web3
    account = this.context.account
    pool = this.context.pool
    this.setState({ hasLoaded: true })
  }

  constructor(props) {
    super(props);
    this.state = { hasLoaded: false }
  }

  render() {
    return (
      <div>
        Stats Display (TODO)
      </div>
    )
  }
}

TeamStatsDisplay.contextType = useWeb3Context()

export default TeamStatsDisplay;