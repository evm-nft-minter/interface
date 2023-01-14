import WalletConnectClient from '@walletconnect/client';
import qrcodeModal from '@walletconnect/qrcode-modal';
import { Wallet } from 'packages/wallets/Wallet';
import { WalletEventEnum, WalletConnectEventEnum } from 'packages/wallets/typedefs';

export class WalletConnect extends Wallet {
  protected readonly _wallet: WalletConnectClient;

  constructor() {
    super();
    this._wallet = new WalletConnectClient({
      bridge: 'https://bridge.walletconnect.org',
      qrcodeModal,
    });
  }

  async connect() {
    await this._wallet.connect();

    const account = await this.getAccount();
    const chainId = await this.getChainId();

    this._wallet.on(WalletConnectEventEnum.SESSION_UPDATE, (_, payload) => {
      const { accounts, chainId: _chainId } = payload.params[0];

      this._emit(WalletEventEnum.ACCOUNT_CHANGED, accounts[0].toLowerCase());
      this._emit(WalletEventEnum.CHAIN_CHANGED, _chainId);
    });

    this._wallet.on(WalletConnectEventEnum.DISCONNECT, () => {
      this._emit(WalletEventEnum.ACCOUNT_CHANGED, null);
    });

    return [account, chainId] as const;
  }

  disconnect() {
    this._wallet.off(WalletConnectEventEnum.SESSION_UPDATE);
    this._wallet.off(WalletConnectEventEnum.DISCONNECT);

    this._wallet.killSession();
  }

  protected _request(method: string, ...params: any) {
    return this._wallet.sendCustomRequest({ method, params });
  }
}
