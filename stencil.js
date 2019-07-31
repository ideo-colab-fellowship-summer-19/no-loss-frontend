import React, { Component } from "react";
//TODO:
import { useWeb3Context } from "../../../web3Context.js";

let web3;
let account;
let pool;

// TODO:
class ComponentName extends Component {
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

      </div>
    )
  }
}

//TODO:
ComponentName.contextType = useWeb3Context()

//TODO:
export default ComponentName;