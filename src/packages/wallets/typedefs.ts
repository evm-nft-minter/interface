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

export type TransactionRequestInterface = {
  to?: string
  from?: string
  nonce?: string
  gasLimit?: string
  gasPrice?: string
  data?: string
  value?: string
  chainId?: number
  maxPriorityFeePerGas?: string
  maxFeePerGas?: string
};

export interface TransactionReceiptInterface {
  to: string
  from: string
  contractAddress: string
  transactionIndex: number
  root?: string
  gasUsed: string
  logsBloom: string
  blockHash: string
  transactionHash: string
  blockNumber: number
  confirmations: number
  cumulativeGasUsed: string
  effectiveGasPrice: string
  byzantium: boolean
  type: number
  status?: number
}

export interface AddEthereumChainInterface {
  chainId: number
  chainName: string
  currency: string
  currencyDecimals?: number
  rpc: string
  explorer: string
}
