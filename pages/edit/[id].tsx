import React from 'react';
import { Editor } from '../../src/components/organisms/Editor/Editor';
import { API } from '../../src/constants/api.constant';
import useFetch from '../../src/hooks/useFetch';

export default function Edit(props: { event: EventItem }) {
  const { event } = props;
  return <Editor event={event} />;
}

export async function getServerSideProps(context: any) {
  const { id } = context.params;

  if (id === '') return { props: {} };
  const newFetch = useFetch();

  const resultData = await newFetch.callApi({
    url: `${process.env.SERVICE_URL}:${process.env.PORT}${API.GET_EVENT_BY_ID}/${id}`,
    method: 'get',
  });

  const { event }: { event: EventItem } = resultData;

  return {
    props: {
      event,
    },
  };
}
