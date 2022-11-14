import styled from 'styled-components';
import { API } from '../../../../constants/api.constant';
import useFetch from '../../../../hooks/useFetch';
import stores from '../../../../store/configureStore';
import { editActions } from '../../../../store/modules/actions/edit.action';
import { menuActions } from '../../../../store/modules/actions/menu.action';
import { modalActions } from '../../../../store/modules/actions/modal.action';

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
          onClick={() => {
            stores.dispatch(
              modalActions.setDialogStatus({
                id: 'BLOG_LINK',
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
