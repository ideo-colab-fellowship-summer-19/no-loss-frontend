import React, { Component } from "react";
import { Web3Context } from "../../../web3Context.js";
import Blockchain from "../../blockchain.js"

class TeamDisplay extends Component {
  constructor(props) {
    super(props);
    this.blockchain = new Blockchain(this.context)
  }

  render() {
    <div>
      
    </div>
  }
}

TeamDisplay.contextType = Web3Context

export default TeamDisplay;