import React, { Component } from 'react';
import './App.css';
import './fonts.css'
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom'
import {POOL_ADDRESS, POOL_ABI} from './config.js';
import Web3 from 'web3'
import {GlobalContext} from './web3Context.js';
import ScrollToTop from './components/nav/scrollToTop.js';
// import { Auth } from "aws-amplify";
import Backend from "./backend.js";
import Home from "./components/pages/home/home.js"
import Onboarding from "./components/pages/onboarding/onboarding.js";
import ProfilePage from "./components/pages/profile/profilePage.js";
import Settings from "./components/pages/settings/settings.js";
import Team from "./components/pages/team/team.js";
import MenuBar from "./components/nav/menuBar.js";
import AnimatingSpinnerBigWhite from "./svg/animating-spinner-big-white"
import { ENV } from "./config.js"


/* React Router Tip:

You can get access to the history object’s properties and the closest <Route>'s 
match via the withRouter higher-order component. withRouter will pass updated 
match, location, and history props to the wrapped component whenever it renders.

To do so, at the bottom of your component write
"export default withRouter(ComponentName)"
*/

class App extends Component {

  constructor(props) {
    super(props);
    // const MyContext = React.createContext(web3);
    // TODO: Change this to use a context to pass the web3 instance / current account
    // TODO: Use cookies to track user stage in our flow / check active addresses
    //        to differentiate old and new users
    this.state = {
      web3Loaded: false
    }
    this.web3Loaded = this.web3Loaded.bind(this)
  }

  componentDidMount() {
    
  }

  web3Loaded() {
    this.setState({web3Loaded: true})
  }

  
  render() {
    // useful things
    // <Redirect to={{ pathname: "/" }} />
    // {bool ? ifSo : ifNot}
    // takes exact path ="" render={(props => <ThingToRender />)}
    let web3Context = {web3: "web3dummy", address: "addressDummy", pool: "poolDummy"}
    return (
      <Router>
        <GlobalContext web3Loaded={this.web3Loaded}>
          {this.state.web3Loaded ?
              <ScrollToTop>
                <Switch>
                  <Route exact path="/" render={(props) => <Onboarding {...props} />} />
                  <Route path="/home" render={(props) => <Home {...props} />} />
                  <Route exact path="/team" render={(props) => <Team {...props} />} />
                  <Route path="/team/:id" render={(props) => <Team {...props} />} />
                  <Route path="/profile/:id" render={(props) => <ProfilePage {...props} />} />
                  <Route path="/onboarding" render={(props) => <Onboarding {...props} />} />
                  <Route path="/settings" render={(props) => <Settings {...props} />} />
                </Switch>
                <MenuBar />
              </ScrollToTop>
            :
            <AnimatingSpinnerBigWhite />
          }
        </GlobalContext>
      </Router>
    );
  }  
}

export default App;
