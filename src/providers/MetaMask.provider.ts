import { Provider } from 'providers/Provider';
import { ProviderEventEnum, MetaMaskEventEnum } from 'providers/typedefs';

export class MetaMask extends Provider {
  protected readonly _provider: any;

  constructor() {
    super();
    this._provider = window.ethereum;
  }

  async connect() {
    const account = await this._requestAccount();
    const chainId = await this.getChainId();

    this._provider.on(MetaMaskEventEnum.ACCOUNTS_CHANGED, (
      accounts: string[],
    ) => {
      const _account = accounts.length > 0
        ? accounts[0].toLowerCase()
        : null;

      this._emit(ProviderEventEnum.ACCOUNT_CHANGED, _account);
    });

    this._provider.on(MetaMaskEventEnum.CHAIN_CHANGED, (_chainId: number) => {
      this._emit(ProviderEventEnum.CHAIN_CHANGED, Number(_chainId));
    });

    return [account, chainId] as const;
  }

  disconnect() {
    this._provider.removeAllListeners(MetaMaskEventEnum.ACCOUNTS_CHANGED);
    this._provider.removeAllListeners(MetaMaskEventEnum.CHAIN_CHANGED);
  }

  protected _request(method: string, ...params: any): Promise<any> {
    return this._provider.request({ method, params });
  }

  static isUnlocked(): Promise<boolean> {
    return window.ethereum._metamask.isUnlocked();
  }

  static isInstalled(): boolean {
    return typeof window.ethereum !== 'undefined';
  }
}
