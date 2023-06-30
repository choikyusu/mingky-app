import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { userLogout } from '../../../services/apis/login.api.service';
import { PAGE_PATHS } from '../../../constants/env.constants';

const MenuSideBar = () => {
  const router = useRouter();

  const onLogoutClick = () => {
    const isLogout = window.confirm('로그아웃 하시겠습니까?');
    if (isLogout) {
      userLogout(() => router.push(PAGE_PATHS.LOGIN));
    }
  };

  return (
    <Styled.MenuSideBar>
      <ul>
        <Styled.Menu
          className={router.pathname === PAGE_PATHS.FRIEND ? 'active' : ''}
          href={PAGE_PATHS.FRIEND}
        >
          <li title="친구">
            <i className="fas fa-user" />
          </li>
        </Styled.Menu>
        <Styled.Menu
          className={router.pathname === PAGE_PATHS.CHATTING ? 'active' : ''}
          href={PAGE_PATHS.CHATTING}
        >
          <li title="채팅">
            <i className="fas fa-comment" />
          </li>
        </Styled.Menu>
        <li title="로그아웃" onClick={onLogoutClick}>
          <i className="fas fa-sign-out-alt" />
        </li>
      </ul>
    </Styled.MenuSideBar>
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

export default MenuSideBar;
