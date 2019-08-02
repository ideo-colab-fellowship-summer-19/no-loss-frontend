import PoolContractInfo from "./poolContractInfo.js"

export const POOL_ADDRESS = '0x6e14e8534f48f15b8f2518a07fa60e90b887a538'
// mainnet
let MAINNET_ADDRESS = "0xE2f6BBebbd642297469541395bE08ADf6fE7cC99"
// TODO: Find where to get the ABI

export const ENV = "devNoChain"
// export const ENV = "devWithChain"

let DEV_API = "http://0.0.0.0"

export const ENV_API = DEV_API

export const POOL_ABI = PoolContractInfo.abi

export const COUNTER_END_DATE = 'Fri, 02 Aug 2019 17:00:00'