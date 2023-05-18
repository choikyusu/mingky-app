import type { AppProps } from 'next/app';
import React from 'react';
import axios from 'axios';
import '../styles/global.css';
import Head from 'next/head';

axios.defaults.withCredentials = true;

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css"
        />
        <link
          href="https://use.fontawesome.com/releases/v5.7.0/css/all.css"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default App;
