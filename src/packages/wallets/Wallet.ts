import EventEmitter from 'events';
import { NETWORKS, ChainIdEnum } from 'packages/networks';
import { WalletEventEnum } from 'packages/wallets/typedefs';

export abstract class Wallet {
  protected readonly abstract _wallet: any;

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
    transactionConfig: any,
    // TODO: transactionConfig: TransactionConfig,
  ): Promise<any> {
  // TODO: ): Promise<TransactionReceipt> {
    return this._request('eth_sendTransaction', transactionConfig);
  }

  public async addNetwork(chainId: ChainIdEnum): Promise<boolean> {
    const network = NETWORKS[chainId];

    try {
      await this._request('wallet_addEthereumChain', {
        chainId: network.chainId,
        // TODO: chainId: numberToHex(network.chainId),
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

  public async switchNetwork(chainId: ChainIdEnum): Promise<boolean> {
    try {
      await this._request('wallet_switchEthereumChain', {
        chainId,
        // TODO: chainId: numberToHex(chainId),
      });

      return true;
    } catch (e: any) {
      if (e.code === 4902) {
        return this.addNetwork(chainId);
      }

      return false;
    }
  }

  public on(event: WalletEventEnum, cb: (payload: any) => void) {
    this._eventEmitter.on(event, cb);
  }

  public removeAllListeners(event: WalletEventEnum) {
    this._eventEmitter.removeAllListeners(event);
  }

  protected abstract _request(method: string, ...params: any): Promise<any>;

  protected async _requestAccount(): Promise<string> {
    const accounts = await this._request('eth_requestAccounts');

    return accounts[0].toLowerCase();
  }

  protected _emit(event: WalletEventEnum, payload: any) {
    this._eventEmitter.emit(event, payload);
  }
}
