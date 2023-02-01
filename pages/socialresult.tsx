import { DocumentContext } from 'next/document';
import React from 'react';
import { MainHeader } from '../src/components/organisms/MainHeader/MainHeader';
import { Cookies } from 'react-cookie';
import Router from 'next/router';

export default function socialresult() {
  return <MainHeader />;
}

export async function getServerSideProps(context: DocumentContext) {
  const token: Token = JSON.parse(context.query.tokenString as string);

  context?.res?.setHeader(
    'set-cookie',
    `token=${token.token};refreshToken=${token.refreshToken} path=/; samesite=lax; httponly;`,
  );

  context.res?.writeHead(301, { location: '/settings' });
  context.res?.end();
}
