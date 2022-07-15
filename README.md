#  🎓 NCD.L2.sample--art-demo dapp
This branch contains a complete frontend React application to work with 
<a href="https://github.com/Learn-NEAR/NCD.L1.sample--art-demo" target="_blank">NCD.L1.sample--art-demo smart contract</a> targeting the NEAR platform

The goal of this repository is to make it as easy as possible to get started writing frontend with React for AssemblyScript contracts built to work with NEAR Protocol.

## ⚠️ Warning
Any content produced by NEAR, or developer resources that NEAR provides, are for educational and inspiration purposes only. NEAR does not encourage, induce or sanction the deployment of any such applications in violation of applicable laws or regulations.

![image](https://user-images.githubusercontent.com/48129985/173148121-89507d33-04a3-4f61-9fbe-725f13d1eadb.png)

## ⚡  Usage
Home page view

![image](https://user-images.githubusercontent.com/38455192/179172719-df9e219c-60a4-47ba-ac21-07cf0fef5ca7.png)

Dashboard page view

![image](https://user-images.githubusercontent.com/38455192/179176179-e659236e-202f-45ea-a2e0-f8faaad333ec.png)

UI walkthrough
<a href="https://www.loom.com/share/8d5e5809a08543b3a97bc0f6e06b3451" target="_blank">![image](https://user-images.githubusercontent.com/38455192/179176766-5cf48183-a159-45fa-8d0d-17fa62e2d07b.png)
</a>


You can use this app with contract ids which were deployed by the creators of this repo or you can use it with your own deployed contract ids.

To deploy sample--art-demo to your account visit <a href="https://github.com/OlexandrSai/NCD.L1.sample--art-demo" target="_blank">this repo (smart contract deployment instructions are inside):</a> 

Also you can watch this video : 

<a href="https://www.loom.com/share/fe4ee8caf908418e88f22dce55145969" target="_blank">![image](https://user-images.githubusercontent.com/38455192/179179390-b419927c-fbf2-4cf0-b727-7e8406e9a5fc.png)</a>

After you successfully deployed smart contracts and you have contract id, you can input them on a deployed <a href="https://art-demo-react.onrender.com/" target="_blank">website </a> or you can clone the repo and put contract ids inside .env file :

```
REACT_APP_CONTRACT_ID = "put your smart-contract id here"
REACT_APP_MAIN_URL=http://localhost:3000
```

After you input your values inside .env file, you need to :
1. Install all dependencies 
```
yarn
```
2. Run the project locally
```
yarn start
```
Other commands:

Compiles and minifies for production
```
yarn build
```
Lints and fixes files
```
yarn lint
```

## 👀 Code walkthrough for Near university students

Code walkthrough video
<a href="https://www.loom.com/share/24f8aad9c9ff4d35aca7ab38c5c9f9e8" target="_blank">![image](https://user-images.githubusercontent.com/38455192/179191984-489f6cdf-a34d-4d24-b357-0fa57a57a2f9.png)
</a>

We are using ```near-api-js``` to work with NEAR blockchain. In ``` /services/near.js ``` we are importing classes, functions and configs which we are going to use:
```
import { keyStores, Near, Contract, WalletConnection, utils } from "near-api-js";
```
Then we are connecting to NEAR:
```
// create config for connecting to NEAR
const near = new Near({
    networkId: process.env.VUE_APP_networkId,
    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
    nodeUrl: process.env.VUE_APP_nodeUrl,
    walletUrl: process.env.VUE_APP_walletUrl,
});
``` 
and creating wallet connection
```
const getContractID = () => localStorage.getItem('CONTRACT_ID');
const wallet = () => new WalletConnection(near, getContractID()));
```
After this by using API we can use ```wallet``` and call ```signIn()``` and ```signOut()``` functions of wallet object. By doing this, login functionality can now be used in any component. 

And also we in return statement we are returning wallet object, we are doing this to call ``` wallet.getAccountId()``` to show accountId in ``` /components/Dashboard.jsx ```

```wallet``` code :
```
export const signIn = (successUrl) => {
  return wallet().requestSignIn({ contractId: getContractID(), successUrl });
};

export const signOut = () => {
  return wallet().signOut(getContractID());
};
```

To work with smart contract we are loading the contract inside  ``` /services/near.js:```
```
export const contract = () =>
  new Contract(wallet().account(), getContractID(), {
    viewMethods: [''],
    changeMethods: ['design', 'claimMyDesign', 'burnMyDesign'],
    sender: wallet().account(),
  });
```

and we are creating function to export for each contract function

example of a call with no params: 
```
//function to burn claimed design
export const burnDesign = () => contract().burnMyDesign();
```

example of call with params 
```
//function to generate new design
export const generateDesign = (accountId) => {
  return contract().design({
    gas,
    args: { accountId },
  });
};
```

Then in ```store/index.jsx``` we are just state all global data and functions from ```services/near.js```:
For example in Dashboard component
```
import { useStore } from '../../store';

export const Dashboard = () => {
  const { accountId, setAccountId, setApiError } = useStore();
```

and using it to store some state of contracts and to call contracts functions: 
```
import React, { createContext, useContext, useState, useEffect } from 'react';
import { wallet } from '../services/near';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const defaultContractId = process.env.REACT_APP_CONTRACT_ID;
  const contractId = localStorage.getItem('CONTRACT_ID');
  !contractId && localStorage.setItem('CONTRACT_ID', defaultContractId);

  const [contractData, setContractData] = useState(contractId ?? defaultContractId);
  const [accountId, setAccountId] = useState(wallet().getAccountId());
  const [apiError, setApiError] = useState();

  const setContractId = (contractId) => {
    localStorage.setItem('CONTRACT_ID', contractId);
    setContractData(contractId);
  };

  useEffect(() => {
    const userData = wallet().getAccountId();
    setAccountId(userData);
  }, [contractId]);

  const store = { contractId: contractData, setContractId, accountId, setAccountId, apiError, setApiError };

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

export const useStore = () => useContext(StoreContext);
```

Inside ```/src/components/Dashboard.jsx``` we have lifecycle hook ``` useEffect() ``` where we are getting all the data from the smart contract
```
const getData = useCallback(async () => {
  try {
    setIsLoading(true);
    const tempDesign = await getTempDesign(accountId);
    setGeneratedDesign(tempDesign);
    setInputSeed(tempDesign?.seed);
    if (!tempDesign) {
      await handleGenerateDesign(accountId);
    }
    setMyDesign(await getViewMyDesign(accountId));
    setIsLoading(false);
  } catch (error) {
    setApiError(error);
    setIsLoading(false);
    addToast(error.message, {
      appearance: 'error',
      autoDismiss: true,
      autoDismissTimeout: 30000,
    });
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [accountId]);

useEffect(() => {
  getData();
}, [getData]);
```

And inside components we are using API request from ```services/near.js``` as an example :
```
const handleGenerateDesign = async () => {
  setIsLoading(true);
  try {
    await generateDesign(accountId);
    const tempDesign = await getTempDesign(accountId);
    setGeneratedDesign(tempDesign);
    setInputSeed(tempDesign.seed);
  } catch (error) {
    addToast(error.message, {
      appearance: 'error',
      autoDismiss: true,
      autoDismissTimeout: 30000,
    });
  }
  setIsLoading(false);
};
```
