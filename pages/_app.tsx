import type { AppProps } from 'next/app';
import React from 'react';
import axios from 'axios';
import '../styles/global.css';

axios.defaults.withCredentials = true;

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default App;
