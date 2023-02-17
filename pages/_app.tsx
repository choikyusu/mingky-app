import type { AppProps } from 'next/app';
import React from 'react';
import axios from 'axios';

declare global {
  interface Window {
    naver: any;
  }
}

axios.defaults.withCredentials = true;

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default App;
