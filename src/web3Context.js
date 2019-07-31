/*
Global web3 object to avoid passing around state.

Would prefer to do this using contexts, but not worth it given time constraints
*/
import React, { Component } from "react";
import Web3 from 'web3';
import { POOL_ADDRESS, POOL_ABI } from './config.js';

console.log(Web3)

let web3;
// TODO: populate config.js with the address and ABI
// the pool that we are interfacing with
let pool;
let accounts;

const Web3Context = React.createContext()

class GlobalContext extends Component {
  constructor(props) {
    super(props);
  }

  async fetchData() {
    // web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
    console.log(Web3.currentProvider)
    // TODO: Modify to work with metamask
    // web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
    web3 = new Web3("http://localhost:8545")
    console.log("My thing")
    console.log(web3)
    // TODO: populate config.js with the address and ABI
    // the pool that we are interfacing with
    pool = new web3.eth.Contract(POOL_ABI, POOL_ADDRESS)
    console.log("pool")
    console.log(pool)
    accounts = await web3.eth.getAccounts()
  }

  async componentDidMount() {
    await this.fetchData();
    this.setState({ web3: web3, account: accounts[0], pool: pool })
    this.props.web3Loaded()
  }

  render() {
    
    return(
      <Web3Context.Provider value={this.state}>
        {this.props.children}
      </Web3Context.Provider>
    )
  }
}

function useWeb3Context() {
  const context = Web3Context
  if (context == undefined) {
    throw("Problem with the context")
  }
  
  return context
}

export {GlobalContext, Web3Context, useWeb3Context}