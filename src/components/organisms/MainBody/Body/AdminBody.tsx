import styled from 'styled-components';
import stores from '../../../../store/configureStore';
import { menuActions } from '../../../../store/modules/actions/menu.action';

export function AdminBody() {
  return (
    <Wrapper>
      <div className="menu-list">
        <div
          className="menu-card"
          tabIndex={0}
          role="button"
          onClick={() => {
            console.log('aaa');
            stores.dispatch(menuActions.setMode({ mode: 'EDIT' }));
          }}
        >{`새글 쓰기 >`}</div>
        <div className="menu-card">{`블로그 따오기 >`}</div>
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
