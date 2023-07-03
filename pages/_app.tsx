import type { AppProps } from 'next/app';
import React from 'react';
import axios from 'axios';
import '../styles/global.css';
import SocketIoProvider from '@/src/kakao/provider/SocketIoProvider/SocketIoProvider';

axios.defaults.withCredentials = true;

function App({ Component, pageProps }: AppProps) {
  return (
    <SocketIoProvider>
      <Component {...pageProps} />
    </SocketIoProvider>
  );
}

export default App;
