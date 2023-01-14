import { Wallet } from 'packages/wallets/Wallet';
import { WalletEventEnum, MetaMaskEventEnum } from 'packages/wallets/typedefs';

const EXTENSION_URL = 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn';
const MOBILE_APP_URL = 'https://metamask.app.link/dapp';

export class MetaMask extends Wallet {
  static readonly EXTENSION_URL = EXTENSION_URL;

  static readonly MOBILE_APP_URL = MOBILE_APP_URL;

  protected readonly _wallet: any;

  constructor() {
    super();
    this._wallet = window.ethereum;
  }

  async connect() {
    const account = await this._requestAccount();
    const chainId = await this.getChainId();

    this._wallet.on(MetaMaskEventEnum.ACCOUNTS_CHANGED, (
      accounts: string[],
    ) => {
      const _account = accounts.length > 0
        ? accounts[0].toLowerCase()
        : null;

      this._emit(WalletEventEnum.ACCOUNT_CHANGED, _account);
    });

    this._wallet.on(MetaMaskEventEnum.CHAIN_CHANGED, (_chainId: number) => {
      this._emit(WalletEventEnum.CHAIN_CHANGED, Number(_chainId));
    });

    return [account, chainId] as const;
  }

  disconnect() {
    this._wallet.removeAllListeners(MetaMaskEventEnum.ACCOUNTS_CHANGED);
    this._wallet.removeAllListeners(MetaMaskEventEnum.CHAIN_CHANGED);
  }

  protected _request(method: string, ...params: any): Promise<any> {
    return this._wallet.request({ method, params });
  }

  static isUnlocked(): Promise<boolean> {
    return window.ethereum._metamask.isUnlocked();
  }

  static isInstalled(): boolean {
    return typeof window.ethereum !== 'undefined';
  }
}
