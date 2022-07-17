import styled from 'styled-components';
import { HeaderIcon } from '../../atoms/HeaderIcon/HeaderIcon';
import { AiFillHome } from 'react-icons/ai';
import { BsCalendar2EventFill } from 'react-icons/bs';
import { IoSettingsSharp } from 'react-icons/io5';

export function MainHeader() {
  return (
    <Wrapper>
      <div className="icons">
        <HeaderIcon icon={AiFillHome} />
        <HeaderIcon icon={BsCalendar2EventFill} />
        <HeaderIcon icon={IoSettingsSharp} />
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
