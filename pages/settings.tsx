import { DocumentContext } from 'next/document';
import React from 'react';
import { SettingsBody } from '../src/components/organisms/Body/SettingsBody';
import { MainHeader } from '../src/components/organisms/MainHeader/MainHeader';
import { API } from '../src/constants/api.constant';
import useFetch from '../src/hooks/useFetch';

export default function Settings(props: { user: UserInfoType }) {
  const { user } = props;
  return (
    <>
      <MainHeader />
      <SettingsBody user={user} />
    </>
  );
}

export async function getServerSideProps(context: DocumentContext) {
  const cookie = context.req?.headers.cookie || '';

  const newFetch = useFetch();

  const resultData: { user: UserInfoType } = await newFetch.callApi({
    url: `${process.env.SERVICE_URL}:${process.env.PORT}${API.GET_USER_ME}`,
    method: 'get',
    cookie,
  });

  return {
    props: { user: resultData?.user },
  };
}
