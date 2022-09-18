import { Home } from 'components/Home/Home';
// import { useNetwork } from 'hooks/useNetwork';
// import { NetworkEnum } from 'packages/networks';

/**
 * TODO:
 * connect wallet
 * select network
 * run
 * switch wallet to right network
 * switch
 * await approval
 * run
 */

export default () => {
  // const {
  //   web3: web3Polygon,
  // } = useNetwork(NetworkEnum.POLYGON);
  // const {
  //   web3: web3Bsc,
  // } = useNetwork(NetworkEnum.BSC);
  // const {
  //   web3: web3Avalanche,
  // } = useNetwork(NetworkEnum.AVALANCHE);

  // // const tx = '0xa5048e9a90d93e5f4d6894eda998342c737985de25a9ed182e532c170d0b0465';

  // // web3.eth.getTransaction(tx).then((r) => console.log('getTransaction', r));
  // // web3.eth.getTransactionReceipt(tx).then((r) => console.log('getTransactionReceipt', r));
  // // web3.eth.getGasPrice().then((r) => console.log('getGasPrice', r));

  // web3Polygon.eth.getBlock('pending').then((rr) => console.log(
  //   'getBlock(pending) - web3Polygon',
  //   rr,
  // ));

  // web3Polygon.eth.getFeeHistory(
  //   10,
  //   'latest',
  //   [25, 75],
  // ).then((rr) => console.log(
  //   'getFeeHistory - web3Polygon',
  //   rr,
  // ));

  // web3Bsc.eth.getGasPrice().then((rr) => console.log(
  //   'getGasPrice - web3Bsc',
  //   rr,
  // ));

  // web3Bsc.eth.getBlock('pending').then((rr) => console.log(
  //   'getBlock(pending) - web3Bsc',
  //   rr,
  // ));

  // web3Bsc.eth.getFeeHistory(
  //   10,
  //   'latest',
  //   [25, 75],
  // ).then((rr) => console.log(
  //   'getFeeHistory - web3Bsc',
  //   rr,
  // ));

  // web3Avalanche.eth.getGasPrice().then((rr) => console.log(
  //   'getGasPrice - web3Avalanche',
  //   rr,
  // ));

  // web3Avalanche.eth.getBlock('latest').then((rr) => console.log(
  //   'getBlock - web3Avalanche',
  //   rr,
  // ));

  return (
    <Home />
  );
};
