import { DocumentContext } from 'next/document';
import React from 'react';
import { MainHeader } from '../src/components/organisms/MainHeader/MainHeader';
export default function socialresult() {
  return <MainHeader />;
}

export async function getServerSideProps(context: DocumentContext) {
  const today = new Date();
  today.setDate(today.getDate() + 14);
  const token: Token = JSON.parse(context.query.tokenString as string);

  context?.res?.setHeader(
    'set-cookie',
    `token=${token.token};refreshToken=${
      token.refreshToken
    } path=/; expires=${today.toUTCString()}; samesite=lax; httponly;`,
  );

  context.res?.writeHead(301, { location: '/settings' });
  context.res?.end();
}
