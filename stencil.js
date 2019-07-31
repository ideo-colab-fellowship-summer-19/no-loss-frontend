import React, { Component } from "react";
//TODO:
import { useWeb3Context } from "../../../web3Context.js";
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom'


let web3;
let account;
let pool;

// TODO:
class ComponentName extends Component {
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
      <div>

      </div>
    )
  }
}

//TODO:
ComponentName.contextType = useWeb3Context()

//TODO:
export default ComponentName;