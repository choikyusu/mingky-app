import { useState } from 'react';
import styled from 'styled-components';
import { API } from '../../../../../constants/api.constant';
import useFetch from '../../../../../hooks/useFetch';
import Router from 'next/router';

export function BlogLink() {
  const newFetch = useFetch();
  const [url, setUrl] = useState('');

  const update = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  return (
    <Wrapper>
      <header className="dialog-header">블로그 따오기</header>
      <div className="dialog-body">
        <div className="reset-content">
          <input type="text" className="url" value={url} onChange={update} />
        </div>
        <button
          type="button"
          className="button close"
          onClick={async () => {
            const result = await newFetch.callApi({
              url: API.GET_BLOG_EVENT,
              method: 'post',
              data: { url },
            });

            if (result.tempId) {
              Router.push(`/edit/temp/${result.tempId}`);
            }
          }}
        >
          확인
        </button>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  input {
    width: 300px;
  }
`;
