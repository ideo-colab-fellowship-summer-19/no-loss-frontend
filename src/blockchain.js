import { ENV } from "./config.js"

/* 
Example interactions with contract 

(modifies state)
pool.methods.createTask(content).send({ from: account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
})

(gets state)
pool.methods.createTask(content)
  .call(
  { from: account }, 
  (err, resp) => return resp
  )
})
*/

if (ENV == "devWithChain") {
  var Blockchain = class {
    constructor(context) {
      this.context = context
      this.pool = context.pool
      this.account = context.account
      this.web3 = context.web3

      this.getPoolData = this.getPoolData.bind(this);
      this.getUserData = this.getUserData.bind(this);
      this.getSeedCount = this.getSeedCount.bind(this);
      this.getSeedCountSync = this.getSeedCount.bind(this);
    }

    async getPoolData() {
      this.pool.methods.getInfo().call({ from: this.account },
        (err, result) => {
          if (err) {
            console.log(err)
            return
          } else {
            return result
          }
        })
    }

    async getUserData() {
      this.pool.methods.getUserInfo(this.account).call({ from: this.account },
        (err, result) => {
          if (err) {
            console.log(err)
          } else {
            return result
          }
        })
    }

    async getUserById() {

    }

    async getSeedCount() {
      this.getPoolData.then((result) => {
        let totalPrinciple = parseFloat(result.entryTotal)
        let ticketCost = parseFloat(result.ticketCost)
        return totalPrinciple / ticketCost
      })
    }

    getSeedCountSync(poolData) {
      if (poolData.entryTotal === undefined) {
        throw ("The pool hasn't loaded yet")
      }

      let totalPrinciple = parseFloat(poolData.entryTotal)
      let ticketCost = parseFloat(poolData.ticketCost)
      return totalPrinciple / ticketCost
    }
  }
} else if (ENV == "devNoChain") {
  var Blockchain = class {

    constructor(context) {
      this.context = context
      this.pool = context.pool
      this.account = context.account
      this.web3 = context.web3
    }

    async getUserDataById(userId) {
      return {
        addr: this.context.account + "?",
        username: "the dude",
        totalAmount: 30,
        totalTickets: 3,
        activeAmount: 20,
        activeTickets: 2,
        pendingAmount: 10,
        pendingTickets: 1,
        totalWinnings: 0,
        groupId: 0
      }
    }

    async getPoolData() {
      return {
        entryTotal: 100,
        winner: 0,
        supplyBalanceTotal: 1000,
        ticketCost: 10,
        participantCount: 100,
        maxPoolSize: 100000,
        estimatedInterestFixedPoint18: 50,
        hashOfSecret: 0
      }
    }

    async getUserData() {
      return {
        addr: this.context.account,
        username: "the dude",
        totalAmount: 30,
        totalTickets: 3,
        activeAmount: 20,
        activeTickets: 2,
        pendingAmount: 10,
        pendingTickets: 1,
        totalWinnings: 0,
        groupId: 0
      }
    }

    async getGroupData(groupId) {
      // getGroup(uint groupId)
      console.log("web3")
      console.log(this.web3)
      let accounts = await this.web3.eth.getAccounts()
      return {
        members: [accounts[0], accounts[1]],
        allowedEntrants: []
      }
    }

    async getSeedCount() {
      return 3
    }

    getSeedCountSync(poolData) {
      return 3
    }

    async getPrizeAmount() {
      return {
        estimatedPrize: 200
      }
    }
  }
}

export default Blockchain