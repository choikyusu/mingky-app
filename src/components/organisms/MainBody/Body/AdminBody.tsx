import styled from 'styled-components';
import { API } from '../../../../constants/api.constant';
import useFetch from '../../../../hooks/useFetch';
import stores from '../../../../store/configureStore';
import { editActions } from '../../../../store/modules/actions/edit.action';
import { menuActions } from '../../../../store/modules/actions/menu.action';

export function AdminBody() {
  const newFetch = useFetch();
  return (
    <Wrapper>
      <div className="menu-list">
        <div
          className="menu-card"
          tabIndex={0}
          role="button"
          onClick={() => {
            stores.dispatch(menuActions.setMode({ mode: 'EDIT' }));
          }}
        >{`새글 쓰기 >`}</div>
        <div
          className="menu-card"
          tabIndex={0}
          role="button"
          onClick={async () => {
            const result = await newFetch.callApi({
              url: API.GET_BLOG_EVENT,
              method: 'get',
            });

            stores.dispatch(menuActions.setMode({ mode: 'EDIT' }));

            stores.dispatch(
              editActions.setContents({
                title: result.title,
                contents: result.contents,
              }),
            );
          }}
        >{`블로그 따오기 >`}</div>
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  .menu-list {
    width: 390px;
    .menu-card {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 24px;
      width: 342px;
      height: 48px;
      background: #f8f8f8;
      border-radius: 8px;
      margin-bottom: 4px;
    }
  }
`;
