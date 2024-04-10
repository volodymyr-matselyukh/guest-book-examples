/* Talking with a contract often involves transforming data, we recommend you to encapsulate that logic into a class */

import { utils } from 'near-api-js';
import { Wallet } from './near-wallet';

const usdtAccountId = 'usdt.fakes.testnet';

//const usdtWallet = new Wallet({ createAccessKeyFor: usdtAccountId });

export class GuestBook {

  constructor({ contractId, walletToUse }) {
    this.contractId = contractId;
    this.wallet = walletToUse
  }

  async getWalletDeposit() {
    console.log('contract id', this.contractId);
    console.log('wallet contract id', this.wallet);

    const deposit = await this.wallet.viewMethod({ contractId: usdtAccountId, method: "ft_balance_of", args: { account_id: this.wallet.accountId } });

    console.log('usdt deposit', deposit);

    return (deposit / 1000_000).toFixed(2);
  }
  
  async getDeposit() {
    console.log('contract id', this.contractId);
    console.log('wallet contract id', this.wallet);

    const deposit = await this.wallet.viewMethod({ contractId: this.contractId, method: "get_my_deposit", args: { sender: this.wallet.accountId }});

    const nears = deposit / Math.pow(10, 24);

    return nears.toFixed(5);
  }

  async getMessages() {
    const messages = await this.wallet.viewMethod({ contractId: this.contractId, method: "get_messages" })
    console.log(messages)
    return messages
  }

  async addMessage(message, donation) {
    const deposit = utils.format.parseNearAmount(donation);
    return await this.wallet.callMethod({ contractId: this.contractId, method: "add_message", args: { text: message }, deposit });
  }
}