import { Component, OnInit } from '@angular/core';
//import Web3Modal from "web3modal";
import { ethers } from "ethers";

import Addresses from '../../environment/contract-address.json';
import WhiteList from '../../blockchain/artifacts/blockchain/contracts/Whitelist.sol/Whitelist.json';
import { AnyForUntypedForms } from '@angular/forms';

declare let window:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'decentralized-wishlist';

  public web3Provider:any;
  public web3Signer:any
  public chainId:number;

  public whitelistContract: any;

  public addAddressToWhitelist:any;

  public walletConnected: boolean;
  public loading:any;
  public numberOfWhitelisted:any;
  public joinedWhitelist:boolean;
  

  constructor() {

    this.web3Provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    this.web3Signer = this.web3Provider.getSigner();
  }

  async ngOnInit() {

    this.chainId  = await this.web3Signer.getChainId();
    if(this.chainId === 42) { // Kovan's chainId: 42
      this.walletConnected = true;
    } else {
      this.walletConnected = false;
    }

    this.getNumberOfWhitelisted();
    this.checkIfAddressInWhitelist();
  };

  async getProviderOrSigner(needSigner:boolean) {   

    // web3Provider.on("network", (newNetwork: any, oldNewtwork: any) => {
    //   if (oldNewtwork) {
    //     window.location.reload();
    //   }
    // });

    //const chainId  = await web3Signer.getChainId();
    // if (chainId !== 42) {
    //   window.alert("Change the network to Kovan");
    //   throw new Error("Change network to Kovan");
    // }

    // if (needSigner) {
    //   return web3Signer;
    // }
    // return web3Provider; 
  };
    
  async addAddressToWhitelistContract() {
    try {
      const whitelistContract:any = new ethers.Contract(
        Addresses.whitelistcontract, 
        WhiteList.abi, 
        this.web3Signer); 
      
      this.addAddressToWhitelist = await whitelistContract.addAddressToWhitelist();
      
      // wait for the transaction to get mined
      this.loading = true;
      await this.addAddressToWhitelist.await();

      this.loading = false;
      // get the updated number of addresses in the whitelist
      await this.getNumberOfWhitelisted();
      this.joinedWhitelist = true;

    } catch (err) {
      console.error("Error :" + err);
    }
  };

  async getNumberOfWhitelisted() {
    try {
     const whitelistContract:any = new ethers.Contract(
        Addresses.whitelistcontract, 
        WhiteList.abi, 
        this.web3Provider); 

     this.numberOfWhitelisted = await whitelistContract.numAddressesWhitelisted(); 
    } catch (err) {
      console.error(err);
    }
  };

  async checkIfAddressInWhitelist() {
    try {
      const whitelistContract:any = new ethers.Contract(
        Addresses.whitelistcontract, 
        WhiteList.abi, 
        this.web3Signer);
      
      const address = await this.web3Signer.getAddress();
      this.joinedWhitelist = await whitelistContract.whiteListedAddress(address);
    } catch (err) {
      console.error(err);
    }
  };

  async connectWallet() {
    try {

      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x2a' }], // chainId must be in hexadecimal numbers 
      });
      
      this.web3Provider = new ethers.providers.Web3Provider(window.ethereum, "any");
      this.web3Signer = this.web3Provider.getSigner();
      this.chainId = await this.web3Signer.getChainId();
      this.walletConnected = true;

      this.checkIfAddressInWhitelist();
      this.getNumberOfWhitelisted();
    } catch (err) {
      console.error(err);
    }
  };

  /*
    renderButton: Returns a button based on the state of the dapp
  */
  // renderButton() {
  //   if (this.walletConnected) {
  //     if (this.joinedWhitelist) {
  //       return (
  //         <div className={styles.description}>
  //           Thanks for joining the Whitelist!
  //         </div>
  //       );
  //     } else if (this.loading) {
  //       return `<button className={styles.button}>Loading...</button>`;
  //     } else {
  //       return (
  //         `<button onClick={addAddressToWhitelist} className={styles.button}>
  //           Join the Whitelist
  //         </button>`
  //       );
  //     }
  //   } else {
  //     return (
  //       `<button onClick={connectWallet} className={styles.button}>
  //         Connect your wallet
  //       </button>`
  //     );
  //   }
  // };
}
