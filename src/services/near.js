import { keyStores, Near, Contract, WalletConnection } from "near-api-js";
import BN from "bn.js";

export const CONTRACT_ID = process.env.VUE_APP_CONTRACT_ID;
const gas = new BN(process.env.VUE_APP_gas);

// connecting to NEAR, new NEAR is being used here to awoid async/await
export const near = new Near({
  networkId: process.env.VUE_APP_networkId,
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: process.env.VUE_APP_nodeUrl,
  walletUrl: process.env.VUE_APP_walletUrl,
});

//create wallet connection
export const wallet = new WalletConnection(near, "NCD.L2.sample--art-demo");

function getContract() {
  return new Contract(
    wallet.account(), // the account object that is connecting
    CONTRACT_ID, // name of contract you're connecting to
    {
      viewMethods: ['getTempDesign', 'viewMyDesign'], // view methods do not change state but usually return a value
      changeMethods: ['design', 'claimMyDesign', 'burnMyDesign'] // change methods modify state
    }
  )
}

const contract = getContract()

// --------------------------------------------------------------------------
// functions to call sample--art--demo contract VIEW methods
// --------------------------------------------------------------------------

//function to get user last generated design
export const getTempDesign = async (accountId) => {
  return await contract.getTempDesign({ accountId: accountId })
}

//function to get user claimed design
export const getMyClaimedDesign = async (accountId) => {
  return await contract.viewMyDesign({ accountId: accountId })
}

// --------------------------------------------------------------------------
// functions to call sample--art--demo contract CHANGE methods
// --------------------------------------------------------------------------

//function to generate new design
export const generateDesign = async () => {
  await contract.design(
    {},
    gas
  )
}

//function to claim generated design and save it as yours design
export const claimDesign = async (seed) => {
  return await contract.claimMyDesign(
    { seed: seed },
    gas
  )
}

//function to burn your claimed design
export const burnDesign = async () => {
  return await contract.burnMyDesign(
    {},
    gas
  )
}
