import React from 'react';
import { Editor } from '../../../src/components/organisms/Editor/Editor';
import EditorProvider from '../../../src/components/organisms/Editor/EditorProvider';
import { API } from '../../../src/constants/api.constant';
import useFetch from '../../../src/hooks/useFetch';

export default function Edit(props: {
  post: { title: string; contents: string };
}) {
  const { post } = props;
  return (
    <EditorProvider>
      <Editor />
    </EditorProvider>
  );
}

export async function getServerSideProps(context: any) {
  const { id } = context.params;

  if (id === '') return { props: {} };
  const newFetch = useFetch();

  const resultData = await newFetch.callApi({
    url: `${process.env.SERVICE_URL}:${process.env.PORT}${API.GET_TEMP_EVENT_BY_ID}/${id}`,
    method: 'get',
  });

  console.log('test ', resultData);

  return {
    props: {
      post: resultData.post,
    },
  };
}
