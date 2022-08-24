import WalletConnectClient from '@walletconnect/client';
import qrcodeModal from '@walletconnect/qrcode-modal';
import { Provider } from 'providers/Provider';
import { ProviderEventEnum, WalletConnectEventEnum } from 'providers/typedefs';

export class WalletConnect extends Provider {
  protected readonly _provider: WalletConnectClient;

  constructor() {
    super();
    this._provider = new WalletConnectClient({
      bridge: 'https://bridge.walletconnect.org',
      qrcodeModal,
    });
  }

  async connect() {
    await this._provider.connect();

    const account = await this.getAccount();
    const chainId = await this.getChainId();

    this._provider.on(WalletConnectEventEnum.SESSION_UPDATE, (_, payload) => {
      const { accounts, chainId: _chainId } = payload.params[0];

      this._emit(ProviderEventEnum.ACCOUNT_CHANGED, accounts[0].toLowerCase());
      this._emit(ProviderEventEnum.CHAIN_CHANGED, _chainId);
    });

    this._provider.on(WalletConnectEventEnum.DISCONNECT, () => {
      this._emit(ProviderEventEnum.ACCOUNT_CHANGED, null);
    });

    return [account, chainId] as const;
  }

  disconnect() {
    this._provider.off(WalletConnectEventEnum.SESSION_UPDATE);
    this._provider.off(WalletConnectEventEnum.DISCONNECT);

    this._provider.killSession();
  }

  protected _request(method: string, ...params: any) {
    return this._provider.sendCustomRequest({ method, params });
  }
}
