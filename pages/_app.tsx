import type { AppContext, AppInitialProps, AppProps } from 'next/app';
import React from 'react';
import wrapper from '../src/store/configureStore';
import Head from 'next/head';

declare global {
  interface Window {
    naver: any;
  }
}

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <script
          src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js"
          type="text/javascript"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export async function getInitialProps({
  Component,
  ctx,
}: AppContext): Promise<AppInitialProps> {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps };
}

export default wrapper.withRedux(App);
