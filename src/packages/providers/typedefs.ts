export enum ProviderEnum {
  META_MASK = 'metaMask',
  WALLET_CONNECT = 'walletConnect',
}

export enum ProviderEventEnum {
  ACCOUNT_CHANGED = 'accountChanged',
  CHAIN_CHANGED = 'chainChanged',
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
