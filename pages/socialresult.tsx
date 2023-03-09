import { DocumentContext } from 'next/document';
import React from 'react';
import cookie from 'cookie';
import { MainHeader } from '../src/components/organisms/MainHeader/MainHeader';

export default function socialresult() {
  return <MainHeader />;
}

export async function getServerSideProps(context: DocumentContext) {
  const today = new Date();
  today.setDate(today.getDate() + 14);
  const token: Token = JSON.parse(context.query.tokenString as string);

  const cookies = [
    cookie.serialize('token', token.token, {
      path: '/',
      expires: today,
      sameSite: 'lax',
      httpOnly: true,
    }),
    cookie.serialize('refreshToken', token.refreshToken, {
      path: '/',
      expires: today,
      sameSite: 'lax',
      httpOnly: true,
    }),
  ];

  context?.res?.setHeader('set-cookie', cookies);

  context.res?.writeHead(301, { location: '/settings' });
  context.res?.end();
}
