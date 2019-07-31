import React, { Component } from "react";
import { Web3Context } from "../../web3Context.js";
import ProfileIcon from "../../svg/profileIcon.js";
import HomeIcon from "../../svg/homeIcon.js";
import SettingsIcon from "../../svg/settingsIcon.js";
import TeamIcon from "../../svg/teamIcon.js";
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom'


class MenuBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentLocation: ""
    }
  }

  render() {
    let menuContainerStyle = {
      display: "flex",
      justifyContent: "center",
      bottom: "0",
      padding: "10px"
    }

    let menuStyle = {
      display: "flex",
      flexDirection: "row",
      width: "90%",
      height: "50px",
      position: "fixed",
      bottom: "0",
      alignItems: "center",
      justifyContent: "space-between",
      zIndex: "999"
    }

    let menuElementStyle = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer"
    }
    
    // let theAddress = this.context.address
    let theAddress = "dummy"

    return (
        <div style={menuContainerStyle}>
          <div className="menu-bar" style={menuStyle}>
            <div className="menu-profile" style={menuElementStyle}>
              <Link to={"/profile/" + theAddress}>
                <ProfileIcon />
            </Link>
            </div>
            <div className="menu-home" style={menuElementStyle}>
              <Link to={"/home"}>
                <HomeIcon />
            </Link>
            </div>
            <div className="menu-team" style={menuElementStyle}>
              <Link to={"/team/" + theAddress} >
                <TeamIcon />
            </Link>
            </div>
            <div className="menu-settings" style={menuElementStyle}>
              <Link to={"/settings/" + theAddress} >
                <SettingsIcon />
            </Link>
            </div>
          </div>
        </div>
    )
  }
}

MenuBar.contextType = Web3Context

export default MenuBar;