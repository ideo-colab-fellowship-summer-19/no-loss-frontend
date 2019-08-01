import React, { Component } from "react";
import { useWeb3Context } from "../../../web3Context.js";
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom'
import AnimatingSpinnerBigWhite from "../../../svg/animating-spinner-big-white"
import LittleRightArrow from "../../../svg/littleRightArrow.js"
import CuteBee from "../../../svg/bee/beeCute.js"
import FatBee from "../../../svg/bee/beeFat.js"
import FootballBee from "../../../svg/bee/beeFootball.js"
import LongBee from "../../../svg/bee/beeLong.js"
import SmallBee from "../../../svg/bee/beeSmall.js"
import Backend from "../../../backend.js"
// import bee names



let web3;
let account;
let pool;

// looks at text names and then loads the corresponding bees from
// local state
const Bees = ({ params }) => {
  let beeList = params.beeList
  let isMinimized = params.isMinimized
  console.log("Da Params")
  console.log(params)
  let toReturn = beeList.map(bee => {
    switch (bee) {
      case "fat":
        return <div className="bee" key={bee}>{
          <FatBee />
        }
        </div>
      case "cute":
        return <div className="bee" key={bee}>{
          <CuteBee />
        }
        </div>
      case "football":
        return <div className="bee" key={bee}>{
          <FootballBee />
        }
        </div>
      case "long":
        return <div className="bee" key={bee}>{
          <LongBee />
        }
        </div>
      case "small":
        return <div className="bee" key={bee}>{
          <SmallBee />
        }
        </div>
    }
  })

  if (isMinimized){
    return toReturn.slice(4)
  } else {
    return toReturn
  }
  };

class TrophyCase extends Component {
  async componentDidMount() {
    web3 = this.context.web3
    account = this.context.account
    pool = this.context.pool
    let bees = await this.getBees()
    console.log("da bees")
    console.log(bees)
    this.setState({hasLoaded: true, bees: bees })
  }

  constructor(props) {
    super(props);
    this.state = {isMinimized: true, numTrophies: this.props.numTrophies, hasLoaded: false}
  }

  async getBees() {
    console.log("the account")
    console.log(account)
    let theBees = await Backend.getBees(account)
    console.log("running")
    console.log(theBees)
    return theBees
  }

  changeVisibility() {
    let visibility = this.state.isMinimized
    this.setState({isMinimized: !visibility})
  }

  render() {
    let toRender;

    let minimizedStyle = {
      display: "flex",
      flexDirection: "row",
      justifyContent: "left",
      paddingLeft: "10px"
    }

    let expandedStyle = {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      position: "absolute",
      width: "375px",
      height: "637px",
      top: "134px",
      background: "#FFFFFF",
      boxShadow: "0px -1px 4px rgba(0, 0, 0, 0.15)",
      borderTopLeftRadius: "30px",
      borderTopRightRadius: "30px",
      overflow: "scroll"
    }


    if (this.state.hasLoaded) {
      if (this.state.isMinimized) {
        console.log(this.state.bees)
        // minimized one line
        toRender =
          <div style={minimizedStyle} onClick={this.changeVisibility}>
            <Bees params={{ beeList: this.state.bees, isMinimized: this.state.isMinimized }} 
              style={{display: "flex", flexDirection: "column", justifyContent: "left", 
              paddingLeft: "5px", paddingRight: "5px"}}/>
            <LittleRightArrow style={{justifySelf: "right", marginLeft: "5px"}}/>
          </div>
      } else {
        // full screen
        toRender = 
          <div style={expandedStyle} onClick={this.changeVisibility}>
          <Bees params={{ beeList: this.state.bees, isMinimized: this.state.isMinimized }} />
        </div>
      }
    } else {
      toRender = <AnimatingSpinnerBigWhite/>
    }

    return (
      <div>
        {toRender}
      </div>
    )
  }
}

TrophyCase.contextType = useWeb3Context()

export default TrophyCase;