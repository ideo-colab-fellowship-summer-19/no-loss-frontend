import PoolContractInfo from "./poolContractInfo.js"

export const POOL_ADDRESS = '0x6e14e8534f48f15b8f2518a07fa60e90b887a538'

// TODO: Find where to get the ABI

export const ENV = "devNoChain"
// export const ENV = "devWithChain"

let DEV_API = "http://0.0.0.0"

export const ENV_API = DEV_API

export const POOL_ABI = PoolContractInfo.abi