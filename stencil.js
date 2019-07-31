import React, { Component } from "react";
import { useWeb3Context } from "../../../web3Context.js";


class ComponentName extends Component {
  constructor(props) {
    super(props);
    let web3 = this.context.web3
    let account = this.context.account
    let pool = this.context.pool
  }

  render() {
    return(
      <div>
        <Timer />
        <DrawingInfo />
      </div>
    )
  }
}

ComponentName.contextType = useWeb3Context()

export default ComponentName;