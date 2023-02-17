import { forwardRef, Ref, useImperativeHandle, useState } from 'react';
import styled from 'styled-components';
import { API } from '../../../../../constants/api.constant';
import useFetch from '../../../../../hooks/useFetch';
import Router from 'next/router';
import { ModalRef } from '../../ModalContainer';

const BlogLink = forwardRef((props: { data?: string }, ref: Ref<ModalRef>) => {
  const { data } = props;
  const newFetch = useFetch();
  const [url, setUrl] = useState('');

  const update = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  useImperativeHandle(ref, () => ({
    handleClick: () => {
      if (url === '') return;
      newFetch
        .callApi({
          url: API.GET_BLOG_EVENT,
          method: 'post',
          data: { url },
        })
        .then(value => {
          if (value.tempId) {
            Router.push(`/edit/temp/${value.tempId}`);
          }
        });
    },
  }));

  return (
    <Wrapper>
      <header className="dialog-header">블로그 따오기</header>
      <div className="dialog-body">
        <div className="reset-content">
          <input type="text" className="url" value={url} onChange={update} />
        </div>
      </div>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  input {
    width: 300px;
  }
`;
export default BlogLink;
