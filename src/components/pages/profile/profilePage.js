import React, { Component } from "react";
import { useWeb3Context } from "../../../web3Context.js";
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom'


let web3;
let account;
let pool;

class ProfilePage extends Component {
  componentDidMount() {
    let web3 = this.context.web3
    let account = this.context.account
    let pool = this.context.pool
  }

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        THE PROFILE PAGE FOR {account}
      </div>
    )
  }
}

ProfilePage.contextType = useWeb3Context()

export default ProfilePage;