import { ServerStyleSheet } from 'styled-components';
import { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import React from 'react';

export default function Document() {
  return (
    <Html lang="ko">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export async function getInitialProps(context: DocumentContext) {
  const sheet = new ServerStyleSheet();
  const originalRenderPage = context.renderPage;

  try {
    context.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
      });

    const initialProps = await getInitialProps(context);
    return {
      ...initialProps,
      styles: [
        <>
          {initialProps.styles}
          {sheet.getStyleElement()}
        </>,
      ],
    };
  } finally {
    sheet.seal();
  }
}
