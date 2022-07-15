import { Injectable } from '@angular/core';
import { Contract, keyStores, Near, WalletConnection } from "near-api-js";
import { environment } from "../../environments/environment";

// @ts-ignore
import BN from "bn.js";

@Injectable({
  providedIn: 'root'
})
export class NearService {
  public near: Near;
  public wallet: WalletConnection;
  public accountId = '';
  public CONTRACT_ID = environment.CONTRACT_ID;
  public artContract: any;

  constructor() {
    // connecting to NEAR
    this.near = new Near({
      networkId: environment.NETWORK_ID,
      keyStore: new keyStores.BrowserLocalStorageKeyStore(),
      nodeUrl: environment.NODE_URL,
      walletUrl: environment.WALLET_URL,
      headers: {}
    });

    // create wallet connection
    this.wallet = new WalletConnection(this.near, "artdemo");
    // get contract
    this.artContract = this.getArtContract();
    this.accountId = this.wallet.getAccountId();
  }

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

  getTempDesign(accountId: any) {
    return this.artContract.getTempDesign(
      { accountId: accountId }
    );
  }

  getViewMyDesign(accountId: any) {
    return this.artContract.viewMyDesign(
      { accountId: accountId }
    );
  }

  // generate new design
  generateDesign(accountId: any) {
    return this.artContract.design(
      { accountId: accountId },
      environment.GAS
    );
  };

  // claim existing design
  claimDesign(seed: any) {
    return this.artContract.claimMyDesign(
      { seed: seed },
      environment.GAS
    );
  };

  // burn design
  burnDesign() {
    return this.artContract.burnMyDesign(
      {},
      environment.GAS
    );
  };

  async handleSignIn() {
    await this.wallet.requestSignIn({
      contractId: environment.CONTRACT_ID,
      methodNames: []
    })
  };

  handleSignOut() {
    this.wallet.signOut()
    this.accountId = ''
  };
}
