export enum WalletEnum {
  META_MASK = 'meta_mask',
  WALLET_CONNECT = 'wallet_connect',
}

export enum WalletEventEnum {
  ACCOUNT_CHANGED = 'account_changed',
  CHAIN_CHANGED = 'chain_changed',
}

export enum MetaMaskEventEnum {
  ACCOUNTS_CHANGED = 'accountsChanged',
  CHAIN_CHANGED = 'chainChanged',
}

export enum WalletConnectEventEnum {
  SESSION_UPDATE = 'session_update',
  DISCONNECT = 'disconnect',
  CONNECT = 'connect',
}
