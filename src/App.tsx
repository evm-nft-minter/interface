import { useEffect } from 'react';

// import WalletConnectClient from '@walletconnect/client';
// import QRCodeModal from '@walletconnect/qrcode-modal';
// import { WalletConnect } from 'providers/WalletConnect.provider';

// const init = async () => {
//   const connector = new WalletConnectClient({
//     bridge: 'https://bridge.walletconnect.org',
//     qrcodeModal: QRCodeModal,
//   });

//   connector.on('connect', (error, payload) => {
//     console.log(error, payload);
//   });

//   connector.on('session_update', (error, payload) => {
//     console.log(error, payload);
//   });

//   connector.on('disconnect', (error, payload) => {
//     console.log(error, payload);
//   });

//   // console.log({ connected: connector.connected, uri: connector.uri });

//   if (connector.connected) {
//     // await connector.killSession();
//   }

//   if (!connector.connected) {
//     await connector.connect();

//     // await connector.createSession();

//     // QRCodeModal.open(connector.uri, async () => {
//     //   console.log('QR Code Modal closed');
//     // });
//   }
// };

// const wc = async () => {
//   const wl = new WalletConnect();

//   wl.connect().then(console.log);
// };

export const App = () => {
  useEffect(() => {
    // init();
  }, []);

  return (
    <div>
      Hello, world!
    </div>
  );
};
