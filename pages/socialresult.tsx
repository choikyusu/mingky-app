import { DocumentContext } from 'next/document';
import React from 'react';
import { MainHeader } from '../src/components/organisms/MainHeader/MainHeader';
import { Cookies } from 'react-cookie';

export default function socialresult(props: {
  token: string;
  refreshToken: string;
}) {
  const cookies = new Cookies();

  cookies.set('token', props.token);
  cookies.set('refreshToken', props.refreshToken);
  return <MainHeader />;
}

export async function getServerSideProps(context: DocumentContext) {
  const token: Token = JSON.parse(context.query.tokenString as string);

  return {
    props: { token: token.token, refreshToken: token.refreshToken },
  };
}
