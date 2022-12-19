import { useState } from 'react';
import styled from 'styled-components';
import { API } from '../../../../../constants/api.constant';
import useFetch from '../../../../../hooks/useFetch';
import stores from '../../../../../store/configureStore';
import { editActions } from '../../../../../store/modules/actions/edit.action';
import { menuActions } from '../../../../../store/modules/actions/menu.action';
import { modalActions } from '../../../../../store/modules/actions/modal.action';

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

            stores.dispatch(menuActions.setMode({ mode: 'EDIT' }));

            stores.dispatch(
              editActions.setContents({
                title: result.title,
                contents: result.contents,
              }),
            );

            stores.dispatch(
              modalActions.setDialogStatus({
                id: '',
                data: {},
              }),
            );
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
