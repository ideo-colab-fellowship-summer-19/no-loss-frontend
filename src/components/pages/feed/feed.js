import React, { Component } from "react";
import { Web3Context } from "../../../web3Context.js";


class Feed extends Component {
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
        <div> Feed Entry 1 </div>
        <div> Feed Entry 2 </div>
        <div> Feed Entry 3 </div>
      </div>
    )
  }
}

Feed.contextType = Web3Context

export default Feed;