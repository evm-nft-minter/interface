import EventEmitter from 'events';
import {
  AddEthereumChainInterface,
  TransactionReceiptInterface,
  TransactionRequestInterface,
  WalletEventEnum,
} from 'packages/wallets/typedefs';

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
    transaction: TransactionRequestInterface,
  ): Promise<TransactionReceiptInterface> {
    return this._request('eth_sendTransaction', transaction);
  }

  public async addNetwork(params: AddEthereumChainInterface): Promise<boolean> {
    try {
      await this._request('wallet_addEthereumChain', {
        chainId: params.chainId,
        chainName: params.chainName,
        nativeCurrency: {
          name: params.currency,
          symbol: params.currency,
          decimals: params.currencyDecimals || 18,
        },
        rpcUrls: [params.rpc],
        blockExplorerUrls: [params.explorer],
      });

      return true;
    } catch (e) {
      return false;
    }
  }

  public async switchNetwork(params: AddEthereumChainInterface): Promise<boolean> {
    try {
      await this._request('wallet_switchEthereumChain', {
        chainId: params.chainId,
      });

      return true;
    } catch (e: any) {
      if (e.code === 4902) {
        return this.addNetwork(params);
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
