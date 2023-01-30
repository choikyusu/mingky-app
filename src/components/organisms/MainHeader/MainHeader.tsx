import styled from 'styled-components';
import { HeaderIcon } from '../../atoms/HeaderIcon/HeaderIcon';
import { AiFillHome } from 'react-icons/ai';
import { BsCalendar2EventFill } from 'react-icons/bs';
import { IoSettingsSharp } from 'react-icons/io5';
import { RiAdminLine } from 'react-icons/ri';

export function MainHeader() {
  return (
    <Wrapper>
      <div className="icons">
        <HeaderIcon icon={AiFillHome} link="/" />
        <HeaderIcon icon={BsCalendar2EventFill} link="calendar" />
        <HeaderIcon icon={IoSettingsSharp} link="settings" />
        <HeaderIcon icon={RiAdminLine} link="admin" />
        <HeaderIcon icon={RiAdminLine} link="test" />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  .icons {
    display: flex;
  }
`;
