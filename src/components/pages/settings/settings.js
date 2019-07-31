import React, { Component } from "react";
import { useWeb3Context } from "../../../web3Context.js";
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom'


let web3;
let account;
let pool;

class Settings extends Component {
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
      <div>
        THE SETTINGS PAGE
      </div>
    )
  }
}

Settings.contextType = useWeb3Context()

export default Settings;