import React, { Component } from "react";
import { Web3Context } from "../../web3Context.js";
import ProfileIcon from "../../svg/profileIcon.js";
import HomeIcon from "../../svg/homeIcon.js";
import SettingsIcon from "../../svg/settingsIcon.js";
import TeamIcon from "../../svg/teamIcon.js";
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom'
import TeamIconDark from "../../svg/teamIconDark.js";
import HomeIconDark from "../../svg/homeIconDark.js";
import ProfileIconDark from "../../svg/profileIconDark.js";
import SettingsIconDark from "../../svg/settingsIconDark.js";

class MenuBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentLocation: "home", isOnboarding: "true"
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

    let profileIcon = <ProfileIcon />
    let homeIcon = <HomeIcon />
    let teamIcon = <TeamIcon />
    let settingsIcon = <SettingsIcon />

    if (this.state.location == "home") {
      homeIcon = <HomeIconDark />
    } else if (this.state.location === "team") {
      teamIcon = <TeamIconDark />
    } else if (this.state.location === "profile") {
      profileIcon = <ProfileIconDark />
    } else if (this.state.location === "settings") {
      settingsIcon = <SettingsIconDark />
    }

    return (
        <div style={menuContainerStyle}>
          <div className="menu-bar" style={menuStyle}>
            <div className="menu-profile" style={menuElementStyle}>
              <Link to={"/profile/" + theAddress} onClick={() => this.setState({location: "profile", isOnboarding: false})}>
                {profileIcon}
              </Link>
            </div>
            <div className="menu-home" style={menuElementStyle} onClick={() => this.setState({location: "home", isOnboarding: false})}>
              <Link to={"/home"}>
                {homeIcon}
            </Link>
            </div>
            <div className="menu-team" style={menuElementStyle} onClick={() => this.setState({location: "team", isOnboarding: false})}>
              <Link to={"/team/" + theAddress} >
                {teamIcon}
            </Link>
            </div>
            <div className="menu-settings" style={menuElementStyle} onClick={() => this.setState({location: "settings", isOnboarding: false})}>
              <Link to={"/settings/" + theAddress} >
                {settingsIcon}
            </Link>
            </div>
          </div>
        </div>
    )
  }
}

MenuBar.contextType = Web3Context

export default MenuBar;