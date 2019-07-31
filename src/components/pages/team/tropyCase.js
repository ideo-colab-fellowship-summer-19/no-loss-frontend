import React, { Component } from "react";
import { useWeb3Context } from "../../../web3Context.js";
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom'


let web3;
let account;
let pool;

class TrophyCase extends Component {
  componentDidMount() {
    web3 = this.context.web3
    account = this.context.account
    pool = this.context.pool
  }

  constructor(props) {
    super(props);
    this.state = {isMinimized: true, numTrophies: this.props.numTrophies}
  }

  render() {
    let toRender;

    if (isMinimized) {
      // minimized one line
      toRender = <div>

      </div>
    } else {
      // full screen
      toRender = <div></div>
    }

    return (
      <div>

      </div>
    )
  }
}

TrophyCase.contextType = useWeb3Context()

export default TrophyCase;