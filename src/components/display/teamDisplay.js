import React, { Component } from "react";
import { Web3Context } from "../../web3Context.js";
import Blockchain from "../../blockchain.js"

class TeamDisplay extends Component {
  componentDidMount() {
    this.blockchain = new Blockchain(this.context)
  }

  constructor(props) {
    super(props);
  }

  render() {
    return <div>
      
    </div>
  }
}

TeamDisplay.contextType = Web3Context

export default TeamDisplay;