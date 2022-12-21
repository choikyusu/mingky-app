import type { AppContext, AppInitialProps, AppProps } from 'next/app';
import React from 'react';
import wrapper from '../src/store/configureStore';

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
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
