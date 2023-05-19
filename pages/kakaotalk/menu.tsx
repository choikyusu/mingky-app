import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import withAuth from '../../src/auth/WithAuth';

const Menu = () => {
  const { pathname } = useRouter();
  return (
    <Styled.Wrapper>
      <Styled.Container>
        <Styled.MenuSideBar>
          <ul>
            <Styled.Menu
              className={pathname === '/kakaotalk/menu/friends' ? 'active' : ''}
              href="/kakaotalk/menu/friends"
            >
              <li title="친구">
                <i className="fas fa-user" />
              </li>
            </Styled.Menu>
            <Styled.Menu
              className={
                pathname === '/kakaotalk/menu/chatting' ? 'active' : ''
              }
              href="/kakaotalk/menu/chatting"
            >
              <li title="채팅">
                <i className="fas fa-comment" />
              </li>
            </Styled.Menu>
            <li title="로그아웃">
              <i className="fas fa-sign-out-alt" />
            </li>
          </ul>
        </Styled.MenuSideBar>
      </Styled.Container>
    </Styled.Wrapper>
  );
};

const Notification = styled.span`
  position: absolute;
  display: inline-block;
  padding: 3px;
  color: #fff;
  background-color: #ff513d;
  border: none;
  border-radius: 20px;
  font-weight: bold;
  min-width: 25px;
  text-align: center;
`;

const Styled = {
  Wrapper: styled.div`
    width: 100%;
  `,
  Container: styled.main`
    width: 100%;
    display: flex;
  `,
  MenuSideBar: styled.aside`
    position: fixed;
    top: 0;
    left: 0;
    width: 100px;
    height: 100%;
    min-height: 100vh;
    background: #dfdfdf;
    padding-top: 20px;
    z-index: 2;
    & li {
      padding: 10px;
      text-align: center;
      font-size: 25px;
      color: #a6a7a8;
      cursor: pointer;
      &:hover {
        color: #888777;
      }
    }
  `,
  Menu: styled(Link)`
    display: inline-block;
    width: 100%;
    &.active {
      pointer-events: none;
      & li {
        color: black;
      }
    }
    & li {
      position: relative;
      & ${Notification} {
        top: 7px;
        left: 55px;
        font-size: 12px;
      }
    }
  `,
};

export default withAuth(Menu);
