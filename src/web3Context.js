/*
Global web3 object to avoid passing around state.

Would prefer to do this using contexts, but not worth it given time constraints
*/
import React, { Component } from "react";
import Web3 from 'web3';
import { POOL_ADDRESS, POOL_ABI } from './config.js';
import { ENV } from "./config.js"
import Backend from "./backend.js"

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
    if (ENV === "devNoChain") {
      /*
      if (window.ethereum) { // for modern DApps browser
        window.web3 = new Web3(ethereum);
        try {
          await ethereum.enable();
        } catch (error) {
          console.error(error);
        }
      } else if (web3) { // for old DApps browser
        window.web3 = new Web3(web3.currentProvider);
      } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
      */
      web3 = new Web3("http://localhost:8545")
      
      
    } else {
      web3 = new Web3(new Web3.providers.HttpProvider(
        'ropsten.infura.io/v3/cb06dad7697b45b3999d15a8745be75c'
      ));
    }
    console.log("My thing")
    console.log(web3)
    // TODO: populate config.js with the address and ABI
    // the pool that we are interfacing with
    pool = new web3.eth.Contract(POOL_ABI, POOL_ADDRESS)
    console.log("pool")
    console.log(pool)
    accounts = await web3.eth.getAccounts()
  }
  
  componentWillMount() {
    // prep local storage
  }

  async componentDidMount() {
    await this.fetchData();
    this.setState({ web3: web3, account: accounts[0], pool: pool })
    if (ENV === "devWithChain") {
      Backend.setLocal(accounts[0], 
        {
          "bees": [],
          "plantType": ""
        })
    } else if (ENV === "devWithChain") {
      Backend.setLocal(accounts[0],
        {
          "bees": [],
          "plantType": ""
        })
    }
    // dev only
    if (ENV === "devNoChain") {
      let curUser = {bees: [], plantType: "tomato"}
      Backend.setLocal(accounts[0], curUser)
    }

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