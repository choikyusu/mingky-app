import styled from 'styled-components';

import { RootState } from '../../../store/configureStore';
import { useSelector } from 'react-redux';
import { NaverLogin } from '../../molecules/NaverLogin/NaverLogin';
import { Member } from '../../molecules/Member/Member';

export function SettingsBody(props: { user: UserInfoType }) {
  const { user } = props;

  switch (user.accountType) {
    case 'ANONYMOUS':
      return (
        <Wrapper>
          <NaverLogin />
        </Wrapper>
      );
    case 'MEMBER':
      return (
        <Wrapper>
          <Member />
        </Wrapper>
      );
    default:
      return <div />;
  }
}
const Wrapper = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  .icons {
    display: flex;
    flex-wrap: wrap;
  }
`;
