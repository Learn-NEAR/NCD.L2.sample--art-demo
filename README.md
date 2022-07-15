#  🎓 NCD.L2.sample--art-demo dapp
This branch contains a complete frontend Angular application to work with 
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

After you successfully deployed smart contracts and you have contract id, you can input them on a deployed <a href="https://art-demo-react.onrender.com/" target="_blank">website </a> or you can clone the repo and put contract ids inside ``` src/environments/environment.ts ``` file :

```
CONTRACT_ID = "put your art-demo contract id here"
...
```

After you fill up environment.ts file, you need to:

1. Install Angular CLI (if previously you didn't)
```
npm i -g @angular/cli
```

2. Install all dependencies
```
npm i
```
3. Run the project locally
```
npm run serve
```

Other commands:

Compiles and minifies for production
```
npm run build
```
Lints and fixes files
```
npm run lint
```

## 👀 Code walkthrough for Near university students

<a href="" >Code walk-through | TBA </a>

### -- Contract --

To work with art-contract we have functions inside ``` src/app/services/near.service.ts```.
```
  getArtContract() {
    return new Contract(
      this.wallet.account(),
      this.CONTRACT_ID,
      {
        viewMethods: ['getTempDesign', 'viewMyDesign'],
        changeMethods: ['design', 'claimMyDesign', 'burnMyDesign']
      }
    )
  }
```

### -- Near Service --

We are using ```near-api-js``` to work with NEAR blockchain. In ``` src/app/services/near.service.ts ``` we are importing classes, functions, and configs which we are going to use:
```
import { keyStores, Near, Contract, utils, WalletConnection } from "near-api-js";
```

The class contains two variables
```
public near: Near;
public wallet: WalletConnection;
```

Then in ``` constructor() ``` we are connecting to NEAR:
```
this.near = new Near({
  networkId: environment.NETWORK_ID,
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: environment.NODE_URL,
  walletUrl: environment.WALLET_URL,
  headers: {}
});
``` 
and creating wallet connection
```
// create wallet connection
this.wallet = new WalletConnection(this.near, "meme-museum");
```


### -- Art Service --

``` src/app/services/art.service.ts ``` represent the main functional class of dApp

We use that container to encapsulate all data and functions related to Art:
```
  public generatedDesign: any = false;
  public myDesign: any = false;
  ...
  
  async handleGenerateDesign(accountId: any) {...};
  async handleClaimDesign(seed: any) {...};
  async handleBurnDesign() {...};
  async loadArt() {...};
```

With dependency injection, we can share everything with components. ``` src/app/components/dashboard/dashboard.component.ts ``` as an example :
```
  constructor(public artService: ArtService, private router: Router,) {}
  .....
  
  
  async loadArt() {
    await this.artService.loadArt();
  }
```

Also, we are using data from  ```src/app/services/art.service.ts``` in ``` src/app/components/dashboard/dashboard.component.html ```
```
<!-- Search -->
<div *ngIf="artService.generatedDesign" class="w-full flex items-center">
  <input type="text" name="seed"
    class="placeholder-current text-gray-500 focus:text-black dashboard-search outline-none pl-16 py-4 font-bold"
    [(ngModel)]="artService.generatedDesign.seed">
      <button (click)="artService.handleClaimDesign(artService.generatedDesign.seed)"
        class="ml-6 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-600 transform active:scale-95">
          Claim
      </button>
</div>
```

## Examples
``` src/app/services/art.service.ts ```
### - Function | No Parameters -
```
async handleBurnDesign() {...}
```

### - Function | With Parameters -
```
async handleGenerateDesign(accountId: any) {...}
```
