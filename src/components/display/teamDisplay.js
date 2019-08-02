import React, { Component } from "react";
import { useWeb3Context } from "../../web3Context.js";
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom'
import AnimatingSpinnerBigWhite from "../../svg/animating-spinner-big-white"
import LittleRightArrow from "../../svg/littleRightArrow.js"
import GrowingSeedDisplay from "../display/growingSeedDisplay.js"
import Backend from "../../backend.js"
import Blockchain from "../../blockchain.js"
// import bee names



let web3;
let account;
let pool;

// looks at text names and then loads the corresponding bees from
// local state
const Teammates = ({ params }) => {
  let memberList = params.memberList
  let isMinimized = params.isMinimized
  console.log("Da Params")
  console.log(params)
  let individualStyle = { paddingLeft: "30px" }
  const toReturn = memberList.map(member => {
    return <GrowingSeedDisplay isBig={false} user={member}/>
  })
  let memberStyle = { display: "flex", flexDirection: "row", alignItems: "center" }

  if (isMinimized) {
    return <div style={memberStyle}> {toReturn.slice(0, 4)} </div>
  } else {
    return <div style={memberStyle}> {toReturn} </div>
  }
};

let blockchain;

class TrophyCase extends Component {
  async componentDidMount() {
    web3 = this.context.web3
    account = this.context.account
    pool = this.context.pool
    blockchain = new Blockchain(this.context)
    let user = await blockchain.getUserDataById(this.props.user)
    let group = await blockchain.getGroupData(user.groupId)
    let members = group.members.filter(member => member != this.context.account)
    console.log("the members")
    console.log(members)
    this.setState({ hasLoaded: true, members: members })
  }

  constructor(props) {
    super(props);
    this.state = { isMinimized: true, numTrophies: this.props.numTrophies, hasLoaded: false }
    this.changeVisibility = this.changeVisibility.bind(this)
  }

  changeVisibility() {
    let visibility = this.state.isMinimized
    this.setState({ isMinimized: !visibility })
  }

  render() {
    let toRender;

    let minimizedStyle = {
      display: "flex",
      flexDirection: "row",
      justifyContent: "left",
      alignItems: "center",
      background: "#F1F1F1",
      paddingLeft: "10px",
      width: "325px",
      height: "113.5px",
      borderTopLeftRadius: "30px",
      borderTopRightRadius: "30px",
      boxShadow: "0px -1px 4px rgba(0, 0, 0, 0.15)",
    }

    let expandedStyle = {
      position: "absolute",
      paddingTop: "20px",
      paddingBottom: "20px",
      width: "375px",
      height: "637px",
      top: "134px",
      background: "#FFFFFF",
      boxShadow: "0px -1px 4px rgba(0, 0, 0, 0.15)",
      borderTopLeftRadius: "30px",
      borderTopRightRadius: "30px",
      overflow: "scroll"
    }

    /*
    if (this.state.hasLoaded) {
      if (this.state.isMinimized) {
        // minimized one line
        toRender =
          <div style={{ display: "flex", justifyContent: "center" }} >
            <div style={minimizedStyle} onClick={this.changeVisibility}>
              <Teammates params={{ memberList: this.state.members, isMinimized: this.state.isMinimized }}
                style={{
                  display: "flex", flexDirection: "column", justifyContent: "left",
                  paddingLeft: "5px", paddingRight: "5px"
                }} />
              <LittleRightArrow style={{ marginLeft: "auto", marginRight: "12px" }} />
            </div>
          </div>

      } else {
        // full screen
        toRender =
          <div style={expandedStyle} onClick={this.changeVisibility}>
            <Teammates params={{ memberList: this.state.members, isMinimized: this.state.isMinimized }}
              style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }} />
          </div>
      }
    } else {
      toRender = <AnimatingSpinnerBigWhite />
    }
    */
   toRender = "The ability to see your teammate's avatars is coming soon!"

    return (
      <div style={{fontFamily: "SpaceMonoReg", paddingLeft: "10px", paddingRight: "10px",
      display: "flex", justifyContent: "center", fontSize: "12px"}}>
        {toRender}
      </div>
    )
  }
}

TrophyCase.contextType = useWeb3Context()

export default TrophyCase;