import Link from 'next/link';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { modalActions } from '../../../../store/modules/actions/modal.action';

export function AdminBody() {
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <div className="menu-list">
        <Link href="/edit">
          <div
            className="menu-card"
            tabIndex={0}
            role="button"
          >{`새글 쓰기 >`}</div>
        </Link>
        <div
          className="menu-card"
          tabIndex={0}
          role="button"
          onClick={() => {
            dispatch(
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
