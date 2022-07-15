#  🎓 NCD.L2.sample--art-demo dapp
This repository contains a complete frontend applications (Vue.js, React, Angular) to work with 
<a href="https://github.com/Learn-NEAR/NCD.L1.sample--art-demo" target="_blank">NCD.L1.sample--art-demo smart contract</a> targeting the NEAR platform:
1. Vue.Js (main branch)
2. React (react branch)
3. Angular (angular branch)

The goal of this repository is to make it as easy as possible to get started writing frontend with Vue.js, React and Angular for AssemblyScript contracts built to work with NEAR Protocol.


## ⚠️ Warning
Any content produced by NEAR, or developer resources that NEAR provides, are for educational and inspiration purposes only. NEAR does not encourage, induce or sanction the deployment of any such applications in violation of applicable laws or regulations.


## ⚡  Usage
Right now I sent PR to NCD.L1.sample--art-demo with version of contract which will work with this frontend: 
<a href="https://github.com/OlexandrSai/NCD.L1.sample--art-demo" target="_blank">code</a>, after review this line will be removed from README file

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
VUE_APP_CONTRACT_ID = "put your contract id here"
...
```

After you input your values inside .env file, you need to :
1. Install all dependencies 
```
npm install
```
or
```
yarn
```
2. Run the project locally
```
npm run serve
```
or 
```
yarn serve
```

Other commands:

Compiles and minifies for production
```
npm run build
```
or
```
yarn build
```
Lints and fixes files
```
npm run lint
```
or
```
yarn lint
```

## 👀 Code walkthrough for Near university students
Code walkthrough video
<a href="https://www.loom.com/share/39f25b9c20404e3aadb3ca465477ee31" target="_blank">![image](https://user-images.githubusercontent.com/38455192/179183418-2411ca1b-e88b-4223-b18c-d004fe1f0cfd.png)</a>

Project is using ```near-api-js``` to work with NEAR blockchain. In ``` /services/near.js ``` key classes, functions and configs are imported, they will be used to work with NEAR
```
import { keyStores, Near, Contract, WalletConnection, utils } from "near-api-js";
```
Then connecting to NEAR:
```
// connecting to NEAR
export const near = new Near({
    networkId: process.env.VUE_APP_networkId,
    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
    nodeUrl: process.env.VUE_APP_nodeUrl,
    walletUrl: process.env.VUE_APP_walletUrl,
});

``` 
and creating wallet connection
```
export const wallet = new WalletConnection(near, "NCD.L2.sample--art-demo");
```
After this by using Composition API you will need to create ```useAuth()``` function and use inside ```signIn()``` and ```signOut()``` functions of wallet object. By doing this, login functionality can then be used in any component of the app. Also because this app has more then 1 view, it is added ``` watchEffect() ``` to ``` useAuth() ```, it is redirecting pushing user to ``` /dashboard ``` if ``` accountId ``` is not null (basically, if user is logged in) :
```
watchEffect(() => {
        if (accountId.value) {
            router.push('/dashboard')
        }

        if (!accountId.value) {
            router.push('/')
        }
    })
```

And also return statement is returning wallet object, this is done to call ``` wallet.getAccountId()``` to show accountId in ``` /components/Card.vue ```

``` useAuth()``` code :
```
import { watchEffect,ref } from "vue";
import { useRouter } from 'vue-router';
import { wallet, CONTRACT_ID, } from "@/services/near";

const accountId = ref(wallet.getAccountId())

export const useAuth = () => {
    const router = useRouter()

    const handleSignIn = () => {
        // redirects user to wallet to authorize your dApp
        // this creates an access key that will be stored in the browser's local storage
        // access key can then be used to connect to NEAR and sign transactions via keyStore
        wallet.requestSignIn({
            contractId: CONTRACT_ID,
            methodNames: [] // add methods names to restrict access
        })
    }

    const handleSignOut = () => {
        wallet.signOut()
        accountId.value = wallet.getAccountId()
    }

    watchEffect(() => {
        if (accountId.value) {
            router.push('/dashboard')
        }

        if (!accountId.value) {
            router.push('/')
        }
    })

    return {
        wallet,
        accountId,
        signIn: handleSignIn,
        signOut: handleSignOut
    };
}
```

To work with sample--art-demo contract separate ```useArtDemo()``` function is created with Composition API to split the logic. Contract is loaded inside  ``` /services/near.js:```
```
export const CONTRACT_ID = process.env.VUE_APP_CONTRACT_ID;
const gas = new BN(process.env.VUE_APP_gas);

// connecting to NEAR
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
```

and export function is created for each contract method

example of a call with no params: 
```
//function to get all messages from thanks contract
export const getMessages = async () => {
    return await thanksContract.list()
}
```

example of call with params (VIEW Method)
```
//function to get user claimed design
export const getMyClaimedDesign = async (accountId) => {
  return await contract.viewMyDesign({ accountId: accountId })
}

```

example of call with params (CHANGE Method)
```
//function to claim generated design and save it as yours design
export const claimDesign = async (seed) => {
  return await contract.claimMyDesign(
    { seed: seed },
    gas
  )
}

```

Then in ```composables/near.js``` all logic from ```services/near.js``` is imported: 
```
import {
    wallet,
    getTempDesign,
    getMyClaimedDesign,
    generateDesign,
    claimDesign,
    burnDesign,
} from "@/services/near";
```

and it is used to store some state of contract and to call contracts methods from services layer: 
```
const generatedDesign = ref(null)
const myDesign = ref(null)
const isLoading = ref(false)
const err = ref(null)

export const useArtDemo = () => {

    const handleGetTempDesign = async (accountId) => {
        return await getTempDesign(accountId)
    }

    const handleGetMyClaimedDesign = async (accountId) => {
        return await getMyClaimedDesign(accountId)
    }

    const handleGenerateDesign = async (accountId) => {
        await generateDesign()
        generatedDesign.value = await getTempDesign(accountId)
    }

    const handleClaimDesign = async (seed) => {
        await claimDesign(seed).then(res => console.log(res), res => console.log(res))
        myDesign.value = await getMyClaimedDesign(wallet.getAccountId())
    }

    const handleBurnDesign = async () => {
        await burnDesign()
        myDesign.value = null
    }

    return {
        isLoading,
        generatedDesign,
        myDesign,
        err,
        getTempDesign:handleGetTempDesign,
        getMyClaimedDesign: handleGetMyClaimedDesign,
        generateDesign: handleGenerateDesign,
        claimDesign: handleClaimDesign,
        burnDesign: handleBurnDesign
    }
}
```

Inside ``` views/Home.vue ``` only ``` signIn() ``` function is imported and passed as props to child component. No additional logic of smart contract is used on Home page:
```
export default {
    components: { Card, HomeFooter },
    setup() {
        const { signIn } = useAuth();
        return {
            signIn
        };
    }
}
...
//passing as a prop to child component
<Card :signIn="signIn"/>
```

Inside ```/views/Dashboard.vue``` lifecycle hook ``` onBeforeMount() ``` is used, inside hook all the data is received from the smart contract with ``` useArtDemo()```  function
```
setup() {
      setup() {
        const { accountId, signOut } = useAuth();
        const { generatedDesign, myDesign, getTempDesign, getMyClaimedDesign, generateDesign, claimDesign, burnDesign, isLoading } = useArtDemo();
        const toast = useToast()

        onBeforeMount(async () => {
            isLoading.value = true
            generatedDesign.value = await getTempDesign(accountId.value)
            if (generatedDesign.value === null) {
                await generateDesign(accountId.value)
            }
            myDesign.value = await getMyClaimedDesign(accountId.value)
            isLoading.value = false
        })

        async function handleGenerateDesign() {
            try {
                isLoading.value = true
                await generateDesign(accountId.value)
            } catch (error) {
                toast.error("Error while generating new design")
            }
            isLoading.value = false
        }

        async function handleClaimDesign() {
            if (myDesign.value) {
                toast.error("You can have only 1 design claimed. First burn you already claimed design, to be able to claim new one")
            } else {
                try {
                    isLoading.value = true
                    await claimDesign(generatedDesign.value.seed)
                } catch (error) {
                    const errorMessage = error?.kind?.ExecutionError
                    toast.error(errorMessage.slice(0, errorMessage.match(', filename').index))
                }
            }
            isLoading.value = false
        }

        async function handleBurnDesign() {
            try {
                isLoading.value = true
                await burnDesign()
            } catch (error) {
                const errorMessage = error?.kind?.ExecutionError
                toast.error(errorMessage.slice(0, errorMessage.match(', filename').index))
            }
            isLoading.value = false
        }

        return {
            accountId,
            signOut,
            handleGenerateDesign,
            myDesign,
            generatedDesign,
            handleClaimDesign,
            handleBurnDesign,
            isLoading
        }
```

Then it is passing all values and functions which are used inside each child component as a props :
```
    <left-side-dashboard :accountId="accountId" :signOut="signOut" />
```
