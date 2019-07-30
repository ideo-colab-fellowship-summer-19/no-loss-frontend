import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom'
import {POOL_ADDRESS, POOL_ABI} from './config.js';
import Web3 from 'web3'
// import { Auth } from "aws-amplify";
import { hotjar } from 'react-hotjar';
import Backend from "./backend.js";
import Home from "./components/pages/home/home.js"
import Onboarding from "./components/pages/onboarding/onboarding.js";
import ProfilePage from "./components/pages/profile/profilePage.js";
import Settings from "./components/pages/settings/settings.js";
import Team from "./components/pages/team/team.js";
import AnimatingSpinnerBigWhite from "./svg/animating-spinner-big-white"


/* Example interaction with contract
this.state.todoList.methods.createTask(content).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
})
*/

class App extends {Component} {
  componentWillMount() {
    this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
    // TODO: populate config.js with the address and ABI
    // the pool that we are interfacing with
    const pool = new web3.eth.Contract(POOL_ABI, POOL_ADDRESS)
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    // We will want to pass web3 and pool to all children using context
    // TODO: Change this to use a context to pass the web3 instance / current account

  }


  constructor(props) {
    super(props);
    this.state = { account: '' }
    // const MyContext = React.createContext(web3);
    // TODO: Change this to use a context to pass the web3 instance / current account
    // TODO: Use cookies to track user stage in our flow / check active addresses
    //        to differentiate old and new users
  }

  
  render() {
    // useful things
    // <Redirect to={{ pathname: "/" }} />
    // {bool ? ifSo : ifNot}
    // takes exact path ="" render={(props => <ThingToRender />)}
    return (
        <Router >
          <ScrollToTop>
              <Switch>
                //TODO:
                <Route exact path="/" render={(props) => <HomePage {...props} />} />
                //TODO:
                <Route exact path="/home" render={(props) => <HomePage {...props} />} />
                //TODO:
                <Route exact path="/team" component={<Team />} /> 
                //TODO:
                <Route path="/team/:id" render={(props) => <Team {...props} />}/>
                //TODO:
                <Route path="/profile/:id" render={(props) => <Profile {...props} />}/>
                //TODO:
                <Route path="/onboarding" render={(props) => <Onboarding {...props} />}/>
                //TODO:
                <Route path="/settings" render={(props) => <Settings {...props} />} />
              </Switch>
          </ScrollToTop>
        </Router>
    );
  }
  
}

export default App;
