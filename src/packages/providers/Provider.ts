import EventEmitter from 'events';
import { numberToHex } from 'web3-utils';
import { NETWORKS, NetworkEnum } from 'packages/networks';
import { TransactionConfig, TransactionReceipt } from 'web3-core';
import { ProviderEventEnum } from 'packages/providers/typedefs';

export abstract class Provider {
  protected readonly abstract _provider: any;

  protected readonly _eventEmitter: EventEmitter;

  constructor() {
    this._eventEmitter = new EventEmitter();
  }

  public abstract connect(): Promise<readonly [string, number]>;

  public abstract disconnect(): void;

  public async getAccount(): Promise<string> {
    const accounts = await this._request('eth_accounts');

    return accounts[0].toLowerCase();
  }

  public async getChainId(): Promise<number> {
    const chainId = await this._request('eth_chainId');

    return Number(chainId);
  }

  public async sendTx(
    transactionConfig: TransactionConfig,
  ): Promise<TransactionReceipt> {
    return this._request('eth_sendTransaction', transactionConfig);
  }

  public async addNetwork(networkType: NetworkEnum): Promise<boolean> {
    const network = NETWORKS[networkType];

    try {
      await this._request('wallet_addEthereumChain', {
        chainId: numberToHex(network.chainId),
        chainName: network.name,
        nativeCurrency: {
          name: network.currency,
          symbol: network.currency,
          decimals: 18,
        },
        rpcUrls: [network.rpc],
        blockExplorerUrls: [network.explorer],
      });

      return true;
    } catch (e) {
      return false;
    }
  }

  public async switchNetwork(networkType: NetworkEnum): Promise<boolean> {
    const network = NETWORKS[networkType];

    try {
      await this._request('wallet_switchEthereumChain', {
        chainId: numberToHex(network.chainId),
      });

      return true;
    } catch (e: any) {
      if (e.code === 4902) {
        return this.addNetwork(networkType);
      }

      return false;
    }
  }

  public on(event: ProviderEventEnum, cb: (payload: any) => void) {
    this._eventEmitter.on(event, cb);
  }

  public removeAllListeners(event: ProviderEventEnum) {
    this._eventEmitter.removeAllListeners(event);
  }

  protected abstract _request(method: string, ...params: any): Promise<any>;

  protected async _requestAccount(): Promise<string> {
    const accounts = await this._request('eth_requestAccounts');

    return accounts[0].toLowerCase();
  }

  protected _emit(event: ProviderEventEnum, payload: any) {
    this._eventEmitter.emit(event, payload);
  }
}
