import React, { Component } from "react";
import { useWeb3Context } from "../../../web3Context.js";
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom'
import AnimatingSpinnerBigWhite from "./svg/animating-spinner-big-white"

// import bee names



let web3;
let account;
let pool;

// looks at text names and then loads the corresponding bees from
// local state
const Bees = ({ beeList }) => (
  <>
    {beeList.map(element => (
      <div className="aBee" key={element.call}>{station.call}</div>
    ))}
  </>
);

class TrophyCase extends Component {
  componentDidMount() {
    web3 = this.context.web3
    account = this.context.account
    pool = this.context.pool
    this.setState({hasLoaded: true})
  }

  constructor(props) {
    super(props);
    this.state = {isMinimized: true, numTrophies: this.props.numTrophies, hasLoaded: false}
  }

  render() {
    let toRender;

    if (this.state.hasLoaded) {
      if (isMinimized) {
        // minimized one line
        toRender =
          <div>
            Backend.getTrophies(account)
          </div>
      } else {
        // full screen
        toRender = 
        <div>
          Backend.getTrophies(account)
        </div>
      }
    } else {
      toRender = <AnimatingSpinnerBigWhite/>
    }

    return (
      <div>

      </div>
    )
  }
}

TrophyCase.contextType = useWeb3Context()

export default TrophyCase;