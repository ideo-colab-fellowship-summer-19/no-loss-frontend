import PoolContractInfo from "./poolContractInfo.js"

export const POOL_ADDRESS = '0xf78b75cf3782535a0dd30e5491efce6d888eafaf'

// TODO: Find where to get the ABI

export const ENV = "devNoChain"
// export const ENV = "devWithChain"

let DEV_API = "http://0.0.0.0"

export const ENV_API = DEV_API

export const POOL_ABI = PoolContractInfo.abi